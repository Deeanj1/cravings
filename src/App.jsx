import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/logo.PNG";
import heroBg from "./assets/IMG-8964.jpg";
import frozen from "./assets/IMG-0348.jpg";
import newone from "./assets/IMG-8962.jpg"; 
import small from "./assets/IMG-8958.jpg";
import Payment from "./Payment";

export default function App() {
const [menuOpen, setMenuOpen] = useState(false);
const [selectedPlans, setSelectedPlans] = useState([]);

const pricingPlans = [
  {
    key: "frozen",
    img: frozen,
    title: "Frozen Plate",
    desc: "12 samosas or 12 spring rolls",
    price: 3500
  },
  {
    key: "small",
    img: small,
    title: "Small Platter",
    desc: "Mixed fried small chops, feeds 2-3 people",
    price: 6000
  },
  {
    key: "medium",
    img: heroBg,
    title: "Medium Platter",
    desc: "Mixed fried small chops, feeds 4-6 people",
    price: 15000
  },
  {
    key: "large",
    img: newone,
    title: "Large Platter",
    desc: "Mixed fried small chops, feeds 7-12 people",
    price: 30000
  }
];

const selectedItems = pricingPlans.filter(plan =>
  selectedPlans.includes(plan.key)
);
const total = selectedItems.reduce((sum, plan) => sum + plan.price, 0);

function togglePlan(key) {
  setSelectedPlans(prev =>
    prev.includes(key)
      ? prev.filter(k => k !== key)
      : [...prev, key]
  );
}


  return (
    <Router>
      <Routes>
      <Route path="/" element={
      <div className="font-sans text-gray-800">
        {/* Navbar */}
        <nav className="bg-orange-500 fixed w-full top-0 left-0 shadow-md z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="">
              <img src={logo} alt="Cravings Logo" className="h-10" />
            </Link>
            <div className="hidden md:flex gap-6 text-white font-medium">
              <a href="#products" className="hover:text-orange-500">Products</a>
              <a href="#pricing" className="hover:text-orange-500">Order Now</a>
              <a href="#order" className="hover:text-orange-500">Contact</a>
            </div>
            <button
              className="md:hidden text-orange-500"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden bg-white px-4 pb-4 space-y-2">
              <a href="#products" className="block hover:text-orange-500">Products</a>
              <a href="#pricing" className="block hover:text-orange-500">Pricing</a>
              <a href="#order" className="block hover:text-orange-500">Order Now</a>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section
          className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center text-center mt-17"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-opacity-60"></div>
          <div className="relative z-10 w-full px-6 py-20 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg"
              style={{ color: "rgb(251, 255, 252)" }}>
              Satisfy Your <span className="animate-color-change">Cravings</span>
              </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 font-extrabold drop-shadow"
              style={{ color: "rgb(251, 255, 252)" }}
>
              Freshly packed frozen samosas & spring rolls, plus mouth-watering fried platters.  
              Taste happiness in every bite.
            </p>
            <a
              href="#order"
              className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 shadow-lg"
            >
              Order Now
            </a>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-12">Our Products</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Frozen */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img src={frozen} alt="Frozen Small Chops" className="w-full h-56 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">Frozen Small Chops</h3>
              <p className="text-gray-600 mb-4">12 Samosas or 12 Spring Rolls in a sealed plate.</p>
              
            </div>
            {/* Fried */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img src={newone} alt="Fried Platters" className="w-full h-56 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fried Platters</h3>
              <p className="text-gray-600 mb-4">A mix of samosas, spring rolls, meat, and puff-puff.</p>
              
            </div>
          </div>
        </section>

        {/* Pricing Section */}
<section id="pricing" className="bg-orange-50 py-20 px-6">
  <h2 className="text-3xl font-bold text-center text-orange-500 mb-12">Order Now</h2>
<div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
  {pricingPlans.map(plan => (
    <div
      key={plan.key}
      className={`bg-white shadow-md p-6 text-center rounded-lg cursor-pointer relative border-2 transition-all duration-200 ${
        selectedPlans.includes(plan.key) ? "border-orange-500" : "border-transparent"
      }`}
      onClick={() => togglePlan(plan.key)}
    >
      {selectedPlans.includes(plan.key) && (
        <span className="absolute top-2 right-2 text-green-500 text-2xl">✔</span>
      )}
      <img src={plan.img} alt={plan.title} className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
      <p className="mb-4 text-gray-600">{plan.desc}</p>
      <p className="text-orange-500 font-bold text-2xl mb-4">₦{plan.price.toLocaleString()}</p>
    </div>
  ))}
</div></section>

        {/* Order Now Section */}
        <section id="order" className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-orange-500 mb-10">Want to place a very large order for a large party?, or even Cater at your events with our Finger foods?</h2>
         
          <a
            href="https://wa.me/+2349069081052"
            className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600"
          >
            Contact us on WhatsApp
          </a>
        </section>
{selectedPlans.length > 0 && (
  <div className="fixed bottom-6 left-0 w-full flex justify-center z-50">
    <button
      className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-orange-600 transition"
      onClick={() => {
        // Pass selectedItems and total to payment page
        window.location.href = `/payment?items=${encodeURIComponent(JSON.stringify(selectedItems))}&total=${total}`;
      }}
    >
      Proceed to Payment (₦{total.toLocaleString()})
    </button>
  </div>
)}
        {/* Footer */}
        <footer className="bg-orange-500 text-white py-6 text-center">
          © {new Date().getFullYear()} Cravings. All rights reserved.
        </footer>
      </div>
      } />
    <Route path="/payment" element={<Payment />} />
  </Routes>
    </Router>
  );
}
