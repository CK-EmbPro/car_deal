"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/userContext";
import { ISavedUser } from "@/types/user";
import { CldImage } from "next-cloudinary";
import { error } from "console";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const { user, isLoading, token, logout } = useAuth();
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const pathname = usePathname();

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
    <div className="border border-red-500 flex justify-evenly items-center py-4 text-[1.2em]">
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
        <Link
          href={"/sign_up"}
          className={` relative before:absolute before:top-6 before:left-0 before:content-[""] before:h-[2px] before:w-full before:bg-black before:scale-x-0 before:transition-transform before:duration-300  hover:before:scale-x-100  `}
        >
          Sign Up
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
        <div className="border border-black flex items-center gap-10 relative">
          <Link href={"/cart"}>
            <FontAwesomeIcon icon={faCartShopping} className="text-[25px]" />
          </Link>

          {user ? (
            <>
              <div
                onClick={handleProfilePhotoClick}
                className="w-[50px] h-[50px] rounded-full relative cursor-pointer "
              >
                <Image
                  className="w-full h-full object-cover rounded-full"
                  src="https://res.cloudinary.com/ddr0o2gz5/image/upload/CAR_DEAL_USERS_PROFILE_PHOTOS/visitingDay.jpg"
                  fill
                  alt="no_img"
                />
                {/* <CldImage alt="no_img" src={user.profilePhotoCloudUrl} width={100} height={100} /> */}
              </div>

              <div
                className={` px-3 ${
                  isProfileClicked ? "flex" : "hidden"
                }  flex-col justify-evenly bg-slate-200 absolute top-[50px] right-[0px] w-[160px] max-w-[auto] h-[150px] `}
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
            <div className="w-[50px] h-[50px] rounded-full bg-gray-300 animate-pulse"></div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
