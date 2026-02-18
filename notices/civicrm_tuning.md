# 🚀 Tuning Guide: How to Optimize the CiviCRM Database

If you notice that your contact searches are taking an eternity or that reports are locking up the site, the problem is likely not CiviCRM, but that your database engine is running on "factory settings."

CiviCRM is a powerful tool, but its deep relational architecture requires **MySQL/MariaDB** to be well-calibrated. Here we explain how to adjust the key parameters based on your resources.

---

## 🧠 The 3 Pillars of Optimization

### 1. The Heart of Performance: `innodb_buffer_pool_size`
This is the most critical parameter. It defines how much RAM the engine dedicates to caching data and table indexes.
* **The Rule:** It should be large enough to hold most of your active database.
* **Adjustment:** On a dedicated server, allocate between **70% and 80%** of the total RAM.
* **Quick Formula:** $$	ext{Buffer Pool} = 	ext{Total RAM} 	imes 0.75$$

### 2. Write Management: `innodb_log_file_size`
CiviCRM performs constant writes (activity logs, group changes, triggers). If this value is too small, the system will suffer frequent "checkpoints" that freeze the database while writing to disk.
* **Recommendation:** For medium/large sites, adjust between **256MB and 512MB**.

### 3. Temporary Tables and Complex Queries
Advanced CiviCRM searches often generate temporary tables. If `tmp_table_size` is insufficient, these are written to the hard disk, slowing down the entire process.
* **Adjustment:** Increase `tmp_table_size` and `max_heap_table_size` to **64MB or 128MB**.

---

## 📊 Parameter Reference Table

| Parameter | Suggested Value | Purpose |
| :--- | :--- | :--- |
| **`innodb_buffer_pool_size`** | 70-80% RAM | Memory data cache (vital). |
| **`innodb_flush_log_at_trx_commit`** | `2` | Speeds up writes (1s asynchrony). |
| **`query_cache_type`** | `0` (Disabled) | Avoids locks in modern versions. |
| **`thread_cache_size`** | `16` or higher | Saves CPU by reusing connections. |
| **`max_connections`** | `150 - 300` | Avoids "Too many connections" error. |

---

## 🛠️ Recommended Diagnostic Tools

Don't make changes blindly. Use these tools to audit your current status:

1.  **MySQLTuner:** A Perl script that analyzes your database and gives you exact recommendations based on actual usage over the last 24 hours.
2.  **CiviCRM System Status:** Always check the system status page within Civi for alerts about missing indexes.

> [!IMPORTANT]
> **Security Note:** Before modifying your `my.cnf` or `my.ini` file, ensure you perform a full database backup and test the changes in a staging environment.

---

### Need to go further?
If performance doesn't improve after these adjustments, you might have **fragmented indexes** or pending `civicrm_cache` table cleanup tasks.

**Would you like me to prepare a SQL script to automatically identify and clean up the cache tables that take up the most space in your CiviCRM?**
