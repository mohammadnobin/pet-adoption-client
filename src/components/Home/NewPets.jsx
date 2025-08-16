import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../Shared/Container";
import { Link } from "react-router";
import Title from "../Shared/Title/Title";

const NewPets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: pets = [], isLoading, isError } = useQuery({
    queryKey: ["latestPets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/pets/latest");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-12">Loading...</p>;
  if (isError) return <p className="text-center py-12">Something went wrong!</p>;

  return (
    <Container>
        <div className="pt-[100px] -mb-[50px]">
         <Title titels="New" titese="Pets" />
        </div>
      <div className=" py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="relative group custom_gradientl custom_gradientd dark:border-white border-2 border-secondary/15 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl p-4"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={pet.pteImage}
                alt={pet.petName}
                className="w-full border-b border-secondary/50 h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Category Badge */}
              <span className="absolute bg-secondary top-4 left-4  text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {pet.petCategory}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-2">
              <h3 className="text-2xl font-bold text-secondary dark:text-gray-100">
                {pet.petName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Age: {pet.petAge} | Location: {pet.petlocation}
              </p>
              <div className="flex items-center justify-between">
              <p className="text-gray-700 dark:text-gray-200 text-sm line-clamp-3">
                {pet.shortDescription}
              </p>
              <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                Added: {new Date(pet.addedAt).toLocaleDateString()}
              </div>
              </div>
            </div>

            {/* Optional Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
          </div>
        ))}
      </div>

      {/* See All Pets Button */}
      <div className="flex justify-center">
        <Link to='/pets'>
        <button className="px-6 py-3 bg-secondary text-white dark:bg-white dark:text-black font-semibold rounded-lg hover:bg-primary-dark cursor-pointer dark:hover:bg-secondary-light transition-colors">
          See All Pets
        </button>
        </Link>
      </div>
    </Container>
  );
};

export default NewPets;
