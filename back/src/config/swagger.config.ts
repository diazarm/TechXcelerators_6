import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Scala Learning API',
      version: '1.0.0',
      description: `
# API para el sistema de gestión de recursos educativos de Scala Learning

## 🔐 Cómo autenticarte:

1. **Obtener token**: Usa el endpoint \`POST /api/users/login\` con tus credenciales
2. **Autorizar**: Haz clic en el botón **"Authorize" 🔒** (arriba a la derecha)
3. **Ingresar token**: Pega el token obtenido (sin "Bearer", solo el token)
4. **¡Listo!**: Ahora puedes usar todos los endpoints protegidos

## 👤 Usuarios de prueba:

**Tipos de autenticación:**
- **Admin**: Requiere email + contraseña → administrador@scalalearning.com / 123456
- **Director**: Solo email → director@scalalearning.com
- **User**: Solo email → user@scalalearning.com

**Nota**: Directores y usuarios no necesitan contraseña, solo email

## 📚 Endpoints principales:

- **Usuarios**: Gestión de usuarios del sistema
- **Recursos**: Gestión de recursos
- **Alianzas**: Gestión de alianzas
- **Secciones**: Gestión de secciones
- **Documentación**: Gestión de documentación (solo admin)
      `,
      contact: {
        name: 'TechXcelerators Team',
        email: 'scalalearning25@gmail.com',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://scala-backend-42as.onrender.com' 
          : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' ? 'Servidor de Producción' : 'Servidor de Desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: `
## 🔑 Autenticación JWT

Para usar endpoints protegidos:

1. **Paso 1**: Ejecuta \`POST /api/users/login\` con tus credenciales
2. **Paso 2**: Copia el \`token\` de la respuesta
3. **Paso 3**: Haz clic en **"Authorize"** 🔒 (botón verde arriba)
4. **Paso 4**: Pega el token (sin agregar "Bearer")
5. **Paso 5**: Haz clic en "Authorize" y luego "Close"

**Formato del token**: \`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\`

⚠️ **Importante**: NO agregues "Bearer" al token, Swagger lo hace automáticamente.
          `
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del usuario',
              example: '6716b52c43f33bf9f92e0850'
            },
            name: {
              type: 'string',
              description: 'Nombre del usuario',
              example: 'Juan Pérez'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
              example: 'admin@scalalearning.com'
            },
            password: {
              type: 'string',
              description: 'Contraseña del usuario (solo para admin)',
              example: '123456'
            },
            role: {
              type: 'string',
              enum: ['admin', 'director', 'user'],
              description: 'Rol del usuario en el sistema',
              example: 'admin'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: '🔑 Token JWT - Cópialo y úsalo en el botón Authorize',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE2YjUyYzQzZjMzYmY5ZjkyZTA4NTAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjk1Mzg2MjAsImV4cCI6MTcyOTU0MjIyMH0.example'
            },
            user: {
              $ref: '#/components/schemas/User'
            }
          },
          example: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE2YjUyYzQzZjMzYmY5ZjkyZTA4NTAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjk1Mzg2MjAsImV4cCI6MTcyOTU0MjIyMH0.example',
            user: {
              _id: '6716b52c43f33bf9f92e0850',
              name: 'Juan Pérez',
              email: 'admin@scalalearning.com',
              role: 'admin'
            }
          }
        },
        Alliance: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único de la alianza'
            },
            name: {
              type: 'string',
              description: 'Nombre de la alianza'
            },
            siglas: {
              type: 'string',
              description: 'Siglas de la alianza'
            },
            url: {
              type: 'string',
              description: 'URL de la alianza'
            },
            logos: [
              {
                type: 'object',
                properties: {
                  label: {
                    type: 'string',
                    description: 'Descripción del logo'
                  },
                  url: {
                    type: 'string',
                    description: 'URL de la imagen del logo'
                  }
                }
              }
            ]
          }
        },
        Resource: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del recurso'
            },
            name: {
              type: 'string',
              description: 'Nombre del recurso'
            },
            description: {
              type: 'string',
              description: 'Descripción del recurso'
            },
            sectionId: {
              type: 'string',
              description: 'ID de la sección a la que pertenece'
            },
            links: [
              {
                type: 'object',
                properties: {
                  label: {
                    type: 'string',
                    description: 'Texto del enlace'
                  },
                  url: {
                    type: 'string',
                    description: 'URL del recurso'
                  }
                }
              }
            ]
          }
        },
        Section: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único de la sección',
              example: '6716b52c43f33bf9f92e0850'
            },
            title: {
              type: 'string',
              description: 'Título de la sección',
              example: 'Gobernanza'
            },
            description: {
              type: 'string',
              description: 'Descripción de la sección',
              example: 'Sección dedicada a recursos de gobernanza.'
            },
            resourcesId: {
              type: 'string',
              description: 'ID de los recursos asociados a esta sección',
              example: '6716b52c43f33bf9f92e0850'
            }
          }
        },
        Document: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del documento',
              example: '6716b52c43f33bf9f92e0850'
            },
            name: {
              type: 'string',
              description: 'Nombre del archivo',
              example: 'Documento.pdf'
            },
            description: {
              type: 'string',
              description: 'Descripción del documento',
              example: 'Manual de usuario para la plataforma Scala Learning'
            },
            category: {
              type: 'string',
              description: 'Categoría del documento',
              example: 'manual'
            },
            type: {
              type: 'string',
              description: 'Tipo MIME del documento',
              example: 'application/pdf'
            },
            url: {
              type: 'string',
              description: 'URL para acceder al documento',
              example: 'http://localhost:3000/uploads/1729538620_documento.pdf'
            },
            filepath: {
              type: 'string',
              description: 'Ruta real del archivo',
              example: 'c:/uploads/1729538620_documento.pdf'
            },
            size: {
              type: 'number',
              description: 'Tamaño del archivo en bytes',
              example: 1024000
            },
            isVisible: [
              {
                type: 'string',
                enum: ['admin', 'director', 'user'],
                description: 'Roles que pueden ver el documento',
                example: 'user'
              }
            ],
            isDeleted: {
              type: 'boolean',
              description: 'Estado de eliminación lógica',
              example: false
            },
            uploadedBy: {
              type: 'string',
              description: 'Usuario que subió el archivo',
              example: 'admin'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2023-10-22T10:30:00Z'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de error'
            },
            error: {
              type: 'string',
              description: 'Detalles del error'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de éxito'
            },
            data: {
              type: 'object',
              description: 'Datos de respuesta'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './src/models/*.ts'
  ],
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #3b82f6 }
    `,
    customSiteTitle: 'Scala Learning API Documentation',
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    }
  }));

  // Swagger JSON
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

console.log('📚 Swagger documentation available at: http://localhost:3000/api-docs || https://scala-backend-42as.onrender.com/api-docs');
};

export { specs };