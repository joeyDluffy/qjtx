package qjtx.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import qjtx.dao.OperationuserMapper;
import qjtx.dao.QjoperatersMapper;
import qjtx.dao.QjordersMapper;
import qjtx.dao.SalesDataDayMapper;
import qjtx.dao.SalesDataStoreMapper;
import qjtx.dao.VReportSalesDataMapper;
import qjtx.pojo.Operationuser;
import qjtx.pojo.Qjoperaters;
import qjtx.pojo.SalesDataDay;
import qjtx.pojo.SalesDataStore;
import qjtx.pojo.VReportSalesData;
import qjtx.pojo.VReportSalesDataForOp;

@Service
public class QjmanageService {


	@Autowired
	QjoperatersMapper qjoperatersMapper;
	
	@Autowired
	QjordersMapper qjordersMapper;
	
	
	//qjlogin
	public Qjoperaters login(String operaterid) {
		Qjoperaters res = null;

		try {
			//
			res = qjoperatersMapper.selectByPrimaryKey(operaterid);
		} catch (Exception e) {

		}
		return res;
	}
	
}
