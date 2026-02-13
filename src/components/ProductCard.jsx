import { useNavigate } from "react-router";
import { formatRupiah } from "../utils/formatRupiah";

export default function ProductCard({ product, user, handleDelete }) {
  const navigate = useNavigate();

  const isOwner = user && Number(product.UserId) === Number(user.id);

  return (
    <div className="relative bg-zinc-900 rounded overflow-hidden hover:scale-105 transition-transform duration-300">
      {isOwner && (
        <span className="absolute top-2 right-2 bg-amber-500 text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
          Your Product
        </span>
      )}

      <img
        src={product.imgUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 pointer-events-none">
          {product.name}
        </h2>

        <p className="text-zinc-400 mb-2 line-clamp-2 pointer-events-none">
          {product.description}
        </p>

        <p className="text-amber-500 font-bold pointer-events-none">
          {formatRupiah(product.price)}
        </p>

        {user && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => navigate(`/products/${product.id}`)}
              className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 cursor-pointer"
            >
              Detail
            </button>

            {isOwner && (
              <>
                <button
                  onClick={() => navigate(`/products/edit/${product.id}`)}
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
