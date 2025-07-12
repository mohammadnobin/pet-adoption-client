import React from 'react';
import PetsTable from '../../components/MyaddedPets/PetsTable';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';

const MyAddedPets = () => {
     const axiosSecure = useAxiosSecure();
     const {user} = useAuth()

const {
  data: pets = [],
  isLoading,
} = useQuery({
  queryKey: ["myPets", user?.email], 
  queryFn: async () => {
    if (!user?.email) return [];  
    const res = await axiosSecure.get(`/pets/my-pets?email=${user.email}`);
    return res.data;
  },
  enabled: !!user?.email,  
});
console.log(pets);
    return (
        <div>
            <PetsTable pets={pets} isLoading={isLoading} />
        </div>
    );
};

export default MyAddedPets;