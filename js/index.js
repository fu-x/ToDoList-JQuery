$(function () {
    load(); //页面构建成后先调用load函数加载出数据
    $('#title').keydown(function (event) { //回车键按下事件,添加最新事件
        if (event.keyCode===13) {
            var local = getData(); //获取本地数据保存至local数组中
            local.push({title: $(this).val(), done: false}); //把最新数据添加到local数组中
            saveData(local); //把local数组数据通过saveData函数保存至本地
            load(); //重新加载数据
        }
    })
    function getData() { //从本地获取数据
        var data = localStorage.getItem('todolist');
        if(data!==null)
            return JSON.parse(data);//返回JSON格式的数据
        else
            return [];
    }
    function saveData(data) { //保存数据至本地中的todolist
        localStorage.setItem('todolist',JSON.stringify(data));
    }
    function load() { //加载数据函数
        var data = getData();  //通过getData函数获取数据
        $('ol,ul').empty(); //清空列表
        var num1=0;
        var num2=0;
        $(data).each( function (i,ele) { //循环data数据
            if(ele.done) {  //如果数据中的done为true，在ul已完成列表中添加一个li
                $('ul').prepend("<li><input type='checkbox' checked='checked'><p>" + ele.title + "</p><a href='javascrip:;' id=" + i + ">-</a></li>");
                num1++;
            }
            else { //如果数据中的done为false，在ol正在进行列表中添加一个li
                $('ol').prepend("<li><input type='checkbox'><p>"+ele.title+"</p><a href='javascrip:;' id="+i+">-</a></li>");
                num2++;
            }
        })
        $('#todocount').text(num2);
        $('#donecount').text(num1);
    }
    $('ul,ol').on('click','a',function () { //给a标签（删除）绑定一个点击事件
        var  data=getData(); 
        var i =$(this).attr('id'); //获取id
        data.splice(i,1); //删除该数据
        saveData(data); //保存数据
        load(); //重新加载数据
    })
    $('ol,ul').on('click','input',function () { //给checkbox（切换是否完成）绑定一个点击事件
        var data=getData(); //获取数据
        var index=$(this).siblings('a').attr('id'); //获取id
        data[index].done=$(this).prop('checked'); //让data数据中的checked值改为当前已修改的值
        saveData(data); //保存数据
        load(); //重新加载数据
    })
})