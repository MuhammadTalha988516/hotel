import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  X,
  Heart,
  Info,
} from "lucide-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Room } from "../data/data.js"; // ← your hotel array

/* ---------- SIDEBAR FILTER CONFIG ---------- */
const filters = {
  facilities: ["Free WiFi", "Pool", "Spa", "Gym", "Restaurant", "Parking", "AC"],
  starRating: [5, 4, 3, 2, 1],
  guestRating: [9, 8, 7],
  mealPlan: ["Breakfast included", "Half-board", "Full-board", "All-inclusive"],
  propertyType: ["Hotel", "Apartment", "Villa", "Guesthouse"],
  noOfBedrooms: [1, 2, 3, 4],
  paymentType: ["Free cancellation", "Pay at property"],
};

/* ---------- SMALL HELPERS ---------- */
const Counter = ({ label, count, setCount, min = 0, max = 10 }) => (
  <div className="flex items-center justify-between py-2">
    <span className="font-semibold text-gray-700">{label}</span>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setCount((c) => Math.max(min, c - 1))}
        className="p-2 border rounded-full text-blue-600 hover:bg-blue-50"
      >-</button>
      <span className="w-6 text-center font-bold">{count}</span>
      <button
        onClick={() => setCount((c) => Math.min(max, c + 1))}
        className="p-2 border rounded-full text-blue-600 hover:bg-blue-50"
      >+</button>
    </div>
  </div>
);

const GuestSelectorModal = ({ guests, setGuests, isVisible, onClose }) => {
  if (!isVisible) return null;
  return (
    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-2xl border z-50 p-4">
      <Counter label="Adults" count={guests.adults} setCount={(c) => setGuests((p) => ({ ...p, adults: c }))} min={1} />
      <Counter label="Children" count={guests.children} setCount={(c) => setGuests((p) => ({ ...p, children: c }))} />
      <Counter label="Rooms" count={guests.rooms} setCount={(c) => setGuests((p) => ({ ...p, rooms: c }))} min={1} />
      <button onClick={onClose} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold">Done</button>
    </div>
  );
};

