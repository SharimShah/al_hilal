import React from "react";
import { FaMoneyBillWave, FaCcVisa, FaCcMastercard } from "react-icons/fa";

const TakeawayOrder = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-6xl bg-[#F7F7F7] shadow-lg rounded-lg flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-[60%] lg:p-6 md:p-6 p-2 border-r">
          <div className="p-4 bg-[#EAEAEA] rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">
              This is a <span className="text-red-500">TAKEAWAY ORDER</span> 🛍️
            </h2>
            <p className="text-gray-600 mt-2">
              You have to collect your order from:
            </p>
            <div className="mt-4">
              <p className="font-semibold text-gray-800">Korangi</p>
              <p className="text-gray-600 text-sm">
                Shop num 1&2, Main Korangi Rd, Sector 23 Karachi, Karachi City,
                Sindh 74900
              </p>
              <p className="text-gray-800 mt-2 font-semibold">
                021-111-666-111
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              JUST A LAST STEP, PLEASE FILL YOUR INFORMATION BELOW
            </h3>
            <form className="space-y-4">
              {/* Full Name */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <select
                  className="w-full sm:w-auto p-2 border rounded-lg bg-gray-50 text-gray-700 outline-kcred"
                  defaultValue="Mr."
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="flex-1 p-2 border rounded-lg bg-gray-50 text-gray-700 outline-kcred"
                />
                <span className="text-red-500 text-sm self-center">*</span>
              </div>

              {/* Mobile Numbers */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <input
                  type="tel"
                  placeholder="03xx-xxxxxxx"
                  required
                  className="flex-1 p-2 border rounded-lg bg-gray-50 text-gray-700 outline-kcred"
                />
                <span className="text-red-500 text-sm self-center">
                  *Required
                </span>
                <input
                  type="tel"
                  placeholder="03xx-xxxxxxx"
                  className="flex-1 p-2 border rounded-lg bg-gray-50 text-gray-700 outline-kcred"
                />
              </div>

              {/* Email Address */}
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded-lg bg-gray-50 text-gray-700 outline-kcred"
              />

              {/* Pickup Notes */}
              <textarea
                placeholder="Pickup Notes"
                className="w-full p-2 border rounded-lg bg-gray-50 text-gray-700 outline-kcred"
                rows="3"
              ></textarea>

              {/* Payment Information */}
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Payment Information
                </h4>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <label className="flex items-center space-x-2 border p-2 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="text-green-600 outline-kcred"
                    />
                    <FaMoneyBillWave className="text-green-500" />
                    <span className="text-gray-700 font-semibold">
                      Cash on Delivery
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 border p-2 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="payment"
                      className="text-blue-600 outline-kcred"
                    />
                    <div className="flex items-center space-x-2">
                      <FaCcVisa className="text-blue-500" />
                      <FaCcMastercard className="text-yellow-500" />
                    </div>
                    <span className="text-gray-700 font-semibold">
                      Online Payment
                    </span>
                  </label>
                </div>
              </div>

              {/* Change Request */}
              <div className="mt-4">
                <label className="block text-gray-800 font-semibold mb-1">
                  Change Request
                </label>
                <input
                  type="number"
                  placeholder="Rs. 500"
                  className="w-full p-2 border rounded-lg bg-gray-50 text-gray-700 outline-kcred"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[40%] lg:p-6 md:p-6 p-2 bg-gray-50">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Your Order
            </h3>
            <div className="space-y-3">
              <p className="flex justify-between text-gray-700">
                <span>1 x Dhamaka Deal</span>
                <span>Rs. 869</span>
              </p>
              <p className="flex justify-between text-gray-700">
                <span>1 x SIZZLING SALSA WINGS 8 pcs</span>
                <span>Rs. 557</span>
              </p>
              <p className="flex justify-between text-gray-700">
                <span>1 x BUFFALO SPICY WINGS 8 pcs</span>
                <span>Rs. 557</span>
              </p>
            </div>
            <hr className="my-4" />
            <p className="flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>Rs. 1982</span>
            </p>
            <p className="flex justify-between text-gray-700">
              <span>Tax 15%</span>
              <span>Rs. 297</span>
            </p>
            <hr className="my-4" />
            <p className="flex justify-between text-lg font-bold text-gray-800">
              <span>Grand Total</span>
              <span>Rs. 2279</span>
            </p>
            <button className="w-full btn-red text-white py-2 rounded-lg mt-4">
              Place Order
            </button>
            <button className="w-full bg-gray-200 text-blue-500 py-2 rounded-lg mt-2 hover:bg-gray-300">
              ← Continue to add more items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeawayOrder;
