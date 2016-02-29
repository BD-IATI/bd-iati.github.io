---
layout: development
title: Development
permalink: /development/
order: 4
---

* 
{:toc}

## Development process

The development process will need to be highly agile and iterative given the necessity to experiment with different approaches and techniques to handling the data, as well as responding to user feedback to ensure the end product is user friendly and intuitive. Some parts of the development process can happen in parallel – particularly back-end and front-end work – so that we can proceed more quickly as well as benefit from the specialisations of individual developers.   

We will provide mock-ups of the front-end interface and work closely with the developers to fully understand what is being developed and how it relates to the data. All code will need to be on Github from the start, and in a public repository, so that we can benefit from collaboration with others (who also have their work on Github) as well as ensure that the final product will be useful in a wider range of environments and more likely to be maintained.

We will leverage existing tools and care strongly about maintenance and sustainability – so it may be preferable to use similar languages used in the rest of the IATI community (notably Python).

## Indicative development roadmap

In the **first phase**, data will be extracted from IATI and the AIMS, with projects then listed side by side on the same page. This will include a field-by-field cross-walk and mapping. Requires AIMS to export data in IATI-XML format for each donor.

In the **second phase**, donors will map their projects in IATI to those already contained in the AIMS. Establishing this project-level relationship is arguably the most important part to get right and we emphasise the challenge of this component - both in technical and conceptual terms. 

The **third phase** will then test the import of a limited subset of fields - probably restricted to the title and description - into the AIMS. Requires AIMS to accept data from the IATI import module. 

In the **fourth phase**, we will begin to establish techniques to reconcile multi-donor projects, focusing on co-financed projects.

In the **fifth phase**, automatically updating fields with data from the IATI Registry will be established. This will need to provide a user-friendly interface for controlling updates, as well as development of logic for handling different data sources. Requires, inter alia, AIMS to know whether a field comes from IATI or has been manually entered.

In the **sixth phase**, we will move to encompass other fields - particularly financial data (transactions, including disbursements).

In the **seventh phase**, we will develop techniques required to handle multi-donor projects (parallel financing, co-financed projects, trust funds, etc.) and tools to mitigate against double-counting.

Again, various aspects of the seven phases can be carried out in parallel. The implementation will be determined as a success if donors with high-quality IATI data are able to import data into the AIMS. Due to the short timeframe, the amount of time available for the later phases may be limited.
