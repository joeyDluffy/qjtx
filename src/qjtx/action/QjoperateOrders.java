package qjtx.action;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ApplicationAware;
import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import qjtx.pojo.Qjorders;
import qjtx.service.QjmanageService;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import sun.misc.BASE64Decoder;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.internal.util.StringUtils;
import com.taobao.api.request.AlibabaAliqinTradeCreateRequest;
import com.taobao.api.request.AlibabaAliqinTradeCreateRequest.Exproperty;
import com.taobao.api.response.AlibabaAliqinTradeCreateResponse;

@Controller
public class QjoperateOrders extends ActionSupport {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3304647094511763708L;
	@Autowired
	QjmanageService qjmanageService;
	
	@Override
	public String execute() throws Exception {
		this.success = true;
		int retry = 3;
		if (orderid == null || "".equals(orderid)) {
			return INPUT;
		}
		Date reviewTime = new Date();
		Qjorders sd = new Qjorders();
		sd.setOrderid(Integer.valueOf(orderid));
		operatestatus = URLDecoder.decode(operatestatus, "UTF-8");
		sd.setOperatestatus(operatestatus);
		sd.setOperaterid(reviewopid);
		sd.setOperatetime(reviewTime);
		if (tborderid !=null & !"".equals(tborderid) 
				&& operatestatus !=null & !"".equals(operatestatus) 
				&& "签订成功".equals(operatestatus)){
//			TaobaoClient client = new DefaultTaobaoClient(url, appkey, secret);
//			WtTradeOrderResultcallbackRequest req = new WtTradeOrderResultcallbackRequest();
//			OrderResultDto obj1 = new OrderResultDto();
//			obj1.setDesc("定单处理完成");
//			obj1.setOrderNo(12345678L);
//			obj1.setResultCode("0000");
//			obj1.setSuccess(true);
//			req.setParam0(obj1);
//			WtTradeOrderResultcallbackResponse rsp = client.execute(req, sessionKey);
//			System.out.println(rsp.getBody());
			sd.setOpstatus_value(2);
		} else {
			if (tborderid !=null & !"".equals(tborderid)){
				sd.setOpstatus_value(1);
			} else {
				sd.setOpstatus_value(0);
			}
		}
		sd.setTb_orderid(tborderid);
		while (retry > 0) {
			try {
				if (retry != 3) {
					Thread.sleep(300);
				}
				if (retry > 0) {
					qjmanageService.operateOrders(sd);
					this.success = true;
					retry = -1;
				}
			} catch (Exception e) {
				retry--;
			}
		}
		
		//更新淘宝订单状态：
		
		
		
		return SUCCESS;
		
	}


	private String orderid;
	private String reviewopid;
	private String tborderid;
	private String operatestatus;


	public String getOperatestatus() {
		return operatestatus;
	}

	public void setOperatestatus(String operatestatus) {
		this.operatestatus = operatestatus;
	}

	public String getTborderid() {
		return tborderid;
	}

	public void setTborderid(String tborderid) {
		this.tborderid = tborderid;
	}

	public String getReviewopid() {
		return reviewopid;
	}

	public void setReviewopid(String reviewopid) {
		this.reviewopid = reviewopid;
	}


	private String saletotal;
	public String getSaletotal() {
		return saletotal;
	}

	public void setSaletotal(String saletotal) {
		this.saletotal = saletotal;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}


	private String qty;
	public String getOrderid() {
		return orderid;
	}

	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}

	private boolean success;


	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}


}
