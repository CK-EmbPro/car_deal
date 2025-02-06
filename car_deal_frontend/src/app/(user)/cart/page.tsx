"use client";
import React, { useEffect, useState } from "react";
import { ICartItem, ISavedCartItem } from "@/types/cart";
import { calculateItemsSubtotal } from "@/utils/calculateItemsSubTotal";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAllCartItemsApi,
  getCartItemsApi,
  updateWholeCartApi,
} from "@/api/cart/cartApis";
import { useAuth } from "@/context/userContext";
import Link from "next/link";
import CartItemCard from "@/components/CartItemCard";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "@/constants/variables";
import { IOrderItem } from "@/types/order";
import { ORDER_STATUS } from "@/constants/common";

interface RawCartItemList {
  entity: ISavedCartItem[];
  message: string;
}

const Cart = () => {
  const { getAuthHeader, user } = useAuth();
  const queryClient = useQueryClient();
  const [cartItemsState, setCartItemsState] = useState<ISavedCartItem[]>([]);

  const {
    data: cartItems,
    isSuccess: isCartSuccess,
    isLoading: isCartLoading,
    isError: isCartError,
    error: cartError,
  } = useQuery<RawCartItemList, Error, ISavedCartItem[]>({
    queryKey: ["cartItems"],
    queryFn: async () => await getCartItemsApi(getAuthHeader()),
    select: (data) => data.entity,
  });

  const { mutate: updateCart } = useMutation({
    mutationFn: async (cartItem: ICartItem[]) =>
      await updateWholeCartApi(getAuthHeader(), cartItem),
    onSuccess: (data) => {
      alert(data.message);
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  const { mutate: clearCart } = useMutation({
    mutationFn: async () => await deleteAllCartItemsApi(getAuthHeader()),
    onSuccess: (data) => {
      alert(data.message);
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  const [orderItems, setorderItems] = useState();

  const handleUpdateCart = () => {
    updateCart(cartItemsState);
  };

  const handleClearCart = () => {
    clearCart();
    setCartItemsState([]);
  };

  if (isCartError) console.log("error in cartItems ", cartError);

  useEffect(() => {
    if (cartItems) {
      setCartItemsState(cartItems);
    }
  }, [cartItems]);

  const makePayment = async () => {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (publishableKey) {
      const stripe = await loadStripe(publishableKey);

      if (cartItemsState.length === 0) {
        alert("No items added to cart");
        return;
      }

      const transformCartToOrder = (
        cartItemsState: ICartItem[]
      ): IOrderItem[] => {
        return cartItemsState.map((cartItem) => ({
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

      const headers = {
        "Content-Type": "application/json",
      };

      let response;
      try {
        response = await axios.post(
          `${BACKEND_URL}/order/create-checkout-session`,
          {
            products: transformCartToOrder(cartItemsState),
          },
          { headers }
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(`axios ${error.response?.data.message}`)
          alert(`axios ${error.response?.data.message}`);
        } else if (error instanceof Error) {
          alert(`normal error ${error.message}`);
        }
        throw error;
      }
      
      const sessionId = await response?.data.entity;

      const result = stripe?.redirectToCheckout({
        sessionId,
      });
    }
  };

  console.log("cart items state ", cartItemsState);
  console.log("cart items ", cartItems);
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

      <div className=" flex flex-col gap-[50px]">
        <div className=" flex justify-between w-full text-[1.3em] p-4 px-5 rounded-[5px] shadow-[0px_1px_10px_1px_rgba(21,36,64,0.5)]">
          <p className="w-[20%] text-center">Product</p>
          <p className="w-[20%] text-center">Price</p>
          <p className="w-[20%] text-center">Quantity</p>
          <p className="w-[20%] text-center">Subtotal</p>
          <p className="w-[20%] text-center">Actions</p>
        </div>
        <div className="flex flex-col gap-[30px]">
          {cartItemsState?.map(
            ({ carImageCloudId, _id, carName, unitPrice, quantity }, index) => (
              <CartItemCard
                id={_id}
                carImageCloudId={carImageCloudId}
                carName={carName}
                index={index}
                quantity={quantity}
                setCartItemsState={setCartItemsState}
                unitPrice={unitPrice}
                key={index}
              />
            )
          )}
        </div>
        <div className="flex justify-between border border-black">
          <Link
            href={"/"}
            className="w-[20%] border-2 border-slate-500 text-[1.1em] p-1 py-2 rounded-[5px]"
          >
            Return To Shop
          </Link>
          <div className="w-[40%] flex justify-evenly border border-black">
            <button
              onClick={handleClearCart}
              className="w-[40%] bg-red-500 text-white text-[1.1em] p-1 py-2 rounded-[5px]"
            >
              Clear Cart
            </button>
            <button
              onClick={handleUpdateCart}
              className="w-[40%] bg-red-500 text-white text-[1.1em] p-1 py-2 rounded-[5px]"
            >
              Update Cart
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <div className='w-[40%] flex flex-col gap-2 border-2 rounded-[5px] border-slate-800 text-[1.2em] p-7 py-8 className="border border-yellow-500"'>
          <p className=" text-[1.1em] font-semibold">Cart Total</p>
          <p className="border-b border-slate-500 flex justify-between">
            Subtotal:
            {isCartLoading ? (
              <span className="animate-pulse bg-gray-300 rounded-md h-[60%] w-[100px] my-auto"></span>
            ) : (
              cartItemsState && (
                <span className="text-red-500 font-bold">
                  ${calculateItemsSubtotal(cartItemsState)}
                </span>
              )
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
              cartItemsState && (
                <span className="text-red-500 font-bold">
                  ${calculateItemsSubtotal(cartItemsState)}
                </span>
              )
            )}
          </p>
          <button
            onClick={makePayment}
            disabled={cartItemsState.length === 0}
            className={`${
              cartItemsState.length === 0 ? "bg-red-400 cursor-not-allowed" : ""
            } bg-red-500 rounded-[10px] w-[60%] p-1 py-2 text-white mx-auto `}
          >
            Process to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
