"use client";
import Select from "react-select";
export default function BranchSelection({
  data,
  isModalVisible,
  setIsModalVisible,
  setIsDataSaved,
  setBranch,
  branch,
}) {
  // Handle selection from dropdown
  const handleSelection = (selectedOption) => {
    if (selectedOption) {
      setBranch({
        id: selectedOption.value,
        name: selectedOption.label,
      });
    } else {
      setBranch(null);
    }
  };

  // Save data and close modal on button click
  const handleSelectClick = () => {
    if (branch) {
      localStorage.setItem("selectedBranch", JSON.stringify(branch));
      setIsDataSaved(true);
      setIsModalVisible(false);
    }
  };

  return (
    <>
      {isModalVisible && (
        <div className="min-h-screen flex items-center justify-center bg-slate-900/20 backdrop-blur fixed top-0 w-full z-50 scrollbar-none py-8 px-4">
          <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md h-full">
            <h2 className="text-xl font-medium text-center mb-6">
              Please Select a Branch Location
            </h2>

            {/* Dropdown Selection */}
            <div className="mb-6">
              <Select
                value={branch ? { value: branch.id, label: branch.name } : null}
                onChange={handleSelection}
                options={data.map((location) => ({
                  value: location?.id,
                  label: location?.name,
                }))}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    lineHeight: "25px",
                    color: "#7e7e7e",
                    fontSize: "14px",
                    paddingLeft: "15px",
                  }),
                }}
                placeholder="Please Select a Branch"
              />
            </div>

            {/* Select Button */}
            <div className="border-t-[1px] border-[#dee2e6] absolute bottom-[73px] left-0 w-full"></div>
            <div className="text-center mt-4">
              <button
                disabled={!branch}
                className={`w-full px-6 py-3 bg-kcred text-white rounded-lg ${
                  !branch ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSelectClick}
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
