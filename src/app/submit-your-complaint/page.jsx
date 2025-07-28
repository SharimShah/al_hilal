"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa";

export default function Home() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Complaint Submitted!");
    reset();
  };

  return (
    <>
      <Image
        width={1920}
        height={300}
        src="/images/complaint.jpg"
        alt="complaint"
        className="w-full h-56 bg-cover"
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        {/* Logo */}
        <Image
          width={300}
          height={300}
          src="/images/kcglogo.png"
          alt="Logo"
          className="max-w-45 h-auto mb-6 bg-contain"
        />

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Submit Your Complaint
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                {...register("name")}
                className="w-full p-2 outline-none"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                {...register("email")}
                className="w-full p-2 outline-none"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaPhone className="text-gray-400 mr-2" />
              <input
                type="tel"
                {...register("phone")}
                className="w-full p-2 outline-none"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <div className="flex items-start border border-gray-300 rounded-md px-3 py-2">
              <FaCommentDots className="text-gray-400 mt-1 mr-2" />
              <textarea
                {...register("message")}
                className="w-full p-2 outline-none resize-none"
                rows="4"
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-kcred text-white py-2 rounded-md hover:bg-kcredlight transition"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </>
  );
}
