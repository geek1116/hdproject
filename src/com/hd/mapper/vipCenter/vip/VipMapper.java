package com.hd.mapper.vipCenter.vip;

import com.hd.pojo.Vip;

public interface VipMapper {
    int deleteByPrimaryKey(String account);

    int insert(Vip record);

    int insertSelective(Vip record);

    Vip selectByPrimaryKey(String account);

    int updateByPrimaryKeySelective(Vip record);

    int updateByPrimaryKey(Vip record);
}