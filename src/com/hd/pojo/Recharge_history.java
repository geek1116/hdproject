package com.hd.pojo;

import java.util.Date;

public class Recharge_history {
	
	private int id;
	
	private String vip_account;
	
	private double money;
	
	private Date date;
	
	private String bus_account;
	
	public Recharge_history() {super();}

	public Recharge_history(int id, String vip_account, double money, Date date, String bus_account) {
		super();
		this.id = id;
		this.vip_account = vip_account;
		this.money = money;
		this.date = date;
		this.bus_account = bus_account;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getVip_account() {
		return vip_account;
	}

	public void setVip_account(String vip_account) {
		this.vip_account = vip_account;
	}

	public double getMoney() {
		return money;
	}

	public void setMoney(double money) {
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
	
}