/* ---------- MAIN COMPONENT ---------- */
const RoomBooking = () => {
  /* ----- top-bar states ----- */
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [dates, setDates] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);

  /* ----- sidebar filter states ----- */
  const ABS_MIN = 10000, ABS_MAX = 100000;
  const [minPrice, setMinPrice] = useState(ABS_MIN);
  const [maxPrice, setMaxPrice] = useState(ABS_MAX);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [minStarRating, setMinStarRating] = useState(0);
  const [minGuestRating, setMinGuestRating] = useState(0);
  const [isDiscountActive, setIsDiscountActive] = useState(false);
  const [selectedMealPlans, setSelectedMealPlans] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedBedroomCount, setSelectedBedroomCount] = useState([]);
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState([]);

  /* ----- NEW: top-bar filter only applies after SEARCH press ----- */
  const [searchedLocation, setSearchedLocation] = useState("");

  /* ----- helpers ----- */
  const toggleFilter = (filterState, setFilterState) => (item) =>
    setFilterState((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  const toggleMealPlan = toggleFilter(selectedMealPlans, setSelectedMealPlans);
  const togglePropertyType = toggleFilter(selectedPropertyTypes, setSelectedPropertyTypes);
  const toggleBedroomCount = toggleFilter(selectedBedroomCount, setSelectedBedroomCount);
  const togglePaymentType = toggleFilter(selectedPaymentTypes, setSelectedPaymentTypes);
  const toggleFacility = toggleFilter(selectedFacilities, setSelectedFacilities);

  const guestDisplay = useMemo(
    () => `${guests.adults} adults · ${guests.children} children · ${guests.rooms} rooms`,
    [guests]
  );

  /* ---------- CITY AUTOCOMPLETE (unchanged) ---------- */
  useEffect(() => {
    const fetchCities = async () => {
      if (location.length < 1) { setSuggestions([]); return; }
      try {
        const res = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${location}`,
          { headers: { "X-RapidAPI-Key": "4d02301fc3msh28d3d2214ebc3d4p132c96jsn8a5676e1df54", "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com" } }
        );
        const data = await res.json();
        setSuggestions(data.data.map((c) => `${c.city}, ${c.country}`));
      } catch (e) { console.error(e); }
    };
    const t = setTimeout(fetchCities, 400);
    return () => clearTimeout(t);
  }, [location]);

  const trendingDestinations = [
    { city: "Lahore", country: "Pakistan" },
    { city: "Islamabad", country: "Pakistan" },
    { city: "Karachi", country: "Pakistan" },
    { city: "Dubai", country: "United Arab Emirates" },
    { city: "Istanbul", country: "Turkey" },
  ];

  /* ---------- FILTERED ROOMS ---------- */
 /* ---------- FILTERED ROOMS ---------- */
const filteredRooms = useMemo(() => {
  return Room.filter((r) => {
    /* 1. SIDEBAR FILTERS – live, no button press */
    const budgetPasses = r.price >= minPrice && r.price <= maxPrice;
    const starRatingPasses = r.rating >= minStarRating;
    const guestRatingPasses = r.guestRating ? r.guestRating >= minGuestRating : true;
    const facilitiesPasses =
      selectedFacilities.length === 0 ||
      selectedFacilities.every((f) => r.facilities && r.facilities.includes(f));
    const discountPasses = isDiscountActive ? r.hasDiscount === true : true;
    const mealPlanPasses =
      selectedMealPlans.length === 0 || selectedMealPlans.includes(r.mealPlan);
    const propertyTypePasses =
      selectedPropertyTypes.length === 0 || selectedPropertyTypes.includes(r.propertyType);
    const bedroomCountPasses =
      selectedBedroomCount.length === 0 || selectedBedroomCount.includes(r.bedrooms);
    const paymentTypePasses =
      selectedPaymentTypes.length === 0 ||
      selectedPaymentTypes.every((type) => r.paymentOptions && r.paymentOptions.includes(type));

    /* 2. TOP-BAR FILTERS – only after Search button is pressed */
    if (searchedLocation) {
      const search = searchedLocation.toLowerCase();
      const loc = r.location.toLowerCase();
      if (!loc.includes(search)) return false;
    }

    /* (Optional) you can add adults/children/rooms/dates checks here later
       – also guarded by `if (searchedLocation)` so they only run after Search. */

    return (
      budgetPasses &&
      starRatingPasses &&
      guestRatingPasses &&
      facilitiesPasses &&
      discountPasses &&
      mealPlanPasses &&
      propertyTypePasses &&
      bedroomCountPasses &&
      paymentTypePasses
    );
  });
}, [
  /* Sidebar – live */
  minPrice,
  maxPrice,
  minStarRating,
  selectedFacilities,
  minGuestRating,
  isDiscountActive,
  selectedMealPlans,
  selectedPropertyTypes,
  selectedBedroomCount,
  selectedPaymentTypes,
  /* Top-bar – waits for button */
  searchedLocation,
]);
  /* ---------- RENDER ---------- */
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ----------  SEARCH BAR  ---------- */}
      <div className="shadow-lg top-0 z-40 flex justify-center">
        <div className="w-full max-w-5xl px-4 py-5">
          <div className="bg-yellow-400 rounded-lg p-3 shadow-lg">
            <div className="flex flex-col md:flex-row gap-2 relative">
              {/* Location */}
              <div className="flex flex-col bg-white rounded-lg p-3 flex-1 relative">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-gray-600" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setIsLocationFocused(true)}
                    onBlur={() => setTimeout(() => setIsLocationFocused(false), 150)}
                    className="w-full outline-none text-sm font-semibold"
                  />
                  {location && (
                    <X size={16} className="text-gray-400 cursor-pointer" onClick={() => setLocation("")} />
                  )}
                </div>
                {isLocationFocused && (suggestions.length > 0 || location === "") && (
                  <ul className="absolute top-full mt-2 left-0 right-0 bg-white border rounded-xl shadow-xl max-h-64 overflow-y-auto z-50">
                    <li className="px-4 py-2 text-gray-800 font-semibold text-sm border-b">
                      {location ? "Search results" : "Trending destinations"}
                    </li>
                    {location === "" &&
                      trendingDestinations.map((t, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            setLocation(`${t.city}, ${t.country}`);
                            setSuggestions([]);
                          }}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex flex-col"
                        >
                          <span className="flex items-center text-sm font-semibold text-gray-800">
                            <MapPin size={14} className="mr-2 text-blue-600" /> {t.city}
                          </span>
                          <span className="text-xs text-gray-500 ml-5">{t.country}</span>
                        </li>
                      ))}
                    {location !== "" &&
                      suggestions.map((s, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            setLocation(s);
                            setSuggestions([]);
                          }}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex flex-col"
                        >
                          <span className="flex items-center text-sm font-semibold text-gray-800">
                            <MapPin size={14} className="mr-2 text-blue-600" /> {s.split(",")[0]}
                          </span>
                          <span className="text-xs text-gray-500 ml-5">{s.split(",")[1]}</span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              {/* Dates */}
              <div className="flex items-center bg-white rounded-lg p-3 flex-1 gap-2 relative">
                <Calendar size={20} className="text-gray-600" />
                <span onClick={() => setShowCalendar(!showCalendar)} className="text-sm font-semibold cursor-pointer w-full">
                  {`${dates[0].startDate.toDateString()} – ${dates[0].endDate.toDateString()}`}
                </span>
                {showCalendar && (
                  <div className="absolute top-full mt-2 left-0 z-50 bg-white rounded-lg shadow-lg border p-2">
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                    />
                    <button onClick={() => setShowCalendar(false)} className="w-full mt-2 bg-blue-600 text-white py-1 rounded-md font-semibold">
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Guests */}
              <div className="relative flex items-center bg-white rounded-lg p-3 flex-1 justify-between gap-2 cursor-pointer">
                <Users size={20} className="text-gray-600" />
                <span onClick={() => setIsGuestModalOpen((prev) => !prev)} className="text-sm font-semibold w-full">
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

              {/* Search Button – triggers TOP-BAR filter only */}
              <button
                onClick={() => setSearchedLocation(location.trim())}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold py-3 px-5 flex items-center justify-center gap-2 transition"
              >
                <Search size={20} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ----------  MAIN CONTENT  ---------- */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters – live, no button press */}
        <aside className="md:w-1/4 bg-white rounded-xl shadow-md border p-5 h-fit space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Filters</h2>

          {/* Price */}
          <div className="border-b pb-4">
            <label className="block text-sm font-bold mb-2">Price: PKR {minPrice.toLocaleString()} – PKR {maxPrice.toLocaleString()}</label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Min</span>
              <input type="range" min={ABS_MIN} max={ABS_MAX} step={1000} value={minPrice}
                onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 1000))}
                className="w-full accent-yellow-500" />
              <span className="text-xs text-gray-500">Max</span>
              <input type="range" min={ABS_MIN} max={ABS_MAX} step={1000} value={maxPrice}
                onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 1000))}
                className="w-full accent-yellow-500" />
            </div>
          </div>

          {/* Star Rating */}
          <div className="border-b pb-4">
            <label className="block text-sm font-bold mb-2">Minimum Star Rating</label>
            <select value={minStarRating} onChange={(e) => setMinStarRating(Number(e.target.value))} className="w-full border rounded-lg p-2">
              <option value={0}>Any</option>
              {filters.starRating.map((r) => (
                <option key={r} value={r}>{r} stars & up</option>
              ))}
            </select>
          </div>

          {/* Guest Rating */}
          <div className="border-b pb-4">
            <label className="block text-sm font-bold mb-2">Minimum Guest Rating</label>
            <select value={minGuestRating} onChange={(e) => setMinGuestRating(Number(e.target.value))} className="w-full border rounded-lg p-2">
              <option value={0}>Any</option>
              {filters.guestRating.map((r) => (
                <option key={r} value={r}>{r}.0+ ({r === 9 ? "Excellent" : r === 8 ? "Very Good" : "Good"})</option>
              ))}
            </select>
          </div>

          {/* Facilities */}
          <div className="border-b pb-4">
            <label className="block text-sm font-bold mb-2">Amenities</label>
            <div className="space-y-1">
              {filters.facilities.map((f) => (
                <label key={f} className="flex items-center text-sm">
                  <input type="checkbox" checked={selectedFacilities.includes(f)} onChange={() => toggleFacility(f)} className="mr-2 accent-yellow-500" />
                  {f}
                </label>
              ))}
            </div>
          </div>

          {/* Discount */}
          <div className="border-b pb-4">
            <label className="block text-sm font-bold mb-2">Deals & Offers</label>
            <label className="flex items-center text-sm font-semibold text-green-700">
              <input type="checkbox" checked={isDiscountActive} onChange={() => setIsDiscountActive(!isDiscountActive)} className="mr-2 accent-green-600" />
              Show Discounted Rooms Only
            </label>
          </div>

          {/* Meal Plan */}
          <div className="border-b pb-4">
            <label className="block text-sm font-bold mb-2">Meal Plan</label>
            <div className="space-y-1">
              {filters.mealPlan.map((m) => (
                <label key={m} className="flex items-center text-sm">
                  <input type="checkbox" checked={selectedMealPlans.includes(m)} onChange={() => toggleMealPlan(m)} className="mr-2 accent-yellow-500" />
                  {m}
                </label>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div className="border-b pb-4">
            <label className="block text-sm font-bold mb-2">Property Type</label>
            <div className="space-y-1">
              {filters.propertyType.map((t) => (
                <label key={t} className="flex items-center text-sm">
                  <input type="checkbox" checked={selectedPropertyTypes.includes(t)} onChange={() => togglePropertyType(t)} className="mr-2 accent-yellow-500" />
                  {t}
                </label>
              ))}
            </div>
          </div>

          {/* Bedrooms */}
          <div className="border-b pb-4">
            <label className="block text-sm font-bold mb-2">No. of Bedrooms</label>
            <div className="space-y-1">
              {filters.noOfBedrooms.map((b) => (
                <label key={b} className="flex items-center text-sm">
                  <input type="checkbox" checked={selectedBedroomCount.includes(b)} onChange={() => toggleBedroomCount(b)} className="mr-2 accent-yellow-500" />
                  {b} {b === 1 ? "Bedroom" : "Bedrooms"}
                </label>
              ))}
            </div>
          </div>

          {/* Payment Options */}
          <div>
            <label className="block text-sm font-bold mb-2">Payment Options</label>
            <div className="space-y-1">
              {filters.paymentType.map((p) => (
                <label key={p} className={`flex items-center text-sm ${p === "Free cancellation" ? "text-green-700 font-semibold" : ""}`}>
                  <input type="checkbox" checked={selectedPaymentTypes.includes(p)} onChange={() => togglePaymentType(p)} className={`mr-2 ${p === "Free cancellation" ? "accent-green-600" : "accent-yellow-500"}`} />
                  {p}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ----------  CARDS  ---------- */}
        <main className="flex-1 space-y-5">
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-xl border shadow hover:shadow-xl transition-all flex relative overflow-hidden">
              {/* Image & Heart Icon */}
              <div className="w-1/3 min-w-[200px] relative">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
                  <Heart size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="p-5 flex flex-col w-2/3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 hover:underline cursor-pointer">{room.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <MapPin size={14} className="mr-1" />
                      {room.location.split(",")[0]}, {room.location.split(",")[1]} ·
                      <span className="text-blue-600 hover:underline ml-1 cursor-pointer">Show on map</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-700 font-semibold">Very good</div>
                    <div className="flex items-center justify-center bg-blue-700 text-white w-10 h-10 rounded-t-lg font-bold text-lg mt-1">
                      {room.rating.toFixed(1)}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">{Math.floor(Math.random() * 500) + 10} reviews</div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  This adults-only apartment offers a convenient location, full-day security, and essential amenities for comfort.
                </p>

                <span className="inline-block bg-green-700 text-white text-xs font-semibold px-2 py-1 rounded mb-4">
                  Limited-time Deal
                </span>

                <div className="flex justify-between flex-grow">
                  <div className="text-sm space-y-1 mr-4">
                    <p className="font-semibold">{room.roomType || "Three-Bedroom Apartment"}</p>
                    <p className="text-gray-600 text-xs">Entire apartment • {room.beds || 3} beds • {Math.floor(room.area / 10)} m²</p>
                    <p className="text-gray-600 text-xs">{room.bedDetails || "3 double beds"}</p>
                    <p className="flex items-center text-green-700 font-semibold text-sm mt-2">
                      <svg className="w-4 h-4 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-2-5l7-7-1.4-1.4L8 12.2l-3.6-3.6L3 10l5 5z" /></svg>
                      Free cancellation
                    </p>
                    <p className="text-red-600 font-semibold text-xs">Only 1 left at this price on our site</p>
                  </div>

                  <div className="flex flex-col items-end justify-end space-y-1">
                    <div className="text-xs text-gray-500">1 night, {guests.adults} adults</div>
                    <div className="flex items-center space-x-2 pl-20">
                      <p className="text-sm text-red-500 line-through">PKR {room.originalPrice.toLocaleString()}</p>
                      <p className="text-3xl font-bold text-gray-900">PKR {room.price.toLocaleString()}</p>
                      <Info size={16} className="text-gray-400 cursor-pointer" title="Includes taxes and charges" />
                    </div>
                    <p className="text-xs text-gray-500">
                      + PKR {(room.price * 0.17).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} taxes and charges
                    </p>

                    <button
                      onClick={() => alert(`Checking availability for ${room.name}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-200 mt-2 flex items-center justify-center text-sm"
                    >
                      See availability
                      <svg className="w-4 h-4 ml-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredRooms.length === 0 && (
            <p className="text-center text-gray-500 text-sm">No rooms match your filters.</p>
          )}
        </main>
      </div>
    </div>
  );
};


export default RoomBooking;