package com.hd.mapper.vipCenter.consumption;

import java.util.List;

import com.hd.pojo.Consumption;

public interface ConsumptionMapper {
	
    int deleteByPrimaryKey(Integer id);

    int insert(Consumption record);

    int insertSelective(Consumption record);

    Consumption selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Consumption record);

    int updateByPrimaryKey(Consumption record);
    
    List<Consumption> selectConsumptions(String account,int start,int count);
    
    public int getNumberOfConsumption(String vip_account);
}