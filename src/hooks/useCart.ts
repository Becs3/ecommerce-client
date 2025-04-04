import { useContext } from "react";
import CartContext, { ICartContext } from "../context/cartContext";

export const useCart = (): ICartContext => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };