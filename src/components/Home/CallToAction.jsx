import React from "react";
import { Link } from "react-router";
import Title from "../Shared/Title/Title";
import Container from "../Shared/Container";

const inspirationalImages = [
  "https://i.ibb.co/tp6pB7ww/ins1.jpg",
  "https://i.ibb.co/tMGryFdy/ins2.jpg",
  "https://i.ibb.co/234MkLpY/ins3.jpg",
  "https://i.ibb.co/hxv59CVY/ins4.jpg",
   "https://i.ibb.co/kswF5SPw/ins5.jpg",
  "https://i.ibb.co/d0FP7JyV/ins6.jpg",
  "https://i.ibb.co/RT1y1KK4/ins7.jpg",
  "https://i.ibb.co/vbDWY4M/ins8.jpg",
 
];

const CallToAction = () => {
  return (
    <section className="text-black dark:text-white dark:bg-black bg-white py-16 px-4 md:px-12 relative">
        <Container>

      {/* CTA Text */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <Title titels='Give Them ' titese='a Home 🐶🐱' disciption='Every rescued pet has a story. Be the hero in their next chapter.
          Adopt today and bring unconditional love into your life.' />
        <Link to='/pets'>
        <button className="bg-secondary text-white cursor-pointer px-6 py-3 rounded-full font-semibold hover:bg-secondary/80 transition duration-300">
          Adopt Now
        </button>
        </Link>
      </div>

      {/* Gallery */}
      <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-4 mt-12 relative z-10">
        {inspirationalImages.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl group">
            <img
              src={img}
              alt={`Pet ${idx + 1}`}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
          </div>
        ))}
      </div>

      {/* Overlay (optional) */}

        </Container>
    </section>
  );
};

export default CallToAction;