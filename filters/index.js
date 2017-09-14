export function number(value) {
    return value.toString().substr(0,value.toString().indexOf('.'));
}
export function abs_number(value) {
    let new_value;
	if(value=="--") {
		new_value = value;
	}else {
		if(value!=undefined) {
			new_value = Math.abs(value);
		}

	}
	return new_value
}
export function number_show(value) {
    switch(value) {
        case null:
            return '--';
        case '':
            return '--';
        default:
            return value;
    }
}
export function time(value) {
    var newDate = new Date();
	Date.prototype.format = function(format) {
		var date = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S+": this.getMilliseconds()
		};
		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for (var k in date) {
			if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1
			? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}
		return format;
	}
	newDate.setTime(value);
	return newDate.format('MM月dd日')
}
export function new_time(value) {
    var newDate = new Date();
	Date.prototype.format = function(format) {
		var date = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S+": this.getMilliseconds()
		};
		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for (var k in date) {
			if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1
			? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}
		return format;
	}
	newDate.setTime(value);
	return newDate.format('yyyy.MM.dd')
}
