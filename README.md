# 基于jquery的tudolist———最简单的代办事件列表

## toDolist分析：
1. 做到刷新页面不会丢失数据，因此我们的数据需要保存至本地localstorage里；
2. 每次修改数据都要先从本地拿到数据，再把最新的数据渲染到页面上；
3. 修改后再把最新的数据保存至localstorage，这样保证本地存储的是最新的数据；
4. 存储的数据格式：var todolist = [{title: '晚上看电影。', done:false}]。 其中title为事件内容，done表示事件是否完成。
5. 注意一：本地存储localStorage里面只能存储字符串格式，因此需要把对象转换为字符串JSON。stringfy(data)。
6. 注意二：获取本地存储数据，需要把里面的字符串转换为对象格式JSON.parse()我们才能使用里面的数据。

## 主要函数：
1. getData():从本地获取数据
```
    function getData() { //从本地获取数据
        var data = localStorage.getItem('todolist');
        if(data!==null)
            return JSON.parse(data);//返回JSON格式的数据
        else
            return [];
    }
```
2. saveData(data)：保存数据至本地中的todolist
```
    function saveData(data) { //保存数据至本地中的todolist
        localStorage.setItem('todolist',JSON.stringify(data));
    }
```
3. load():加载最新的数据渲染到html页面上(这个函数需要在页面加载完成后最先调用一次，把最新的数据加载出来)
```
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
    }
```
4. 输入框回车按下事件，添加最新的待办事件
```
    $('#title').keydown(function (event) { //回车键按下事件,添加最新事件
        if (event.keyCode===13) {
            var local = getData(); //获取本地数据保存至local数组中
            local.push({title: $(this).val(), done: false}); //把最新数据添加到local数组中
            saveData(local); //把local数组数据通过saveData函数保存至本地
            load(); //重新加载数据
        }
    })
```
5. a标签删除功能点击事件
```
    $('ul,ol').on('click','a',function () { //给a标签（删除）绑定一个点击事件
        var  data=getData(); 
        var i =$(this).attr('id'); //获取id
        data.splice(i,1); //删除该数据
        saveData(data); //保存数据
        load(); //重新加载数据
    })
```
6. checkbox切换是否完成点击事件
```
    $('ol,ul').on('click','input',function () { //给checkbox（切换是否完成）绑定一个点击事件
        var data=getData(); //获取数据
        var index=$(this).siblings('a').attr('id'); //获取id
        data[index].done=$(this).prop('checked'); //让data数据中的checked值改为当前已修改的值
        saveData(data); //保存数据
        load(); //重新加载数据
    })
```
