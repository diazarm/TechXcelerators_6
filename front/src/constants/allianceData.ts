/**
 * Configuración de datos para el slider de alianzas
 * 
 * Logos en orden específico según requerimientos del usuario
 */

export interface AllianceData {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

export const ALLIANCE_DATA: AllianceData[] = [
  {
    id: 'udd',
    name: 'Universidad del Desarrollo',
    logo: '/img/udd.png',
    url: 'https://www.udd.cl'
  },
  {
    id: 'andresbello',
    name: 'Universidad Andrés Bello',
    logo: '/img/andresbello.png',
    url: 'https://www.unab.cl'
  },
  {
    id: 'ucatolica',
    name: 'Pontificia Universidad Católica de Chile',
    logo: '/img/ucatolica.png',
    url: 'https://www.ucss.edu.pe/'
  },
  {
    id: 'ucusco',
    name: 'Universidad Nacional de San Antonio Abad del Cusco',
    logo: '/img/ucusco.png',
    url: 'https://www.unsaac.edu.pe'
  },
  {
    id: 'unis',
    name: 'Universidad del Istmo',
    logo: '/img/unis.png',
    url: 'https://www.unis.edu.gt'
  },
  {
    id: 'ucentral',
    name: 'Universidad Central de Chile',
    logo: '/img/ucentral.png',
    url: 'https://www.ucentral.cl'
  },
  {
    id: 'panamericana',
    name: 'Universidad Panamericana',
    logo: '/img/panamericana.png',
    url: 'https://www.up.edu.mx'
  },
  {
    id: 'eafit',
    name: 'Universidad EAFIT',
    logo: '/img/eafit.png',
    url: 'https://www.eafit.edu.co'
  },
  {
    id: 'uninorte',
    name: 'Universidad del Norte',
    logo: '/img/uninorte.png',
    url: 'https://www.uninorte.edu.co'
  }
];

