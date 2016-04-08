---
layout: development
comments: true
title: Sprint 6
permalink: /development/sprint-6/
order: 6
---

**STATUS: CONFIRMED**

* 
{:toc}

## Overview

The main goals of sprint 6 are:

1. Collect and display IATI financial data
2. Insert financial data from IATI to the AIMS - the first time
3. Handle updates of IATI financial data, including tricky types of transactions, errors or unexpected changes in IATI data or the AIMS
4. Create an overview dashboard for the DP, including import logs and configuration options.

### Data integrity

* data in the live AIMS should not be touched
* data in the test AIMS can be changed and adjusted as necessary for the purposes of testing
* data in the IATI import tool can be deleted and re-generated at will throughout the development process, until we agree otherwise.

### DP data overview

For the purposes of this sprint, we will use data from Canada, DFID, Netherlands.

|  | Canada | DFID | Netherlands | Asian Development Bank |
| ------ | ------ | ---- | ---- | ---- |
| Organisation identifier <sup>*</sup> | CA-3 | GB-1 | XM-DAC-7 | 46004 |
| Version | 2.01 | 2.01 | 2.01 | 1.03 |
| Hierarchies | 1 | 2 | 1 | 1 |
| Languages | English, French | English | English | English |

<sup>*</sup> this is currently the only- or most-used identifier. There may eventually be more than one identifier in use; see below.

The data from all three DPs is good. NB, Asian Development Bank data uses v1.03 of the Standard where the [`location` field is structured differently](/documentation/versions/).

## 1. Collect and display IATI financial data

In sprint 3 (step 1) we built a "general field selection interface", allowing users to decide whether data should be taken from IATI or the AIMS.

We need to extend that by breaking down "Financial data" field/section into three parts and providing a little more detail:

1. commitments
2. disbursements
3. planned disbursements.

For each category, we should show:

* the total value in that category (e.g. sum of all commitments)
* the amount per **Bangladesh fiscal year** in that category

For **commitments** and **disbursements**, in IATI, we should calculate this based on all transactions in each category. Remember that if we are looking at hierarchical projects, we should sum all transactions from all child projects, too. For **disbursements**, we should also include all **expenditures** in this category.

For **planned disbursements**, we should calculate this based on `<budget>` elements in all activities. We need some slightly more complicated logic here:

Within each activity:

* collect all `original` budgets
* collect all `revised` budgets
* for each `revised` budget:
  * if it overlaps **partially** or **wholly** with the `original` budget, take the `revised` budget and remove the `original` budget
  * if it does not overlap at all, then take the `revised` budget.
  
See the example below for an explanation of this logic.

### Calculating planned disbursements: merging revised and original budgets

| Budget type | Start date | End date | Value | Included? |
| ----------- | ---------- | -------- | ----- | --------- |
| Original | 2014-10-01 | 2014-12-31 | 50 | YES |
| Original | 2015-01-01 | 2015-03-31 | 100 | NO |
| Revised | 2015-01-01 | 2015-03-31 | 150 | YES |
| Original | 2016-01-01 | 2016-12-31 | 400 | NO |
| Revised | 2016-01-01 | 2016-06-30 | 300 | YES |
| Revised | 2016-07-01 | 2016-12-31 | 200 | YES |
| Revised | 2017-01-01 | 2017-06-30 | 150 | YES |

Having calculated this for each activity, in hierarchical activities, we would then take the amounts for each period in each activity and add them together.

* If there are budgets at hierarchy=1, then take only budgets from the hierarchy=1 activity. Ignore any budgets at hierarchy=2.
* Otherwise, and if there are budgets at hierarchy=2, then sum the amounts for each period in each activity.

## 2. Inserting financial data to AIMS - first time

If the user has chosen to take financial data from IATI, then we should update in the following way, for each category:

1. remove all financial data in the AIMS in that category
2. insert all new IATI transactions in that category

For example, if the user has chosen to import **commitments** then we should:

1. remove all commitments from the AIMS
2. insert each commitment in IATI as a new commitment in the AIMS

We can do this for a few basic fields to begin with. We should store:

* value (`transaction/value/text()`)
* transaction date (`transaction/transaction-date/@iso-date`)
* transaction currency (see below)

### Calculating exchange rates

We should use the Bangladesh Bank data to calculate exchange rates for each transaction.

We do not yet have daily rates available, so for now we should use the monthly average rates. However, we should prepare for having daily rates now.

* download data from Bangladesh Bank API for each month (by providing the last day of the month to the query)
* store `DOLLAR_PER_CURRENCY` rates for each currency and day. This could be in a flat file or a database, up to you.

Handling currency conversion for a particular transaction

* obtain the currency code, either from:
  * each transaction (`value/@currency`), OR
  * the activity (`iati-activity/@default-currency`)
* obtain the transaction value date (`transaction/value/@value-date`)
* convert the transaction value (`transaction/value/text()`) to USD by using the *closest available currency conversion date to the transaction value date*, for the relevant currency code
* store the currency conversion rate in the AIMS as well.

### Adding remarks

In each transaction in the AIMS, we should add into the `remarks` section:
`Data automatically imported from IATI on YYYY-MM-DD`

