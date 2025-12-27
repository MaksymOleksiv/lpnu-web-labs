import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { laptop, warrantyYears } = action.payload;
      const WARRANTY_PRICE_PER_YEAR = 5000;
      const totalPrice = laptop.price + (warrantyYears * WARRANTY_PRICE_PER_YEAR);
      
      const existingItem = state.items.find(
        item => item.id === laptop.id && item.warrantyYears === warrantyYears
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          id: laptop.id,
          brand: laptop.brand,
          model: laptop.model,
          cpu: laptop.cpu,
          ram: laptop.ram,
          storage: laptop.storage,
          imageUrl: laptop.imageUrl,
          price: totalPrice,
          warrantyYears,
          quantity: 1,
          totalPrice: totalPrice,
        });
      }

      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
    },

    removeFromCart: (state, action) => {
      const { id, warrantyYears } = action.payload;
      state.items = state.items.filter(
        item => !(item.id === id && item.warrantyYears === warrantyYears)
      );
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
    },

    incrementQuantity: (state, action) => {
      const { id, warrantyYears } = action.payload;
      const item = state.items.find(
        item => item.id === id && item.warrantyYears === warrantyYears
      );
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
        state.totalAmount = state.items.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
      }
    },

    decrementQuantity: (state, action) => {
      const { id, warrantyYears } = action.payload;
      const item = state.items.find(
        item => item.id === id && item.warrantyYears === warrantyYears
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
        state.totalAmount = state.items.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
