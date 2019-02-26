package com.hd.filter;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSON;
import com.hd.general.Response;
import com.hd.pojo.Account;

/**
 * Servlet Filter implementation class PowerFilter
 */
@WebFilter("/PowerFilter")
public class PowerFilter implements Filter {
	HashMap<String, String> powerMap;
    
    public PowerFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest)request;
		int role = getRole(req);
		
		String url = req.getRequestURI();
		int index = url.indexOf("/", 1);
		String power = null;
		if(index != -1){
			url = url.substring(index);
			power = powerMap.get(url);
			System.out.println(url + " power:" + power);
			while(power == null && index != 0){ //从n级->(n-1)级url
				index = url.lastIndexOf("/");
				url = url.substring(0,index);
				power = powerMap.get(url);
				System.out.println(url + " power:" + power);	
			}
		}
		if(power != null){ 					
			int rolePower = Integer.parseInt(power);
			if((role & rolePower) == 0 && rolePower != 0){  	//无权限
				response.getWriter().print(JSON.toJSON(new Response(null,"4","无权限")));
				return;
			}	
		}
		chain.doFilter(request, response);
	}
	
	
	
	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		powerMap = new HashMap<String, String>();
		ResourceBundle rb = ResourceBundle.getBundle("power");
		Enumeration<String> enu = rb.getKeys();
	    while (enu.hasMoreElements()) {
	        String obj = (String)enu.nextElement();
	        String objv = (String)rb.getObject(obj);
	        powerMap.put(obj, objv);
	    }
	}
	/**
	 * 判断session中登录的对象类型
	 * @param req
	 * @return
	 */
	private int getRole(HttpServletRequest req){
		int role = 0;											//未登录 00000
		HttpSession session = req.getSession();
		Account account = (Account)session.getAttribute("account");
		
		if(session.getAttribute("vip") != null){ 				//会员 10000
			role = 16;
		}else if(account != null){
			if(account.getAccount_type() == 1)					//商家管理员 00010
				role = 2;
			else if(account.getAccount_type() == 2) 			//前台 01000
				role = 8;
			else role = 4;										//经理 00100
		}else if(session.getAttribute("sys_admin") != null){ 	//系统管理员 00001
			role = 1;
		}
		return role;
	}


}
