import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { PagesUrls } from "./pages/pages-urls";
import { Gallery } from "./pages/Gallery";
import { Search } from "./pages/Search";

import 'react-toastify/dist/ReactToastify.css';
import './index.css';


const router = createHashRouter([
    { path: PagesUrls.index, element: <Gallery /> },
    { path: PagesUrls.search, element: <Search /> },
]);

export const App = () => {

    return (
    <React.StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
    </React.StrictMode>);
}