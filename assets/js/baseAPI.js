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
})