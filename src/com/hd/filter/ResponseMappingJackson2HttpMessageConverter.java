package com.hd.filter;

import java.io.IOException;

import org.springframework.http.HttpOutputMessage;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hd.general.Response;

/**
 * 
 * @author geek1116
 * �޸�@ResponseBody�Կ������з��ض���ת��json��Ĭ����Ϊ���޸�Ϊ���Կ������з��صĶ����װ��Response������ת��json
 *
 */
public class ResponseMappingJackson2HttpMessageConverter extends MappingJackson2HttpMessageConverter {
	
	@Override
	protected void writeInternal(Object object,HttpOutputMessage outputMessage) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(new Response(object,"0",""));//ʹ��jsckson��Response����ת����json��ʽ
		outputMessage.getBody().write(json.getBytes("utf8"));//UTF-8�������json
	}
	
}
