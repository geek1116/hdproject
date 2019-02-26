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
 * @date 2018年8月7日
 */
public interface VipManageMapper {

	/**
	 * 会员消费
	 * 
	 * @param id
	 * @param money
	 * @return
	 */
	public int vipConsume(@Param(value = "id") String id, @Param(value = "balance") double balance);

	
	
	/**
	 * 记录到消费历史表
	 * 
	 * @param consumption
	 * @return
	 */
	public int insertConsume(Consumption consumption);

	
	
	/**
	 * 通过会员卡号获取会员账号
	 * 
	 * @param id
	 * @return
	 */
	public Vip getVipAccount(String id);

	
	
	/**
	 * 添加会员
	 * 
	 * @param vip
	 * @return
	 */
	public int addVip(Vip vip);

	
	
	/**
	 * 添加会员卡
	 * 
	 * @param vipcard
	 * @return
	 */
	public int addVip_Card(Vipcard vipcard);

	
	
	/**
	 * 充值会员卡
	 * 
	 * @param id
	 * @param money
	 * @return
	 */
	public int rechargeVip_Card(@Param(value = "id") String id, @Param(value = "balance") double balance);

	
	
	/**
	 * 记录充值历史表
	 * 
	 * @param recharge_history
	 * @return
	 */
	public int recordRecharge(Recharge_history recharge_history);

}
