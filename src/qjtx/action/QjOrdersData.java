package qjtx.action;

import java.text.SimpleDateFormat;
import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;

import qjtx.pojo.Qjorders;
import qjtx.pojo.SalesDataDay;
import qjtx.pojo.VReportSalesData;
import qjtx.pojo.VReportSalesDataForOp;
import qjtx.service.QjmanageService;
import qjtx.service.SalesService;

@Controller
public class QjOrdersData extends ActionSupport {

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
		SimpleDateFormat formatDay = new SimpleDateFormat("yyyy-MM-dd");
		String saleImageFiles = ServletActionContext.getServletContext().getRealPath("/saleImageFiles");
		while (retry > 0) {
			try {
				if (retry != 3) {
					Thread.sleep(300);
				}
				if (retry > 0) {
					// 按选中时间取数formatDay.parse(saleday)
					resList = qjmanageService.selectByDate(formatDay.parse(saledaySelect));
					this.success = true;
					retry = -1;
				}
			} catch (Exception e) {
				retry--;
			}
		}
		for (int i = 0; i < resList.size(); i++) {
			resList.get(i).setId(i + 1);
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


	private boolean success;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	private List<Qjorders> resList;

	public List<Qjorders> getResList() {
		return resList;
	}

	public void setResList(List<Qjorders> resList) {
		this.resList = resList;
	}

}
