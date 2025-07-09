import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import HomePage from "../pages/HomePage/HomePage";
import PrivateRoute from "./PrivateRoute";
import Signinpage from "../pages/Signinpage/Signinpage";
import Forbidden from "../pages/Forbidden/Forbidden";
import DashboardLayout from "../layouts/DashboardLayout";
import SignUpPage from "../pages/signupPage/SignUpPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayouts />,
        children: [
            {
                index: true,
                // loader:()=> axios.get(`${import.meta.env.VITE_BASE_URL}/users`),
                element:<HomePage /> 
            },
            {
                path: 'forbidden',
                element: <Forbidden />
            },

        
        ]
    },
        {
                path: '/signin',
                element: <Signinpage />
            },
                {
                path: '/signup',
                element: <SignUpPage />
            },
            {
                path: '/dashboard',
                element:<PrivateRoute><DashboardLayout /></PrivateRoute>

            }
])