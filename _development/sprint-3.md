---
layout: development
comments: true
title: Sprint 3
permalink: /development/sprint-3/
order: 3
---

**STATUS: CONFIRMED**

* 
{:toc}

## Overview

The main goals of sprint 3 are:

1. create a general field selection interface - providing a template for where to generally take data from for this donor's projects - and store those preferences for next time
2. display a list of projects with a couple of warning flags where the data looks strange
3. allow a user to override these "general preferences" for specific projects
4. test import of basic data fields to the test AIMS system (titles and descriptions)
5. think a little about how we will handle financial data.

### Data integrity

* data in the live AIMS should not be touched
* data in the test AIMS can be changed and adjusted as necessary for the purposes of testing
* data in the IATI import tool can be deleted and re-generated at will throughout the development process, until we agree otherwise, perhaps in some of the last few sprints.

### DP data overview

For the purposes of this sprint, we will use data from Canada, DFID, and the European Union (EU only if we have time).

|  | Canada | DFID | EU |
| ------ | ------ | ---- | ---- |
| Organisation identifier <sup>*</sup> | CA-3 | GB-1 | XI-IATI-EC_DEVCO |
| Version | 2.01 | 1.05 | 1.04 |
| Hierarchies | 1 | 2 | 2 |
| Languages | English, French | English | English |

<sup>*</sup> this is currently the only- or most-used identifier. There may eventually be more than one identifier in use; see below.

The data from both DPs is good. See also some more detailed data analysis for [Canada](/data/canada/) and [DFID](/data/dfid/).

## 1. Build a general field selection interface

A DP should see all projects that they manage. In other words, activities that at the end of sprint 2 have been determined as not managed by any other DP. DFID would see their activities and not any activities that they have delegated to another DP such as the World Bank.

We need to have a way of allowing the user to provide some general preferences about where data should be sourced from for each field. Our assumption is that data quality is likely to be fairly consistent within individual DPs' data &ndash; so if descriptions are poor for one or two projects, they're likely to be poor for the rest of that DP's data.

For these purposes, we should select **one project** from IATI and the same project from the AIMS. We need to show the project data side by side and give the user the opportunity to select where they would prefer to take the data from.

Right now, we only care about being able to import titles and descriptions, but we should also build a basic interface to show financial data from either system.

### Storing preferences

Once a user has provided their general import preferences, we should store these so that we can present the same options back to them next time (for example, when a new project comes along). This could be in a really simple table like the following:

| DP | Field | Source |
| -- | ----- | ------ |
| DFID | title | AIMS |
| DFID | description | IATI |
| DFID | transaction | IATI |

I think it probably makes sense to just use the element name (e.g. `title`) as the name of the field. I can't see a reason why we would want any more granular controls than that.

The interface should read from this preferences table when loading the interface, and display the user's previous choices. This means that in future, when new projects are published in their IATI data, they can choose to import them easily using the same set of preferences that they previously stated.

[see mockup, tab "6. Set import preferences"](http://test.brough.io/bd/sprint3.htm)

## 2. Display a list of projects

We should then display a list of all the projects and show some summary financial data about each project, highlighting those where there are big discrepancies. If we have enough room and it isn't too cluttered, ideally we would show both `commitments` and `disbursements`. We could then highlight those areas where commitments or disbursements vary by over 5%.

We may want to think about other heuristics we could use to show other warning flags at this stage, but this is probably sufficient for now.

[see mockup, tab "7. Review and adjust before import"](http://test.brough.io/bd/sprint3.htm)

## 3. Project-level field preference selection

Having specified the *general* preferences on field selection, we also want to allow the user to override this for specific projects if necessary. The interface should look the same as the general preferences interface.

The mockup for the previous step suggests that we allow a user to adjust preferences for individual projects by clicking on a little "edit" button next to the project. That probably makes sense, though we should probably also make it possible to scroll through projects (see field selection for the next project, for example).

## 4. Test import of basic data fields to the test AIMS system

Once the user has established their preferences for field import, we can then proceed with importing those fields to the **test** AIMS system. For the purposes of this sprint, we will only import the **title** and **description** from each project.

The only mockup we have for this step is the button at the bottom of the "Review and adjust before import" step. We should also have some basic information provided back to the user about whether the import process was successful or not.

[see mockup, tab "7. Review and adjust before import"](http://test.brough.io/bd/sprint3.htm)

## 5. Think about how to handle financial data

In the proceeding steps, we don't need to try and import any financial data. However, we should have a think about how we present the data and how we might deal with it later.

In this sprint, we should at least be able to:

* present the total value of commitments and disbursements respectively, for each project, in each system
* show the total values of commitments and disbursements in each system

At some point, we should also try to:

* show the total value of commitments / disbursements by year
* show the total value of commitments / disbursements by fiscal year

If we can get some of this working now then that will put us in a good position later.