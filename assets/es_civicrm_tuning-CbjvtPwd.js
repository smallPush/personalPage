const e=`# 🚀 Guía de Tuning: Cómo optimizar la Base de Datos de CiviCRM

Si notas que tus búsquedas de contactos tardan una eternidad o que los reportes bloquean el sitio, el problema probablemente no es CiviCRM, sino que tu motor de base de datos está trabajando con la "configuración de fábrica".

CiviCRM es una herramienta potente, pero su arquitectura relacional profunda requiere que **MySQL/MariaDB** esté bien calibrado. Aquí te explicamos cómo ajustar los parámetros clave en función de tus recursos.

---

## 🧠 Los 3 Pilares de la Optimización

### 1. El corazón del rendimiento: \`innodb_buffer_pool_size\`
Este es el parámetro más crítico. Define cuánta memoria RAM dedica el motor a cachear datos e índices de tablas.
* **La Regla:** Debe ser lo suficientemente grande para albergar la mayor parte de tu base de datos activa.
* **Ajuste:** En un servidor dedicado, asigna entre el **70% y 80%** de la RAM total.
* **Fórmula rápida:** $$\\text{Buffer Pool} = \\text{RAM Total} \\times 0.75$$

### 2. Gestión de escrituras: \`innodb_log_file_size\`
CiviCRM realiza escrituras constantes (logs de actividad, cambios de grupos, triggers). Si este valor es muy pequeño, el sistema sufrirá "checkpoints" frecuentes que congelan la base de datos mientras se escribe al disco.
* **Recomendación:** Para sitios medianos/grandes, ajusta entre **256MB y 512MB**.

### 3. Tablas temporales y consultas complejas
Las búsquedas avanzadas de CiviCRM suelen generar tablas temporales. Si \`tmp_table_size\` es insuficiente, estas se escriben en el disco duro, ralentizando todo el proceso.
* **Ajuste:** Sube \`tmp_table_size\` y \`max_heap_table_size\` a **64MB o 128MB**.

---

## 📊 Tabla de Referencia de Parámetros

| Parámetro | Valor Sugerido | Propósito |
| :--- | :--- | :--- |
| **\`innodb_buffer_pool_size\`** | 70-80% RAM | Caché de datos en memoria (vital). |
| **\`innodb_flush_log_at_trx_commit\`** | \`2\` | Acelera escrituras (asincronía de 1s). |
| **\`query_cache_type\`** | \`0\` (Desactivado) | Evita bloqueos en versiones modernas. |
| **\`thread_cache_size\`** | \`16\` o superior | Ahorra CPU al reutilizar conexiones. |
| **\`max_connections\`** | \`150 - 300\` | Evita el error "Too many connections". |

---

## 🛠️ Herramientas de diagnóstico recomendadas

No hagas cambios a ciegas. Utiliza estas herramientas para auditar tu estado actual:

1.  **MySQLTuner:** Un script en Perl que analiza tu base de datos y te da recomendaciones exactas basadas en el uso real de las últimas 24 horas.
2.  **CiviCRM System Status:** Revisa siempre la página de estado del sistema dentro de Civi para alertas sobre índices faltantes.

> [!IMPORTANT]
> **Nota de Seguridad:** Antes de modificar tu archivo \`my.cnf\` o \`my.ini\`, asegúrate de realizar un backup completo de la base de datos y probar los cambios en un entorno de staging.

---

### ¿Necesitas ir más allá?
Si después de estos ajustes el rendimiento no mejora, es posible que tengas **índices fragmentados** o tareas de limpieza de tablas \`civicrm_cache\` pendientes.
`;export{e as default};
