// import React from "react";
// import Title from "../Shared/Title/Title";
// import { MdCalendarMonth } from "react-icons/md";
// import { Fade, Slide, Zoom } from "react-awesome-reveal";
// import Container from "../Shared/Container";

// const LetestBlog = () => {
//   return (
//     <div className="py-[100px] dark:bg-black">
//       <Container>


//       <Title titels="Latest Blog " titese="& Articles" />
//       <div className="grid md:grid-cols-2 grid-cols-1 gap-6  xl:grid-cols-3">
//         {/* ব্লগ ১ */}
//         <Slide direction="left">
//           <div className="custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
//             <img
//               src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/teenager-with-acne-and-braces-confident-self-assured-and-optimistic-with-his-pet.jpg"
//               alt="Saving Lives: Vital Role of Animal Shelters in Pet Rescue Efforts"
//               className="w-full h-56 object-cover"
//             />
//             <div className="p-4 space-y-2">
//               <div className="text-sm text-gray-500 dark:text-white flex items-center gap-1">
//                 <MdCalendarMonth className="text-base" />
//                 <span>March 26, 2025</span>
//               </div>
//               <h2 className="text-lg font-semibold dark:text-white text-secondary transition">
//                 Saving Lives: Vital Role of Animal Shelters in Pet Rescue
//                 Efforts
//               </h2>
//               <p className="text-gray-600 text-sm dark:text-white dark:text-white">
//                 Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
//                 Dolor pharetra felis pulvinar dis imperdiet rhoncus quam
//                 vivamus…
//               </p>
//             </div>
//           </div>
//         </Slide>

//         {/* ব্লগ ২ */}
//         <Zoom>
//           <div className="custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
//             <img
//               src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/rescued-scottish-fold-cat-firefighter-woman-in-uniform-is-with-a-little-girl.jpg"
//               alt="Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives"
//               className="w-full h-56 object-cover"
//             />
//             <div className="p-4 space-y-2">
//               <div className="text-sm text-gray-500 dark:text-white flex items-center gap-1">
//                 <MdCalendarMonth className="text-base" />
//                 <span>March 12, 2025</span>
//               </div>
//               <h2 className="text-lg font-semibold dark:text-white text-secondary transition">
//                 Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives
//               </h2>
//               <p className="text-gray-600 text-sm dark:text-white">
//                 Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
//                 Dolor pharetra felis pulvinar dis imperdiet rhoncus quam
//                 vivamus…
//               </p>
//             </div>
//           </div>
//         </Zoom>

//         {/* ব্লগ ৩ */}
//         <Slide direction="right">
//           <div className="custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
//             <img
//               src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/two-volunteers-of-animals-shelter-squatting-with-pug-dogs-and-looking-at-camera-e1711477863599.jpg"
//               alt="Stray to Home: Stories of Redemption in Animal Shelter Adoptions"
//               className="w-full h-56 object-cover"
//             />
//             <div className="p-4 space-y-2">
//               <div className="text-sm text-gray-500 dark:text-white flex items-center gap-1">
//                 <MdCalendarMonth className="text-base" />
//                 <span>March 30, 2025</span>
//               </div>
//               <h2 className="text-lg font-semibold dark:text-white text-secondary transition">
//                 Stray to Home: Stories of Redemption in Animal Shelter Adoptions
//               </h2>
//               <p className="text-gray-600 text-sm dark:text-white">
//                 Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
//                 Dolor pharetra felis pulvinar dis imperdiet rhoncus quam
//                 vivamus…
//               </p>
//             </div>
//           </div>
//         </Slide>

