package qjtx.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import qjtx.pojo.VReportSalesData;
import qjtx.pojo.VReportSalesDataForOp;

public interface VReportSalesDataMapper {
	
    List<VReportSalesData> getAllReport();
    
    List<VReportSalesData> getReviewedReportData();
    
    List<VReportSalesData> selectByDate(Date saleday);
    
    List<VReportSalesDataForOp> getOpReportData(@Param("saleday")Date saleday, @Param("floor")String floor);
}