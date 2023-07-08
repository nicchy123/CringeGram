import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Hero from "./components/Hero/Hero";
import Signup from "./pages/Signup/Signup";
import Media from "./pages/Media/Media";
import { Toaster } from "react-hot-toast";
import Signin from "./pages/signin/Signin";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
          path: '/',
          element: <Hero/>
        },
        {
          path:"/signup",
          element:<Signup/>
        },
        {
          path:"/media",
          element:<Media/>
        },
        {
          path:"/signin",
          element:<Signin/>
        }
      ]
    },
  ]);
  
  return (
    <>
    <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
