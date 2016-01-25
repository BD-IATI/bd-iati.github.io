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

## DPs with specific challenges
A number of DPs face specific challenges with their data. These challenges are captured here not to criticise them, but to ensure that they are adequately taken into account in the course of this work. In some cases this may mean DPs changing the way they publish data at headquarters level, and in others it may mean that the importing tool needs to be flexible to deal with nuances in the way data is published. In time, there may be arguments for changes to the IATI Standard or the way in which it is interpreted in order to make it easier for software to handle these specificities or differences. However, we suggest any changes to the Standard should be made only once different approaches have been thoroughly tested.

### DFID
DFID publishes projects and sub-components in its IATI data. The approvals process in Bangladesh means that projects can only be reported after a certain stage, so certain of DFID's project components (preparatory work, M&E) should not be reported to the AIMS. The import interface will need to allow components to be deselected from projects before importing. It is possible that other DPs will face a similar challenge, and they may have a less clear division in their data.

### Germany
Germany's data is published by BMZ and includes projects funded through GIZ and KfW. The data currently includes cumulative figures for each project, without any breakdown over time. This makes it difficult to know how much has been spent in any year. GIZ projects also contain multiple "phases", but it is unclear if these phases are or should be joined together to make a single project in the IATI data. These issues will be taken up with headquarters.

*See also comparison of projects reported in AIMS vs IATI:*

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