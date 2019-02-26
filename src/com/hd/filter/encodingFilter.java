package com.hd.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * 编码过滤器
 *
 */
public class encodingFilter implements Filter {

    public encodingFilter() {}

	public void destroy() {}


	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain chain) throws IOException, ServletException {
		//HttpServletRequest request = (HttpServletRequest)arg0; 无需设置request的编码,Tomcat8以后默认为UTF8
		HttpServletResponse response = (HttpServletResponse)arg1;
		
		//设置响应编码，使Tomcat和浏览器使用相同编码方式
		response.setContentType("application/json;charset=utf8");

		chain.doFilter(arg0, arg1);
	}

	public void init(FilterConfig fConfig) throws ServletException {
	}

}
