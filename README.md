
# Manual de levantado de aplicación frontend

En este manual se encuentra las instrucciones sugeridas para el levantado de la aplicación frontend. En el manual se indica como realizar el levantado de la aplicacion en un ambiente de desarrollo, realizar la configuracion de las variables de ambiente, consturccion de la aplicacion para un ambiente de produccion y el levantado de la aplicacion en un ambiente de produccion haciendo uso de Docker.

Adicionalmente se puede usar el siguiente video tutorial: [https://drive.google.com/file/d/15A1S6e5-vGihDNPdR2eQZTK86FMyD6F7/view?usp=sharing](https://drive.google.com/file/d/15A1S6e5-vGihDNPdR2eQZTK86FMyD6F7/view?usp=sharing), como referencia mas detallada para realizar el levantado de la aplicacion frontend en un ambiente de desarrollo junto con su aplicacion backend complemento que se encuentra en el siguiente repositorio: [https://github.com/uhcoronaa/my-notes-app-be](https://github.com/uhcoronaa/my-notes-app-be), aplicacion que tambien cuenta con su propio manual de levantado y videotutorial correspondiente.

## Configuración de variables de ambiente

Para realizar el levantado de la aplicación se debe especificar en el archivo de variables de ambiente todas las direcciones a servicios externos utilizados en la aplicación, en este caso debe indicarse la direccion de los servicios de usuarios, categorías y notas.

Los archivos de variables de ambiente se encuentran en el directorio environments dentro del directorio src de la aplicación. Por defecto, Angular configura los archivos environment.ts y environment.prod.ts para el manejo de variables de ambientes de produccion y desarrollo. En el archivo environment.ts debe especificarse las direcciones correspondientes para el ambiente de desarrollo y en el archivo environment.prod.ts las direcciones correspondientes para un ambiente de producción.

![Archivo de variables de ambiente](https://drive.google.com/uc?export=view&id=1MrKAEqWbENyVkzO51whhTPmCWFtjZom2)

## Instalación de módulos

La instalación de módulos necesarios para el levantado de aplicacion es realizado con ayuda de Node.js y NPM como gestor de paquetes, contado con estas herramientas basta con hacer uso del comando de instalación “npm install” del gestor de paquetes dentro del directorio de la aplicación para realizar la instalación de todas las dependencias necesarias para el levantado de la aplicación.

![Instalacion de modulos](https://drive.google.com/uc?export=view&id=1UbAvytyCDhHopspeZbOaJFJgxWsz-NFf)

## Levantado de aplicación en modo desarrollo

Una vez realizada la configuración de variables de entorno y instalación de las dependencias de la aplicacion se puede iniciar con el levantado de la aplicación, para esto se recomienda hacer uso del ejecutor de paquetes de npx para evitar cualquier conflicto entre módulos de Angular instalados globalmente y entre los módulos utilizados en la aplicación, para realizar el levantado basta con hacer uso del comando "npx ng serve".

Al realizar el despliegue en modo desarrollo, la aplicación hará uso de las variables de entorno definidas para el ambiente de desarrollo, adicional a esto Angular hace uso de herramientas proporcionadas por defecto para que los cambios que se generen durante el desarrollo sean reflejados inmediatamente en el navegador durante la ejecución de la aplicación en un ambiente de desarrollo.

![Levantado de aplicacion en modo desarrollo](https://drive.google.com/uc?export=view&id=1Lz-J9wDPVE1o4VX04B-07BGtK4G2L8t_)

## Construcción de aplicación para entorno de producción

Para realizar la construccion de la aplicacion para un ambiente de producción debe realizarse todos los pasos previos definidos anteriormente. Posterior a los pasos anteriores basta con hacer uso del comando “npx ng build” junto con banderas de especificación indicando que el ambiente de despliegue para saber que variables deben utilizarse para la generación de los archivos finales de la construccion para ser en cualquier servidor de paginas web.

Al igual que con el despliegue en un entorno de desarrollo, se recomienda utilizar el ejecutor de paquetes de npx para evitar cualquier conflicto entre versiones de módulos. Los archivos finales optimizados de la aplicación podrán encontrarse en la carpeta dist del directorio de la aplicación, estos archivos son los empleados para el despliegue en cualquier servidor.

![Construccion de aplicacion para ambiente de produccion](https://drive.google.com/uc?export=view&id=1ws5KfvF4ZD7tKkpwZMpvDZDWRYiYO2cr)

## Levantado de aplicacion con Docker

Para un fácil despliegue se incluye en el directorio de la aplicación archivos de configuración de Docker para reducir la complejidad en el despliegue de la aplicación en un entorno de producción, este archivo de configuración se encarga de la construcción de la aplicación y del levantado de la aplicación en un servidor Nginx en el puerto 80 del servidor, es importante recordar que si bien Docker facilita el despliegue en producción es importante configurar las variables de ambiente como se indica en los pasos iniciales para evitar cualquier tipo de conflicto.

# Manual de uso de aplicacion web

La aplicación de ejemplo se encuentra desarrollada tanto para dispositivos móviles y de escritorio. El desarrollo de la aplicación con ejemplos está basada en la propuesta realizada en el trabajo de graduacion y cuenta con una sección de resumen en donde se puede visualizar y realizar pruebas de uso del estado de la aplicación desarrollada.

## Inicio de sesión

Gracias al desarrollo del Guard, al redireccionamiento de páginas y al manejo de sesiones, la página web redirecciona al inicio de sesión siempre que no exista una sesión activa en el navegador, en esta sección se encuentra un formulario en donde deben ser ingresadas las credenciales para hacer uso de la aplicación web, en caso de no contar con credenciales para el uso de la aplicación existe una opción para crear una cuenta para acceder a la aplicación.

![Inicio de sesion](https://drive.google.com/uc?export=view&id=1rC7mCBj79WFfQcYRKx3ErjTQS5tdB1Bt)

## Registro de usuario

De no contar con credenciales para el uso de la aplicación podemos crearlas desde el formulario de registro de la aplicación, este formulario puede ser accedido desde la opción de crear una cuenta que se encuentra en el inicio de sesión. Para realizar el registro es necesario llenar todos los campos marcados con *, ya que son requeridos para poder completar el registro, posterior al registro del usuario podremos contar con acceso a la aplicación y se manejara la sesión como se propuso en el desarrollo del trabajo de graduacion.

![Registro de usuario](https://drive.google.com/uc?export=view&id=1uywlGHlEFDRTG5TCRRzOmoLn2y5RxlgA)

## Pantalla de inicio

Posterior a realizar un registro de cuenta o realizar un inicio de sesión o en caso de ser existir una sesión previa, la aplicación redirigirá automáticamente a la pantalla de inicio de la aplicación, tal como se planteó en el manejo de Guards durante la propuesta del manejo de sesiones. En esta sección se encontrará la pantalla de bienvenida con el logo de la aplicación y un sidebar con las distintas secciones para el manejo de la aplicación, resumen de notas del usuario y el menú de manejo del usuario.

![Patanlla de inicio](https://drive.google.com/uc?export=view&id=16ykqwSsGGmvOFanDcQ07KBbS7_XxMX89)

## Listado de notas y categorías

Por defecto el listado de notas y categorías contarán con una pantalla que indique que el listado de elementos está vacío, al igual que la mayoría de las funcionalidades, esta pantalla hace uso del estado de la aplicación para saber si el listado se encuentra o no vacío. En esta pantalla se encontrará también por defecto la opción de agregar un nuevo elemento, ya sea existan o no elementos relacionados con la sección que se está trabajando.

![Listado de notas y categorias](https://drive.google.com/uc?export=view&id=1hY6BOLsdlGQ3ueJxP1iwc8PbPRjttR96)

En caso de existir elementos creados en cualquiera de las secciones, se tendrá un breve resumen del elemento y contará con la opción de edición y eliminación del elemento, en esta sección basta con seleccionar la opción de edición para ser redirigido a la pantalla de edición y seleccionar la opción de eliminar para eliminar un elemento.
![Listado de notas y categorias](https://drive.google.com/uc?export=view&id=1GWW7RoElf1QgTHh65lidrJu-KH0JLCud)

## Creación de notas y categorías

La creación de notas y categorías es llevada a cabo desde la sección del listado de elementos, es necesario seleccionar la opción crear para ser redirigidos a la pantalla de creación del elemento deseado, en esta sección se debe llenar los formularios con todos los campos requeridos marcados con * por la aplicación para poder crear un nuevo elemento, también es necesario resolver todos los errores informados por el componente en caso de existir previo a crear un nuevo elemento.

![Crear categoria y notas](https://drive.google.com/uc?export=view&id=1rWvLMyIzhrcca7u7DZlKcFqqW1II-tSt)

## Edición de notas y categorías

Posterior a seleccionar cualquier nota o categoría, a editar la aplicación, redireccionará a la pantalla de edición de elemento, esta sección funciona exactamente igual que la sección de crear elementos, por lo que es necesario llenar los campos requeridos del formulario y resolver los errores informados por parte del componente para editar un elemento.

![Edicion de notas y categorias](https://drive.google.com/uc?export=view&id=1OReSM6LjmxY32JOw6bvUYiW8CUr3dBT5)

## Ordenar notas

La sección de ordenado de notas funciona de forma muy similar a un tablero Kanban, basta con seleccionar cualquiera de las notas en el tablero y arrastrar dicha nota a la sección del estado en que se desea que la aplicación se encuentre. Esta sección funciona muy de la mano con el estado de la aplicación, ya que al modificar el estado de una nota el resumen de notas que se encuentra en el sidebar es actualizado automáticamente gracias a la modificación del estado al cambiar de estado cualquier nota.

![Ordenar notas](https://drive.google.com/uc?export=view&id=1UlEx-1jGlTYs_2fVZw6umengRIsb3MwU)

## Simulación de errores

Para visualizar de mejor manera el manejo del estado de una aplicación se incluyo una sección resumen donde se puede simular errores en la aplicación, en esta sección basta con seleccionar el tipo de error a generar y el mensaje de error a generar, también se cuenta con la opción de descartar errores para poder ver como estos errores son modificados desde el resumen del estado.

![Simulacion de error](https://drive.google.com/uc?export=view&id=1vOggeNAYGM4xTjUfm6gKNzBz0xo-cWPb)

Adicional a la simulación de errores podemos generar un error de forma manual al crear una categoría con el mismo nombre y descripción de cualquier otra categoría existente. Otras opciones para generar errores desde el servicio externo utilizado para el desarrollo de la aplicación puede ser la utilización de un nombre de usuario ya utilizado, notas con el mismo nombre, categoría y descripción y la creación de notas sin ninguna categoría generada.

![Error](https://drive.google.com/uc?export=view&id=1Lr7Gs5lSe_PfQ1fMepFyVCuzfm7WbbVU)

## Resumen de estado

Adicional a la posibilidad del uso de herramientas externas para visualizar el estado de la aplicación, se incluyó dentro de la aplicación ejemplo un resumen del estado actual de la aplicación, este estado cambia de forma automática con cada una de las acciones tomadas por el usuario desde cualquier parte de la aplicación o desde las acciones que pueden ser encontradas en la sección del resumen de estado.

![Resumen de estado](https://drive.google.com/uc?export=view&id=1ECek8-w6qgm8mRNHN-BzlLSAQ7V1f04o)

## Formularios sin guardar

Todos los formularios dentro de la aplicación, a excepción de los formularios de inicio de sesión y registro, cuentan con detección de cambios, por lo que si nos encontramos en el formulario de creación y seleccionamos desde el sidebar cualquiera de las secciones de la aplicación veremos la advertencia de cambios en un formulario siempre que este formulario aún no haya sido guardado, en esta sección bastara con que el usuario confirme si desea o no salir de la sección en la que se encuentra.

![Formulario sin guardar](https://drive.google.com/uc?export=view&id=1Dih2eW9IKJCoDpgPA3hGVIjV6YWMJMk8)

Adicional a encontrar esta funcionalidad en todos los formularios, se puede simular esta funcionalidad desde la sección de resumen de estado modificando el valor del formulario y saliendo de la sección de resumen de estado, en esta sección se podrá visualizar de mejor manera como los valores de los formularios de la aplicación son actualizados en el estado al cambiar su valor.

![Formulario sin guardar](https://drive.google.com/uc?export=view&id=1wyfFIR_VmLYaeeZaLsjz_2bLuMPEwcU9)

## Pantalla de carga

Todas las funciones de carga, guardado, edición y eliminación de notas, categorías y manejo de usuario cuentan con pantallas de carga durante la espera de respuesta por parte de un servicio externo, por lo que basta con crear o editar cualquier nota para poder visualizar esta funcionalidad.

Debido a que esta funcionalidad generalmente depende de la velocidad de internet, se incluyo un formulario de simulación de pantalla de carga en la sección de resumen de estado, en esta sección se puede definir la duración en segundos que se desea que la duración de la pantalla tenga para realizar dicha simulación, también es de utilidad para visualizar como en el estado esta carga es registrada durante la duración especificada en el formulario de simulación.

![Pantalla de carga](https://drive.google.com/uc?export=view&id=1dJArl-VotCboGC1kZ2Mzd4XP-x5gB1WK)

## Actualización de información de perfil

La información de perfil puede ser actualizada desde la sección de usuario encontrada en la parte inferior izquierda del sidebar de la aplicación, al seleccionar la modificación del perfil se redireccionará al formulario de actualización de perfil en donde se encuentra un formulario con los campos obligatorios a llenar y se tendrá la posibilidad de realizar el cambio de imagen de perfil. En caso de existir un error desde el servicio externo, el componente reaccionara ante dicho error e informara el error para que sea solucionado y se pueda proceder con la actualización de la información de perfil.

![Actualizacion de perfil](https://drive.google.com/uc?export=view&id=1_cBImv8hspqcU5yIWIpuvpXBOgGpixW3)

## Cambio de contraseña

El cambio de contraseña también podrá ser realizado a partir de la sección de usuario encontrada en la parte inferior izquierda del sidebar de la aplicación, una vez redirigido se encontrara un formulario en donde se ingresara la nueva contraseña, la cual debe ser confirmada para poder realizar el cambio, en caso de que las contraseñas no coincidan el componente informara dicho error para que la contraseña sea confirmada correctamente y se pueda realizar el cambio y pueda actualizarse la sesión activa basándose en una nueva autorización.

![Cambiar password](https://drive.google.com/uc?export=view&id=10YwlUQdQ3ZOtIQJt1hk_jXLuLsTc4FFs)