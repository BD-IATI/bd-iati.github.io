---
layout: development
comments: true
title: Sprint 4
permalink: /development/sprint-4/
order: 4
---

**STATUS: CONFIRMED**

* 
{:toc}

## Overview

The main goals of sprint 4 are:

1. allow users to pass activities over to each other
2. development of interfaces to handle more complicated projects
3. Trust Funds simple interface
4. Co-funding simple interface
5. implement some user management (authentication / authorization)

### Data integrity

* data in the live AIMS should not be touched
* data in the test AIMS can be changed and adjusted as necessary for the purposes of testing
* data in the IATI import tool can be deleted and re-generated at will throughout the development process, until we agree otherwise, perhaps in some of the last few sprints.

### DP data overview

For the purposes of this sprint, we will use data from Canada, DFID, UNDP and World Bank.

|  | Canada | DFID | UNDP | World Bank |
| ------ | ------ | ---- | ---- | 
| Organisation identifier <sup>*</sup> | CA-3 | GB-1 | XM-DAC-41114 | 44000 |
| Version | 2.01 | 2.01 | 1.04 | 1.05 |
| Hierarchies | 1 | 2 | 2 | 1 |
| Languages | English, French | English | English | English |

<sup>*</sup> this is currently the only- or most-used identifier. There may eventually be more than one identifier in use; see below.

The data from all four DPs is good. We're looking at UNDP and World Bank data in this sprint because they operate projects funded by Canada and DFID. Note that the World Bank does not yet publish Trust Funds in its IATI data.

## 1. Allow users to pass activities over to each other

In sprint 2 (step 3) we allow users to "Filter DP activities" - as a way of sorting activities into:

1. activities that are the DP's own projects
2. activities that are the DP's contributions to projects managed by **other DPs**

We now want to save the second set of activities and record them as having been passed across to the other DP. This could just be a question of altering [the basic table we created in sprint 1](../sprint-1/#storing-individual-activities) by adding an additional two columns:

| key | value | description |
| --- | ----- | ----------- |
| assigned_to_organisation_id | 44001 | This project has been assigned to another organisation (default value should probably be the original organisation's organisation_id? Or perhaps `null`.) |
| assigned_to_datetime | 2016-02-29 19:53:00 | A timestamp for when the project was assigned to another organisation. |

We may want to think about a notification system within the app for alerting other users that these sorts of things have happened, though perhaps we can just use the assigned_to_datetime to alert the organisation receiving this activity when they log on.

## 2. Development of interfaces to handle more complex projects

There are two main types of complicated projects we need to handle:

1. **Trust Funds** -- where different organisations put money into a big pot (the pot is managed by a particular DP - normally the World Bank), and projects are then funded out of that pot;
2. **Co-funding** -- where different organisations agree to fund the same project, but disburse their money separately, directly to the implementing organisation.

The main way that we handle this is to create an interface for the organisation that gets assigned the activities (let's call them the **Managing DP**). It then becomes that organisation's responsibility to sort out how activities should be mapped together.

The Managing DP, when they log in, should be presented with a list of activities that have been assigned to them, with the option to map them against:

* one of their own projects, **OR**
* a trust fund.

In the drop-down lists in the mock-up below, **all the Managing DP's projects** and **all trust funds** should be shown.

[see mockup "Activities from other DPs"](http://test.brough.io/bd/sprint4.htm)

## 3. Trust Funds "overview interface"

Once the Managing DP has assigned activities to their own projects or to a Trust Fund, they should be able to decide how to handle this data.

In this interface, we assume that the user has the right to handle Trust Funds. In reality, we may only want to give these permissions to some DPs (e.g. the World Bank) -- but we can come back to that later.

We should create a simple overview of the Trust Funds interface that allows the Managing DP to decide what to do with the commitments that have been assigned to them (and which they have then mapped against a Trust Fund). They can choose to allow these new commitments to be entered into the AIMS, or to reject them.

In the AIMS, the cumulative amount of commitments per DP is stored rather than any breakdown over time. In IATI data, we can show individual commitments.

We don't need to enter this data to the AIMS at this point -- just to create the interface that makes it possible.

[see mockup "Trust Funds"](http://test.brough.io/bd/sprint4.htm)

## 4. Co-financing "overview interface"

Once the Managing DP has assigned activities to their own projects, they should be able to decide how to handle this data. We assume that where projects have been mapped together by the Managing DP, they are co-financing arrangements.

We should show the list of the Managing DP's projects where other organisations' projects have been mapped to them. We should show:

* <s>total</s> *each* disbursement and commitment for the project by organisation (according to the AIMS data)
* <s>total</s> *each* disbursement and commitment for the project from the new IATI activities that have been assigned from other DPs

The user should be able to decide whether to accept or reject financial data from other DPs. <s>They should not be able to reject individual transactions, but they should be able to remove all disbursements and/or all commitments from individual DPs.</s> *We should show the breakdown of transactions for now. If it's too much data to show on the page (or if it isn't clear) then we can show the total value of commitments or disbursements.*

[see mockup "Co-financing"](http://test.brough.io/bd/sprint4.htm)

## 5. User management

As part of all of this, we will need to introduce the notion of a "user" to the interface. This will be the mechanism by which we will allow users to be responsible for their own projects and to pass responsibility over to other user.

If possible, it would be good to make use of the user management in the AIMS, but this should be a loose coupling so that the IATI import module remains somewhat generalised and could be applied in other systems that do not use exactly the same AIMS.

We should then create a simple welcome screen for a user which allows them to import their organisation's projects - taking us to [the very first tab of sprint 2](http://test.brough.io/bd/sprint2.htm).
