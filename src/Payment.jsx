import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

export default function Payment() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const items = JSON.parse(params.get("items") || "[]");

  // Calculate subtotal & delivery
  const itemsSubtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const deliveryFee = 3000;
  const finalTotal = itemsSubtotal + deliveryFee;

  const [copied, setCopied] = useState(false);

  const accountNumber = "2341354976";
  const bankName = "UBA";
  const accountName = "David Oluwaseun Anjorin";

  function copyAccount() {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-6 py-16">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-orange-500 text-center">
          Complete Your Order
        </h2>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Your Order</h3>
          <ul className="mb-4">
            {items.map(item => (
              <li key={item.key} className="flex justify-between border-b py-2">
                <span>{item.title} × {item.qty}</span>
                <span className="font-semibold">
                  ₦{(item.price * item.qty).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span>₦{itemsSubtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery (Lagos):</span>
            <span>₦{deliveryFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-orange-600 mt-2">
            <span>Total:</span>
            <span>₦{finalTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-orange-100 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-orange-600 mb-2">Bank Transfer Details</h3>
          <p className="mb-1"><span className="font-semibold">Bank:</span> {bankName}</p>
          <p className="mb-1"><span className="font-semibold">Account Name:</span> {accountName}</p>
          <p className="mb-4"><span className="font-semibold">Account Number:</span> {accountNumber}</p>
          
          <button
            onClick={copyAccount}
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition"
          >
            {copied ? "Copied!" : "Copy Account Number"}
          </button>
        </div>

        {/* WhatsApp confirmation */}
        <div className="text-center">
          <p className="mb-4 text-gray-600">
            After making payment, please send your proof of payment on WhatsApp to confirm your order.
          </p>
          <a
            href="https://wa.me/+2348061419152"
            className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 inline-block"
          >
            Send Proof on WhatsApp
          </a>
        </div>
      </div>

      {/* Back to Home */}
      <Link to="/" className="mt-6 text-orange-500 font-medium hover:underline">
        ← Back to Shop
      </Link>
    </div>
  );
}
