package com.hd.pojo;

import java.util.Date;

public class Vipcard {
	
	private int id;
	
	private Date date;
	
	private double balance;
	
	private String issuer_account;
	
	public Vipcard() {super();}

	public Vipcard(int id, Date date, double balance, String issuer_account) {
		super();
		this.id = id;
		this.date = date;
		this.balance = balance;
		this.issuer_account = issuer_account;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public String getIssuer_account() {
		return issuer_account;
	}

	public void setIssuer_account(String issuer_account) {
		this.issuer_account = issuer_account;
	}
	
}
