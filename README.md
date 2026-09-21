#  Gestión de contactos (Frontend)

Aplicación web desarrollada en **Angular 20** con **PrimeNG** para administrar contactos: crear, consultar, editar y eliminar. Consume la API REST de contactos del backend.

## Tecnologías

| Tecnología | Versión |
|---|---|
| Angular (componentes standalone) | 20.3 |
| PrimeNG | 20.4 |
| PrimeIcons | 7.0 |
| @primeuix/themes | 2.0 |
| RxJS | 7.8 |
| TypeScript | 5.9 |
| Karma + Jasmine (pruebas) | 6.4 / 5.1 |

## Requisitos previos

- **Node.js 20.19 o superior** (Angular 20 requiere Node 20.19+, 22.12+ o 24+)
- **npm**
- **Backend de contactos** en ejecución

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

La aplicación queda disponible en <http://localhost:4200> y se recarga automáticamente al modificar el código.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Levanta el servidor de desarrollo (`ng serve`) |
| `npm run build` | Genera la compilación del proyecto en `dist/` |
| `npm run watch` | Compila en modo desarrollo y vuelve a compilar al detectar cambios |
| `npm test` | Ejecuta las pruebas unitarias con Karma y Jasmine |
| `npm run ng -- <comando>` | Ejecuta cualquier comando de Angular CLI |

## Funcionalidades

- Listado de contactos en tabla con paginación (10, 25 o 50 filas por página).
- Búsqueda global por nombre, apellido, correo y teléfono.
- Creación y edición de contactos desde un modal.
- Eliminación con diálogo de confirmación.
- Notificaciones (toast) de éxito y error.

### Validaciones del formulario

| Campo | Regla |
|---|---|
| Nombre | Obligatorio, máximo 150 caracteres |
| Apellido | Obligatorio, máximo 150 caracteres |
| Correo electrónico | Obligatorio, máximo 150 caracteres |
| Teléfono | Opcional, máximo 30 caracteres |

El backend aplica sus propias validaciones y rechaza correos duplicados.

## Integración con la API

El servicio `ContactService` consume los siguientes endpoints, cuya ruta base está definida en la constante `PATH`:

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/v1/contact-manager/api/contacts` | Lista todos los contactos |
| `POST` | `/api/v1/contact-manager/api/contacts` | Crea un contacto |
| `PUT` | `/api/v1/contact-manager/api/contacts/{id}` | Actualiza un contacto |
| `DELETE` | `/api/v1/contact-manager/api/contacts/{id}` | Elimina un contacto |

Las peticiones incluyen los headers de autenticación definidos en `BackofficeApiService`. La API devuelve el contacto (o el arreglo de contactos) directamente, sin envolverlo en otro objeto.

### Modelo de contacto

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `number` | Identificador, generado por el backend |
| `firstName` | `string` | Nombre |
| `lastName` | `string` | Apellido |
| `email` | `string` | Correo electrónico (único) |
| `phone` | `string` | Teléfono |
| `createdAt` | `string` | Fecha de creación |
| `updatedAt` | `string` | Fecha de última actualización |

Ejemplo de cuerpo para crear o actualizar un contacto:

```json
{
  "firstName": "Ana",
  "lastName": "Pérez",
  "email": "ana.perez@ejemplo.com",
  "phone": "3001234567"
}
```

## Configuración

La URL base del backend se resuelve en `BackofficeApiService.url()`. Antes de ejecutar la aplicación, configúrala en `<ruta del archivo de entorno>`.

Si el backend corre en un origen distinto al del front, debe permitir CORS desde `http://localhost:4200`.

## Archivos principales

| Archivo | Descripción |
|---|---|
| `contact-manager.component.ts` / `.html` / `.css` | Pantalla de gestión de contactos (tabla, modal y acciones) |
| `contact.service.ts` | Servicio HTTP con las operaciones del CRUD |
| `contact.interface.ts` | Interfaces `PortalContact` y `PortalContactRequest` |

## Pruebas

```bash
npm test
```

Ejecuta las pruebas unitarias en Chrome con Karma y Jasmine.
