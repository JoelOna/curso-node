const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    if (req.url === '/') {
        res.statusCode = 200
        res.end('Página de inicio')
    }else if(req.url === '/contacto'){
        res.statusCode = 200    
        res.end('Página de contacto')
    }
    else if(req.url === '/imagen'){
        
        fs.readFile('./img/img.png',(error,imagen)=>{
            if (error) {
                res.statusCode = 500
                res.end('Server error')
            }
            res.setHeader('Content-Type', 'image/png')
            res.statusCode = 200
            res.end(imagen)
        })
    }
    else{
        res.statusCode = 404
        res.end('Página no encontrada')
    }
   
})

server.listen(3000,()=>{
    console.log('server listen http://localhost:3000')
})