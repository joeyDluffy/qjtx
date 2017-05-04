package qjtx.pojo;

import java.util.Date;
import java.util.List;

public class Qjorderdata {
    private List<String> imageList;

	public List<String> getImageList() {
		return imageList;
	}

	public void setImageList(List<String> imageList) {
		this.imageList = imageList;
	}

	public String getItem_id() {
		return item_id;
	}

	public void setItem_id(String item_id) {
		this.item_id = item_id;
	}

	public String getMerchant_order_id() {
		return merchant_order_id;
	}

	public void setMerchant_order_id(String merchant_order_id) {
		this.merchant_order_id = merchant_order_id;
	}

	public String getOrderprice() {
		return orderprice;
	}

	public void setOrderprice(String orderprice) {
		this.orderprice = orderprice;
	}

	public String getMix_user_id() {
		return mix_user_id;
	}

	public void setMix_user_id(String mix_user_id) {
		this.mix_user_id = mix_user_id;
	}

	public String getOrdertime() {
		return ordertime;
	}

	public void setOrdertime(String ordertime) {
		this.ordertime = ordertime;
	}

	public String getService_type() {
		return service_type;
	}

	public void setService_type(String service_type) {
		this.service_type = service_type;
	}

	public String getPackage_name() {
		return package_name;
	}

	public void setPackage_name(String package_name) {
		this.package_name = package_name;
	}

	public String getMonthly_fee() {
		return monthly_fee;
	}

	public void setMonthly_fee(String monthly_fee) {
		this.monthly_fee = monthly_fee;
	}

	public String getBroadband_rat() {
		return broadband_rat;
	}

	public void setBroadband_rat(String broadband_rat) {
		this.broadband_rat = broadband_rat;
	}

	public String getPackage_price() {
		return package_price;
	}

	public void setPackage_price(String package_price) {
		this.package_price = package_price;
	}

	public String getContract_period() {
		return contract_period;
	}

	public void setContract_period(String contract_period) {
		this.contract_period = contract_period;
	}

	public String getPackage_details() {
		return package_details;
	}

	public void setPackage_details(String package_details) {
		this.package_details = package_details;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getId_number() {
		return id_number;
	}

	public void setId_number(String id_number) {
		this.id_number = id_number;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public String getInstallation_address() {
		return installation_address;
	}

	public void setInstallation_address(String installation_address) {
		this.installation_address = installation_address;
	}
	//商品id
	private String item_id;
	//奇杰订单号 qj000000+count
	private String merchant_order_id;
	//订单价格
	private String orderprice;
	//买家混淆id
	private String mix_user_id;
	//订单时间
	private String ordertime;
	//套餐业务（阿里）
	private String service_type;
	//套餐业务  合约类型
	private String package_name;
	//每月承诺消费
	private String monthly_fee;
	//宽带速率
	private String broadband_rat;
	//合约总价
	private String package_price;
	//合约期
	private String contract_period;
	//套餐详情
	private String package_details;
	//手机号
	private String mobile;
	//身份证号
	private String id_number;
	//客户姓名
	private String cname;
	//身份证号
	private String installation_address;

}