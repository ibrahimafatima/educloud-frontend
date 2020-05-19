import React from "react";
import { FaAngellist, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-wrap-layout1">
      <div className="copyright center-text" style={{ textAlign: "center" }}>
        <div>
          {" "}
          Coded with <FaHeart color="#042954" /> By Ibrahima. Inspired By{" "}
          <FaAngellist size="22" color="#042954" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
