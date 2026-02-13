import { useEffect, useState } from "react";
import { fetchCategoryApi } from "../../http/axios";
import { useNavigate } from "react-router";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  async function fetchCategories() {
    try {
      const { data } = await fetchCategoryApi.get("/pub/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await fetchCategoryApi.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex bg-zinc-950 text-zinc-200 min-h-screen">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Categories</h1>

        <div className="mb-4">
          <button
            className="px-4 py-2 bg-amber-500 text-black rounded hover:bg-amber-400 cursor-pointer"
            onClick={() => navigate("/cms/categories/create")}
          >
            + Add Category
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10 bg-zinc-950">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <table className="w-full border border-zinc-800 table-auto">
            <thead className="bg-zinc-900">
              <tr>
                <th className="p-3 text-left w-2/3">Category Name</th>
                <th className="p-3 text-right w-1/3">Action</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-t border-zinc-800 hover:bg-zinc-900"
                >
                  <td className="p-3">{category.name}</td>

                  <td className="p-3 flex gap-3 justify-end">
                    <button
                      className="text-amber-400 hover:underline cursor-pointer"
                      onClick={() =>
                        navigate(`/cms/categories/${category.id}`, {state: {category}})
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-400 hover:underline cursor-pointer"
                      onClick={() => handleDelete(category.id)}
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
