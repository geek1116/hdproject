package com.hd.controller.businessInfo;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.hd.general.Response;
import com.hd.mapper.businessInfoMapper.BusinessInfoMapper;
import com.hd.pojo.Account;
import com.hd.pojo.Business;
import com.hd.pojo.Product;

@Controller
@RequestMapping("/businessInfo")
public class BusinessInfoController {
	
	@Autowired
	BusinessInfoMapper mapper;
	
	@RequestMapping("/getInfo")
	@ResponseBody
	public Business getInfo(HttpServletRequest request) {
		Account account = (Account)request.getSession().getAttribute("account");
		return mapper.getBusinessById(account.getB_id());
	}
	
	@RequestMapping("/updateInfo")
	@ResponseBody
	@Transactional(rollbackFor=Exception.class)
	public String updateInfo(Business business,HttpServletRequest request) {
		Account account = (Account)request.getSession().getAttribute("account");
		mapper.updateBusinessById(business,account.getB_id());
		return JSON.toJSONString(new Response(null,"0",""));
	}
	
	@RequestMapping("/addProduct")
	@ResponseBody
	@Transactional(rollbackFor=Exception.class)
	public String addProduct(Product product,HttpServletRequest request) {
		Account account = (Account)request.getSession().getAttribute("account");
		mapper.addProduct(product,account.getB_id());
		return JSON.toJSONString(new Response(null,"0",""));
	}
	
	@RequestMapping("/updateProduct")
	@ResponseBody
	@Transactional(rollbackFor=Exception.class)
	public String updateProduct(Product product) {
		mapper.updateProductById(product);
		return JSON.toJSONString(new Response(null,"0",""));
	}
	
	@RequestMapping("/getAllProduct")
	@ResponseBody
	public List<Product> getAllProduct(Integer count,Integer page,HttpServletRequest request) {
		int tcount=10,tpage=1;
		if(count != null) tcount = count;
		if(page != null) tpage = page;
		tpage = (tpage-1)*tcount;
		Account account = (Account)request.getSession().getAttribute("account");
		return mapper.getAllProductByB_id(account.getB_id(),tcount,tpage);
	}
	
	@RequestMapping("/deleteProduct")
	@ResponseBody
	@Transactional(rollbackFor=Exception.class)
	public String deleteProduct(int id) {
		mapper.deleteProductById(id);
		return JSON.toJSONString(new Response(null,"0",""));
	}
	
	@RequestMapping("/getNumberOfProduct")
	@ResponseBody
	public int getNumberOfProduct(HttpServletRequest request){
		Account account = (Account)request.getSession().getAttribute("account");
		return mapper.getNumberOfProduct(account.getB_id());
	}
}
