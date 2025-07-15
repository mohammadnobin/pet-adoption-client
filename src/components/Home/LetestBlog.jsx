// import React from "react";
// import Title from "../Shared/Title/Title";
// import { MdCalendarMonth } from "react-icons/md";

// const data = [
//   {
//     id: 1,
//     image:'https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/teenager-with-acne-and-braces-confident-self-assured-and-optimistic-with-his-pet.jpg' ,
//     date: "March 26, 2025",
//     titel: "Saving Lives: Vital Role of Animal Shelters in Pet Rescue Efforts",
//     des: "Mi integer id pede tempor nibh rutrum ut aliquam mus porta. Dolor pharetra felis pulvinar dis imperdiet rhoncus quam vivamus…",
//   },
//   {
//     id: 2,
//     image: 'https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/rescued-scottish-fold-cat-firefighter-woman-in-uniform-is-with-a-little-girl.jpg',
//     date: "March 12, 2025",
//     titel: "Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives",
//     des: "Mi integer id pede tempor nibh rutrum ut aliquam mus porta. Dolor pharetra felis pulvinar dis imperdiet rhoncus quam vivamus…",
//   },
//   {
//     id: 3,
//     image: 'https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/two-volunteers-of-animals-shelter-squatting-with-pug-dogs-and-looking-at-camera-e1711477863599.jpg',
//     date: "March 30, 2025",
//     titel: "Stray to Home: Stories of Redemption in Animal Shelter Adoptions",
//     des: "Mi integer id pede tempor nibh rutrum ut aliquam mus porta. Dolor pharetra felis pulvinar dis imperdiet rhoncus quam vivamus…",
//   },
//   {
//     id: 4,
//     image:'https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/teenager-with-acne-and-braces-confident-self-assured-and-optimistic-with-his-pet.jpg' ,
//     date: "March 26, 2025",
//     titel: "Saving Lives: Vital Role of Animal Shelters in Pet Rescue Efforts",
//     des: "Mi integer id pede tempor nibh rutrum ut aliquam mus porta. Dolor pharetra felis pulvinar dis imperdiet rhoncus quam vivamus…",
//   },
//   {
//     id: 5,
//     image: 'https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/rescued-scottish-fold-cat-firefighter-woman-in-uniform-is-with-a-little-girl.jpg',
//     date: "March 12, 2025",
//     titel: "Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives",
//     des: "Mi integer id pede tempor nibh rutrum ut aliquam mus porta. Dolor pharetra felis pulvinar dis imperdiet rhoncus quam vivamus…",
//   },
//   {
//     id: 6,
//     image: 'https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/two-volunteers-of-animals-shelter-squatting-with-pug-dogs-and-looking-at-camera-e1711477863599.jpg',
//     date: "March 30, 2025",
//     titel: "Stray to Home: Stories of Redemption in Animal Shelter Adoptions",
//     des: "Mi integer id pede tempor nibh rutrum ut aliquam mus porta. Dolor pharetra felis pulvinar dis imperdiet rhoncus quam vivamus…",
//   },
// ];

// const LetestBlog = () => {
//   return (
//     <div className="py-[100px]">
//       <Title titels="Latest Blog " titese="& Artcles" />
//       <div className="grid md:grid-cols-2 grid-cols-1 gap-6 lg:grid-cols-3  ">
//         {data.map(item =>
//         <div key={item.id} className="bg-gradient-to-t from-secondary/8 via-bash to-secondary/8 border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
//           <img
//             src={item.image}
//             alt="Stray to Home: Stories of Redemption in Animal Shelter Adoptions"
//             className="w-full h-56 object-cover"
//           />
//           <div className="p-4 space-y-2">
//             <div className="text-sm text-gray-500 flex items-center gap-1">
//               <MdCalendarMonth className="text-base" />
//               <span>{item.date}</span>
//             </div>

//             <h2 className="text-lg font-semibold  text-secondary transition">
//              {item.titel}
//             </h2>

//             <p className="text-gray-600 text-sm">
//             {item.des}
//             </p>
//           </div>
//         </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LetestBlog;

import React from "react";
import Title from "../Shared/Title/Title";
import { MdCalendarMonth } from "react-icons/md";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

