package com.hd.controller.vipCenter;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.hd.general.Response;
import com.hd.general.Str2MD5;
import com.hd.mapper.vipCenter.vip.VipMapper;
import com.hd.pojo.Account;
import com.hd.pojo.Vip;

@RequestMapping("/vipAccount")
@Controller
public class VipAccountController {
	@Autowired
	VipMapper vipMapper;
	
	@RequestMapping("/updateLoginPassword")
	@ResponseBody
	public String updateLoginPassword(String oldPassword,String newPassword,String confirmPassword,HttpServletRequest request) throws Exception{
		oldPassword = Str2MD5.MD5(oldPassword);
		newPassword = Str2MD5.MD5(newPassword);
		confirmPassword = Str2MD5.MD5(confirmPassword);
		if(!newPassword.equals(confirmPassword))
			throw new Exception("两次输入的密码不一致");
		
		Vip vip = (Vip)request.getSession().getAttribute("vip");
		
		if(!vip.getLogin_password().equals(oldPassword))
			throw new Exception("原密码输入不正确");
		
		vip.setLogin_password(newPassword);
		vipMapper.updateByPrimaryKey(vip);
		return JSON.toJSONString(new Response(null,"0",""));
	}
	
	@RequestMapping("/updateAccount")
	@ResponseBody
	public String updapteAccount(String name,String sex,String phone,String email,HttpServletRequest request) throws Exception{
		Vip vip = (Vip)request.getSession().getAttribute("vip");
		vip.setName(name);
		vip.setPhone(phone);
		vip.setEmail(email);
		vip.setSex(sex);
		vipMapper.updateByPrimaryKey(vip);
		return JSON.toJSONString(new Response(null,"0",""));
	}
	
	@RequestMapping("/updateConsumePassword")
	@ResponseBody
	public String updateConsumePassword(String oldPassword,String newPassword,String confirmPassword,HttpServletRequest request) throws Exception{
		oldPassword = Str2MD5.MD5(oldPassword);
		newPassword = Str2MD5.MD5(newPassword);
		confirmPassword = Str2MD5.MD5(confirmPassword);
		if(!newPassword.equals(confirmPassword))
			throw new Exception("两次输入的密码不一致");
		
		Vip vip = (Vip)request.getSession().getAttribute("vip");
		
		if(!vip.getConsume_password().equals(oldPassword))
			throw new Exception("原密码输入不正确");
		
		vip.setConsume_password(newPassword);
		vipMapper.updateByPrimaryKey(vip);
		return JSON.toJSONString(new Response(null,"0",""));
	}
}
