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
 * ���������
 *
 */
public class encodingFilter implements Filter {

    public encodingFilter() {}

	public void destroy() {}


	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain chain) throws IOException, ServletException {
		//HttpServletRequest request = (HttpServletRequest)arg0; ��������request�ı���,Tomcat8�Ժ�Ĭ��ΪUTF8
		HttpServletResponse response = (HttpServletResponse)arg1;
		
		//������Ӧ���룬ʹTomcat�������ʹ����ͬ���뷽ʽ
		response.setContentType("application/json;charset=utf8");

		chain.doFilter(arg0, arg1);
	}

	public void init(FilterConfig fConfig) throws ServletException {
	}

}
