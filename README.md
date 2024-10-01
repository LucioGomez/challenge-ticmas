API de Gestión de Tareas
Este proyecto es una API RESTful construida con Node.js y Express.js que permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) sobre el recurso Tareas. La API también incluye funcionalidades adicionales como la gestión de estados de tareas y el cálculo del tiempo transcurrido desde la creación de cada tarea.

Requisitos Previos
Node.js v12 o superior
MySQL u otro motor de base de datos SQL compatible
Postman o cualquier cliente HTTP para probar los endpoints

*En el archivo database.js, encontrarás la configuración de la conexión a la base de datos. Es importante que actualices los valores de la base de datos, usuario, contraseña, host y puerto según tu entorno local o el servidor donde implementes el proyecto. A continuación se muestra un ejemplo de cómo se configura la conexión utilizando Sequelize:*

const sequelize = new Sequelize("tasks", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

Reemplaza *"tasks"* con el nombre de tu base de datos.

Reemplaza *"root"* en el segundo parámetro con el nombre de usuario de tu base de datos.

Reemplaza *"root"* en el tercer parámetro con la contraseña de tu base de datos.

Asegúrate de que host y port coincidan con los de tu servidor MySQL.

Inicia el servidor:

npm start

El servidor correrá en http://localhost:4000.

POST	/api/task	Crear una nueva tarea

GET	/api/tasks	Obtener la lista de todas las tareas

GET	/api/task/:id	Obtener los detalles de una tarea específica por su ID

PUT	/api/task/:id	Actualizar una tarea (título y descripción)

DELETE	/api/task/:id	Borrar lógicamente una tarea por su ID

GET	/api/task/status/:idStatus	Obtener tareas filtradas por su estado

PUT	/api/task/:idTask/change/:idStatus	Cambiar el estado de una tarea

GET	/api/task/times/:id	Obtener el número de días transcurridos desde la creación de una tarea

Estados
POST	/api/status	Crear un nuevo estado

GET	/api/statuses	Obtener todos los estados disponibles

GET	/api/status/:id	Obtener un estado específico por su ID

PUT	/api/status/:id	Editar un estado existente

DELETE	/api/status/:id	Borrar lógicamente un estado por su ID
