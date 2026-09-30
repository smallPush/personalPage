const e=`# Cómo la Deducción Fiscal del 80% Multiplica el Ticket Medio de Donación: Guía Práctica de Mecenazgo con CiviCRM

¿Sabías que una donación de **250 € solo le cuesta realmente 50 €** a un donante particular en España?

Sin embargo, la inmensa mayoría de fundaciones y ONGs siguen cometiendo el mismo error estratégico: piden donaciones de 30 €, 50 € o 100 € sin explicar con claridad el impacto fiscal real. El resultado es que dejan miles de euros sobre la mesa y pierden la oportunidad de elevar el compromiso de su base social.

Con la reforma de la **Ley 49/2002 de Mecenazgo**, el tramo de deducción del **80% en el IRPF se amplió hasta los primeros 250 €** (anteriormente fijado en 150 €). En esta guía explicamos cómo utilizar este incentivo como palanca de captación y cómo automatizarlo técnicamente en **CiviCRM** para multiplicar el ticket medio de tus campañas.

---

## 1. La Matriz del Coste Real: De 250 € a 50 €

El principal freno a una donación más alta es la percepción de gasto inmediato. Cuando comunicas el **coste neto tras desgravación**, el marco mental del donante cambia por completo:

| Donación Nominal | Deducción IRPF (80% hasta 250 €) | **Coste Real para el Donante** |
| :---: | :---: | :---: |
| **50 €** | 40 € (80%) | **10 €** |
| **100 €** | 80 € (80%) | **20 €** |
| **150 €** | 120 € (80%) | **30 €** |
| **250 €** *(Tramo óptimo)* | **200 € (80%)** | **¡Solo 50 €!** |
| **500 €** | 300 € (200 € al 80% + 100 € al 40%) | **200 €** |

> **La paradoja del fundraiser**: Pedir 250 € explicando que el coste real es de solo 50 € suele generar **mayor tasa de conversión** y un ticket medio hasta un 65% superior que pedir 100 € en frío sin contexto fiscal.

Además, si el colaborador mantiene o incrementa su aportación durante 3 años consecutivos, la deducción sobre el importe que supere los 250 € pasa del **40% al 45% por fidelidad**.

---

## 2. El Embudo de Conversión Fiscal Automatizado

Para que esta ventaja se traduzca en donaciones reales en tu web, el donante debe visualizar el ahorro fiscal en el mismo instante en que elige el importe:

\`\`\`mermaid
flowchart TD
    A[Donante visita Formulario de Donación] --> B[Selecciona importe sugerido: 250 €]
    B --> C[Calculadora dinámica muestra: 'Te costará solo 50 €']
    C --> D[Captura y validación en tiempo real del NIF/NIE]
    D --> E[Pago instantáneo con Bizum, Tarjeta o SEPA]
    E --> F[CiviCRM registra la contribución]
    F --> G[Email de agradecimiento con desglose fiscal y recibo deducible]
    F --> H[Segmentación automática para Modelo 182 y Campaña de Fin de Año]
\`\`\`

---

## 3. Tres Tácticas para Implementar en CiviCRM

### Táctica 1: Rediseñar los botones de importe con anclaje en 250 €
En tus formularios integrados de CiviCRM (o en tu pasarela conectada con Drupal/WordPress), configura los botones de donación predeterminados con el cálculo visible:

- \`50 €\` *(Te cuesta 10 € tras IRPF)*
- \`150 €\` *(Te cuesta 30 € tras IRPF)*
- **\`250 €\` — Recomendada** *(¡Te cuesta solo 50 € tras IRPF!)*
- \`Otro importe\`

Colocar el botón de 250 € como opción destacada aprovecha el sesgo cognitivo de anclaje (*anchoring*), orientando la decisión del usuario hacia el máximo beneficio fiscal.

### Táctica 2: Automatizar la validación del NIF antes del pago
Para que el donante pueda disfrutar de la deducción del 80%, la entidad debe incluir su NIF en el **Modelo 182**. 

Si dejas el campo de NIF como opcional, perderás hasta el 40% de los datos fiscales. La mejor práctica en CiviCRM es:
1. Hacer el campo NIF/NIE obligatorio en formularios de donación puntual y periódica.
2. Añadir validación sintáctica en tiempo real (evita errores tipográficos en la letra de control).
3. Recordar bajo el campo: *"Imprescindible para que Hacienda te devuelva hasta el 80% de tu donación"*.

### Táctica 3: La Campaña de "Top-Up" en Diciembre
Entre noviembre y diciembre, utiliza los grupos inteligentes (*Smart Groups*) de CiviCRM para identificar a todos los donantes que hayan aportado entre **50 € y 200 € a lo largo del año**:

- **Filtro CiviCRM**: Contactos con donaciones totales en el año en curso \`>= 50 €\` y \`< 250 €\`.
- **Mensaje**: *"¡Hola [Nombre]! Este año ya has colaborado con 100 €. Si aportas 150 € más antes del 31 de diciembre para completar el tramo de 250 €, Hacienda te devolverá 120 € adicionales en tu próxima declaración. Tu coste real de ampliar tu ayuda hoy será de solo 30 €."*

Esta campaña de cierre de ejercicio tiene tasas de apertura superiores al 45% y convierte a donantes ocasionales en donantes recurrentes de alto valor.

---

## 4. Checklist para Ponerlo en Marcha

- [ ] Actualizar los textos y botones de tus páginas de donación destacando la deducción del 80%.
- [ ] Verificar que la extensión del Modelo 182 en CiviCRM esté configurada con los porcentajes vigentes de la Ley de Mecenazgo.
- [ ] Configurar tokens automáticos en la plantilla de correo de confirmación de CiviCRM mostrando el importe donado y el importe estimado a desgravar.
- [ ] Programar la campaña de "Top-Up de tramo fiscal" para noviembre-diciembre.

¿Quieres que auditemos tus formularios de donación y configuremos tus flujos fiscales automáticos en CiviCRM? En **SmallPush** ayudamos a fundaciones y ONGs a diseñar embudos de captación de alto rendimiento.
`;export{e as default};
