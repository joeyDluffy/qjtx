package qjtx.dao;

import qjtx.pojo.Qjuser;

public interface QjuserMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qj_user
     *
     * @mbg.generated Thu Apr 27 11:20:05 CST 2017
     */
    int deleteByPrimaryKey(Integer userid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qj_user
     *
     * @mbg.generated Thu Apr 27 11:20:05 CST 2017
     */
    int insert(Qjuser record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qj_user
     *
     * @mbg.generated Thu Apr 27 11:20:05 CST 2017
     */
    int insertSelective(Qjuser record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qj_user
     *
     * @mbg.generated Thu Apr 27 11:20:05 CST 2017
     */
    Qjuser selectByPrimaryKey(Integer userid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qj_user
     *
     * @mbg.generated Thu Apr 27 11:20:05 CST 2017
     */
    int updateByPrimaryKeySelective(Qjuser record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table qj_user
     *
     * @mbg.generated Thu Apr 27 11:20:05 CST 2017
     */
    int updateByPrimaryKey(Qjuser record);
}