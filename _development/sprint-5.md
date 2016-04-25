---
layout: development
comments: true
title: Sprint 5
permalink: /development/sprint-5/
order: 5
---

**STATUS: DRAFT**

* 
{:toc}

## Overview

The main goals of sprint 5 are:

1. Import non-financial data to the AIMS
2. Handle updates to other non-financial data

### Data integrity

* data in the live AIMS should not be touched
* data in the test AIMS can be changed and adjusted as necessary for the purposes of testing
* data in the IATI import tool can be deleted and re-generated at will throughout the development process, until we agree otherwise.

### DP data overview

For the purposes of this sprint, we will use data from a range of different DPs. The DPs are listed in [this Github issue](https://github.com/BD-IATI/edi/issues/46).

## 1. Import basic project data

In earlier sprints, we imported project titles and descriptions. We should now try to import the remainder of basic project data:

### Type of assistance

This should be mapped from **Aid Type** as follows:

| AidType code | Type of Assistance (AIMS) |
| ------------ | ------------------------- |
| A01 | Budget Support |
| A02 | Sector Budget Support |
| B01 | Project Support|
| B02 | Project Support |
| B03 | Project Support |
| B04 | Project Support |
| C01 | Project Support |
| D01 | Project Support |
| D02 | Project Support |

### Type of project

These should be mapped from **Aid Type** as follows:

| AidType code | Type of Project (AIMS) |
| ------------ | ------------------------- |
| A01 | Investment Project |
| A02 | Investment Project|
| B01 | Investment Project |
| B02 | Investment Project |
| B03 | Investment Project |
| B04 | Investment Project |
| C01 | Investment Project |
| D01 | Technical Assistance (TA) Project |
| D02 | Technical Assistance (TA) Project |

## Activity dates

| Activity Date Type (v1) | Activity Date Type (v2) | AIMS Date |
| ----------------------- | ----------------------- | --------- |
| start-actual or start-planned | 2 or 1 | Agreement Sign Date |
| start-planned | 1 | Planned Start Date |
| start-actual | 2 | Actual Start Date |
| end-planned | 3 | Planned Completion Date |
| end-actual | 4 | Revised Completion Date |

## Implementation status

| Activity Status code | Activity Status | Implementation Status (AIMS) |
| -------------------- | --------------- | ---------------------------- |
| 1 | Pipeline/identification | Pipe Line |
| 2 | Implementation | On-going |
| 3 | Completion | Completed |
| 4 | Post-completion | Completed |
| 5 | Cancelled | Suspended |
| 6 | Suspended | Suspended |

## 2. Import sectors

If DAC sectors are used for this activity (where sector `vocabulary` is `1` or `2`), map between them and BD gov sectoral classifications. Otherwise, enter no sectors.

See mapping file [CRS-BD-sector-codes.xls](../CRS-BD-sector-codes.xls)

NB, this mapping file is incomplete and will be completed at a later date.

## 3. Import implementing organisations

Implementing organisations need to be mapped to the AIMS' Executing Agencies. These use different tables depending on whether the Executing Agency is a Ministry, DP or NGO (I think?).

Organisation identifiers are not very good in IATI data, so we will need to ask the user to select the correct organisation. For DPs, we can try selecting them using the organisation `ref` which is stored in FundSource, though that will be imperfect. IATI does not have a standard methodology for identifying government agencies, while NGO identifiers are likely to be unreliable.

We should integrate this into existing step 3 in the following way:

1. ask if each implementing organisation is a DP, BD government, an NGO, or unknown (e.g. it may just state `OTHER`)
2. given the type of implementing organisation:
  1. ask the user to select the organisation from a list (e.g. if they selected `Govt`, the list should show only government Ministries / Agencies).
  2. if the implementing organisation is not present in the list, provide the user with the opportunity to add a new organisation (we will consider later adding an approvals process for new implementing organisations). 
  3. Also allow the user to state that the organisation is unclear (e.g. just states `DONOR`).
3. apply this to all projects
4. for those organisations where the implementing organisation is another DP, suggest that the project should be delegated to the other Managing DP, but allow the user to reject that.

We can try and help the user with some of these steps by:

1. guessing whether it's a DP, BD government or NGO (using the organisation `type` attribute -- [see codelist](http://iatistandard.org/202/codelists/OrganisationType/))
2. for those projects already mapped to the AIMS, we could try and use the existing extending organisations in the AIMS and link them together (though that will get complicated where there is more than one implementing organisation)
3. we could also try and match strings in the IATI data with the name in the AIMS.

We should get the basics running first and can then try to see if we can implement any of these steps to speed things up.

NB: there can be more than one implementing organisation in IATI data, and we should take each implementing organisation, not only one.

[See mockups](http://test.brough.io/bd/sprint5.htm) -- the three steps on that page could be on different pages. Or the next step could only be revealed when having completed the previous step? E.g. "determine specific organisation" should show only if "determine organisation type" has been completed.

Please feel free to experiment with the user interface here if you think there is a better way of presenting this information.

## 4. Import project documents

Each project document, we should import, referring to the URL rather than using the file upload.

| IATI Code | IATI Name | AIMS Name |
| --------- | --------- | --------- |
| A01 | Pre- and post-project impact appraisal | Project Document |
| A02 | Objectives / Purpose of activity | Project Document |
| A03 | Intended ultimate beneficiaries | Project Document |
| A04 | Conditions | Project Document |
| A05 | Budget | Project Document |
| A06 | Summary information about contract | Project Document |
| A07 | Review of project performance and evaluation | Annual Progress Report |
| A08 | Results, outcomes and outputs | Annual Progress Report |
| A09 | Memorandum of understanding | Financial Agreement |
| A10 | Tender | Others |
| A11 | Contract | Others |
| A12 | Activity web page | Others |

If classifications map to multiple AIMS names, map to OTHER (i.e. if you have a document with categories A01 and A02, map it to "Project document"; but if you have a document with categories A06 and A07, map it to "Other").

## 5. Import locations

A couple of points on IATI locations:

* there is no percentage attribute in the IATI Standard, so the allocation should be calculated by the formula (100/number of locations)
* the specific administrative unit is rarely provided, so we probably have to map from locations.
* we could potentially use gazetteer references to obtain the correct location ID from [Geonames](http://geonames.org), but not all DPs will use Geonames.

1. Check to see if we can determine the administrative level:
  * look at the `administrative` element (within each `location`),
  * if the `vocabulary` is `G1`, then check to see if the level is `1`, `2`, or `3` (mapping to Division, District and Upazilla respectively)
  * otherwise,  set the location to be District.
2. Use [this function](http://www.plumislandmedia.net/mysql/haversine-mysql-nearest-loc/) (or something similar) to find the nearest location to the coordinates provided.´

## 6. Handle updates

Each evening when updating the data, if the data in IATI is not the same as that in the AIMS **and** we have chosen to take IATI data rather than AIMS data, then we should overwrite the AIMS data.

**LEAVE DOCUMENTS UNTIL WEEK 2**

We need to consider a bit more how to handle project documents where perhaps we would like to allow a mix of IATI and AIMS data.
