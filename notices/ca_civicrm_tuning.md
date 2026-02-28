# 🚀 Guia de Tuning: Com optimitzar la Base de Dades de CiviCRM

Si notes que les teves cerques de contactes triguen una eternitat o que els informes bloquegen el lloc, el problema probablement no és CiviCRM, sinó que el teu motor de base de dades està treballant amb la "configuració de fàbrica".

CiviCRM és una eina potent, però la seva arquitectura relacional profunda requereix que **MySQL/MariaDB** estigui ben calibrat. Aquí t'expliquem com ajustar els paràmetres clau en funció dels teus recursos.

---

## 🧠 Els 3 Pilars de l'Optimització

### 1. El cor del rendiment: `innodb_buffer_pool_size`
Aquest és el paràmetre més crític. Defineix quanta memòria RAM dedica el motor a cachejar dades i índexs de taules.
* **La Regla:** Ha de ser prou gran per albergar la major part de la teva base de dades activa.
* **Ajust:** En un servidor dedicat, assigna entre el **70% i 80%** de la RAM total.
* **Fórmula ràpida:** $$\text{Buffer Pool} = \text{RAM Total} \times 0.75$$

### 2. Gestió d'escriptures: `innodb_log_file_size`
CiviCRM realitza escriptures constants (logs d'activitat, canvis de grups, triggers). Si aquest valor és molt petit, el sistema patirà "checkpoints" freqüents que congelen la base de dades mentre s'escriu al disc.
* **Recomanació:** Per a llocs mitjans/grans, ajusta entre **256MB i 512MB**.

### 3. Taules temporals i consultes complexes
Les cerques avançades de CiviCRM solen generar taules temporals. Si `tmp_table_size` és insuficient, aquestes s'escriuen al disc dur, alentint tot el procés.
* **Ajust:** Puja `tmp_table_size` i `max_heap_table_size` a **64MB o 128MB**.

---

## 📊 Taula de Referència de Paràmetres

| Paràmetre | Valor Suggerit | Propòsit |
| :--- | :--- | :--- |
| **`innodb_buffer_pool_size`** | 70-80% RAM | Memòria cau de dades (vital). |
| **`innodb_flush_log_at_trx_commit`** | `2` | Accelera escriptures (asincronia d'1s). |
| **`query_cache_type`** | `0` (Desactivat) | Evita bloquejos en versions modernes. |
| **`thread_cache_size`** | `16` o superior | Estalvia CPU en reutilitzar connexions. |
| **`max_connections`** | `150 - 300` | Evita l'error "Too many connections". |

---

## 🛠️ Eines de diagnòstic recomanades

No facis canvis a cegues. Utilitza aquestes eines per auditar el teu estat actual:

1.  **MySQLTuner:** Un script en Perl que analitza la teva base de dades i et dóna recomanacions exactes basades en l'ús real de les últimes 24 hores.
2.  **CiviCRM System Status:** Revisa sempre la pàgina d'estat del sistema dins de Civi per a alertes sobre índexs faltants.

> [!IMPORTANT]
> **Nota de Seguretat:** Abans de modificar el teu fitxer `my.cnf` o `my.ini`, assegura't de realitzar una còpia de seguretat completa de la base de dades i provar els canvis en un entorn de staging.

---

### Necessites anar més enllà?
Si després d'aquests ajustos el rendiment no millora, és possible que tinguis **índexs fragmentats** o tasques de neteja de taules `civicrm_cache` pendents.

**T'agradaria que prepari un script SQL per identificar i netejar automàticament les taules de memòria cau que més espai ocupen al teu CiviCRM?**
