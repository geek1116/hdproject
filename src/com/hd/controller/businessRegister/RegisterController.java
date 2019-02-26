package com.hd.controller.businessRegister;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.hd.general.Response;
import com.hd.mapper.businessInfoMapper.BusinessInfoMapper;
import com.hd.pojo.Business;

@Controller
@RequestMapping("/business")
public class RegisterController {
	
	@Autowired
	BusinessInfoMapper mapper;
	
	@RequestMapping("/register")
	@ResponseBody
	@Transactional(rollbackFor=Exception.class)
	public String register(Business business, String verificationCode, HttpServletRequest request) throws Exception {
		
		//ÅÐ¶ÏÑéÖ¤Âë
		String localVerificationCode = (String)request.getSession().getAttribute("verificationCode");
		if(localVerificationCode == null || localVerificationCode.equals(verificationCode) == false) {
			return JSON.toJSONString(new Response("1","0",""));
		}
		
		request.getSession().removeAttribute("verificationCode");
		mapper.addBusiness(business);
		return JSON.toJSONString(new Response("0","0",""));
	}
	
}
