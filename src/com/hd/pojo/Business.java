package com.hd.pojo;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Business {
	
	private int id;
	
	private String b_name;
	
	private String type;
	
	private String address;
	
	private String b_picture;
	
	private String b_telephone;
	
	private String postcode;
	
	private String status;
	
	private String c_gender;
	
	private String c_name;
	
	private String c_position;
	
	private String c_telephone;
	
	private String c_cellphone;
	
	private String c_fax;
	
	private String c_mail;
	
	public Business(){super();}

	public Business(int id, String b_name, String type, String address, String b_picture, String b_telephone,
			String postcode, String status, String c_gender, String c_name, String c_position, String c_telephone,
			String c_cellphone, String c_fax, String c_mail) {
		super();
		this.id = id;
		this.b_name = b_name;
		this.type = type;
		this.address = address;
		this.b_picture = b_picture;
		this.b_telephone = b_telephone;
		this.postcode = postcode;
		this.status = status;
		this.c_gender = c_gender;
		this.c_name = c_name;
		this.c_position = c_position;
		this.c_telephone = c_telephone;
		this.c_cellphone = c_cellphone;
		this.c_fax = c_fax;
		this.c_mail = c_mail;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getB_name() {
		return b_name;
	}

	public void setB_name(String b_name) {
		this.b_name = b_name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) throws Exception {
		this.type = type;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getB_picture() {
		return b_picture;
	}

	public void setB_picture(String b_picture) {
		this.b_picture = b_picture;
	}

	public String getB_telephone() {
		return b_telephone;
	}

	public void setB_telephone(String b_telephone) {
		this.b_telephone = b_telephone;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getC_gender() {
		return c_gender;
	}

	public void setC_gender(String c_gender) {
		this.c_gender = c_gender;
	}

	public String getC_name() {
		return c_name;
	}

	public void setC_name(String c_name) {
		this.c_name = c_name;
	}

	public String getC_position() {
		return c_position;
	}

	public void setC_position(String c_position) {
		this.c_position = c_position;
	}

	public String getC_telephone() {
		return c_telephone;
	}

	public void setC_telephone(String c_telephone) {
		this.c_telephone = c_telephone;
	}

	public String getC_cellphone() {
		return c_cellphone;
	}

	public void setC_cellphone(String c_cellphone) {
		this.c_cellphone = c_cellphone;
	}

	public String getC_fax() {
		return c_fax;
	}

	public void setC_fax(String c_fax) {
		this.c_fax = c_fax;
	}

	public String getC_mail() {
		return c_mail;
	}

	public void setC_mail(String c_mail) throws Exception {
		if(c_mail == null || c_mail == "") throw new Exception();
		String RULE_EMAIL = "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$";
        Pattern p = Pattern.compile(RULE_EMAIL);//正则表达式的模式
        Matcher m = p.matcher(c_mail);//正则表达式的匹配器
        if(!m.matches()) throw new Exception();
		this.c_mail = c_mail;
	}
	
}
