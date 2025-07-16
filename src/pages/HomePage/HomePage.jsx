import React, { use } from "react";
import LetestBlog from "../../components/Home/LetestBlog";
import Container from "../../components/Shared/Container";
import HeroSection from "../../components/Home/HeroSection";
import ServicesSection from "../../components/Home/ServicesSection";
import AboutUsSection from "../../components/Home/AboutUsSection";
import PetsCategorySection from "../../components/Home/PetsCategorySection";
import { DarkModeContext } from "../../context/DarkandLightContext/DarkModeProvider";
import CallToAction from "../../components/Home/CallToAction";


const HomePage = () => {
  return (
    <div className="">
        <HeroSection />
        <PetsCategorySection />
        <CallToAction />
      <ServicesSection />
        <LetestBlog />
        <AboutUsSection />
    </div>
  );
};

export default HomePage;
