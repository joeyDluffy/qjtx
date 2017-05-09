package qjtx.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import qjtx.pojo.Operationuser;
import qjtx.pojo.Qjoperaters;
import qjtx.pojo.SalesDataStore;
import qjtx.service.QjmanageService;
import qjtx.service.SalesService;
import sun.misc.BASE64Decoder;

@Controller
public class Qjlogin extends ActionSupport {

	public static String getBASE64(String s) {
		if (s == null) {
			return null;
		}
		return (new sun.misc.BASE64Encoder()).encode(s.getBytes());
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 3304647094511763708L;
	@Autowired
	QjmanageService qjmanageService;

	@Override
	public String execute() throws Exception {
		this.success = true;
		int retry = 3;
		if (username == null || "".equals(username)) {
			return Action.LOGIN;
		}
		String pwd = getBASE64(password);
		// String pwd = getBASE64(password).replace("=", "");
		while (retry > 0) {
			try {
				if (retry != 3) {
					Thread.sleep(300);
				}
				if (retry > 0) {
					Qjoperaters u = qjmanageService.login(username);
					if (u != null && u.getOperaterid().equals(username) && u.getOpassword().equals(pwd)) {
						userdisplayname = u.getOperatername();
						ActionContext.getContext().getSession().put("qjop_user", username);
						this.success = true;
						return SUCCESS;
					}
					retry = -1;
					this.success = false;
					return ERROR;
				}
			} catch (Exception e) {
				retry--;
			}
		}

		return SUCCESS;

	}

	private boolean success;
	private String username;
	private String userdisplayname;
	private int reviewopid;

	public int getReviewopid() {
		return reviewopid;
	}

	public void setReviewopid(int reviewopid) {
		this.reviewopid = reviewopid;
	}

	public String getUsername() {
		return username;
	}

	public String getUserdisplayname() {
		return userdisplayname;
	}

	public void setUserdisplayname(String userdisplayname) {
		this.userdisplayname = userdisplayname;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	private String password;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

}
