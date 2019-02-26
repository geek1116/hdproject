package com.hd.controller.platformController;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Date;
import java.util.Enumeration;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.hd.general.Email;
import com.hd.general.Response;
import com.hd.general.Str2MD5;
import com.hd.mapper.platform.businesslog.BccountMapper;
import com.hd.mapper.platform.businesslog.ResetPasswordMapper;
import com.hd.pojo.Account;
import com.hd.pojo.Reset_password;

@Controller
@RequestMapping("/businessLog")
public class BusinessLogController {
		@Autowired
		BccountMapper accountMapper;
		
		@Autowired
		ResetPasswordMapper resetPasswordMapper;
		
		@RequestMapping("/updatePassword")
		@Transactional(rollbackFor=Exception.class)
		@ResponseBody
		public String updatePassword(String oldPassword,String newPassword,String confirmPassword,HttpServletRequest request)throws Exception{
			oldPassword = Str2MD5.MD5(oldPassword);
			newPassword = Str2MD5.MD5(newPassword);
			confirmPassword = Str2MD5.MD5(confirmPassword);
			if(!newPassword.equals(confirmPassword))
				throw new Exception("两次输入的密码不一致");
			
			Account account = (Account)request.getSession().getAttribute("account");
			
			if(!account.getPassword().equals(oldPassword))
				throw new Exception("原密码输入不正确");
			
			account.setPassword(newPassword);
			accountMapper.updateByPrimaryKey(account);
			return JSON.toJSONString(new Response(null,"0",""));
		}
		
		@RequestMapping("/forgetPassword")
		@ResponseBody
		@Transactional(rollbackFor=Exception.class)
		public int forgetPassword(String account,String verificationCode,HttpServletRequest request) throws Exception{
			String verify = (String)request.getSession().getAttribute("verificationCode");
			if(!verifyCode(verify, verificationCode)){
				return 1;
			}
			request.getSession().removeAttribute("verificationCode");
			//不可用账号密码不可改
			Account bus_account = accountMapper.selectUseableAccount(account);
			if(bus_account == null)
				return 1;
			String to = accountMapper.selectMail(bus_account);
			String from = "845119166@qq.com",title = "重置密码验证",messageText;
			long current = System.currentTimeMillis();
			
			//30分钟后令牌失效
			Date overdate = new Date(current + 30 * 60 * 1000);
			String token = Str2MD5.MD5(bus_account.getAccount() + current);
			
			Reset_password record = resetPasswordMapper.selectReset_password(account);
			
			//更新已有令牌
			if(record == null)
				resetPasswordMapper.insert(new Reset_password(account, token,  overdate));
			else {
				record.setToken(token);
				record.setOverdate(overdate);
				resetPasswordMapper.update(record);
			}
			
			String address = getHostIp();
			//messageText = " 点击下方链接进入到重置密码页面：\n http://" + address + "/hdproject/businessLog/confirmToken?account=" + account + "&token=" + token + "&password=456&confirmPassword=456";
			
			
			messageText = " 点击下方链接进入到重置密码页面：\n http://" + address + ":8080/hdproject/function/forgetpassword.html?account=" + account + "&token=" + token;
			
			Email.sendMail(to, from, title, messageText);
			return 0;
		}
		
		@RequestMapping("/login")
		@ResponseBody
		public int login(String account,String password,String verificationCode,HttpServletRequest request){
			String verify = (String)request.getSession().getAttribute("verificationCode");
			if(!verifyCode(verify, verificationCode))
				return 2;
			request.getSession().removeAttribute("verificationCode");
			Account bus_account = accountMapper.selectUseableAccount(account);
			
			if(bus_account == null) 
				return 1;
			
			String bus_password = bus_account.getPassword();
			
			if(bus_password.equals(Str2MD5.MD5(password))){
				request.getSession().setAttribute("account",bus_account);
				return 0;
			}else return 1;
		}
		
		@RequestMapping("/logout")
		@ResponseBody
		public String logout(HttpServletRequest request){
			request.getSession().invalidate();
			return JSON.toJSONString(new Response(null,"0",""));
		}
		
		@RequestMapping("/confirmToken")
		@Transactional(rollbackFor=Exception.class)
		@ResponseBody
		public int confirmToken(String account,String token,String password,String confirmPassword)throws Exception{
			Reset_password record = resetPasswordMapper.selectReset_password(account);
			if(!password.equals(confirmPassword))
				return 1;
			if(record == null)
				return 1;//账号不存在或链接失效
			else if(record.getOverdate().before(new Date(System.currentTimeMillis()))){
				//删除之前过期的令牌
				resetPasswordMapper.delete(account);
				return 1;
			}else if(!token.equals(record.getToken())){
				//令牌不对
				return 1;
			}else {	
				//账号存在且跳转页面
				Account bus_account = accountMapper.selectUseableAccount(account);
				bus_account.setPassword(Str2MD5.MD5(password));
				accountMapper.updateByPrimaryKey(bus_account);
				resetPasswordMapper.delete(account);
			}
			
			return 0;
		}
		
	private static String getHostIp() throws Exception {
		Enumeration<NetworkInterface> allNetInterfaces = NetworkInterface.getNetworkInterfaces();
		while (allNetInterfaces.hasMoreElements()) {
			NetworkInterface netInterface = (NetworkInterface) allNetInterfaces.nextElement();
			Enumeration<InetAddress> addresses = netInterface.getInetAddresses();
			while (addresses.hasMoreElements()) {
				InetAddress ip = (InetAddress) addresses.nextElement();
				if (ip != null && ip instanceof InetAddress && !ip.isLoopbackAddress() // loopback地址即本机地址，IPv4的loopback范围是127.0.0.0
						&& ip.getHostAddress().indexOf(":") == -1 && !ip.isSiteLocalAddress()) {
					return ip.getHostAddress();
				}
			}
		}
		return null;
	}
		
		public static void main(String[] args) {
			try {
				getHostIp();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		private boolean verifyCode(String verify1,String verify2){
			verify1 = verify1.toLowerCase();
			verify2 = verify2.toLowerCase();
			if(!verify1.equals(verify2))
				return false;
			else return true;
		}
		
		

}
