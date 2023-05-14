import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-dark-grey"></div>
    </div>
  );
};

export default LoadingPage;
