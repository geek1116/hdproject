package com.hd.pojo;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Vip {
	
	private String account;
	
	private String login_password;
	
	private String consume_password;
	
	private int card_id;
	
	private String name;
	
	private String sex;
	
	private String phone;
	
	private String address;
	
	private String email;
	
	public Vip() {super();}

	public Vip(String account, String login_password, String consume_password, int card_id, String name, String sex,
			String phone, String address, String email) {
		super();
		this.account = account;
		this.login_password = login_password;
		this.consume_password = consume_password;
		this.card_id = card_id;
		this.name = name;
		this.sex = sex;
		this.phone = phone;
		this.address = address;
		this.email = email;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getLogin_password() {
		return login_password;
	}

	public void setLogin_password(String login_password) {
		this.login_password = login_password;
	}

	public String getConsume_password() {
		return consume_password;
	}

	public void setConsume_password(String consume_password) {
		this.consume_password = consume_password;
	}

	public int getCard_id() {
		return card_id;
	}

	public void setCard_id(int card_id) {
		this.card_id = card_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) throws Exception {
		if(email == null || email == "") throw new Exception();
		String RULE_EMAIL = "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$";
        Pattern p = Pattern.compile(RULE_EMAIL);//正则表达式的模式
        Matcher m = p.matcher(email);//正则表达式的匹配器
        if(!m.matches()) throw new Exception("邮箱格式不正确");
		this.email = email;
	}
	
}
