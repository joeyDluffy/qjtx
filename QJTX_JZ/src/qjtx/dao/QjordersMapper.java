package qjtx.dao;

import qjtx.pojo.Qjorders;

public interface QjordersMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qj_orders
     *
     * @mbg.generated Tue May 02 19:11:27 CST 2017
     */
    int deleteByPrimaryKey(String orderid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qj_orders
     *
     * @mbg.generated Tue May 02 19:11:27 CST 2017
     */
    int insert(Qjorders record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qj_orders
     *
     * @mbg.generated Tue May 02 19:11:27 CST 2017
     */
    int insertSelective(Qjorders record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qj_orders
     *
     * @mbg.generated Tue May 02 19:11:27 CST 2017
     */
    Qjorders selectByPrimaryKey(String orderid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qj_orders
     *
     * @mbg.generated Tue May 02 19:11:27 CST 2017
     */
    int updateByPrimaryKeySelective(Qjorders record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qj_orders
     *
     * @mbg.generated Tue May 02 19:11:27 CST 2017
     */
    int updateByPrimaryKey(Qjorders record);
}