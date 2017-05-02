package qjtx.action;


import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


import com.opensymphony.xwork2.ActionSupport;

import qjtx.pojo.SalesDataDay;
import qjtx.pojo.VReportSalesData;
import qjtx.service.SalesService;

@Controller
public class ReportSalesData extends ActionSupport {
	
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
		SimpleDateFormat formatDay = new SimpleDateFormat("yyyy-MM-dd");
		while (retry > 0) {
			try {
				if (retry != 3) {
					Thread.sleep(300);
				}
				if (retry > 0) {
					if (saledaySelect == null || "".equals(saledaySelect)) {
						resList = salesService.getReportData();
					} else {
						//按选中时间取数formatDay.parse(saleday)
						resList = salesService.getReportData(formatDay.parse(saledaySelect));
					}
					
					this.success = true;
					retry = -1;
				}
			} catch (Exception e) {
				retry--;
			}
		}
		return SUCCESS;
		
	}

	private String saledaySelect;

	public String getSaledaySelect() {
		return saledaySelect;
	}

	public void setSaledaySelect(String saledaySelect) {
		this.saledaySelect = saledaySelect;
	}

	private String cid;

	
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
	
	private List<VReportSalesData> resList;

	public List<VReportSalesData> getResList() {
		return resList;
	}

	public void setResList(List<VReportSalesData> resList) {
		this.resList = resList;
	}

}
