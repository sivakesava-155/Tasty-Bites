import { configureStore, createSlice } from "@reduxjs/toolkit";


 const cartSlice=createSlice(
   {
      name:"Cart",
      initialState:[],
      reducers: {
   
         addToCart: (state, action) => {
           const item = state.find(item => item.name === action.payload.name);
           if (item) {
             item.quantity += 1;
           } else {
             state.push({ ...action.payload, quantity: 1 });
           }
         },
    
         increment: (state, action) => {
           const item = state.find(item => item.name === action.payload.name);
           if (item) {
             item.quantity += 1;
           }
         },

          decrement: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item&&item.quantity>1)
                {
              item.quantity -= 1;
            }
            else{
              return state.filter(item => item.name !== action.payload.name);
            }
          },
          remove: (state, action) => {
           return state.filter(item => item.name !== action.payload.name);
            
          },
          clearCart: () => []
        
        }
     });

const store = configureStore({
    reducer: {
      Cart: cartSlice.reducer     
    },
  });
  

export default store;
export const{addToCart,increment,decrement,remove,clearCart}=cartSlice.actions;

