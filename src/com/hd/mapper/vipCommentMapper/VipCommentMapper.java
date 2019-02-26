package com.hd.mapper.vipCommentMapper;

import java.util.List;

import com.hd.pojo.Comment;
import com.hd.pojo.Consumption;

public interface VipCommentMapper {
	
	public List<Consumption> getAllNonCommentByAccount(String account,int count,int page);
	
	public int addComment(Comment comment);
	
	public int getNumberOfNonComment(String vip_account);
}
