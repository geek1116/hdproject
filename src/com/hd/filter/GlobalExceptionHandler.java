package com.hd.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.hd.general.Response;

/**
 *  @author geek1116
 *  ���ڴ���ȫ���쳣
 *
 */
public class GlobalExceptionHandler implements HandlerExceptionResolver {

	@Override
	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
			Exception exception) {
		
		try {
			PrintWriter out = response.getWriter();
			if(exception instanceof NumberFormatException || exception instanceof IllegalStateException
					|| exception instanceof NullPointerException) {
				out.print(JSON.toJSON(new Response(null,"1","���ݸ�ʽ����" + exception.getMessage())));
			} else if(exception instanceof SQLException || exception instanceof com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException) {
				out.print(JSON.toJSON(new Response(null,"2","���ݿ��������" + exception.getMessage())));
			} else {
				out.print(JSON.toJSON(new Response(null,"3","δ֪����" + exception.getMessage())));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}

}
