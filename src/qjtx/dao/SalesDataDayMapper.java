package qjtx.dao;

import qjtx.pojo.SalesDataDay;

public interface SalesDataDayMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table salesdata_day
     *
     * @mbg.generated Mon Nov 07 12:05:58 CST 2016
     */
    int deleteByPrimaryKey(Integer cid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table salesdata_day
     *
     * @mbg.generated Mon Nov 07 12:05:58 CST 2016
     */
    int insert(SalesDataDay record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table salesdata_day
     *
     * @mbg.generated Mon Nov 07 12:05:58 CST 2016
     */
    int insertSelective(SalesDataDay record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table salesdata_day
     *
     * @mbg.generated Mon Nov 07 12:05:58 CST 2016
     */
    SalesDataDay selectByPrimaryKey(Integer cid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table salesdata_day
     *
     * @mbg.generated Mon Nov 07 12:05:58 CST 2016
     */
    int updateByPrimaryKeySelective(SalesDataDay record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table salesdata_day
     *
     * @mbg.generated Mon Nov 07 12:05:58 CST 2016
     */
    int updateByPrimaryKey(SalesDataDay record);
    

    int reviewByCid(SalesDataDay record);
}