---
layout: development
comments: true
title: Sprint 7
permalink: /development/sprint-7/
order: 7
---

**STATUS: DRAFT**

* 
{:toc}

## Overview

The main goals of sprint 7 are:

1. Allow components of projects to be deselected (required for DFID projects)
2. Allow projects to be manually mapped to the AIMS where automatic mapping failed
3. Allow activities to be grouped into recognisable projects (required for USAID projects)
4. Save progress as the user works through the stages
5. Speed up performance

### Data integrity

* data in the live AIMS should not be touched
* data in the test AIMS can be changed and adjusted as necessary for the purposes of testing
* data in the IATI import tool can be deleted and re-generated at will.

### DP data overview

We're now using data from as many DPs as possible. In this stage, we will improve the way we are handling DFID and USAID data in particular.

## 1. Allow components of projects to be deselected

In sprint 2 we allowed users to tell us which hierarchy of projects they should map from. However, where there are multiple sub-components of a project, the user needs to be able to deselect some of those sub-components.

After step 2 (Filter Bangladesh-relevant activities) we should therefore add in an additional step if:

1. a donor has a hierarchy in their activities
2. the donor has not selected the lowest level

We should then show each of the projects and their subcomponents, with a checkbox to allow the subcomponents to be deselected.

[See mockup ("2.1. Select project components")](http://test.brough.io/bd/sprint7.htm)

## 2. Improve manual mapping interface

At the moment, step 5 is quite confusing. We should merge it with step 4 in the following way:

1. In the `IATI activities not found in the AIMS` section, there should be a drop down box of all projects from that DP in the AIMS, with the top option being `New project`. 
2. Selecting an AIMS project to map to should also remove the relevant projects from the `IATI activities not found in the AIMS` section and display it in the `IATI activities matched to the AIMS` section.
3. Clicking the `unmatch` button next to a project in the `IATI activities matched to the AIMS` section should return that project to the `IATI activities not found in the AIMS` section.

[See mockup ("4. Select project components")](http://test.brough.io/bd/sprint7.htm)

## 3. Allow projects to be grouped

In sprint 2 we developed an interface to allow projects to be grouped. We need this in particular for USAID where there are a large number of activities that should be grouped to make recognisable projects. However, this interface is currently very complex and would be slow for a large number of activities, so we will remove this interface and simplify the functionality.

We can achieve this in step 4, under `IATI activities not found in the AIMS`.

* We should allow multiple IATI projects to be mapped to a single AIMS project.
* We should allow the list of projects to be filtered by extending organisation (using a drop-down or typeahead interface)
* We should also allow the list of projects to be filtered by project ID (try typing in `AID-388` to the "Project ID" filter, for example)

Step 5 (`IATI activities matched to the AIMS`) can now be removed as we have now incorporated the functionality elsewhere.

[See mockup ("4. Select project components")](http://test.brough.io/bd/sprint7.htm)

## 4. Save progress as the user works through the stages

It should be possible for a user to get to each of the stages and return (e.g. the following day, or after closing their browser) to the point they were last at. This will require saving the state of their progress as they move through the interface. On the Dashboard, there should also be a button to return to their last-saved progress.

As a side-effect of this, there could be a set of projects that are in the middle of being processed when a new project appears (e.g. the new project is created overnight). Projects in the middle of being processed should be completed before beginning to process new projects.

## 5. Speed up performance

At the moment the import module is quite slow as we are sending a lot of data to the browser. This is deliberate as it has made development more straightforward, but it needs to be sped up significantly before we move to use the module in production.

## Remaining to do

Once we've completed the other steps identified above, we need to go through and check the interface works for a range of different donors, and ensure the user interface is clear and clean. This will probably involve some textual and stylistic modification. We also need to check that updates are working well and that the project delegation / merging functions work well.
