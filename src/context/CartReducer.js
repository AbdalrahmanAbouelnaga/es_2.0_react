export default (state,action)=>{
    switch(action.type){
        
        case 'addToCart':{
            console.log(action.payload)
            const index = state.cart.items.findIndex(i=>i.product.id===action.payload.product.id)
            if (index!==-1){
                const item = state.cart.items[index]
                const updatedItem = {
                    ...item,
                    quantity: item.quantity + action.payload.quantity,
                }
                const updatedItems = [...state.cart.items]
                updatedItems[index] = updatedItem
                const updatedNumber= updatedItems.reduce((acc,curVal)=>{return acc+=curVal.quantity},0)
                const updatedPrice = updatedItems.reduce((acc,curVal)=>{return acc+=(curVal.product.price*curVal.quantity)},0)
                sessionStorage.setItem('cart',JSON.stringify({
                    number_of_items:updatedNumber,
                    total_price:updatedPrice,
                    items:[
                    ...updatedItems
                ]}))
                return{
                    cart:{
                        number_of_items:updatedNumber,
                        total_price:updatedPrice,
                        items:updatedItems,
                    }
                }
            }else{
                const updatedItems = state.cart.items.concat(action.payload)
                const updatedNumber= updatedItems.reduce((acc,curVal)=>{return acc+=curVal.quantity},0)
                const updatedPrice = updatedItems.reduce((acc,curVal)=>{return acc+=(curVal.product.price*curVal.quantity)},0)
                sessionStorage.setItem('cart',JSON.stringify({
                    number_of_items:updatedNumber,
                    total_price:updatedPrice,
                    items:[
                    ...updatedItems
                ]}))
                return{
                    cart:{
                        number_of_items:updatedNumber,
                        total_price:updatedPrice,
                        items:updatedItems,
                    }
                }
            }

        }
        case 'removeFromCart':{
            console.log(action.payload)
            const updatedItems = state.cart.items.filter(i=>i.product.id!==action.payload)
            const updatedNumber= updatedItems.reduce((acc,curVal)=>{return acc+=curVal.quantity},0)
            const updatedPrice = updatedItems.reduce((acc,curVal)=>{return acc+=(curVal.product.price*curVal.quantity)},0)
            sessionStorage.setItem('cart',JSON.stringify({
                    number_of_items:updatedNumber,
                    total_price:updatedPrice,
                    items:[
                    ...updatedItems
                ]}))
                return{
                    cart:{
                        number_of_items:updatedNumber,
                        total_price:updatedPrice,
                        items:updatedItems,
                    }
                }
        }
        case 'clearCart':{
            state.cart.items = []
            sessionStorage.removeItem('cart')
            return {
                cart:{
                    items:[]
                }
            }
        }
        case 'decrementItem':{
            const index = state.cart.items.findIndex(i=>i.product.id===action.payload.product.id)
            const item = state.cart.items[index]
                const updatedItem = {
                    ...item,
                    quantity: item.quantity - action.payload.quantity,
                }
                const updatedItems = [...state.cart.items]
                updatedItems[index] = updatedItem
                const updatedNumber= updatedItems.reduce((acc,curVal)=>{return acc+=curVal.quantity},0)
                const updatedPrice = updatedItems.reduce((acc,curVal)=>{
                    return acc+=(curVal.product.price*curVal.quantity)},0)
                sessionStorage.setItem('cart',JSON.stringify({
                    number_of_items:updatedNumber,
                    total_price:updatedPrice,
                    items:[
                    ...updatedItems
                ]}))
                console.log(updatedPrice)
                return{
                    cart:{
                        number_of_items:updatedNumber,
                        total_price:updatedPrice,
                        items:updatedItems,
                    }
                }
        }
        default:{
            return state
        }
    }
}