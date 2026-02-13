import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchCategoryApi, fetchProductsApi } from "../../http/axios";
import ProductForm from "../../components/ProductForm";
import { showError, showSuccess } from "../../utils/swal";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("access_token");
  const user = token ? jwtDecode(token) : null;

  const [form, setForm] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  async function fetchData() {
    try {
      const [productRes, categoryRes] = await Promise.all([
        fetchProductsApi.get(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetchCategoryApi.get("/pub/categories"),
      ]);

      const product = productRes.data.data;

      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        CategoryId: product.CategoryId,
        imgUrl: product.imgUrl,
      });

      setCategories(categoryRes.data.categories);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load product data";

      showError(message);

      setTimeout(() => {
        navigate("/pub/products");
      }, 1500);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      await fetchProductsApi.put(`/products/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSuccess("Product successfully updated");

      setTimeout(() => {
        navigate("/pub/products");
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update product";

      showError(message);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !form) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-950">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ProductForm
      form={form}
      setForm={setForm}
      handleSubmit={handleSubmit}
      categories={categories}
      loading={loading}
      title="Edit Product"
      buttonLabel="Update Product"
    />
  );
}
