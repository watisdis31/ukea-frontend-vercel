import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import Button from "./Button";

export default function ProductForm({
  form,
  setForm,
  handleSubmit,
  categories,
  loading,
  title,
  buttonLabel,
}) {
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="bg-zinc-950 text-zinc-200 flex justify-center items-start px-4 pt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded w-full max-w-md shadow-lg mb-15"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 bg-zinc-800 rounded outline-none"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 bg-zinc-800 rounded outline-none"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 bg-zinc-800 rounded outline-none"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 bg-zinc-800 rounded outline-none"
        />

        <select
          name="CategoryId"
          value={form.CategoryId}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 bg-zinc-800 rounded outline-none"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Upload Image</label>

          <FileUploaderRegular
            pubkey="6a04d623e2059daeafb3"
            onFileUploadSuccess={(file) => {
              setForm((prev) => ({
                ...prev,
                imgUrl: file.cdnUrl,
              }));
            }}
          />
        </div>

        {form.imgUrl && (
          <img
            src={form.imgUrl}
            alt="Preview"
            className="mb-6 rounded h-40 w-full object-cover"
          />
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : buttonLabel}
        </Button>
      </form>
    </div>
  );
}
