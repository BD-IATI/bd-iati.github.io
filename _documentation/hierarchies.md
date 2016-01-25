---
layout: documentation
comments: true
title: Hierarchies of projects
permalink: /documentation/hierarchies/
order: 1
---

* 
{:toc}

The data [retrieved from the datastore](../retrieving-data/) will be almost identical to the way individual donors publish their own data. This poses something of a challenge, as donors can publish in different ways, sometimes using hierarchies of activities if that is important to accurately reflect their business model.

## Understanding hierarchies in IATI

Some donors (currently a handful) choose to structure their data according to a hierarchy of activities. For example, DFID has the following two projects and several sub-components:

* `GB-1-107368` **Rural Electrification Development Project**
  * `GB-1-107368-101` PROCOFSERVICES and P0050 for Rural Electrification Development Project
  * `GB-1-107368-102` MULTILATORGANISATION and P0050 for Rural Electrification Development Project
  * `GB-1-107368-103` NONBUDSUPPFINAID and P0050 for Rural Electrification Development Project
  * `GB-1-107368-104` MOU With USAID for REDP
  * `GB-1-107368-105` NONBUDSUPPFINAID and CP026 for Rural Electrification Development Project
* `GB-1-107369` **Health, Nutrition and Population Sector Programme (HNPSP)**
  * `GB-1-107369-101` NONBUDSUPPFINAID and P0050 for Health, Nutrition and Population Sector Programme (HNPSP)
  * `GB-1-107369-102` PROCOFSERVICES and P0050 for Health, Nutrition and Population Sector Programme (HNPSP)
  * `GB-1-107369-103` MULTILATORGANISATION and P0050 for Health, Nutrition and Population Sector Programme (HNPSP)
  * `GB-1-107369-104` Procurement of Goods for Health, Nutrition and Population Sector Programme (HNPSP
  * `GB-1-107369-105` Programme Capital for Health, Nutrition and Population Sector Programme (HNPSP)

The activities highlighted in **bold** are DFID projects (hierarchy=1) that contain five components (hierarchy=2) each. All of these units of aid &ndash; projects and components &ndash; are held within separate `iati-activity`. Each unit of aid is then related to its *parent* or *child* activities by the `related-activity` tag.

## Relating this to the AIMS

The above relationship between projects and components is both important and useful. In DFID's data, hierarchy=1 activities contain project documentation whereas hierarchy=2 activities contain financial transactions. Hierarchy=1 activities have more meaningful titles to most of the world &ndash; but the sub-components are helpful for the donor to see on import because they group spending together and may have meaning to them.

In Bangladesh, projects are only reportable to the AIMS at a certain point, after they have been approved by the government, but some donors will begin preparatory work in advance of this approval. Currently, when DFID report to the AIMS (manually), they select the sub-components that are reportable and exclude those that are not.

We can do the same here.

## How to apply this to the AIMS

We should:

1. Determine that a hierarchy of projects has been provided
2. Allow the user to select which level they would prefer to report at (in the case of DFID, whether they would prefer to publish projects or components) &ndash; providing some sample data to help decide. 
   * We would preferably also show the % of activities at each hierarchy that have been found in the AIMS and provide a recommendation - e.g.
     
     > we found 90% of hierarchy=1 activities in the AIMS and 0% of hierarchy=2 activities in the AIMS. We recommend you group by hierarchy=1 activities.
3. Allow the user to exclude the projects or sub-components that should not be included.

## Importing this data

Once we have related a series of activities (projects and sub-components) to a particular AIMS project, we can proceed in the normal way by allowing the user to choose which data should be imported.
