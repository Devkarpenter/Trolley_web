import ProductCard from '../../components/ProductCard'
import { CartContext } from '../../context/cart-context'

const categories = [
  { id: 1, name: 'Travel Trolleys', description: 'Large capacity trolleys for long trips', products: 12 },
  { id: 2, name: 'Cabin Luggage', description: 'Compact trolleys for airline carry-on', products: 8 },
  { id: 3, name: 'Business Cases', description: 'Professional luggage for business travel', products: 6 },
  { id: 4, name: 'Backpack Trolleys', description: 'Hybrid trolley-backpacks', products: 5 },
]

const sampleProducts = [
  { id: 1, name: 'Premium Travel Trolley', price: 2999 },
  { id: 2, name: 'Smart Cabin Case', price: 1999 },
  { id: 3, name: 'Business Executive Case', price: 3499 },
  { id: 4, name: 'Hybrid Backpack Trolley', price: 2499 },
]

export default function Categories() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Browse Categories</h1>
      
      {/* Category Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
            <p className="text-gray-600 mb-3">{cat.description}</p>
            <p className="text-sm text-gray-500">{cat.products} products available</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View {cat.name}
            </button>
          </div>
        ))}
      </div>

      {/* Featured Products from Category */}
      <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {sampleProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
