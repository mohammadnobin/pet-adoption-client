import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import HomePage from "../pages/HomePage/HomePage";
import PrivateRoute from "./PrivateRoute";
import Signinpage from "../pages/Signinpage/Signinpage";
import Forbidden from "../pages/Forbidden/Forbidden";
import DashboardLayout from "../layouts/DashboardLayout";
import SignUpPage from "../pages/signupPage/SignUpPage";
import Donationpage from "../pages/DonationPage/Donationpage";
import PetListPage from "../pages/PetListPage/PetListPage";
import AddPetPage from "../pages/AddPetPage/AddPetPage";
import MyAddedPets from "../pages/MyAddedPets/MyAddedPets";
import AdoptionRequestPage from "../pages/AdoptionRequest/AdoptionRequestPage";
import CreateDonationPage from "../pages/CreateDonationPage/CreateDonationPage";
import MyDonationPage from "../pages/MydonationPage/MyDonationPage";
import MyDonationCampaignsPage from "../pages/MyDonationCampaignsPage/MyDonationCampaignsPage";
import MyProfilePage from "../pages/MyProfilePage/MyProfilePage";
import PetDetailsPage from "../pages/PetDetailsPage/PetDetailsPage";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import AdminRoute from "./AdminRoute";
import Users from "../pages/Users/Users";
import AllDonations from "../pages/AllDonations/AllDonations";
import AllPets from "../pages/AllPets/AllPets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "pets",
        element: <PetListPage />,
      },
      {
        path: '/pet-details/:id',
        element: <PetDetailsPage />
      },
      {
        path: "donations",
        element: <Donationpage />,
      },
      {
        path: 'donationDetais/:id',
        element: <DonationDetails />
      },
      {
        path: "forbidden",
        element: <Forbidden />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Signinpage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children:[
      {
        index: true,
        element: <h2>home</h2>
      },
        {
            path: 'add-pet',
            element: <AddPetPage />
        },
        {
          path:'my-pets',
          element:<MyAddedPets />
        },
        {
          path:'adoption-requests',
          element:<AdoptionRequestPage />
        },
        {
          path:'create-campaign',
          // element:<AdminRoute><CreateDonationPage /></AdminRoute> 
          element: <CreateDonationPage />
        },
        {
          path: 'my-campaigns',
          element: <MyDonationCampaignsPage />
        },
        {
          path:'my-donations',
          element: <MyDonationPage />
        },
        {
          path: 'profile',
          element: <MyProfilePage />
        },
        {
          path: 'users',
          element: <Users />
        },
        // {
        //   path: 'all-donations',
        //   element: <AllDonations />
        // },
        // {
        //   path: 'all-pets',
        //   element:<AllPets />
        // }

    ]
  },
]);
