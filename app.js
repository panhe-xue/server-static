const express = require("express")
// const https = require('https')
const http = require('http')
const PORT = 8080
const fs = require("fs")
const serverStatic = require("express-static")
const app = express()

const options = {
    key: fs.readFileSync(__dirname + '/crt/panhe.xyz.key', 'utf8'),
    cert: fs.readFileSync(__dirname + '/crt/panhe.xyz.crt', 'utf8')
}
const httpServer = http.createServer(app)
// const httpsServer = https.createServer(options, app)

// 设置跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})
app.get('/', function(req, res, next) {
    console.log("到这里了11111, test")
    res.send({
        ret: 0,
        msg: '成功11111',
        data: [{a: 1}, {b: 2}]
    })
})
app.get('/test', function(req, res, next) {
    console.log("到这里了, test")
    res.send({
        ret: 0,
        msg: '成功',
        data: [{a: 1}, {b: 2}]
    })
})

app.use(serverStatic(__dirname + "/public"))

httpServer.listen(PORT, () => {
    console.log(`server success on ${PORT}`)
})