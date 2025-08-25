import { useState, useEffect } from 'react';

/**
 * Hook que proporciona clases de Tailwind CSS responsive
 * 
 * Retorna un objeto con clases organizadas por categorías:
 * - container: Contenedores responsive
 * - text: Tipografía responsive  
 * - spacing: Espaciado responsive
 * - grid: Grids responsive
 * - flex: Flexbox responsive
 * - shadow: Sombras responsive
 * - border: Bordes responsive
 * - animation: Animaciones responsive
 */
export const useResponsive = () => {
  return {
    // Contenedores principales
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    containerSmall: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
    containerLarge: "max-w-full mx-auto px-4 sm:px-6 lg:px-8",
    
    // Espaciado
    spacing: {
      py: {
        small: "py-8 sm:py-12 lg:py-16",
        medium: "py-12 sm:py-16 lg:py-20",
        large: "py-16 sm:py-20 lg:py-24",
        xlarge: "py-20 sm:py-24 lg:py-32"
      },
      px: {
        small: "px-4 sm:px-6 lg:px-8",
        medium: "px-6 sm:px-8 lg:px-12",
        large: "px-8 sm:px-12 lg:px-16"
      },
      my: {
        small: "my-4 sm:my-6 lg:my-8",
        medium: "my-8 sm:my-12 lg:my-16",
        large: "my-12 sm:my-16 lg:my-20"
      }
    },
    
    // Tipografía responsive
    text: {
      h1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold",
      h2: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold",
      h3: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold",
      h4: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold",
      body: "text-base sm:text-lg lg:text-xl",
      small: "text-sm sm:text-base",
      xsmall: "text-xs sm:text-sm"
    },
    
    // Grids responsive
    grid: {
      columns: {
        auto: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        two: "grid grid-cols-1 sm:grid-cols-2",
        three: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        four: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        sidebar: "grid grid-cols-1 lg:grid-cols-4 gap-8",
        main: "grid grid-cols-1 lg:grid-cols-3 gap-8"
      },
      gap: {
        small: "gap-4 sm:gap-6 lg:gap-8",
        medium: "gap-6 sm:gap-8 lg:gap-12",
        large: "gap-8 sm:gap-12 lg:gap-16"
      }
    },
    
    // Flexbox responsive
    flex: {
      row: "flex flex-col sm:flex-row",
      col: "flex flex-col",
      center: "flex items-center justify-center",
      between: "flex items-center justify-between",
      start: "flex items-center justify-start",
      end: "flex items-center justify-end"
    },
    
    // Posicionamiento
    position: {
      center: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      top: "absolute top-0 left-0 right-0",
      bottom: "absolute bottom-0 left-0 right-0"
    },
    
    // Sombras responsive
    shadow: {
      small: "shadow-sm sm:shadow-md lg:shadow-lg",
      medium: "shadow-md sm:shadow-lg lg:shadow-xl",
      large: "shadow-lg sm:shadow-xl lg:shadow-2xl"
    },
    
    // Bordes y radios
    border: {
      radius: {
        small: "rounded sm:rounded-md lg:rounded-lg",
        medium: "rounded-md sm:rounded-lg lg:rounded-xl",
        large: "rounded-lg sm:rounded-xl lg:rounded-2xl"
      }
    },
    
    // Animaciones responsive
    animation: {
      fadeIn: "animate-fade-in sm:animate-fade-in-up",
      slideIn: "animate-slide-in-left sm:animate-slide-in-up"
    }
  };
};

/**
 * Hook que detecta breakpoints de pantalla en tiempo real
 * 
 * Retorna booleanos para cada breakpoint:
 * - isMobile: < 640px
 * - isTablet: 640px - 1024px  
 * - isDesktop: 1024px - 1280px
 * - isLarge: > 1280px
 */
export const useBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState({
    isMobile: false,     // < 640px (sm)
    isTablet: false,     // 640px - 1024px (sm - lg)
    isDesktop: false,    // 1024px - 1280px (lg - xl)
    isLarge: false       // > 1280px (xl)
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      
      setBreakpoints({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024 && width < 1280,
        isLarge: width >= 1280
      });
    };

    // Establecer breakpoints iniciales
    updateBreakpoints();

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', updateBreakpoints);

    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  return breakpoints;
};
