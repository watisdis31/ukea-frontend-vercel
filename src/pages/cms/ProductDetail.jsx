import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchCategoryApi, fetchProductsApi } from "../../http/axios";
import { formatRupiah } from "../../utils/formatRupiah";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    async function fetchProduct() {
      try {
        const { data } = await fetchProductsApi.get(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, navigate, token]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await fetchCategoryApi.get("/pub/categories");
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-950 text-zinc-200">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-zinc-950 text-zinc-200">
        <p>Product not found</p>
      </div>
    );
  }

  return (
  <div className="bg-zinc-950 text-zinc-200 min-h-screen pt-24">
    <div className="max-w-7xl mx-auto px-10 py-16">
      <div className="grid md:grid-cols-2 gap-16 items-start">

        <div className="bg-zinc-900 rounded-lg p-8">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">
            {product.name}
          </h1>

          <p className="text-amber-500 text-2xl font-semibold mb-6">
            {formatRupiah(product.price)}
          </p>

          <p className="text-zinc-400 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-3 text-lg">
            <p>
              <span className="text-zinc-400">Stock:</span>{" "}
              {product.stock}
            </p>

            <p>
              <span className="text-zinc-400">Category:</span>{" "}
              {categories.find(cat => cat.id === product.CategoryId)?.name || "N/A"}
            </p>

            {/* <p>
              <span className="text-zinc-400">Owned by:</span>{" "}
              User ID {product.UserId}
            </p> */}
          </div>

        </div>
      </div>
    </div>
  </div>
);

}
