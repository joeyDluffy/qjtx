package qjtx.pojo;

import java.util.List;

public class SalesData {
    private List<String> imageList;

	public List<String> getImageList() {
		return imageList;
	}

	public void setImageList(List<String> imageList) {
		this.imageList = imageList;
	}
	private String saleid;
	private String total;
	private String saleday;
	private int qty;

	public String getSaleid() {
		return saleid;
	}

	public void setSaleid(String saleid) {
		this.saleid = saleid;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public String getSaleday() {
		return saleday;
	}

	public void setSaleday(String saleday) {
		this.saleday = saleday;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}
}