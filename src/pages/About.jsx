import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-300 to-slate-900 py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto bg-black/70 text-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 space-y-8">
        
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          About <span className="text-red-500">ORORA</span>
        </h1>

        {/* Intro */}
        <p className="text-base sm:text-lg leading-relaxed text-gray-200">
          Welcome to <span className="font-semibold text-red-500">ORORA</span>, 
          your one-stop destination for the latest and greatest in electronics. 
          From cutting-edge gadgets to must-have accessories, we’re here to power up 
          your tech life with premium products and unbeatable service.
        </p>

        {/* Mission */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-500">Our Mission</h2>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            At ORORA, our mission is to make innovative technology accessible to everyone. 
            We’re passionate about connecting people with the tools and tech they need 
            to thrive in a digital world — all at competitive prices and delivered with care.
          </p>
        </section>

        {/* Why Choose */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-500">Why Choose ORORA?</h2>
          <ul className="list-disc pl-5 text-sm sm:text-base space-y-2 text-gray-200">
            <li>Top-quality electronic products from trusted brands</li>
            <li>Lightning-fast and secure shipping</li>
            <li>Reliable customer support, always ready to help</li>
            <li>Easy returns and hassle-free shopping experience</li>
          </ul>
        </section>

        {/* Vision */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Our Vision</h2>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            We envision a future where technology elevates everyday life. 
            At ORORA, we’re committed to staying ahead of the curve, offering 
            cutting-edge solutions that are both practical and affordable.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center mt-8">
          <h3 className="text-lg sm:text-xl font-semibold text-red-500 mb-2">
            Join the ORORA Family
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-4 max-w-xl mx-auto">
            Whether you’re a tech enthusiast, a professional, or just looking for 
            something cool and functional — ORORA has something for everyone.
          </p>
          <Link to="/products">
            <button className="bg-gradient-to-br from-red-600 to-red-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:from-slate-900 hover:to-red-700 transition duration-300 w-full sm:w-auto">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
