---
layout: finalreport
comments: true
title: 1. Introduction
permalink: /final-report/introduction/
order: 1
---

* 
{:toc}

## 1.1 A global standard for aid data
The International Aid Transparency Initiative (IATI) was launched in September 2008. IATI is a voluntary, multi-stakeholder initiative that seeks to improve the availability of aid information in order to increase aid effectiveness. IATI brings together development partners and developing countries, civil society organisations and other experts in aid information who are committed to working together to increase the transparency of aid. The IATI Standard is a machine-readable format for sharing aid information in a timely, accessible, comparable and comprehensive format. Since the agreement of the Standard in 2011, over 450 organisations, including the vast majority of official donors, have begun publishing to IATI, with varying levels of data coverage and quality.

The large volume of new data presents a significant opportunity to improve the quantity and quality of the data in recipient country aid information management systems (AIMS). In Bangladesh, the home-grown AIMS &ndash; with the source code owned by the government - and local developers, provided the opportunity to design and implement a module which allows users to import IATI data into an AIMS. This work was experimental and benefited from close and flexible collaboration with developers from a local Dhaka-based company, Technovista. It was undertaken as a small component of the DFID-funded Aid Effectiveness Project (AEP). The AEP was implemented by UNDP and hosted in the Economic Relations Division (ERD) of the Ministry of Finance.

There were two linked goals for this work: firstly, to demonstrate that IATI data can be used to improve the quantity and quality of data collected in the Bangladeshi AIMS, and secondly, to design and implement a process in the module which reduces the burden (on both donors and the government) of data collection whereby IATI data collection significantly lowers cost and effort as compared to the effort required for the existing manual data entry.

This report is the third in a series, and focuses on findings and recommendations from the implementation of the module. The inception and methodology reports can be found on the microsite, where you can also find extensive detail on the development process and technical specifications: [http://bd-iati.github.io](http://bd-iati.github.io/)

## 1.2 Implementation
Establishing and implementing the IATI data import process required some substantial methodological development. Previous pilots and other work exploring the use of IATI data in country systems provided a good platform for this work (see Box 1). However, none have yet demonstrated a sustainable and scalable import process for importing donors' IATI data. In order to reach this stage and contribute to the global knowledge base, there were a number of other pieces of methodological development that were required. In this section we outline the process for developing the module.

Although IATI presents opportunities, it also poses challenges. IATI data is complex - partly reflecting the complexity inherent in the aid system. Designing a sustainable process to best represent the complex relationships between different actors and their activities was the main challenge that needed to be addressed to make IATI import feasible. The approach developed in this work represents a significant step forward in our understanding of how to handle these complexities &ndash; though it will certainly require further refinement.

#### Box 1: Previous work to integrate IATI data into AIMS

> Development Gateway: [IATI import module](https://github.com/devgateway/iatiimport) and a [recent report](http://www.developmentgateway.org/2015/05/21/iati-and-country-systems-dg-working-paper/) on piloting IATI integration in five francophone countries.

> Catalpa: [Mohinga platform](http://mohinga.info/en/) and presentations at IATI Members' Assembly

> Synergy: Pilot of [using IATI data in Rwanda](http://www.aidtransparency.net/wp-content/uploads/2015/04/Session-4-Rwanda-DAD-IATI-Integration.pptx) ([see also](http://www.aidtransparency.net/wp-content/uploads/2009/06/IATI-Rwanda-Country-Pilot-Final-Report-July-2010.doc))

## 1.3 Sustainable processes for IATI import
The original terms of reference envisaged a pilot with three donors. Importing IATI data only as a pilot encourages the choice of non-sustainable solutions (such as donors-specific adjustments) which limits the usefulness of the exercise. Designing a module (a freestanding piece of software) to accept and import data from all donors and insert it into the Bangladesh AIMS significantly increases the value as unlike a pilot, after the project finishes, the module can be put into permanent use rather than just being a one-off demonstration. This shift posed additional challenges for the development of the module, particularly in such a short timeframe, but we believe that this risk has paid off.

## 1.4 Timeline 
The timeframe for development was very short: methodological development and development of technical specifications took about one month. Software development then lasted for just over four months. A longer timeframe would have permitted another round of development (perhaps another 2 months), after receiving further feedback from donors. Some of the other limitations are discussed in section 2.6 below. Even this short timeframe was longer than the initially planned five months (September &ndash; January). We also undertook four missions rather than the initially planned two.

#### Table 1. Project timeline

Month | Progress
----- | --------
**2015** | 
October | Inception report and first mission.
November | Methodological development; methodology and technical reports.
December | Procurement of software vendor.
**2016** | 
January | Selection of software vendor.
February | Second mission.
February-March | First half of development.
March | Third mission, mid-point development review.
April-May | Second half of development.
June | Fourth mission; final review of software; deployment of module; presentation to donors and Government.

The end result delivered by Technovista has far exceeded expectations, especially considering that the original mandate was to run a pilot for three donors.
