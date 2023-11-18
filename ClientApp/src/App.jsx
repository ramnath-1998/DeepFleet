import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/admin",
      element: <AdminHome/>,
    },
    {
      path: "/user",
      element: <UserHome></UserHome>,
    },
  ]);
  
  return (
    
    <RouterProvider router={router} />
    
    )
  }
  
  export default App
  