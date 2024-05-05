/* eslint-disable react/display-name */
import { motion } from "framer-motion";
const transition = (Component) => {
  return () => (
    <>
      <Component />
      <motion.div
        className="fixed z-[10000] top-0 left-0 w-full h-screen origin-bottom bg-gray-800"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="fixed z-[10000] top-0 left-0 w-full h-screen origin-top bg-gray-800"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default transition;
