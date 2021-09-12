import React from "react";

const Footer = () => {
  var today = new Date()
  return (
    <div>
      <p>Copyright &copy; {today.getFullYear()} GREENLINE GLOBAL - All Right Reserved</p>
    </div>
  );
};

export default Footer;
