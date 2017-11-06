---
layout: development
comments: true
title: Climate Finance - Sprint 1
permalink: /development/sprint-cf-1/
order: 11
---

**STATUS: DRAFT**

* 
{:toc}

## Overview: Capture Relevant Data

Note: the sprints in the previous set of work were labelled 1-7. This is a distinct, new set of work, providing for some specific improvements around climate finance but also a continuation of the previous set of work.

The main goals of sprint 1 are:

1. Establish basic test framework
2. Add policy markers to AIMS
3. Add Bengali language fields to AIMS

Subsequent sprints will deal with:

* Improve capture of data by implementing partners in AIMS
* Add results data to AIMS
* Improve sector classifications

### Data integrity

* data in the live AIMS should not be touched
* data in the test AIMS can be changed and adjusted as necessary for the purposes of testing

## 1.1 Establish basic test framework

We agreed to use the Cucumber framework for writing a series of Behaviour-Driven Design tests. We need to establish this on the existing AIMS to ensure that any subsequent development does not break the existing system. Let's start with the following two tests to make sure that (1) the main Dashboad loads; (2) there are a number of projects found in the List; (3) each of the project pages loads

```
Feature: Dashboard loads correctly

  Scenario: User visits Dashboard
    Given User visits the Dashboard
    Then Status is 200 OK

  Scenario: User clicks on List tab of Dashboard
    Given User visits the Dashboard
    And User clicks on the `List` tab
    Then at least one row is displayed in the table
```

```
Feature: Project page loads

  Scenario: User vists each project page
    Given User visits each project page link from the `List` tab
    Then Status is 200 OK
```

We will build up the list of tests over time, but it is important to establish a basic framework at the outset.

## 1.2 Add policy markers

1. Add two policy marker fields, with significance codelist
2. In the UI, include these under the `Sector contribution` tab
3. No need for any other visualisation of this information for now.
4. No need for importing this data from IATI for now.

For each project, add two new fields to AIMS:

* climate change mitigation
* climate change adaptation

These map to values on the IATI [PolicyMarker codelist](http://iatistandard.org/202/codelists/PolicyMarker/)

There can be multiple policy markers for each project.

For each field, add "significance" flag (displayed as a drop-down menu) with the following options:

| code | name | 
| ------ | ------ |
| NULL | not screened |
| 0 | not targeted |
| 1 | significant objective |
| 2 | principal objective |

See [PolicySignificance codelist](http://iatistandard.org/202/codelists/PolicySignificance/)

See also IATI [`policy-marker` element](iatistandard.org/202/activity-standard/iati-activities/iati-activity/policy-marker)

Note that this would be distinct from the existing sector classification.

Notes:

1. For now, we will not include any other policy markers (either OECD / IATI-specified or country-specified)
2. For now, "significance" will not be translated to a numerical value (e.g. 40% and 100%?), though we can consider how to visualise / aggregate this later

### Tests

```
Feature: Policy markers

  Scenario: User can see a mitigation policy marker
    Given User edits a project
    And User clicks on the `Sector Contribition` tab
    And User clicks on the `Policy Markers` drop down
    Then a `Climate Change: Mitigation` Policy Marker is visible with a dropdown box
    And the Dropdown box has the following values: `Not Screened`, `Not Targeted`, `Significant Objective`, `Principal Objective`

  Scenario: User can see an adaptation policy marker
    Given User edits a project
    And User clicks on the `Sector Contribition` tab
    And User clicks on the `Policy Markers` drop down
    Then a `Climate Change: Adaptation` Policy Marker is visible with a dropdown box
    And the Dropdown box has the following values: `Not Screened`, `Not Targeted`, `Significant Objective`, `Principal Objective`
  
  Scenario: User can save policy marker options
    Given User edits a project
    And User clicks on the `Sector Contribition` tab
    And User clicks on the `Policy Markers` drop down
    And for each policy marker, User select a value
    Then the value for that policy marker is saved to the database
```

## 1.3 Add Bengali-language fields

1. Make it possible to enter Bengali language for titles and objectives
2. Make it possible to provide English and Bengali language labels for other codes used in the system (e.g. implementing organisation, etc)
3. We don't need to show this in the UI or visualisations right now

For each project, add two new fields to AIMS:

* Title (Bengali)
* Objective (Bengali)

For all configurable codelists in the `Configuration` admin interface and for all configurable codelists in the `Setup` admin interface (with the exception of: `User Verification`, `Exchange Rate`, `Currency Mapping`): add an additional field: `Name (Bengali)`

### Tests

```
Feature: Bengali-language fields on project pages

  Scenario: User can see Bengali-language title and objectives fields
    Given User edits a project
    Then a `Title: Bengali` text field is visible
    And an `Objectives: Bengali` text field is visible

  Scenario: User can save a Bengali-language title and objectives
    Given User edits a project
    And User edits the `Title: Bengali` text field
    Or the `Objectives: Bengali` text field
    Then the value for that text field is saved to the database

Feature: Bengali-language fields in codelists

  Scenario: User can see Bengali-language fields for all configurable codelists
    Given User edits a configurable codelist
    And the codelist is not `User Verification`, `Exchange Rate`, or `Currency Mapping`
    Then a `Name (Bengali)` text field is visible

  Scenario: User can save Bengali-language fields for all configurable codelists
    Given User edits a configurable codelist
    And the codelist is not `User Verification`, `Exchange Rate`, or `Currency Mapping`
    And the User edits the `Name (Bengali)` text field
    Then the value for that text field is saved to the database
```
