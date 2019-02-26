/**
 * 
 */
package com.hd.controller.vipmanage;

import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.enterprise.inject.New;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.hd.general.Response;
import com.hd.general.Str2MD5;
import com.hd.mapper.vipmanage.VipManageMapper;
import com.hd.pojo.Account;
import com.hd.pojo.Consumption;
import com.hd.pojo.Recharge_history;
import com.hd.pojo.Vip;
import com.hd.pojo.Vipcard;

/**
 * @author Jerry
 *
 * @date 2018年8月7日
 */

@Controller
@RequestMapping(value = "/businessVip")
public class VipManageController {

	@Autowired // 声明由Spring自动注入SqlSession生成的Mapper对象
	VipManageMapper mapper;

	@RequestMapping(value = "/consume")
	@ResponseBody // 声明将返回的对象转换成json格式
	@Transactional(rollbackFor = Exception.class) // 声明事务，发生异常时回滚
	public String vipConsume(String id, String type, double money, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		mapper.vipConsume(id, money);

		Account account = (Account) request.getSession().getAttribute("account");

		String vip_account = mapper.getVipAccount(id).getAccount();

		Consumption consumption = new Consumption();
		consumption.setB_id(account.getB_id());
		//consumption.setB_id(1);
		consumption.setVip_account(vip_account);
		consumption.setType(type);
		consumption.setMoney(money);
		consumption.setDate(new Date());
		consumption.setBus_account(account.getAccount());
		//consumption.setBus_account("123");
		
		
		mapper.insertConsume(consumption);

		return JSON.toJSONString(new Response(null,"0",""));

	}

	@RequestMapping(value = "/addVip")
	@ResponseBody // 声明将返回的对象转换成json格式
	@Transactional(rollbackFor = Exception.class) // 声明事务，发生异常时回滚
	public Object addVip(String name, String sex, String phone, String address, String email,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		System.out.println(request.getParameter("name"));
		Account issuer_account = (Account) request.getSession().getAttribute("account");

		Vipcard vipcard = new Vipcard();
		vipcard.setDate(new Date());
		//vipcard.setIssuer_account("123");

		vipcard.setIssuer_account(issuer_account.getAccount());

		mapper.addVip_Card(vipcard);

		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String account = formatter.format(date);

		Vip vip = new Vip();
		vip.setAccount(account);
		vip.setLogin_password(Str2MD5.MD5(phone));
		vip.setConsume_password(Str2MD5.MD5(phone));
		vip.setCard_id(vipcard.getId());
		vip.setName(name);
		vip.setSex(sex);
		vip.setPhone(phone);
		vip.setAddress(address);
		vip.setEmail(email);

		mapper.addVip(vip);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("account", account);
		map.put("card_id", vipcard.getId());

		return map;

	}

	@RequestMapping(value = "/recharge")
	@ResponseBody // 声明将返回的对象转换成json格式
	@Transactional(rollbackFor = Exception.class) // 声明事务，发生异常时回滚
	public String recharge(String id, double money, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		System.out.println(id + " " + money);
		mapper.rechargeVip_Card(id, money);

		Recharge_history recharge_history = new Recharge_history();
		Account account = (Account) request.getSession().getAttribute("account");

		String vip_account = mapper.getVipAccount(id).getAccount();

		recharge_history.setBus_account(account.getAccount());
		//recharge_history.setBus_account("123");
		recharge_history.setDate(new Date());
		recharge_history.setMoney(money);
		recharge_history.setVip_account(vip_account);

		mapper.recordRecharge(recharge_history);

		return JSON.toJSONString(new Response(null,"0",""));

	}

}
