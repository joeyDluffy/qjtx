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
import qjtx.pojo.SalesData;
import qjtx.pojo.SalesDataDay;
import qjtx.service.QjorderService;
import qjtx.service.SalesService;

import com.opensymphony.xwork2.ActionSupport;

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
		Date updateTime = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd--HHmmss");
		SimpleDateFormat formatDay = new SimpleDateFormat("yyyy-MM-dd");
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
			qjorder.setOrderprice(Double.valueOf(qjorderdata.getOrderprice()));
			qjorder.setMix_user_id(qjorderdata.getMix_user_id());
			qjorder.setOrdertime(updateTime);
			qjorder.setService_type(qjorderdata.getService_type());
			qjorder.setPackage_name(qjorderdata.getPackage_name());
			qjorder.setMonthly_fee(Double.valueOf(qjorderdata.getMonthly_fee()));
			qjorder.setBroadband_rat(qjorderdata.getBroadband_rat());
			qjorder.setPackage_price(Double.valueOf(qjorderdata.getPackage_price()));
			qjorder.setContract_period(qjorderdata.getContract_period());
			qjorder.setPackage_details(qjorderdata.getPackage_details());
			qjorder.setMobile(qjorderdata.getMobile());
			qjorder.setId_number(qjorderdata.getId_number());
			qjorder.setCname(qjorderdata.getCname());
			qjorder.setInstallation_address(qjorderdata.getInstallation_address());
			qjorder.setOperatestatus(0);
			
		} catch (Exception e) {

		}

		while (retry > 0) {
			try {
				if (retry != 3) {
					Thread.sleep(300);
				}
				if (retry > 0) {
					res = qjorderService.commidOrder(qjorder);
					retry = -1;
				}
			} catch (Exception e) {
				retry--;
			}
		}
		//阿里订单生成
		
		
		
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

}
