import React from "react";
import TestimonialSlider from "./TestimonialSlider";
import Container from "../Shared/Container";

const CustomerReviwe = () => {
  return (
    <Container>
    <div className="pb-[100px] overflow-hidden">
        <div className="max-w-[718px] mx-auto text-center ">

          <h2 className="md:text-[40px] text-2xl font-extrabold text-secondary">What our Client <span className="text-black dark:text-white"> are sayings</span></h2>
          <p className="md:pt-[18px] dark:text-white py-2 md:pb-8 text-base font-medium ">
           Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
          </p>
      </div>
      <div className="">
        <TestimonialSlider />
      </div>
    </div>
    </Container>
  );
};

export default CustomerReviwe;