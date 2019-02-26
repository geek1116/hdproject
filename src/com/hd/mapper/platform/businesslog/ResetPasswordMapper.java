package com.hd.mapper.platform.businesslog;

import java.util.Date;

import com.hd.pojo.Account;
import com.hd.pojo.Reset_password;

public interface ResetPasswordMapper {

    int insert(Reset_password record);

    int insertSelective(Reset_password record);
    
    Reset_password selectReset_password(String account);
    
    int delete(String account);
    
    int update(Reset_password record);

}