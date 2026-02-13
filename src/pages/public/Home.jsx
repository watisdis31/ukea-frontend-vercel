import { Link } from "react-router";

export default function Home() {
  return (
    <div className="bg-zinc-950 text-zinc-200 min-h-screen">
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-5xl font-extrabold mb-6">
          Modern Living Starts Here
        </h1>

        <p className="text-zinc-400 max-w-xl mb-8">
          Discover minimalist furniture designed to bring comfort, simplicity,
          and elegance to your home.
        </p>

        <Link to={"/pub/products"} className="bg-amber-500 text-black px-6 py-3 rounded hover:bg-amber-400 transition cursor-pointer">
          See Products
        </Link>
      </section>

      <section className="px-10 pb-24">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div className="bg-zinc-900 p-8 rounded">
            <h3 className="text-lg font-semibold mb-2">Quality Materials</h3>
            <p className="text-zinc-400 text-sm">
              Built with durable and premium materials.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded">
            <h3 className="text-lg font-semibold mb-2">Minimal Design</h3>
            <p className="text-zinc-400 text-sm">
              Clean, elegant, and modern aesthetic.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded">
            <h3 className="text-lg font-semibold mb-2">Affordable Price</h3>
            <p className="text-zinc-400 text-sm">
              High quality furniture at fair prices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
