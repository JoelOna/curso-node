const http = require('node:http')
const dittoJSON = require('./pokemon/ditto.json')

const server = http.createServer((req,res)=>{
    const {method, url} = req

    switch (method) {
        //Obtener pokemon
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    res.end(JSON.stringify(dittoJSON))
                    break;
                default:
                    res.statusCode = 404
                    res.end('Not found')
                    break;
            }
            break;
            //Crear pokemon
            case 'POST':
            switch (url) {
                case '/pokemon':
                    let body = ''
                    req.on('data',info =>{
                        body += info.toString()
                    })
                    req.on('end', ()=>{
                        const data = JSON.parse(body)
                        data.timestamp = Date.now(0)
                        res.writeHead(201, {'Content-type': 'application/json; charset=utf-8'})
                        res.end(JSON.stringify(data))
                    })
                    break;
                default:
                    res.statusCode = 404
                    res.end('Not found')
                    break;
            }
            break;
    
        default:
            break;
    }
    
})

server.listen(3000, ()=>{
    console.log('Server running on http://localhost:3000')
})