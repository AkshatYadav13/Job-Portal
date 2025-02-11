import React from "react";

const AccLogo = ({ url, size }) => {
  return (
    <img
      style={{ width: size, height: size ,borderRadius:'50%'}}
      src={url}
      alt=""
    />
  );
};

export default AccLogo;
