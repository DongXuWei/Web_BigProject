$(function() {

    let data = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable();

    //渲染文章
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: data,
            success(res) {
                if (res.code !== 0) {
                    return layui.layer.msg(res.message)
                }
                //成功
                let strHtml = template('tpl-table', res.data)
                $('tbody').html(strHtml)
            }
        })
    }
})