import type { IResource } from "../types/resource";

/**
 * Mock data para recursos de Galería
 * 
 * Simula los recursos de universidades que están en el backend
 * pero que no se pueden editar debido a restricciones de sección.
 */

export const mockGalleryResources: IResource[] = [
  {
    _id: "68cb2978e7461e967e34e0df",
    sectionId: "68cadd9354f9344f27defc83",
    name: "EAFIT",
    description: "Universidad EAFIT",
    links: [
      { 
        label: "Sitio Web", 
        url: "https://www.eafit.edu.co"
      }
    ],
    isActive: false,
    createdAt: new Date("2025-09-17T21:34:48.384Z"),
    updatedAt: new Date("2025-09-17T21:34:48.384Z"),
    deletedAt: null,
  },
  {
    _id: "68cb2986e7461e967e34e0e2",
    sectionId: "68cadd9354f9344f27defc83",
    name: "Uninorte",
    description: "Universidad Del Norte",
    links: [
      { 
        label: "Sitio Web", 
        url: "https://www.uninorte.edu.co",
      }
    ],
    isActive: false,
    createdAt: new Date("2025-09-17T21:35:02.386Z"),
    updatedAt: new Date("2025-09-17T21:35:02.386Z"),
    deletedAt: null,
  },
  {
    _id: "68cb298de7461e967e34e0e5",
    sectionId: "68cadd9354f9344f27defc83",
    name: "UNAB",
    description: "Universidad Andres Bello",
    links: [
      { 
        label: "Sitio Web", 
        url: "https://www.unab.cl",
      }
    ],
    isActive: false,
    createdAt: new Date("2025-09-17T21:35:09.582Z"),
    updatedAt: new Date("2025-09-17T21:35:09.582Z"),
    deletedAt: null,
  },
  {
    _id: "68cb2993e7461e967e34e0e8",
    sectionId: "68cadd9354f9344f27defc83",
    name: "UDD",
    description: "Universidad del desarrollo",
    links: [
      { 
        label: "Sitio Web", 
        url: "https://www.udd.cl",
      }
    ],
    isActive: false,
    createdAt: new Date("2025-09-17T21:35:15.614Z"),
    updatedAt: new Date("2025-09-17T21:35:15.614Z"),
    deletedAt: null,
  },
  {
    _id: "68cb2999e7461e967e34e0eb",
    sectionId: "68cadd9354f9344f27defc83",
    name: "Central",
    description: "Universidad Central de Chile",
    links: [
      { 
        label: "Sitio Web", 
        url: "https://www.ucentral.cl",
      }
    ],
    isActive: false,
    createdAt: new Date("2025-09-17T21:35:21.750Z"),
    updatedAt: new Date("2025-09-17T21:35:21.750Z"),
    deletedAt: null,
  },
  {
    _id: "68cb29a0e7461e967e34e0ee",
    sectionId: "68cadd9354f9344f27defc83",
    name: "UNIS",
    description: "Universidad del Istmo",
    links: [
      { 
        label: "Sitio Web", 
        url: "https://unis.edu.gt",
      }
    ],
    isActive: false,
    createdAt: new Date("2025-09-17T21:35:28.210Z"),
    updatedAt: new Date("2025-09-17T21:35:28.210Z"),
    deletedAt: null,
  },
  {
    _id: "68cb29a6e7461e967e34e0f1",
    sectionId: "68cadd9354f9344f27defc83",
    name: "UP",
    description: "Universidad Panamericana",
    links: [
      { 
        label: "Sitio Web", 
        url: "https://www.up.edu.mx",
      }
    ],
    isActive: false,
    createdAt: new Date("2025-09-17T21:35:34.924Z"),
    updatedAt: new Date("2025-09-17T21:35:34.924Z"),
    deletedAt: null,
  },
  {
    _id: "68cb29b5e7461e967e34e0f4",
    sectionId: "68cadd9354f9344f27defc83",
    name: "UCSS",
    description: "Universidad Católica Sedes Sapientiae",
    links: [
      { 
        label: "Sitio Web", 
        url: "https://www.ucss.edu.pe",
      }
    ],
    isActive: false,
    createdAt: new Date("2025-09-17T21:35:49.134Z"),
    updatedAt: new Date("2025-09-17T21:35:49.134Z"),
    deletedAt: null,
  },
  {
    _id: "68dda1be69672674383c4b35",
    sectionId: "68cadd9354f9344f27defc83",
    name: "UAC",
    description: "Universidad Andina del Cusco",
    links: [
      { 
        label: "Sitio Web", 
        url: "https://www.uandina.edu.pe",
      }
    ],
    isActive: false,
    createdAt: new Date("2025-10-01T21:48:46.161Z"),
    updatedAt: new Date("2025-10-01T21:48:46.161Z"),
    deletedAt: null,
  }
];

/**
 * Clave para localStorage
 */
export const GALLERY_MOCK_STORAGE_KEY = 'gallery-mock-resources';

/**
 * Inicializar datos mock en localStorage si no existen
 */
export const initializeGalleryMockData = (): void => {
  const existing = localStorage.getItem(GALLERY_MOCK_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(GALLERY_MOCK_STORAGE_KEY, JSON.stringify(mockGalleryResources));
  }
};
