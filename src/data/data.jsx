import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
export const fullUrl = "https://order.kcg.ae";
export const Api_Url = "https://api.kcg.ae/public";
// export const Api_Url = "http://192.168.0.100:8000";
export const data = {
  location: {
    heading: "Location",
    malls: [
      { name: "Dubai Mall", image: "/images/locations/1.jpg" },
      { name: "Mall of the Emirates", image: "/images/locations/2.jpg" },
      { name: "City Centre Deira", image: "/images/locations/3.jpg" },
    ],
  },
  menu: [
    {
      link: "",
      name: "Menu",
    },
    {
      link: "",
      name: "About US",
    },
    {
      link: "",
      name: "Events",
    },
    {
      link: "",
      name: "Contacts",
    },
  ],
  reviews: [
    {
      name: "Marion Qua",
      stars: 4,
      timeAgo: "6 weeks ago",
      review:
        "Food is hearty and tasty, perhaps a trifle too salty but otherwise very enjoyable. Good portions for the price. Staff is cheerful and friendly. Will definitely come here again. Am very glad we decided to try eating here!",
    },
    {
      name: "Rangi Gunathilaka",
      stars: 3,
      timeAgo: "19 weeks ago",
      review:
        "The food at Kelly’s Cajun Grill was okay, but nothing exceptional. Service was average, and while the portions were decent, the flavors didn’t stand out. Overall, it was a 3/5 experience.",
    },
    {
      name: "Kevin Grigsby",
      stars: 5,
      timeAgo: "4 weeks ago",
      review: "Amazing fresh food, fantastic speedy and friendly service.",
    },
    {
      name: "Vawana Acharya",
      stars: 5,
      timeAgo: "2 weeks ago",
      review: "Good taste food.... And staff friendly.. keep it up guys",
    },
  ],

  social: [
    {
      link: "https://www.facebook.com/kcg.ae",
      icon: <FaFacebookF size={20} />,
    },
    {
      link: "https://www.youtube.com/@KellysCajunGrill",
      icon: <FaYoutube size={20} />,
    },
    {
      link: "https://www.instagram.com/kellyscajungrill",
      icon: <FaInstagram size={20} />,
    },
  ],
  footer: {
    p: "Savor the artistry where every dish is a culinary masterpiece",
  },
};
