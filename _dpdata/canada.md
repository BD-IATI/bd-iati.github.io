---
layout: data
comments: true
title: Canada
permalink: /data/canada/
order: 1
---

* 
{:toc}

Canada has a much larger number of projects in its IATI data than in its AIMS data. Some of these projects may have been excluded for historical or other reasons. However, in working out how best to represent projects that are co-funded / trust funds, etc, it is interesting to look at similar projects that have been excluded.

## Considering how to handle trust funds etc.

[This dataset](https://github.com/BD-IATI/donor-data/raw/aae21ba2196d1b1b85be1c2d938b5510d3b58d81/canada/iati_projects_and_aims.xlsx) contains the full list of Canadian projects in IATI data, filtered for projects of aid type `B03` or `B04` (contributions to multilaterals), and excluding projects that are tagged as Bangladesh for 20% or less (as opposed to other countries). Where projects are marked `NOT FOUND` on the left, the project was not found in the IATI data.

Focusing on those projects where the implementing organisation is an organisation that also reports to the AIMS (UNFPA, UNICEF and World Bank):

* projects in **green** were not found in the AIMS (and are presumably reported by the implementing organisation)
* projects in **orange** were found in the AIMS (and are presumably not reported by the implementing organisation)

It will be important to work out what features of a project mean that it should be reported by the funder vs the implementer in this context. We also need to work out how to identify when an activity needs to be mapped to another organisation's activity when the two relate to the same project. We also need to work out how to identify projects that are contributions to (it seems exclusively World Bank-adminstered) Trust Funds.

## Example project

e.g. Project `CA-3-A035529001` ("Skills Training and Enhancement Project") [[d-portal](http://www.d-portal.org/ctrack.html?country=BD#view=act&aid=CA-3-A035529001)] [[IATI Datastore ](http://datastore.iatistandard.org/api/1/access/activity.xml?iati-identifier=CA-3-A035529001)]

* this is reported in the AIMS as a [World Bank project `P090807`](http://aims.erd.gov.bd/AIMS/ProjectInfo/Details/1188);
* the money comes from a [Trust Fund `TF015113`](http://aims.erd.gov.bd/AIMS/TrustFund/Index) with 100% of the funds coming from Canada (NB, that link can only be viewed by users with certain privileges);
* it's then implemented by ERD and the Ministry of Education.
