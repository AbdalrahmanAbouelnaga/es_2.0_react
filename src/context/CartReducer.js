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
                localStorage.setItem('cart',JSON.stringify({items:[
                    ...updatedItems
                ]}))
                return{
                    cart:{
                        items:updatedItems,
                    }
                }
            }else{
                const updatedItems = state.cart.items.concat(action.payload)
                localStorage.setItem('cart',JSON.stringify({items:[
                    ...updatedItems
                ]}))
                return {
                    cart:{
                        items:[
                            ...updatedItems
                        ]
                    }
                }
            }

        }
        case 'removeFromCart':{
            console.log(action.payload)
            const updatedItems = state.cart.items.filter(i=>i.product.id!==action.payload)
            localStorage.setItem('cart',JSON.stringify({items:[
                ...updatedItems
            ]}))
            return {
                cart:{
                    items:[
                        ...updatedItems
                    ]
                }
            }
        }
        case 'clearCart':{
            state.cart.items = []
            localStorage.removeItem('cart')
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
                localStorage.setItem('cart',JSON.stringify({items:[
                    ...updatedItems
                ]}))
                return{
                    cart:{
                        items:updatedItems,
                    }
                }
        }
        default:{
            return state
        }
    }
}