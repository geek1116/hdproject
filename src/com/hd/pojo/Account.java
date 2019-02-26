package com.hd.pojo;

public class Account {
	
	private String account;
	
	private String password;
	
	private int b_id;
	
	private int account_type;
	
	private int state;

	public Account(){super();}
	
	public Account(String account, String password, int b_id, int account_type, int state) {
		super();
		this.account = account;
		this.password = password;
		this.b_id = b_id;
		this.account_type = account_type;
		this.state = state;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getB_id() {
		return b_id;
	}

	public void setB_id(int b_id) {
		this.b_id = b_id;
	}

	public int getAccount_type() {
		return account_type;
	}

	public void setAccount_type(int account_type) throws Exception {
		if(account_type <1 || account_type > 3) throw new Exception();
		this.account_type = account_type;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) throws Exception {
		if(state < 0 || state > 1) throw new Exception();
		this.state = state;
	}
	
}
