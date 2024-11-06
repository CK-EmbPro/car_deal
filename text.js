import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

const ScrollableCars = ({ latestCars }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle moving to the next item
  const handleNext = () => {
    if (currentIndex < latestCars.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to handle moving to the previous item
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className='relative w-[90%] mx-auto overflow-hidden h-[95%]'>
      <button
        className='absolute top-[100px] right-1 rounded-[100%] w-[50px] h-[50px] bg-searchFormBg'
        onClick={handleNext}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button
        className='absolute top-[100px] left-1 rounded-[100%] w-[50px] h-[50px] bg-searchFormBg'
        onClick={handlePrev}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {/* Container with sliding content */}
      <div
        className='flex transition-transform duration-500'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {latestCars.map(({ image, name, price }, index) => (
          <div
            key={index}
            className='w-[100%] h-full border border-green-500 flex flex-col gap-2 items-center'
          >
            <div className='relative bg-searchFormBg w-full h-[80%] flex flex-col items-center'>
              <div className='relative flex items-center w-[95%] h-[12%] justify-end'>
                <FontAwesomeIcon className='text-[1.4em] hover:cursor-pointer' icon={faHeartRegular} />
              </div>
              <Image className='w-[95%] h-[70%]' src={image} alt='no_img' width={200} height={200} />
              <Link
                href={""}
                className='transform translate-y-full opacity-0 duration-500 delay-100 transition-all group-hover:opacity-100 group-hover:translate-y-0 absolute bottom-0 w-full bg-black text-white font-semibold py-2'
              >
                Add to Cart
              </Link>
            </div>
            <div className='flex flex-col ps-5 justify-center w-full h-[20%]'>
              <p className='font-bold text-gray-700'>{name}</p>
              <p className='text-red-500 font-semibold'>${price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCars;
