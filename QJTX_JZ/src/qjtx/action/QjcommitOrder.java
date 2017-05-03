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
	
	private SalesData salesData;
	
	public SalesData getSalesData() {
		return salesData;
	}

	public void setSalesData(SalesData salesData) {
		this.salesData = salesData;
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
		SalesDataDay sdd = new SalesDataDay();
		int retry = 3;
		int res = 0;
		Date updateTime = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd--HHmmss");
		SimpleDateFormat formatDay = new SimpleDateFormat("yyyy-MM-dd");
		String imgFileString = "";
		// 遍历所有上传图片
		for (int i = 0; i < salesData.getImageList().size(); i++) {
			String saleImageBase64 = ((String) salesData.getImageList().get(i)).replace("data:image/jpeg;base64,", "");
			String imgFileName = salesData.getSaleid() + "--" + format.format(updateTime) + "_0" + i + ".jpg";
			GenerateImage(saleImageBase64, saleImageFiles + "/" + imgFileName);
			imgFileString = imgFileString + imgFileName + ";";
		}

		// String imgFile1 = saleid + "--" + format.format(updateTime) +
		// "_01.jpg";
		// String imgFile = imgFile1;
		// saleImage1Base64 =
		// saleImage1Base64.replace("data:image/jpeg;base64,", "");
		// // System.out.println("imagebase64: "+saleImageBase64);
		// GenerateImage(saleImage1Base64, saleImageFiles + "/" + imgFile1);
		// if (saleImage2Base64 != null && !"".equals(saleImage2Base64)) {
		// String imgFile2 = saleid + "--" + format.format(updateTime) +
		// "_02.jpg";
		// saleImage2Base64 =
		// saleImage2Base64.replace("data:image/jpeg;base64,", "");
		// GenerateImage(saleImage2Base64, saleImageFiles + "/" + imgFile2);
		// imgFile = imgFile + ";" + imgFile2;
		// }
		// if (saleImage3Base64 != null && !"".equals(saleImage3Base64)) {
		// String imgFile3 = saleid + "--" + format.format(updateTime) +
		// "_03.jpg";
		// saleImage3Base64 =
		// saleImage3Base64.replace("data:image/jpeg;base64,", "");
		// GenerateImage(saleImage3Base64, saleImageFiles + "/" + imgFile3);
		// imgFile = imgFile + ";" + imgFile3;
		// }
		// if (saleImage4Base64 != null && !"".equals(saleImage4Base64)) {
		// String imgFile4 = saleid + "--" + format.format(updateTime) +
		// "_04.jpg";
		// saleImage4Base64 =
		// saleImage4Base64.replace("data:image/jpeg;base64,", "");
		// GenerateImage(saleImage4Base64, saleImageFiles + "/" + imgFile4);
		// imgFile = imgFile + ";" + imgFile4;
		// }
		// sdd.setImgfile(imgFile);
		sdd.setImgfile(imgFileString);
		sdd.setSaleid(salesData.getSaleid());
		sdd.setUpdatetime(updateTime);
		try {
			sdd.setSaleday(formatDay.parse(salesData.getSaleday()));
			sdd.setSaletotal(Double.valueOf(salesData.getTotal()));
			sdd.setQty(salesData.getQty());
			sdd.setReviewed(0);
		} catch (Exception e) {

		}

		while (retry > 0) {
			try {
				if (retry != 3) {
					Thread.sleep(300);
				}
				if (retry > 0) {
//					res = salesService.saveSalesDataDay(sdd);
					retry = -1;
				}
			} catch (Exception e) {
				retry--;
			}
		}
		return SUCCESS;

	}

	// public String getSaleid() {
	// return saleid;
	// }
	//
	// public void setSaleid(String saleid) {
	// this.saleid = saleid;
	// }
	//
	// public String getTotal() {
	// return total;
	// }
	//
	// public void setTotal(String total) {
	// this.total = total;
	// }
	//
	// public String getSaleday() {
	// return saleday;
	// }
	//
	// public void setSaleday(String saleday) {
	// this.saleday = saleday;
	// }
	//
	// public int getQty() {
	// return qty;
	// }
	//
	// public void setQty(int qty) {
	// this.qty = qty;
	// }


	// private String saleid;
	// private String total;
	// private String saleday;
	// private int qty;
	// private List imageList;


	// private String saleImage1Base64;
	// private String saleImage2Base64;
	// private String saleImage3Base64;
	// private String saleImage4Base64;

	// public String getSaleImage2Base64() {
	// return saleImage2Base64;
	// }
	//
	// public void setSaleImage2Base64(String saleImage2Base64) {
	// this.saleImage2Base64 = saleImage2Base64;
	// }
	//
	// public String getSaleImage3Base64() {
	// return saleImage3Base64;
	// }
	//
	// public void setSaleImage3Base64(String saleImage3Base64) {
	// this.saleImage3Base64 = saleImage3Base64;
	// }
	//
	// public String getSaleImage4Base64() {
	// return saleImage4Base64;
	// }
	//
	// public void setSaleImage4Base64(String saleImage4Base64) {
	// this.saleImage4Base64 = saleImage4Base64;
	// }
	//
	// public String getSaleImage1Base64() {
	// return saleImage1Base64;
	// }
	//
	// public void setSaleImage1Base64(String saleImage1Base64) {
	// this.saleImage1Base64 = saleImage1Base64;
	// }

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
