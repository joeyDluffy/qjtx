package qjtx.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import qjtx.dao.QjordersMapper;
import qjtx.pojo.Qjorders;


@Service
public class QjorderService {


	@Autowired
	QjordersMapper qjordersMapper;
	
	public int commidOrder(Qjorders qjorders) {
		int ret = 0;
		ret = qjordersMapper.insert(qjorders);
		return ret;

	}


}
