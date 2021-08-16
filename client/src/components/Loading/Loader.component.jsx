import React from "react";
const Loader = ({padding = "250px", loaderText="Loading" }) => {
  return (
      <div className="text-center" style={{paddingTop: padding, color: "#22A684"}}>
        <div className="spinner-border"></div>
        {loaderText && <h3 className="text-muted">{loaderText}</h3>}
      </div>
  );
};

export default Loader;