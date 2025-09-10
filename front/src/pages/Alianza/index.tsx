import React from 'react';
import CardGrid from '../../components/CardGrid';
import { useCards } from '../../hooks/useCards';
import { useResponsive } from '../../hooks';
import { COLOR_CLASSES } from '../../constants/colors';
import { usePageHeader } from '../../hooks/usePageHeader';

/**
 * Página Alianza
 * Muestra un grid de cards con la información de la alianza
 */
const AlianzaPage: React.FC = () => {
  const responsive = useResponsive();
  
  // Configura automáticamente el título del header
  usePageHeader();

  // Usamos el hook personalizado para obtener cards y handler
  const { cards, handleCardClick } = useCards('alianza');

  return (
    <div className={`py-8 sm:py-12 lg:py-16 ${responsive.container}`}>
      <div className="mb-10 text-center">
        <h1 className={`${responsive.text.h2} ${COLOR_CLASSES.textPrimary} mb-4`}>
        </h1>
        
      </div>

      {/* Grid de cards - 3 columnas para 6 cards (2 filas de 3) */}
      <CardGrid
        cards={cards}
        onCardClick={handleCardClick}
        columns={3}
      />
    </div>
  );
};

export default AlianzaPage;