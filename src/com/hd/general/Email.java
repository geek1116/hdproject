package com.hd.general;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Email {
	public static void sendMail(String to,String from,String title,String messageText){
	    //��Ȩ�� 
		String authorizationCode = "lmwuqyzrogahbfgd";
	      
	      // ָ�������ʼ�������Ϊ smtp.qq.com
	      String host = "smtp.qq.com";  //QQ �ʼ�������
	 
	      // ��ȡϵͳ����
	      Properties properties = System.getProperties();
	 
	      // �����ʼ�������
	      properties.setProperty("mail.smtp.host", host);
	 
	      properties.put("mail.smtp.auth", "true");
	      // ��ȡĬ��session����
	      Session session = Session.getDefaultInstance(properties,new Authenticator(){
	        public PasswordAuthentication getPasswordAuthentication()
	        {
	         return new PasswordAuthentication(from, authorizationCode); //�������ʼ��û�������Ȩ��
	        }
	       });
	 
	      try{
	         // ����Ĭ�ϵ� MimeMessage ����
	         MimeMessage message = new MimeMessage(session);
	 
	         // Set From: ͷ��ͷ�ֶ�
	         message.setFrom(new InternetAddress(from));
	 
	         // Set To: ͷ��ͷ�ֶ�
	         message.addRecipient(Message.RecipientType.TO,
	                                  new InternetAddress(to));
	 
	         // Set Subject: ͷ��ͷ�ֶ�
	         message.setSubject(title);
	 
	         // ������Ϣ��
	         message.setText(messageText);
	 
	         // ������Ϣ
	         Transport.send(message);
	      }catch (MessagingException mex) {
	         mex.printStackTrace();
	      }
	}
}
