//首页的JS文件
$(function() {
    getUserInfo();
    //为退出绑定点击事件
    $('#btn_exit').on('click', function() {
        window.confirm('确认退出？', location.href = './login.html')
    });
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success(res) {
            debugger
            if (res.code !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
            console.log(res.data)
        }
    })
}

//定义渲染头像的方法
function renderAvatar(user) {
    //先判断有没有名字
    let name = user.nickname || user.username;
    //设置文字
    $('#user_name').html(name);
    if (user.user_pic) {
        //说明用户有头像
        $('.layui-nav-img').attr('src', user.user_pic);
    } else {
        //说明用户没有头像
        //获取用户昵称的第一个字
        let first = name[0].toUpperCase();
        console.log(first)
        $('.text-avatar').html(first).show();
    }
}