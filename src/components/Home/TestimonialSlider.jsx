import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // v10+ modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import reviewQuote from "../../assets/reviewQuote.png";
import imageUpload from "../../assets/image-upload-icon.png";

const testimonials = [
  {
    id: 1,
    name: "Awlad Hossin",
    title: "Senior Product Designer",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    image: imageUpload,
  },
  {
    id: 2,
    name: "Rasel Ahamed",
    title: "CTO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    image: imageUpload,
  },
  {
    id: 3,
    name: "Nasir Uddin",
    title: "CEO",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    image: imageUpload,
  },
  {
    id: 4,
    name: "Shakib Khan",
    title: "Frontend Dev",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    image: imageUpload,
  },
  {
    id: 5,
    name: "Rani Mukherjee",
    title: "UX Researcher",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    image: imageUpload,
  },
];

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col items-center mt-11 w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full sm:w-[90%]  md:w-[85%] lg:w-[80%] !overflow-visible"
      >
        {testimonials.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <SwiperSlide key={item.id}>
              <div
                className={`transition-all duration-500 rounded-3xl p-6 md:p-8 shadow-md ${
                  isActive
                    ? "scale-100 -translate-y-6 opacity-100 custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15"
                    : "scale-90 opacity-40 custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15"
                }`}
              >
                <img src={reviewQuote} alt="reviewQuote" className="mx-auto" />
                <p className="pt-2 pb-6 dark:text-white text-base font-medium text-center">
                  {item.text}
                </p>
                <div className="border-t pt-6 border-dashed border-secondary flex items-center gap-x-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={item.image}
                    alt=""
                  />
                  <div className="scroll-py-2">
                    <h2 className="font-extrabold text-xl dark:text-white text-secondary">
                      {item.name}
                    </h2>
                    <h4 className="text-base dark:text-white font-medium">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation + Pagination */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button className="custom-prev text-3xl text-gray-600 hover:text-black transition-all p-4 cursor-pointer bg-white hover:bg-primary duration-300 rounded-full">
          <HiArrowLeft />
        </button>
        <div className="custom-pagination flex gap-2 items-center"></div>
        <button className="custom-next text-3xl text-gray-600 hover:text-black transition-all p-4 cursor-pointer bg-white hover:bg-primary duration-300 rounded-full">
          <HiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
