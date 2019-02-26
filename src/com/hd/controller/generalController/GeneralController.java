package com.hd.controller.generalController;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/general")
public class GeneralController {
	
    // ͼƬ�߶�
    private static final int IMG_HEIGHT = 80;
    // ͼƬ���
    private static final int IMG_WIDTH = 40;
    // ��֤�볤��
    private static final int CODE_LEN = 4;
	
	@RequestMapping("/verificationCode")
	public void verificationCode(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		// ���ڻ���ͼƬ������ͼƬ�ĳ����ͼƬ���ͣ�RGB)
        BufferedImage bi = new BufferedImage(IMG_HEIGHT, IMG_WIDTH, BufferedImage.TYPE_INT_RGB);
        // ��ȡ��ͼ����
        Graphics graphics = bi.getGraphics();
        graphics.setColor(new Color(100, 230, 200)); // ʹ��RGB���ñ�����ɫ
        graphics.fillRect(0, 0, IMG_HEIGHT, IMG_WIDTH ); // ����������

        // ��֤������ʹ�õ����ַ�
        char[] codeChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456".toCharArray();
        String captcha = ""; // ������ɵ���֤��
        Random random = new Random();
        for(int i = 0; i < CODE_LEN; i++) { // ѭ����ÿ����֤���ַ����Ƶ�ͼƬ��
            int index = random.nextInt(codeChar.length);
            // ���������֤����ɫ
            graphics.setColor(new Color(random.nextInt(150), random.nextInt(200), random.nextInt(255)));
            // ��һ���ַ����Ƶ�ͼƬ�ϣ����ƶ�λ�ã�����x,y���꣩
            graphics.drawString(codeChar[index] + "", (i * 20) + 10, 20);
            captcha += codeChar[index];
        }
        // �����ɵ���֤��verificationCode����sessoin��
        request.getSession().setAttribute("verificationCode", captcha);
        
        //������Ӧͷ��
        response.setContentType("image/jpeg");
        
        // ͨ��ImageIO��ͼƬ���
        ImageIO.write(bi, "JPG", response.getOutputStream());
		
	}
	
	@RequestMapping("/getAccount")
	@ResponseBody
	public Object getAccount(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		if(session.getAttribute("account") != null) {
			return session.getAttribute("account");
		}
		return session.getAttribute("vip");
	}
	
}