const LetestBlog = () => {
  return (
    <div className="py-[100px]">
      <Title titels="Latest Blog " titese="& Articles" />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ব্লগ ১ */}
        <Slide direction="left">
          <div className="bg-gradient-to-t from-secondary/8 via-bash to-secondary/8 border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/teenager-with-acne-and-braces-confident-self-assured-and-optimistic-with-his-pet.jpg"
              alt="Saving Lives: Vital Role of Animal Shelters in Pet Rescue Efforts"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <MdCalendarMonth className="text-base" />
                <span>March 26, 2025</span>
              </div>
              <h2 className="text-lg font-semibold text-secondary transition">
                Saving Lives: Vital Role of Animal Shelters in Pet Rescue
                Efforts
              </h2>
              <p className="text-gray-600 text-sm">
                Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
                Dolor pharetra felis pulvinar dis imperdiet rhoncus quam
                vivamus…
              </p>
            </div>
          </div>
        </Slide>

        {/* ব্লগ ২ */}
        <Zoom>
          <div className="bg-gradient-to-t from-secondary/8 via-bash to-secondary/8 border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/rescued-scottish-fold-cat-firefighter-woman-in-uniform-is-with-a-little-girl.jpg"
              alt="Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <MdCalendarMonth className="text-base" />
                <span>March 12, 2025</span>
              </div>
              <h2 className="text-lg font-semibold text-secondary transition">
                Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives
              </h2>
              <p className="text-gray-600 text-sm">
                Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
                Dolor pharetra felis pulvinar dis imperdiet rhoncus quam
                vivamus…
              </p>
            </div>
          </div>
        </Zoom>

        {/* ব্লগ ৩ */}
        <Slide direction="right">
          <div className="bg-gradient-to-t from-secondary/8 via-bash to-secondary/8 border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/two-volunteers-of-animals-shelter-squatting-with-pug-dogs-and-looking-at-camera-e1711477863599.jpg"
              alt="Stray to Home: Stories of Redemption in Animal Shelter Adoptions"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <MdCalendarMonth className="text-base" />
                <span>March 30, 2025</span>
              </div>
              <h2 className="text-lg font-semibold text-secondary transition">
                Stray to Home: Stories of Redemption in Animal Shelter Adoptions
              </h2>
              <p className="text-gray-600 text-sm">
                Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
                Dolor pharetra felis pulvinar dis imperdiet rhoncus quam
                vivamus…
              </p>
            </div>
          </div>
        </Slide>

        {/* ব্লগ ৪ */}
        <Slide direction="left">
          <div className="bg-gradient-to-t from-secondary/8 via-bash to-secondary/8 border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/teenager-with-acne-and-braces-confident-self-assured-and-optimistic-with-his-pet.jpg"
              alt="Saving Lives: Vital Role of Animal Shelters in Pet Rescue Efforts"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <MdCalendarMonth className="text-base" />
                <span>March 26, 2025</span>
              </div>
              <h2 className="text-lg font-semibold text-secondary transition">
                Saving Lives: Vital Role of Animal Shelters in Pet Rescue
                Efforts
              </h2>
              <p className="text-gray-600 text-sm">
                Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
                Dolor pharetra felis pulvinar dis imperdiet rhoncus quam
                vivamus…
              </p>
            </div>
          </div>
        </Slide>

        {/* ব্লগ ৫ */}
        <Zoom>
          <div className="bg-gradient-to-t from-secondary/8 via-bash to-secondary/8 border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/rescued-scottish-fold-cat-firefighter-woman-in-uniform-is-with-a-little-girl.jpg"
              alt="Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <MdCalendarMonth className="text-base" />
                <span>March 12, 2025</span>
              </div>
              <h2 className="text-lg font-semibold text-secondary transition">
                Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives
              </h2>
              <p className="text-gray-600 text-sm">
                Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
                Dolor pharetra felis pulvinar dis imperdiet rhoncus quam
                vivamus…
              </p>
            </div>
          </div>
        </Zoom>

        {/* ব্লগ ৬ */}
        <Slide direction="right">
          <div className="bg-gradient-to-t from-secondary/8 via-bash to-secondary/8 border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/two-volunteers-of-animals-shelter-squatting-with-pug-dogs-and-looking-at-camera-e1711477863599.jpg"
              alt="Stray to Home: Stories of Redemption in Animal Shelter Adoptions"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <MdCalendarMonth className="text-base" />
                <span>March 30, 2025</span>
              </div>
              <h2 className="text-lg font-semibold text-secondary transition">
                Stray to Home: Stories of Redemption in Animal Shelter Adoptions
              </h2>
              <p className="text-gray-600 text-sm">
                Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
                Dolor pharetra felis pulvinar dis imperdiet rhoncus quam
                vivamus…
              </p>
            </div>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default LetestBlog;
