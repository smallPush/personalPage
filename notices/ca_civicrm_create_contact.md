# Com crear un nou contacte a CiviCRM

La gestió de contactes és el centre de CiviCRM. Abans de registrar donacions, membresies, esdeveniments o comunicacions, necessites una base de dades ordenada on cada persona, organització o llar estigui creada correctament.

Aquesta guia resumeix els passos essencials per crear un nou contacte i mantenir la informació preparada per créixer sense duplicats ni dades inconsistents.

## 1. Tria el tipus de contacte correcte

CiviCRM treballa amb tres tipus base de contacte:

1. **Individu:** persones físiques, com sòcies, donants, voluntàries, alumnes o participants. Normalment requereix nom, cognoms o correu electrònic.
2. **Organització:** empreses, entitats, ONGs, administracions o institucions. El camp clau sol ser el nom de l'organització.
3. **Llar:** famílies o grups de persones que comparteixen ubicació o gestió conjunta. El camp principal és el nom de la llar o família.

Triar bé el tipus des del principi facilita les cerques, els informes, les relacions i les regles de deduplicació.

## 2. Crear un contacte individual

Per crear una persona nova:

1. Ves a **Contactes > Nou individu**.
2. Completa els camps bàsics: nom, cognoms i correu electrònic si el tens disponible.
3. Afegeix telèfons, adreça postal, idioma preferit i qualsevol dada rellevant per a l'organització.
4. Revisa que el contacte no existeixi ja al sistema.
5. Desa el registre.

Després de desar, CiviCRM obre la fitxa del contacte. Des d'allà pots afegir activitats, relacions, contribucions, grups, etiquetes, membresies o informació personalitzada.

## 3. Crear organitzacions i llars

El procés és similar, però canvia el tipus d'informació que convé registrar.

Per a una **organització**, prioritza el nom legal o comercial, correu general, telèfon, web, adreça i persones relacionades. Les relacions permeten connectar empleats, representants, responsables de facturació o contactes principals.

Per a una **llar**, utilitza un nom clar i consistent, com `Família Garcia López`, i relaciona els membres individuals. Això és útil quan es gestionen comunicacions familiars, donacions conjuntes o adreces compartides.

## 4. Utilitza les pestanyes de la fitxa de contacte

Un cop creat el contacte, la fitxa s'organitza en pestanyes. Les més habituals són:

1. **Resum:** dades principals, informació de contacte i camps destacats.
2. **Relacions:** vincles amb persones, organitzacions o llars.
3. **Activitats:** trucades, reunions, correus, tasques i seguiments.
4. **Contribucions:** donacions, pagaments i quotes econòmiques.
5. **Membresies:** estat, vigència i tipus d'afiliació si la teva entitat les utilitza.

Aquestes pestanyes ajuden a evitar que la informació quedi dispersa en notes externes o fulls de càlcul.

## 5. Evita duplicats des del principi

Abans de crear un contacte, cerca per nom, correu electrònic o telèfon. CiviCRM també disposa de regles de deduplicació:

1. **Regles supervisades:** s'utilitzen quan una persona revisa possibles coincidències abans de fusionar registres.
2. **Regles no supervisades:** s'apliquen automàticament en processos com importacions o formularis públics.

Quan trobis dos contactes duplicats, utilitza l'opció de **fusionar registres** per conservar un registre mestre amb la informació correcta.

## 6. Importació massiva amb CSV

Si necessites crear molts contactes alhora, utilitza la importació CSV. Abans d'importar:

1. Neteja noms, correus i telèfons.
2. Separa clarament individus, organitzacions i llars.
3. Mapeja cada columna al camp correcte de CiviCRM.
4. Executa una prova amb pocs registres.
5. Activa regles de deduplicació per reduir duplicats.

Una importació ben preparada estalvia molta feina posterior de neteja.

## Bones pràctiques finals

1. Defineix una convenció interna per als noms d'organitzacions i llars.
2. Registra només dades útils i mantenibles.
3. Utilitza relacions en lloc de duplicar informació.
4. Revisa periòdicament duplicats i dades incompletes.
5. Documenta els camps personalitzats perquè tot l'equip els utilitzi igual.

A **SmallPush**, ajudem organitzacions a configurar CiviCRM perquè la gestió de contactes sigui clara, escalable i útil des del primer dia. Si necessites suport amb el teu CRM, [contacta'ns](/#contact).
