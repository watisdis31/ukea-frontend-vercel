import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchCategoryApi, fetchProductsApi } from "../../http/axios";
import ProductForm from "../../components/ProductForm";
import { showError, showSuccess } from "../../utils/swal";

export default function AddProduct() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  let user = null;
  if (token) {
    user = jwtDecode(token);
  }

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    CategoryId: "",
    imgUrl: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  async function fetchCategories() {
    try {
      const { data } = await fetchCategoryApi.get("/pub/categories");
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      await fetchProductsApi.post("/products", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Product successfully created");

      setTimeout(() => {
        navigate("/pub/products");
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create product";

      showError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProductForm
      form={form}
      setForm={setForm}
      handleSubmit={handleSubmit}
      categories={categories}
      loading={loading}
      title="Add New Product"
      buttonLabel="Create Product"
    />
  );
}
