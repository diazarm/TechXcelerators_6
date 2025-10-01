import React from "react";
import { COLOR_CLASSES } from "../../constants";
import { useScreenSize } from "../../context";

const Changelog: React.FC = () => {
  const { getContainerForScreen } = useScreenSize();
  
  return (
    <main className="min-h-screen bg-white py-10 px-4">
      <div className={`${getContainerForScreen()} bg-white p-8 rounded-xl shadow-md border border-gray-200`}>
        <h1 className={`text-4xl font-extrabold mb-6 ${COLOR_CLASSES.textPrimary}`}>
          Changelog
        </h1>
        <p className="text-gray-600">
          Aquí se muestra el historial de cambios del proyecto. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros
          non justo aliquet tincidunt.
        </p>
      </div>
    </main>
  );
};

export default Changelog;
