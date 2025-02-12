"use client"

import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useMutation } from "@tanstack/react-query";
import {  addCartItemApi } from "@/api/cart/cartApis";
import { useAuth } from "@/context/userContext";
import { ICartItem } from "@/types/cart";
import { useRouter } from "next/navigation";

interface CarCardProps {
  isLiked: boolean;
  carId: string;
  handleIsFavourite: (carId: string, likeStatus: boolean) => void;
  carImageCloudUrl: string;
  carName: string;
  unitPrice: number;
  carImageName: string;
  carImageCloudId: string;
}

const CarCard = ({
  isLiked,
  carId,
  handleIsFavourite,
  carImageCloudUrl,
  carImageName,
  carImageCloudId,
  carName,
  unitPrice,
}: CarCardProps) => {

  const {user, addToCart} = useAuth()
  const router = useRouter()



  const handleAddToCart = ()=>{
    if(!user) {
      alert("Please login to add to cart")
      return
    }
    addToCart({
      _id:carId,
      carName,
      unitPrice,
      quantity: 1,
      carImageName,
      carImageCloudId,
      carImageCloudUrl,
      userEmail: user?.email || "",
      userPhoneNumber: user?.phoneNumber || "",
    })

  }

  return (
    <div className="cursor-pointer shadow-[0px_2px_5px_4px_rgb(0,0,0,.1)] rounded-[5px] transition-transform duration-[800ms] ease-in-out group w-[300px] h-full flex flex-col gap-2 shrink-0 items-center">
      <div className="relative bg-searchFormBg w-full h-[80%] flex  flex-col items-center ">
        <div className="mt-1 relative flex items-center w-[95%] h-[12%] justify-end">
          {isLiked ? (
            <button onClick={()=>handleIsFavourite(carId, isLiked)} className={`absolute `}>
              <FontAwesomeIcon
                className=" text-[1.4em] hover:cursor-pointer"
                icon={faHeartSolid}
              />
            </button>
          ) : (
            <button onClick={() => handleIsFavourite(carId, isLiked)} className={`absolute`}>
              <FontAwesomeIcon
                className=" text-[1.4em] hover:cursor-pointer"
                icon={faHeartRegular}
              />
            </button>
          )}
        </div>
        <div className="relative h-[90%] w-full">
          <Image
            className=" w-full h-full object-cover"
            src={carImageCloudUrl}
            alt="no_img"
            fill
          />
        </div>
        <button
        onClick={handleAddToCart}
          className="transform translate-y-full opacity-0 duration-500 delay-100 transition-all group-hover:opacity-100 group-hover:translate-y-0 absolute bottom-0 w-full bg-black text-white font-semibold py-2 text-center"
        >
          Add to Cart
        </button>
      </div>
      <div className="flex flex-col ps-5 justify-center  w-full h-[20%]">
        <p className="font-bold text-gray-700">{carName}</p>
        <p className="text-red-500 font-semibold">${unitPrice}</p>
      </div>
    </div>
  );
};

export default CarCard;
