import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import AddToCart from "./AddToCart";

const CartSummary = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);

  const handleCheckout = () => {
    alert("Order submitted!");
    clearCart();
  };

  return (
    <div className="fixed top-20 right-10 w-80 p-4 bg-gray-800 border-2 border-yellow-400 rounded-xl text-yellow-400 shadow-lg z-50">
      <h2 className="text-xl font-bold mb-2">Cart Summary</h2>

      {cart.length === 0 && <p className="text-gray-400">Cart is empty</p>}

      {cart.map((item, idx) => (
        <div key={idx} className="flex justify-between items-center border-b border-gray-700 py-2">
          <div>
            <span>{item.name}</span>
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => updateQuantity(item.name, item.quantity - 1)}
                className="bg-gray-700 text-white px-2 rounded"
              >-</button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.name, item.quantity + 1)}
                className="bg-gray-700 text-white px-2 rounded"
              >+</button>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span>${item.total}</span>
            <button
              onClick={() => removeFromCart(item.name)}
              className="text-red-500 text-sm mt-1"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <p className="mt-2 font-bold">Total Items: {totalItems}</p>
      <p className="font-bold mb-3">Total Price: ${totalPrice}</p>

      {cart.length > 0 && (
        <button
          onClick={handleCheckout}
          className="w-full mt-3 bg-yellow-400 text-black font-bold py-2 rounded-full hover:bg-yellow-500 transition"
        >
          Check Out
        </button>
      )}
    </div>
  );
};

export default CartSummary;
