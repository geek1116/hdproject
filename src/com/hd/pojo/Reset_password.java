package com.hd.pojo;

import java.util.Date;

public class Reset_password {
	
	private String account;
	
	private String token;
	
	private Date overdate;
	
	public Reset_password() {super();}

	public Reset_password(String account, String token, Date overdate) {
		super();
		this.account = account;
		this.token = token;
		this.overdate = overdate;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Date getOverdate() {
		return overdate;
	}

	public void setOverdate(Date overdate) {
		this.overdate = overdate;
	}
	
}
