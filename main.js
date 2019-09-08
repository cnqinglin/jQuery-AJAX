window.jQuery = function (nodeOrSelector) {
    var nodes = {}
    nodes.addClass = function () {}
    nodes.html = function () {}
    return nodes
}

window.jQuery.ajax = function ({
    method,
    body,
    successFn,
    failFn,
    headers
}) {
    //ES6解构复制
    /*let {method,body,successFn,failFn,headers} = options*/
    /*
    let method = options.method
    let body = options.body
    let successFn = options.successFn
    let failFn = options.failFn
    let headers = options.headers 
    */

    let request = new XMLHttpRequest()
    //设置http请求的头信息和数据体
    request.open(method, url) //设置http请求的第一部分
    for (let key in headers) {
        let value = headers[key] //拿到value
        request.setRequestHeader(key, value)
    }
    //事件监听
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            //console.log('请求响应完毕')
            if (request.status >= 200 && request.status < 300) {
                successFn.call(undefined, request.responseText)
            } else if (request.status >= 400) {
                //console.log('请求失败了')
                failFn.call(undefined, request)
            }

        }
    }

    request.send(body) //设置http请求的第四部分

}

window.$ = window.jQuery //在Stack栈内存中存同一个地址

function f1(responseText) {}

function f2(responseText) {}

//使用方代码
myButton.addEventListener('click', (e) => {

    //jQuery实现AJAX
    //传一个有结构性的参数包含以上参数
    //在JS里有结构的就是对象
    window.$.ajax({ //去掉中间变量，直接传入一个对象
        url: '/xxx',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'qinglin': '18'
        },
        successFn: (x) => { //回调函数（callback函数），使用方不调用，让它自己调用
            console.log(x)
            f1.call(undefined, x)
            f2.call(undefined, x)
        },
        failFn: (x) => {
            console.log(x)
        }
    })
})