"use client";
import { branches } from "@/data/SelectBraArea";
import { useState, useEffect } from "react";
import Select from "react-select";
export default function BranchSelection({
  isModalVisible,
  setIsModalVisible,
  setIsDataSaved,
  isDataSaved,
  setArea,
  area,
  setBranch,
  branch,
}) {
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [Bracnhes, setBracnhes] = useState(null); // Initially null to force selection
  // Save selected data to localStorage whenever there's a change
  useEffect(() => {
    if (branch && area && deliveryType && !isDataSaved) {
      localStorage.setItem("selectedBranch", branch);
      localStorage.setItem("selectedArea", area);
      localStorage.setItem("deliveryType", deliveryType);
      setIsDataSaved(true); // Set flag to indicate that data is saved
    }
  }, [branch, area, deliveryType, isDataSaved]);

  // Handle selection of branch
  const handleBranchSelect = (branchName) => {
    setBranch(branchName);
    setArea(null); // Reset area when branch changes
  };

  // Handle selection of area (pickup areas or delivery areas)
  const handleAreaSelect = (selectedOption) => {
    setArea(selectedOption?.value);
    setBracnhes(selectedOption?.value); // Optionally set pickup branch as area
  };

  // Find the selected branch from the branches array
  const selectedBranch = branches.find((b) => b.name === branch);
  // Handle "Select" button click (to hide the modal)
  const handleSelectClick = () => {
    setIsModalVisible(false); // Hide the modal after selection
  };

  return (
    <>
      {isModalVisible && (
        <div className="min-h-screen flex items-center justify-center bg-slate-900/20 backdrop-blur fixed top-0 w-full z-50 scrollbar-none py-8 px-4">
          <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md h-full">
            <h2 className="text-[18px] font-npm i @next/font/google text-center mb-6">
              {deliveryType === "pickup"
                ? "Please Select Branch"
                : "Please Select Your Area"}
            </h2>

            {/* Delivery Type Toggle */}
            <div className="flex justify-center mb-4">
              <div className="w-[180px] p-1 bg-gray-300 rounded-full">
                <div className="relative w-[170px] p-1 bg-gray-300 rounded-full">
                  <div
                    className={`absolute top-0 left-0 h-full w-1/2 bg-kcred rounded-full transition-transform duration-300 ease-in-out ${
                      deliveryType === "pickup"
                        ? "translate-x-full"
                        : "translate-x-0"
                    }`}
                  ></div>
                  <div className="relative flex">
                    <button
                      onClick={() => setDeliveryType("delivery")}
                      className={`w-[50%] py-1 rounded-full font-semibold text-[12px] text-center transition-colors duration-300 ${
                        deliveryType === "delivery"
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      DELIVERY
                    </button>
                    <button
                      onClick={() => setDeliveryType("pickup")}
                      className={`w-[50%] py-1 rounded-full font-semibold text-[12px] text-center transition-colors duration-300 ${
                        deliveryType === "pickup"
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      PICKUP
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Branch Selection */}
            {/* <div className="flex flex-wrap justify-center gap-6 mb-6">
              {branches.map((branchData) => (
                <div
                  key={branchData.name}
                  onClick={() => handleBranchSelect(branchData.name)}
                  className={`cursor-pointer text-center w-[80px] ${
                    branch === branchData.name
                      ? "text-red-500"
                      : "text-gray-700"
                  }`}
                >
                  <div
                    className={`border p-3 rounded-lg w-full ${
                      branch === branchData.name ? "border-red-600" : ""
                    }`}
                  >
                    <img
                      src={branchData.icon}
                      alt={branchData.name}
                      className="w-12 h-12 mx-auto mb-2"
                    />
                  </div>
                  <p className="text-[15px] font-light">{branchData.name}</p>
                </div>
              ))}
            </div> */}

            {/* Area Selection (Pickup or Delivery) */}
            {deliveryType === "pickup" ? (
              <>
                {branch && selectedBranch && (
                  <div className="mb-6">
                    <Select
                      value={
                        Bracnhes ? { value: Bracnhes, label: Bracnhes } : null
                      }
                      onChange={handleAreaSelect}
                      options={selectedBranch.Bracnhes.map((areaOption) => ({
                        value: areaOption,
                        label: areaOption,
                      }))}
                      menuPlacement="top"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          lineHeight: "25px",
                          color: "#7e7e7e",
                          fontSize: "14px",
                          paddingLeft: "15px",
                        }),
                      }}
                      placeholder="Please Select Your Area"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                {branch && selectedBranch && (
                  <div className="mb-6">
                    <Select
                      value={area ? { value: area, label: area } : null}
                      onChange={handleAreaSelect}
                      options={selectedBranch.areas.map((areaOption) => ({
                        value: areaOption,
                        label: areaOption,
                      }))}
                      menuPlacement="top"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          lineHeight: "25px",
                          color: "#7e7e7e",
                          fontSize: "14px",
                          paddingLeft: "15px",
                        }),
                      }}
                      placeholder="Please Select Your Area"
                    />
                  </div>
                )}
              </>
            )}

            {/* Select Button */}
            <div className="border-t-[1px] border-[#dee2e6] absolute bottom-[73px] left-0 w-full"></div>
            <div className="text-center mt-4">
              <button
                disabled={!branch || !area}
                className={`w-full px-6 py-3 bg-kcred text-white rounded-lg ${
                  !branch || !area ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  setIsDataSaved(true); // Mark the data as saved when clicked
                  handleSelectClick(); // Hide the modal after selection
                }}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
