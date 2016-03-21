---
layout: post
title: Five weeks into using IATI data in Bangladesh
comments: true
author: mark
excerpt: Five weeks into development, we're now beginning to handle double-counting for co-financed and trust fund projects, and to merge project data betwen IATI and the AIMS.
---

Over the last five weeks we've been working with [Technovista](http://www.technovista.com.bd/) on building an IATI import tool for the Bangladesh AIMS. We're now doing some fairly clever things, including handling double-counting for co-financed and trust funded-projects, and allowing users to choose where they prefer to take data from -- IATI or the AIMS. [(Check out our previous blog on the first three weeks of development.)](/blog/2016/03/08/what-we-learned-in-3-weeks/)

## Handling double-counting

In previous development sprints, we allowed Development Partners to filter and sort their activities into those that they are responsible for and those that should be delegated to another DP. For example, if DFID has an activity that represents a contribution to a World Bank project, DFID's activity should be handled by the World Bank. The Bank should then decide how to handle DFID's activity and how to merge it with their own data and that of other DPs.

In the last two weeks, we expanded on this by allowing the other DP to map and merge other DP's activities into their own.

## Merging IATI and AIMS data

We developed a simple interface that allows a Development Partner to set general preferences about where their data should come from: IATI or the AIMS. We did this on the assumption that the quality of data in individual fields is likely to be strongly consistent for any given DP. In other words, if a DP has good descriptions for one project, they are more than likely to have good descriptions for all projects.

However, we know there will be exceptions to this rule, so we also allow DPs to edit import preferences for individual projects if they want.

## Next steps

In the next week, we will begin to work on financial data, allowing commitments and disbursements to be imported from IATI data and testing approaches to automatically re-syncing them when IATI data is updated. You can take a look at our development plans for [sprint 6](/development/sprint-6/).

Keep reading for a more detailed walk-through of what we've developed to date.

------

## Walk-through of interface to date

### Set general import preferences

![Setting general import preferences for Netherlands projects](/img/aims-preferences-1-sm.png "Setting general import preferences for Netherlands projects"){: .img-caption } 

We designed a simple interface to allow the user to select whether data should generally be taken from IATI or AIMS for individual fields. The user can click on each of the boxes containing some sample data do decide where the data should be sourced from.

<hr class="hidden" />

### Previewing activities before import

![Previewing Netherlands activities before import](/img/aims-preferences-2-sm.png "Previewing Netherlands activities before import"){: .img-caption } 

Before importing activities into the AIMS, we allow the user to adjust import preferences (again, whether to take data from IATI or the AIMS) on a project-by-project basis. Users can also see an overview of the activities that will be imported and how the financial data in IATI relates to that in the AIMS. Once we have addressed currency conversion in our next development sprint, we will be able to show a comparison of commitments and disbursements in the two systems. For now, we've just shown the raw amounts in each currency.

<hr class="hidden" />

### Mapping together activities reported by multiple DPs

![Mapping DFID activities against World Bank projects and Trust Funds](/img/aims-preferences-3-sm.png "Mapping DFID activities against World Bank projects and Trust Funds"){: .img-caption } 

We know that one of the most challenging parts of using IATI data will be mapping together activities reported by different Development Partners. In previous sprints, we created functionality to allow DPs to delegate activities to each other. In this interface, we allow the DP that has been delegated an activity to map those activities to their own projects or trust funds.

<hr class="hidden" />

### Merging financial data from multiple DPs

![Merging DFID and World Bank financial data for a co-financed project, the Health Sector Development Programme](/img/aims-preferences-4-sm.png "Merging DFID and World Bank financial data for a co-financed project, the Health Sector Development Programme"){: .img-caption } 

After the World Bank maps DFID's contribution to the co-financed project it manages, the World Bank can choose how it wants to handle this data. It can include the DFID data or reject it. We'll need to improve this interface a little more -- probably to show aggregate commitments and disbursements from each Development Partner rather than the full breakdown, in order to save space and make the decision clearer to the user. But we think this is a good start on tackling the problem of double-counting in complex projects.

<hr class="hidden" />
