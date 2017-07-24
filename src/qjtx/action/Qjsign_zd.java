package qjtx.action;

import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import qjtx.pojo.Qjitemtypes;
import qjtx.service.QjorderService;
import util.MD5Util;

@Controller
public class Qjsign_zd extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7304053604230479092L;
	private static final String appSecret = "62b83473b750a7fe07ab8bdb5fb42ba5";
	private static final long hour6 = 21600000;
	
	@Autowired
	QjorderService qjorderService;

	@Override
	public String execute() throws Exception {
//		HttpServletResponse response = ServletActionContext.getResponse();
		Qjitemtypes type;
		try {
			long tsvalue = Long.valueOf(ts);
			long now = System.currentTimeMillis();

			if ((now - tsvalue) > hour6 || (now - tsvalue) < -hour6) {
//				response.setStatus(403);
//				response.setHeader("时间戳验证失败", "过期");
				return "errortime";
			}
			String signQJ = MD5Util
					.string2MD5(appSecret + "appkey" + appkey + "instance_id" + instance_id + "ts" + ts + appSecret);
			if (!signQJ.equalsIgnoreCase(sign)) {
//				response.setStatus(403);
//				response.setHeader("签名验证失败", "签名无效");
				return "errorsign";
			}
			type = qjorderService.getItemType(itemId);
		} catch (Exception e) {
//			response.setStatus(403);
//			response.setHeader("异常", "验证未通过");
			return "errorsign";
		}
//		response.setStatus(200);

//		if ("553190791473".equals(itemId)) {
//			tcType = "资费签约";
//			tcPrice = "58元";
//			tcPeroid = "12个月";
//			return "redirectSuccess";
//		} else if ("553046900688".equals(itemId)) {
//			tcType = "资费签约";
//			tcPrice = "88元";
//			tcPeroid = "12个月";
//			return "redirectSuccess";
//		} else if ("553047204536".equals(itemId)) {
//			tcType = "资费签约";
//			tcPrice = "108元";
//			tcPeroid = "12个月";
//			return "redirectSuccess";
//		} else if ("553193263462".equals(itemId)) {
//			tcType = "资费签约";
//			tcPrice = "138元";
//			tcPeroid = "12个月";
//			return "redirectSuccess";
//		} else if ("553048056036".equals(itemId)) {
//			tcType = "资费签约";
//			tcPrice = "158元";
//			tcPeroid = "12个月";
//			return "redirectSuccess";
//		} else if ("553115601096".equals(itemId)) {
//			tcType = "4G签约赠话费";
//			tcPrice = "58元";
//			tcPeroid = "18个月";
//			return "redirectSuccess";
//		} else if ("553193767320".equals(itemId)) {
//			tcType = "4G签约赠话费";
//			tcPrice = "88元";
//			tcPeroid = "18个月";
//			return "redirectSuccess";
//		} else if ("553115589645".equals(itemId)) {
//			tcType = "4G签约赠话费";
//			tcPrice = "108元";
//			tcPeroid = "18个月";
//			return "redirectSuccess";
//		} else if ("553115665584".equals(itemId)) {
//			tcType = "4G签约赠话费";
//			tcPrice = "128元";
//			tcPeroid = "18个月";
//			return "redirectSuccess";
//		} else if ("553193815861".equals(itemId)) {
//			tcType = "4G签约赠话费";
//			tcPrice = "158元";
//			tcPeroid = "18个月";
//			return "redirectSuccess";
//		}
		java.text.DateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date expired = sdf.parse("2017-10-21 18:00:00"); 
		Date now = new Date();
		if (now.after(expired)) {
			return "errortime"; 
		}
		if (type == null || !itemId.equals(type.getItemid())) {
			tcType="移动飞享套餐";
			return SUCCESS;
		} else {
			tcType = type.getTctype();
			String[] price =type.getTcprice().split(";");
			try {
				tcPrice = price[0];
				tcPrice2 = price[1];
				tcPrice3 = price[2];
			} catch(Exception e){
				
			}
			
			tcPeroid = type.getTcperiod();
			return type.getResultstring();
		}

	}

	private boolean success;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getTs() {
		return ts;
	}

	public void setTs(String ts) {
		this.ts = ts;
	}

	public String getAppkey() {
		return appkey;
	}

	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}

	public String getInstance_id() {
		return instance_id;
	}

	public void setInstance_id(String instance_id) {
		this.instance_id = instance_id;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public String getTradeToken() {
		return tradeToken;
	}

	public void setTradeToken(String tradeToken) {
		this.tradeToken = tradeToken;
	}

	public String getMixUserId() {
		return mixUserId;
	}

	public void setMixUserId(String mixUserId) {
		this.mixUserId = mixUserId;
	}

	private String ts;
	private String appkey;
	private String instance_id;
	private String sign;

	private String itemId;
	private String tradeToken;
	private String mixUserId;
	
	private String tcType;
	private String tcPrice;
	private String tcPeroid;
	private String tcPrice2;
	private String tcPrice3;
	
	public String getTcPrice2() {
		return tcPrice2;
	}

	public void setTcPrice2(String tcPrice2) {
		this.tcPrice2 = tcPrice2;
	}

	public String getTcPrice3() {
		return tcPrice3;
	}

	public void setTcPrice3(String tcPrice3) {
		this.tcPrice3 = tcPrice3;
	}



	public String getTcType() {
		return tcType;
	}

	public void setTcType(String tcType) {
		this.tcType = tcType;
	}

	public String getTcPrice() {
		return tcPrice;
	}

	public void setTcPrice(String tcPrice) {
		this.tcPrice = tcPrice;
	}

	public String getTcPeroid() {
		return tcPeroid;
	}

	public void setTcPeroid(String tcPeroid) {
		this.tcPeroid = tcPeroid;
	}

}
