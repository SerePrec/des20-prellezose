# Desafío 20 - Programación Backend

### CoderHouse

## MEJORAR LA ARQUITECTURA DE NUESTRA API

Retomemos nuestro trabajo para implementar los patrones de diseño Factory, DAO y DTO.

### Consigna

Modificar la capa de persistencia incorporando los conceptos de Factory, DAO, y DTO.

Los DAOs deben presentar la misma interfaz hacia la lógica de negocio de nuestro servidor.

El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con el.

Cada uno de estos casos de persistencia, deberán ser implementados usando el patrón singleton que impida crear nuevas instancias de estos mecanismos de acceso a los datos.

Comprobar que si llamo a la factory dos veces, con una misma opción elegida, devuelva la misma instancia.

Implementar el patrón Repository para la persistencia de productos y mensajes.

### Deploy en Heroku (Temporal):

https://des19-prellezose.herokuapp.com/

### Ejecución

Luego de clonar o descargar el repositorio e instalar todas las dependencias con `npm install`, existen dos comandos para levantar el proyecto.
Para levantarlo en modo de desarrollo junto a nodemon, utilizar `npm run dev`. De lo contrario, para ejecutarlo en "modo producción", utilizar `npm start`.

Se puede pasar por parámetros de argumento dos opciones:
| Opción | Valor | Defecto |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-p --port --PORT` | Número de puerto de escucha del servidor | 8080 |
| `-m --mode --MODE` | Módo de ejecución del servidor. `FORK` o `CLUSTER` | FORK |

Se puede seleccionar entre cuatro métodos de **persistencia de datos** a través de la variable de entorno `PERS`.

| Key             | Descripción                                               |
| --------------- | --------------------------------------------------------- |
| `mem`           | Persistencia en memoria del servidor (Opción por defecto) |
| `file`          | Persistencia usando el sistema de archivos                |
| `mongodb`       | Persistencia en base de datos MongoDB local               |
| `mongodb_atlas` | Persistencia en base de datos MongoDB Atlas               |

Esta selección se hace pasando el valor correspondiente de la key en la variable de entorno `PERS` a la hora de levantar el servidor.
La forma de hacerlo depende de la terminal que se esté ejecutando. Un ejemplo desde linux sería:

```sh
$ PERS=mongodb_atlas node .
```

### Vistas

Existen las siguientes vistas que proveen una manera amena de probar el desafío.
Estas vistas se encuentran en las rutas:

- **/** : es la vista principal en donde se encuentra el formulario de carga de productos y el centro de mensajes (chat). Utiliza **websockets**. Requiere autenticación.

- **/login** : formulario de login.

- **/login-error** : vista a la que redirige tras un error en el login.

- **/register** : formulario de registro.

- **/register-error** : vista a la que redirige tras un error en el login.

- **/logout** : vista a la que se accede tras hacer el logout y luego de 5 segundos redirige a home.

- **/productos-mock** : es donde se muestra en una tabla el mock de productos devueltos por la llamada a la API en la ruta de test. Requiere autenticación

- **/info**: muestra información relativa a la app

### API

Consiste en las siguientes rutas:

##### Router /api/productos

| Método | Endpoint                | Descripción                                                        |
| ------ | ----------------------- | ------------------------------------------------------------------ |
| GET    | **/api/productos/**     | Me permite listar todos los productos disponibles                  |
| POST   | **/api/productos/**     | Para incorporar productos al listado                               |
| GET    | **/api/productos/:id**  | Me permite listar un producto por su id                            |
| PUT    | **/api/productos/:id**  | Actualiza un producto por su id. Admite actualizaciones parciales  |
| DELETE | **/api/productos/:id**  | Borra un producto por su id                                        |
| GET    | **/api/productos-test** | Devuelve un listado de 5 productos mock generados con **Faker.js** |

#### Router /api/randoms

| Método | Endpoint         | Descripción                                                                                                                                                                                                                 |
| ------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | **/api/randoms** | Devuelve una cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query). Por ej: `/api/randoms?cant=20000`. Si dicho parámetro no se ingresa, calcula 100.000.000 de números. |

### Detalles y comentarios

Tomando como base la estructura de carpetas del último desafío en donde ya había hecho una división de componentes: **rutas**, **controladores**,**middlewares**, **servicios** y **modelos**, comencé reorganizando la carpeta `model`.
Dentro de esta carpeta y agrupado en subcarpetas, se encuentran:

- `BaseDAOs`: DAOs para las distintas persistencias, a partir de los cuales se extienden los DAOs particulares
- `DAOs`: aquí se encuentran los DAOs de las distintas persistencias agrupados por entidades junto a la **Factory** correspondiente.
- `DTOs`: se ubican los DTOs separados por entidades
- `entities`: clases que definen las entidades y sus validaciones
- `schemas`: schemas de **mongoose**
- `index.js`: archivo de índice que exporta los DAOs. Desde este archivo se importan las distintas **Factories** y se les pide el DAO correspondiente para luego exportarlos.

Cada **Factory** toma como parámetro la persistencia elegida `PERS` y al llamar a su método `get`, nos devuelve el DAO correspondiente a dicha persistencia.

Los DAOs implementan el patrón **singleton** para impedir crear más de una instancia de estos mecanismos de acceso a los datos.  
Puede verse en el archivo índice que a propósito se instanció por segunda vez cada DAO y luego se muestra por consola la comparación de ambas instancias para cada uno de los casos, comprobándose que se trata de la misma instancia.

Se implementó el patrón **Repository** para la persistencia de los productos y mensajes. Dentro de la carpeta `repositories` se encuentra el repositorio base junto a los particulares que extienden de éste.
Para no hacer 2 versiones de la entrega, se implementó el patrón **Repository** por encima de la capa de DAO.

Se refactorizó la lógica de validaciones de datos, usando métodos estáticos respectivos de cada entidad. Para facilitar y mejorar la lógica de dichas validaciones se implementó la librería **Joi**