[see mockup, tab "Transactions"](http://test.brough.io/bd/sprint6.htm)

## 3. Handling updates of IATI financial data

On a nightly basis, we will want to automatically re-sync IATI financial data with the AIMS' financial data.

The methodology for doing this is as follows:

1. Focus on projects where a link was established (in sprint 2) between the AIMS and IATI, and where the import preferences for that project (established in sprint 3) state that the financial data should come from IATI.
2. For each of the relevant categories of financial data (commitments, disbursement, planned disbursement) -- again, which of these is relevant will depend on the import preferences for this project -- collect two list of all transactions in IATI and AIMS respectively with:
   * transaction date
   * transaction value
3. If the AIMS contains any transactions not found in IATI, we should display a warning to the user that there was a mismatch (see below).
4. If IATI contains any transactions not found in AIMS -- i.e. where the transaction date is not found in the AIMS -- new transactions should be inserted.

### Warning on mismatch between IATI and AIMS transactions

There could be several reasons why a transaction appears in AIMS and not in IATI:

1. The user has manually entered a transaction into the AIMS
2. Headquarters has removed a particular transaction from the IATI data (this should not happen, but it could)
3. Headquarters has updated all the transaction dates in the IATI data to be different dates, e.g. if they are providing cumulative transactions rather than actual ones (again, this should not happen, but it could)
4. Some error has occurred leading to all financial data disappearing from the IATI data (again, this should not happen, but it could theoretically happen either in the headquarters data, the IATI Datastore, or our import of the data).

When this happens, we should:

1. Pause automatic updates of the DP's IATI data until the issue is resolved
2. Show an alert to the DP asking them to decide on a course of action.

The alert should show the difference between IATI and AIMS and the transactions that appear in AIMS but not in IATI.

The options for the user (for each project) should be:

1. Remove transactions from AIMS and import new transactions from IATI
2. Stop automatically importing IATI data and switch to taking data from the AIMS instead (this should update the project-specific import preferences)
3. Take no action now but remind me next time the data is checked (presumably the following night)

[see mockup, tab "Transaction merge conflict alert"](http://test.brough.io/bd/sprint6.htm)

## 4. DP dashboard

We are beginning to develop some quite complicated functionality at this point and it would be useful to develop a dashboard for each DP that shows what data has been imported from IATI, allows the DP to adjust import preferences, and shows any alerts.

We should show the following screens (either as tabs or as sections of the same page):

1. Latest data downloaded
2. List of imports / changes to particular projects
3. List of alerts for this DP (e.g. if something went wrong on import) -- e.g. the above warnings if there is a mismatch in financial data
4. General import preferences and project-specific import preferences
5. List of activities in IATI that have not been imported to the AIMS (and option to begin import of those activities -- which would take you to sprint 2)
6. List of activities from other DPs that have been delegated to you
7. List of your activities that you have delegated to other DPs (and ability to "recall" those activities if the other DP has not already mapped them to their own activitis in sprint 4)

Some of these screens can be placeholders for now.

[see mockup, tab "Donor landing page"](http://test.brough.io/bd/sprint6.htm)

## Update: first week of sprint 6

In the first week of sprint 6 (in reality, only three days), we will focus on the following areas:

* work with commitments and disbursements only (not planned disbursements / budgets for now)
* obtain and store exchange rates from the Bank of Bangladesh
* develop a simple screen that shows a summary of IATI transactions that would be imported to the AIMS, including the currency conversion rates and dates
* show a simple DP dashboard with mostly placeholder data.

## Update: second week of sprint 6

We have made great progress in the first part of this sprint and I think we have only one point remaining from above:

1. Updating and handling alerts on mismatch

In addition, we should add a couple of features to the DP Dashboard:

1. List parse errors for individual DPs' data (preferably as detailed as possible - explaining what failed)
2. Import transactional data for co-financed and trust fund projects

Updating and handling alerts on mismatch is detailed above. It would be great to implement that, using the DP landing page to display the warnings.

Parse errors can similarly be displayed on the DP landing page, in line with the existing mock-ups.

[see mockup, tab "Donor landing page"](http://test.brough.io/bd/sprint6.htm)

Regarding importing transactional data for co-financed and trust-fund projects...


### Importing transactional data for co-financed / trust fund projects

We already have a process for merging activities from different DPs -- building on the [methodology outlined here](http://bd-iati.github.io/documentation/merging-updating-cofinanced-projects/).

Once we have merged financial data (in the current interface):

1. these preferences should be saved (i.e. do take DFID commitments, do not take Netherlands commitments)
2. the financial data that has been chosen to be included should then immediately be written to the AIMS. For co-financed projects, this should include individual transactions; for trust funds, it should update the total value of commitments held in the AIMS.

### Handling updates for financial data for co-financed / trust fund projects

When the DP imports their own activity to the AIMS (or when the activity is updated), the import routine for financial data should respect the preferences set here.

For now, we can handle this by adjusting the financial data import [routine outlined above](#inserting-financial-data-to-aims---first-time) to be specific to an individual DP. For example:

* on updating / importing a UNDP activity, check the commitments / disbursements / etc. for that project in the AIMS which are tagged as from UNDP
* on updating / importing a DFID activity which has been mapped to a UNDP project in the AIMS (and where preferences have been set to import the DFID financial data), check the commitments / disbursements for the UNDP project in the AIMS which are tagged as from DFID.
