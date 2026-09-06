# Com Integrar Bizum i Redsys a CiviCRM per Multiplicar Donacions

A Espanya, **Bizum** s'ha convertit en el mètode de pagament preferit per a l'usuari mòbil. En campanyes de captació solidària i microdonacions puntuals, habilitar Bizum al costat de la passarel·la tradicional de targeta sol incrementar la taxa de conversió en dispositius mòbils **entre un 25% i un 40%**, eliminant gairebé per complet la fricció d'escriure números de targeta o codis CVV.

En aquesta guia tècnica expliquem l'arquitectura i els passos per integrar **Bizum a través del TPV virtual de Redsys** amb la teva instal·lació de **CiviCRM**.

---

## 1. Per què Bizum és imprescindible per a la captació digital?

- **Zero fricció en smartphones**: Més del 70% del trànsit a campanyes solidàries a xarxes prové de mòbils. Introduir el número de telèfon i confirmar la donació a l'app bancària pren menys de 10 segons.
- **Microdonacions immediates**: Ideal per a campanyes d'emergència, esdeveniments presencials o donacions impulsives.
- **Traçabilitat directa al CRM**: A diferència del Bizum manual entre particulars, una passarel·la Redsys amb Bizum per a ONGs registra el NIF, nom i correu del donant abans del pagament, garantint l'emissió del certificat fiscal.

---

## 2. Passos de Configuració a CiviCRM

1. **Contractació del TPV Redsys amb Bizum**: Sol·licita a la teva entitat bancària un TPV virtual que tingui habilitat el mètode de pagament Bizum per a donacions.
2. **Instal·lació de l'Extensió Redsys a CiviCRM**: Instal·lar l'extensió de processador de pagament Redsys amb suport per signatura `HMAC SHA256`.
3. **Configuració d'URLs de Notificació (IPN)**: Assegurar que el servidor no bloquegi les IPs de Redsys per registrar el cobrament de manera immediata.

Vols activar Bizum a la teva web o connectar els teus formularis de donació amb CiviCRM? A SmallPush t'ajudem a posar en marxa la teva passarel·la en temps rècord.
