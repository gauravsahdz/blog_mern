import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import BlogList from "./BlogList";

export default function Home() {
  return (
    <div>
      <Navbar />
      <BlogList />
      <Footer />
    </div>
  );
}
