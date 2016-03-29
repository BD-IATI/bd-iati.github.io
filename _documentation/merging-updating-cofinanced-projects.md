---
layout: documentation
comments: true
title: Merging and updating cofinanced projects
permalink: /documentation/merging-updating-cofinanced-projects/
order: 7
---

* 
{:toc}

## Collecting and storing mappings

![Mapping DFID activities against World Bank projects and Trust Funds](/img/aims-preferences-3-sm.png "Mapping DFID activities against World Bank projects and Trust Funds"){: .img-caption }

We currently store information about the mapping between projects and "delegated" activities. Other DPs can delegate an activity to the Managing DP which can then merge those activities into its own project. This is important where, for example, Canada and DFID publish activiites which are there contributions to a World Bank project. We need to avoid double-counting, but we may also want to take some of this data in order to ensure that each DP's contributions are accurately reflected.

## Collecting and storing preferences

![Merging DFID and World Bank financial data for a co-financed project, the Health Sector Development Programme](/img/aims-preferences-4-sm.png "Merging DFID and World Bank financial data for a co-financed project, the Health Sector Development Programme"){: .img-caption } 

We need to store preferences about which data should be collected. In the above image, we have shown all transactions from a delegated project (from other DPs) and the main project (from the managing DP).

We need to instead show:

* the total amount (for each of commitments, disbursements, planned disbursements) for each activity mapped from another DP
* a checkbox to allow that data to be included or excluded.

We then need to write this data to the module, to record something like the following table:

**DelegatedActivityPreference** Table

| Activity ID | Field Name | Include |
| ----------- | ---------- | ------- |
| GB-1-12345 (Foreign Key) | Commitments | True |

NB: we should do this both for co-financed and Trust Fund projects. However, for Trust Fund projects, only preferences for **commitment** values should be retained, as this is the only data accepted by the AIMS.

## Displaying preferences

We can then use these two tables to show, for each co-financed project:

1. Delegated activities related to this co-financed project
2. Preferences about whether commitments, disbursements, and planned disbursemetns should be included for that co-financed project.

We should do the same for Trust Funds; however, in Trust Funds, we will only show Commitments as that is the only data that is accepted in the AIMS.

On the Dashboard page, we can then (probably in the bottom-right) show a list of activities for this DP which have at least one other activity mapped/delegated to them. That list should provide a pop-up displaying the above preferences, and allow them to be edited.
