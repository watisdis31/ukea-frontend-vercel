import { useState } from "react";
import { useNavigate } from "react-router";
import { fetchCategoryApi } from "../../http/axios";
import CategoryForm from "../../components/CategoryForm";
import { showSuccess, showError } from "../../utils/swal";

export default function AddCategory() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [form, setForm] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      await fetchCategoryApi.post("/categories", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showSuccess("Category successfully added");

      setTimeout(() => {
        navigate("/cms/categories");
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create category";

      showError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CategoryForm
      form={form}
      setForm={setForm}
      handleSubmit={handleSubmit}
      loading={loading}
      title="Add New Category"
      buttonLabel="Add Category"
    />
  );
}
