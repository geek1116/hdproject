package com.hd.pojo;

public class Comment_index {
	
	private int b_id;
	
	private int comment_count;
	
	private double point;
	
	public Comment_index(){super();}

	public Comment_index(int b_id, int comment_count, double point) {
		super();
		this.b_id = b_id;
		this.comment_count = comment_count;
		this.point = point;
	}

	public int getB_id() {
		return b_id;
	}

	public void setB_id(int b_id) {
		this.b_id = b_id;
	}

	public int getComment_count() {
		return comment_count;
	}

	public void setComment_count(int comment_count) {
		this.comment_count = comment_count;
	}

	public double getPoint() {
		return point;
	}

	public void setPoint(double point) {
		this.point = point;
	}
	
}
