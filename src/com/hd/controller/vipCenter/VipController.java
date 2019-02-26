package com.hd.controller.vipCenter;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.hd.general.Response;
import com.hd.general.Str2MD5;
import com.hd.mapper.vipCenter.consumption.ConsumptionMapper;
import com.hd.mapper.vipCenter.vip.VipMapper;
import com.hd.pojo.Account;
import com.hd.pojo.Consumption;
import com.hd.pojo.Vip;

@RequestMapping("/vip")
@Controller
public class VipController {
	@Autowired
	VipMapper vipMapper;
	
	@Autowired
	ConsumptionMapper consumptionMapper;
	
	@RequestMapping("/login")
	@ResponseBody
	public int login(String account,String login_password,String verificationCode,HttpServletRequest request){
		String verify = (String)request.getSession().getAttribute("verificationCode");
		verify = verify.toLowerCase();
		verificationCode = verificationCode.toLowerCase();
		if(!verify.equals(verificationCode))
			return 2;
		request.getSession().getAttribute("verificationCode");
		Vip vip = vipMapper.selectByPrimaryKey(account);
		
		if(vip == null) 
			return 1;
		
		String vip_password = vip.getLogin_password();
		
		if(vip_password.equals(Str2MD5.MD5(login_password))){
			request.getSession().setAttribute("vip",vip);
			return 0;
		}else return 1;
	}
	
	@RequestMapping("/consumeHistory")
	@ResponseBody
	public List<Consumption>  consumeHistory(Integer count,Integer page,HttpServletRequest request){
		int cnt = 10,page2 = 1;
		if(count != null)
			cnt = count;
		if(page != null)
			page2 = page;
		
		Vip vip = (Vip)request.getSession().getAttribute("vip");
		List<Consumption> consumptions = consumptionMapper.selectConsumptions(vip.getAccount(), cnt * (page2 - 1), cnt);
		return consumptions;
	}
	
	@RequestMapping("/logout")
	@ResponseBody
	public String logout(HttpServletRequest request){
		request.getSession().invalidate();
		return JSON.toJSONString(new Response(null,"0",""));
	}
	
	@RequestMapping("/getNumberOfConsumption")
	@ResponseBody
	public int getNumberOfConsumption(HttpServletRequest request){
		Vip vip = (Vip)request.getSession().getAttribute("vip");
		return consumptionMapper.getNumberOfConsumption(vip.getAccount());
	}
}
