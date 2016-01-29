---
layout: background
comments: true
title: IATI data overview
permalink: /background/data-overview/
order: 1
---

* 
{:toc}

## Overview of IATI data in Bangladesh

In Bangladesh, IATI data is of mixed quality. Some DPs reporting to the AIMS have not begun publishing to IATI, while others are publishing only very old data to IATI. On the other hand, there are many DPs with good quality data in IATI, and some DPs publishing to IATI are not accounted for at all in the AIMS.

Publish What You Fund's [Aid Transparency Index](http://ati.publishwhatyoufund.org) provides a reasonable proxy for IATI data quality, given that IATI is the most highly-weighted component of the Index. Rather than repeating all of the analysis required for the Index, we use the most recent results across all organisations as a guide.

Development Partner | FY14 Disbursements (USD millions) | FY14 Rank | PWYF Rating
-- | -- | -- | --
World Bank |  942.96  | 1 | Very good
AsDB |  704.32  | 2 | Very good
Japan, JICA |  375.75  | 3 | Poor
UK, DFID |  225.32  | 4 | Very good
Netherlands |  73.54  | 5 | Fair
Australia, AusAID |  45.40  | 6 | Fair
EC |  44.91  | 7 | Good
UNICEF |  43.48  | 8 | Good
GFATM |  39.17  | 9 | Good
Canada, DFATD |  34.36  | 10 | Good
UNFPA |  32.44  | 11 | *Not rated*
WFP |  30.45  | 12 | *Not rated*
Switzerland, SDC |  28.23  | 13 | Fair
IFAD |  27.92  | 14 | *Not rated*
Germany, GIZ |  19.49  | 15 | Fair
UNDP |  11.47  | 16 | Very good
Korea, KOICA |  10.29  | 17 | Poor
OFID |  10.11  | 18 | *Not rated*
Denmark, Danida |  8.11  | 19 | Fair
Sweden, Sida |  7.67  | 20 | Very good

*Disbursements refer to AIMS data as at 2015-11-17 for FY14, in millions of USD. PWYF Rating refers to Publish What You Fund's 2014 Aid Transparency Index*

## Analysis of specific donors' data
A number of DPs face specific challenges with their data. These challenges are captured here not to criticise them, but to ensure that they are adequately taken into account in the course of this work. In some cases this may mean DPs changing the way they publish data at headquarters level, and in others it may mean that the importing tool needs to be flexible to deal with nuances in the way data is published. In time, there may be arguments for changes to the IATI Standard or the way in which it is interpreted in order to make it easier for software to handle these specificities or differences. However, we suggest any changes to the Standard should be made only once different approaches have been thoroughly tested.

### Canada
Canada has a much larger number of projects in its IATI data than in its AIMS data. Some of these projects may have been excluded for historical or other reasons. However, in working out how best to represent projects that are co-funded / trust funds, etc, it is interesting to look at similar projects that have been excluded.

#### Considering how to handle trust funds etc.

