/**
 * 格式化时间
 * 
 * @param {String} str
 * @returns 格式化后的时间
 */
export const formatDate = (str) => {
    if (!str) return ''
    var date = new Date(str)
    var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return ''
    } else if ((time / 1000 < 30)) {
        return '刚刚'
    } else if (time / 1000 < 60) {
        return parseInt((time / 1000)) + '秒前'
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前'
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前'
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前'
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前'
    } else {
        return parseInt(time / 31536000000) + '年前'
    }
}




//POST传参序列化
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
     _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(!res.data.success){
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    _.toast("网络异常", 'fail');
    return Promise.reject(error);
});

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}




/** 
*   Toast公共方法
*/
export function toast(str, icon) {
    store.dispatch('showToast', true)
    if (icon == 'success') {
        store.dispatch('showSuccess', true)
        store.dispatch('showFail', false)
    } else {
         store.dispatch('showSuccess', false)
        store.dispatch('showFail', true)
    }
    store.dispatch('toastMsg',str);
    setTimeout(() => {
        store.dispatch('showToast', false); 
    },1500); 
}

/**
 * dialog公共方法
 */

export function alert(str) {
    store.dispatch('showAlert', true)
    store.dispatch('alertMsg', str)
    setTimeout(() => {
        store.dispatch('showAlert', false); 
    },1500);
}




//弹框提示
function tip(txt) {
	$('.tip-txt').html(txt);
	$('.tip').show();
	setTimeout("$('.tip').fadeOut()", 2000);
}

/*验证手机号*/
function chenckPhone(phone) {
	var verifyPhone = phone.match(/^(?:13\d|14\d|15\d|17\d|18\d)\d{5}(\d{3}|\*{3})$/);
	if (phone.length == 0) {
		tip('手机号不能为空！');
		// return '手机号不能为空！';
	} else if (0 < phone.length && phone.length < 11) {
		tip('手机号不足11位！');
		// return '手机号不足11位！';
	} else if (phone.length == 11) {
		if (!verifyPhone) {
			tip('手机号格式不正确！');
			// return '手机号格式不正确！';
		} else {
			return true;
		}
	}
}

/*检测两次密码*/
function doublePwd(pwd1, pwd2) {
	if (pwd1.length == 0) {
		return '密码不能为空！';
	} else if (0 < pwd1.length && pwd1.length < 6) {
		return '密码不足6位！';
	} else if (6 <= pwd1.length && pwd1.length < 17) {
		if (pwd1 != pwd2) {
			return '两次输入的密码不一致！';
		} else if (pwd1 == pwd2) {
			return true;
		}
	}
}

/* 返回上一个页面*/
function goUrl(){
    window.location.href=document.referrer;
}

// 获取连接参数
function getQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]);  
    return null;  
}

