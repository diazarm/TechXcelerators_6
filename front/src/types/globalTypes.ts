/**
 * Tipos globales de la aplicación
 * 
 * Estos tipos son utilizados en toda la aplicación para mantener consistencia
 * en la estructura de datos y respuestas de API.
 */

/**
 * Representa un usuario del sistema
 * 
 * @example
 * ```tsx
 * const user: User = {
 *   id: '123',
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   role: 'admin'
 * };
 * 
 * // Verificar si es admin
 * if (user.role === 'admin') {
 *   // Mostrar opciones de administrador
 * }
 * ```
 */
export interface User {
  /** Identificador único del usuario */
  id: string;
  /** Nombre completo del usuario */
  name: string;
  /** Email del usuario (debe ser único) */
  email: string;
  /** Rol del usuario en el sistema */
  role: 'admin' | 'user' | 'moderator';
}

/**
 * Respuesta estándar de la API
 * 
 * @template T - Tipo de datos que contiene la respuesta
 * 
 * @example
 * ```tsx
 * // Respuesta exitosa
 * const successResponse: ApiResponse<User> = {
 *   data: user,
 *   message: 'Usuario creado exitosamente',
 *   success: true
 * };
 * 
 * // Respuesta de error
 * const errorResponse: ApiResponse<null> = {
 *   data: null,
 *   message: 'Email ya existe',
 *   success: false
 * };
 * 
 * // Uso en componentes
 * if (response.success) {
 *   setUser(response.data);
 * } else {
 *   showError(response.message);
 * }
 * ```
 */
export interface ApiResponse<T> {
  /** Datos de la respuesta (puede ser null en caso de error) */
  data: T;
  /** Mensaje descriptivo de la respuesta */
  message: string;
  /** Indica si la operación fue exitosa */
  success: boolean;
}

/**
 * Parámetros para paginación
 * 
 * @example
 * ```tsx
 * const pagination: PaginationParams = {
 *   page: 1,
 *   limit: 10,
 *   total: 150
 * };
 * 
 * // Calcular total de páginas
 * const totalPages = Math.ceil(pagination.total / pagination.limit);
 * 
 * // Verificar si hay más páginas
 * const hasNextPage = pagination.page < totalPages;
 * ```
 */
export interface PaginationParams {
  /** Número de página actual (comienza en 1) */
  page: number;
  /** Número de elementos por página */
  limit: number;
  /** Total de elementos disponibles */
  total: number;
}

/**
 * Estado de carga para operaciones asíncronas
 * 
 * @example
 * ```tsx
 * const [loading, setLoading] = useState<LoadingState>('idle');
 * 
 * const handleSubmit = async () => {
 *   setLoading('loading');
 *   try {
 *     await submitForm();
 *     setLoading('success');
 *   } catch (error) {
 *     setLoading('error');
 *   }
 * };
 * 
 * if (loading === 'loading') return <Spinner />;
 * if (loading === 'error') return <ErrorMessage />;
 * ```
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Opciones para ordenamiento
 * 
 * @example
 * ```tsx
 * const sortOptions: SortOptions = {
 *   field: 'createdAt',
 *   direction: 'desc'
 * };
 * 
 * // Aplicar ordenamiento
 * const sortedData = data.sort((a, b) => {
 *   if (sortOptions.direction === 'asc') {
 *     return a[sortOptions.field] > b[sortOptions.field] ? 1 : -1;
 *   }
 *   return a[sortOptions.field] < b[sortOptions.field] ? 1 : -1;
 * });
 * ```
 */
export interface SortOptions {
  /** Campo por el cual ordenar */
  field: string;
  /** Dirección del ordenamiento */
  direction: 'asc' | 'desc';
}
