package util;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.StrutsStatics;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class LoginInterceptor extends AbstractInterceptor {  
	  
    /* (non-Javadoc) 
     * @see com.opensymphony.xwork2.interceptor.AbstractInterceptor#intercept(com.opensymphony.xwork2.ActionInvocation) 
     */  
    @Override  
    public String intercept(ActionInvocation invocation) throws Exception {  
  
    	ActionContext ctx = invocation.getInvocationContext();  
    	Map session = ctx.getSession(); 
        String user = (String) session.get("vkop_username");  
  
        if (session != null && user != null) {  
            return invocation.invoke();  
        } 
        ctx.put("tip", "你还没有登录");  
        return Action.LOGIN;  
    }  
  
    private void setGoingToURL(Map<String, Object> session, ActionInvocation invocation) {  
        String url = "";  
        String namespace = invocation.getProxy().getNamespace();  
  
        if (StringUtils.isNotBlank(namespace) && !namespace.equals("/")) {  
            url = url + namespace;  
        }  
  
        String actionName = invocation.getProxy().getActionName();  
        if (StringUtils.isNotBlank(actionName)) {  
            url = url + "/vk/reportData.html";  
        }  
  
        session.put("vkop_main", url);  
    }  
  
    //... getter & setter methods  
}  