package com.hd.mapper.systemManagerMapper;

import java.util.List;

import com.hd.pojo.Business;

public interface SystemManagerMapper {
	
	public List<Business> getAllToExamine(int count,int page);
	
	public int updateBusinessStatus(int id,String status);
	
	public int deleteBusiness(int id);
	
	public String getEmail(int id);
	
	public int updateAccountByBusId(int id);

	public int getNumberOfToExamine();
	
	public List<Business> getAllBusinessNonExamine(int count,int page);
	
	public int getNumberOfNonExamine();
}
