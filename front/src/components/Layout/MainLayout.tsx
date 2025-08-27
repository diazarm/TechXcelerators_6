import React from "react";

import { Button } from "../Button";
import { useResponsive } from "../../hooks/useResponsive";
// donde se va a renderizar el contenido de la pagina


//ojo con esto de arriba, todo lo que sea type con cuidado.
// colocado y tipos compartidos.
//cada componente que tenga sus tipados. 
//type en index.
//planos globales, los tipos compartidos donde lo voy a ocupar en distintas partes.
//hacer archivo de typos compartidos. types.ts

//renderizar todo (¿Dejar espacio para el body?)
//No tocar los hooks por el amor zeus.
//importar el hook, por favors.

/**
 * Componente MainLayout con colores de marca y botones integrados
 * 
 * @example
 * ```tsx
 * // Layout básico
 * <MainLayout>
 *   <div>Contenido principal</div>
 * </MainLayout>
 * 
 * // Layout con clases personalizadas
 * <MainLayout className="min-h-screen">
 *   <div>Contenido principal</div>
 * </MainLayout>
 * ```
 */
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = "",
}) => {
  const responsive = useResponsive();

  const handleConsultClick = () => {
    console.log("Consulta button clicked");
    // Aquí puedes agregar la lógica para la consulta
  };

  return (
    <div className={`min-h-screen bg-white ${className}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Hero Section */}
      <section className={`${responsive.grid.columns.two} min-h-screen`}>
        <div className="bg-[#585D8A] flex flex-col justify-center px-12 py-16 text-white">
          <h2 className={`${responsive.text.h2} font-bold`}>
            About <span className="text-[#F86E15]">scala</span>
          </h2>
          <p className={`mt-6 max-w-lg leading-relaxed ${responsive.text.body}`}>
            En Escala nos importa lo que tienes que decir.
          </p>
          <p className={`mt-4 font-semibold ${responsive.text.body}`}>
            Déjanos ayudarte a encontrar la solución perfecta.
          </p>
    
          <div className="mt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={handleConsultClick}
              className="bg-[#F86E15] hover:bg-[#e05a0a] text-white border-[#F86E15] focus:ring-[#F86E15]"
            >
              Consulta
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-[#CDC9EF] flex flex-col justify-center px-12 py-16">
          <div className="max-w-lg">
            <h3 className={`${responsive.text.h3} text-[#585D8A] font-bold mb-6`}>
              Nuestra Misión
            </h3>
            <p className={`${responsive.text.body} text-gray-700 mb-6 leading-relaxed`}>
              Transformamos ideas en soluciones digitales innovadoras que impulsan el crecimiento de tu negocio.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-[#F86E15] rounded-full"></div>
                <span className={`${responsive.text.body} text-gray-700`}>
                  Manten todo organizado.
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-[#F86E15] rounded-full"></div>
                <span className={`${responsive.text.body} text-gray-700`}>
                  Diseño centrado en el usuario
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-[#F86E15] rounded-full"></div>
                <span className={`${responsive.text.body} text-gray-700`}>
                  Tecnologías de vanguardia
                </span>
              </div>
            </div>

            <div className="mt-8 space-x-4">
              <Button
                variant="outline"
                size="md"
                onClick={() => console.log("Learn more clicked")}
                className="border-[#585D8A] text-[#585D8A] hover:bg-[#585D8A] hover:text-white"
              >
                Conoce más
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => console.log("Contact clicked")}
                className="bg-[#585D8A] hover:bg-[#4a4f7a] text-white border-[#585D8A] focus:ring-[#585D8A]"
              >
                Contáctanos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      {children && (
        <main className={`${responsive.container} ${responsive.spacing.py.large}`}>
          {children}
        </main>
      )}
    </div>
  );
};

export default MainLayout;