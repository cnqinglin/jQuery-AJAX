window.jQuery = function (nodeOrSelector) {
    var nodes = {}
    nodes.addClass = function () {}
    nodes.html = function () {}
    return nodes
}

window.jQuery.ajax = function (options) { //options表示选项
    let url
    if(arguments.length === 1){
        url = options.url   
    }else{
        //一个函数接受两种参数
        url = arguments[0] 
        options = arguments[1]  
    }
    let method = options.method
        let body = options.body
        let successFn = options.successFn
        let failFn = options.failFn
        let headers = options.headers 
   
    let request = new XMLHttpRequest()

    //设置http请求的头信息和数据体
    request.open(method, url) //设置http请求的第一部分
    for(let key in headers){
        let value = headers[key] //拿到value
        request.setRequestHeader(key,value)
    }
    //事件监听
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            //console.log('请求响应完毕')

            if (request.status >= 200 && request.status < 300) {

                successFn.call(undefined, request.responseText)  

                /*
                console.log('请求成功')
                console.log(request.getAllResponseHeaders()) //获取全部头信息
                console.log(typeof request.getAllResponseHeaders) //获取全部头信息以字符串的形式返回
                console.log(request.status) //获取响应第一部分中相应状态码
                console.log(request.statusText) //获取响应第一部分中响应状态解释

                console.log(request.getResponseHeader('Content-Type')) //获取响应第二部分中Content-Type

                let string = request.responseText //获取响应中第四部分中的内容
                console.log(string)
                console.log(typeof string) //第四部分是符合JSON格式的字符串

                let object = window.JSON.parse(string)
                */
            } else if (request.status >= 400) {
                //console.log('请求失败了')
                failFn.call(undefined, request)
            }

        }
    }


    request.send(body) //设置http请求的第四部分



}



window.$ = window.jQuery //在Stack栈内存中存同一个地址

function f1(responseText){}
function f2(responseText){}

//使用方代码
myButton.addEventListener('click', (e) => {
    /* 
    //这样传参不好分辨
    '/xxx',
    'post',
    'a=1&b=2',
    (responseText)=>{console.log(1)},
    (request)=>{console.log(2)})
    */

    //jQuery实现AJAX
    //传一个有结构性的参数包含以上参数
    //在JS里有结构的就是对象
        window.$.ajax({ //去掉中间变量，直接传入一个对象
            url: '/xxx',
            method: 'post',
            headers : {
                'content-type' : 'application/x-www-form-urlencoded',
                'qinglin' : '18'
            },
            successFn : (x)=>{ //回调函数（callback函数），使用方不调用，让它自己调用
                console.log(x)
                f1.call(undefined,x)
                f2.call(undefined,x)
            },
            failFn: (x) => {
                console.log(x)
            }
        })
})