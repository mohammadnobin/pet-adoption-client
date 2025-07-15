import React from "react";
import LetestBlog from "../../components/Home/LetestBlog";
import Container from "../../components/Shared/Container";
import HeroSection from "../../components/Home/HeroSection";
import ServicesSection from "../../components/Home/ServicesSection";
import AboutUsSection from "../../components/Home/AboutUsSection";
import PetsCategorySection from "../../components/Home/PetsCategorySection";

const HomePage = () => {
  return (
    <div className="">
        <HeroSection />
        <PetsCategorySection />
      <ServicesSection />
      <Container>
        <LetestBlog />
      </Container>
        <AboutUsSection />
    </div>
  );
};

export default HomePage;
