# CiviCRM y PHP: problemas de compatibilidad y cómo resolverlos

Un cambio de PHP en el alojamiento puede dejar CiviCRM con un error 500, un formulario de donación bloqueado o tareas automáticas que ya no se ejecutan. Para una ONG, la incidencia puede traducirse en aportaciones sin registrar, renovaciones pendientes y trabajo manual para reconstruir lo ocurrido.

**La solución empieza por comprobar la compatibilidad de todo el conjunto: PHP, CiviCRM, el CMS y las extensiones.** Después hay que reproducir el fallo, preparar la actualización en un entorno de pruebas y validar los procesos de la entidad antes de cambiar producción.

*Por SmallPush · Revisión técnica: 27 de octubre de 2026.*

## Por qué una actualización de PHP puede romper CiviCRM

PHP es el lenguaje con el que se ejecuta CiviCRM en el servidor. Cada nueva rama introduce cambios que pueden afectar a código antiguo. Además, el núcleo de CiviCRM, las extensiones y el CMS tienen calendarios de actualización distintos.

Esto explica una situación habitual: el proveedor cambia PHP, la web pública sigue funcionando y el error aparece únicamente al abrir una ficha, confirmar un pago o procesar una cola. Que la portada cargue no demuestra que el CRM funcione correctamente.

Si utilizas CiviCRM sobre Drupal, WordPress, Joomla o Backdrop, revisa también ese CMS y sus módulos. En una instalación Standalone, comprueba igualmente las extensiones y las integraciones externas.

## Qué versión de PHP es compatible con CiviCRM

