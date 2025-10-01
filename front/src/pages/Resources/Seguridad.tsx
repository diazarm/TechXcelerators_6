import React from "react";
import { COLOR_CLASSES } from "../../constants";
import { useScreenSize } from "../../context";

const Seguridad: React.FC = () => {
  const { getContainerForScreen } = useScreenSize();
  
  return (
    <main className="min-h-screen bg-white py-10 px-4">
      <div className={`${getContainerForScreen()} bg-white p-8 rounded-xl shadow-md border border-gray-200`}>
        <h1 className={`text-4xl font-extrabold mb-6 ${COLOR_CLASSES.textPrimary}`}>
          Políticas de Seguridad
        </h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit
          amet eros non justo aliquet tincidunt. Integer volutpat nulla at
          sapien facilisis, sed viverra mi pretium.
        </p>
      </div>
    </main>
  );
};

export default Seguridad;
