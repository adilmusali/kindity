import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-[#04091e] text-[#b0b0b0]">
    <div className="container">
      <div className="flex flex-col sm:flex-row justify-between gap-10 py-16 border-b border-slate-700">
        <div className="max-w-md">
          <h2 className="text-white text-base font-semibold uppercase mb-4">About Kindity</h2>
          <p className="text-sm font-light leading-6">
            Kindity is a demonstration featuring illustrative ideas about food support, learning, and community volunteering.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <h2 className="text-white text-base font-semibold uppercase mb-4">Explore</h2>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm font-light">
            <li><Link className="hover:text-white" to="/">Home</Link></li>
            <li><Link className="hover:text-white" to="/about">About</Link></li>
            <li><Link className="hover:text-white" to="/event">Community events</Link></li>
            <li><Link className="hover:text-white" to="/blog">Stories</Link></li>
            <li><Link className="hover:text-white" to="/donation">Giving</Link></li>
            <li><Link className="hover:text-white" to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
      <div className="py-6 text-sm font-light">© {new Date().getFullYear()} Kindity demonstration</div>
    </div>
  </footer>
);

export default Footer;
