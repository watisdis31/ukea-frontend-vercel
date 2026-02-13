export default function CategoryForm({
  form,
  setForm,
  handleSubmit,
  loading,
  title,
  buttonLabel,
}) {
  function handleChange(el) {
    setForm({ ...form, [el.target.name]: el.target.value });
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
          placeholder="Category Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 bg-zinc-800 rounded outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-amber-500 text-black font-semibold rounded hover:bg-amber-400 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Saving..." : buttonLabel}
        </button>
      </form>
    </div>
  );
}
