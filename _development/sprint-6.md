---
layout: development
comments: true
title: Sprint 6
permalink: /development/sprint-6/
order: 6
---

**STATUS: DRAFT**

* 
{:toc}

## Overview

The main goals of sprint 6 are:

1. Import financial data from IATI to the AIMS
2. Handle tricky types of transactions
3. Handle errors or unexpected changes in IATI data or the AIMS

### Data integrity

* data in the live AIMS should not be touched
* data in the test AIMS can be changed and adjusted as necessary for the purposes of testing
* data in the IATI import tool can be deleted and re-generated at will throughout the development process, until we agree otherwise.

### DP data overview

For the purposes of this sprint, we will use data from Canada, DFID, Netherlands.

|  | Canada | DFID | UNDP | World Bank |
| ------ | ------ | ---- | ---- | 
| Organisation identifier <sup>*</sup> | CA-3 | GB-1 | XM-DAC-41114 | 44000 |
| Version | 2.01 | 2.01 | 1.04 | 1.05 |
| Hierarchies | 1 | 2 | 2 | 1 |
| Languages | English, French | English | English | English |

<sup>*</sup> this is currently the only- or most-used identifier. There may eventually be more than one identifier in use; see below.

The data from all three DPs is good.

## 1. Import financial data from IATI to the AIMS

In sprint 3 (step 1) we build a "general field selection interface", allowing users to decide whether data should be taken from IATI or the AIMS.

We need to extend that by breaking down the options for financial data into three parts and providing a little more detail:

1. commitments
2. disbursements
3. planned disbursements.

For each category, we should show:

* the total value in that category (e.g. sum of all commitments)
* the amount per Bangladesh fiscal year in that category

For **commitments** and **disbursements**, in IATI, we should calculate this based on all transactions in each category. Remember that if we are looking at hierarchical projects, we should sum all transactions from all child projects, too.

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
