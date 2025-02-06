"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import WhyChooseUs from "@/components/WhyChooseUs";
import { useMutation, useMutationState, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCarsApi, updateCarIsLikedApi } from "@/api/car/carApis";
import { carCategories } from "@/constants/carCategories";
import CarCard from "@/components/CarCard";



type HomeProps = {
  searchParams: { [key: string]: string | undefined };
};

const Home = ({ searchParams }: HomeProps) => {
  const scrollExploreRef = useRef<HTMLDivElement | null>(null);
  const scrollLatestRef = useRef<HTMLDivElement | null>(null);
  const scrollBestSellingRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient()

  const currentPage = parseInt((searchParams.page as string) || "1");
  const perPage = parseInt((searchParams.perPage as string) || "8");

  const { mutate: likeCarMutate } = useMutation({
    // In your mutation function
    mutationFn: async ({
      carId,
      likeStatus,
    }: {
      carId: string;
      likeStatus: boolean;
    }) => {
      const response = await updateCarIsLikedApi(carId, likeStatus);
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey:['cars']})
      alert(data.message);
      console.log("data after like ", data);
    },
    onError: (error) => {
      alert(error.message);
      console.log("error after like ", error);
    },
  });

  const {
    data: cars,
    isLoading: isCarsLoading,
    isSuccess: isCarsFetchSuccess,
    isError: isCarsError,
    error: carsFetchError,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => await getCarsApi(),
  });

  // Alert if any error
  if (isCarsError) {
    alert(carsFetchError.message);
  }

  // Alert if dataFetch is successful
  if (isCarsFetchSuccess) {
    console.log("data ", cars);
  }

  const paginatedCars =
    cars?.slice((currentPage - 1) * perPage, currentPage * perPage) || [];

  const handleIsFavourite = (carId: string, currentLikeStatus: boolean): void => {
    likeCarMutate({ carId, likeStatus: !currentLikeStatus});
  };

  const handleNextExplore = (): void => {
    scrollExploreRef.current?.scrollBy({
      top: 0,
      left: 150,
      behavior: "smooth",
    });
  };

  const handlePreviousExplore = (): void => {
    scrollExploreRef.current?.scrollBy({
      top: 0,
      left: -150,
      behavior: "smooth",
    });
  };

  const handleNextLatest = (): void => {
    scrollLatestRef.current?.scrollBy({
      top: 0,
      left: 310.2,
      behavior: "smooth",
    });
  };

  const handlePreviousLatest = (): void => {
    scrollLatestRef.current?.scrollBy({
      top: 0,
      left: -310.2,
      behavior: "smooth",
    });
  };

  const handleNextBestSelling = (): void => {
    scrollBestSellingRef.current?.scrollBy({
      top: 0,
      left: 310.2,
      behavior: "smooth",
    });
  };

  const handlePreviousBestSelling = (): void => {
    scrollBestSellingRef.current?.scrollBy({
      top: 0,
      left: -310.2,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col p-3 gap-[2.5em]">
      <div className=" flex items-center">
        <div className=" flex flex-col flex-wrap gap-7 w-[40%]">
          <p className="text-[3em] font-bold">
            Welcome to <span className="text-red-500">Car_deal</span>
          </p>
          <p className="text-[1.3em] font-semibold">
            Find your perfect <span className="text-red-500">car</span> with our
            trusted selection and unbeatable{" "}
            <span className="text-red-500">prices</span> .
          </p>
        </div>
        <Image
          src={"/lamborghini_transparent.png"}
          alt="no_image"
          width={400}
          height={400}
          priority
          className="select-none w-[55%] h-[400px] "
        />
      </div>

      {/* latest cars */}
      <div className="flex flex-col h-[350px]">
        <p className=" text-[1.8em] text-red-500 font-bold  text-center">
          Latest cars
        </p>
        <div
          className={` transition-transform  relative flex  w-[90%] justify-center mx-auto  gap-2 h-[95%]  `}
        >
          <button
            onClick={handleNextLatest}
            className="absolute cursor-pointer top-[100px] rounded-[100%] right-0 w-[50px] h-[50px] bg-searchFormBg"
          >
            <FontAwesomeIcon className="" icon={faAngleRight} />
          </button>
          <button
            onClick={handlePreviousLatest}
            className="absolute cursor-pointer top-[100px] rounded-[100%] left-1 w-[50px] h-[50px] bg-searchFormBg"
          >
            <FontAwesomeIcon className="" icon={faAngleLeft} />
          </button>

          <div
            // onTouchMove={handleLatestTouchMove}
            // onTouchStart={handleLatestTouchStart}
            ref={scrollLatestRef}
            className="rounded-[10px] shadow-[inset_0px_1px_6px_rgba(21,36,64,0.5)] flex gap-5 p-5 w-[90%] scrollable-container "
          >
            {cars?.map(
              ({ _id, carImageCloudUrl,carImageName, carImageCloudId, price, name, isLiked }, index) => (
                <CarCard
                  key={index}
                  carId={_id}
                  isLiked={isLiked}
                  carImageCloudUrl={carImageCloudUrl}
                  unitPrice={price}
                  carName={name}
                  carImageCloudId={carImageCloudId}
                  carImageName={carImageName}
                  handleIsFavourite={() => handleIsFavourite(_id, isLiked)}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Best selling cars */}
      <div className="flex flex-col gap-5 h-[410px]">
        <p className=" text-[1.8em] text-red-500 font-bold  text-center">
          Best selling cars
        </p>
        <p className="text-center text-textColor text-[1.5em]">
          Our best-selling cars offer unmatched performance, style, and value
          for every customer!
        </p>
        <div
          className={` transition-transform  relative flex  w-[90%] justify-center mx-auto  gap-2 h-[95%]  `}
        >
          <button
            onClick={handleNextBestSelling}
            className="absolute cursor-pointer top-[100px] rounded-[100%] right-0 w-[50px] h-[50px] bg-searchFormBg"
          >
            <FontAwesomeIcon className="" icon={faAngleRight} />
          </button>
          <button
            onClick={handlePreviousBestSelling}
            className="absolute cursor-pointer top-[100px] rounded-[100%] left-1 w-[50px] h-[50px] bg-searchFormBg"
          >
            <FontAwesomeIcon className="" icon={faAngleLeft} />
          </button>

          <div
            // onTouchMove={handleBestSellingTouchMove}
            // onTouchStart={handleBestSellingTouchStart}
            ref={scrollBestSellingRef}
            className=" rounded-[10px] shadow-[inset_0px_1px_6px_rgba(21,36,64,0.5)] flex gap-5 py-4 p-2 w-[90%] scrollable-container"
          >
            {cars?.map(
              ({ carImageCloudUrl,carImageCloudId, carImageName, name, price, isLiked, _id }, index) => (
                <CarCard
                  key={index}
                  carId={_id}
                  isLiked={isLiked}
                  carImageCloudUrl={carImageCloudUrl}
                  carImageCloudId={carImageCloudId}
                  carImageName={carImageName}
                  unitPrice={price}
                  carName={name}
                  handleIsFavourite={() => handleIsFavourite(_id, isLiked)}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Explore all cars */}
      <div className="w-full">
        <p className="text-red-500 text-[2em] font-bold text-center">
          Explore our Products
        </p>
        <div className="w-full relative  flex flex-col gap-2">
          <button
            onClick={handleNextExplore}
            className="absolute cursor-pointer top-[50px] right-[100px] rounded-[100%]  w-[50px] h-[50px] bg-searchFormBg"
          >
            <FontAwesomeIcon className="" icon={faAngleRight} />
          </button>
          <button
            onClick={handlePreviousExplore}
            className="absolute cursor-pointer top-[50px] right-[170px] rounded-[100%]  w-[50px] h-[50px] bg-searchFormBg"
          >
            <FontAwesomeIcon className="" icon={faAngleLeft} />
          </button>

          <p className="text-[1.7em] font-semibold text-textColor ps-[10em]">
            {" "}
            By category
          </p>
          <p className="text-center text-textColor text-[1.4em] font-semibold">
            See more car brands
          </p>
          <div
            // onTouchStart={handleExploreTouchStart}
            // onTouchMove={handleExploreTouchMove}
            ref={scrollExploreRef}
            className="scrollable-container rounded-[50px] p-2 shadow-[inset_0px_0px_10px_2px_rgba(0,0,0,.3)] relative  flex mx-auto justify-around w-[65%] gap-3 overflow-hidden  transition-all duration-700 "
          >
            {carCategories.map((brand, index) => (
              <button
                key={index}
                className={` relative transtion-all duration-1000 group overflow-hidden border border-yellow-600 w-[150px]  shrink-0 h-[40px] rounded-[20px] bg-textColor text-white font-semibold `}
              >
                {brand}
                <span className="absolute w-full h-full rounded-[20px] bg-red-500 top-0 left-0 flex items-center justify-center transform transition-all scale-x-0 origin-left  ease-in-out duration-700 group-hover:scale-x-100 text-white font-bold  ">
                  {brand}
                </span>
              </button>
            ))}
          </div>

          {/* all products here */}
          <div className="flex flex-col p-6 gap-7">
            <div className=" rounded-[10px] shadow-[inset_0px_1px_10px_rgba(21,36,64,0.5)]  flex flex-wrap gap-[40px] mx-auto w-[95%] p-5 ps-6">
              {paginatedCars?.map(
                ({ carImageCloudUrl,carImageCloudId, carImageName, name, price, isLiked, _id }, index) => (
                  // <div
                  //   key={index}
                  //   className="cursor-pointer shadow-[0px_2px_10px_2px_rgb(0,0,0,.2)] rounded-[5px] transition-transform duration-[800ms] ease-in-out group w-[300px] h-[270px] flex flex-col gap-2  items-center"
                  // >
                  //   <div className="relative bg-searchFormBg w-full h-[80%] flex  flex-col items-center ">
                  //     <div className=" mt-1 relative flex items-center w-[95%] h-[12%] justify-end ">
                  //       {isLiked ? (
                  //         <button
                  //           className={`absolute `}
                  //         >
                  //           <FontAwesomeIcon
                  //             className=" text-[1.4em] hover:cursor-pointer"
                  //             icon={faHeartSolid}
                  //           />
                  //         </button>
                  //       ) : (
                  //         <button
                  //           className={`absolute`}
                  //         >
                  //           <FontAwesomeIcon
                  //             className=" text-[1.4em] hover:cursor-pointer"
                  //             icon={faHeartRegular}
                  //           />
                  //         </button>
                  //       )}
                  //     </div>
                  //     <Image
                  //       className=" w-[95%] h-[60%] object-contain"
                  //       src={carImageCloudUrl}
                  //       alt="no_img"
                  //       fill
                  //     />
                  //     <Link
                  //       href={""}
                  //       className="transform translate-y-full opacity-0 duration-500 delay-100 transition-all group-hover:opacity-100 group-hover:translate-y-0 absolute bottom-0 w-full bg-black text-white font-semibold py-2 text-center"
                  //     >
                  //       Add to Cart
                  //     </Link>
                  //   </div>
                  //   <div className="flex flex-col ps-5 justify-center  w-full h-[20%]">
                  //     <p className="font-bold text-gray-700">{name}</p>
                  //     <p className="text-red-500 font-semibold">${price}</p>
                  //   </div>
                  // </div>
                  <div key={index} className="h-[270px] ">
                    <CarCard
                      key={index}
                      carId={_id}
                      isLiked={isLiked}
                      carImageCloudUrl={carImageCloudUrl}
                      carImageCloudId={carImageCloudId}
                      carImageName={carImageName}
                      unitPrice={price}
                      carName={name}
                      handleIsFavourite={() => handleIsFavourite(_id, isLiked)}
                    />
                  </div>
                )
              )}
            </div>

            <PaginationWithLinks
              page={currentPage}
              pageSize={perPage}
              totalCount={cars?.length || 0}
            />
          </div>
        </div>
      </div>

      <WhyChooseUs />
    </div>
  );
};

export default Home;
