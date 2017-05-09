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
public class Qjsign extends ActionSupport {


	@Override
	public String execute() throws Exception {
		

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
