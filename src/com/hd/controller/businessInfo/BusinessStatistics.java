package com.hd.controller.businessInfo;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hd.mapper.businessInfoMapper.BusinessInfoMapper;
import com.hd.pojo.Account;
import com.hd.pojo.Consumption;
import com.hd.pojo.Recharge_history;

@Controller
@RequestMapping("/businessStatistics")
public class BusinessStatistics {
	
	@Autowired
	BusinessInfoMapper mapper;
	
	@RequestMapping("/consumptionHistory")
	public void consumption(HttpServletRequest request,HttpServletResponse response) {
		
		//excel�ļ���
		String fileName = "������ʷ" + ".xls";
		//sheet��
		String sheetName = "������ʷ";
		//excel����
		String[] title = {"���ѱ��","��Ա�˺�","���ѷ�ʽ","���ѽ��","����ʱ��","�Ӵ�Ա�˺�"};
		String[][] values = null;
		
		//��ѯ����
		Account account = (Account)request.getSession().getAttribute("account");
		List<Consumption> consumption = mapper.getAllConsumptionByB_id(account.getB_id());
		
		//����������ת��ΪString����
		int n = consumption.size();
		values = new String[n][6];
		for(int i=0;i<n;i++) {
			values[i][0] = consumption.get(i).getId() + "";
			values[i][1] = consumption.get(i).getVip_account() + "";
			values[i][2] = consumption.get(i).getType() + "";
			values[i][3] = consumption.get(i).getMoney() + "";
			values[i][4] = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(consumption.get(i).getDate());
			values[i][5] = consumption.get(i).getBus_account() + "";
		}
		
		
		//����HSSFWorkbook 
		HSSFWorkbook wb = getHSSFWorkbook(sheetName, title, values, null);
		
		//��Ӧ���ͻ���
		setResponseHeader(response, fileName);
		try {
			OutputStream os = response.getOutputStream();
			wb.write(os);
			os.flush();
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	@RequestMapping("/rechargeHistory")
	public void issuerAccount(HttpServletRequest request,HttpServletResponse response) {
		
		//excel�ļ���
		String fileName = "��ֵ��ʷ" + ".xls";
		//sheet��
		String sheetName = "��ֵ��ʷ";
		//excel����
		String[] title = {"��ֵ���","��Ա�˺�","��ֵ���","��ֵʱ��","�Ӵ�Ա�˺�"};
		String[][] values = null;
		
		//��ѯ����
		Account account = (Account)request.getSession().getAttribute("account");
		List<Recharge_history> recharge_history= mapper.getAllRecharge_historyByB_id(account.getB_id());
		
		//����������ת��ΪString����
		int n = recharge_history.size();
		values = new String[n][5];
		for(int i=0;i<n;i++) {
			values[i][0] = recharge_history.get(i).getId() + "";
			values[i][1] = recharge_history.get(i).getVip_account() + "";
			values[i][2] = recharge_history.get(i).getMoney() + "";
			values[i][3] = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(recharge_history.get(i).getDate());
			values[i][4] = recharge_history.get(i).getBus_account() + "";
		}
		
		
		//����HSSFWorkbook 
		HSSFWorkbook wb = getHSSFWorkbook(sheetName, title, values, null);
		
		//��Ӧ���ͻ���
		setResponseHeader(response, fileName);
		try {
			OutputStream os = response.getOutputStream();
			wb.write(os);
			os.flush();
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	
	public  HSSFWorkbook getHSSFWorkbook(String sheetName,String []title,String [][]values, HSSFWorkbook wb){

        // ��һ��������һ��HSSFWorkbook����Ӧһ��Excel�ļ�
        if(wb == null){
            wb = new HSSFWorkbook();
        }

        // �ڶ�������workbook�����һ��sheet,��ӦExcel�ļ��е�sheet
        HSSFSheet sheet = wb.createSheet(sheetName);

        // ����������sheet����ӱ�ͷ��0��,ע���ϰ汾poi��Excel����������������
        HSSFRow row = sheet.createRow(0);

        // ���Ĳ���������Ԫ�񣬲�����ֵ��ͷ ���ñ�ͷ����
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HorizontalAlignment.CENTER); // ����һ�����и�ʽ

        //�����ж���
        HSSFCell cell = null;

        //��������
        for(int i=0;i<title.length;i++){
            cell = row.createCell(i);
            cell.setCellValue(title[i]);
            cell.setCellStyle(style);
        }

        //��������
        for(int i=0;i<values.length;i++){
            row = sheet.createRow(i + 1);
            for(int j=0;j<values[i].length;j++){
                //�����ݰ�˳�򸳸���Ӧ���ж���
                row.createCell(j).setCellValue(values[i][j]);
            }
        }
        return wb;
    }
	
	//������Ӧ������
    public  void setResponseHeader(HttpServletResponse response, String fileName) {
        try {
            try {
                fileName = new String(fileName.getBytes(),"ISO8859-1");
            } catch (UnsupportedEncodingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            response.setContentType("application/octet-stream;charset=ISO8859-1");
            response.setHeader("Content-Disposition", "attachment;filename="+ fileName);
            response.addHeader("Pargam", "no-cache");
            response.addHeader("Cache-Control", "no-cache");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
	
}
