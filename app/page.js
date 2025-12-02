
import Hero from '../components/Hero'
import  FeaturedProducts  from '../components/FeaturedProducts'
import Category from '../components/Category'
import Why from '../components/Why'
import Testimonials from '../components/Testimonials'
import HeroScrollSlider from '../components/HeroScrollSlider'

export default function Home() {
  return (
    <div className="max-w-9xl mx-auto p-2">
      {/* <HeroSlider /> */}
      <HeroScrollSlider />
      <FeaturedProducts />
      <Category />
      <Why />
      <Testimonials />
    </div>
  )
}
