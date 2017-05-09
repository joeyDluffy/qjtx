package qjtx.action;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;


@Controller
public class Qjsign extends ActionSupport {


	/**
	 * 
	 */
	private static final long serialVersionUID = 7304053604230479092L;
	private static final String appSecret = "62b83473b750a7fe07ab8bdb5fb42ba5";
	
	@Override
	public String execute() throws Exception {

//		String sign = Hex(HmacMD5(appSecret+"appkey"+appkey+"instance_id"+instance_id +"ts"+ts+appSecret));
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
