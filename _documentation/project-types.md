---
layout: documentation
comments: true
title: Project types
permalink: /documentation/project-types/
order: 2
---

* 
{:toc}

Projects are the standard unit of aid in the AIMS with most attributes being assigned at the project level.

## Financing relationships in the Bangladesh AIMS

The Bangladesh AIMS allows for three financing relationships for projects:

| Type of project | Description |
| --------------- | ----------- |
| (1) Standard projects | These have one funder, and one or many implementers (in many cases, the funder is also the implementer). For these projects it is clear who is responsible for entering data, and to whom the project (and associated financial flows) are attributed. |
| (2) Co-financed / pooled projects | These have several funders and one or many implementers. It is know how much each funder is contributing to the project i.e. the funds are earmarked. The project data may be available in IATI from several funders and implementers. The Bangladesh AIMS requires all collaborating funders to select a *managing donor* between them. This donor will take responsibility for managing the project in the AIMS. <br /><br /> The IATI project (and financing information) from all reporters can be assigned to the same AIMS project for the *managing donor* to manage. Users will need to be able to select the managing donor from a list if the project does not already exist in the AIMS. |
| (3) Trust Fund financed projects | Several funders may also collaborate to fund multiple projects. When the funds they supply are mixed in a joint pot (from which the different projects are funded), it is not possible to ascertain exactly which funder has contributed to each project financed from the pot. The funds are unearmarked. In the Bangladesh AIMS, this situation is dealt with by setting up a *Trust Fund*, available [here for users with sufficient privileges](http://aims.erd.gov.bd/AIMS/TrustFund/Index). A Trust Fund is like a specific donor for that pot of money and each trust fund is allocated a managing donor.<br /><br />Users will need to be able to select (or add) a Trust Fund as the responsible entity for the project which will give management rights for the project to the managing donor fo the selected Trust Fund. |

The main challenge will be with types (2) and (3), where projects are likely to be reported at multiple stages by different organisations. Given that we are not at the outset proposing to focus on NGO data, we are less likely to face any problems with type (1).

## Distingushing between types of projects in IATI data

The IATI Standard allows for traceability of a project, allowing publishers to specify that they received money from another organisation, or gave money to another organisation. However, in reality, these fields as still not filled out by many organisations so we need to find other ways of identifying these projects and reconciling projects published at multiple points.

We therefore propose to focus on two parts of the IATI Standard:

* **Aid type** &ndash; which states several broad categories of the type of project.
* **Organisations** &ndash; if it looks like an implementing organisation is also reporting elsewhere in the AIMS.

### Aid type
The [Aid Type](http://iatistandard.org/201/codelists/AidType/) codelist provides a series of codes for different types of projects. This code is generally found in `default-aid-type/@code` on each activity.

* Standard projects (type (1) above) should have their aid type set to `C01`.
* Cofinanced / pooled projects projects may often have aid type set to `B04`.
* Trust Fund financed projects may often have aid type set to `B03`.

We therefore propose to flag those projects with a code other than `C01` for review by users, assuming that they are probably more complicated projects that need to be handled with care.

### Implementing organisation

Implementing organisations are harder to handle because there is no solid methodology for consistently identifying organisations. There are a couple of codes in the Organisation Type codelist that may help, but we can't rely on them. Our main goal here is to identify if an organisation appears to be found elsewhere in the AIMS. There are a couple of ways to handle this:

1. projects should be presumed to be found elsewhere in the AIMS if:
   * the implementing organisation is of organisation type `40` ("multilateral");
   * the implementing organisation has a ref `11000` ("donor governments") or `13000` ("third-country governments, delegated cooperation")
   * the implementing organisation has a ref that matches a "fund source" from the AIMS &ndash; NB there is a field to state the IATI identifier of the organisation, but it needs to be filled out
2. users should be presented with the list of implementing organisations contained in all of the projects (a single unique list) and asked to correct the answers from step 1.

We may also want to consider looking at `provider-org` and `receiver-org` on transactions, but the data is likely to be of a much lower quality than that found in implementing organisations.
