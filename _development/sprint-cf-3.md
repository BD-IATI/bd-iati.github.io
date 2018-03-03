---
layout: development
comments: true
title: Climate Finance - Sprint 3
permalink: /development/sprint-cf-3/
order: 13
---

**STATUS: DRAFT**

* 
{:toc}

## Overview: Get Better Data

The main goals of sprint 3 are:

1. Capture policy markers from IATI
2. Capture results data from IATI

### Data integrity

* data in the live AIMS should not be touched
* data in the test AIMS can be changed and adjusted as necessary for the purposes of testing

### Example data for testing

* World Bank data contains results data
* Netherlands data contains policy markers

## 3.1 Capture policy markers from IATI

In sprint 1, we added new fields to the AIMS to allow for the entry of policy markers. Now we will capture these fields from IATI data. We need to do this both for new projects and existing projects (where these have been linked from IATI data).

When importing or updating projects from IATI to the AIMS:

* For each policy marker in IATI, IF there is an equivalent policy marker in the AIMS, import that policy marker with the related policy marker significance code.
* Do not import policy markers with significance 0.
* Note: we need to the case where we choose to remove policy markers from the AIMS, or where new policy markers are created. In both cases, the policy marker in the IATI data should just be ignored.

These map to values on the IATI [PolicyMarker codelist](http://iatistandard.org/202/codelists/PolicyMarker/)

There can be multiple policy markers for each project.

See [PolicySignificance codelist](http://iatistandard.org/202/codelists/PolicySignificance/)

See also IATI [`policy-marker` element](http://iatistandard.org/202/activity-standard/iati-activities/iati-activity/policy-marker)

### Tests

```
Feature: Policy markers from IATI

  Scenario: User can see policy markers in the IATI import interface
    Given User uses the IATI import module to import a project
    And User proceeds to the `5. Set import preferences` step
    Then the page includes the list of policy markers that have a significance code that is not `0`.

  Scenario: User can import a policy marker
    Given User imports a project from IATI data
    And the project contains at least one policy marker with a significance code that is not `0`
    Then on the `Sector Contribution` tab the `Policy Marker` collapsible contains the same policy markers
```

## 3.2 Capture results data from IATI

Where IATI data contains results data, we need to import this to the AIMS. Remember that we simplify a little from the IATI Standard in order to simplify the user interface (essentially flattening results down to indicators). For each `result/indicator`, we need to create a new entry in the Results section of the project in the AIMS.

### Mapping of fields

We map from IATI data in the following way. Note that the `Period` data is for each `period`.

| Field in IATI | Field in AIMS |
| --- | --- |
| result/indicator/title/narrative/text() OR result/title/narrative/text() | Indicator Title |
| result/@type | Indicator Type |
| indicator/baseline/@year | Baseline Year |
| indicator/baseline/@value | Baseline Value |
| indicator/period/period-start/@iso-date | Period Start |
| indicator/period/period-end/@iso-date | Period End |
| indicator/period/target/@value| Target Value |
| indicator/period/actual/@value | Actual Value |

```
Feature: Results

  Scenario: User can see results in the IATI import interface
    Given User uses the IATI import module to import a project
    And User proceeds to the `5. Set import preferences` step
    Then the page includes the number of `/result/indicator` (e.g. "5 results")

  Scenario: User can import results data
    Given User imports a project from IATI data
    And the project contains at least one `result/indicator`
    Then on the `Results` tab the table contains at least one indicator.
```
