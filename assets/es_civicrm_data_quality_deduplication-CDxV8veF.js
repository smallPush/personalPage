const a=`# Calidad de datos en CiviCRM: guía práctica de deduplicación

![Dos contactos duplicados que se convierten en un único registro verificado en CiviCRM](/notices/civicrm-data-quality.svg)

Un CRM solo resulta útil cuando el equipo puede confiar en sus datos. Los contactos duplicados dividen el historial de donaciones, generan comunicaciones repetidas y reducen la fiabilidad de los informes. Para una ONG no es únicamente un problema técnico: afecta a la relación con personas socias, donantes y voluntarias.

Esta guía explica cómo detectar duplicados en CiviCRM, configurar reglas de coincidencia razonables y prevenir nuevos problemas durante las importaciones y el trabajo diario.

## 1. Empieza con una auditoría de calidad

Antes de cambiar reglas o fusionar registros, mide la situación actual. Revisa una muestra representativa y busca:

1. Direcciones de correo repetidas en contactos diferentes.
2. Nombres similares con el mismo teléfono o dirección postal.
3. Organizaciones registradas unas veces con siglas y otras con su nombre legal.
4. Contactos sin un identificador estable, como correo, teléfono o número de persona socia.
5. Registros incompletos creados por formularios, integraciones o importaciones antiguas.

Haz una copia de seguridad antes de iniciar una limpieza amplia. Una fusión modifica el historial de los contactos, por lo que debe tratarse como una operación de datos controlada y no como una tarea estética.

## 2. Entiende las reglas de deduplicación

CiviCRM compara campos y les asigna pesos para determinar si dos contactos pueden representar a la misma persona u organización. Las reglas se configuran por separado para individuos, organizaciones y hogares.

Los tres usos habituales cumplen funciones diferentes:

1. **No supervisado:** reglas estrictas para procesos automáticos en los que nadie revisa el resultado, como formularios públicos o determinadas importaciones.
2. **Supervisado:** reglas más amplias que muestran posibles coincidencias para que una persona las revise.
3. **General:** reglas disponibles para búsquedas y flujos administrativos concretos.

Una regla automática debe dar prioridad a identificadores sólidos. La coincidencia exacta del correo o del número de persona socia suele ser más segura que usar solo el nombre. Una regla supervisada puede combinar nombre, teléfono, código postal o fecha de nacimiento.

## 3. Diseña las reglas según tus datos reales

No existe una regla universal válida para todas las organizaciones. Una buena configuración refleja cómo recoge los datos tu entidad.

Para individuos, puedes valorar combinaciones como:

1. Correo electrónico exacto.
2. Nombre, apellidos y teléfono.
3. Nombre, apellidos y código postal.
4. Un identificador externo o número de persona socia único.

Para organizaciones, combina el nombre con el dominio web, teléfono, identificador fiscal o código postal. Evita las fusiones automáticas basadas únicamente en nombres comunes: dos personas pueden llamarse igual y distintas sedes pueden pertenecer a una misma organización.

Prueba cada regla nueva con duplicados y no duplicados conocidos. Si no detecta coincidencias evidentes, puede ser demasiado estricta. Si produce muchos falsos positivos, probablemente sea demasiado amplia.

## 4. Revisa y fusiona con seguridad

Utiliza **Contactos > Buscar y fusionar contactos duplicados** para ejecutar una regla y revisar las parejas candidatas. Antes de fusionar:

1. Compara nombres, correos, direcciones e identificadores externos.
2. Revisa contribuciones, membresías, actividades, grupos y relaciones.
3. Elige como registro principal el que contenga la información más fiable.
4. Decide campo por campo qué valores deben conservarse.
5. Confirma que ambos registros pertenecen realmente a la misma persona u organización.

No fusiones coincidencias dudosas solo para reducir la lista de resultados. Una fusión incorrecta suele ser más difícil de reparar que un duplicado pendiente de revisión.

## 5. Evita duplicados en las importaciones CSV

Las importaciones son una de las fuentes más frecuentes de duplicados. Antes de subir un archivo CSV:

1. Elimina filas vacías y normaliza espacios, mayúsculas y códigos de país.
2. Separa los individuos de las organizaciones.
3. Valida los correos y estandariza el formato de los teléfonos.
4. Incluye un identificador estable siempre que sea posible.
5. Selecciona la regla de deduplicación y el comportamiento de importación adecuados.
6. Haz una prueba con un lote pequeño antes de procesar el archivo completo.
7. Guarda el mapeo de campos si la importación se repetirá.

Documenta si la importación debe omitir contactos existentes, actualizarlos o rellenar únicamente campos vacíos. Esta decisión debe ser explícita; de lo contrario, se puede sobrescribir información válida o crear registros innecesarios.

## 6. Mejora la entrada de datos desde el origen

La limpieza resuelve el problema actual, pero la prevención reduce el trabajo futuro. Mantén los formularios públicos breves, solicita solo información útil y valida los campos antes de que lleguen a CiviCRM. Al integrar plataformas externas, define qué sistema es responsable de cada campo y utiliza identificadores estables entre sistemas.

Dentro del equipo, acordad convenciones sencillas para nombres de organizaciones, teléfonos, direcciones y etiquetas. Limita los campos de texto libre innecesarios y explica cómo buscar antes de crear un contacto nuevo.

La minimización de datos también favorece la privacidad: almacenar menos información irrelevante u obsoleta facilita el mantenimiento de la base de datos y reduce riesgos.

## 7. Establece una rutina de mantenimiento

Una revisión mensual ligera es más eficaz que una gran limpieza anual. Controla algunos indicadores:

1. Número de posibles parejas duplicadas.
2. Porcentaje de contactos sin correo u otro identificador útil.
3. Direcciones de correo no válidas o con rebotes.
4. Importaciones e integraciones que generan más duplicados.
5. Registros que no se han actualizado durante un periodo definido.

Asigna la responsabilidad de revisar los resultados y documentar las decisiones. La calidad mejora cuando forma parte del gobierno habitual del CRM y no de un proyecto técnico ocasional.

## Lista de comprobación final

1. Haz una copia de seguridad antes de realizar fusiones masivas.
2. Utiliza reglas más estrictas para coincidencias automáticas que para revisiones humanas.
3. Prueba las reglas con ejemplos reales antes de aplicarlas ampliamente.
4. Revisa el historial económico y de membresías antes de cada fusión.
5. Ejecuta importaciones de prueba pequeñas y conserva los mapeos reutilizables.
6. Mide periódicamente la calidad y corrige los problemas en su origen.

En **SmallPush**, ayudamos a las ONG a auditar, limpiar y configurar CiviCRM para que sus equipos trabajen con datos fiables. Si los contactos duplicados afectan a tus comunicaciones o informes, [contacta con nosotros](/#contact).
`;export{a as default};
