$(function() {
    let layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#btn_file').on('click', function() {
        $('#file').click();
    })

    //监听文件的状态
    $('#file').on('change', function(e) {
        let file = e.target.files
        console.log(file)
        if (file.length <= 0) {
            return layui.layer.msg('取消了上传文件')
        }
        //选择了文件
        let newImgURL = URL.createObjectURL(file[0])

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域


    })

    //点击确定时候
    $('#btn_upload').on('click', function() {
        const dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        //发起请求上传头像
        $.ajax({
            method: 'PATCH',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success(res) {
                if (res.code !== 0) {
                    return layui.layer.msg(res.message)
                }
                //上传成功
                console.log(res)
                layui.layer.msg(res.message);
                //调用父级的渲染方法
                window.parent.getUserInfo();
            }
        })
    })
})