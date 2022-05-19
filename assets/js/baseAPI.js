// 每次调用ajax请求之前都会调用这个
$.ajaxPrefilter(function(options) {
    options.url = `http://www.liulongbin.top:3008${options.url}`

    //统一为有权限的接口(/my)设置headers请求头
    //判断是否是有权限的请求还是普通请求
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // options.complete = function(res) {
    //     //     // 解构对象的方式判断
    //     const { code, message } = res.responseJSON;
    //     // && message != "身份认证失败！"   '更新密码成功！'
    //     console.log(code)
    //     console.log(message)
    //     if (code !== 0) {
    //         localStorage.removeItem('token');
    //         // location.href = './login.html'
    //     }
    // }

    // 挂载权限回调
    options.complete = function(res) {
        if (res.responseJSON.code !== 0 && res.responseJSON.message == '身份认证失败！') {
            //console.log(res.responseJSON)
            location.href = './login.html';
            localStorage.removeItem('token');
        }
    }
})