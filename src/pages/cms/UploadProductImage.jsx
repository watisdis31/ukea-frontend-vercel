import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchProductsApi } from "../../http/axios";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { showError, showSuccess } from "../../utils/swal";

export default function UploadProductImage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [product, setProduct] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [dbUpdateFailed, setDbUpdateFailed] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await fetchProductsApi.get(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProduct(data.data);
        setPreviewUrl(data.data.imgUrl || "");
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to load product data";

        showError(message);

        setTimeout(() => {
          navigate("/cms/products");
        }, 1500);
      }
    }

    fetchProduct();
  }, [id]);

  const handleFileUpload = async (fileInfo) => {
    try {
      setDbUpdateFailed(false);
      setPreviewUrl(fileInfo.cdnUrl);

      const response = await fetch(fileInfo.cdnUrl);
      const blob = await response.blob();
      const fileObj = new File([blob], "product.jpg", {
        type: blob.type,
      });

      setFile(fileObj);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to prepare file for upload.";
      showError(message);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return showError("Please select an image first.");
    }

    const formData = new FormData();
    formData.append("imgUrl", file);

    try {
      setLoading(true);
      setDbUpdateFailed(false);

      await fetchProductsApi.patch(`/products/${id}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showSuccess("Image successfully uploaded");

      setTimeout(() => {
        navigate("/cms/products");
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Database update failed. You can retry.";

      showError(message);

      if (previewUrl) {
        setDbUpdateFailed(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetryDbUpdate = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("imgUrl", file);

    try {
      setLoading(true);
      setDbUpdateFailed(false);

      await fetchProductsApi.patch(`/products/${id}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showSuccess("Database successfully updated");

      setTimeout(() => {
        navigate("/cms/products");
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message || "Retry failed. Please try again later.";

      showError(message);
      setDbUpdateFailed(true);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="bg-zinc-950 text-zinc-200 min-h-screen flex justify-center items-center">
        <p>Loading product data...</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-zinc-200 min-h-screen flex justify-center items-center px-4">
      <div className="bg-zinc-900 p-8 rounded w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Upload Image for {product.name}
        </h1>

        <FileUploaderRegular
          pubkey="6a04d623e2059daeafb3"
          onFileUploadSuccess={handleFileUpload}
        />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="my-4 rounded h-40 w-full object-cover"
          />
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-2 bg-amber-500 text-black font-semibold rounded hover:bg-amber-400 transition disabled:opacity-50 mt-4 cursor-pointer"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>

        {dbUpdateFailed && (
          <button
            onClick={handleRetryDbUpdate}
            disabled={loading}
            className="w-full py-2 mt-2 bg-blue-500 text-black font-semibold rounded hover:bg-blue-400 transition"
          >
            Retry Database Update
          </button>
        )}
      </div>
    </div>
  );
}
