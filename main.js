window.jQuery = function (nodeOrSelector) {
    var nodes = {}
    nodes.addClass = function () {}
    nodes.html = function () {}
    return nodes
}

window.jQuery.ajax = function ({ //AJAX必须是返回一个promise对象
    method,
    url,
    body,
    headers
}) {//回调：return new promise(function(resolve,reject){})
    return new Promise(function (resolve, reject) { //promise就是window下面的一个全局属性
        let request = new XMLHttpRequest()
        //设置http请求的头信息和数据体	
        request.open(method, url) //设置http请求的第一部分	
        for (let key in headers) {
            let value = headers[key] //拿到value	
            request.setRequestHeader(key, value)
        }
        
        /*
        
        window.Promise = function(fn){
            （return new promise(function(resolve,reject){})）
            /...
            .then(
                ()=>{},
                ()=>{}
            )
        }
        */

        //事件监听	
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                //console.log('请求响应完毕')	
                if (request.status >= 200 && request.status < 300) {
                    resolve.call(undefined, request.responseText)
                } else if (request.status >= 400) {
                    //console.log('请求失败了')	
                    reject.call(undefined, request)
                }
            }
        }
        request.send(body) //设置http请求的第四部分	
    })
}

window.$ = window.jQuery //在Stack栈内存中存同一个地址	

function f1(responseText) {}
function f2(responseText) {}

//使用方代码	
myButton.addEventListener('click', (e) => {
    window.$.ajax({ 	
        url: '/xxx',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'qinglin': '18'
        }
    }).then(//.then()也会返回一个promise对象，所以可以加多个.then()
        (text) => {
            console.log(text)
        },
        (request) => {
            console.log(request)
        }
    )
})