package com.hd.mapper.businessAccountMapper;

import java.util.List;

import com.hd.pojo.Account;

public interface AccountMapper {
     public int updateState(int state,String account);//子账户启用状态修改
     public int deleteAccount(String account);//删除子账号
     public int initPassword(String account);//子账号密码初始化
     public int addAccount(Account account);//添加子账号
     public Account selectAccountById(String account);//查找子账号
     public List<Account> selectAccounts(int b_id,int begin,int size);//获取所有子账号
	 public int getNumeberOfAccount(int b_id);//获取子帐号的数量
}
