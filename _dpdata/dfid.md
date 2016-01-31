---
layout: data
comments: true
title: DFID
permalink: /data/dfid/
order: 2
---

* 
{:toc}

DFID publishes projects and sub-components in its IATI data. The approvals process in Bangladesh means that projects can only be reported after a certain stage, so certain of DFID's project components (preparatory work, M&E) should not be reported to the AIMS. The import interface will need to allow components to be deselected from projects before importing. It is possible that other DPs will face a similar challenge, and they may have a less clear division in their data.

All DFID AIMS projects appear to be found in IATI data. There are a significant number of projects in DFID's IATI data that are not found in the AIMS.

## Project components

Question: how does DFID enter projects into the AIMS when:

1. component A is a trust fund contribution
2. component B is funded through another organisation

&#8230; assuming both components A and B are includable in the AIMS / approved? Is it only the value of component B that should be included?

*See also comparison of DFID projects reported in AIMS vs IATI:*

* [comparison of DFID projects](https://github.com/BD-IATI/donor-data/blob/master/dfid/dfid.ipynb) found in IATI vs the AIMS &ndash; scroll down on that page for the comparison of projects
* [download the comparison table here](https://raw.githubusercontent.com/BD-IATI/donor-data/master/dfid/iati_projects_and_aims.xlsx)

## Implementing organisations

DFID appears to be using [CRS channel codes](http://iatistandard.org/201/codelists/CRSChannelCode/) for implementing organisations. These include some broad categories like `11000` ("donor") and `50000` ("other"). However, significantly more information about organisations is provided in each transaction's `receiver-org`. 

* These two pieces of information together might provide us with enough information about which other organisation the project should map to. 
* However, it is probably not desirable for the import tool to have too many donor-specific "hacks".
* In some cases there are multiple receiver orgs, but in these cases there is generally a dominant receiver org by value.
* There is also an issue where the specific organisation is in quite a few cases not stated, though it may be obvious from the title or description of the activity which organisation it is (so this has nothing to do with security exclusions etc.)

*See comparison of DFID implementing organisations and receiver organisations:*

* [comparison of DFID implementing orgs and receiver orgs](https://github.com/BD-IATI/donor-data/blob/2d267cd026343f177addde1c6fc7ac9a1d468c9d/dfid/dfid_transactions_implementers.xlsx) - annotated cells (in red) shows where:
   * the project is probably implemented by an organisation reporting elsewhere in the AIMS
   * it is unclear which organisation is referred to
* [flat version of the same file](https://github.com/BD-IATI/donor-data/raw/master/dfid/dfid_transactions_implementers_flat.xlsx) - to facilitate further analysis
