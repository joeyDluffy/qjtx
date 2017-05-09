package qjtx.action;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.lang.reflect.Array;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import qjtx.pojo.Qjorderdata;
import qjtx.pojo.Qjorders;
import qjtx.service.QjorderService;

import com.opensymphony.xwork2.ActionSupport;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.internal.util.StringUtils;
import com.taobao.api.request.AlibabaAliqinTradeCreateRequest;
import com.taobao.api.request.AlibabaAliqinTradeCreateRequest.Exproperty;
import com.taobao.api.response.AlibabaAliqinTradeCreateResponse;

import sun.misc.BASE64Decoder;

@Controller
public class QjcommitOrder extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4840234228438863499L;
	
	
	@Autowired
	QjorderService qjorderService;
	
	private Qjorderdata qjorderdata;
	
	
	public Qjorderdata getQjorderdata() {
		return qjorderdata;
	}

	public void setQjorderdata(Qjorderdata qjorderdata) {
		this.qjorderdata = qjorderdata;
	}

	@Override
	public String execute() throws Exception {
		
		Date updateTime = new Date();
		Date expiryDate = new Date(updateTime.getTime() + 300000);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd--HHmmss");
		/*----*/
		//阿里订单生成
		TaobaoClient client = new DefaultTaobaoClient("https://eco.taobao.com/router/rest?format=json", "23759189", "62b83473b750a7fe07ab8bdb5fb42ba5");
		//sandbox
		//TaobaoClient client = new DefaultTaobaoClient("https://gw.api.tbsandbox.com/router/rest", "23759189", "62b83473b750a7fe07ab8bdb5fb42ba5");
		AlibabaAliqinTradeCreateRequest req = new AlibabaAliqinTradeCreateRequest();
		Exproperty obj1 = new Exproperty();

		try {
			obj1.setMonthlyFee(qjorderdata.getMonthly_fee());
			obj1.setBroadbandRate(qjorderdata.getBroadband_rat());
			obj1.setEffectiveDate("");
			obj1.setContractPeriod(qjorderdata.getContract_period());
			obj1.setPackageDetails(qjorderdata.getPackage_details());
			obj1.setPackageName(qjorderdata.getPackage_name());
			obj1.setOperators("移动");
			obj1.setProvince("上海");
			obj1.setBroadbandAccount("");
			obj1.setMobile(qjorderdata.getMobile());
			obj1.setIdNumber(qjorderdata.getId_number());
			obj1.setName(qjorderdata.getCname());
			obj1.setServiceType(qjorderdata.getService_type());
			obj1.setSource("detail");
			obj1.setInstallationAddress(qjorderdata.getInstallation_address());
			obj1.setPackagePrice("");
			obj1.setPreferentialInfo("");
			obj1.setAttachInfo("qjtx");
			req.setExProperty(obj1);
			//参数解析传入：用户混淆id，商品id，总价，插件id
			req.setMixUserId(qjorderdata.getMix_user_id());
			req.setItemId(Long.valueOf(qjorderdata.getItem_id()));
			req.setTotalPrice("0.01");
			
			req.setExpiryDate(expiryDate);
	//		req.setExpiryDate(StringUtils.parseDateTime("2016-07-29 12:12:12"));
			req.setPluginInstanceId(222L);
			req.setMerchantOrderId("23678698");
		} catch (Exception e) {
			System.out.println(e.getMessage());
			retMessage="奇杰订单创建失败！";
		}
		AlibabaAliqinTradeCreateResponse rsp = client.execute(req);
		if ("非法参数".equals(rsp.getSubMsg())) {
			retMessage="阿里订单创建失败！";
		} else {
			retMessage=rsp.getTradeExtendToken();
		}
		
		String saleImageFiles = ServletActionContext.getServletContext().getRealPath("/saleImageFiles");
		// System.out.println(saleImageFiles);
		File targetFile = new File(saleImageFiles);
		// System.out.println("这是上传图片的路径："+targetFile.getPath());
		if (!targetFile.mkdirs()) {
			targetFile.mkdirs();
		}
		Qjorders qjorder = new Qjorders();
		int retry = 3;
		int res = 0;

		String imgFileString = "";
		// 遍历所有上传图片
		for (int i = 0; i < qjorderdata.getImageList().size(); i++) {
			String saleImageBase64 = ((String) qjorderdata.getImageList().get(i)).replace("data:image/jpeg;base64,", "");
			String imgFileName = qjorderdata.getCname()+ "--" + format.format(updateTime) + "_0" + i + ".jpg";
			GenerateImage(saleImageBase64, saleImageFiles + "/" + imgFileName);
			imgFileString = imgFileString + imgFileName + ";";
		}


		try {
			qjorder.setId_images(imgFileString);
			qjorder.setAttach_info(qjorderdata.getMerchant_order_id());	
			qjorder.setMix_user_id(qjorderdata.getMix_user_id());
			qjorder.setOrdertime(updateTime);
			qjorder.setService_type(qjorderdata.getService_type());
			qjorder.setPackage_name(qjorderdata.getPackage_name());
			qjorder.setBroadband_rat(qjorderdata.getBroadband_rat());
			qjorder.setContract_period(qjorderdata.getContract_period());
			qjorder.setPackage_details(qjorderdata.getPackage_details());
			qjorder.setMobile(qjorderdata.getMobile());
			qjorder.setId_number(qjorderdata.getId_number());
			qjorder.setCname(qjorderdata.getCname());
			qjorder.setInstallation_address(qjorderdata.getInstallation_address());
			qjorder.setOperatestatus("");

			qjorder.setOrderprice(Double.valueOf(qjorderdata.getOrderprice()));
			qjorder.setMonthly_fee(Double.valueOf(qjorderdata.getMonthly_fee()));
			qjorder.setPackage_price(Double.valueOf(qjorderdata.getPackage_price()));
		} catch (Exception e) {
//			System.out.println(e.getMessage());
			retMessage="奇杰订单创建失败！";
		}

		while (retry > 0) {
			try {
				if (retry != 3) {
					Thread.sleep(300);
				}
				if (retry > 0) {
					res = qjorderService.commidOrder(qjorder);
					retry = -1;
					return SUCCESS;
				}
			} catch (Exception e) {
				retry--;
			}
		}
		

		
		return SUCCESS;

	}


	// base64字符串转化成图片
	public static boolean GenerateImage(String imgStr, String fpath) { // 对字节数组字符串进行Base64解码并生成图片
		if (imgStr == null) // 图像数据为空
			return false;
		BASE64Decoder decoder = new BASE64Decoder();
		try {
			// Base64解码
			byte[] b = decoder.decodeBuffer(imgStr);
			for (int i = 0; i < b.length; ++i) {
				if (b[i] < 0) {// 调整异常数据
					b[i] += 256;
				}
			}
			// 生成jpeg图片
			OutputStream out = new FileOutputStream(fpath);
			out.write(b);
			out.flush();
			out.close();
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	
	private String retMessage;


	public String getRetMessage() {
		return retMessage;
	}

	public void setRetMessage(String retMessage) {
		this.retMessage = retMessage;
	}

}
