import React from "react"; // Добавь это в начале файла
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import ActorDetail from "./pages/ActorDetail";
import MovieDetail from "./pages/MovieDetail";
import Movies from "./pages/Movies";
import { MOVIE_LISTS, TOP_LISTS } from "../constans";
import MoviesListMain from "./pages/MoviesListMain";
import MoviesListTop from "./pages/MoviesListTop";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Movies />,
        },
        ...TOP_LISTS.map(el => ({
          path: el.url,
          element: <MoviesListTop />,
        })),
        ...MOVIE_LISTS.map(el => ({
          path: el.url,
          element: <MoviesListMain />,
        })),
        {
          path: "/movie/:id",
          element: <MovieDetail />,
        },
        {
          path: "/actor/:id",
          element: <ActorDetail />,
        },
      ],
    },
    {
      path: "/movies",
      element: <div>Movies Page!</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
