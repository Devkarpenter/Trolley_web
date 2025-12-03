import ProductCard from "../../components/ProductCard";

export default async function Products() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  const products = await res.json();

  return (
    <div className="max-w-7xl mx-auto p-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
