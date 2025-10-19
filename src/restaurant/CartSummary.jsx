import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const CartSummary = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);

  const handleCheckout = () => {
    alert("Order submitted!");
    clearCart();
  };

  return (
    <div className="fixed top-20 right-10 w-64 p-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-400 shadow-md z-50 flex flex-col">
      
      {/* Heading */}
      <h2 className="text-lg font-bold mb-3 text-center">Cart Summary</h2>

      {/* Totals center aligned */}
      <div className="w-full flex flex-col items-center mb-3">
        <p className="font-bold">Total Items: {totalItems}</p>
        <p className="font-bold">Total Price: ${totalPrice}</p>
      </div>

      {/* Scrollable Items Container */}
      <div className="overflow-y-auto max-h-64 mb-3">
        {cart.length === 0 && <p className="text-gray-400 text-center">Cart is empty</p>}

        {cart.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center border-b border-gray-700 py-2 w-full">
            <span className="font-semibold">{item.name}</span>
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
            <div className="flex flex-col items-center mt-1">
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
      </div>

      {/* Checkout Button */}
      {cart.length > 0 && (
        <button
          onClick={handleCheckout}
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded-full hover:bg-yellow-500 transition"
        >
          Check Out
        </button>
      )}
    </div>
  );
};

export default CartSummary;
