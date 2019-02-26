package com.hd.general;

/**
 * 
 * @author geek1116
 * 返回给前端 响应对象
 *
 */
public class Response {
	
    private Object data;
    
    private String status;
    
    private String message;
    
    public Response(){super();}
    
    public Response(Object data, String status, String message) {
        super();
        this.data = data;
        this.status = status;
        this.message = message;
    }
    
    public Object getData() {
        return data;
    }
    
    public void setData(Object data) {
        this.data = data;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}