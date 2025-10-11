import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  X,
  Bed,
  Star,
} from "lucide-react";
import { Room } from "../data/data.js"; // ✅ Import dynamic data

const filters = {
  facilities: ["Free WiFi", "Pool", "Spa", "Gym", "Restaurant", "Parking", "AC"],
  starRating: [5, 4, 3, 2, 1],
};

// Counter component
const Counter = ({ label, count, setCount, min = 0, max = 10 }) => (
  <div className="flex items-center justify-between py-2">
    <span className="font-semibold text-gray-700">{label}</span>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setCount(Math.max(min, count - 1))}
        className="p-2 border rounded-full text-blue-600 hover:bg-blue-50"
      >
        -
      </button>
      <span className="w-6 text-center font-bold">{count}</span>
      <button
        onClick={() => setCount(Math.min(max, count + 1))}
        className="p-2 border rounded-full text-blue-600 hover:bg-blue-50"
      >
        +
      </button>
    </div>
  </div>
);

// Guest Selector Modal
const GuestSelectorModal = ({ guests, setGuests, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-2xl border z-50 p-4">
      <Counter
        label="Adults"
        count={guests.adults}
        setCount={(c) => setGuests((p) => ({ ...p, adults: c }))}
        min={1}
      />
      <Counter
        label="Children"
        count={guests.children}
        setCount={(c) => setGuests((p) => ({ ...p, children: c }))}
      />
      <Counter
        label="Rooms"
        count={guests.rooms}
        setCount={(c) => setGuests((p) => ({ ...p, rooms: c }))}
        min={1}
      />

      <button
        onClick={onClose}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold"
      >
        Done
      </button>
    </div>
  );
};

const RoomBooking = () => {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState(30000);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [minRating, setMinRating] = useState(0);

  const guestDisplay = useMemo(
    () => `${guests.adults} adults · ${guests.children} children · ${guests.rooms} rooms`,
    [guests]
  );

  const filteredRooms = useMemo(() => {
    return Room.filter(
      (r) =>
        r.price <= priceFilter &&
        r.rating >= minRating &&
        (selectedFacilities.length === 0 ||
          selectedFacilities.every((f) => r.facilities.includes(f)))
    );
  }, [priceFilter, minRating, selectedFacilities]);

  const toggleFacility = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 🔍 Search Section */}
      <div className="bg-blue-600 shadow-lg sticky top-0 z-40 flex justify-center">
        <div className="w-full max-w-5xl px-4 py-5">
          <div className="bg-yellow-400 rounded-lg p-3 shadow-lg">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Destination */}
              <div className="flex items-center bg-white rounded-lg p-3 flex-1 gap-2">
                <Bed size={20} className="text-gray-600" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full outline-none text-sm font-semibold"
                />
                {location && (
                  <X
                    size={16}
                    className="text-gray-400 cursor-pointer"
                    onClick={() => setLocation("")}
                  />
                )}
              </div>

              {/* Date */}
              <div className="flex items-center bg-white rounded-lg p-3 flex-1 gap-2">
                <Calendar size={20} className="text-gray-600" />
                <input
                  type="text"
                  placeholder="Select dates"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="w-full outline-none text-sm font-semibold"
                />
              </div>

              {/* Guests */}
              <div className="relative flex items-center bg-white rounded-lg p-3 flex-1 justify-between gap-2 cursor-pointer">
                <Users size={20} className="text-gray-600" />
                <span
                  onClick={() => setIsGuestModalOpen((prev) => !prev)}
                  className="text-sm font-semibold w-full"
                >
                  {guestDisplay}
                </span>
                <ChevronDown size={18} className="text-gray-500" />
                <GuestSelectorModal
                  guests={guests}
                  setGuests={setGuests}
                  isVisible={isGuestModalOpen}
                  onClose={() => setIsGuestModalOpen(false)}
                />
              </div>

              {/* Search Button */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold py-3 px-5 flex items-center justify-center gap-2 transition">
                <Search size={20} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🏨 Room List Layout */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="md:w-1/4 bg-white rounded-xl shadow-md border p-5 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Filters</h2>

          {/* Price Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Max Price: PKR {priceFilter}
            </label>
            <input
              type="range"
              min="10000"
              max="50000"
              step="1000"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full accent-yellow-500"
            />
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            >
              <option value={0}>Any</option>
              {filters.starRating.map((r) => (
                <option key={r} value={r}>
                  {r} stars & up
                </option>
              ))}
            </select>
          </div>

          {/* Facilities */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Facilities
            </label>
            <div className="space-y-1">
              {filters.facilities.map((f) => (
                <label key={f} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={selectedFacilities.includes(f)}
                    onChange={() => toggleFacility(f)}
                    className="mr-2 accent-yellow-500"
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Room List */}
        <main className="flex-1 space-y-5">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-xl border shadow hover:shadow-xl transition-all flex flex-col md:flex-row overflow-hidden"
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full md:w-1/3 h-48 md:h-auto object-cover"
              />
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-semibold text-blue-700">
                    {room.name}
                  </h3>
                  <p className="text-sm text-gray-600">{room.location}</p>
                  <p className="text-xs text-gray-400">{room.distance}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {room.facilities.slice(0, 4).map((f, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-xs px-2 py-1 rounded-full border"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-end">
                  <div className="text-sm text-yellow-600 font-semibold">
                    ⭐ {room.rating}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 line-through">
                      PKR {room.originalPrice.toLocaleString()}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      PKR {room.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredRooms.length === 0 && (
            <p className="text-center text-gray-500 text-sm">
              No rooms match your filters.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default RoomBooking;
