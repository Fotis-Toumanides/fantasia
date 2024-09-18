import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

import {createBrowserRouter, RouterProvider, Link} from 'react-router-dom';
import NotFound from './components/NotFound';
import BookDetails from './components/BookDetails';
import RootLayout from './components/Root';
import About from './components/About';
import ReadBook from './components/ReadBook';
import AudioBook from './components/AudioBook.jsx';
// Authentication
import Cookies from "universal-cookie";
import SignUp from './components/Signup';
import Login from './components/login.jsx';

import Users from './components/Users.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import LogoutUser from './components/Logout.jsx';
import Profile from './components/Profile.jsx';
import Home from './components/Home.jsx';

/* const cookies = new Cookies(); */

function App() {
  const [bookDescriptions, setBookDescriptions] = useState([])

  const router = createBrowserRouter([
    {
      path: '/',
      element:<RootLayout/>,
      children: [
        {
          path: "books",
          element: <BookDetails bookDetails={bookDescriptions}/>,
          errorElement:<NotFound/>
        },
        {
          path: "/",
          element: <Home />,
          errorElement:<NotFound/>
        },
        {
          path: "about",
          element: <About/>,
          errorElement:<NotFound/>
        },
        {
          path: "book/:id",
          element: <ReadBook />,
          errorElement:<NotFound/>
        },
        {
          path: "audiobook/:id",
          element: <AudioBook/>,
          errorElement:<NotFound/>
        },
        {
          path: "signup",
          element: <SignUp/>,
          errorElement:<NotFound/>
        },
        {
          path: "login",
          element: <Login/>,
          errorElement:<NotFound/>
        },
        
        {
          path: "logout",
          element: <LogoutUser/>,
          errorElement:<NotFound/>
        },
        {
          path: "profile",
          element: <Profile bookDetails={bookDescriptions}/>,
          errorElement:<NotFound/>
        },
      ]
    },
    
  ])

//    https://fantasiaapi.onrender.com/     //////////////////////////////////////////
  useEffect(() => {
    async function fetchBooks(){
      try{
        const response = await axios.get('https://0af-fearless-roebling.circumeo-apps.net/bookdescriptions');
        setBookDescriptions(response.data);
      } catch(error){
        console.error('Error fetching the books:', error);
      }
      
    }
    fetchBooks()
  }, [])


  return (
    <>
    
    <RouterProvider router={router} />
   
    </>
  )
}

export default App
