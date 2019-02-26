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
		
		//excel文件名
		String fileName = "消费历史" + ".xls";
		//sheet名
		String sheetName = "消费历史";
		//excel标题
		String[] title = {"消费编号","会员账号","消费方式","消费金额","消费时间","接待员账号"};
		String[][] values = null;
		
		//查询数据
		Account account = (Account)request.getSession().getAttribute("account");
		List<Consumption> consumption = mapper.getAllConsumptionByB_id(account.getB_id());
		
		//将所有数据转换为String类型
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
		
		
		//创建HSSFWorkbook 
		HSSFWorkbook wb = getHSSFWorkbook(sheetName, title, values, null);
		
		//响应到客户端
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
		
		//excel文件名
		String fileName = "充值历史" + ".xls";
		//sheet名
		String sheetName = "充值历史";
		//excel标题
		String[] title = {"充值编号","会员账号","充值金额","充值时间","接待员账号"};
		String[][] values = null;
		
		//查询数据
		Account account = (Account)request.getSession().getAttribute("account");
		List<Recharge_history> recharge_history= mapper.getAllRecharge_historyByB_id(account.getB_id());
		
		//将所有数据转换为String类型
		int n = recharge_history.size();
		values = new String[n][5];
		for(int i=0;i<n;i++) {
			values[i][0] = recharge_history.get(i).getId() + "";
			values[i][1] = recharge_history.get(i).getVip_account() + "";
			values[i][2] = recharge_history.get(i).getMoney() + "";
			values[i][3] = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(recharge_history.get(i).getDate());
			values[i][4] = recharge_history.get(i).getBus_account() + "";
		}
		
		
		//创建HSSFWorkbook 
		HSSFWorkbook wb = getHSSFWorkbook(sheetName, title, values, null);
		
		//响应到客户端
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

        // 第一步，创建一个HSSFWorkbook，对应一个Excel文件
        if(wb == null){
            wb = new HSSFWorkbook();
        }

        // 第二步，在workbook中添加一个sheet,对应Excel文件中的sheet
        HSSFSheet sheet = wb.createSheet(sheetName);

        // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制
        HSSFRow row = sheet.createRow(0);

        // 第四步，创建单元格，并设置值表头 设置表头居中
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HorizontalAlignment.CENTER); // 创建一个居中格式

        //声明列对象
        HSSFCell cell = null;

        //创建标题
        for(int i=0;i<title.length;i++){
            cell = row.createCell(i);
            cell.setCellValue(title[i]);
            cell.setCellStyle(style);
        }

        //创建内容
        for(int i=0;i<values.length;i++){
            row = sheet.createRow(i + 1);
            for(int j=0;j<values[i].length;j++){
                //将内容按顺序赋给对应的列对象
                row.createCell(j).setCellValue(values[i][j]);
            }
        }
        return wb;
    }
	
	//发送响应流方法
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
