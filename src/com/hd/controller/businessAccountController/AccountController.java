package com.hd.controller.businessAccountController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.hd.general.Response;
import com.hd.general.Str2MD5;
import com.hd.mapper.businessAccountMapper.AccountMapper;
import com.hd.pojo.Account;
import com.sun.mail.handlers.image_gif;

@Controller
@RequestMapping("/businessAccount")
public class AccountController {
	@Autowired
	AccountMapper accountMapper;

	/**
	 * 子账号启用状态修改
	 */
	@RequestMapping("/updateState")
	@ResponseBody
	@Transactional(rollbackFor=Exception.class) 
	public String updateState(String account, Integer state, HttpServletRequest request, HttpServletResponse response) throws Exception {
        int t_state=0;//默认停用
        if(state!=null) {t_state=state;}
		accountMapper.updateState(t_state,account);
		return JSON.toJSONString(new Response(null,"0",""));
	}

	
	/**
	 * 删除子账号
	 */
	@RequestMapping("/deleteAccount")
	@ResponseBody
	@Transactional(rollbackFor=Exception.class) 
	public String deleteAccount(String account, HttpServletRequest request, HttpServletResponse response) throws Exception {
		accountMapper.deleteAccount(account);
		return JSON.toJSONString(new Response(null,"0",""));
	}

	
	/**
	 * 子账号密码初始化
	 */
	@RequestMapping("/initPassword")
	@ResponseBody
	@Transactional(rollbackFor=Exception.class) 
	public String initPassword(String account, HttpServletRequest request, HttpServletResponse response) throws Exception{
		accountMapper.initPassword(account);
		return JSON.toJSONString(new Response(null,"0",""));
	}

	
	/**
	 * 获取所有子账号
	 */
	@RequestMapping("/getAllAccount")
	@ResponseBody
	@Transactional(rollbackFor = Exception.class)
	public List<Account> getAllAccount(Integer count,Integer page,HttpServletRequest request) throws Exception {
		HttpSession session=request.getSession();
		Account acc=(Account)session.getAttribute("account");
		int b_id=acc.getB_id();
		int size=10;
		if(count!=null){
			size=count;
		}
		int begin=0;
		if(page!=null){
			begin=(page-1)*size;
		}
        List<Account> accounts=accountMapper.selectAccounts(b_id, begin, size);
        return accounts;
	}
	
	
	/**
	 * 添加子账号
	 */
	@RequestMapping("/addAccount")
	@ResponseBody
	@Transactional(rollbackFor=Exception.class)
	public String addAccount(Integer account_type,Integer state,HttpServletRequest request,HttpServletResponse response) throws Exception{
		int t_account_type=2;//默认前台
		if(account_type!=null) {t_account_type=account_type;}
		int t_state=1;//默认可用
		if(state!=null) {t_state=state;}
		String account=getAccount();
      	while(accountMapper.selectAccountById(account)!=null){
      		account=getAccount();
      	}
      	String password=account;//初始密码
      	HttpSession session=request.getSession();
      	Account acc=(Account)session.getAttribute("account");
      	int b_id=acc.getB_id();
      	Account sonAccount=new Account(account, password, b_id, t_account_type, t_state);
      	accountMapper.addAccount(sonAccount);
      
      	Map<String, Object> returnMap=new HashMap<String, Object>();
      	returnMap.put("account", account);
      	returnMap.put("password", password);
      	String jsonString=JSON.toJSONString(returnMap);
        return jsonString;
	} 
	
	@RequestMapping("/getNumberOfAccount")
	@ResponseBody
	public int getNumeberOfAccount(HttpServletRequest request){
		Account account = (Account)request.getSession().getAttribute("account");
		return accountMapper.getNumeberOfAccount(account.getB_id());
	}
	
	public String getAccount(){
		//随机分配账号
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
}
