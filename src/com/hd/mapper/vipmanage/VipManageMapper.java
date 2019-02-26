/**
 * 
 */
package com.hd.mapper.vipmanage;

import javax.validation.constraints.Past;

import org.apache.ibatis.annotations.Param;

import com.hd.pojo.Consumption;
import com.hd.pojo.Recharge_history;
import com.hd.pojo.Vip;
import com.hd.pojo.Vipcard;

/**
 * @author Jerry
 *
 * @date 2018��8��7��
 */
public interface VipManageMapper {

	/**
	 * ��Ա����
	 * 
	 * @param id
	 * @param money
	 * @return
	 */
	public int vipConsume(@Param(value = "id") String id, @Param(value = "balance") double balance);

	
	
	/**
	 * ��¼��������ʷ��
	 * 
	 * @param consumption
	 * @return
	 */
	public int insertConsume(Consumption consumption);

	
	
	/**
	 * ͨ����Ա���Ż�ȡ��Ա�˺�
	 * 
	 * @param id
	 * @return
	 */
	public Vip getVipAccount(String id);

	
	
	/**
	 * ��ӻ�Ա
	 * 
	 * @param vip
	 * @return
	 */
	public int addVip(Vip vip);

	
	
	/**
	 * ��ӻ�Ա��
	 * 
	 * @param vipcard
	 * @return
	 */
	public int addVip_Card(Vipcard vipcard);

	
	
	/**
	 * ��ֵ��Ա��
	 * 
	 * @param id
	 * @param money
	 * @return
	 */
	public int rechargeVip_Card(@Param(value = "id") String id, @Param(value = "balance") double balance);

	
	
	/**
	 * ��¼��ֵ��ʷ��
	 * 
	 * @param recharge_history
	 * @return
	 */
	public int recordRecharge(Recharge_history recharge_history);

}
