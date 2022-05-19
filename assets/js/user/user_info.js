$(function() {
    let form = layui.form;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })

    //获取用户信息添加到页面
    initUserInfo();

    //重置
    $('#btn_reset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })

    //获取当前登录的用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success(res) {
                if (res.code !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.form.val('formUserInfo', res.data);
            }
        })
    }

    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'PUT',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.code !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message);
                //因为这边可能更新昵称 需要替换掉主页已有的登录名
                //所以还需要重新调用一下主页的获取用户信息 渲染头像
                window.parent.getUserInfo();
            }
        })
    })
})