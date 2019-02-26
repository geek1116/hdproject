package com.hd.pojo;

public class Product {
	
	private int id;
	
	private int b_id;
	
	private String name;
	
	private double price;
	
	private double vip_price;
	
	private String introduction;
	
	private String picture_path;
	
	public Product() {super();}

	public Product(int id, int b_id, String name, double price, double vip_price, String introduction,
			String picture_path) {
		super();
		this.id = id;
		this.b_id = b_id;
		this.name = name;
		this.price = price;
		this.vip_price = vip_price;
		this.introduction = introduction;
		this.picture_path = picture_path;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) throws Exception {
		if(price < 0) throw new Exception();
		this.price = price;
	}

	public double getVip_price() {
		return vip_price;
	}

	public void setVip_price(double vip_price) throws Exception {
		if(vip_price < 0) throw new Exception();
		this.vip_price = vip_price;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public String getPicture_path() {
		return picture_path;
	}

	public void setPicture_path(String picture_path) {
		this.picture_path = picture_path;
	}
	
}
