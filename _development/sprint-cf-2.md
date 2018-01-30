---
layout: development
comments: true
title: Climate Finance - Sprint 2
permalink: /development/sprint-cf-2/
order: 12
---

**STATUS: DRAFT**

* 
{:toc}

## Overview: Capture Relevant Data

Note: the sprints in the previous set of work were labelled 1-7. This is a distinct, new set of work, providing for some specific improvements around climate finance but also a continuation of the previous set of work.

The main goals of sprint 2 are:

1. Add results data to AIMS
2. Improve capture of data by implementing partners in AIMS

### Data integrity

* data in the live AIMS should not be touched
* data in the test AIMS can be changed and adjusted as necessary for the purposes of testing

## 1.1 Add results data fields

1. Create a new tab in the project editor for `Results`
2. Add fields to enter results data in line with the mock up
3. We follow the IATI Standard but simplify a little,

See [mock up of results data entry form](https://test.brough.io/bd/sprint2-cf.htm)

For each project, add a new tab allowing for multiple indicators per project, and multiple reporting periods per indicator.

### Simplification from the IATI model
Note that we simplify a little from the IATI Standard in a couple of ways in order to avoid overcomplicating the user interface:

* we ignore the top-level `result` element
  * there can be multiple `indicators` per `result`
  * however in reality, there is normally a single indicator per result
  * when importing from IATI data (in a later sprint), we can take narrative elements from the result as the indicator narrative, if this information is unavailable
* we ignore the `dimension` element
  * this allows for a disaggregtion of individual reporting periods, for example by gender, age, etc.
  * this is only being introduced in 2.03 and for the organisations we are most concerned with, the coverage is likely to be low for some time

The indicator type field should be a drop-down menu with the following available values:

| code | name | 
| ------ | ------ |
| 1 | Output |
| 2 | Outcome |
| 3 | Impact |

See IATI [ResultType codelist](http://iatistandard.org/202/codelists/ResultType/)

See also IATI [`result` element](http://iatistandard.org/202/activity-standard/iati-activities/iati-activity/result)

Question:

* Not sure when this data should be saved to the database - on creation of each indicator / period, or when user clicks `Update` / `Save` button?

### Tests

```
Feature: Results

  Scenario: User can see the results tab
    Given User edits a project
    And User clicks on the `Results` tab
    Then the page includes text `Below, you can add results for your activities.`

  Scenario: User can add an indicator
    Given User edits a project
    And User clicks on the `Results` tab
    Then an `Indicator` panel is available
    And the panel has the following fields: `indicatorTitle`, `indicatorType`, `indicatorBaselineYear`, `indicatorBaselineValue`
    And the panel has at least one `Reporting Period` row

  Scenario: User edits indicator title
    Given User edits a project
    And User clicks on the `Results` tab
    And User edits the `indicatorTitle` or `indicatorType` field
    Then the heading of the `Indicator` panel is updated with the value of the field
  
  Scenario: User can add a Reporting Period
    Given User edits a project
    And User clicks on the `Results` tab
    And User adds a Reporting Period row
    Then the row has the following fields: `fromDate`, `toDate`, `targetValue`, `actualValue`
```

## 1.2 Improve capture of data by implementing partners

1. Add new collapsible under `Funding information` on the project `Funding Info.` tab for `Incoming Funds`
2. The add transaction modal dialog should look the same as the commitment/disbursement modal dialog, with an additional drop-down to select the transaction type, with the values `Incoming Commitment` and `Incoming Disbursement`
3. In aggregations (e.g. by project, organisation or sector), subtract `Incoming Commitments` from `Commitments`, and subtract `Incoming Disbursements` from `Disbursements`, always ensuring that the result is at least 0.

In order to accurately capture data from UNDP and other implementing organisations, we need to be able to reflect funds that have been received in (e.g.) UNDP's projects from other donors.

See IATI [TransactionType codelist](http://iatistandard.org/202/codelists/TransactionType/)

```
Feature: Incoming Funds

  Scenario: User can see the Incoming Funds collapsible
    Given User edits a project
    And User clicks on the `Funding Info.` tab
    Then the page includes text `Incoming Funds`

  Scenario: User can add an Incoming Fund
    Given User edits a project
    And User clicks on the `Funding Info.` tab
    And User clicks on the `Incoming Funds` collapisble
    Then the User can add a new transaction of type `Incoming Commitment` or `Incoming Disbursement`

  Scenario: User generates report by funding organisation
    Given User generates the `Development Partner Profile` report
    Then the total disbursement for each Development Partner is zero, or the total of disbursements minus the total of incoming disbursements, whichever is greater
```
