package qjtx.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import qjtx.pojo.Qjorders;

public interface QjordersMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table qj_orders
	 * @mbg.generated  Sun May 21 23:18:35 CST 2017
	 */
	int deleteByPrimaryKey(Integer orderid);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table qj_orders
	 * @mbg.generated  Sun May 21 23:18:35 CST 2017
	 */
	int insert(Qjorders record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table qj_orders
	 * @mbg.generated  Sun May 21 23:18:35 CST 2017
	 */
	int insertSelective(Qjorders record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table qj_orders
	 * @mbg.generated  Sun May 21 23:18:35 CST 2017
	 */
	Qjorders selectByPrimaryKey(Integer orderid);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table qj_orders
	 * @mbg.generated  Sun May 21 23:18:35 CST 2017
	 */
	int updateByPrimaryKeySelective(Qjorders record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table qj_orders
	 * @mbg.generated  Sun May 21 23:18:35 CST 2017
	 */
	int updateByPrimaryKey(Qjorders record);

	/**
	 * 日期为空时取�?30天内的订�?
	 * 日期条件为�?�择日期�?后的�?有订�?
	 */
    List<Qjorders> selectByDate(@Param("saleday")Date saleday);
    
	/**
	 * 更新订单处理
	 */
	int operateByOrderid(Qjorders record);
}