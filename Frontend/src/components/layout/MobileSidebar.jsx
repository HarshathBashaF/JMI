import { motion } from "framer-motion";

const MobileSidebar = ({ open, setOpen }) => {
  if (!open) return null;

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 z-50 md:hidden"
    >
      <button onClick={() => setOpen(false)}>Close</button>
    </motion.div>
  );
};

export default MobileSidebar;