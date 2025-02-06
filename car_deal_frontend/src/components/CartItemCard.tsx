import { deleteCartItemApi } from "@/api/cart/cartApis";
import { useAuth } from "@/context/userContext";
import { ISavedCartItem } from "@/types/cart";
import { useMutation } from "@tanstack/react-query";
import { get } from "http";
import { CldImage } from "next-cloudinary";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

interface CartItemCardProps {
  id: string;
  index: number;
  carImageCloudId: string;
  carName: string;
  unitPrice: number;
  quantity: number;
  setCartItemsState: Dispatch<SetStateAction<ISavedCartItem[]>>;
}
const CartItemCard = ({
  index,
  id,
  carImageCloudId,
  carName,
  unitPrice,
  quantity,
  setCartItemsState,
}: CartItemCardProps) => {
  const { getAuthHeader } = useAuth();

  const { mutate: deleteCartItem } = useMutation({
    mutationFn: async () => await deleteCartItemApi(id, getAuthHeader()),
    onSuccess: (data) => {
      alert(data.message);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleCartItemDelete = () => {
    deleteCartItem();
    setCartItemsState((prevCartItems) =>
      prevCartItems.filter((item) => item._id !== id)
    );
  };

  const handleQuantityChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newQuantity = parseInt(event.target.value, 10) || 1;
    setCartItemsState((prevCartItems) =>
      prevCartItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  return (
    <div className=" flex justify-between w-full h-[120px] text-[1.3em] p-4 px-5 rounded-[5px] shadow-[0px_1px_5px_rgba(21,36,64,0.5)]">
      <div className=" justify-center flex w-[20%]  items-center gap-1 ">
        <CldImage
          src={carImageCloudId}
          width={100}
          height={100}
          alt="no-img"
          className="w-[30%]"
        />

        <p
          title={carName}
          className=" w-[70%] truncate overflow-hidden whitespace-nowrap"
        >
          {carName}
        </p>
      </div>

      <p className=" justify-center w-[20%]  flex items-center  ">
        ${unitPrice}
      </p>
      <div className=" justify-center flex items-center w-[20%]">
        <input
          className=" border-2 border-slate-600 rounded-[10px] outline-none w-[70px] h-[50px] p-2"
          value={quantity}
          type="number"
          min={1}
          onChange={(event) => handleQuantityChange(event, index)}
        />
      </div>
      <p className=" justify-center  w-[20%] flex items-center">
        ${quantity * unitPrice}
      </p>

      <button
        onClick={handleCartItemDelete}
        className=" justify-center w-[20%] text-[16px] font-bold text-red-500"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItemCard;
