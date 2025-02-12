"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuth } from "@/context/userContext";
import { CldImage } from "next-cloudinary";
import { usePathname } from "next/navigation";
import { ISavedCartItem, RawCartItemList } from "@/types/cart";
import { useQuery } from "@tanstack/react-query";
import { getCartItemsApi } from "@/api/cart/cartApis";
const Navbar = () => {
  const { user, isLoading, logout } = useAuth();
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const pathname = usePathname();

  const {
    data: cartItems,
    isSuccess: isCartSuccess,
    isLoading: isCartLoading,
    isError: isCartError,
    error: cartError,
  } = useQuery<RawCartItemList, Error, ISavedCartItem[]>({
    queryKey: ["cartItems"],
    queryFn: async () => await getCartItemsApi(),
    select: (data) => data.entity,
  });


  useEffect(() => {
    setIsProfileClicked(false);
  }, [pathname]);

  const handleProfilePhotoClick = () => {
    setIsProfileClicked((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="flex justify-evenly items-center py-4 text-[1.2em] sticky top-0 backdrop-blur-md bg-white/30 z-50">
      <Link href={"/"} className="text-[2em] font-bold text-red-500">
        Car_Deal
      </Link>
      <div className="flex gap-12 ">
        <Link
          href={"/"}
          className={` relative before:absolute before:top-6 before:left-0 before:content-[""] before:h-[2px] before:w-full before:bg-black before:scale-x-0 before:transition-transform before:duration-300  hover:before:scale-x-100  `}
        >
          Home
        </Link>
        <Link
          href={"/contact"}
          className={` relative before:absolute before:top-6 before:left-0 before:content-[""] before:h-[2px] before:w-full before:bg-black before:scale-x-0 before:transition-transform before:duration-300  hover:before:scale-x-100  `}
        >
          Contact
        </Link>
        <Link
          href={"/about"}
          className={` relative before:absolute before:top-6 before:left-0 before:content-[""] before:h-[2px] before:w-full before:bg-black before:scale-x-0 before:transition-transform before:duration-300  hover:before:scale-x-100  `}
        >
          About
        </Link>
      </div>
      <div className="flex gap-12 items-center">
        <form className=" relative rounded-md w-[280px] h-[40px] flex bg-searchFormBg px-3">
          <input
            type="text"
            placeholder="What are u lookin 4r"
            className="w-[87%]  rounded-md outline-none  bg-searchFormBg"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute top-3 right-3" />
        </form>

        {/* Display contents dynamically depending on either the user is loggedin */}
        <div className="flex w-[50%] items-center justify-center gap-10 relative">
          {user ? (
            <>
              <Link href={"/cart"} className="relative">
              <div className="absolute w-[20px] h-[20px] text-red-500 font-bold text-[.6em] rounded-full bg-gray-300 flex items-center justify-center bottom-[24px] left-[22px] ">{cartItems?.length}</div>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-[25px]"
                />
              </Link>
              {/* <Image
                  className="w-full h-full object-cover rounded-full"
                  src="https://res.cloudinary.com/ddr0o2gz5/image/upload/CAR_DEAL_USERS_PROFILE_PHOTOS/visitingDay.jpg"
                  fill
                  alt="no_img"
                /> */}
              <CldImage
                alt="no_img"
                className="h-[55px] w-[55px] object-cover rounded-full cursor-pointer"
                src={user.profilePhotoCloudUrl}
                width={100}
                height={100}
                onClick={handleProfilePhotoClick}
              />

              <div
                className={` px-3 ${
                  isProfileClicked ? "flex" : "hidden"
                }  flex-col justify-evenly bg-slate-200 absolute top-[55px] right-[0px] w-[160px] max-w-[auto] h-[150px] `}
              >
                <p>Hey Mr.{user.firstName}</p>
                <button
                  onClick={handleLogout}
                  className="bg-black text-start text-red-500"
                >
                  Logout
                </button>
                <Link href={"account"}>Your account</Link>
                <Link href={"cart"}>Your cart</Link>
              </div>
            </>
          ) : isLoading ? (
            // 🔥 Skeleton Loader for Profile Picture
            <>
              <div className="w-[70px] h-[30px] rounded-[5px] bg-gray-300 animate-pulse"></div>
              <div className="w-[40px] h-[40px] rounded-full bg-gray-300 animate-pulse"></div>
            </>
          ) : (
            <>
              <Link
                href={"/sign_up"}
                className={` relative before:absolute before:top-6 before:left-0 before:content-[""] before:h-[2px] before:w-full before:bg-black before:scale-x-0 before:transition-transform before:duration-300  hover:before:scale-x-100  `}
              >
                Signup
              </Link>

              <Link
                href={"/login"}
                className={` relative before:absolute before:top-6 before:left-0 before:content-[""] before:h-[2px] before:w-full before:bg-black before:scale-x-0 before:transition-transform before:duration-300  hover:before:scale-x-100  `}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
