# Sistema de Gestión Académica

Aplicación web SPA desarrollada en Angular para gestionar usuarios, alumnos, cursos y notas de una institución educativa, con login, rutas protegidas y control de acceso por rol.

**Curso:** Desarrollo de Interfaces 3 (IDAT) - Evaluación final
**Integrantes:** Miguel Angel Cardalcha Angulo, Cesar Manuel Juarez Edeguardo, Gean Martin Rivales de la Cruz
**Demo:** https://gestion-cursos-liard.vercel.app

## Requisitos
- Node.js (versión LTS reciente)
- npm
- Angular CLI (opcional): `npm install -g @angular/cli`

## Instalación y ejecución
1. Clonar el repositorio:
   `git clone https://github.com/mjedeguardo/gestion_cursos.git`
2. Entrar a la carpeta del proyecto:
   `cd gestion_cursos`
3. Instalar dependencias:
   `npm install`
4. Ejecutar la aplicación:
   `npm start`
5. Abrir en el navegador: http://localhost:4200

## Usuarios de prueba
| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@test.com | 123456 |
| Profesor | profesor@test.com | 123456 |
| Estudiante | alumno@test.com | 123456 |

## Permisos por rol
| Sección | Admin | Profesor | Estudiante |
|---|---|---|---|
| Usuarios | Sí | No | No |
| Alumnos | Sí | Sí | No |
| Cursos (ver) | Sí | Sí | Sí |
| Cursos (crear, editar, eliminar) | Sí | Sí | No |
| Notas | Sí | Sí | Sí |

## Rutas
- `/login`: pública (protegida por LoginGuard: si ya hay sesión, redirige al panel).
- `/dashboard`: protegida por AuthGuard.
  - `/dashboard/usuarios`, `/dashboard/alumnos`, `/dashboard/cursos`, `/dashboard/notas`: rutas hijas con RoleGuard según el rol.
- Todas las rutas usan lazy loading (`loadComponent`).
- Cualquier ruta inexistente muestra la página 404.

## Seguridad
- **AuthGuard:** exige un token JWT válido y no vencido.
- **RoleGuard:** compara el rol del token con los roles permitidos de cada ruta.
- **LoginGuard:** evita volver al login con sesión iniciada.
- **JWT:** el login genera un token con `sub`, `rol` y `exp` (vence en 1 hora) y se guarda en localStorage.
- **authInterceptor:** agrega `Authorization: Bearer <token>` a cada petición y cierra la sesión si hay error 401 o 403.

## Servicios REST
Un servicio por entidad (`UsuarioService`, `AlumnoService`, `CursoService`, `NotaService`) que usa HttpClient con GET, POST, PUT y DELETE sobre `api/<entidad>`.

La API es simulada: un interceptor (`mockApiInterceptor`) responde las peticiones con datos en memoria, por eso los cambios se pierden al recargar la página.

## Estructura
- `core/guards`: authGuard, roleGuard, loginGuard
- `core/interceptors`: authInterceptor, mockApiInterceptor
- `core/services`: auth, usuario, alumno, curso, nota, mock-api
- `features`: login, dashboard, usuarios, alumnos, cursos, notas, not-found
- `shared`: pipe `estado` y directiva `appResaltar` (propios)