import React from "react";
import customerTitle from '../../assets/customer-top.png'
import TestimonialSlider from "./TestimonialSlider";

const CustomerReviwe = () => {
  return (
    <div className="pb-[100px] w-11/12 mx-auto overflow-hidden">
        <div className="max-w-[718px] mx-auto text-center ">
        <img className="mx-auto" src={customerTitle} alt="customerTitle" />
          <h2 className="md:text-[40px] text-2xl font-extrabold text-secondary">What our Client <span className="text-black dark:text-white"> are sayings</span></h2>
          <p className="md:pt-[18px] dark:text-white py-2 md:pb-8 text-base font-medium ">
           Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
          </p>
      </div>
      <div className="">
        <TestimonialSlider />
      </div>
    </div>
  );
};

export default CustomerReviwe;