import { Link, useLocation } from "react-router";

export default function CmsNavbar() {
  const location = useLocation();

  function navClass(path) {
    const isActive = location.pathname.startsWith(path);

    return `
      relative cursor-pointer
      ${isActive ? "text-white after:w-full" : "text-zinc-300"}
      hover:text-white
      after:absolute after:left-0 after:-bottom-1
      after:h-0.5 after:bg-amber-500
      after:transition-all after:duration-300
      ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
    `;
  }

  return (
    <aside className="w-56 min-h-screen bg-zinc-900 text-zinc-200 p-6">
      <h1 className="text-xl font-bold text-white mb-8">
        <span className="text-amber-500">U</span>
        <span className="text-blue-500">KEA </span>
        ADMIN
      </h1>

      <ul className="space-y-4 text-zinc-300">
        <li>
          <Link
            to="/cms/products"
            className={navClass("/cms/products")}
          >
            Products
          </Link>
        </li>

        <li>
          <Link
            to="/cms/categories"
            className={navClass("/cms/categories")}
          >
            Categories
          </Link>
        </li>

        <li>
          <Link
            to="/cms/add-staff"
            className={navClass("/cms/add-staff")}
          >
            Add Staff
          </Link>
        </li>

        <li>
          <Link
            to="/"
            className="relative hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
          >
            Back to Home
          </Link>
        </li>
      </ul>
    </aside>
  );
}
