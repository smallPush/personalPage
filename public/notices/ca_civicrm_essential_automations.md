# 5 automatitzacions essencials de CiviCRM per estalviar feina a una ONG

![Un contacte avança per un flux de cinc automatitzacions a CiviCRM](/notices/civicrm-automations.svg)

Cada alta, donació o renovació genera petites tasques: enviar una benvinguda, comprovar un pagament, avisar l'equip o actualitzar un grup. Quan aquestes accions depenen d'un full de càlcul o de la memòria d'una persona, arriben tard, es dupliquen o directament no es fan.

CiviCRM permet automatitzar bona part d'aquesta feina mitjançant recordatoris programats, grups intel·ligents, plantilles, tasques periòdiques i integracions. L'objectiu no és enviar més missatges, sinó executar cada acció en el moment adequat, mantenir la traçabilitat i reservar el temps de l'equip per a les relacions que necessiten atenció humana.

## Abans d'automatitzar: defineix el procés

Una automatització fiable comença fora de l'eina. Per a cada flux, respon cinc preguntes:

1. **Disparador:** quina dada o esdeveniment posa en marxa el procés?
2. **Condicions:** qui hi ha d'entrar i qui n'ha de quedar exclòs?
3. **Acció:** s'envia un missatge, es crea una activitat o s'actualitza un grup?
4. **Sortida:** quin canvi atura o completa el flux?
5. **Responsable:** qui revisa els errors i les excepcions?

Comença per un procés freqüent, estable i fàcil de mesurar. Automatitzar un procediment confús només aconsegueix que els errors passin més de pressa.

## 1. Benvinguda a noves persones sòcies, donants o voluntàries

La primera comunicació confirma que el registre s'ha fet correctament i explica el pas següent. No convé enviar el mateix missatge a tothom: una persona sòcia, una donant puntual i una voluntària tenen expectatives diferents.

Un flux senzill pot:

1. Detectar una nova membresia, contribució o incorporació a un grup.
2. Seleccionar la plantilla corresponent al tipus de relació.
3. Enviar una confirmació immediata.
4. Programar un segon missatge amb recursos útils uns dies després.
5. Crear una activitat per a l'equip quan el contacte requereix seguiment personal.

Inclou només una crida a l'acció principal: completar dades, conèixer els avantatges de la membresia o triar com participar. Registra l'enviament com a activitat perquè qualsevol membre de l'equip pugui entendre què ha rebut el contacte.

## 2. Renovació de membresies abans que caduquin

