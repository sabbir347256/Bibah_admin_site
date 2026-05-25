import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthContext from './components/AuthProvider/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import Root from "./components/Root/Root";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path : "/",
    element : <Root></Root>
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
