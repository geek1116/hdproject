package com.hd.mapper.businessInfoMapper;

import java.util.List;

import com.hd.pojo.Business;
import com.hd.pojo.Consumption;
import com.hd.pojo.Product;
import com.hd.pojo.Recharge_history;

public interface BusinessInfoMapper {
	
	public int addBusiness(Business business);
	
	public Business getBusinessById(int id);
	
	public int updateBusinessById(Business business,int id);
	
	public int addProduct(Product product,int id);
	
	public int updateProductById(Product product);
	
	public List<Product> getAllProductByB_id(int b_id,int count,int page);
	
	public List<Consumption> getAllConsumptionByB_id(int b_id);
	
	public List<Recharge_history> getAllRecharge_historyByB_id(int b_id);
	
	public int deleteProductById(int id);
	
	public int getNumberOfProduct(int b_id);
}
