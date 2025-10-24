import React from "react";

const Skeleton = ({ width = "100%", height = 200 }: { width?: string | number; height?: string | number }) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        animation: "pulse 1.5s infinite ease-in-out",
      }}
    />
  );
};

export default Skeleton;
