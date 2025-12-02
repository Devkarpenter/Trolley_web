import ProductCard from '../../components/ProductCard'
import { products } from '../data/product'   // ⭐ IMPORT SHARED DATA

export default function Products() {
  return (
    <div className="max-w-7xl mx-auto p-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
