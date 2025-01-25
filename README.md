# Proyecto de Suscripción por Correo

Este es un proyecto completo que incluye un frontend y un backend para gestionar las suscripciones a través de correo electrónico. El frontend permite a los usuarios ingresar su correo electrónico y suscribirse, mientras que el backend gestiona la suscripción, envía un correo de confirmación y mantiene un contador de las suscripciones.

## Descripción del Proyecto

El proyecto está dividido en dos partes:

### Frontend (React)
- Permite que los usuarios ingresen su correo electrónico para suscribirse.
- El formulario está validado con `zod` y `react-hook-form`.
- El backend se comunica con el frontend para almacenar las direcciones de correo en Firebase y enviar un correo de confirmación al usuario.
- Muestra un contador con el número de suscripciones.

### Backend (Express + Firebase)
- Utiliza `Express` como servidor.
- Los correos electrónicos de los usuarios son almacenados en Firebase Firestore.
- Utiliza `nodemailer` para enviar correos electrónicos a los usuarios al registrarse.
- Gestiona las suscripciones y muestra un contador de los correos suscritos.

## Tecnologías Usadas

### Frontend:
- React
- React Hook Form
- Zod
- Firebase (para obtener el contador de suscripciones)
- Tailwind CSS (para el estilo)
- shadcn (para algunos componentes)

### Backend:
- Express
- Firebase
- Nodemailer (para el envío de correos)
- CORS

## Instalación y Uso

### Requisitos previos:
- Tener `Node.js` instalado (se recomienda la versión LTS).
- Tener `Firebase` configurado en tu proyecto.

### Instalación del Backend:

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio/backend
2. Instala las dependencias del backend:
   ```bash
   npm install
   npm run start
- El servidor estará corriendo en http://localhost:5000.

### Instalación del Frontend:

1. Dirígete a la carpeta del frontend:
   ```bash
   cd tu-repositorio/frontend
2. Instala las dependencias del frontend:
   ```bash
   npm install
3. Inicia el servidor
   ```bash
   npm run start

- El servidor estará corriendo en http://localhost:5173.

## Uso
1. Accede al frontend en http://localhost:5173
2. Ingresa tu correo electrónico en el formulario y haz clic en "SUBSCRIBE".
3. Si el correo es válido y no está previamente registrado, recibirás un correo de confirmación.

## Nota Importantes

- En el archivo `.env` se incluyen las credenciales de Firebase y el correo electrónico para el envío de correos. Esto se hizo con el objetivo de facilitar la configuración y el inicio rápido del proyecto. Sin embargo, **en un entorno real, no es recomendable almacenar credenciales sensibles en un archivo `.env` dentro del repositorio**.

