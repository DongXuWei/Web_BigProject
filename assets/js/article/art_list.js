$(function() {

    let data = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    //美化时间的过滤器
    template.defaults.imports.dataFormat = function(data) {
        const dt = new Date(data);
        let yy = dt.getFullYear();
        let mm = dt.getMonth() + 1;
        let dd = dt.getdate();
        let h = dt.getHours();
        let m = dt.getMinutes();
        let s = dt.getSeconds();
        return `${yy}-${mm}-${dd}\t${h}:${m}:${s}`;
    }

    initTable();
    initCate();

    //渲染文章
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data,
            success(res) {
                if (res.code !== 0) {
                    return layui.layer.msg(res.message)
                }
                //成功
                let strHtml = template('tpl-table', res)
                $('tbody').html(strHtml)

                //渲染文章成功之后在去渲染分页
                renderPage(res.total);
            }
        })
    }

    //渲染分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/cate/list',
            success(res) {
                if (res.code !== 0) {
                    return layui.layer.msg(res.message)
                }
                let str = template('tpl-cate', res)
                console.log(str)
                $('[name=cate_id]').html(str);
                //layui的渲染机制  内置的方法render() 
                layui.form.render();
            }
        })
    }

    //监听表单的提交事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        //拿到值
        let cate_id = $('[name=cate_id]').val();
        let state = $('[name=state]').val();
        //给查询对象赋值
        data.cate_id = cate_id;
        data.state = state;
        //调用渲染文章的方法
        initTable();
    })

    //渲染分页的方法
    function renderPage(total) {
        console.log(total) //获取到的文章总数
        layui.laypage.render({
            elem: 'pageBox', //分页容器的id
            count: total, //总数据条数
            limit: data.pagesize, //每页显示几条数据
            curr: data.pagenum, //设置默认被选中的分页
            layout: ['count', 'limit', 'page', 'prev', 'next', 'skip'],
            limits: [2, 3, 5],
            jump: function(obj, first) {
                console.log(obj.curr)
                data.pagenum = obj.curr;
                //拿到最新的条目数赋值到data上
                data.pagesize = obj.limit;
                if (!first) {
                    initTable();
                }
            }
        })
    }
})