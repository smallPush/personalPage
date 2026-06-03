# Cómo crear un nuevo contacto en CiviCRM

![Guía esencial de gestión de contactos en CiviCRM](/notices/civicrm-contact-management.png)

La gestión de contactos es el corazón de CiviCRM. Antes de registrar donaciones, membresías, eventos o comunicaciones, necesitas una base de datos ordenada donde cada persona, organización u hogar esté creado correctamente.

Esta guía resume los pasos esenciales para crear un nuevo contacto y mantener la información preparada para crecer sin duplicados ni datos inconsistentes.

## 1. Elige el tipo de contacto correcto

CiviCRM trabaja con tres tipos base de contacto:

1. **Individuo:** personas físicas, como socias, donantes, voluntarias, alumnas o participantes. Normalmente requiere nombre, apellidos o correo electrónico.
2. **Organización:** empresas, entidades, ONGs, administraciones o instituciones. El campo clave suele ser el nombre de la organización.
3. **Hogar:** familias o grupos de personas que comparten ubicación o gestión conjunta. El campo principal es el nombre del hogar o familia.

Elegir bien el tipo desde el inicio facilita las búsquedas, los informes, las relaciones y las reglas de deduplicación.

## 2. Crear un contacto individual

Para crear una persona nueva:

1. Entra en **Contactos > Nuevo individuo**.
2. Completa los campos básicos: nombre, apellidos y correo electrónico si lo tienes disponible.
3. Añade teléfonos, dirección postal, idioma preferido y cualquier dato relevante para la organización.
4. Revisa que el contacto no exista ya en el sistema.
5. Guarda el registro.

Después de guardar, CiviCRM abre la ficha del contacto. Desde ahí puedes añadir actividades, relaciones, contribuciones, grupos, etiquetas, membresías o información personalizada.

## 3. Crear organizaciones y hogares

El proceso es similar, pero cambia el tipo de información que conviene registrar.

Para una **organización**, prioriza el nombre legal o comercial, correo general, teléfono, web, dirección y personas relacionadas. Las relaciones permiten conectar empleados, representantes, responsables de facturación o contactos principales.

Para un **hogar**, usa un nombre claro y consistente, como `Familia García López`, y relaciona a los miembros individuales. Esto es útil cuando se gestionan comunicaciones familiares, donaciones conjuntas o direcciones compartidas.

## 4. Usa las pestañas de la ficha de contacto

Una vez creado el contacto, la ficha se organiza en pestañas. Las más habituales son:

1. **Resumen:** datos principales, información de contacto y campos destacados.
2. **Relaciones:** vínculos con personas, organizaciones u hogares.
3. **Actividades:** llamadas, reuniones, correos, tareas y seguimientos.
4. **Contribuciones:** donaciones, pagos y cuotas económicas.
5. **Membresías:** estado, vigencia y tipo de afiliación si tu entidad las utiliza.

Estas pestañas ayudan a evitar que la información quede dispersa en notas externas o hojas de cálculo.

## 5. Evita duplicados desde el principio

Antes de crear un contacto, busca por nombre, correo electrónico o teléfono. CiviCRM también dispone de reglas de deduplicación:

1. **Reglas supervisadas:** se usan cuando una persona revisa posibles coincidencias antes de fusionar registros.
2. **Reglas no supervisadas:** se aplican automáticamente en procesos como importaciones o formularios públicos.

Cuando encuentres dos contactos duplicados, utiliza la opción de **fusionar registros** para conservar un registro maestro con la información correcta.

## 6. Importación masiva con CSV

Si necesitas crear muchos contactos a la vez, utiliza la importación CSV. Antes de importar:

1. Limpia nombres, correos y teléfonos.
2. Separa claramente individuos, organizaciones y hogares.
3. Mapea cada columna al campo correcto de CiviCRM.
4. Ejecuta una prueba con pocos registros.
5. Activa reglas de deduplicación para reducir duplicados.

Una importación bien preparada ahorra mucho trabajo posterior de limpieza.

## Buenas prácticas finales

1. Define una convención interna para nombres de organizaciones y hogares.
2. Registra solo datos útiles y mantenibles.
3. Usa relaciones en lugar de duplicar información.
4. Revisa periódicamente duplicados y datos incompletos.
5. Documenta los campos personalizados para que todo el equipo los use igual.

En **SmallPush**, ayudamos a organizaciones a configurar CiviCRM para que su gestión de contactos sea clara, escalable y útil desde el primer día. Si necesitas apoyo con tu CRM, [contáctanos](/#contact).