//         {/* ব্লগ ৪ */}
//         <Slide direction="left">
//           <div className="custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
//             <img
//               src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/teenager-with-acne-and-braces-confident-self-assured-and-optimistic-with-his-pet.jpg"
//               alt="Saving Lives: Vital Role of Animal Shelters in Pet Rescue Efforts"
//               className="w-full h-56 object-cover"
//             />
//             <div className="p-4 space-y-2">
//               <div className="text-sm text-gray-500 dark:text-white flex items-center gap-1">
//                 <MdCalendarMonth className="text-base" />
//                 <span>March 26, 2025</span>
//               </div>
//               <h2 className="text-lg font-semibold dark:text-white text-secondary transition">
//                 Saving Lives: Vital Role of Animal Shelters in Pet Rescue
//                 Efforts
//               </h2>
//               <p className="text-gray-600 text-sm dark:text-white">
//                 Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
//                 Dolor pharetra felis pulvinar dis imperdiet rhoncus quam
//                 vivamus…
//               </p>
//             </div>
//           </div>
//         </Slide>

//         {/* ব্লগ ৫ */}
//         <Zoom>
//           <div className="custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
//             <img
//               src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/rescued-scottish-fold-cat-firefighter-woman-in-uniform-is-with-a-little-girl.jpg"
//               alt="Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives"
//               className="w-full h-56 object-cover"
//             />
//             <div className="p-4 space-y-2">
//               <div className="text-sm text-gray-500 dark:text-white flex items-center gap-1">
//                 <MdCalendarMonth className="text-base" />
//                 <span>March 12, 2025</span>
//               </div>
//               <h2 className="text-lg font-semibold dark:text-white text-secondary transition">
//                 Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives
//               </h2>
//               <p className="text-gray-600 text-sm dark:text-white">
//                 Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
//                 Dolor pharetra felis pulvinar dis imperdiet rhoncus quam
//                 vivamus…
//               </p>
//             </div>
//           </div>
//         </Zoom>

//         {/* ব্লগ ৬ */}
//         <Slide direction="right">
//           <div className="custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
//             <img
//               src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/two-volunteers-of-animals-shelter-squatting-with-pug-dogs-and-looking-at-camera-e1711477863599.jpg"
//               alt="Stray to Home: Stories of Redemption in Animal Shelter Adoptions"
//               className="w-full h-56 object-cover"
//             />
//             <div className="p-4 space-y-2">
//               <div className="text-sm text-gray-500 dark:text-white flex items-center gap-1">
//                 <MdCalendarMonth className="text-base" />
//                 <span>March 30, 2025</span>
//               </div>
//               <h2 className="text-lg font-semibold dark:text-white text-secondary transition">
//                 Stray to Home: Stories of Redemption in Animal Shelter Adoptions
//               </h2>
//               <p className="text-gray-600 text-sm dark:text-white">
//                 Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
//                 Dolor pharetra felis pulvinar dis imperdiet rhoncus quam
//                 vivamus…
//               </p>
//             </div>
//           </div>
//         </Slide>
//       </div>
//             </Container>
//     </div>
//   );
// };

// export default LetestBlog;

import React from "react";
import Title from "../Shared/Title/Title";
import { MdCalendarMonth } from "react-icons/md";
import Container from "../Shared/Container";

