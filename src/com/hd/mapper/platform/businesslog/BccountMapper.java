package com.hd.mapper.platform.businesslog;

import com.hd.pojo.Account;

public interface BccountMapper {
   
    int deleteByPrimaryKey(String account);

    int insert(Account record);

    int insertSelective(Account record);

    Account selectUseableAccount(String account);

    int updateByPrimaryKeySelective(Account record);
    
    int updateByPrimaryKey(Account record);
    
    String selectMail(Account record);
}