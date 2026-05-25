import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Overlay (optional pro UX) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* Main */}
      <div className="flex-1">
        <Navbar setOpen={setOpen} />

        <main className="p-4 md:p-6">
          {children}
        </main>
         <Footer/>
      </div>

    </div>
  );
};

export default Layout;