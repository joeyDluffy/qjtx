package qjtx.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import qjtx.dao.QjitemtypesMapper;
import qjtx.dao.QjordersMapper;
import qjtx.pojo.Qjitemtypes;
import qjtx.pojo.Qjoperaters;
import qjtx.pojo.Qjorders;


@Service
public class QjorderService {


	@Autowired
	QjordersMapper qjordersMapper;
	
	@Autowired
	QjitemtypesMapper qjitemtypesMapper;
	
	public int commidOrder(Qjorders qjorders) {
		int ret = 0;
		ret = qjordersMapper.insert(qjorders);
		return ret;

	}

	//
	public Qjitemtypes getItemType(String itemid) {
		Qjitemtypes res = null;

		try {
			//
			res = qjitemtypesMapper.selectByPrimaryKey(itemid);
		} catch (Exception e) {

		}
		return res;
	}

}
