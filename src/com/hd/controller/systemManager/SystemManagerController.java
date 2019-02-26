package com.hd.controller.systemManager;

import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.hd.general.Email;
import com.hd.general.Response;
import com.hd.mapper.businessAccountMapper.AccountMapper;
import com.hd.mapper.businessInfoMapper.BusinessInfoMapper;
import com.hd.mapper.systemManagerMapper.SystemManagerMapper;
import com.hd.pojo.Account;
import com.hd.pojo.Business;
import com.hd.pojo.Vip;

@Controller
@RequestMapping("/system")
public class SystemManagerController {
	
	static final String LOGIN_ACCOUNT = "root"; //����Ա�˺�
	
	static final String LOGIN_PASSWORD = "iop123asdf"; //����Ա����
	
	@Autowired
	SystemManagerMapper mapper;
	
	@Autowired
	AccountMapper accountMapper;
	
	@RequestMapping("/login")
	@ResponseBody
	public String login(String account,String password,HttpServletRequest request) {
		if(account != null && password != null && account.equals(LOGIN_ACCOUNT) && password.equals(LOGIN_PASSWORD)) {
			request.getSession().setAttribute("sys_admin",0);
			return JSON.toJSONString(new Response("0","0",""));
		}
		return JSON.toJSONString(new Response("1","0",""));
	}
	
	@RequestMapping("/getToExamine")
	@ResponseBody
	public List<Business> getToExamine(Integer count,Integer page) {
		int tcount = 10, tpage = 1;
		if(count != null) tcount = count;
		if(page != null) tpage = page;
		return mapper.getAllToExamine(tcount, (tpage - 1)*tcount);
	}
	
	@RequestMapping("/operateBusinessStatus")
	@ResponseBody
	@Transactional(rollbackFor=Exception.class)
	public String operateBusinessStatus(int id,int status) {
		String tStatus = status==0?"����":"����";
		mapper.updateBusinessStatus(id,tStatus);
		if(status == 0) {
			mapper.updateAccountByBusId(id);
		}
		return JSON.toJSONString(new Response(null,"0",""));
	}
	
	@RequestMapping("/operateExamine")
	@ResponseBody
	@Transactional(rollbackFor=Exception.class)
	public String operateExamine(int id,int status){
		String toEmail = mapper.getEmail(id);
		if(status == 1){
			
			String account = getAccount(),messageText;
			messageText = "�����߲��Ƽ���ע�������ͨ��\n�˺�:" + account + "\n����:" + account;
			//�����̼ҹ���Ա�˺Ų�����
			Account bus_account = new Account(account, account, id, 1, 1);
			accountMapper.addAccount(bus_account);
			mapper.updateBusinessStatus(id, "����");
			Email.sendMail(toEmail, "845119166@qq.com", "�߲����̼�ע����˽��", messageText);
		}else {
			Email.sendMail(toEmail, "845119166@qq.com", "�߲����̼�ע����˽��", "���δͨ��");
			mapper.deleteBusiness(id);
		}
		return JSON.toJSONString(new Response(null,"0",""));
	}
	
	@RequestMapping("/getNumberOfToExamine")
	@ResponseBody
	public int getNumberOfToExamine(HttpServletRequest request){
		return mapper.getNumberOfToExamine();
	}
	
	public String getAccount(){
		//��������˺�
		String account="";
    	Random random=new Random();
      	String charsString="abcdefghijklmnopqrstuvwxyz";
      	for(int i=0;i<4;i++){
      		account+=charsString.charAt((int)(Math.random()*26));
      	}
      	String numsString="0123456789";
      	for(int i=0;i<4;i++){
      		account+=numsString.charAt((int)(Math.random()*10));
      	}
      	return account;
	}
	
	@RequestMapping("/getAllBusinessNonExamine")
	@ResponseBody
	public List<Business> getAllBusinessNonExamine(Integer page,Integer count) {
		int tcount = 10, tpage = 1;
		if(count != null) tcount = count;
		if(page != null) tpage = page;
		return mapper.getAllBusinessNonExamine(tcount, (tpage - 1)*tcount);
	}
	
	@RequestMapping("/getNumberOfNonExamine")
	@ResponseBody
	public int getNumberOfNonExamine() {
		return mapper.getNumberOfNonExamine();
	}
	
}
