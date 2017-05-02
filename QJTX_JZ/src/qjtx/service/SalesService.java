package qjtx.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import qjtx.dao.OperationuserMapper;
import qjtx.dao.SalesDataDayMapper;
import qjtx.dao.SalesDataStoreMapper;
import qjtx.dao.VReportSalesDataMapper;
import qjtx.pojo.Operationuser;
import qjtx.pojo.SalesDataDay;
import qjtx.pojo.SalesDataStore;
import qjtx.pojo.VReportSalesData;
import qjtx.pojo.VReportSalesDataForOp;

@Service
public class SalesService {

	@Autowired
	SalesDataDayMapper salesDataDayMapper;

	@Autowired
	SalesDataStoreMapper salesDataStoreMapper;

	@Autowired
	VReportSalesDataMapper vReportSalesDataMapper;
	
	@Autowired
	OperationuserMapper operationuserMapper;

	public SalesDataStore getStoreProduct(String linkString) {
		SalesDataStore res = null;

		try {
			//
			res = salesDataStoreMapper.selectByLinkString(linkString);
		} catch (Exception e) {

		}
		return res;
	}

	public int saveSalesDataDay(SalesDataDay salesDataDay) {
		int ret = 0;
		ret = salesDataDayMapper.insert(salesDataDay);
		return ret;

	}

	public int reviewSalesDataDay(SalesDataDay salesDataDay) {
		int ret = 0;
		ret = salesDataDayMapper.reviewByCid(salesDataDay);
		return ret;

	}

	public List<VReportSalesData> getReportData(Date saleday) {
		List<VReportSalesData> vd = vReportSalesDataMapper.selectByDate(saleday);
		return vd;

	}

	public List<VReportSalesData> getReportData() {
		List<VReportSalesData> vd = vReportSalesDataMapper.getAllReport();
		return vd;

	}

	public List<VReportSalesDataForOp> getOPReportData(Date saleday, String floor) {
		List<VReportSalesDataForOp> vdop = vReportSalesDataMapper.getOpReportData(saleday, floor);
		return vdop;

	}
	
	
	public Operationuser login(String username) {
		Operationuser res = null;

		try {
			//
			res = operationuserMapper.checkpassword(username);
		} catch (Exception e) {

		}
		return res;
	}

}
