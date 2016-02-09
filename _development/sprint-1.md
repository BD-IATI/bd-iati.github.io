---
layout: development
comments: true
title: Sprint 1
permalink: /development/sprint-1/
order: 1
---

**STATUS: DRAFT**

* 
{:toc}

## Overview

The main goals of sprint 1 are:

1. download IATI data from the IATI Datastore for individual DPs
2. convert between versions of the IATI Standard
3. store the data
4. make it accessible to the rest of the application
5. read data from the AIMS in the IATI Standard
6. write data to the AIMS

As this is the first sprint, this does not all have to be working perfectly. The most important thing is to get the basic framework up and running and to establish a decent architecture for the application. This sprint also needs to function nicely with the user interface, which **will be developed in parallel** under sprint 2.

### Data integrity

* data in the live AIMS should not be touched
* data in the test AIMS can be changed and adjusted as necessary for the purposes of testing
* data in the IATI import tool can be deleted and re-generated at will throughout the development process, until we agree otherwise, perhaps in some of the last few sprints.

### DP data overview

For the purposes of this sprint, we will use data from Canada and DFID.

|  | Canada | DFID |
| ------ | ------ | ---- |
| Organisation identifier <sup>*</sup> | CA-3 | GB-1 |
| Version | 2.01 | 1.05 |
| Hierarchies | 1 | 2 |
| Languages | English, French | English |

<sup>*</sup> this is currently the only- or most-used identifier. There may eventually be more than one identifier in use; see below.

The data from both DPs is good. See also some more detailed data analysis for [Canada](/data/canada/) and [DFID](/data/dfid/).

## 1. Retrieve data from IATI Datastore

Data should be downloaded nightly from the IATI Datastore and then made available to the rest of the application on demand. See the documentation section [Retrieving IATI data](/documentation/retrieving-data/) for more detail on the query for retrieving data from the IATI Datastore.

### Organisations

