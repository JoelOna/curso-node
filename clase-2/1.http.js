const http = require('node:http')

const server = http.createServer((req,res)=>{
    res.end('Hola mundo')
})

server.listen(3000,()=>{
    console.log('server listen http://localhost:3000')
})