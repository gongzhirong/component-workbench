/*
 *时间戳格式化
 */
const formatDate = (timeStamp, fmt) => {
	if (timeStamp === '') return '';
	let date = new Date();
	date.setTime(timeStamp);
	if (!fmt) var fmt = 'yyyy-MM-DD hh:mm:ss';
	var o = {
		"M+": (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1), // 月
		"D+": date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate(), // 日
		"h+": date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours(), // 时
		"m+": date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes(), // 分
		's+': date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds() // 秒
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
				(o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
		}
	}
	return fmt;
}


export default {
  formatDate
}