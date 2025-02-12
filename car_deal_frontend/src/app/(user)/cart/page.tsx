"use client";
import React, { useState, useCallback, useEffect } from "react";
import { ICartItem, ISavedCartItem } from "@/types/cart";
import { calculateItemsSubtotal } from "@/utils/calculateItemsSubTotal";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@/context/userContext";
import Link from "next/link";
import CartItemCard from "@/components/CartItemCard";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "@/constants/variables";
import { IOrderItem } from "@/types/order";
import { ORDER_STATUS } from "@/constants/common";

const Cart = () => {
  const { user, clearWholeCart, updateWholeCart, cartItems, isCartLoading } = useAuth();
  // Initialize as empty array and ensure it's always an array
  const [localCartItems, setLocalCartItems] = useState<ISavedCartItem[]>([]);

  // Update local state when cartItems changes
  useEffect(() => {
    // Ensure cartItems is an array before updating state
    if (Array.isArray(cartItems)) {
      setLocalCartItems(cartItems);
    }
  }, [cartItems]);

  const handleQuantityChange = useCallback((id: string, newQuantity: number) => {
    setLocalCartItems(prev => 
      prev.map(item => 
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const handleUpdateCart = () => {
    if (localCartItems && localCartItems.length > 0) {
      updateWholeCart(localCartItems);
    }
  };

  const handleClearCart = () => {
    clearWholeCart();
    setLocalCartItems([]); // Clear local state immediately
  };

  const makePayment = async () => {
    if (!localCartItems || localCartItems.length === 0) {
      alert("No items added to cart");
      return;
    }

    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      alert("Payment configuration error");
      return;
    }

    const stripe = await loadStripe(publishableKey);

    const transformCartToOrder = (cartItems: ICartItem[]): IOrderItem[] => {
      return cartItems.map((cartItem) => ({
        _id: cartItem._id,
        carName: cartItem.carName,
        totalPrice: cartItem.quantity * cartItem.unitPrice,
        carImageName: cartItem.carImageName,
        carImageCloudId: cartItem.carImageCloudId,
        carImageCloudUrl: cartItem.carImageCloudUrl,
        carQuantity: cartItem.quantity,
        orderStatus: ORDER_STATUS.PENDING,
        userEmail: cartItem.userEmail,
        userPhoneNumber: cartItem.userPhoneNumber,
      }));
    };

    try {
      const response = await axios.post(
        `${BACKEND_URL}/order/create-checkout-session`,
        {
          products: transformCartToOrder(localCartItems),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const sessionId = response.data.entity;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message || 'Payment error occurred');
      } else if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // Show loading state or empty cart message
  if (isCartLoading) {
    return <div className="w-[80%] mx-auto mt-[4em]">Loading cart...</div>;
  }

  return (
    <div className="w-[80%] mx-auto flex flex-col gap-[40px] mb-[10em]">
      <div className="flex justify-between mt-[4em] text-[1.2em]">
        <p>
          <span className="text-black/60">Home</span> / Cart
        </p>
        <p>
          Welcome!{" "}
          <span className="text-red-500 min-w-[20px]">{user?.firstName}</span>
        </p>
      </div>

      <div className="flex flex-col gap-[50px]">
        <div className="flex justify-between w-full text-[1.3em] p-4 px-5 rounded-[5px] shadow-[0px_1px_10px_1px_rgba(21,36,64,0.5)]">
          <p className="w-[20%] text-center">Product</p>
          <p className="w-[20%] text-center">Price</p>
          <p className="w-[20%] text-center">Quantity</p>
          <p className="w-[20%] text-center">Subtotal</p>
          <p className="w-[20%] text-center">Actions</p>
        </div>
        
        <div className="flex flex-col gap-[30px]">
          {localCartItems.length > 0 ? (
            localCartItems.map((item, index) => (
              <CartItemCard
                key={item._id}
                id={item._id}
                carImageCloudId={item.carImageCloudId}
                carName={item.carName}
                index={index}
                quantity={item.quantity}
                unitPrice={item.unitPrice}
                onQuantityChange={handleQuantityChange}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Your cart is empty
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Link
            href="/"
            className="w-[20%] border-2 border-slate-500 text-[1.1em] p-1 py-2 rounded-[5px] text-center"
          >
            Return To Shop
          </Link>
          <div className="w-[40%] flex justify-evenly">
            <button
              onClick={handleClearCart}
              disabled={localCartItems.length === 0}
              className={`w-[40%] ${
                localCartItems.length === 0 ? 'bg-red-300' : 'bg-red-500'
              } text-white text-[1.1em] p-1 py-2 rounded-[5px]`}
            >
              Clear Cart
            </button>
            <button
              onClick={handleUpdateCart}
              disabled={localCartItems.length === 0}
              className={`w-[40%] ${
                localCartItems.length === 0 ? 'bg-red-300' : 'bg-red-500'
              } text-white text-[1.1em] p-1 py-2 rounded-[5px]`}
            >
              Update Cart
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <div className="w-[40%] flex flex-col gap-2 border-2 rounded-[5px] border-slate-800 text-[1.2em] p-7 py-8">
          <p className="text-[1.1em] font-semibold">Cart Total</p>
          <p className="border-b border-slate-500 flex justify-between">
            Subtotal:
            {isCartLoading ? (
              <span className="animate-pulse bg-gray-300 rounded-md h-[60%] w-[100px] my-auto"></span>
            ) : (
              <span className="text-red-500 font-bold">
                ${calculateItemsSubtotal(localCartItems)}
              </span>
            )}
          </p>
          <p className="border-b border-slate-500 flex justify-between">
            Shipping: <span className="text-green-500 font-bold">Free</span>
          </p>
          <p className="flex justify-between">
            Total:
            {isCartLoading ? (
              <span className="animate-pulse bg-gray-300 rounded-md h-[60%] w-[100px] my-auto"></span>
            ) : (
              <span className="text-red-500 font-bold">
                ${calculateItemsSubtotal(localCartItems)}
              </span>
            )}
          </p>
          <button
            onClick={makePayment}
            disabled={localCartItems.length === 0}
            className={`
              ${localCartItems.length === 0 ? "bg-red-400 cursor-not-allowed" : "bg-red-500"}
              rounded-[10px] w-[60%] p-1 py-2 text-white mx-auto
            `}
          >
            Process to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;