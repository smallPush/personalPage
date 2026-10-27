const e=`# PHP2Shell and CiviCRM: what to update after the PHP security advisory

**If your organisation uses CiviCRM, ask your host to confirm that PHP2Shell fixes are installed in the PHP runtime serving your website. Updating CiviCRM or the CMS alone does not replace that work.** Verify the actual environment, apply the fix and check that membership and donation workflows still work.

On 21 October 2026, PHP released updates addressing two critical vulnerabilities. The [Wiz PHP2Shell report](https://www.wiz.io/blog/php2shell-php-rce) describes unauthenticated remote code execution and memory disclosure in demonstrated scenarios. Nonprofits managing personal information and contributions in CiviCRM should urgently review their servers.

*By SmallPush · Reviewed on 27 October 2026. Updated to address PHP2Shell specifically.*

## What is PHP2Shell?

PHP2Shell groups memory-safety flaws in the PHP engine. The official advisories identify two issues:

- **[CVE-2026-109618](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w):** out-of-memory error handling can leave internal structures in an invalid state.
- **[CVE-2026-109619](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp):** a process can retain references to memory already freed after an earlier request.

Under particular conditions, these flaws allow code execution with the PHP worker's permissions. That does not automatically mean system administrator access, but it can expose resources that the worker is authorised to use.

## How could PHP2Shell affect CiviCRM?

CiviCRM depends on PHP, whether integrated with a CMS or running Standalone. **The operational conclusion is to review the PHP runtimes hosting CiviCRM too.** This is an inference from that dependency, not a claim that a CiviCRM-specific exploit has been demonstrated.

Wiz presents demonstrations against WordPress, Drupal and Joomla. Those examples do not establish that every CiviCRM deployment is exploitable: PHP version, configuration, execution mode and reachable code matter. Nor do they establish safety for installations using another CMS or no CMS.

The [PHP Foundation explains the technical scope](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/), including Apache \`mod_php\` and PHP-FPM scenarios. Using PHP-FPM alone does not rule out exposure.

### Which nonprofit resources should you review?

For a CiviCRM deployment, check what the web server account can read or modify:

- Database configuration and credentials.
- Personal information about members, donors, volunteers and participants.
- Email service credentials, API keys and integration secrets.
- Attachments and documents accessible to the application.

These are possible consequences depending on permissions and architecture, not evidence of a breach. Where intrusion indicators exist, accompany patching with investigation and action on credentials that may have been exposed.

## PHP versions fixed for PHP2Shell

PHP's advisories identify these **first fixed versions in maintained branches**:

| Branch | First fixed version |
| --- | --- |
| PHP 8.2 | 8.2.35 |
| PHP 8.3 | 8.3.36 |
| PHP 8.4 | 8.4.27 |
| PHP 8.5 | 8.5.12 |

Source: [official PHP security announcements of 21 October](https://www.php.net/archive/2026.php#2026-10-21-5). Install your branch's current security update or a later compatible release. These numbers are initial reference points, not a recommendation to stay on those patch levels indefinitely.

A distribution or hosting provider may backport the fix without adopting exactly these version numbers. Ask for its advisory and the complete package revision confirming fixes for both CVEs. The output of \`php -v\` alone cannot establish the security status of a package with distribution backports.

### Additional 23 October advisory: session upload progress

PHP subsequently published [guidance about \`session.upload_progress.enabled\`](https://www.php.net/archive/2026.php#2026-10-23-1) concerning an additional vector under an unusual combination of configuration and application code. It recommends disabling the feature until the next regular bugfix release; applications that never change their session serializer at runtime may keep it enabled.

Ask your administrator to review and apply that guidance as appropriate. Installing one of the four releases above does not replace checking subsequent recommendations.

## What to do for a CiviCRM installation

### 1. Identify the PHP runtime serving web requests

Request an inventory covering each site, server, container and PHP-FPM pool. Record the version, package source and execution mode. Check cron and persistent PHP processes separately.

In a terminal, \`php -v\` identifies **PHP CLI**. It does not establish which runtime serves web forms or whether running workers have loaded an update. Avoid publishing a diagnostic page exposing server details.

### 2. Patch and replace running workers

Coordinate updates across affected environments with your host, then restart or replace the relevant services and processes. For containers, verify deployed images and active replicas: changing an image reference does not update containers that are already running.

Where possible, apply the fix within your compatible branch first. If a branch migration is necessary, check the [official CiviCRM requirements](https://docs.civicrm.org/installation/en/latest/requirements/) alongside CMS and extension requirements. Prepare a restorable backup and rehearse the operation without unnecessarily delaying remediation of an exposed service.

### 3. Validate your organisation's workflows

Check login, registrations and renewals, public forms, attachments, email and scheduled jobs. For donations, use the gateway's test mode and verify both the payment result and its CRM record. Our [CiviCRM payment methods guide](/news/civicrm-payment-methods) helps identify integrations to include.

Retain the installed package revision, provider advisory, change date and validation results. If the host manages the server, request written confirmation.

### 4. Investigate unusual activity

The [PHP2Shell response guide](https://www.php2shell.com/#upgrade-php) lists signals such as memory errors, repeated HTTP 500 responses, unexpected worker restarts and abnormal session cookies. They can guide investigation; individually they do not prove exploitation, and their absence does not prove that none occurred.

Preserve logs and coordinate incident response before cleaning or reinstalling where relevant signals exist. A patch addresses the corrected exposure but cannot undo an earlier intrusion.

## Which measures do not replace updating PHP?

A WAF, CDN or hosting rule may reduce particular attack paths. Do not treat it as a complete fix. Read the [limitations of official mitigations](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w) before changing server parameters.

Changing passwords, hiding the PHP version or updating only Drupal, WordPress or CiviCRM is insufficient. Avoid copying memory settings without assessing their effect on resource use and availability.

## PHP2Shell and CiviCRM: frequently asked questions

### Does a recent CiviCRM version protect me?

It does not by itself establish that PHP is patched. Check both layers and request evidence for the package actually running the site.

### Must I migrate directly to PHP 8.5?

Not necessarily. Fixes exist for several branches. Prioritise a patched, compatible revision and plan a branch migration separately.

### Is a CRM behind an application login outside the risk?

Do not assume so. Some paths run before application code. Review what actually reaches PHP, including public forms and integrations.

### What should I ask my host?

Confirmation that **CVE-2026-109618 and CVE-2026-109619** are fixed, the package running the web service, worker restarts and review of the 23 October advisory. Include these criteria in your [CiviCRM hosting maintenance](/news/civicrm-hosting-comparison).

## Turn the advisory into verifiable action

For a nonprofit, an effective response identifies who maintains PHP, which environments are patched and which checks confirm continued operations. Cover both the CRM and the infrastructure running it.

At **SmallPush**, we help review CiviCRM environments and coordinate updates with hosting providers. To organise that review, [tell us how your installation is deployed](/#contact).
`;export{e as default};
