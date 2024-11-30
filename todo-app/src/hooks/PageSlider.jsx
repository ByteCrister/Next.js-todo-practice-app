"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PageSlider = ({ slides }) => {
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };

    const updateNavigationState = (swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    return (
        <div className="relative w-full min-h-full">
            {/* Swiper Slider */}
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    updateNavigationState(swiper); // Initialize state
                }}
                onSlideChange={(swiper) => updateNavigationState(swiper)}
                spaceBetween={30}
                slidesPerView={1}
                loop={false}
            >
                {slides.map((page, index) => (
                    <SwiperSlide key={index}>
                        {page}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Previous Button */}
            {!isBeginning && (
                <button
                    onClick={handlePrev}
                    className="absolute left-4 bottom-full transform -translate-y-1/2 bg-red-400 text-white font-semibold px-2 py-1 rounded flex items-center justify-center hover:bg-red-500 transition z-10"
                >
                    {'Back'}
                </button>
            )}

            {/* Next Button */}
            {!isEnd && (
                <button
                    onClick={handleNext}
                    className="absolute right-4 bottom-full transform -translate-y-1/2 bg-red-400 text-white font-semibold px-2 py-1  rounded flex items-center justify-center hover:bg-red-500 transition z-10"
                >
                    {'Create Todo'}
                </button>
            )}
        </div>
    );
};

export default PageSlider;