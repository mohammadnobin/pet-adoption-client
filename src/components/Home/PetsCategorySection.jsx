import { Link } from "react-router";
import Container from "../Shared/Container";
import Title from "../Shared/Title/Title";
import { Slide, Zoom } from "react-awesome-reveal";

const PetsCategorySection = () => {
  return (
    <section className="py-16 dark:bg-black">
      <Container>
        <Title titels="PetS" titese="Category" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <Slide direction="left">
                 <div  className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">

          <Link
            to="/pets?category=dog"
            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
            <img
              src="https://i.ibb.co/ycDjT78d/3408.webp"
              alt="Dogs"
              className="w-full h-40 transform group-hover:scale-105 transition duration-300"
              />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold group-hover:underline">
                Dogs
              </h3>
            </div>
          </Link>
              </div>
            </Slide>
       <Slide direction="down">
         <div  className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">

          <Link
            to="/pets?category=cat"
            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
            <img
              src="https://i.ibb.co/Hp2K82pm/rehoming-cat.jpg"
              alt="Cats"
              className="w-full h-40 transform group-hover:scale-105 transition duration-300"
              />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold group-hover:underline">
                Cats
              </h3>
            </div>
          </Link>
              </div>
       </Slide>
       <Zoom>
         <div  className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">

          <Link
            to="/pets?category=rabbit"
            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
            <img
              src="https://i.ibb.co/kVqG6bjz/sweet-cute-baby-bunny-beautiful-600nw-1950644401.webp"
              alt="Rabbits"
              className="w-full h-40 transform group-hover:scale-105 transition duration-300"
              />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold group-hover:underline">
                Rabbits
              </h3>
            </div>
          </Link>
              </div>
       </Zoom>
       <Slide direction="up">
         <div  className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">

          <Link
            to="/pets?category=fish"
            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
            <img
              src="https://i.ibb.co/TD6NQdsY/57a4db38dd089551028b465b.webp"
              alt="Fish"
              className="w-full h-40 transform group-hover:scale-105 transition duration-300"
              />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold group-hover:underline">
                Fish
              </h3>
            </div>
          </Link>
              </div>
       </Slide>
       <Slide direction="right">
        <div  className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
          <Link
            to="/pets?category=bird"
          >
            <img
              src="https://i.ibb.co/99wfYGSL/360-F-734959181-E57-Ca-N3rjyp-Nj1he-SMm-SU1-BZmzlslq-WT.jpg"
              alt="Birds"
              className="w-full h-40 transform group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold group-hover:underline">
                Birds
              </h3>
            </div>
          </Link>
        </div>
       </Slide>

        </div>
      </Container>
    </section>
  );
};

export default PetsCategorySection;
