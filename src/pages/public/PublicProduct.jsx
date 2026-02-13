import { useEffect, useState } from "react";
import { fetchCategoryApi, fetchProductsApi } from "../../http/axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import ProductCard from "../../components/ProductCard";

export default function PublicProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  let user = token ? jwtDecode(token) : null;

  async function fetchProducts() {
    try {
      const { data } = await fetchProductsApi.get("/pub/products", {
        params: { page, search, sort, filter, limit: 9 },
      });
      setProducts(data.product);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await fetchCategoryApi.get("/pub/categories");
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [page, search, sort, filter]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleDelete(id) {
    try {
      await fetchProductsApi.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-zinc-950 text-zinc-200 min-h-screen pt-10">
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(el) => {
              setPage(1);
              setSearch(el.target.value);
            }}
            className="px-4 py-2 bg-zinc-800 rounded text-white"
          />

          <select
            value={filter}
            onChange={(el) => {
              setPage(1);
              setFilter(el.target.value);
            }}
            className="px-4 py-2 bg-zinc-800 rounded text-white"
          >
            <option value="">All Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value);
            }}
            className="px-4 py-2 bg-zinc-800 rounded text-white"
          >
            <option value="">Oldest</option>
            <option value="DESC">Newest</option>
          </select>

          {user && (
            <button
              className="px-4 bg-amber-500 text-black rounded hover:bg-amber-400 cursor-pointer"
              onClick={() => navigate("/products/create")}
            >
              + Add Product
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                user={user}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-zinc-800 rounded disabled:opacity-50 hover:bg-amber-500 hover:text-black transition"
          >
            Prev
          </button>

          {[...Array(totalPage)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-4 py-2 rounded transition ${
                page === index + 1
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-800 hover:bg-amber-500 hover:text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-zinc-800 rounded disabled:opacity-50 hover:bg-amber-500 hover:text-black transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
