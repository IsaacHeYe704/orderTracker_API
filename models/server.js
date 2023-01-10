// Servidor de Express
import express from 'express'
import http from 'http'
import cors from 'cors'
import OrdersList from './OrdersList.js'
import orders from "../db/ROM_LATAM.json" assert { type: 'json' };



export default class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );
        
        this.OrdersList = new OrdersList();

        // Configuraciones de sockets
    }

    middlewares() {        
        // CORS
        this.app.use( cors() );
        this.app.get('/', (req,res)=>{
            res.json([{
                endpoint: "/getOrder/:orderId", description: "Returns the order by its id "
            }])
        })
        this.app.get('/getOrder/:orderNumber',(req,res)=>{
            let orderId = req.params.orderNumber
            const foundOrder = orders.find(order => order.OrderNumber === orderId);
            foundOrder ? 
            res.json({
                status:"ok",
                orderInfo: foundOrder
            }):
            res.json({
                            status:"error",
                        message:'order not found'})
        });

    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
  

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


