import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/logo.PNG";
import heroBg from "./assets/IMG-8964.jpg";
import frozen from "./assets/IMG-0348.jpg";
import newone from "./assets/IMG-8962.jpg";
import small from "./assets/IMG-8958.jpg";
import Payment from "./Payment";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quantities, setQuantities] = useState({}); // { key: qty }
  const navigate = useNavigate();

  const pricingPlans = [
    { key: "frozen", img: frozen, title: "Frozen Plate", desc: "12 samosas or 12 spring rolls", price: 3500 },
    { key: "small",  img: small,   title: "Small Platter",  desc: "Mixed fried small chops, feeds 2–3", price: 6000 },
    { key: "medium", img: heroBg,  title: "Medium Platter", desc: "Mixed fried small chops, feeds 4–6", price: 15000 },
    { key: "large",  img: newone,  title: "Large Platter",  desc: "Mixed fried small chops, feeds 7–12", price: 30000 },
  ];

  const increment = (key) => setQuantities(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  const decrement = (key) => {
    setQuantities(prev => {
      const next = Math.max(0, (prev[key] || 0) - 1);
      if (next === 0) {
        const { [key]: _omit, ...rest } = prev;
        return rest; // deselect when qty returns to 0
      }
      return { ...prev, [key]: next };
    });
  };

  const cartItems = pricingPlans
    .filter(p => (quantities[p.key] || 0) > 0)
    .map(p => ({
      key: p.key,
      title: p.title,
      price: p.price,
      qty: quantities[p.key],
      lineTotal: p.price * quantities[p.key],
    }));

  const subtotal = cartItems.reduce((s, i) => s + i.lineTotal, 0);
  const totalUnits = cartItems.reduce((s, i) => s + i.qty, 0);

  const goToPayment = () => {
    const payload = cartItems.map(({ key, title, price, qty }) => ({ key, title, price, qty }));
    navigate(`/payment?items=${encodeURIComponent(JSON.stringify(payload))}`);
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="bg-orange-500 fixed w-full top-0 left-0 shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Cravings Logo" className="h-10" />
          </Link>
          <div className="hidden md:flex gap-6 text-white font-medium">
            <a href="#products" className="hover:underline">Products</a>
            <a href="#pricing" className="hover:underline">Order Now</a>
            <a href="#order" className="hover:underline">Contact</a>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white px-4 pb-4 space-y-2">
            <a href="#products" className="block hover:text-orange-500">Products</a>
            <a href="#pricing" className="block hover:text-orange-500">Order Now</a>
            <a href="#order" className="block hover:text-orange-500">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        className="relative w-full min-h-[420px] md:min-h-[520px] flex items-center justify-center text-center pt-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 w-full px-6 py-14 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
            Satisfy Your <span className="animate-color-change">Cravings</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 font-semibold text-white/95">
            Freshly packed frozen samosas & spring rolls, plus mouth-watering fried platters.
          </p>
          <a
            href="#pricing"
            className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 shadow-lg"
          >
            Order Now
          </a>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-12">Our Products</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <img src={frozen} alt="Frozen Small Chops" className="w-full h-56 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Frozen Small Chops</h3>
            <p className="text-gray-600 mb-4">12 Samosas or 12 Spring Rolls in a sealed plate.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <img src={newone} alt="Fried Platters" className="w-full h-56 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fried Platters</h3>
            <p className="text-gray-600 mb-4">A mix of samosas, spring rolls, meat, and puff-puff.</p>
          </div>
        </div>
      </section>

      {/* Pricing / Order Now with quantity controls */}
      <section id="pricing" className="bg-orange-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-12">Order Now</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map(plan => {
            const qty = quantities[plan.key] || 0;
            return (
              <div
                key={plan.key}
                className={`bg-white shadow-md p-6 text-center rounded-lg relative border-2 transition-all duration-200 ${
                  qty > 0 ? "border-orange-500" : "border-transparent"
                }`}
              >
                <img src={plan.img} alt={plan.title} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="mb-4 text-gray-600">{plan.desc}</p>
                <p className="text-orange-500 font-bold text-2xl mb-4">₦{plan.price.toLocaleString()}</p>

                {/* Quantity stepper */}
                <div className="mt-2 flex items-center justify-center gap-4">
                  <button
                    onClick={() => decrement(plan.key)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-xl disabled:opacity-40"
                    disabled={qty === 0}
                    aria-label={`Remove one ${plan.title}`}
                  >
                    −
                  </button>
                  <span className="min-w-[2ch] text-lg font-bold">{qty}</span>
                  <button
                    onClick={() => increment(plan.key)}
                    className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl hover:bg-orange-600"
                    aria-label={`Add one ${plan.title}`}
                  >
                    +
                  </button>
                </div>

                {qty > 0 && (
                  <div className="mt-3 text-sm text-gray-700">
                    <span className="font-medium">Item total:</span>{" "}
                    ₦{(plan.price * qty).toLocaleString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Large orders CTA */}
      <section id="order" className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-orange-500 mb-10">
          Planning a party or need event catering?
        </h2>
        <a
          href="https://wa.me/+2349069081052"
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600"
        >
          Contact us on WhatsApp
        </a>
      </section>

      {/* Floating checkout */}
      {subtotal > 0 && (
        <div className="fixed bottom-6 left-0 w-full flex justify-center z-50 px-4">
          <button
            className="bg-orange-600 text-white px-6 py-4 rounded-full font-bold shadow-lg hover:bg-orange-700 transition flex items-center gap-3"
            onClick={goToPayment}
          >
            <span>Proceed to Payment</span>
            <span className="opacity-90">•</span>
            <span>{totalUnits} item{totalUnits === 1 ? "" : "s"}</span>
            <span className="opacity-90">•</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-orange-500 text-white py-6 text-center">
        © {new Date().getFullYear()} Cravings. All rights reserved.
      </footer>
    </div>
  );
}
