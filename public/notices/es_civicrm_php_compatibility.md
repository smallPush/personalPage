# PHP2Shell y CiviCRM: qué actualizar ante la vulnerabilidad de PHP

**Si tu organización utiliza CiviCRM, pide al alojamiento que confirme la instalación de los parches de PHP2Shell en el PHP que sirve la web. Actualizar únicamente CiviCRM o el CMS no sustituye ese trabajo.** La prioridad es verificar el entorno real, aplicar la corrección y comprobar que los procesos de socios y donaciones siguen funcionando.

El 21 de octubre de 2026, PHP publicó actualizaciones frente a dos vulnerabilidades críticas. El [informe de Wiz sobre PHP2Shell](https://www.wiz.io/blog/php2shell-php-rce) describe ejecución remota de código sin autenticación y exposición de memoria en escenarios demostrados. Para una entidad que gestiona datos personales y aportaciones con CiviCRM, merece una revisión urgente del servidor.

*Por SmallPush · Revisado el 27 de octubre de 2026. Artículo actualizado para tratar específicamente PHP2Shell.*

## Qué es PHP2Shell

PHP2Shell agrupa fallos de seguridad de memoria del motor de PHP. Los avisos oficiales identifican dos problemas:

- **[CVE-2026-109618](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w):** el tratamiento de errores por agotamiento de memoria puede dejar estructuras internas en un estado inválido.
- **[CVE-2026-109619](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp):** un proceso puede conservar referencias a memoria de una petición anterior que ya se ha liberado.

En determinadas condiciones, estos fallos permiten ejecutar código con los permisos del proceso PHP. Eso no equivale automáticamente a obtener acceso de administrador del sistema, pero puede dar acceso a los recursos que ese proceso tenga autorizados.

## ¿Cómo puede afectar PHP2Shell a CiviCRM?

CiviCRM depende de PHP, tanto integrado con un CMS como en una instalación Standalone. Por ello, **la conclusión operativa es revisar también el PHP de los servidores de CiviCRM**. Es una inferencia basada en esa dependencia, no una afirmación de que se haya demostrado una explotación específica contra CiviCRM.

Wiz presenta demostraciones sobre WordPress, Drupal y Joomla. Esos ejemplos no prueban que todas las instalaciones de CiviCRM sean explotables: importan la versión de PHP, su configuración, el modo de ejecución y el código accesible. Tampoco permiten considerar segura una instalación por utilizar un CMS distinto o no utilizar CMS.

La [PHP Foundation explica el alcance técnico](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/), incluidos escenarios con Apache `mod_php` y PHP-FPM. Usar PHP-FPM no basta para descartar el problema.

### Qué datos y procesos de una ONG conviene proteger

En una revisión de CiviCRM, comprueba qué recursos puede consultar o modificar la cuenta del servidor web:

- Configuración y credenciales de acceso a las bases de datos.
- Datos personales de socios, donantes, voluntariado y participantes.
- Claves de servicios de correo, API e integraciones.
- Archivos adjuntos y documentos accesibles desde la aplicación.

Esta lista describe posibles consecuencias según los permisos y la arquitectura. No afirma que se haya producido una filtración. Si existen indicios de intrusión, el parche debe acompañarse de una investigación y de medidas sobre las credenciales que puedan haber quedado expuestas.

## Versiones de PHP corregidas para PHP2Shell

Los avisos de PHP señalan estas **primeras versiones corregidas de las ramas mantenidas**:

| Rama | Primera versión corregida |
| --- | --- |
| PHP 8.2 | 8.2.35 |
| PHP 8.3 | 8.3.36 |
| PHP 8.4 | 8.4.27 |
| PHP 8.5 | 8.5.12 |

Fuente: [avisos oficiales de seguridad de PHP del 21 de octubre](https://www.php.net/archive/2026.php#2026-10-21-5). Instala la actualización de seguridad vigente de tu rama o una posterior compatible; estos números son una referencia inicial, no una recomendación de quedarse indefinidamente en esa revisión.

Una distribución o un proveedor puede incorporar el parche a su propio paquete sin utilizar exactamente esa numeración. En ese caso, pide el aviso del proveedor y la revisión completa del paquete que acredita la corrección de ambos CVE. El número que muestra `php -v` no basta por sí solo para evaluar un paquete con correcciones incorporadas por el distribuidor.

### Aviso adicional del 23 de octubre: progreso de subida de sesiones

PHP publicó después una [recomendación sobre `session.upload_progress.enabled`](https://www.php.net/archive/2026.php#2026-10-23-1), asociada a un vector adicional en una combinación poco habitual de configuración y código. Recomienda desactivar esa función hasta la siguiente versión regular de correcciones; las aplicaciones que nunca cambian el serializador de sesiones durante la ejecución pueden mantenerla habilitada.

Pide al administrador que revise también ese aviso y aplique la recomendación correspondiente. Haber instalado una de las cuatro versiones de la tabla no sustituye consultar las indicaciones posteriores.

## Qué hacer en una instalación de CiviCRM

### 1. Identificar el PHP que recibe las peticiones web

Solicita un inventario por sitio, servidor, contenedor y conjunto de procesos PHP-FPM. Anota la versión, la procedencia del paquete y el modo de ejecución. Comprueba por separado el PHP de cron y de los procesos persistentes.

En la terminal, `php -v` ayuda a identificar **PHP CLI**. No demuestra qué versión está atendiendo formularios web ni que todos los procesos en ejecución hayan cargado la actualización. Evita publicar una página de diagnóstico con detalles del servidor.

### 2. Aplicar el parche y renovar los procesos

Coordina con el alojamiento la actualización de todos los entornos afectados y el reinicio o sustitución de los servicios y procesos correspondientes. En contenedores, verifica la imagen desplegada y las réplicas activas; cambiar únicamente la imagen de referencia no actualiza los contenedores que siguen ejecutándose.

Siempre que sea posible, aplica primero la corrección de tu rama compatible. Si necesitas cambiar de rama, contrasta los [requisitos oficiales de CiviCRM](https://docs.civicrm.org/installation/en/latest/requirements/) y los de tu CMS y extensiones. Prepara una copia restaurable y ensaya la operación sin demorar innecesariamente la corrección de un servicio expuesto.

### 3. Comprobar los procesos de la entidad

Valida acceso, altas y renovaciones, formularios públicos, adjuntos, correo y tareas programadas. Para las donaciones, utiliza el modo de pruebas de la pasarela y comprueba tanto el resultado del pago como su registro en el CRM. Nuestra [guía de métodos de pago de CiviCRM](/news/civicrm-payment-methods) ayuda a identificar las integraciones que deben entrar en la revisión.

Conserva como evidencia la revisión instalada, el aviso del proveedor, la fecha del cambio y las comprobaciones realizadas. Si el proveedor gestiona el servidor, pídele esta confirmación por escrito.

### 4. Revisar indicios de actividad anómala

La [guía de respuesta de PHP2Shell](https://www.php2shell.com/#upgrade-php) recoge señales como errores de memoria, respuestas 500 repetidas, reinicios inesperados de procesos y cookies de sesión anómalas. Sirven para orientar una investigación: por separado no prueban explotación, y su ausencia tampoco garantiza que no haya ocurrido.

Si encuentras señales relevantes, conserva los registros y coordina la respuesta antes de limpiar o reinstalar. Aplicar el parche detiene la exposición corregida, pero no deshace una intrusión anterior.

## Qué medidas no sustituyen la actualización de PHP

Un WAF, una CDN o una regla del alojamiento pueden reducir determinados caminos de ataque. No los presentes como una corrección completa. Consulta las [limitaciones de las mitigaciones oficiales](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w) antes de cambiar parámetros del servidor.

Tampoco basta con cambiar contraseñas, ocultar la versión de PHP o actualizar solo Drupal, WordPress o CiviCRM. Evita copiar ajustes de memoria sin evaluar sus consecuencias sobre disponibilidad y consumo de recursos.

## Preguntas frecuentes sobre PHP2Shell y CiviCRM

### ¿Una versión reciente de CiviCRM me protege?

Por sí sola no acredita que PHP esté corregido. Comprueba las dos capas y pide evidencia del paquete que ejecuta el sitio.

### ¿Tengo que migrar directamente a PHP 8.5?

No necesariamente. Hay correcciones para varias ramas. Prioriza una revisión corregida y compatible, y planifica por separado cualquier cambio de rama.

### ¿Un CRM accesible solo tras iniciar sesión queda fuera de riesgo?

No lo des por hecho. Algunas rutas se procesan antes del código de la aplicación. Revisa qué llega realmente a PHP, incluidos los formularios públicos y las integraciones.

### ¿Qué debo pedir al proveedor de hosting?

La confirmación de corrección de **CVE-2026-109618 y CVE-2026-109619**, el paquete instalado en el servicio web, la renovación de los procesos y la revisión del aviso del 23 de octubre. Incluye estos criterios en el [mantenimiento del alojamiento de CiviCRM](/news/civicrm-hosting-comparison).

## Convierte el aviso en una actuación comprobable

Para una ONG, la respuesta útil consiste en saber quién mantiene PHP, qué entornos están corregidos y qué pruebas confirman que la actividad continúa. El seguimiento debe cubrir tanto el CRM como la infraestructura que lo ejecuta.

En **SmallPush** ayudamos a revisar el entorno de CiviCRM y coordinar actualizaciones con el alojamiento. Si necesitas organizar esa revisión, [cuéntanos cómo está desplegada tu instalación](/#contact).
