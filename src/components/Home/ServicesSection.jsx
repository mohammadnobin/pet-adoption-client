import React from "react";
import sevicebg from '../../assets/servicebg.png'
import Container from "../Shared/Container";
const ServicesSection = () => {
  return (
    <section
          style={{ backgroundImage: `url(${sevicebg})` }}
     className="py-20 bg-cover bg-center bg-no-repeat">
        <Container>


                <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
             Taking Care<span className="text-secondary"> of Pets</span>
          </h1>
        </div>

        {/* Image */}
        <div className="mt-10">
          <img
            src="https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/diagram.png"
            alt="Pet care diagram"
            className="w-full max-w-5xl mx-auto"
            />
        </div>
            </Container>
    </section>
  );
};

export default ServicesSection;
