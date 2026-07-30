const e=`# 5 automatizaciones esenciales de CiviCRM para ahorrar trabajo a una ONG

![Un contacto avanza por un flujo de cinco automatizaciones en CiviCRM](/notices/civicrm-automations.svg)

Cada alta, donación o renovación genera pequeñas tareas: enviar una bienvenida, comprobar un pago, avisar al equipo o actualizar un grupo. Cuando estas acciones dependen de una hoja de cálculo o de la memoria de una persona, llegan tarde, se duplican o directamente no se realizan.

CiviCRM permite automatizar buena parte de este trabajo mediante recordatorios programados, grupos inteligentes, plantillas, tareas periódicas e integraciones. El objetivo no es enviar más mensajes, sino ejecutar cada acción en el momento adecuado, mantener la trazabilidad y reservar el tiempo del equipo para las relaciones que sí necesitan atención humana.

## Antes de automatizar: define el proceso

Una automatización fiable empieza fuera de la herramienta. Para cada flujo, responde cinco preguntas:

1. **Disparador:** ¿qué dato o evento pone en marcha el proceso?
2. **Condiciones:** ¿quién debe entrar y quién debe quedar excluido?
3. **Acción:** ¿se envía un mensaje, se crea una actividad o se actualiza un grupo?
4. **Salida:** ¿qué cambio detiene o completa el flujo?
5. **Responsable:** ¿quién revisa los errores y las excepciones?

Empieza por un proceso frecuente, estable y fácil de medir. Automatizar un procedimiento confuso solo consigue que los errores ocurran más deprisa.

## 1. Bienvenida a nuevas personas socias, donantes o voluntarias

La primera comunicación confirma que el registro se ha realizado correctamente y explica el siguiente paso. No conviene enviar el mismo mensaje a todo el mundo: una persona socia, una donante puntual y una voluntaria tienen expectativas distintas.

Un flujo sencillo puede:

1. Detectar una nueva membresía, contribución o incorporación a un grupo.
2. Seleccionar la plantilla correspondiente al tipo de relación.
3. Enviar una confirmación inmediata.
4. Programar un segundo mensaje con recursos útiles unos días después.
5. Crear una actividad para el equipo cuando el contacto requiere seguimiento personal.

Incluye solo una llamada a la acción principal: completar datos, conocer las ventajas de la membresía o elegir cómo participar. Registra el envío como actividad para que cualquier integrante del equipo pueda entender qué ha recibido el contacto.

## 2. Renovación de membresías antes de que caduquen

Esperar a que una membresía haya vencido reduce las posibilidades de renovación. Los [recordatorios programados de CiviCRM](https://docs.civicrm.org/user/en/latest/email/scheduled-reminders/) pueden utilizar la fecha de fin y el estado de la membresía para iniciar una secuencia.

Por ejemplo:

1. Primer aviso 30 días antes de la fecha de vencimiento.
2. Recordatorio breve 7 días antes.
3. Confirmación y agradecimiento cuando se registra la renovación.
4. Último mensaje después del vencimiento, con un canal de ayuda.

El flujo debe excluir a quienes ya hayan renovado y diferenciar las membresías con renovación automática. Utiliza enlaces personalizados cuando proceda y comprueba que una modificación de la fecha de fin retire al contacto de los siguientes avisos.

## 3. Recuperación de pagos recurrentes fallidos

Un fallo de cobro no siempre significa que la persona quiera dejar de colaborar. Puede deberse a una tarjeta caducada, un saldo insuficiente o una incidencia temporal. Una respuesta rápida y respetuosa puede evitar una baja involuntaria.

El circuito recomendado es:

1. El procesador de pagos comunica el fallo a CiviCRM.
2. La aportación queda registrada con su estado real, sin marcarla manualmente como completada.
3. Se envía un mensaje claro con una vía segura para actualizar el medio de pago.
4. Si la incidencia continúa, se crea una tarea para revisión humana.
5. Cuando el pago se recupera, se cierra el seguimiento y se detienen los avisos.

No incluyas datos bancarios sensibles en correos ni generes reintentos sin conocer el comportamiento del procesador. La capacidad de gestionar recurrencias depende de la pasarela y de su integración con CiviCRM, por lo que este flujo debe probarse de extremo a extremo.

## 4. Agradecimiento y seguimiento después de una donación

El recibo confirma una transacción; el agradecimiento construye una relación. Además de la confirmación inmediata, puedes crear un seguimiento adaptado al contexto:

1. Agradecimiento con el importe, la campaña y el destino de la aportación.
2. Mensaje posterior que explique el impacto conseguido.
3. Aviso interno para aportaciones que requieren atención personal.
4. Segmentación de donantes recurrentes, recuperados o de primera vez.

Evita convertir cada donación en una cadena comercial. Define límites de frecuencia y coordina el flujo con el calendario general de comunicaciones. Para envíos masivos, CiviMail permite gestionar bajas y rebotes; consulta estos indicadores para no insistir en direcciones inválidas.

## 5. Tareas internas y reactivación de contactos

No toda automatización tiene que enviar un correo. Algunas de las más útiles crean trabajo ordenado para el equipo:

1. Asignar una llamada cuando una aportación supera un umbral acordado.
2. Avisar de una actividad pendiente o de un documento que caduca.
3. Incorporar a un grupo inteligente a quienes no han participado durante un periodo.
4. Crear una tarea de revisión cuando faltan datos imprescindibles.
5. Retirar de una campaña a quien ya ha respondido.

Los recordatorios programados cubren muchos escenarios basados en fechas, actividades, contribuciones y membresías. Para reglas del tipo **disparador + condiciones + acciones**, la extensión [CiviRules](https://docs.civicrm.org/civirules/en/latest/) ofrece flujos más avanzados. Las necesidades que dependan de sistemas externos pueden requerir la API o una integración específica.

## Controles que toda automatización necesita

Antes de activar un flujo para toda la base de datos:

1. **Prueba con contactos internos.** Comprueba contenido, enlaces, fechas y remitentes.
2. **Respeta consentimientos y preferencias.** Distingue las comunicaciones operativas de las promocionales.
3. **Evita duplicados.** Una misma persona no debe entrar dos veces por registros o condiciones solapadas.
4. **Define una condición de salida.** Una renovación o un pago recuperado debe detener los avisos pendientes.
5. **Conserva trazabilidad.** Registra mensajes, actividades y cambios relevantes.
6. **Configura las tareas programadas.** Los recordatorios y las colas dependen de que los [trabajos programados y cron](https://docs.civicrm.org/user/en/latest/initial-set-up/scheduled-jobs/) funcionen con la frecuencia adecuada.
7. **Asigna un responsable.** Toda automatización necesita supervisión, aunque funcione correctamente.

## Qué medir

No midas únicamente cuántos mensajes se envían. Relaciona cada flujo con un resultado:

| Automatización | Indicador principal |
| --- | --- |
| Bienvenida | Datos completados o primera participación |
| Renovación | Porcentaje de membresías renovadas |
| Pago fallido | Aportaciones recurrentes recuperadas |
| Agradecimiento | Retención y respuesta de donantes |
| Seguimiento interno | Tareas resueltas dentro del plazo |

Revisa también los rebotes, las bajas, las excepciones y el tiempo manual ahorrado. Si el equipo necesita corregir constantemente el resultado, el flujo todavía no está bien diseñado.

## Empieza con un flujo pequeño

No es necesario automatizar todo CiviCRM a la vez. Elige una tarea repetitiva, documenta su estado actual, crea una versión sencilla y ejecútala primero con un grupo controlado. Cuando los datos y las condiciones sean fiables, amplía el alcance.

En **SmallPush** diseñamos e implementamos automatizaciones de CiviCRM adaptadas a los procesos reales de ONG y organizaciones. Si tu equipo dedica demasiado tiempo a avisos, renovaciones o seguimientos manuales, [hablemos](/#contact).
`;export{e as default};
