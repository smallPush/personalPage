# Guia del Model 182 a CiviCRM: Donacions i Hisenda sense Errors

Per a qualsevol fundació, associació o ONG declarada d'utilitat pública a Espanya, el **mes de gener** és sinònim d'estrès administratiu: és el moment de presentar el **Model 182** davant l'Agència Tributària (AEAT) i emetre els certificats fiscals de donació per als socis i col·laboradors.

En aquest article expliquem com configurar i optimitzar **CiviCRM** per automatitzar el càlcul de deduccions (fins al 80% en els primers 250 €), validar NIF/CIFs i generar l'arxiu oficial que exigeix Hisenda amb un sol clic.

---

## 1. El Marc Fiscal de Donacions a Espanya (Llei 49/2002)

Des de la darrera reforma de mecenatge, els incentius fiscals per donar a entitats acollides a la Llei 49/2002 són més atractius que mai:
- **Primers 250 € donats**: 80% de deducció a l'IRPF.
- **Resta de donacions**: 40% de deducció general.
- **Recurrència (fidelitat)**: Si el donant ha donat imports iguals o superiors en els dos anys anteriors a la mateixa entitat, la deducció puja al **45%**.

Calcular això manualment en un full de càlcul amb centenars o milers de donants és una font constant d'errors. CiviCRM permet modelar aquest càlcul de manera determinista.

---

## 2. Requisits de Dades a CiviCRM per al Model 182

Perquè l'arxiu generat sigui acceptat pel validador oficial de l'AEAT, cada registre de contacte i contribució ha de complir:

1. **Identificador Fiscal Vàlid**: NIF o NIE per a persones físiques (amb lletra de control correcta) i CIF per a persones jurídiques.
2. **Codi de Província i Municipi**: Obligatori segons les taules de codificació de l'INE.
3. **Tipus de Donació (Clau)**: Dinerària (clau A) o en espècie (clau B).
4. **Percentatge de Deducció i Revocacions**: Registre de qualsevol donació cancel·lada o retornada durant l'exercici fiscal.

---

## 3. Automatització de Certificats de Donació

Un dels majors colls d'ampolla per als equips de captació és l'enviament individual de certificats a cada soci. Amb CiviCRM i la generació de plantilles PDF:
- Es dissenya una plantilla corporativa amb les dades fiscals de l'entitat, el número de registre i la signatura digital.
- Es vincula a un flux programat (*Scheduled Reminder* o *CiviRules*) perquè en tancar l'exercici, cada soci rebi per correu electrònic el seu certificat en PDF adjunt.

La teva entitat necessita suport tècnic per configurar el Model 182 o migrar a CiviCRM? A SmallPush som especialistes tècnics en el Tercer Sector.
