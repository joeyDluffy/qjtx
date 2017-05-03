package qjtx.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import qjtx.dao.QjordersMapper;


@Service
public class QjorderService {


	@Autowired
	QjordersMapper qjordersMapper;
	
	

}
