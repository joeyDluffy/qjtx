package util;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import com.taobao.api.Constants;

/**
 * 采用MD5加密解密
 */
public class MD5Util {
	/**
	 * MAC算法可选以下多种算法
	 *
	 * <pre>
	 * HmacMD5
	 * HmacSHA1
	 * HmacSHA256
	 * HmacSHA384
	 * HmacSHA512
	 * </pre>
	 */
	public static final String KEY_MAC = "HmacMD5";

	public static byte[] encryptHMAC(String data, String secret) throws IOException {
	    byte[] bytes = null;
	    try {
	        SecretKey secretKey = new SecretKeySpec(secret.getBytes(Constants.CHARSET_UTF8), "HmacMD5");
	        Mac mac = Mac.getInstance(secretKey.getAlgorithm());
	        mac.init(secretKey);
	        bytes = mac.doFinal(data.getBytes(Constants.CHARSET_UTF8));
	    } catch (GeneralSecurityException gse) {
	        throw new IOException(gse.toString());
	    }
	    return bytes;
	}
	 
	public static String byte2hex(byte[] bytes) {
	    StringBuilder sign = new StringBuilder();
	    for (int i = 0; i < bytes.length; i++) {
	        String hex = Integer.toHexString(bytes[i] & 0xFF);
	        if (hex.length() == 1) {
	            sign.append("0");
	        }
	        sign.append(hex.toUpperCase());
	    }
	    return sign.toString();
	}
    public static void main(String[] args)throws Exception{
    	String sign="E2B068F2E85AF42882C747F169ACBC8B";
        String inputStr = "62b83473b750a7fe07ab8bdb5fb42ba5appkey23759189instance_id254ts149438394208362b83473b750a7fe07ab8bdb5fb42ba5";
        byte[] inputData = inputStr.getBytes();
        String key = "UTF_8";
        System.out.println(MD5Util.byte2hex(MD5Util.encryptHMAC(inputStr,"62b83473b750a7fe07ab8bdb5fb42ba5")));
        System.out.println(MD5Util.string2MD5(inputStr));
    }
	/***
	 * MD5加码 生成32位md5码
	 */
	public static String string2MD5(String inStr) {
		MessageDigest md5 = null;
		try {
			md5 = MessageDigest.getInstance("MD5");
		} catch (Exception e) {
			System.out.println(e.toString());
			e.printStackTrace();
			return "";
		}
		char[] charArray = inStr.toCharArray();
		byte[] byteArray = new byte[charArray.length];

		for (int i = 0; i < charArray.length; i++)
			byteArray[i] = (byte) charArray[i];
		byte[] md5Bytes = md5.digest(byteArray);
		StringBuffer hexValue = new StringBuffer();
		for (int i = 0; i < md5Bytes.length; i++) {
			int val = ((int) md5Bytes[i]) & 0xff;
			if (val < 16)
				hexValue.append("0");
			hexValue.append(Integer.toHexString(val));
		}
		return hexValue.toString();

	}

	/**
	 * 加密解密算法 执行一次加密，两次解密
	 */
	public static String convertMD5(String inStr) {

		char[] a = inStr.toCharArray();
		for (int i = 0; i < a.length; i++) {
			a[i] = (char) (a[i] ^ 't');
		}
		String s = new String(a);
		return s;

	}

}
