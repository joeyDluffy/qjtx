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

import qjtx.pojo.SalesDataDay;
import qjtx.service.SalesService;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import sun.misc.BASE64Decoder;

@Controller
public class ReviewSalesData extends ActionSupport {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3304647094511763708L;
	@Autowired
	SalesService salesService;
	
	@Override
	public String execute() throws Exception {
		this.success = true;
		int retry = 3;
		if (cid == null || "".equals(cid)) {
			return INPUT;
		}
		Date reviewTime = new Date();
		SalesDataDay sd = new SalesDataDay();
		sd.setCid(Integer.valueOf(cid));
		sd.setSaletotal(Double.valueOf(saletotal));
		sd.setQty(Integer.valueOf(qty));
		sd.setReviewed(1);
		sd.setReviewopid(reviewopid);
		sd.setReviewtime(reviewTime);
		while (retry > 0) {
			try {
				if (retry != 3) {
					Thread.sleep(300);
				}
				if (retry > 0) {
					salesService.reviewSalesDataDay(sd);
					this.success = true;
					retry = -1;
				}
			} catch (Exception e) {
				retry--;
			}
		}
		return SUCCESS;
		
	}


	private String cid;
	private int reviewopid;
	public int getReviewopid() {
		return reviewopid;
	}

	public void setReviewopid(int reviewopid) {
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
	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	private boolean success;


	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}


}
