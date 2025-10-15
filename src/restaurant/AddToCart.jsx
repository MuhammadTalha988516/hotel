import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const AddToCart = ({ name, price }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <button
  onClick={() => addToCart({ name, price })}
  className="flex items-center justify-center gap-2 border-2 border-yellow-400 px-5 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition mt-auto"
>
  <ShoppingCartIcon className="w-5 h-5 text-white" />
  <span className="font-semibold">Add to cart</span>
</button>

  );
};

export default AddToCart;