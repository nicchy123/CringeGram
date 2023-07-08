import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Hero from "./components/Hero/Hero";
import Signup from "./pages/Signup/Signup";
import Media from "./pages/Media/Media";
import { Toaster } from "react-hot-toast";
import Signin from "./pages/signin/Signin";
import PostDetails from "./pages/postDetails/PostDetails";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import About from "./pages/About/About";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: <Hero />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/media",
          element: <Media />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/media/:id",
          element: <PrivateRoute><PostDetails /></PrivateRoute>,
          loader: ({ params }) =>
            fetch(`http://localhost:5000/media/${params.id}`),
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
