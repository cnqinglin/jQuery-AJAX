var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var path = request.url
    var query = ''
    if (path.indexOf('?') >= 0) {
        query = path.substring(path.indexOf('?'))
    }
    var pathNoQuery = parsedUrl.pathname
    var queryObject = parsedUrl.query
    var method = request.method

        <!--从这里开始看， 上面不要看 / -- >


        console.log('HTTP 路径为\n' + path)
    if (path == '/') {
        let string = fs.readFileSync('./index.html', 'utf8')
        response.statusCode = 200 //设置相应的第一部分
        response.setHeader('Content-Type', 'text/html; charset=utf-8') //设置相应的第二部分
        //给浏览器返回一个符合html格式的字符串（相应本质上就是字符串）
        response.write(string) //设置相应的第四部分
        response.end()
    } else if (path === '/main.js') {
        let string = fs.readFileSync('./main.js', 'utf-8')
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
        response.write(string)
        response.end()
    } else if (path === '/xxx') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001') //设置CORS,http://localhost:8001这个网站可以访问本服务器响应内容
        response.write(`

            {
                "note":{
                    "to":"小李子",
                    "from":"青林",
                    "heading":"打招呼",
                    "body":"Don't forget me this weekend!"
                }
            }     
        `)
        response.end()
    } else {
        response.statusCode = 402
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write('false:not found')
        response.end()
    }

    <!--代码结束， 下面不要看 / -- >
})


server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)