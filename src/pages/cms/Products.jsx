import { useEffect, useState } from "react";
import { fetchProductsApi } from "../../http/axios";
import { formatRupiah } from "../../utils/formatRupiah";
import { useNavigate } from "react-router";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      const { data } = await fetchProductsApi.get("/pub/products", {
        params: { page: 1, limit: 100 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex bg-zinc-950 text-zinc-200 min-h-screen">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Product List</h1>

        <div className="mb-4">
          <button
            className="px-4 py-2 bg-amber-500 text-black rounded hover:bg-amber-400 cursor-pointer"
            onClick={() => navigate("/products/create")}
          >
            + Add Product
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10 bg-zinc-950">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <table className="w-full border border-zinc-800">
            <thead className="bg-zinc-900">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-zinc-800 hover:bg-zinc-900"
                >
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.Category?.name || "-"}</td>
                  <td className="p-3">{formatRupiah(product.price)}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">{product.imgUrl ? "image uploaded" : "-"}</td>
                  <td className="p-3 space-x-3">
                    <button
                      className="text-amber-400 hover:underline cursor-pointer"
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-blue-400 hover:underline cursor-pointer"
                      onClick={() => navigate(`/cms/products/${product.id}/upload`)}
                    >
                      Upload
                    </button>
                    <button
                      className="text-red-400 hover:underline cursor-pointer"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
