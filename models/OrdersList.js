//csv reader
import orders from "../db/ROM_LATAM.json" assert { type: 'json' };

export default class OrdersList 
{

    getOrderByNum(number)
    {
        const foundOrder = orders.find(order => order.OrderNumber === number);
        return foundOrder
    }
    
}
