import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const Home = ({ navigateToDashboard }) => {
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // 🔥 CURSOR FOLLOW EFFECT
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  // Smoother trailing cursor
  const trailX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const trailY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  // Scale cursor based on hover state
  const cursorScale = useSpring(isHovering ? 2.5 : 1, {
    stiffness: 300,
    damping: 20,
  });

  // Rotate cursor based on velocity
  const rotateX = useTransform(smoothY, (latest) => (latest - window.innerHeight / 2) / 50);
  const rotateY = useTransform(smoothX, (latest) => (latest - window.innerWidth / 2) / 50);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const move = (e) => {
      const currentTime = Date.now();
      const dt = currentTime - lastTime;
      
      if (dt > 0) {
        const vx = (e.clientX - lastX) / dt * 10;
        const vy = (e.clientY - lastY) / dt * 10;
        setMouseVelocity({ x: vx, y: vy });
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = currentTime;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  // 🔥 PARTICLE DATA
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  // 🔥 FEATURES DATA
  const features = [
    {
      title: "Real-time Job Insights",
      desc: "Track live job postings and market movements as they happen.",
      icon: "📊",
    },
    {
      title: "Top Skills Analysis",
      desc: "Identify which skills are trending and worth investing in.",
      icon: "🎯",
    },
    {
      title: "Location Trends",
      desc: "Discover where demand is highest across regions.",
      icon: "🌍",
    },
    {
      title: "Salary Benchmarks",
      desc: "Compare compensation across roles and locations.",
      icon: "💰",
    },
    {
      title: "Career Pathways",
      desc: "Map your journey from current role to dream job.",
      icon: "🚀",
    },
    {
      title: "Skill Gaps",
      desc: "Find out exactly what you're missing for your next role.",
      icon: "🔍",
    },
  ];

  // 🔥 STATS DATA
  const stats = [
    { value: "50K+", label: "Jobs Analyzed" },
    { value: "120+", label: "Skills Tracked" },
    { value: "30+", label: "Industries" },
    { value: "99%", label: "Accuracy" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div 
      className="relative min-h-screen overflow-hidden  bg-gradient-to-b from-green-900 to-gray-900 border-r border-green-500/20 z-50 text-white flex flex-col items-center justify-center px-6 text-center"
      onMouseEnter={() => setIsHovering(false)}
    >

      {/* 🔥 CUSTOM CURSOR */}
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scale: cursorScale,
        }}
      >
        <div className="w-4 h-4 bg-white rounded-full" />
      </motion.div>

      {/* 🔥 CURSOR TRAIL */}
      <motion.div
        className="pointer-events-none fixed z-40 w-8 h-8 border-2 border-white/30 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* 🔥 CURSOR GLOW */}
      <motion.div
        className="pointer-events-none fixed w-64 h-64 bg-green-300/20 rounded-full blur-3xl z-10"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          rotateX,
          rotateY,
        }}
      />

      {/* 🔥 FLOATING PARTICLES */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white/20 rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🔥 FLOATING BLOBS */}
      <motion.div
        animate={{ 
          y: [0, -40, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-56 h-56 bg-green-400/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{ 
          y: [0, 40, 0],
          x: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-64 h-64 bg-green-300/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-200/10 rounded-full blur-2xl"
      />

      {/* 🔥 HERO SECTION */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-4xl"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/20"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            ✨ Career Intelligence Platform
          </motion.span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
        >
          Discover In-Demand Skills{" "}
          <motion.span
            className="inline-block text-green-200"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(134, 239, 172, 0)",
                "0 0 40px rgba(134, 239, 172, 0.5)",
                "0 0 20px rgba(134, 239, 172, 0)",
              ]
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            & Grow
          </motion.span>{" "}
          <br />
          <motion.span className="text-green-300" >Your Career</motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed"
        >
          This platform helps you choose the right skills based on real-time job
          market data. Track trends, analyze demand, and make smarter career decisions.
        </motion.p>

        {/* 🔥 BUTTONS */}
        <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 20px 40px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateToDashboard}
            className="group relative px-8 py-4 rounded-2xl bg-white text-green-600 font-bold text-lg transition-all overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.span
              className="absolute inset-0 bg-green-100"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative flex items-center gap-2">
              Go to Dashboard 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.08,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg backdrop-blur-sm transition-all"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 🔥 STATS SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full relative z-20"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ 
              scale: 1.1, 
              y: -5,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer"
          >
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-green-200"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, type: "spring" }}
            >
              {stat.value}
            </motion.h3>
            <p className="mt-1 text-sm opacity-80">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 🔥 FEATURES GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full relative z-20 px-4"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              y: -10,
              rotate: 1,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 cursor-pointer overflow-hidden transition-colors hover:bg-green-400/20 hover:border-green-300/30"
          >
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-300/0 to-green-400/0 group-hover:from-green-300/10 group-hover:to-green-400/10 rounded-3xl transition-all duration-500"
            />
            
            <motion.div 
              className="text-4xl mb-4 relative z-10"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              {feature.icon}
            </motion.div>
            
            <h3 className="font-bold text-xl mb-2 relative z-10 group-hover:text-green-100 transition-colors">
              {feature.title}
            </h3>
            
            <p className="text-sm opacity-80 leading-relaxed relative z-10 group-hover:opacity-100 transition-opacity">
              {feature.desc}
            </p>

            <motion.div
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            >
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                →
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* 🔥 SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-xs opacity-60 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* 🔥 FOOTER TEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
        className="mt-16 mb-8 text-xs relative z-20"
      >
        Powered by real-time market data • Updated daily
      </motion.p>
    </div>
  );
};

export default Home;