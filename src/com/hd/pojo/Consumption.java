package com.hd.pojo;

import java.util.Date;

public class Consumption {
	
	private int id;
	
	private int b_id;
	
	private String vip_account;
	
	private String type;
	
	private double money;
	
	private Date date;
	
	private String bus_account;
	
	private int has_comment;
	
	public Consumption() {super();}

	public Consumption(int id, int b_id, String vip_account, String type, double money, Date date, String bus_account,
			int has_comment) {
		super();
		this.id = id;
		this.b_id = b_id;
		this.vip_account = vip_account;
		this.type = type;
		this.money = money;
		this.date = date;
		this.bus_account = bus_account;
		this.has_comment = has_comment;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getB_id() {
		return b_id;
	}

	public void setB_id(int b_id) {
		this.b_id = b_id;
	}

	public String getVip_account() {
		return vip_account;
	}

	public void setVip_account(String vip_account) {
		this.vip_account = vip_account;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public double getMoney() {
		return money;
	}

	public void setMoney(double money) throws Exception {
		if(money < 0) throw new Exception();
		this.money = money;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getBus_account() {
		return bus_account;
	}

	public void setBus_account(String bus_account) {
		this.bus_account = bus_account;
	}

	public int getHas_comment() {
		return has_comment;
	}

	public void setHas_comment(int has_comment) {
		this.has_comment = has_comment;
	}
	
}
