import { createBrowserRouter, redirect } from "react-router";
import BaseLayout from "../pages/BaseLayout";
import CmsLayout from "../pages/CmsLayout";
import Home from "../pages/public/Home";
import PublicProduct from "../pages/public/PublicProduct";
import Login from "../pages/cms/Login";
import Categories from "../pages/cms/Categories";
import AddStaff from "../pages/cms/AddStaff";
import AddProduct from "../pages/cms/AddProduct";
import EditProduct from "../pages/cms/EditProduct";
import AddCategory from "../pages/cms/AddCategory";
import EditCategory from "../pages/cms/EditCategory";
import ProductDetail from "../pages/cms/ProductDetail";
import UploadProductImage from "../pages/cms/UploadProductImage";
import Products from "../pages/cms/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: BaseLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "pub/products",
        element: <PublicProduct />,
      },
      {
        path: "products/create",
        element: <AddProduct />,
      },
      {
        path: "products/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        return redirect("/");
      }
    },
  },
  {
    path: "/cms",
    Component: CmsLayout,
    loader: () => {
      const role = localStorage.getItem("role");
      if (role !== "Admin") {
        return redirect("/");
      }
    },
    children: [
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/create",
        element: <AddCategory />,
      },
      {
        path: "categories/:id",
        element: <EditCategory />,
      },
      {
        path: "add-staff",
        element: <AddStaff />,
      },
      {
        path: "products/:id/upload",
        element: <UploadProductImage />,
      },
    ],
  },
]);
