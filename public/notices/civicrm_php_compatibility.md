# CiviCRM and PHP: compatibility problems and how to fix them

A PHP change at your hosting provider can leave CiviCRM returning an HTTP 500 error, blocking a donation form or silently missing scheduled jobs. For a nonprofit, that can mean unrecorded contributions, overdue renewals and hours spent reconciling what happened.

**Start by checking compatibility across PHP, CiviCRM, your CMS and extensions.** Then reproduce the failure, rehearse the upgrade in a test environment and validate your organisation's workflows before changing production.

*By SmallPush · Technical review: 27 October 2026.*

## Why a PHP upgrade can break CiviCRM

PHP runs CiviCRM on the server. New branches introduce changes that can affect older code, while CiviCRM core, extensions and the CMS follow separate release schedules.

That creates a familiar incident: the provider changes PHP, the public website still works, but opening a contact, confirming a payment or processing a queue fails. A working home page does not prove that the CRM works.

For CiviCRM on Drupal, WordPress, Joomla or Backdrop, include the CMS and its modules in your review. Standalone installations still need their extensions and external integrations checked.

## Which PHP version is compatible with CiviCRM?

There is no universal answer. Check the [official CiviCRM requirements](https://docs.civicrm.org/installation/en/latest/requirements/) for your particular release and compare them with each extension's release notes.

For example, the documentation distinguishes CiviCRM 6.10, which does not support PHP 8.4, from CiviCRM 6.16 and later, where PHP 8.5 is supported. These statements concern core compatibility, not every component of your installation.

Also distinguish **compatibility** from **security support**. The [official PHP lifecycle](https://www.php.net/supported-versions.php) gives these security support deadlines:

| PHP branch | Security support ends |
| --- | --- |
| 8.2 | 31 December 2026 |
| 8.3 | 31 December 2027 |
| 8.4 | 31 December 2028 |
| 8.5 | 31 December 2029 |

If you still run PHP 8.2, plan your migration before the end of 2026. Choose a maintained branch supported by your whole software stack. The newest PHP release may require application upgrades first. Recheck the sources when implementing the change, since compatibility evolves.

## Common PHP errors in CiviCRM

These symptoms guide investigation; none proves a particular cause:

| Symptom | First check |
| --- | --- |
| Blank page or HTTP 500 after changing PHP | First fatal error in PHP and server logs |
| `Deprecated` notices | File and extension producing the notice |
| `TypeError` or missing function | Stack trace, custom code and dependencies |
| Website works but cron fails | PHP executable and configuration used by cron |
| Payment taken but contribution still pending | Gateway notification and integration logs |
| Interrupted imports or reports | Memory limits, execution time and failing query |

`Deprecated` notices identify code that needs adaptation; they are not automatically fatal errors. PHP documents changes involving [dynamic properties in PHP 8.2](https://www.php.net/manual/en/migration82.deprecated.php) and [implicitly nullable parameters in PHP 8.4](https://www.php.net/manual/en/migration84.deprecated.php). The stack trace helps determine whether they affect your installation.

Hiding every notice does not fix incompatible code. Keep technical details out of public responses while retaining logs for maintainers. Before disabling a payment extension, establish which workflows depend on it.

## Diagnose the problem without losing information

### 1. Record the change and reproduce the operation

Write down exact PHP, CiviCRM, CMS and extension versions, when the failure started and what changed. Describe an operation: “submitting the membership form returns HTTP 500” is more useful than “CiviCRM is broken”.

Inspect logs at the time of the test and find the first relevant error. Later messages may be consequences. Remove credentials and personal information from any trace shared with support.

### 2. Compare web PHP with cron PHP

These terminal commands inspect the command-line environment:

```bash
php -v
php --ini
php -m
```

**Their output describes PHP CLI, not the web server's PHP.** Compare it with the site's hosting settings and PHP-FPM configuration. Check the executable path and user in cron too: they may select another PHP version or `php.ini` file.

If a manual task succeeds but its automatic run fails, inspect its history and last execution time. The [official scheduled jobs guide](https://docs.civicrm.org/sysadmin/en/latest/setup/jobs/) explains how that execution path works.

### 3. Separate compatibility from performance

Increasing `memory_limit` cannot restore a removed function. A process running out of memory needs a different investigation into data volume and resource limits. For slowness predating the PHP change, also review our [CiviCRM database performance guide](/news/civicrm-tuning).

## Upgrade PHP and CiviCRM with a verifiable plan

Use the [official CiviCRM upgrade guide](https://docs.civicrm.org/sysadmin/en/latest/upgrade/) as your starting point. Adapt it to your CMS and record the steps you validate:

1. **Define the target combination.** Check core, CMS, extensions, custom code and gateways. If source and target share no supported PHP version, plan compatible intermediate steps.
2. **Prepare a restorable backup.** Include both CRM and CMS databases, files, configuration and extensions. Rehearse the restore.
3. **Isolate the test environment.** Block real supporter emails, live charges, production webhooks and jobs with external effects. Use each provider's test facilities.
4. **Rehearse the upgrade.** Follow version-specific instructions, clear caches where required and record each change.
5. **Validate complete workflows.** Test a registration, renewal, sandbox donation, payment notification, email and scheduled job. Check permissions, imports and everyday reports too.
6. **Schedule production work.** Agree a pause for writes and jobs, take a final backup and apply the rehearsed procedure. Monitor the first automatic cycles after resuming them.

For payments, verify that the contribution status matches the gateway result. Our [CiviCRM payment integration guide](/news/civicrm-payment-methods) helps identify the integrations to include in testing.

Define rollback as well. After a database schema upgrade, replacing code or downgrading PHP alone may be insufficient: restore a consistent set of components. Before restoring, preserve and reconcile operations recorded since the backup so you do not lose records or repeat charges and messages.

## Frequently asked questions about PHP and CiviCRM

### Can switching back to the previous PHP version fix the error?

It may provide a temporary recovery if that branch remains maintained and supports the installed code. If CiviCRM or its database also changed, assess the entire change before reverting. A PHP downgrade does not replace an upgrade plan.

### Why does CiviCRM fail when WordPress or Drupal still works?

The public website and CRM execute different code paths. An extension, module or payment workflow can fail while the CMS home page loads normally. Test the affected operation and inspect its trace.

### Will a PHP upgrade make CiviCRM faster?

It may help, but results depend on queries, extensions and server resources. Compare the same workflows and data volumes before and after the upgrade. Measure the result before attributing an improvement to PHP.

### What should I ask my hosting provider?

Ask for each site's and cron's PHP version, the change schedule, access to logs and backups, and a rehearsal environment. Include these requirements when [choosing CiviCRM hosting](/news/civicrm-hosting-comparison).

## Prepare the next change before it becomes an incident

Maintain a version inventory, assign maintenance responsibility and keep tests for the workflows your organisation depends on. This makes upgrades easier to schedule and failures easier to detect before supporters are affected.

At **SmallPush**, we review CiviCRM installations and plan PHP, CMS and extension upgrades. If your host has announced changes or you already see errors, [tell us your versions and the failing operation](/#contact) so we can assess the next step.