Esperar que una membresia hagi vençut redueix les possibilitats de renovació. Els [recordatoris programats de CiviCRM](https://docs.civicrm.org/user/en/latest/email/scheduled-reminders/) poden utilitzar la data de finalització i l'estat de la membresia per iniciar una seqüència.

Per exemple:

1. Primer avís 30 dies abans de la data de venciment.
2. Recordatori breu 7 dies abans.
3. Confirmació i agraïment quan es registra la renovació.
4. Últim missatge després del venciment, amb un canal d'ajuda.

El flux ha d'excloure les persones que ja hagin renovat i diferenciar les membresies amb renovació automàtica. Utilitza enllaços personalitzats quan correspongui i comprova que una modificació de la data de finalització retiri el contacte dels avisos següents.

## 3. Recuperació de pagaments recurrents fallits

Un cobrament fallit no sempre significa que la persona vulgui deixar de col·laborar. Pot ser degut a una targeta caducada, un saldo insuficient o una incidència temporal. Una resposta ràpida i respectuosa pot evitar una baixa involuntària.

El circuit recomanat és:

1. El processador de pagaments comunica la fallada a CiviCRM.
2. L'aportació queda registrada amb el seu estat real, sense marcar-la manualment com a completada.
3. S'envia un missatge clar amb una via segura per actualitzar el mètode de pagament.
4. Si la incidència continua, es crea una tasca per a revisió humana.
5. Quan el pagament es recupera, es tanca el seguiment i s'aturen els avisos.

No incloguis dades bancàries sensibles als correus ni generis reintents sense conèixer el comportament del processador. La capacitat de gestionar recurrències depèn de la passarel·la i de la seva integració amb CiviCRM, de manera que aquest flux s'ha de provar de principi a fi.

## 4. Agraïment i seguiment després d'una donació

El rebut confirma una transacció; l'agraïment construeix una relació. A més de la confirmació immediata, pots crear un seguiment adaptat al context:

1. Agraïment amb l'import, la campanya i la destinació de l'aportació.
2. Missatge posterior que expliqui l'impacte aconseguit.
3. Avís intern per a aportacions que requereixen atenció personal.
4. Segmentació de donants recurrents, recuperats o de primera vegada.

Evita convertir cada donació en una cadena comercial. Defineix límits de freqüència i coordina el flux amb el calendari general de comunicacions. Per a enviaments massius, CiviMail permet gestionar baixes i rebots; consulta aquests indicadors per no insistir en adreces no vàlides.

## 5. Tasques internes i reactivació de contactes

No tota automatització ha d'enviar un correu. Algunes de les més útils creen feina ordenada per a l'equip:

1. Assignar una trucada quan una aportació supera un llindar acordat.
2. Avisar d'una activitat pendent o d'un document que caduca.
3. Incorporar a un grup intel·ligent les persones que no han participat durant un període.
4. Crear una tasca de revisió quan falten dades imprescindibles.
5. Retirar d'una campanya qui ja hi ha respost.

Els recordatoris programats cobreixen molts escenaris basats en dates, activitats, contribucions i membresies. Per a regles del tipus **disparador + condicions + accions**, l'extensió [CiviRules](https://docs.civicrm.org/civirules/en/latest/) ofereix fluxos més avançats. Les necessitats que depenguin de sistemes externs poden requerir l'API o una integració específica.

## Controls que necessita tota automatització

Abans d'activar un flux per a tota la base de dades:

1. **Prova'l amb contactes interns.** Comprova el contingut, els enllaços, les dates i els remitents.
2. **Respecta els consentiments i les preferències.** Diferencia les comunicacions operatives de les promocionals.
3. **Evita duplicats.** Una mateixa persona no ha d'entrar-hi dues vegades per registres o condicions superposades.
4. **Defineix una condició de sortida.** Una renovació o un pagament recuperat ha d'aturar els avisos pendents.
5. **Conserva la traçabilitat.** Registra missatges, activitats i canvis rellevants.
6. **Configura les tasques programades.** Els recordatoris i les cues depenen que els [treballs programats i cron](https://docs.civicrm.org/user/en/latest/initial-set-up/scheduled-jobs/) funcionin amb la freqüència adequada.
7. **Assigna un responsable.** Tota automatització necessita supervisió, encara que funcioni correctament.

## Què cal mesurar

No mesuris únicament quants missatges s'envien. Relaciona cada flux amb un resultat:

| Automatització | Indicador principal |
| --- | --- |
| Benvinguda | Dades completades o primera participació |
| Renovació | Percentatge de membresies renovades |
| Pagament fallit | Aportacions recurrents recuperades |
| Agraïment | Retenció i resposta de donants |
| Seguiment intern | Tasques resoltes dins del termini |

Revisa també els rebots, les baixes, les excepcions i el temps manual estalviat. Si l'equip necessita corregir constantment el resultat, el flux encara no està ben dissenyat.

## Comença amb un flux petit

No cal automatitzar tot CiviCRM alhora. Tria una tasca repetitiva, documenta'n l'estat actual, crea una versió senzilla i executa-la primer amb un grup controlat. Quan les dades i les condicions siguin fiables, amplia'n l'abast.

A **SmallPush** dissenyem i implementem automatitzacions de CiviCRM adaptades als processos reals d'ONG i organitzacions. Si el teu equip dedica massa temps a avisos, renovacions o seguiments manuals, [parlem-ne](/#contact).