[This dataset](https://github.com/BD-IATI/donor-data/raw/aae21ba2196d1b1b85be1c2d938b5510d3b58d81/canada/iati_projects_and_aims.xlsx) contains the full list of Canadian projects in IATI data, filtered for projects of aid type `B03` or `B04` (contributions to multilaterals), and excluding projects that are tagged as Bangladesh for 20% or less (as opposed to other countries). Where projects are marked `NOT FOUND` on the left, the project was not found in the IATI data.

Focusing on those projects where the implementing organisation is an organisation that also reports to the AIMS (UNFPA, UNICEF and World Bank):

* projects in **green** were not found in the AIMS (and are presumably reported by the implementing organisation)
* projects in **orange** were found in the AIMS (and are presumably not reported by the implementing organisation)

It will be important to work out what features of a project mean that it should be reported by the funder vs the implementer in this context. We also need to work out how to identify when an activity needs to be mapped to another organisation's activity when the two relate to the same project. We also need to work out how to identify projects that are contributions to (it seems exclusively World Bank-adminstered) Trust Funds.

#### Example project

e.g. Project `CA-3-A035529001` ("Skills Training and Enhancement Project") [[d-portal](http://www.d-portal.org/ctrack.html?country=BD#view=act&aid=CA-3-A035529001)] [[IATI Datastore ](http://datastore.iatistandard.org/api/1/access/activity.xml?iati-identifier=CA-3-A035529001)]

* this is reported in the AIMS as a [World Bank project `P090807`](http://aims.erd.gov.bd/AIMS/ProjectInfo/Details/1188);
* the money comes from a [Trust Fund `TF015113`](http://aims.erd.gov.bd/AIMS/TrustFund/Index) with 100% of the funds coming from Canada (NB, that link can only be viewed by users with certain privileges);
* it's then implemented by ERD and the Ministry of Education.

### DFID
DFID publishes projects and sub-components in its IATI data. The approvals process in Bangladesh means that projects can only be reported after a certain stage, so certain of DFID's project components (preparatory work, M&E) should not be reported to the AIMS. The import interface will need to allow components to be deselected from projects before importing. It is possible that other DPs will face a similar challenge, and they may have a less clear division in their data.

All DFID AIMS projects appear to be found in IATI data. There are a significant number of projects in DFID's IATI data that are not found in the AIMS.

#### Project components

Question: how does DFID enter projects into the AIMS when:

1. component A is a trust fund contribution
2. component B is funded through another organisation

&#8230; assuming both components A and B are includable in the AIMS / approved? Is it only the value of component B that should be included?

*See also comparison of DFID projects reported in AIMS vs IATI:*

* [comparison of DFID projects](https://github.com/BD-IATI/donor-data/blob/master/dfid/dfid.ipynb) found in IATI vs the AIMS &ndash; scroll down on that page for the comparison of projects
* [download the comparison table here](https://raw.githubusercontent.com/BD-IATI/donor-data/master/dfid/iati_projects_and_aims.xlsx)

#### Implementing organisations

DFID appears to be using [CRS channel codes](http://iatistandard.org/201/codelists/CRSChannelCode/) for implementing organisations. These include some broad categories like `11000` ("donor") and `50000` ("other"). However, significantly more information about organisatiosn is provided in each transaction's `receiver-org`. 

* These two pieces of information together might provide us with enough information about which other organisation the project should map to. 
* However, it is probably not desirable for the import tool to have too many donor-specific "hacks".
* In some cases there are multiple receiver orgs, but in these cases there is generally a dominant receiver org by value.
* There is also an issue where the specific organisation is in quite a few cases not stated, though it may be obvious from the title or description of the activity which organisation it is (so this has nothing to do with security exclusions etc.)

*See comparison of DFID implementing organisations and receiver organisations:*

* [comparison of DFID implementing orgs and receiver orgs](https://github.com/BD-IATI/donor-data/blob/2d267cd026343f177addde1c6fc7ac9a1d468c9d/dfid/dfid_transactions_implementers.xlsx) - annotated cells (in red) shows where:
   * the project is probably implemented by an organisation reporting elsewhere in the AIMS
   * it is unclear which organisation is referred to
* [flat version of the same file](https://github.com/BD-IATI/donor-data/raw/master/dfid/dfid_transactions_implementers_flat.xlsx) - to facilitate further analysis

### Germany
Germany's data is published by BMZ and includes projects funded through GIZ and KfW. The data currently includes cumulative figures for each project, without any breakdown over time. This makes it difficult to know how much has been spent in any year. GIZ projects also contain multiple "phases", but it is unclear if these phases are or should be joined together to make a single project in the IATI data. These issues will be taken up with headquarters.

*See also comparison of Germany projects reported in AIMS vs IATI:*

* [comparison of German projects](https://github.com/BD-IATI/donor-data/blob/master/germany/germany.ipynb) found in IATI vs the AIMS &ndash; scroll down on that page for the comparison of projects
* [download the comparison table here](https://raw.githubusercontent.com/BD-IATI/donor-data/master/germany/iati_projects_and_aims.csv)

### Netherlands
For the the Netherlands' projects, commitments are made in the local currency value - in Bangladesh, this is USD rather than BDT. The commitment value is stored in the Ministry of Foreign Affairs' internal project management system in EUR and USD. The EUR value is shown in IATI data. At the start of each year, the EUR commitment values are recalculated to ensure that the local project value in USD is accurately reflected in EUR, given currency fluctuations over the previous year. This should be fairly straightforward to handle given the mechanisms the IATI Standard has for dealing with currencies, but it is useful to be aware of this nuance. The Netherlands also spends much of its funds through large tranches of programmatic funding to implementing partners such as Dutch NGOs. Including IATI data published by Dutch NGOs may help to provide a fuller picture of Dutch development cooperation projects.

### UNDP
UNDP receives funds from headquarters and from DPs in country to fund particular projects. It is important to avoid double-counting the DP-reported projects with the UNDP-reported projects. We propose to handle this issue by allowing DPs to map their projects to the UNDP project, and then allow UNDP to decide which data it chooses to take - its own, or others' data. This issue of data being reported at multiple levels will certainly apply to other organisations and the user interface will need to handle it in a general way.

### UNICEF
UNICEF has a unit of aid in its IATI data that shows results rather than projects. This issue cannot be solved in the user interface but would need to be taken up with headquarters to work out if the system could instead export project data.

### USAID
USAID has a very granular unit of aid in its IATI data ("awards"), so activities will need to be grouped together to create meaningful projects. It appears that in Bangladesh, one project has one or many associated awards, so an interface to allow grouping of awards into projects will be useful. There may however be awards belonging to multiple projects - we propose that such awards should not be "split" for now, but should be handled manually. Systems improvements currently underway at USAID could in time help to improve this process

### World Bank
The World Bank administers a number of trust funds. It will be important to work out how to handle these trust funds in the data. 

Our understanding is that trust funds are currently not published in the World Bank's IATI data. The World Bank IATI data also contains financial data only one quarter (or more) in arrears - the latest data (as of 2016-01-27) was dated from `2015-09-30`. This is too old to be useful on an ongoing basis. Disbursement data is also aggregated by quarter; a minimum of monthly disaggregation would be preferable.

*See also comparison of World Bank projects reported in AIMS vs IATI:*

* [comparison of World Bank projects](https://github.com/BD-IATI/donor-data/blob/master/worldbank/worldbank.ipynb) found in IATI vs the AIMS &ndash; scroll down on that page for the comparison of projects
* [download the comparison table here](https://raw.githubusercontent.com/BD-IATI/donor-data/master/worldbank/iati_projects_and_aims.csv)