No existe una respuesta única para todas las instalaciones. Consulta los [requisitos oficiales de CiviCRM](https://docs.civicrm.org/installation/en/latest/requirements/) para tu versión concreta y contrástalos con las notas de cada extensión.

Como ejemplo de por qué importa la rama: la documentación distingue CiviCRM 6.10, que no es compatible con PHP 8.4, de CiviCRM 6.16 o posterior, para el que contempla PHP 8.5. Es información sobre el núcleo, no una garantía para toda tu instalación.

También hay que distinguir **compatibilidad** de **soporte de seguridad**. Según el [calendario oficial de PHP](https://www.php.net/supported-versions.php), estas son las fechas de fin de soporte de seguridad:

| Rama PHP | Fin del soporte de seguridad |
| --- | --- |
| 8.2 | 31 de diciembre de 2026 |
| 8.3 | 31 de diciembre de 2027 |
| 8.4 | 31 de diciembre de 2028 |
| 8.5 | 31 de diciembre de 2029 |

Si sigues en PHP 8.2, prepara la migración antes de que termine 2026. Elige una rama mantenida que admita todo tu conjunto de software; la versión más reciente del servidor no siempre es la que puedes implantar de inmediato. Revisa de nuevo las fuentes al ejecutar el cambio, porque la compatibilidad evoluciona.

## Errores frecuentes de PHP en CiviCRM

Estos síntomas orientan el diagnóstico, pero ninguno identifica por sí solo la causa:

| Síntoma | Qué comprobar primero |
| --- | --- |
| Pantalla en blanco o error 500 tras cambiar PHP | Primer error fatal en los registros de PHP y del servidor |
| Avisos `Deprecated` | Archivo y extensión que originan el aviso |
| Error `TypeError` o función inexistente | Traza del error, código personalizado y dependencias |
| La web funciona, pero cron falla | PHP y configuración del usuario que ejecuta cron |
| Donación cobrada con estado pendiente en CiviCRM | Notificación de la pasarela y registro de la integración |
| Importaciones o informes interrumpidos | Límites de memoria, tiempos de ejecución y consulta que falla |

Los avisos `Deprecated` señalan código que necesita adaptación; no equivalen automáticamente a un error fatal. Por ejemplo, PHP documenta cambios sobre [propiedades dinámicas en PHP 8.2](https://www.php.net/manual/en/migration82.deprecated.php) y [parámetros implícitamente anulables en PHP 8.4](https://www.php.net/manual/en/migration84.deprecated.php). La traza permite saber si afectan a tu instalación.

Ocultar todos los avisos no corrige la incompatibilidad. En producción, evita mostrar detalles técnicos a visitantes y conserva registros accesibles al equipo responsable. Tampoco desactives una extensión de pagos sin estudiar qué procesos dependen de ella.

## Cómo diagnosticar el problema sin perder información

### 1. Anota el cambio y reproduce la operación

Registra las versiones exactas de PHP, CiviCRM, CMS y extensiones, cuándo empezó el fallo y qué se modificó. Describe una operación concreta: «al enviar el formulario de alta aparece un error 500» resulta más útil que «CiviCRM no funciona».

Consulta los registros en el instante de la prueba y localiza el primer error relevante. Los mensajes posteriores pueden ser consecuencias del fallo inicial. Comparte con soporte una traza depurada de credenciales y datos personales.

### 2. Compara el PHP de la web con el de cron

En la terminal, estos comandos permiten consultar el entorno de PHP por línea de comandos:

```bash
php -v
php --ini
php -m
```

**Su salida describe PHP CLI, no el PHP del servidor web.** Contrástala con la configuración del sitio y del proceso PHP-FPM en tu alojamiento. Revisa además la ruta al ejecutable y el usuario definidos en cron: pueden estar utilizando otro PHP u otro archivo `php.ini`.

Si una tarea manual funciona pero la ejecución automática falla, comprueba el historial y la hora de la última ejecución. La [guía oficial de tareas programadas](https://docs.civicrm.org/sysadmin/en/latest/setup/jobs/) explica cómo revisar ese circuito.

### 3. Separa compatibilidad de rendimiento

Una función eliminada no se recupera aumentando `memory_limit`. En cambio, un proceso que agota memoria requiere estudiar el volumen de datos y sus límites. Si la lentitud es anterior al cambio de PHP, revisa también nuestra [guía de rendimiento y base de datos de CiviCRM](/news/civicrm-tuning).

## Cómo actualizar PHP y CiviCRM con un plan verificable

La [guía oficial de actualización de CiviCRM](https://docs.civicrm.org/sysadmin/en/latest/upgrade/) es el punto de partida. Adapta el procedimiento al CMS y documenta los pasos que hayas validado:

1. **Define la combinación de destino.** Comprueba núcleo, CMS, extensiones, código propio y pasarelas. Si no hay una versión de PHP común entre origen y destino, planifica etapas intermedias compatibles.
2. **Prepara una copia restaurable.** Incluye bases de datos de CiviCRM y del CMS, archivos, configuración y extensiones. Ensaya la restauración.
3. **Crea un entorno de pruebas aislado.** Bloquea correos a contactos reales, cobros, webhooks de producción y tareas que puedan producir efectos externos. Utiliza las opciones de prueba de cada proveedor.
4. **Ejecuta la actualización ensayada.** Sigue las instrucciones específicas de las versiones implicadas y limpia las cachés cuando corresponda. Conserva un registro de cada cambio.
5. **Valida procesos completos.** Prueba un alta, una renovación, una donación en modo de pruebas, su notificación, el correo y una tarea programada. Verifica también permisos, importaciones e informes habituales.
6. **Programa el cambio en producción.** Acuerda la pausa de escrituras y tareas, realiza una copia final y aplica el procedimiento probado. Supervisa los primeros ciclos automáticos tras reactivarlos.

Para los pagos, comprueba que el estado de la contribución coincide con el resultado de la pasarela. Nuestra [guía de métodos de pago en CiviCRM](/news/civicrm-payment-methods) ayuda a situar las integraciones que debes incluir en las pruebas.

Define también cómo volver atrás. Si se ha actualizado el esquema de datos, cambiar únicamente el código o bajar PHP puede ser insuficiente: necesitas restaurar un conjunto coherente. Antes de hacerlo, conserva y concilia las operaciones posteriores a la copia para evitar perder registros o repetir cobros y mensajes.

## Preguntas frecuentes sobre PHP y CiviCRM

### ¿Puedo solucionar el error volviendo a la versión anterior de PHP?

Puede servir como medida temporal si esa rama sigue mantenida y continúa siendo compatible con el código instalado. Si también cambiaste CiviCRM o su base de datos, analiza todo el cambio antes de revertir. Una bajada de PHP no sustituye un plan de actualización.

### ¿Por qué falla CiviCRM si WordPress o Drupal funcionan?

La página pública y el CRM ejecutan rutas de código diferentes. Un módulo, una extensión o un proceso de pago puede fallar aunque el CMS muestre la portada. Prueba la operación afectada y revisa su traza.

### ¿Actualizar PHP mejora el rendimiento de CiviCRM?

Puede ayudar, pero el resultado depende de las consultas, las extensiones y los recursos del servidor. Compara los mismos procesos y volúmenes antes y después; no atribuyas a PHP una mejora que no hayas medido.

### ¿Qué debo pedir al proveedor de alojamiento?

La versión de PHP de cada sitio y de cron, el calendario de cambios, acceso a registros y copias, y un entorno para ensayar. Incluye estos requisitos al [elegir hosting para CiviCRM](/news/civicrm-hosting-comparison).

## Prepara el siguiente cambio antes de que se convierta en una incidencia

Mantén un inventario de versiones, un responsable del mantenimiento y pruebas de los procesos que sostienen la actividad de tu entidad. Eso permite programar las actualizaciones y detectar un fallo antes de que afecte a socios y donantes.

En **SmallPush** revisamos instalaciones de CiviCRM y planificamos actualizaciones de PHP, CMS y extensiones. Si tu organización recibe avisos del alojamiento o ya tiene errores, [cuéntanos qué versiones utilizas y qué operación falla](/#contact) para valorar el siguiente paso.
