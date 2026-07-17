# CiviCRM Data Quality: A Practical Deduplication Guide

![Two duplicate contact records becoming one verified CiviCRM contact](/notices/civicrm-data-quality.svg)

A CRM is only useful when the team can trust its data. Duplicate contacts split donation histories, generate repeated messages and make reports less reliable. For a nonprofit, this is not just a technical issue: it affects relationships with members, donors and volunteers.

This guide explains how to detect duplicates in CiviCRM, configure sensible matching rules and prevent new problems during imports and daily work.

## 1. Start with a Data Quality Audit

Before changing rules or merging records, measure the current situation. Review a representative sample and look for:

1. Repeated email addresses associated with different contact records.
2. Similar names with the same phone number or postal address.
3. Organizations entered under abbreviations and full legal names.
4. Contacts without a stable identifier, such as an email address, phone number or membership number.
5. Incomplete records created by forms, integrations or old imports.

Create a backup before a large cleanup. A merge changes the contact history, so it should be treated as a controlled data operation rather than a cosmetic task.

## 2. Understand CiviCRM Deduplication Rules

CiviCRM compares fields and assigns weights to determine whether two contacts may represent the same person or organization. Rules are configured separately for individuals, organizations and households.

The three common usages serve different purposes:

1. **Unsupervised:** strict rules for automated processes where no person reviews the result, such as public forms or some imports.
2. **Supervised:** broader rules that produce possible matches for a person to review.
3. **General:** rules available for searches and specific administrative workflows.

An automated rule should prioritize strong identifiers. An exact email address or membership number is usually safer than a name alone. A supervised rule can be more flexible by combining name, phone, postcode or date of birth.

## 3. Design Rules Around Real Data

There is no universal rule that works for every organization. A useful configuration reflects how your data is collected.

For individuals, consider combinations such as:

1. Exact email address.
2. First name, last name and phone number.
3. First name, last name and postcode.
4. A unique external or membership identifier.

For organizations, combine the organization name with a domain, phone number, tax identifier or postcode. Avoid automatically merging records based only on common names: two people can share a name, and different branches can belong to the same organization.

Test every new rule against known duplicates and known non-duplicates. If it misses obvious matches, it may be too strict. If it produces many false positives, it may be too broad.

## 4. Review and Merge Safely

Use **Contacts > Find and Merge Duplicate Contacts** to run a rule and review candidate pairs. Before merging:

1. Compare names, emails, addresses and external identifiers.
2. Review contributions, memberships, activities, groups and relationships.
3. Choose the record with the most reliable information as the main record.
4. Decide field by field which values should be preserved.
5. Confirm that the records really belong to the same person or organization.

Do not merge uncertain matches simply to reduce the number of results. A false merge is usually harder to correct than a duplicate left for later review.

## 5. Prevent Duplicates in CSV Imports

Imports are one of the most common sources of duplicate data. Before uploading a CSV file:

1. Remove empty rows and normalize spaces, capitalization and country codes.
2. Separate individuals from organizations.
3. Validate email addresses and standardize phone formats.
4. Include a stable identifier whenever possible.
5. Select the appropriate deduplication rule and import behavior.
6. Test with a small batch before processing the complete file.
7. Save the field mapping if the import will be repeated.

Document whether an import should skip existing contacts, update them or fill only empty fields. That decision should be explicit; otherwise, valid information can be overwritten or unnecessary records can be created.

## 6. Improve Data Entry at the Source

Cleanup solves the current problem, but prevention reduces future work. Keep public forms short, request only useful information and validate fields before they reach CiviCRM. When integrating external platforms, define which system owns each field and use stable identifiers between systems.

Internally, agree on simple conventions for organization names, phone numbers, addresses and tags. Restrict unnecessary free-text fields and explain to users how to search before creating a new contact.

Data minimization also supports privacy: storing less irrelevant or obsolete information makes the database easier to maintain and reduces risk.

## 7. Establish a Maintenance Routine

A lightweight monthly review is more effective than a large annual cleanup. Track a few indicators:

1. Number of possible duplicate pairs.
2. Percentage of contacts without email or another useful identifier.
3. Invalid or bounced email addresses.
4. Imports and integrations that create the most duplicates.
5. Records that have not been updated for a defined period.

Assign responsibility for reviewing results and documenting decisions. Data quality improves when it is part of normal CRM governance, not an occasional technical project.

## Final Checklist

1. Back up the database before bulk merges.
2. Use stricter rules for automated matching than for human review.
3. Test rules with real examples before applying them widely.
4. Review financial and membership history before each merge.
5. Run small test imports and keep reusable mappings.
6. Measure data quality regularly and correct problems at their source.

At **SmallPush**, we help nonprofits audit, clean and configure CiviCRM so their teams can work with reliable data. If duplicate contacts are affecting your communications or reports, [contact us](/#contact).
