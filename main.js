myButton.addEventListener('click', (e) => {


    $.ajax({
        url: '/xxx',
        method: 'post',
        error: (x) => {
            console.log(x)
            console.log(x.status)
            console.log(x.statusText)
        }
    }).then(  //promise规范，不需要串具名变量，标准化操作
        (responseText) => {
            console.log(responseText);
            return responseText  //若成功，则这个return值会传到第二个then的第一个参数并执行
        },
        (request) => {
            console.log('error1');
            return  '已经处理'
        }).then(  //对一个结果进行多次处理就继续加 .then()
            (上一次的处理结果) => {
                console.log(上一次的处理结果)//执行结果是对象，原因：jQuery一看到后台传给的是JSON字符串，会自动转换为对象
            },
            (request) => {
                console.log('error2')
            }
            )

})