import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineRollback } from "react-icons/ai";
import { BiHomeSmile, BiUser } from "react-icons/bi";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";
import Image from "next/image";
const LinkSidebar = ({ toggleSidebar, open }) => {
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              onClick={toggleSidebar}
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm z-[120]"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 right-0 w-full h-screen max-w-xs border-r-2 border-kcred z-[130] bg-white"
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between p-5 border-b-2 border-kcred">
                <span>
                  <a href="/">
                    <Image
                      width={300}
                      height={150}
                      src="/images/kcglogo.png"
                      alt="logo"
                      className="w-full px-5 object-contain"
                    />
                  </a>
                </span>
                <button
                  onClick={toggleSidebar}
                  className="p-3 border-2 border-kcred rounded-xl"
                  aria-label="close sidebar"
                >
                  <AiOutlineRollback />
                </button>
              </div>
              <ul>
                {items.map((item, idx) => {
                  const { title, href, Icon } = item;
                  return (
                    <li key={title}>
                      <a
                        onClick={toggleSidebar}
                        href={href}
                        className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover:bg-kcred hover:text-white border-kcred"
                      >
                        <motion.span {...framerText(idx)}>{title}</motion.span>
                        <motion.div {...framerIcon}>
                          <Icon className="text-2xl" />
                        </motion.div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const items = [
  { title: "Submit Your Complaint", Icon: BiHomeSmile, href: "#" },
  { title: "Our Locations", Icon: BiUser },
  { title: "Blog", Icon: HiOutlineChatBubbleBottomCenterText, href: "#" },
  { title: "Bank Discounts", Icon: FiSettings, href: "#" },
];

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { duration: 0.3 },
};

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  },
};
export default LinkSidebar;
