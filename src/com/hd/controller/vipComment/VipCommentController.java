package com.hd.controller.vipComment;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.hd.general.Response;
import com.hd.mapper.vipCommentMapper.VipCommentMapper;
import com.hd.pojo.Comment;
import com.hd.pojo.Consumption;
import com.hd.pojo.Vip;

@Controller
@RequestMapping("/vipComment")
public class VipCommentController {
	
	@Autowired
	VipCommentMapper mapper;
	
	@RequestMapping("/getNonComment")
	@ResponseBody
	public List<Consumption> getNonComment(Integer count,Integer page,HttpServletRequest request) {
		int tcount=10,tpage=1;
		if(count != null)tcount=count;
		if(page != null)tpage=page;
		Vip vip = (Vip)request.getSession().getAttribute("vip");
		return mapper.getAllNonCommentByAccount(vip.getAccount(), tcount, (tpage-1)*tcount);
	}
	
	@RequestMapping("/addComment")
	@ResponseBody
	@Transactional(rollbackFor=Exception.class)
	public String addComment(int c_id,int star,String content,HttpServletRequest request) {
		mapper.addComment(new Comment(0,c_id,star,content,new Date()));
		return JSON.toJSONString(new Response(null,"0",""));
	}
	
	@RequestMapping("/getNumberOfNonComment")
	@ResponseBody
	public int getNumberOfNonComment(HttpServletRequest request){
		Vip vip = (Vip)request.getSession().getAttribute("vip");
		return mapper.getNumberOfNonComment(vip.getAccount());
	}
}
