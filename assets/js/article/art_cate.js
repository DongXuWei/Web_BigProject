$(function() {
    getCateList();

    //获取文章所有分类信息
    function getCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/cate/list',
            success(res) {
                if (res.code !== 0) {
                    return layui.layer.msg(res.message)
                }
                // console.log(res)
                //获取成功之后渲染模板引擎
                let strHtml = template('tpl_table', res)
                $('#tb').html(strHtml);
            }
        })
    }

    //判断
    let flag = 0;

    let indexAdd = null;
    //点击添加分类按钮
    $('#btn_AddCate').on('click', function() {
        flag = 0;
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加类别',
            content: $('#dialog-add').html()
        })
    })

    let indexEdit = null;
    //点击编辑按钮
    let that;
    $('body').on('click', '.btn_edit', function() {
        flag = 1;
        that = this;
        let id = $(this).attr('data-id');
        // console.log(id)
        indexEdit = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改分类',
            content: $('#dialog-add').html()
        })
        $('#sure').html('确认修改')

        // 回显
        $.ajax({
            method: 'GET',
            url: '/my/cate/info?id=' + id,
            success(res) {
                if (res.code !== 0) {
                    return layui.layer.msg(res.message)
                }
                //成功
                layui.form.val('form-edit', res.data)
            }
        })
    })


    //表单提交
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        let id = $(this).attr('data-id');
        //提交添加分类
        if (flag === 0) {
            $.ajax({
                method: 'POST',
                url: '/my/cate/add',
                data: $(this).serialize(),
                success(res) {
                    if (res.code !== 0) {
                        return layui.layer.msg(res.message)
                    }
                    getCateList();
                    layui.layer.msg(res.message)
                    layui.layer.close(indexAdd); //关闭弹窗
                }
            })
        } else if (flag === 1) {
            //提交更新数据
            $.ajax({
                method: 'PUT',
                url: '/my/cate/info',
                data: $(this).serialize(),
                success(res) {
                    if (res.code !== 0) {
                        return layui.layer.msg(res.message)
                    }
                    getCateList();
                    layui.layer.msg(res.message)
                    layui.layer.close(indexEdit); //关闭弹窗
                }
            })
        }
    })

    // 编辑区域的重置回显
    $('body').on('click', '#resetBtn', function(e) {
        //这里是添加
        if (flag === 0) {
            console.log(1)
        } else if (flag === 1) {
            console.log(1)
                // //这里是编辑
                // e.preventDefault();
                // let id = $(this).attr('data-id');
                // // 回显
                // $.ajax({
                //     method: 'GET',
                //     url: '/my/cate/info?id=' + id,
                //     success(res) {
                //         if (res.code !== 0) {
                //             return layui.layer.msg(res.message)
                //         }
                //         //成功
                //         layui.form.val('form-edit', res.data)
                //     }
                // })
        }
    })

    //删除的操作
    $('body').on('click', '.btn_del', function() {
        let id = $(this).attr('data-id') //获取到id
        window.confirm('确定删除？',
            $.ajax({
                method: 'DELETE',
                url: '/my/cate/del?id=' + id,
                success(res) {
                    if (res.code !== 0) {
                        return layui.layer.msg(res.message)
                    }
                    //删除成功
                    layui.layer.msg(res.message)
                    getCateList();
                }
            })
        )
    })
})