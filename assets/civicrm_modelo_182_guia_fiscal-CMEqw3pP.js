const n=`# CiviCRM Modelo 182 Guide: Automating Donor Tax Deductions in Spain

For non-profits, foundations, and public benefit associations in Spain, January brings a demanding administrative challenge: filing the **Modelo 182** tax return with the Spanish Tax Agency (AEAT) and issuing official tax deduction certificates to supporters.

In this guide, we outline how to configure and optimize **CiviCRM** to automate donor deduction calculations (up to 80% for the first €250), validate tax IDs (NIF/CIF), and generate the official BOE-formatted submission file with one click.

---

## 1. Spanish Donation Tax Framework (Law 49/2002)

Recent updates to Spanish patronage laws offer increased tax incentives for donors:
- **First €250 donated**: 80% individual income tax (IRPF) deduction.
- **Remaining donation amount**: 40% general deduction.
- **Loyalty/Recurrence**: If the donor contributed equal or greater amounts over the preceding two consecutive years, the deduction rate increases to **45%**.

Managing these multi-tier calculations manually across hundreds or thousands of contacts in spreadsheets often leads to errors. CiviCRM models this logic programmatically.

---

## 2. Key Data Requirements in CiviCRM for Modelo 182

To pass the AEAT validator without rejections, every donor and contribution record must include:

1. **Valid Tax Identification Number**: NIF/NIE for individuals (including checksum verification) and CIF for legal entities.
2. **Province and Postal Codes**: Conforming to Spanish National Statistics Institute (INE) standard tables.
3. **Donation Type Code**: Monetary (Type A) or in-kind contributions (Type B).
4. **Revocations & Returns Tracking**: Complete records of chargebacks, SEPA rejections, or cancelled contributions during the fiscal year.

---

## 3. Automated Issuance of PDF Tax Certificates

A major efficiency drain for non-profit administrative teams is manually emailing individual PDF certificates. With CiviCRM:
- Custom PDF templates include the organization's official registry number, fiscal details, and authorized digital signature.
- Using *Scheduled Reminders* or *CiviRules*, certificates are automatically compiled and delivered as encrypted PDF attachments to donors once the fiscal year closes.

Need assistance configuring Modelo 182 workflows or migrating your donor database to CiviCRM? SmallPush provides dedicated technical consulting for Spanish non-profits and foundations.
`;export{n as default};
