Proyecto E-Commerce de Coder

Proyecto de aplicación web e-commerce para Coderhouse con navegacion entre categorias, visualizacion de detalles de producto y manipilación el carrito de compras. En dicha app se alojan produtos, usuarios, sessiones, carrito de compras cargados en una base de datos no estructurada en Mongoose. Dicha app cuenta con los contadores sobre el detalle de cada producto en los cuales se pueden incrementar y decrementar la cantidad de elementos para confirmar la compra o en caso de arrempentirse por la cantidad se puede volver al estado anterior y e contador volver al estado inicial. Cuenta con un carrito en el cual aloja los elementos, ya confirmados para realizar la orden de compra, listados con sus detalles y totalizadores; se puede eliminar los diferentes items o tambien vaciar el carrito por completo sin antes confirmar la acción en un mensajes emergentes. Se ingresaron verifiaciones para el ingreso de datos en el formulario. Verifica en tiempo real, antes de realizar el pedido de orden, que la cantidad de producto solicitados se encuentren en sotck; esto puede disparar estas opciones: Caso afirmativo, hay disponibilidad de producto, la app genera la el pedido y luego la orden informando lo sucedido a raves de un mensaje emergente. Se registra en la base de Mongosse y además envia un correo electrónico informando los datos de comprador. Caso negativo, no hay algún/os producto/s, informa a traves de un mensaje emergente que el producto no se encuentra disponible y además se envia un correo electrónico para informar el/los faltante/s de producto al vendedor.

Bibliotecas utilizadas

MONGOOSE - es una herramienta esencial para desarrolladores que trabajan con MongoDB en aplicaciones Node.js.

CONNECT MONGO -  es una biblioteca esencial para la gestión de sesiones de usuario en aplicaciones Express.js que utilizan MongoDB como base de datos.

MULTER - es una biblioteca esencial para el manejo de cargas de archivos en aplicaciones Node.js.

SWAGGER - es una herramienta útil para documentar APIs en proyectos Node.js utilizando comentarios JSDoc y el formato Swagger.

PASSPORT -  es una biblioteca o middleware ampliamente utilizada que simplifica la autenticación de usuarios en aplicaciones web.
    - passport-google-oauth20 (es una estrategia diseñada para la autenticación de usuarios mediante OAuth 2.0 con Google).
    - passport-github2 (es una estrategia diseñada para la autenticación de usuarios mediante la plataforma GitHub utilizando OAuth 2.0).
    - passport-jwt (es una estrategia diseñada para la autenticación basada en tokens JWT en tus aplicaciones web y servicios API).
    - passport-local (es una estrategia  diseñada para la autenticación de usuarios mediante utilizando un nombre de usuario y contraseña almacenados en una base de datos local).

JSONWEBTOKEN - es una biblioteca esencial para la implementación de tokens JWT en aplicaciones web y servicios.

COOKIE PARSER - es una biblioteca esencial para el análisis y la gestión de cookies en aplicaciones Express.js.

EXPRESS SESSION - es una biblioteca esencial para la gestión de sesiones en aplicaciones Express.js. 

BCRYPT - es un algoritmo de cifrado de contraseñas sólido y altamente recomendado para garantizar la seguridad de las contraseñas en aplicaciones y sistemas. Su enfoque en la seguridad, su resistencia a ataques y su flexibilidad lo convierten en una elección confiable para proteger las credenciales de los usuarios.

NODEMAILER - es una herramienta confiable y poderosa para el envío de correos electrónicos desde aplicaciones Node.js.

SWEETALERT2 - libreria hace que los mensajes emergentes sean fáciles y bonitos.

BOOTSTRAP - es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página.

DOTEND - es una biblioteca fundamental para administrar variables de entorno y configuración en aplicaciones Node.js.

SOCKET IO - es una biblioteca esencial para habilitar la comunicación en tiempo real en aplicaciones web y móviles. Su facilidad de uso, compatibilidad cross-browser, escalabilidad y documentación completa la convierten en una elección sólida para desarrolladores que desean implementar funcionalidades de tiempo real en sus proyectos.