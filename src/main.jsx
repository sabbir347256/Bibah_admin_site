import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthContext from './components/AuthProvider/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import Root from "./components/Root/Root";
import Layout from "./components/Pages/AdminAndAgentDashBoard/Admin/DashBoardLayout/Layout";
import AllUser from "./components/Pages/AdminAndAgentDashBoard/Admin/ManagerUser/AllUser";
import AllTransaction from "./components/Pages/AdminAndAgentDashBoard/Admin/ManagerUser/AllTransaction";
import Login from "./components/Pages/Authentication/Login/Login";
import AdminPrivateRoute from "./components/Pages/PrivateRoute/AdminPrivateRoute";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <AdminPrivateRoute><Layout></Layout></AdminPrivateRoute>,
        children: [
          {
            path: '/all-users',
            element: <AllUser></AllUser>
          }
          ,
          {
            path: '/all-transaction',
            element: <AllTransaction></AllTransaction>
          }
          ,
        ]
      }

    ]
  },
  {
    path : "/admin-login",
    element : <Login></Login>
  }
]);

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthContext>
      <HelmetProvider>
        <React.StrictMode>
          <RouterProvider router={router}></RouterProvider>
        </React.StrictMode>
      </HelmetProvider>
    </AuthContext>
  </QueryClientProvider>
)
