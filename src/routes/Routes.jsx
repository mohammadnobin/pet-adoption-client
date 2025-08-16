// this is router in this project
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
import UpDatePetPage from "../pages/UpDatePetpage/UpDatePetPage";
import UpdatePetPageUser from "../pages/UpdatePetPageUser/UpdatePetPageUser";
import DonationsEditePage from "../pages/DonationsEdit/DonationsEditePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DahsBoardHomePage from "../pages/DashBoardHomePage/DahsBoardHomePage";
import About from "../pages/AboutPage/About";
import ContactPage from "../pages/ContactPage/ContactPage";

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
        path: "/pet-details/:id",
        element: (
          <PrivateRoute>
            {" "}
            <PetDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "donations",
        element: <Donationpage />,
      },
      {
        path: 'about',
        element:<About/>
      },
      {
        path: 'contact',
        element:<ContactPage />
      },
      {
        path: "donationDetais/:id",
        element: (
          <PrivateRoute>
            {" "}
            <DonationDetails />
          </PrivateRoute>
        ),
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
    children: [
      {
        index: true,
        element: <DahsBoardHomePage />
      },
      {
        path: "add-pet",
        element: <AddPetPage />,
      },
      {
        path: "my-pets",
        element: <MyAddedPets />,
      },
      {
        path: "pet-update/:id",
        element: <UpdatePetPageUser />,
      },
      {
        path: "adoption-requests",
        element: <AdoptionRequestPage />,
      },
      {
        path: "create-campaign",
        element: <CreateDonationPage />,
      },
      {
        path: "donationsedit/:id",
        element: <DonationsEditePage />,
      },
      {
        path: "my-campaigns",
        element: <MyDonationCampaignsPage />,
      },
      {
        path: "my-donations",
        element: <MyDonationPage />,
      },
      {
        path: "profile",
        element: <MyProfilePage />,
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "all-donations",
        element: (
          <AdminRoute>
            <AllDonations />
          </AdminRoute>
        ),
      },
      {
        path: "all-pets",
        element: (
          <AdminRoute>
            <AllPets />
          </AdminRoute>
        ),
      },
      {
        path: "pets-admin-update/:id",
        element: (
          <AdminRoute>
            <UpDatePetPage />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);
