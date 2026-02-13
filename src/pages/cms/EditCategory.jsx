import { useLocation, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { fetchCategoryApi } from "../../http/axios";
import CategoryForm from "../../components/CategoryForm";
import { showError, showSuccess } from "../../utils/swal";

export default function EditCategory() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [form, setForm] = useState(location.state?.category || { name: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      await fetchCategoryApi.put(`/categories/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showSuccess("Category successfully updated");

      setTimeout(() => {
        navigate("/cms/categories");
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update category";

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
      title="Edit Category"
      buttonLabel="Update Category"
    />
  );
}
