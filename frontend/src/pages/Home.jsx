


import { useEffect, useState } from "react";
import API from "../services/axios";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);

        let params = [];

        if (search.trim()) {
          params.push(`search=${encodeURIComponent(search)}`);
        }

        if (category) {
          params.push(`category=${encodeURIComponent(category)}`);
        }

        if (sort) {
          params.push(`sort=${encodeURIComponent(sort)}`);
        }

        const query = params.length ? `?${params.join("&")}` : "";
        const url = `products/${query}`;

        const res = await API.get(url, {
          signal: controller.signal,
        });

        setProducts(
          Array.isArray(res.data)
            ? res.data
            : res.data.results || []
        );
      } catch (err) {
        if (
          err.name !== "CanceledError" &&
          err.code !== "ERR_CANCELED"
        ) {
          console.log(err);
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, category, sort]);

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-orange-50 py-10 px-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl p-10 mb-10 bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 text-white shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-black">
            Luxora Marketplace
          </h1>
          <p className="mt-3 text-white/90 text-lg">
            Discover premium products from trusted vendors
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="bg-white/80 backdrop-blur-xl border border-pink-100 shadow-lg p-5 rounded-3xl mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-4 rounded-2xl w-full border border-pink-100 outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-4 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-400 transition"
          >
            <option value="">All Categories</option>
            <option value="spices">Spices</option>
            <option value="fashion">Fashion</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="bakery">Bakery</option>
            <option value="beauty">Beauty & Care</option>
            <option value="home">Home Essentials</option>
            <option value="stationery">Stationery</option>
          </select>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-4 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-400 transition"
          >
            <option value="">Sort By</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && products.length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-pink-100">
            <h2 className="text-3xl font-bold text-gray-800">
              No Products Found
            </h2>
            <p className="text-gray-500 mt-2">
              Try changing search or filters
            </p>
          </div>
        )}

        {/* PRODUCTS GRID */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="transform hover:scale-[1.02] transition duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;