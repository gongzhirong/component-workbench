/*
 *获取url中的参数
 */
const GetRequest =() =>{
	var href = location.href; //获取url中"?"符后的字串
	var url = href.substring(href.indexOf('?'),href.length);
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		var strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			 theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

export default {
	GetRequest
}