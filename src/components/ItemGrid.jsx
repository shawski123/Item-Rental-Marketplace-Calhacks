import React, { useState } from "react";
import { MapPin, Star, XCircle, CheckCircle, CreditCard, Receipt } from "lucide-react";

const ItemGrid = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
  });
  const [receiptData, setReceiptData] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const calculateTotal = () => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    if (diffDays <= 0) return null;
    return {
      days: diffDays,
      cost: diffDays * selectedItem.price,
    };
  };

  const total = selectedItem ? calculateTotal() : null;

  const handleClose = () => {
    setSelectedItem(null);
    setStartDate("");
    setEndDate("");
    setShowPayment(false);
    setShowReceipt(false);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Generate fake transaction ID
    const transactionId = "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    setReceiptData({
      transactionId,
      item: selectedItem,
      startDate,
      endDate,
      total,
      name: paymentInfo.name,
      address: paymentInfo.address,
      date: new Date().toLocaleString(),
    });

    setShowPayment(false);
    setShowReceipt(true);
  };

  const downloadReceipt = () => {
    if (!receiptData) return;
    const text = `
Boro Rental Receipt
-----------------------------
Transaction ID: ${receiptData.transactionId}
Date: ${receiptData.date}

Item: ${receiptData.item.name}
Rental Period: ${receiptData.startDate} → ${receiptData.endDate}
Days: ${receiptData.total.days}
Total: $${receiptData.total.cost.toLocaleString()}

Customer: ${receiptData.name}
Address: ${receiptData.address}
-----------------------------
Thank you for using Boro!
    `;
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Boro_Receipt_${receiptData.transactionId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Boro</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedItem(item);
              setStartDate("");
              setEndDate("");
              setShowPayment(false);
            }}
            className="bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition cursor-pointer"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <div className="text-gray-500 text-sm flex items-center gap-1">
                <MapPin size={14} /> {item.location}
              </div>
              <div className="text-sm text-yellow-500 flex items-center gap-1">
                <Star size={14} /> {item.rating}{" "}
                <span className="text-gray-400 text-xs">({item.reviews})</span>
              </div>
              <p className="mt-2 font-semibold text-gray-800">${item.price}/day</p>
            </div>
          </div>
        ))}
      </div>

      {/* Item detail modal */}
      {selectedItem && !showPayment && !showReceipt && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              <XCircle size={24} />
            </button>

            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-semibold mb-2">{selectedItem.name}</h2>
            <p className="text-sm text-gray-500 mb-3">
              Category:{" "}
              <span className="font-medium text-gray-700">{selectedItem.category}</span>
            </p>
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <MapPin size={16} className="mr-1" />
              {selectedItem.location}
            </div>
            <div className="flex items-center text-yellow-500 text-sm mb-3">
              <Star size={16} className="mr-1" /> {selectedItem.rating}{" "}
              <span className="text-gray-400 ml-1">({selectedItem.reviews})</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <p className="text-sm font-medium text-gray-700">
                Owner: {selectedItem.owner}
              </p>
              {selectedItem.verified ? (
                <CheckCircle size={16} className="text-green-500" />
              ) : (
                <XCircle size={16} className="text-gray-400" />
              )}
            </div>

            {/* Date selection */}
            <div className="border rounded-xl p-3 mb-4">
              <label className="block text-sm text-gray-700 mb-2">
                Select rental dates:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  min={today}
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (endDate && e.target.value > endDate) setEndDate("");
                  }}
                  className="border rounded-lg p-2 w-1/2 text-sm"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  min={startDate || today}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded-lg p-2 w-1/2 text-sm"
                />
              </div>

              {total && (
                <p className="mt-3 text-sm text-gray-700">
                  <span className="font-medium">{total.days}</span> day
                  {total.days > 1 ? "s" : ""} × ${selectedItem.price}/day ={" "}
                  <span className="font-semibold">
                    ${total.cost.toLocaleString()}
                  </span>
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="border-t pt-4 flex flex-col gap-2">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
                onClick={() => alert("✅ Request sent (simulation only).")}
              >
                Request to Rent
              </button>

              <button
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                onClick={() => setShowPayment(true)}
                disabled={!total}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {selectedItem && showPayment && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <form
            className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handlePaymentSubmit}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={handleClose}
              type="button"
            >
              <XCircle size={24} />
            </button>

            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard size={22} /> Payment Details
            </h2>

            <div className="border rounded-xl p-3 mb-4 bg-gray-50">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-sm">{selectedItem.name}</h3>
                  {total && (
                    <p className="text-xs text-gray-600">
                      {startDate} → {endDate} ({total.days} days)
                    </p>
                  )}
                </div>
              </div>
              {total && (
                <p className="text-sm text-gray-800">
                  Total: <span className="font-semibold">${total.cost.toLocaleString()}</span>
                </p>
              )}
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name on card"
                value={paymentInfo.name}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, name: e.target.value })}
                required
                className="w-full border rounded-lg p-2 text-sm"
              />
              <input
                type="text"
                placeholder="Card number"
                value={paymentInfo.cardNumber}
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                }
                required
                className="w-full border rounded-lg p-2 text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={paymentInfo.expiry}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                  required
                  className="w-1/2 border rounded-lg p-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={paymentInfo.cvv}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                  required
                  className="w-1/2 border rounded-lg p-2 text-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Billing address"
                value={paymentInfo.address}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, address: e.target.value })}
                required
                className="w-full border rounded-lg p-2 text-sm"
              />
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <p className="font-semibold text-gray-800">
                Total: ${total?.cost?.toLocaleString() ?? 0}
              </p>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
              >
                Confirm Payment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && receiptData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              <XCircle size={24} />
            </button>

            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Receipt size={22} /> Rental Receipt
            </h2>

            <div className="border rounded-xl p-4 mb-4 bg-gray-50 text-sm">
              <p><strong>Transaction ID:</strong> {receiptData.transactionId}</p>
              <p><strong>Date:</strong> {receiptData.date}</p>
              <hr className="my-2" />
              <p><strong>Item:</strong> {receiptData.item.name}</p>
              <p><strong>Period:</strong> {receiptData.startDate} → {receiptData.endDate}</p>
              <p><strong>Days:</strong> {receiptData.total.days}</p>
              <p><strong>Total:</strong> ${receiptData.total.cost.toLocaleString()}</p>
              <hr className="my-2" />
              <p><strong>Name:</strong> {receiptData.name}</p>
              <p><strong>Address:</strong> {receiptData.address}</p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={downloadReceipt}
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
              >
                Download Receipt
              </button>
              <button
                onClick={handleClose}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemGrid;
