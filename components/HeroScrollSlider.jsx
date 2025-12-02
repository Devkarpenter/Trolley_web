"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";  // ⭐ ADDED

const products = [
  {
    id: 1,
    title: "Premium Voyager",
    img: "/hero/trolley1.png",
    price: "$299",
    leftInfo: [
      {
        title: "Premium Materials",
        desc: "Crafted from high-grade polycarbonate shell with reinforced corners.",
      },
      {
        title: "Smart Design",
        desc: "360° spinner wheels and telescopic handle ensure effortless movement.",
      },
    ],
    rightInfo: [
      {
        title: "Specifications",
        list: ["Capacity: 55L", "Weight: 3.2kg", "55×40×20 cm", "TSA Lock"],
      },
      {
        title: "Features",
        list: ["Water resistant", "Interior organizers", "5-year warranty"],
      },
    ],
  },

  {
    id: 2,
    title: "Business Elite",
    img: "/hero/trolley2.png",
    price: "$349",
    leftInfo: [
      {
        title: "Executive Build",
        desc: "Made for frequent flyers with heavy-duty reinforced frame.",
      },
      {
        title: "Silent Wheels",
        desc: "Premium noiseless 360° wheels for smooth airport navigation.",
      },
    ],
    rightInfo: [
      {
        title: "Specifications",
        list: ["Capacity: 48L", "Weight: 2.8kg", "TSA Lock", "Laptop Pocket"],
      },
      {
        title: "Features",
        list: ["Shock Absorption", "Anti-scratch surface"],
      },
    ],
  },

  {
    id: 3,
    title: "Family Edition",
    img: "/hero/trolley3.png",
    price: "$399",
    leftInfo: [
      {
        title: "Extra Space",
        desc: "Perfect for family trips with max storage capacity.",
      },
      {
        title: "Stable Balance",
        desc: "Wide-body design keeps the trolley stable even when full.",
      },
    ],
    rightInfo: [
      {
        title: "Specifications",
        list: ["Capacity: 75L", "Weight: 4.1kg", "60×43×25 cm"],
      },
      {
        title: "Features",
        list: ["Waterproof", "Expandable Zippers", "Premium Handle"],
      },
    ],
  },
];

export default function HeroScrollSlider() {
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);
  const router = useRouter(); // ⭐ ADDED

  // SCROLL LOGIC
  useEffect(() => {
    const section = sectionRef.current;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const visible = Math.min(Math.max(0, -rect.top), window.innerHeight * 2);
      const percentage = visible / (window.innerHeight * 2);

      if (percentage < 0.33) setIndex(0);
      else if (percentage < 0.66) setIndex(1);
      else setIndex(2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh] w-full">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        <motion.div 
          className="absolute inset-0 bg-slate-900"
          key={`bg-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        />
        
        <div className="relative h-full w-full flex items-center">

          {/* LEFT INFO (hidden on mobile) */}
          <div className="hidden lg:flex flex-1 pl-12 pr-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${index}-left`}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-white shadow-xl border border-white/20 w-full"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-3">
                  {products[index].leftInfo[0].title}
                </h3>
                <p className="text-sm leading-relaxed opacity-90 mb-4">
                  {products[index].leftInfo[0].desc}
                </p>

                <h3 className="text-2xl font-bold mb-3 mt-6">
                  {products[index].leftInfo[1].title}
                </h3>
                <p className="text-sm leading-relaxed opacity-90">
                  {products[index].leftInfo[1].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CENTER IMAGE */}
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={products[index].img}
                src={products[index].img}
                className="lg:w-[400px] w-[280px] h-auto drop-shadow-2xl"
                initial={{ opacity: 0, scale: 0.6, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotateY: 90 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>

            {/* TITLE */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={products[index].title}
                className="text-white lg:text-5xl text-3xl font-bold mt-8 lg:mb-6 mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                {products[index].title}
              </motion.h1>
            </AnimatePresence>

            {/* Price on Mobile */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`${products[index].price}-mobile`}
                className="lg:hidden text-white text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {products[index].price}
              </motion.p>
            </AnimatePresence>

            {/* ⭐ CHECK OUT → SHOP PAGE */}
            <motion.button
              onClick={() => router.push("/products")} // ⭐ NAVIGATION ADDED
              className="lg:px-12 lg:py-4 px-8 py-3 bg-white text-slate-900 rounded-full font-semibold shadow-2xl hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Check Out
            </motion.button>
          </div>

          {/* RIGHT INFO (hidden on mobile) */}
          <div className="hidden lg:flex flex-1 pr-12 pl-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${index}-right`}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-white shadow-xl border border-white/20 w-full"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-3">
                  {products[index].rightInfo[0].title}
                </h3>

                <ul className="space-y-2 text-sm mb-6">
                  {products[index].rightInfo[0].list.map((l, j) => (
                    <motion.li
                      key={j}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + j * 0.1 }}
                    >
                      <span className="text-green-400">✔</span>
                      <span className="opacity-90">{l}</span>
                    </motion.li>
                  ))}
                </ul>

                <h3 className="text-2xl font-bold mb-3">
                  {products[index].rightInfo[1].title}
                </h3>

                <ul className="space-y-2 text-sm">
                  {products[index].rightInfo[1].list.map((l, j) => (
                    <motion.li
                      key={j}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + j * 0.1 }}
                    >
                      <span className="text-green-400">✔</span>
                      <span className="opacity-90">{l}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* DOTS */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === i ? "bg-white" : "bg-white/30"
              }`}
              whileHover={{ scale: 1.3 }}
              animate={{ scale: index === i ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
