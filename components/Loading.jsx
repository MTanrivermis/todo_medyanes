import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <div className="text-teal-500 text-2xl">Yükleniyor...</div>
    </div>
  );
};

export default Loading;
