const express = require("express")
const https = require('https')
const PORT = 8001
const fs = require("fs")
const serverStatic = require("express-static")
const app = express()

const options = {
    key: fs.readFileSync('./crt/private.pem', 'utf8'),
    cert: fs.readFileSync('./crt/file.crt', 'utf8')
}
const httpsServer = https.createServer(options, app)

// 设置跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})

app.use(serverStatic(__dirname + "/public"))

app.use('/', function(req, res, next) {
    res.end("这是一个静态资源服务")
    next()
})
app.use('/test', function(req, res, next) {
    res.send({
        ret: 0,
        msg: '成功',
        data: [{a: 1}, {b: 2}]
    })
    next()
})

httpsServer.listen(PORT, () => {
    console.log(`server success on ${PORT}`)
})