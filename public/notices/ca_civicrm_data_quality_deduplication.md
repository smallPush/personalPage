# Qualitat de dades a CiviCRM: guia pràctica de deduplicació

![Dos contactes duplicats que es converteixen en un únic registre verificat a CiviCRM](/notices/civicrm-data-quality.svg)

Un CRM només és útil quan l'equip pot confiar en les dades. Els contactes duplicats divideixen l'historial de donacions, generen comunicacions repetides i redueixen la fiabilitat dels informes. Per a una ONG no és únicament un problema tècnic: afecta la relació amb persones sòcies, donants i voluntàries.

Aquesta guia explica com detectar duplicats a CiviCRM, configurar regles de coincidència raonables i prevenir nous problemes durant les importacions i la feina diària.

## 1. Comença amb una auditoria de qualitat

Abans de canviar regles o fusionar registres, mesura la situació actual. Revisa una mostra representativa i busca:

1. Adreces de correu repetides en contactes diferents.
2. Noms similars amb el mateix telèfon o adreça postal.
3. Organitzacions registrades unes vegades amb sigles i altres amb el nom legal.
4. Contactes sense un identificador estable, com ara correu, telèfon o número de persona sòcia.
5. Registres incomplets creats per formularis, integracions o importacions antigues.

Fes una còpia de seguretat abans d'iniciar una neteja àmplia. Una fusió modifica l'historial dels contactes, per això s'ha de tractar com una operació de dades controlada i no com una tasca estètica.

## 2. Entén les regles de deduplicació

CiviCRM compara camps i els assigna pesos per determinar si dos contactes poden representar la mateixa persona o organització. Les regles es configuren per separat per a individus, organitzacions i llars.

Els tres usos habituals compleixen funcions diferents:

1. **No supervisat:** regles estrictes per a processos automàtics en què ningú revisa el resultat, com ara formularis públics o determinades importacions.
2. **Supervisat:** regles més àmplies que mostren possibles coincidències perquè una persona les revisi.
3. **General:** regles disponibles per a cerques i fluxos administratius concrets.

Una regla automàtica ha de donar prioritat a identificadors sòlids. La coincidència exacta del correu o del número de persona sòcia acostuma a ser més segura que utilitzar només el nom. Una regla supervisada pot combinar nom, telèfon, codi postal o data de naixement.

## 3. Dissenya les regles segons les dades reals

No existeix una regla universal vàlida per a totes les organitzacions. Una bona configuració reflecteix com recull les dades la teva entitat.

Per a individus, pots valorar combinacions com:

1. Correu electrònic exacte.
2. Nom, cognoms i telèfon.
3. Nom, cognoms i codi postal.
4. Un identificador extern o número de persona sòcia únic.

Per a organitzacions, combina el nom amb el domini web, telèfon, identificador fiscal o codi postal. Evita les fusions automàtiques basades únicament en noms comuns: dues persones poden dir-se igual i diferents seus poden pertànyer a una mateixa organització.

Prova cada regla nova amb duplicats i no duplicats coneguts. Si no detecta coincidències evidents, pot ser massa estricta. Si produeix molts falsos positius, probablement és massa àmplia.

## 4. Revisa i fusiona amb seguretat

Utilitza **Contactes > Cerca i fusiona contactes duplicats** per executar una regla i revisar les parelles candidates. Abans de fusionar:

1. Compara noms, correus, adreces i identificadors externs.
2. Revisa contribucions, membresies, activitats, grups i relacions.
3. Tria com a registre principal el que contingui la informació més fiable.
4. Decideix camp per camp quins valors s'han de conservar.
5. Confirma que tots dos registres pertanyen realment a la mateixa persona o organització.

No fusionis coincidències dubtoses només per reduir la llista de resultats. Una fusió incorrecta sol ser més difícil de reparar que un duplicat pendent de revisió.

## 5. Evita duplicats en les importacions CSV

Les importacions són una de les fonts més freqüents de duplicats. Abans de pujar un fitxer CSV:

1. Elimina files buides i normalitza espais, majúscules i codis de país.
2. Separa els individus de les organitzacions.
3. Valida els correus i estandarditza el format dels telèfons.
4. Inclou un identificador estable sempre que sigui possible.
5. Selecciona la regla de deduplicació i el comportament d'importació adequats.
6. Fes una prova amb un lot petit abans de processar el fitxer complet.
7. Desa el mapatge de camps si la importació es repetirà.

Documenta si la importació ha d'ometre contactes existents, actualitzar-los o emplenar únicament camps buits. Aquesta decisió ha de ser explícita; en cas contrari, es pot sobreescriure informació vàlida o crear registres innecessaris.

## 6. Millora l'entrada de dades des de l'origen

La neteja resol el problema actual, però la prevenció redueix la feina futura. Mantén els formularis públics breus, demana només informació útil i valida els camps abans que arribin a CiviCRM. Quan integris plataformes externes, defineix quin sistema és responsable de cada camp i utilitza identificadors estables entre sistemes.

Dins de l'equip, acordeu convencions senzilles per a noms d'organitzacions, telèfons, adreces i etiquetes. Limita els camps de text lliure innecessaris i explica com cercar abans de crear un contacte nou.

La minimització de dades també afavoreix la privacitat: emmagatzemar menys informació irrellevant o obsoleta facilita el manteniment de la base de dades i redueix riscos.

## 7. Estableix una rutina de manteniment

Una revisió mensual lleugera és més eficaç que una gran neteja anual. Controla alguns indicadors:

1. Nombre de possibles parelles duplicades.
2. Percentatge de contactes sense correu o un altre identificador útil.
3. Adreces de correu no vàlides o amb rebots.
4. Importacions i integracions que generen més duplicats.
5. Registres que no s'han actualitzat durant un període definit.

Assigna la responsabilitat de revisar els resultats i documentar les decisions. La qualitat millora quan forma part del govern habitual del CRM i no d'un projecte tècnic ocasional.

## Llista de comprovació final

1. Fes una còpia de seguretat abans de fer fusions massives.
2. Utilitza regles més estrictes per a coincidències automàtiques que per a revisions humanes.
3. Prova les regles amb exemples reals abans d'aplicar-les àmpliament.
4. Revisa l'historial econòmic i de membresies abans de cada fusió.
5. Executa importacions de prova petites i conserva els mapatges reutilitzables.
6. Mesura periòdicament la qualitat i corregeix els problemes en l'origen.

A **SmallPush**, ajudem les ONG a auditar, netejar i configurar CiviCRM perquè els seus equips treballin amb dades fiables. Si els contactes duplicats afecten les teves comunicacions o informes, [contacta amb nosaltres](/#contact).
