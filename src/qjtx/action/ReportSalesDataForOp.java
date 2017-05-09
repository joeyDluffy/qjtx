package qjtx.action;

import java.text.SimpleDateFormat;
import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;

import qjtx.pojo.SalesDataDay;
import qjtx.pojo.VReportSalesData;
import qjtx.pojo.VReportSalesDataForOp;
import qjtx.service.SalesService;

@Controller
public class ReportSalesDataForOp extends ActionSupport {

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
		String saleImageFiles = ServletActionContext.getServletContext().getRealPath("/saleImageFiles");
		while (retry > 0) {
			try {
				if (retry != 3) {
					Thread.sleep(300);
				}
				if (retry > 0) {
					// 按选中时间取数formatDay.parse(saleday)
					resList = salesService.getOPReportData(formatDay.parse(saledaySelect), floor);
					this.success = true;
					retry = -1;
				}
			} catch (Exception e) {
				retry--;
			}
		}
		for (int i = 0; i < resList.size(); i++) {
			resList.get(i).setId(i + 1);
			if (resList.get(i).getImgfile() != null) {
				String[] imgFiles = resList.get(i).getImgfile().split(";");
				try {
					resList.get(i).setImgfile1(imgFiles[0]);
					resList.get(i).setImgfile2(imgFiles[1]);
					resList.get(i).setImgfile3(imgFiles[2]);
					resList.get(i).setImgfile4(imgFiles[3]);
				} catch (Exception e) {
					
				}
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
	
	private String floor;

	public String getFloor() {
		return floor;
	}

	public void setFloor(String floor) {
		this.floor = floor;
	}

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

	private List<VReportSalesDataForOp> resList;

	public List<VReportSalesDataForOp> getResList() {
		return resList;
	}

	public void setResList(List<VReportSalesDataForOp> resList) {
		this.resList = resList;
	}

}
