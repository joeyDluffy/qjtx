package qjtx.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import qjtx.dao.QjoperatersMapper;
import qjtx.dao.QjordersMapper;
import qjtx.pojo.Operationuser;
import qjtx.pojo.Qjoperaters;
import qjtx.pojo.Qjorders;

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
	
	
	public List<Qjorders> selectByDate(Date saleday) {
		List<Qjorders> ss = qjordersMapper.selectByDate(saleday);
		return ss;

	}

	
	public int operateOrders(Qjorders qjorders) {
		int ret = 0;
		ret = qjordersMapper.operateByOrderid(qjorders);
		return ret;

	}
}