const LetestBlog = () => {
  return (
    <div className="py-[100px] dark:bg-black">
      <Container>
        <Title titels="Latest Blog " titese="& Articles" />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6  xl:grid-cols-3">
          {/* ব্লগ ১ */}
          <div className="custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/teenager-with-acne-and-braces-confident-self-assured-and-optimistic-with-his-pet.jpg"
              alt="Saving Lives: Vital Role of Animal Shelters in Pet Rescue Efforts"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="text-sm text-gray-500 dark:text-white flex items-center gap-1">
                <MdCalendarMonth className="text-base" />
                <span>March 26, 2025</span>
              </div>
              <h2 className="text-lg font-semibold dark:text-white text-secondary transition">
                Saving Lives: Vital Role of Animal Shelters in Pet Rescue Efforts
              </h2>
              <p className="text-gray-600 text-sm dark:text-white">
                Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
                Dolor pharetra felis pulvinar dis imperdiet rhoncus quam vivamus…
              </p>
            </div>
          </div>

          {/* ব্লগ ২ */}
          <div className="custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/rescued-scottish-fold-cat-firefighter-woman-in-uniform-is-with-a-little-girl.jpg"
              alt="Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="text-sm text-gray-500 dark:text-white flex items-center gap-1">
                <MdCalendarMonth className="text-base" />
                <span>March 12, 2025</span>
              </div>
              <h2 className="text-lg font-semibold dark:text-white text-secondary transition">
                Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives
              </h2>
              <p className="text-gray-600 text-sm dark:text-white">
                Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
                Dolor pharetra felis pulvinar dis imperdiet rhoncus quam vivamus…
              </p>
            </div>
          </div>

          {/* ব্লগ ৩ */}
          <div className="custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/two-volunteers-of-animals-shelter-squatting-with-pug-dogs-and-looking-at-camera-e1711477863599.jpg"
              alt="Stray to Home: Stories of Redemption in Animal Shelter Adoptions"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="text-sm text-gray-500 dark:text-white flex items-center gap-1">
                <MdCalendarMonth className="text-base" />
                <span>March 30, 2025</span>
              </div>
              <h2 className="text-lg font-semibold dark:text-white text-secondary transition">
                Stray to Home: Stories of Redemption in Animal Shelter Adoptions
              </h2>
              <p className="text-gray-600 text-sm dark:text-white">
                Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
                Dolor pharetra felis pulvinar dis imperdiet rhoncus quam vivamus…
              </p>
            </div>
          </div>

          {/* ব্লগ ৪ */}
          <div className="custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/teenager-with-acne-and-braces-confident-self-assured-and-optimistic-with-his-pet.jpg"
              alt="Saving Lives: Vital Role of Animal Shelters in Pet Rescue Efforts"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="text-sm text-gray-500 dark:text-white flex items-center gap-1">
                <MdCalendarMonth className="text-base" />
                <span>March 26, 2025</span>
              </div>
              <h2 className="text-lg font-semibold dark:text-white text-secondary transition">
                Saving Lives: Vital Role of Animal Shelters in Pet Rescue Efforts
              </h2>
              <p className="text-gray-600 text-sm dark:text-white">
                Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
                Dolor pharetra felis pulvinar dis imperdiet rhoncus quam vivamus…
              </p>
            </div>
          </div>

          {/* ব্লগ ৫ */}
          <div className="custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/rescued-scottish-fold-cat-firefighter-woman-in-uniform-is-with-a-little-girl.jpg"
              alt="Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="text-sm text-gray-500 dark:text-white flex items-center gap-1">
                <MdCalendarMonth className="text-base" />
                <span>March 12, 2025</span>
              </div>
              <h2 className="text-lg font-semibold dark:text-white text-secondary transition">
                Volunteers’ Impact on Animal Shelters and Pet Rescue Initiatives
              </h2>
              <p className="text-gray-600 text-sm dark:text-white">
                Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
                Dolor pharetra felis pulvinar dis imperdiet rhoncus quam vivamus…
              </p>
            </div>
          </div>

          {/* ব্লগ ৬ */}
          <div className="custom_gradientd custom_gradientl dark:border-white border-2 border-secondary/15 p-4 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img
              src="https://tebewebe.online/furrescue/wp-content/uploads/sites/98/2024/03/two-volunteers-of-animals-shelter-squatting-with-pug-dogs-and-looking-at-camera-e1711477863599.jpg"
              alt="Stray to Home: Stories of Redemption in Animal Shelter Adoptions"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="text-sm text-gray-500 dark:text-white flex items-center gap-1">
                <MdCalendarMonth className="text-base" />
                <span>March 30, 2025</span>
              </div>
              <h2 className="text-lg font-semibold dark:text-white text-secondary transition">
                Stray to Home: Stories of Redemption in Animal Shelter Adoptions
              </h2>
              <p className="text-gray-600 text-sm dark:text-white">
                Mi integer id pede tempor nibh rutrum ut aliquam mus porta.
                Dolor pharetra felis pulvinar dis imperdiet rhoncus quam vivamus…
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LetestBlog;
