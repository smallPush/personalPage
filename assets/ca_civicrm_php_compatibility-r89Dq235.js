const e=`# CiviCRM i PHP: problemes de compatibilitat i com resoldre'ls

Un canvi de PHP a l'allotjament pot deixar CiviCRM amb un error 500, un formulari de donació bloquejat o tasques automàtiques que ja no s'executen. Per a una ONG, la incidència pot comportar aportacions sense registrar, renovacions pendents i feina manual per reconstruir què ha passat.

**La solució comença comprovant la compatibilitat de tot el conjunt: PHP, CiviCRM, el CMS i les extensions.** Després cal reproduir l'error, preparar l'actualització en un entorn de proves i validar els processos de l'entitat abans de canviar producció.

*Per SmallPush · Revisió tècnica: 27 d'octubre de 2026.*

## Per què una actualització de PHP pot trencar CiviCRM

PHP és el llenguatge amb què s'executa CiviCRM al servidor. Cada branca nova introdueix canvis que poden afectar codi antic. A més, el nucli de CiviCRM, les extensions i el CMS tenen calendaris d'actualització diferents.

Això explica una situació habitual: el proveïdor canvia PHP, el web públic continua funcionant i l'error apareix només en obrir una fitxa, confirmar un pagament o processar una cua. Que la portada carregui no demostra que el CRM funcioni correctament.

Si utilitzes CiviCRM sobre Drupal, WordPress, Joomla o Backdrop, revisa també el CMS i els seus mòduls. En una instal·lació Standalone, comprova igualment les extensions i les integracions externes.

## Quina versió de PHP és compatible amb CiviCRM

No hi ha una resposta única per a totes les instal·lacions. Consulta els [requisits oficials de CiviCRM](https://docs.civicrm.org/installation/en/latest/requirements/) per a la teva versió concreta i contrasta'ls amb les notes de cada extensió.

Com a exemple de la importància de la branca, la documentació distingeix CiviCRM 6.10, que no és compatible amb PHP 8.4, de CiviCRM 6.16 o posterior, per al qual preveu PHP 8.5. És informació sobre el nucli, no una garantia per a tota la instal·lació.

També cal distingir **compatibilitat** de **suport de seguretat**. Segons el [calendari oficial de PHP](https://www.php.net/supported-versions.php), aquestes són les dates de finalització del suport de seguretat:

| Branca PHP | Fi del suport de seguretat |
| --- | --- |
| 8.2 | 31 de desembre de 2026 |
| 8.3 | 31 de desembre de 2027 |
| 8.4 | 31 de desembre de 2028 |
| 8.5 | 31 de desembre de 2029 |

Si encara fas servir PHP 8.2, prepara la migració abans que acabi el 2026. Tria una branca mantinguda que admeti tot el conjunt de programari; la versió més recent del servidor pot exigir actualitzacions prèvies de l'aplicació. Torna a consultar les fonts quan executis el canvi, perquè la compatibilitat evoluciona.

## Errors freqüents de PHP a CiviCRM

Aquests símptomes orienten el diagnòstic, però cap no identifica per si sol la causa:

| Símptoma | Què cal comprovar primer |
| --- | --- |
| Pantalla en blanc o error 500 després de canviar PHP | Primer error fatal als registres de PHP i del servidor |
| Avisos \`Deprecated\` | Fitxer i extensió que originen l'avís |
| Error \`TypeError\` o funció inexistent | Traça de l'error, codi propi i dependències |
| El web funciona, però cron falla | PHP i configuració de l'usuari que executa cron |
| Donació cobrada amb estat pendent a CiviCRM | Notificació de la passarel·la i registre de la integració |
| Importacions o informes interromputs | Límits de memòria, temps d'execució i consulta que falla |

Els avisos \`Deprecated\` assenyalen codi que necessita adaptació; no equivalen automàticament a un error fatal. Per exemple, PHP documenta canvis sobre [propietats dinàmiques a PHP 8.2](https://www.php.net/manual/en/migration82.deprecated.php) i [paràmetres implícitament anul·lables a PHP 8.4](https://www.php.net/manual/en/migration84.deprecated.php). La traça permet saber si afecten la teva instal·lació.

Amagar tots els avisos no corregeix la incompatibilitat. A producció, evita mostrar detalls tècnics als visitants i conserva registres accessibles a l'equip responsable. Tampoc desactivis una extensió de pagaments sense estudiar quins processos en depenen.

## Com diagnosticar el problema sense perdre informació

### 1. Anota el canvi i reprodueix l'operació

Registra les versions exactes de PHP, CiviCRM, CMS i extensions, quan va començar l'error i què es va modificar. Descriu una operació concreta: «en enviar el formulari d'alta apareix un error 500» és més útil que «CiviCRM no funciona».

Consulta els registres en el moment de la prova i localitza el primer error rellevant. Els missatges posteriors poden ser conseqüències de l'error inicial. Elimina credencials i dades personals de les traces que comparteixis amb suport.

### 2. Compara el PHP del web amb el de cron

A la terminal, aquestes ordres permeten consultar l'entorn de PHP per línia d'ordres:

\`\`\`bash
php -v
php --ini
php -m
\`\`\`

**El resultat descriu PHP CLI, no el PHP del servidor web.** Contrasta'l amb la configuració del lloc i del procés PHP-FPM a l'allotjament. Revisa també la ruta a l'executable i l'usuari definits a cron: poden utilitzar un altre PHP o un altre fitxer \`php.ini\`.

Si una tasca manual funciona però l'execució automàtica falla, comprova'n l'historial i l'hora de l'última execució. La [guia oficial de tasques programades](https://docs.civicrm.org/sysadmin/en/latest/setup/jobs/) explica com revisar aquest circuit.

### 3. Separa compatibilitat de rendiment

Una funció eliminada no es recupera augmentant \`memory_limit\`. En canvi, un procés que esgota la memòria requereix estudiar el volum de dades i els límits de recursos. Si la lentitud és anterior al canvi de PHP, revisa també la nostra [guia de rendiment i base de dades de CiviCRM](/news/civicrm-tuning).

## Com actualitzar PHP i CiviCRM amb un pla verificable

La [guia oficial d'actualització de CiviCRM](https://docs.civicrm.org/sysadmin/en/latest/upgrade/) és el punt de partida. Adapta el procediment al CMS i documenta els passos que hagis validat:

1. **Defineix la combinació de destí.** Comprova nucli, CMS, extensions, codi propi i passarel·les. Si origen i destí no comparteixen una versió compatible de PHP, planifica etapes intermèdies compatibles.
2. **Prepara una còpia restaurable.** Inclou bases de dades de CiviCRM i del CMS, fitxers, configuració i extensions. Assaja la restauració.
3. **Aïlla l'entorn de proves.** Bloqueja correus a contactes reals, cobraments, webhooks de producció i tasques amb efectes externs. Utilitza les opcions de prova de cada proveïdor.
4. **Executa l'actualització assajada.** Segueix les instruccions específiques de les versions implicades i neteja les memòries cau quan pertoqui. Conserva un registre de cada canvi.
5. **Valida processos complets.** Prova una alta, una renovació, una donació en mode de proves, la notificació, el correu i una tasca programada. Verifica també permisos, importacions i informes habituals.
6. **Programa el canvi a producció.** Acorda la pausa d'escriptures i tasques, fes una còpia final i aplica el procediment provat. Supervisa els primers cicles automàtics després de reactivar-los.

Per als pagaments, comprova que l'estat de la contribució coincideix amb el resultat de la passarel·la. La nostra [guia de mètodes de pagament a CiviCRM](/news/civicrm-payment-methods) ajuda a situar les integracions que has d'incloure a les proves.

Defineix també com tornar enrere. Si s'ha actualitzat l'esquema de dades, canviar només el codi o baixar PHP pot ser insuficient: cal restaurar un conjunt coherent. Abans de fer-ho, conserva i concilia les operacions posteriors a la còpia per evitar perdre registres o repetir cobraments i missatges.

## Preguntes freqüents sobre PHP i CiviCRM

### Puc resoldre l'error tornant a la versió anterior de PHP?

Pot servir com a mesura temporal si la branca continua mantinguda i és compatible amb el codi instal·lat. Si també has canviat CiviCRM o la seva base de dades, analitza tot el canvi abans de revertir-lo. Una baixada de PHP no substitueix un pla d'actualització.

### Per què falla CiviCRM si WordPress o Drupal funcionen?

La pàgina pública i el CRM executen rutes de codi diferents. Un mòdul, una extensió o un procés de pagament pot fallar encara que el CMS mostri la portada. Prova l'operació afectada i revisa'n la traça.

### Actualitzar PHP millora el rendiment de CiviCRM?

Pot ajudar, però el resultat depèn de les consultes, les extensions i els recursos del servidor. Compara els mateixos processos i volums abans i després; no atribueixis a PHP una millora que no hagis mesurat.

### Què he de demanar al proveïdor d'allotjament?

La versió de PHP de cada lloc i de cron, el calendari de canvis, accés a registres i còpies, i un entorn per assajar. Inclou aquests requisits quan [triïs hosting per a CiviCRM](/news/civicrm-hosting-comparison).

## Prepara el pròxim canvi abans que es converteixi en una incidència

Mantén un inventari de versions, un responsable del manteniment i proves dels processos que sostenen l'activitat de l'entitat. Això permet programar les actualitzacions i detectar un error abans que afecti socis i donants.

A **SmallPush** revisem instal·lacions de CiviCRM i planifiquem actualitzacions de PHP, CMS i extensions. Si la teva organització rep avisos de l'allotjament o ja té errors, [explica'ns quines versions utilitzes i quina operació falla](/#contact) per valorar el pas següent.
`;export{e as default};
