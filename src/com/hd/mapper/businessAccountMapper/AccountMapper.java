package com.hd.mapper.businessAccountMapper;

import java.util.List;

import com.hd.pojo.Account;

public interface AccountMapper {
     public int updateState(int state,String account);//���˻�����״̬�޸�
     public int deleteAccount(String account);//ɾ�����˺�
     public int initPassword(String account);//���˺������ʼ��
     public int addAccount(Account account);//������˺�
     public Account selectAccountById(String account);//�������˺�
     public List<Account> selectAccounts(int b_id,int begin,int size);//��ȡ�������˺�
	 public int getNumeberOfAccount(int b_id);//��ȡ���ʺŵ�����
}
