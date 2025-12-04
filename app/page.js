
import Hero from '../components/Hero'
import  FeaturedProducts  from '../components/FeaturedProducts'
import Category from '../components/Category'
import Why from '../components/Why'
import Testimonials from '../components/Testimonials'
import HeroScrollSlider from '../components/HeroScrollSlider'

export default async function Home() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  const products = await res.json();
  
  return (
    <div className="max-w-9xl mx-auto p-2">
      {/* <HeroSlider /> */}
      <HeroScrollSlider />
      <FeaturedProducts products={products}/>
      <Category />
      <Why />
      <Testimonials />
    </div>
  )
}
