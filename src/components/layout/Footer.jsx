import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaHeart } from "react-icons/fa";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const socialLinks = [
    {
      icon: <FaGithub size={18} />,
      href: "https://github.com/YOUR_USERNAME",
      label: "GitHub",
      color: "hover:bg-gray-800 hover:text-white",
    },
    {
      icon: <FaLinkedin size={18} />,
      href: "https://linkedin.com/in/YOUR_USERNAME",
      label: "LinkedIn",
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      icon: <FaEnvelope size={18} />,
      href: "mailto:your@email.com",
      label: "Email",
      color: "hover:bg-red-500 hover:text-white",
    },
  ];

  const navLinks = ["Dashboard", "Jobs", "Analytics", "Trends", "About"];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative  bg-gradient-to-b from-green-900 to-gray-900 border-r border-green-500/20 z-50 text-white overflow-hidden"
    >
      {/* 🔥 Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-300/50 to-transparent" />

      {/* 🔥 Back to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-white text-green-600 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
      >
        <FaArrowUp size={14} />
      </motion.button>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-8">
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* 🔹 BRAND */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block"
            >
              <h2 className="text-2xl font-bold mb-4 tracking-tight">
                Job Market Intelligence
              </h2>
            </motion.div>
            <p className="text-sm leading-relaxed opacity-85 max-w-xs">
              Track job trends, analyze skills, and discover opportunities
              with real-time insights powered by advanced analytics.
            </p>
            
            {/* Newsletter hint */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 p-4 rounded-2xl  backdrop-blur-sm  "
            >
              <p className="text-xs font-medium mb-2 opacity-90">Stay Updated</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm placeholder-white/50 focus:outline-none focus:border-green-300 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-white text-green-600 text-sm font-semibold hover:bg-green-50 transition-colors"
                >
                  Join
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* 🔹 NAVIGATION */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-5 text-lg tracking-wide">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <motion.a
                    href="#"
                    whileHover={{ x: 6, color: "#bbf7d0" }}
                    className="text-sm opacity-85 hover:opacity-100 transition-all inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-green-300 transition-all duration-300" />
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 🔹 RESOURCES */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-5 text-lg tracking-wide">Resources</h3>
            <ul className="space-y-3">
              {["Documentation", "API Reference", "Blog", "Support", "Privacy Policy"].map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <motion.a
                    href="#"
                    whileHover={{ x: 6, color: "#bbf7d0" }}
                    className="text-sm opacity-85 hover:opacity-100 transition-all inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-green-300 transition-all duration-300" />
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 🔹 SOCIAL */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold mb-5 text-lg tracking-wide">Connect</h3>
            <p className="text-sm opacity-85 mb-5 leading-relaxed">
              Follow us for the latest updates and insights.
            </p>
            
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -4,
                    rotate: 5,
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white text-green-600 shadow-md transition-all duration-300 ${social.color}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Contact card */}
            <motion.div
              variants={itemVariants}
              className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <p className="text-xs opacity-70 mb-1">Email us at</p>
              <a 
                href="mailto:your@email.com" 
                className="text-sm font-medium hover:text-green-200 transition-colors"
              >
                your@email.com
              </a>
            </motion.div>
          </motion.div>

        </div>

        {/* 🔻 BOTTOM BAR */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-white/15"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm opacity-70 flex items-center gap-1">
              © {new Date().getFullYear()} Job Market Intelligence. Made with 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FaHeart size={12} className="text-green-300 mx-1" />
              </motion.span>
              All rights reserved.
            </p>
            
            <div className="flex gap-6 text-xs opacity-60">
              <motion.a 
                href="#" 
                whileHover={{ opacity: 1, y: -1 }} 
                className="hover:text-green-200 transition-colors"
              >
                Terms
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ opacity: 1, y: -1 }} 
                className="hover:text-green-200 transition-colors"
              >
                Privacy
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ opacity: 1, y: -1 }} 
                className="hover:text-green-200 transition-colors"
              >
                Cookies
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 🔥 Background decoration */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-300/10 rounded-full blur-2xl pointer-events-none" />
    </motion.footer>
  );
};

export default Footer;