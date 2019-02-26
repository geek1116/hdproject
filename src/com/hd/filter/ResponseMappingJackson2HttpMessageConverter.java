package com.hd.filter;

import java.io.IOException;

import org.springframework.http.HttpOutputMessage;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hd.general.Response;

/**
 * 
 * @author geek1116
 * 修改@ResponseBody对控制器中返回对象转换json的默认行为，修改为：对控制器中返回的对象包装进Response中再做转换json
 *
 */
public class ResponseMappingJackson2HttpMessageConverter extends MappingJackson2HttpMessageConverter {
	
	@Override
	protected void writeInternal(Object object,HttpOutputMessage outputMessage) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(new Response(object,"0",""));//使用jsckson将Response对象转换成json格式
		outputMessage.getBody().write(json.getBytes("utf8"));//UTF-8编码输出json
	}
	
}
