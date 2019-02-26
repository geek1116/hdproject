package com.hd.mapper.businessDisplayMapper;

import java.util.List;

import com.hd.pojo.Business;
import com.hd.pojo.Comment;
import com.hd.pojo.Comment_index;
import com.hd.pojo.Product;

public interface BusinessDisplayMapper {
	
	public List<Business> getBusinessByType(String type,int count,int page);
	
	public List<Product> getProductByBusId(int id,int count,int page);
	
	public List<Business> searchBusinessByKey(String key,int count,int page);
	
	public List<Comment> getCommentByBusId(int id,int count,int page);
	
	public Comment_index getBusinessPoint(int id);
	
}
