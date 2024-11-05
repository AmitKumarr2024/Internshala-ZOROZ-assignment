import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Product_List from "../page/Product_List";
import Home from "../page/Home";
import Payment_page from "../page/Payment_page";
import Product_details from "../page/Product_details";
import Cart from "../page/Cart";
import ProductSearch from "../page/ProductSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product-details/:id",
        element: <Product_details />,
      },
      {
        path: "product-list",
        element: <Product_List />,
      },
      {
        path: "payment-page",
        element: <Payment_page />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <ProductSearch />,
      },
    ],
  },
]);

export default router;
