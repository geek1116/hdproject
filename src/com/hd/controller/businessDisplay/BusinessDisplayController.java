package com.hd.controller.businessDisplay;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hd.mapper.businessDisplayMapper.BusinessDisplayMapper;
import com.hd.pojo.Business;
import com.hd.pojo.Comment;
import com.hd.pojo.Comment_index;
import com.hd.pojo.Product;

@Controller
@RequestMapping("/display")
public class BusinessDisplayController {
	
	@Autowired
	BusinessDisplayMapper mapper;
	
	@RequestMapping("/getBusinessByType")
	@ResponseBody
	public List<Business> getBusinessByType(String type,Integer count,Integer page) {
		int tcount=10,tpage=1;
		if(count != null) tcount=count;
		if(page != null) tpage=page;
		return mapper.getBusinessByType(type, tcount, (tpage-1)*tcount);
	}
	
	@RequestMapping("/getProductByBusId")
	@ResponseBody
	public List<Product> getProductByBusId(int id,Integer count,Integer page) {
		int tcount=10,tpage=1;
		if(count != null) tcount=count;
		if(page != null) tpage=page;
		return mapper.getProductByBusId(id, tcount, (tpage-1)*tcount);
	}
	
	@RequestMapping("/search")
	@ResponseBody
	public List<Business> search(String key,Integer count,Integer page) {
		int tcount=10,tpage=1;
		if(count != null) tcount=count;
		if(page != null) tpage=page;
		return mapper.searchBusinessByKey(key==null?"":key, tcount, (tpage-1)*tcount);
	}
	
	@RequestMapping("/getCommentByBusId")
	@ResponseBody
	public List<Comment> getCommentByBusId(int id,Integer count,Integer page) {
		int tcount=10,tpage=1;
		if(count != null) tcount=count;
		if(page != null) tpage=page;
		return mapper.getCommentByBusId(id, tcount, (tpage-1)*tcount);
	}
	
	@RequestMapping("/getBusinessPoint")
	@ResponseBody
	public Comment_index getBusinessPoint(int id) {
		return mapper.getBusinessPoint(id);
	}
	
}
