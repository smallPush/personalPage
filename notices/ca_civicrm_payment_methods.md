# 💳 Mètodes de Pagament a CiviCRM: La Guia Completa

Acceptar pagaments i donacions és una de les funcions més crítiques per a qualsevol organització sense ànim de lucre. CiviCRM ofereix una arquitectura flexible per integrar-se amb múltiples processadors de pagament.

En aquesta guia, explorem les opcions més populars i com triar l'adequada per a la vostra organització.

## 1. Stripe: L'Estàndard Modern

**Stripe** s'ha convertit en l'opció preferida per a moltes organitzacions a causa de la seva facilitat d'ús, seguretat i potents característiques.

*   **Pros:** Configuració fàcil, suporta pagaments recurrents, integració amb Google Pay / Apple Pay.
*   **Contres:** Les comissions per transacció poden ser més altes que les alternatives locals.
*   **Ideal per a:** Donacions internacionals i organitzacions que busquen una experiència d'usuari fluida.

## 2. Redsys: L'Estàndard Espanyol

Per a les organitzacions que operen a Espanya, **Redsys** és essencial. Es connecta directament amb la majoria dels bancs espanyols (CaixaBank, BBVA, Santander, etc.).

*   **Pros:** Comissions per transacció més baixes (negociades amb el vostre banc), alta confiança entre els donants espanyols.
*   **Contres:** La configuració tècnica pot ser més complexa que Stripe. Requereix una extensió específica de CiviCRM.
*   **Ideal per a:** Organitzacions espanyoles que volen minimitzar les comissions.

## 3. Adeuts Directes SEPA

Per a quotes de socis recurrents o donacions regulars a la zona euro, l'**Adeut Directe SEPA** és el rei.

*   **Pros:** Baix cost, alta retenció per a donants recurrents.
*   **Contres:** El procés és més lent (requereix generació de mandats i processament de fitxers bancaris).
*   **Integració amb CiviCRM:** CiviCRM té un excel·lent suport per generar fitxers XML SEPA (ISO 20022) per pujar al vostre banc.

## 4. PayPal

**PayPal** segueix sent un nom de confiança per als pagaments en línia.

*   **Pros:** Àmpliament reconegut, fàcil per als donants que ja tenen un compte.
*   **Contres:** L'experiència de l'usuari sovint implica redirigir fora del vostre lloc.
*   **Ideal per a:** Oferir una alternativa familiar a les targetes de crèdit.

## Conclusió

La millor estratègia sovint implica una barreja:
1.  **Stripe** per a donacions puntuals i internacionals.
2.  **SEPA** per a quotes de soci recurrents.
3.  **Redsys** si teniu una base de donants local forta i voleu estalviar en comissions.

A **SmallPush**, ens especialitzem en configurar aquests processadors de pagament dins de CiviCRM per assegurar que la vostra recaptació de fons funcioni sense problemes.

**Necessiteu ajuda per configurar la vostra passarel·la de pagament?** [Contacteu-nos](/contact) per a una consulta.
