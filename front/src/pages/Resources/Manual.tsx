import React from "react";
import { COLOR_CLASSES } from "../../constants/colors";

const Manual: React.FC = () => {
  return (
    <main className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h1 className={`text-4xl font-extrabold mb-6 ${COLOR_CLASSES.textPrimary}`}>
          Manual de Usuario
        </h1>
        <p className="text-gray-600">
          Este documento contiene instrucciones para el uso correcto del
          sistema. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </main>
  );
};

export default Manual;
