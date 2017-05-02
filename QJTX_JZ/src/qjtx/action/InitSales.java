package qjtx.action;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


import com.opensymphony.xwork2.ActionSupport;

import qjtx.pojo.SalesDataStore;
import qjtx.service.SalesService;

@Controller
public class InitSales extends ActionSupport {
	
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
		if (ls == null || "".equals(ls)) {
			return INPUT;
		}
		
		while (retry > 0) {
			try {
				if (retry != 3) {
					Thread.sleep(300);
				}
				if (retry > 0) {
					salesDataStore = salesService.getStoreProduct(ls);
					saleid = salesDataStore.getSaleid();
					storename = salesDataStore.getStorename();
					productid = salesDataStore.getProductid();
					floor = salesDataStore.getFloor();
					this.success = true;
					
					retry = -1;
				}
			} catch (Exception e) {
				retry--;
			}
		}
		return SUCCESS;
		
	}

	public String getLs() {
		return ls;
	}

	public void setLs(String ls) {
		this.ls = ls;
	}

	public SalesDataStore getSalesDataStore() {
		return salesDataStore;
	}

	public void setSalesDataStore(SalesDataStore salesDataStore) {
		this.salesDataStore = salesDataStore;
	}

	private String ls;
	private SalesDataStore salesDataStore;
	private boolean success;
	private String saleid;
	private String productid;
	private String storename;
	private String floor;
	
	public String getSaleid() {
		return saleid;
	}

	public void setSaleid(String saleid) {
		this.saleid = saleid;
	}

	public String getProductid() {
		return productid;
	}

	public void setProductid(String productid) {
		this.productid = productid;
	}

	public String getStorename() {
		return storename;
	}

	public void setStorename(String storename) {
		this.storename = storename;
	}

	public String getFloor() {
		return floor;
	}

	public void setFloor(String floor) {
		this.floor = floor;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}


}
