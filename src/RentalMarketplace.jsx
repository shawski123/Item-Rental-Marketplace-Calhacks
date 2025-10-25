import React, { useState } from 'react';
import { MapPin, Star, X, User, CheckCircle, Truck, Calendar } from 'lucide-react';

export default function RentalMarketplace() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [rentalRequested, setRentalRequested] = useState(false);

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const calculateTotal = () => {
    const days = calculateDays();
    return days * (selectedItem?.price || 0);
  };

  const handleRentRequest = () => {
    if (!startDate || !endDate) {
      alert('Please select rental dates first');
      return;
    }
    setRentalRequested(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setStartDate('');
    setEndDate('');
    setShowDatePicker(false);
    setRentalRequested(false);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const listings = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
      title: "Professional DSLR Camera",
      location: "San Francisco, CA",
      rating: 4.8,
      reviews: 127,
      price: 45,
      category: "Electronics",
      description: "This professional dslr camera is available for rent. Perfect for your next project or adventure. Well-maintained and ready to use.",
      owner: "Sarah Johnson",
      verified: true,
      delivery: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80",
      title: "Power Drill Set",
      location: "Austin, TX",
      rating: 4.9,
      reviews: 89,
      price: 25,
      category: "Tools",
      description: "Complete power drill set with multiple attachments and carrying case. Ideal for home improvement projects and construction work.",
      owner: "Michael Chen",
      verified: true,
      delivery: false
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80",
      title: "Camping Tent - 4 Person",
      location: "Portland, OR",
      rating: 4.7,
      reviews: 203,
      price: 35,
      category: "Outdoor",
      description: "Spacious 4-person camping tent with rainfly and storage pockets. Perfect for weekend camping trips and outdoor adventures.",
      owner: "Emily Rodriguez",
      verified: true,
      delivery: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">RentIt</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm mb-3">
                  {item.category}
                </span>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{item.location}</span>
                </div>

                <div className="flex items-center mb-4">
                  <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-semibold text-gray-900">{item.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({item.reviews})</span>
                </div>

                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    ${item.price}
                  </span>
                  <span className="text-gray-500 ml-1">/day</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {rentalRequested ? (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <CheckCircle size={64} className="text-green-500 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Rental Request Sent!</h3>
                  <p className="text-gray-600 mb-4">
                    Your request to rent "{selectedItem.title}" has been sent to {selectedItem.owner}.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto mb-6">
                    <div className="text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rental dates:</span>
                        <span className="font-semibold">{startDate} to {endDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{calculateDays()} days</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Total cost:</span>
                        <span className="font-bold text-lg">${calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleCloseModal}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title}
                    className="w-full rounded-lg"
                  />
                  
                  <div className="flex items-center gap-4 mt-4">
                    <span className="inline-flex items-center bg-black text-white px-3 py-1 rounded text-sm">
                      {selectedItem.category}
                    </span>
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-semibold">{selectedItem.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({selectedItem.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{selectedItem.location}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">About this item</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-gray-700">
                      <User size={18} className="mr-2" />
                      <span>Owner: {selectedItem.owner}</span>
                    </div>
                    {selectedItem.verified && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle size={18} className="mr-2" />
                        <span>Verified owner</span>
                      </div>
                    )}
                    {selectedItem.delivery && (
                      <div className="flex items-center text-blue-600">
                        <Truck size={18} className="mr-2" />
                        <span>Delivery available</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                    <div className="mb-6">
                      <div className="flex items-baseline mb-2">
                        <span className="text-4xl font-bold text-gray-900">
                          ${selectedItem.price}
                        </span>
                        <span className="text-gray-500 ml-2">/day</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select rental dates
                      </label>
                      
                      {!showDatePicker ? (
                        <button 
                          onClick={() => setShowDatePicker(true)}
                          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 hover:border-gray-400 transition-colors"
                        >
                          <Calendar size={20} className="text-gray-600" />
                          <span className="text-gray-700">Pick dates</span>
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                            <input 
                              type="date" 
                              value={startDate}
                              min={getTodayDate()}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">End Date</label>
                            <input 
                              type="date" 
                              value={endDate}
                              min={startDate || getTodayDate()}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                          </div>
                          {startDate && endDate && (
                            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-sm">
                              <div className="flex justify-between mb-1">
                                <span className="text-gray-600">Duration:</span>
                                <span className="font-semibold">{calculateDays()} days</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-bold">${calculateTotal()}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={handleRentRequest}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        startDate && endDate 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!startDate || !endDate}
                    >
                      Request to Rent
                    </button>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}