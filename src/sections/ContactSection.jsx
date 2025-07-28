import Link from "next/link";

const ContactSection = () => {
  return (
    <div className="bg-[#FFE605] text-center text-kcred py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between divide-y md:divide-y-0 md:divide-x divide-black">
        {/* Contact Us */}
        <div className="md:w-1/3 pb-8 md:pb-0 md:pr-6 flex justify-center items-center">
          <div>
            <h3 className="font-bold text-lg mb-2">Contact Us</h3>
            <Link
              href="https://wa.me/971503746140?text=Hi%21%20I%20want%20to%20place%20an%20order%20from%20your%20website%20.%20Can%20you%20help%20me%3F"
              className="text-black"
            >
              +971 503746140
            </Link>
            <p className="text-black">marketing@irmg.ae</p>
          </div>
        </div>

        {/* Location */}
        <div className="md:w-1/3 py-8 md:py-0 md:px-6 flex justify-center items-center">
          <div>
            <h3 className="font-bold text-lg mb-2">Location</h3>
            <p className="text-black">
              Dubai Mall | City Centre Deira | Mall of the Emirates
            </p>
            {/* <p className="text-black">The Palm Jumeirah, Dubai, UAE</p> */}
          </div>
        </div>

        {/* Opening Hours */}
        <div className="md:w-1/3 pt-8 md:pt-0 md:pl-6 flex justify-center items-center">
          <div>
            <h3 className="font-bold text-lg mb-2">opening hours</h3>
            <p className="text-black">Monday - Sunday</p>
            <p className="text-black">From 10:00AM- 11:00PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
