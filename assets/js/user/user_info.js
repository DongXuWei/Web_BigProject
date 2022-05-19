$(function() {
    let form = layui.form;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    initUserInfo();

    //重置
    $('#btn_reset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })

    function initUserInfo() {

    }

})