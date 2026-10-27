const e=`# PHP2Shell i CiviCRM: què cal actualitzar davant la vulnerabilitat de PHP

**Si la teva organització utilitza CiviCRM, demana a l'allotjament que confirmi la instal·lació dels pedaços de PHP2Shell al PHP que serveix el web. Actualitzar només CiviCRM o el CMS no substitueix aquesta feina.** La prioritat és verificar l'entorn real, aplicar la correcció i comprovar que els processos de socis i donacions continuen funcionant.

El 21 d'octubre de 2026, PHP va publicar actualitzacions davant de dues vulnerabilitats crítiques. L'[informe de Wiz sobre PHP2Shell](https://www.wiz.io/blog/php2shell-php-rce) descriu execució remota de codi sense autenticació i exposició de memòria en escenaris demostrats. Per a una entitat que gestiona dades personals i aportacions amb CiviCRM, cal revisar urgentment el servidor.

*Per SmallPush · Revisat el 27 d'octubre de 2026. Article actualitzat per tractar específicament PHP2Shell.*

## Què és PHP2Shell

PHP2Shell agrupa errors de seguretat de memòria del motor de PHP. Els avisos oficials identifiquen dos problemes:

- **[CVE-2026-109618](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w):** el tractament d'errors per esgotament de memòria pot deixar estructures internes en un estat invàlid.
- **[CVE-2026-109619](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp):** un procés pot conservar referències a memòria d'una petició anterior que ja s'ha alliberat.

En determinades condicions, aquests errors permeten executar codi amb els permisos del procés PHP. Això no equival automàticament a obtenir accés d'administrador del sistema, però pot donar accés als recursos que el procés tingui autoritzats.

## Com pot afectar PHP2Shell a CiviCRM?

CiviCRM depèn de PHP, tant integrat amb un CMS com en una instal·lació Standalone. Per això, **la conclusió operativa és revisar també el PHP dels servidors de CiviCRM**. És una inferència basada en aquesta dependència, no una afirmació que s'hagi demostrat una explotació específica contra CiviCRM.

Wiz presenta demostracions sobre WordPress, Drupal i Joomla. Aquests exemples no proven que totes les instal·lacions de CiviCRM siguin explotables: importen la versió de PHP, la configuració, el mode d'execució i el codi accessible. Tampoc permeten considerar segura una instal·lació perquè utilitzi un altre CMS o no n'utilitzi cap.

La [PHP Foundation explica l'abast tècnic](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/), inclosos escenaris amb Apache \`mod_php\` i PHP-FPM. Fer servir PHP-FPM no basta per descartar el problema.

### Quines dades i processos d'una ONG convé protegir

En una revisió de CiviCRM, comprova quins recursos pot consultar o modificar el compte del servidor web:

- Configuració i credencials d'accés a les bases de dades.
- Dades personals de socis, donants, voluntariat i participants.
- Claus de serveis de correu, API i integracions.
- Fitxers adjunts i documents accessibles des de l'aplicació.

Aquesta llista descriu conseqüències possibles segons els permisos i l'arquitectura. No afirma que s'hagi produït una filtració. Si hi ha indicis d'intrusió, el pedaç ha d'anar acompanyat d'una investigació i de mesures sobre les credencials que puguin haver quedat exposades.

## Versions de PHP corregides per a PHP2Shell

Els avisos de PHP indiquen aquestes **primeres versions corregides de les branques mantingudes**:

| Branca | Primera versió corregida |
| --- | --- |
| PHP 8.2 | 8.2.35 |
| PHP 8.3 | 8.3.36 |
| PHP 8.4 | 8.4.27 |
| PHP 8.5 | 8.5.12 |

Font: [avisos oficials de seguretat de PHP del 21 d'octubre](https://www.php.net/archive/2026.php#2026-10-21-5). Instal·la l'actualització de seguretat vigent de la teva branca o una de posterior compatible; aquests números són una referència inicial, no una recomanació de quedar-se indefinidament en aquella revisió.

Una distribució o un proveïdor pot incorporar el pedaç al seu paquet sense utilitzar exactament aquesta numeració. En aquest cas, demana l'avís del proveïdor i la revisió completa del paquet que acredita la correcció de tots dos CVE. El número que mostra \`php -v\` no basta per si sol per avaluar un paquet amb correccions incorporades pel distribuïdor.

### Avís addicional del 23 d'octubre: progrés de pujada de sessions

PHP va publicar després una [recomanació sobre \`session.upload_progress.enabled\`](https://www.php.net/archive/2026.php#2026-10-23-1), associada a un vector addicional en una combinació poc habitual de configuració i codi. Recomana desactivar aquesta funció fins a la versió regular següent de correccions; les aplicacions que mai no canvien el serialitzador de sessions durant l'execució poden mantenir-la habilitada.

Demana a l'administrador que revisi també aquest avís i apliqui la recomanació corresponent. Haver instal·lat una de les quatre versions de la taula no substitueix consultar les indicacions posteriors.

## Què cal fer en una instal·lació de CiviCRM

### 1. Identificar el PHP que rep les peticions web

Sol·licita un inventari per lloc, servidor, contenidor i conjunt de processos PHP-FPM. Anota'n la versió, la procedència del paquet i el mode d'execució. Comprova per separat el PHP de cron i dels processos persistents.

A la terminal, \`php -v\` ajuda a identificar **PHP CLI**. No demostra quina versió atén els formularis web ni que tots els processos en execució hagin carregat l'actualització. Evita publicar una pàgina de diagnòstic amb detalls del servidor.

### 2. Aplicar el pedaç i renovar els processos

Coordina amb l'allotjament l'actualització de tots els entorns afectats i el reinici o substitució dels serveis i processos corresponents. En contenidors, verifica la imatge desplegada i les rèpliques actives; canviar només la imatge de referència no actualitza els contenidors que continuen executant-se.

Sempre que sigui possible, aplica primer la correcció de la teva branca compatible. Si necessites canviar de branca, contrasta els [requisits oficials de CiviCRM](https://docs.civicrm.org/installation/en/latest/requirements/) i els del CMS i les extensions. Prepara una còpia restaurable i assaja l'operació sense endarrerir innecessàriament la correcció d'un servei exposat.

### 3. Comprovar els processos de l'entitat

Valida accés, altes i renovacions, formularis públics, adjunts, correu i tasques programades. Per a les donacions, utilitza el mode de proves de la passarel·la i comprova tant el resultat del pagament com el registre al CRM. La nostra [guia de mètodes de pagament de CiviCRM](/news/civicrm-payment-methods) ajuda a identificar les integracions que han d'entrar a la revisió.

Conserva com a evidència la revisió instal·lada, l'avís del proveïdor, la data del canvi i les comprovacions fetes. Si el proveïdor gestiona el servidor, demana-li aquesta confirmació per escrit.

### 4. Revisar indicis d'activitat anòmala

La [guia de resposta de PHP2Shell](https://www.php2shell.com/#upgrade-php) recull senyals com errors de memòria, respostes 500 repetides, reinicis inesperats de processos i galetes de sessió anòmales. Serveixen per orientar una investigació: per separat no proven explotació, i la seva absència tampoc garanteix que no n'hi hagi hagut.

Si trobes senyals rellevants, conserva els registres i coordina la resposta abans de netejar o reinstal·lar. Aplicar el pedaç atura l'exposició corregida, però no desfà una intrusió anterior.

## Quines mesures no substitueixen l'actualització de PHP

Un WAF, una CDN o una regla de l'allotjament poden reduir determinats camins d'atac. No els presentis com una correcció completa. Consulta les [limitacions de les mitigacions oficials](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w) abans de canviar paràmetres del servidor.

Tampoc basta canviar contrasenyes, amagar la versió de PHP o actualitzar només Drupal, WordPress o CiviCRM. Evita copiar ajustos de memòria sense avaluar-ne les conseqüències sobre disponibilitat i consum de recursos.

## Preguntes freqüents sobre PHP2Shell i CiviCRM

### Una versió recent de CiviCRM em protegeix?

Per si sola no acredita que PHP estigui corregit. Comprova totes dues capes i demana evidència del paquet que executa el lloc.

### He de migrar directament a PHP 8.5?

No necessàriament. Hi ha correccions per a diverses branques. Prioritza una revisió corregida i compatible, i planifica per separat qualsevol canvi de branca.

### Un CRM accessible només després d'iniciar sessió queda fora de risc?

No ho donis per fet. Algunes rutes es processen abans del codi de l'aplicació. Revisa què arriba realment a PHP, inclosos els formularis públics i les integracions.

### Què he de demanar al proveïdor d'allotjament?

La confirmació de correcció de **CVE-2026-109618 i CVE-2026-109619**, el paquet instal·lat al servei web, la renovació dels processos i la revisió de l'avís del 23 d'octubre. Inclou aquests criteris al [manteniment de l'allotjament de CiviCRM](/news/civicrm-hosting-comparison).

## Converteix l'avís en una actuació comprovable

Per a una ONG, la resposta útil consisteix a saber qui manté PHP, quins entorns estan corregits i quines proves confirmen que l'activitat continua. El seguiment ha de cobrir tant el CRM com la infraestructura que l'executa.

A **SmallPush** ajudem a revisar l'entorn de CiviCRM i coordinar actualitzacions amb l'allotjament. Si necessites organitzar aquesta revisió, [explica'ns com està desplegada la teva instal·lació](/#contact).
`;export{e as default};
