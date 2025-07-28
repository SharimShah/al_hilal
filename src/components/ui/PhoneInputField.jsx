import { useCountry } from "@/context/CountryContext";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { PhoneInput, getActiveFormattingMask } from "react-international-phone";
const PhoneInputField = ({ label, name, control, errors, setValue }) => {
  const [dialCode, setDialCode] = useState("");
  const Country = useCountry();
  const data = Country?.country.toLowerCase();
  const defaultCountry = data;

  return (
    <div>
      {defaultCountry ? (
        <>
          <div className="form-group">
            <Controller
              name={name}
              control={control}
              rules={{
                required: "Phone number is required",
                validate: (value) =>
                  /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value) ||
                  "Invalid phone number format",
              }}
              render={({ field }) => (
                <PhoneInput
                  value={field.value}
                  onChange={(phone, { country }) => {
                    // Update form state manually
                    field.onChange(phone);

                    // Set additional form values
                    setValue("dial_code", country?.dialCode);
                    setValue(name, phone); // Optional: may be redundant since field.onChange already does this

                    console.log(name, "phone");
                    console.log(country, "country");

                    const mask = getActiveFormattingMask({ phone, country });
                    // Use formatting mask for your purposes
                  }}
                  defaultCountry={defaultCountry}
                  forceDialCode
                  required
                  loading="lazy"
                  placeholder="Phone Number"
                  className="w-full bg-white border text-slate-900 text-md tracking-wider rounded-md focus:outline-kcred"
                />
              )}
            />
            {/* {errors[name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[name].message}
              </p>
            )} */}
          </div>
        </>
      ) : (
        <div>
          <input
            type="tel"
            placeholder={label}
            className="w-full px-4 py-2 bg-white border text-slate-900 text-md tracking-wider rounded-md focus:outline-kcred"
          />
        </div>
      )}
    </div>
  );
};

export default PhoneInputField;
