---
layout: documentation
comments: true
title: Project types
permalink: /documentation/project-types/
order: 4
---

Projects are the standard [unit of aid](../units-of-aid/) in the AIMS with most attributes being assigned at the project level.

## The Bangladesh AIMS allows for three financing relationships for projects:

1. Standard projects

These have one funder, and one or many implementers (In many cases, the funder is also the implementer). For these projects it is clear who is responsible for entering data, and to whom the project (and associated financial flows) are attributed.

2. Cofinanced/Pooled projects

These have several funders and one or many implementers. It is know how much each funder is contributing to the project i.e. the funds are earmarked. The project data may be available in IATI from several funders and implementers. The Bangladesh AIMS requires all collaborating funders to select a *managing donor* between them. This donor will take responsibility for managing the project in the AIMS. 

The IATI project (and financing information) from all reporters can be assigned to the same AIMS project for the *managing donor* to manage. Users will need to be able to select the managing donor from a list if the project does not already exist in the AIMS.

3. Trust Fund financed projects

Several funders may also collaborate to fund multiple projects. When the funds they supply are mixed in a joint pot (from which the different projects are funded), it is not possible to ascertain exactly which funder has contributed to each project financed from the pot. The funds are unearmarked. In the Bangladesh AIMS, this situation is dealt with by setting up a *Trust Fund*, available [here for users with sufficient priviledges](http://aims.erd.gov.bd/AIMS/TrustFund/Index). A Trust Fund is like a specific donor for that pot of money and each trust fund is allocated a managing donor.

Users will need to be able to select (or add) a Trust Fund as the responsible entity for the project which will give management rights for the project to the managing donor fo the selected Trust Fund.

## The IATI standard includes several features that can assist us:

Several fields in the IATI standard can help us to identify what type of project is being imported and so influence the import process.

+ Standard projects may often have IATI attribute `[aid-type](http://iatistandard.org/201/codelists/AidType/)` set to `C01`. Cofinanced/Pooled projects projects may often have `aid-type` set to `B04` and Trust Fund financed projectsmay often have `aid-type` set to `B03`
+ Projects for whom the [recieving organisation of a disbursement transation](http://iatistandard.org/201/activity-standard/iati-activities/iati-activity/transaction/receiver-org/) is a donor in the AIMS are likely to be either Cofinanced/Pooled or Trust Funds.
