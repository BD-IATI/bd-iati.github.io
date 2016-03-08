---
layout: post
title: What we learned in the first three weeks of development
comments: true
author: mark
excerpt: Over the last three weeks Technovista, the local IT company we are working with, have been hard at work. We discuss where we've got to so far and what we've learned.
---

Just over three weeks ago [Technovista](http://www.technovista.com.bd/), the local IT company we are working with, began development on building an IATI import tool for the Bangladesh AIMS.

## Great progress...

We made excellent progress over the first three weeks, including getting a basic set-up working:

* retrieval of data for individual DPs from the IATI Datastore 
* an automatic way to convert from v1 to v2 of the IATI Standard (this was done in the first week, and we were particularly impressed with the speed and thoroughness of a fairly complicated task)
* setting up basic storage of activities in the system and making data available to the rest of the application through a simple API

We also have a good first version of the front-end working. We have [some screenshots below](#walk-through-of-interface-to-date) that talk through the different steps. Though we'll certainly want to simplify and improve upon this interface, it gives a good indication of our thinking on how we're approaching the use of IATI data. We have the following steps running:

* handling data with multiple hierarchies
* filtering out projects not relevant to Bangladesh
* beginning to handle double-counting, where projects are reported by multiple DPs
* matching projects to the AIMS.

## ... and some interesting challenges

We've come across some interesting challenges and questions -- some of them to do with the data, and some of them more conceptual questions.

* **establishing "main" or "dominant" classifications** -- aid type, for example, can be published in many different places -- either in activities or in transactions. This becomes more complicated when using hierarchical activities. We came up with [a methodology for calculating the "dominant" aid type](https://github.com/BD-IATI/edi/issues/3) by looking at activities, then transactions.
* **tracking changes in organisation identifiers** -- DFID updated its data to v2.01 from v1.05 last week. In the process, its organisation identifier changed from `GB-1` to `GB-GOV-1`. Our previous request for all activities from `GB-1` therefore returned no activities. After taking a look at the data, we updated the organisation identifier we were looking for. But it would also be useful if publishers used the `other-identifier` element to state their previous identifier, and if the IATI Datastore then would return those activities.

## Next steps

As we have a pretty tight timetable for completion of the IATI-AIMS import module, we will keep moving forward with feature development. The next two weeks will focus on the following issues:

1. a field-level import interface (to select where data should be taken from - IATI or the AIMS)
2. a rough first interface to handle more complicated projects published by multiple DPs (trust fund and co-financed projects)

You can take a look at our development plans for [sprint 3](/development/sprint-3/) and [sprint 4](/development/sprint-4/).

Keep reading for a more detailed walk-through of what we've developed to date.

------

## Walk-through of interface to date

### No need to touch XML

![Select a DP to import](/img/aims-import-1-sm.png "Select a DP to import"){: .img-caption } 

XML is the way that IATI data is made machine-readable, and the standard allows systems to understand how they can make use of this data. But for humans, it's sometimes a little scary. We therefore handle all of the importing of IATI data in the background, using the IATI Datastore to query data for individual DPs. The data is downloaded nightly to speed up the interface.

<hr class="hidden" />

### Handling hierarchies (or levels) of activities

![Handling hierarchies in DFID projects](/img/aims-import-2-sm.png "Handling hierarchies in DFID projects"){: .img-caption } 

In IATI data, DPs can choose to structure their activities according to their own business model. For example, if they have projects that contain many sub-components, they can represent this structure in their IATI data. Some DPs have chosen to do this (e.g. DFID, EU, UNDP, USA) though most others have not.

In order to handle this complication, we ask the user to tell us which level they'd like to map from -- the project or the sub-component. We also give the user a recommendation by comparing the `iati-identifier` for hierarchy=1 and hierarchy=2 activities found in their IATI data, with those identifiers stored in the AIMS.

In this screenshot, we found that 26% of DFID hierarchy 1 activities were found in the AIMS, and 0% of hierarchy 2 activities. So the user should choose hierarchy 1.

<hr class="hidden" />

### Filtering out projects likely not relevant for Bangladesh

![Filtering out projects likely not relevant for Bangladesh in Canadian data](/img/aims-import-3-sm.png "Filtering out projects likely not relevant for Bangladesh in Canadian data"){: .img-caption } 

DPs can publish in their IATI data all their own aid activities from their own perspective. However, at the country level, some of these activities may be less relevant. We have designed an interface that allows users to filter out those activities that are probably not relevant.

In order to simplify this process, we automatically deselect all activities where:

1. the percentage to Bangladesh (according to the various `recipient-country` elements) is less than 20%
2. activities which are not in **Implementation** stage (excluding all closed activities)
3. the [aid type](http://iatistandard.org/201/codelists/AidType/) is `B03` or `B04` (contributions to specific programs run by NGOs and multilaterals; and basket funds / pooled funds)

The specific crtiera we use will certainly need to change. The first two criteria will need to be adjusted according to the Standard Operating Procedures of the AIMS, and the third criteria might not be necessary or appropriate given the following step (see below).

An interesting question which we need to explore further is what to do with remaining activities that have less than 100% tagged as Bangladesh. 

For example: a project is tagged as 50% Bangladesh, with disbursements of USD 100 million. Should we enter the full USD 100 million into the AIMS, or USD 50 million (50% of the total disbursements)?

<hr class="hidden" />

### Handling double counting by looking at implementing organisations

![Categorising implementing organisations in Canadian data](/img/aims-import-4-sm.png "Categorising implementing organisations in Canadian data"){: .img-caption } 

A key issue we want to address in this work is to develop methodologies for avoiding double counting and for reconciling projects reported by multiple DPs. In the Bangladesh AIMS, as in many other AIMS, when DPs work on projects together, they are asked to select a "lead" or "managing" DP.

We take the same approach as in the AIMS, by excluding those activities which are implemented by other DPs. However, given the fact that organisation IDs -- especially for public sector bodies -- are still unavailable (or inconsistently used), we need to have a way to allow users to manually classify them.

So, we show a list of all the implementing organisations in the data, and ask the user to classify them.

<hr class="hidden" />

![Automatically categorising ownership of activities based on implementing organisations](/img/aims-import-4b-sm.png "Automatically categorising ownership of activities based on implementing organisations"){: .img-caption } 

After having matched each organisation against another Managing DP (or the DP whose activities are being imported -- in this screenshot, Canada's), we can then apply these choices to each project, classifying activities on the basis of their implementing organisations.

<hr class="hidden" />

### Matching activities in IATI to the AIMS

![Summary of activities matched between IATI and AIMS](/img/aims-import-5-sm.png "Summary of activities matched between IATI and AIMS"){: .img-caption } 

Having asked these questions, we can then match project IDs used in IATI with those used in the AIMS, and show IATI and AIMS projects side by side.

In the case of the Bangladesh AIMS, DPs have been pretty good at including their project IDs alongside projects, which makes this process a lot easier.

<hr class="hidden" />

![Summary of activities owned / managed by other DPs](/img/aims-import-5b-sm.png "Summary of activities owned / managed by other DPs"){: .img-caption } 

We can also show separately the activities that have been mapped to another DP -- e.g. activities where Canada has made a contribution to a World Bank project.

<hr class="hidden" />
