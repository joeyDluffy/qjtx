package qjtx.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import util.MD5Util;

@Controller
public class Qjsign_zd extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7304053604230479092L;
	private static final String appSecret = "62b83473b750a7fe07ab8bdb5fb42ba5";
	private static final long hour6 = 21600000;

	@Override
	public String execute() throws Exception {
//		HttpServletResponse response = ServletActionContext.getResponse();
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
		} catch (Exception e) {
//			response.setStatus(403);
//			response.setHeader("异常", "验证未通过");
			return "errorsign";
		}
//		response.setStatus(200);
		return SUCCESS;

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

}