* The list of Development Partners can be obtained from the AIMS, using the data collected in [FundSource](http://aims.erd.gov.bd/AIMS/FundSource). 
* The JSON endpoint used in the AIMS could be used, or some other method for supplying data to the IATI import module could also be considered. The software supplier are free to decide what is most appropriate.
* **Mark** will fill in the IATI organisation identifier for several organisations.
* Not all organisations will have organisation identifiers supplied, because they have not published IATI data yet.
* Organisations could theoretically have multiple organisation identifiers. As there is a single field in the AIMS for organisation identifiers, they will be delimited with a `|` character. This is the same character that is used as an OR operator in the IATI Datastore. So, the `reporting-org` parameter passed to the Datastore API would be:
  
      reporting-org=GB-1|XM-DAC-12-1 
    
    where `GB-1` and `XM-DAC-12-1` are both organisation identifiers for DFID.

## 2. Conversion

There are multiple versions of the IATI Standard. See the documentation section [Versions in IATI data](/documentation/versions/) for an overview of the key differences between versions.

We will convert all the data to version 2.02 for use in this application. For our purposes, there are no relevant differences between version 2.01 and version 2.02.

In the initial sprint, we need to convert version 1.05 data to version 2.02. *This should be developed in a separate module from the outset if possible, as it will likely be very useful for others trying to use IATI data.*

### Simplifying conversion

We will take some steps to simplify the process of conversion for now. We can ignore the sub-national geographic location changes between version 1.03 and 1.04 (we will need to have this conversion working by the end of the project).

As outlined in the documentation page, the main changes between v1.05 and v2.02 are:

1. several codelists were changed from English-language codes to numeric codes
2. changes to improve the way multiple languages are handled in the Standard

We should focus initially on adjusting the following fields in each of these two main changes:

1. codelist changs &ndash; swap the codes from v1.05 to v2.02 in the following fields:
  * `activity-date/@type`: [activity date type](http://iatistandard.org/201/upgrades/integer-upgrade-to-2-01/2-01-changes/#activity-date-type-amended-codes)
  * `participating-org/@role`: [organisation role](http://iatistandard.org/201/upgrades/integer-upgrade-to-2-01/2-01-changes/#organisation-role-amended-codes)
  * `sector/@vocabulary`: [sector vocabulary](http://iatistandard.org/201/upgrades/integer-upgrade-to-2-01/2-01-changes/#sector-vocabulary-was-vocabulary-amended-codes)
  * `transaction/transaction-type/@code`: [transaction type](http://iatistandard.org/201/upgrades/integer-upgrade-to-2-01/2-01-changes/#transaction-type-amended-codes)
2. multiple languages &ndash; combine the following elements:
  * `title`
  * `description` (with the same `type`)
  * `sector` (with the same `code`; only where vocabulary is `DAC` for now)

This should be done in a flexible way so that we can gradually (and fairly painlessly) increase the number of fields we are converting over the course of development.

## 3. Storage

The software supplier is free to decide how to store the data at this stage. It will probably make most sense to have a database that stores information such as:

* DP name
* DP organisation identifier(s) in IATI
* DP organisation identifier in AIMS (as appropriate)
* Date/time data was last downloaded

The XML files themselves could be stored in the database and/or as flat files.

Note that we need to have some way of storing or accessing the AIMS data. This could be "on the fly", passed through directly from reading the AIMS database, or activities could be written to some table in the database.

### Storing individual activities

As we approach the later stages of development and want to re-sync the data with the Datastore (to fetch new activities, or to update existing ones), we'll need to know what the activity looked like the last time we saw it. It might make sense to store each activity in a separate row in the table, like this:

| key | value | description |
| --- | ----- | ----------- |
| organisation_id | GB-1 | Reporting organisation's IATI identifier |
| iati_identifier | GB-1-107368 | Activity's IATI identifier |
| last_downloaded | 2016-02-08Z19:00:00 | The timestamp the file was most recently downloaded |
| previous_downloaded | 2016-02-07Z19:00:00 | The timestamp the file was previously downloaded |
| last_xml | `<iati-activity ...>` | The XML blob of the activity, for the most recent file |
| previous_xml | `<iati-activity ...>` | The XML blob of the activity, for the previous file |
| hierarchy | 1 | This activity is a 1st-level activity in the structure DFID uses |
| parent_hierarchy | null | There are no parents of this activity (this would be used to define the parent of any hierarchy-2 (etc) activities) |

We may want to store the original XML and the converted XML here for the purposes of debugging.

There's probably no need right now to store the data in a more complicated way than this (e.g. splitting out titles into a separate table, etc). But we may want to revisit this later when we move on to re-syncing and tracking changes and updates in files.

## 4. Make data available to rest of application

This is going to be one of the trickier parts of this sprint and the part that may need to change somewhat as development progresses. We need to have some kind of API to read data from the database and make it available to the front end.

This could either be the full data about each activity, or it could provide more limited data at this stage. Given that we want to show only limited information to the user at this stage, the latter option is probably preferable. This will also reduce the amount of data that is read out of the system and make it easier / faster to have more of the interface in the browser, if we decide to go down that path in sprint 2.

A JSON endpoint for providing this data probably makes sense.

At a minimum, we need the following fields to be made available about each activity:

* iati-identifier
* title (English title, `xml:lang="en"`, if multiple languages provided)
* description (again, in English)
* aid type
* implementing organisation name
* implementing organisation ref
* implementing organisation type
* recipient country (% tagged as `BD` - Bangladesh)

A couple of notes on accessing this data:

* **aid type** can be declared once at the activity level (`default-aid-type`) or multiple times at the transaction level (`aid-type`). For now, we can take either, and return one. We may later want to consider what to do if multiple different aid types appear, but we will leave this complication to one side for now.
* **implementing organisation** is generally declared using the `role` of `participating-org`. However, we should also consider combining this with the `receiver-org` element on each transaction. Again, we will simplify this for now, but will eventually want to have some logic that can look at either. In the case of the transactions, we could select the receiver-org with the highest value of disbursements.

Finally: this endpoint should make both IATI and AIMS data available in the same format (and a similar endpoint) so that it is easy to pull together in the user interface.

## 5. Read data from the AIMS in the IATI Standard

The AIMS already publishes data in XML. The export should be adjusted so that:

* the XML is compliant with version 2.02 of the Standard
* an endpoint to obtain all activities from each DP
* an endpoint to obtain all activities from all DPs
* both endpoints are publicly accessible, but not necessarily publicly discoverable.

Eventually, we may want to make the "all data" endpoint publicly discoverable. At this point, there may be value in cacheing the output to reduce server load. However, we would want the IATI import module to see the "live" data rather than cached data.

In addition to the above data, we need to retrieve some additional metadata (which doesn't have to be in XML format):

* [Fund Source](http://aims.erd.gov.bd/AIMS/FundSource)
* [Trust Funds](http://aims.erd.gov.bd/AIMS/TrustFund) (but NB, data needs to include breakdown of commitments from different organisations that are shown in each of those pop-ups)

## 6. Write data to the AIMS

At this stage, we only need a simple API that can:

* write new activities to the AIMS for DPs already listed in [FundSource](http://aims.erd.gov.bd/AIMS/FundSource)
* update activities in the AIMS
* update trust funds in the AIMS

This does not need to be all fields initially. We should start with titles and descriptions.
