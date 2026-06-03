const e=`# How to Create a New Contact in CiviCRM

![Essential guide to contact management in CiviCRM](/notices/civicrm-contact-management.png)

Contact management is the core of CiviCRM. Before recording donations, memberships, events or communications, you need a clean database where each person, organization or household is created correctly.

This guide covers the essential steps to create a new contact and keep your data ready to grow without duplicates or inconsistent records.

## 1. Choose the Right Contact Type

CiviCRM uses three base contact types:

1. **Individual:** real people, such as members, donors, volunteers, students or participants. The key fields are usually first name, last name or email address.
2. **Organization:** companies, associations, nonprofits, public bodies or institutions. The key field is usually the organization name.
3. **Household:** families or groups of people that share a location or are managed together. The main field is the household or family name.

Choosing the right type from the start makes searches, reports, relationships and deduplication rules much easier to manage.

## 2. Create an Individual Contact

To create a new person:

1. Go to **Contacts > New Individual**.
2. Fill in the basic fields: first name, last name and email address if available.
3. Add phone numbers, postal address, preferred language and any data your organization needs.
4. Check whether the contact already exists in the system.
5. Save the record.

After saving, CiviCRM opens the contact record. From there you can add activities, relationships, contributions, groups, tags, memberships or custom information.

## 3. Create Organizations and Households

The process is similar, but the information you should prioritize changes.

For an **organization**, focus on the legal or commercial name, general email, phone, website, address and related people. Relationships let you connect employees, representatives, billing contacts or primary contacts.

For a **household**, use a clear and consistent name, such as \`Garcia Lopez Family\`, and relate the individual members. This is useful for family communications, joint donations or shared addresses.

## 4. Use the Contact Record Tabs

Once the contact is created, the record is organized into tabs. The most common ones are:

1. **Summary:** main details, contact information and key fields.
2. **Relationships:** links to people, organizations or households.
3. **Activities:** calls, meetings, emails, tasks and follow-ups.
4. **Contributions:** donations, payments and financial transactions.
5. **Memberships:** status, dates and membership type if your organization uses them.

These tabs prevent important information from being scattered across external notes or spreadsheets.

## 5. Avoid Duplicates from the Start

Before creating a contact, search by name, email address or phone number. CiviCRM also includes deduplication rules:

1. **Supervised rules:** used when a person reviews possible matches before merging records.
2. **Unsupervised rules:** applied automatically in processes such as imports or public forms.

When you find two duplicate contacts, use **merge records** to keep a master record with the correct information.

## 6. Bulk Import with CSV

If you need to create many contacts at once, use CSV import. Before importing:

1. Clean names, emails and phone numbers.
2. Separate individuals, organizations and households clearly.
3. Map each column to the correct CiviCRM field.
4. Run a small test import first.
5. Enable deduplication rules to reduce duplicate records.

A well-prepared import saves many hours of cleanup later.

## Final Best Practices

1. Define an internal naming convention for organizations and households.
2. Store only data that is useful and maintainable.
3. Use relationships instead of duplicating information.
4. Review duplicates and incomplete data regularly.
5. Document custom fields so the whole team uses them consistently.

At **SmallPush**, we help organizations configure CiviCRM so contact management is clear, scalable and useful from day one. If you need support with your CRM, [contact us](/#contact).
`;export{e as default};
