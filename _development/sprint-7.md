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
2. Allow activities to be grouped into recognisable projects (required for USAID projects)
3. Allow projects to be manually mapped to the AIMS where automatic mapping failed
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

## 2. Allow projects to be grouped

In sprint 2 we developed an interface to allow unmatched projects to be grouped. Though we will replace that interface with something simpler, we could use the same interface for this new step.

After step 2 (Filter Bangladesh-relevant activities) we should add in an additional step to allow users to group their activities together.

**NB: in the case of the US there are 584 activities (at last count). So this grouping exercise will need to include some filtering too.**

## 3. Improve manual mapping interface

At the moment, step 5 is quite confusing. We should merge it with step 4 in the following way:

1. In the `IATI activities not found in the AIMS` section, there should be a drop down box of all projects from that DP in the AIMS, with the top option being `New project`. 
2. Selecting an AIMS project to map to should also remove the relevant projects from the `AIMS projects not found in IATI` section.
3. Deselecting an AIMS project from the drop-down box should return it to the `AIMS projects not found in IATI` section.

## 4. Save progress as the user works through the stages

It should be possible for a user to get to each of the stages and return (e.g. the following day, or after closing their browser) to the point they were last at. This will require saving the state of their progress as they go.

An effect of this is also that there could be a set of projects that are in the middle of being processed when a new project appears (e.g. the new project is created overnight). Projects in the middle of being processed should be completed before beginning to process new projects.

## 5. Speed up performance

At the moment the import module is quite slow as we are sending a lot of data to the browser. This is deliberate as it has made development more straightforward, but it needs to be sped up significantly before we move to use the module in production.
