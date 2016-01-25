---
layout: background
comments: true
title: AIMS overview
permalink: /background/aims-overview/
order: 2
---

* 
{:toc}

## Background

Launched in October 2014, the Bangladesh AIMS has been designed by local staff based on their needs and after reviewing several other AIMS systems. The design was implemented by Technovista, a local software development firm.

The AIMS collects project and financing agreement level data in a comparatively comprehensive system. The AIMS is able to record financial data for commitments, planned disbursements, actual disbursements and expenditure. The AIMS allows for reporting on trust funds and multi-donor projects, can handle multiple currencies for all transactions, sub-national location data, both thematic and sector priorities (according to the government's national development plan), aid effectiveness indicators, and project documents. Some fields are mandatory, but most are optional. There are a variety of pre-made reports and charts, all also downloadable and options to export custom data selections. Many fields are adjustable via the interface – thematic priorities, geographic areas, currency conversion rates and document types can all be modified without needing a developer to reprogram the AIMS.

Several aspects stand out with respect to IATI integration:

*	consideration has already been given to providing an "API to ensure interoperability with other as such systems of the Government";
*	the AIMS was designed with IATI data in mind, therefore wherever possible, taking IATI data definitions and structures as the starting point in an effort to make it simple to incorporate IATI format data;
*	projects have an optional field for the IATI activity identifier, which could facilitate matching of projects;
*	source code is owned by the government and can therefore be adjusted without having to request permission from software vendors;
*	some of the mapping work between IATI codelists and local codelists has already been done.

DPs are responsible for entering data in the system. Since the launch, 47 DPs have provided data into the system. Over time it is expected that more detailed project data is provided; there are a number of DPs that have yet to input any data to the system.

Data entry for a project involves filling some 40 fields even excluding project documents, results information or aid effectiveness indicators. Each financial transaction involves providing another 5-10 fields. Development partners report that this takes about 10 minutes per project. Some DPs have indicated that the data entry burden is partly responsible for the lower levels of data and lower data quality. These issues are likely to be compounded where DPs are non-resident, or where ERD has limited contact with them. As a result, ERD staff have also been carrying out significant data entry on behalf of DPs.

## Comparison between AIMS and IATI data

In October 2015 the AIMS underwent a substantial exercise in data collection in advance of the Bangladesh Development Partner Forum. A snapshot was taken on the 17th November 2015. AIMS data was compared to IATI data from http://dportal.org taken on the same day. Both AIMS and IATI contain significant amounts of data, AIMS reporting FY14 disbursements of USD 2.841 billion and IATI reporting USD 3.156 billion for the same period. The aggregate numbers are broadly similar, but the breakdown tells a somewhat more complex story. The AIMS records 46 organisations and IATI records 88 organisations. 11 of the organisations reported to the AIMS are not reported to IATI. AIMS data and IATI data therefore appear to be highly complementary. There are also significant variations between what is published to IATI and what is reported to the AIMS for specific DPs. Chart 1 shows all organisations for whom the difference in volume between the AIMS and IATI is greater than USD 50 million.

### Chart 1: Comparison of actual disbursements recorded for FY14 and FY15

![Chart 1: Comparison of actual disbursements recorded for FY14 and FY15](/img/background-aims-chart1.png "Chart 1: Comparison of actual disbursements recorded for FY14 and FY15")

Where there is a difference between data in the AIMS, investigation is needed to determine the cause. The differences in GIZ are attributable to the issues earlier discussed regarding cumulative financial data appearing in Germany's IATI data - therefore several years of expenditure are tagged on a single date in 2015. The "Germany" IATI data available through d-portal also includes projects not funded through GIZ (e.g. via KfW) so the numbers would not be expected to be identical – though the IATI data does allow the data to be distinguished by implementing partner. JICA publishes quite limited information to IATI; the latest data published to IATI stems from December 2014, according to the IATI Dashboard (it my also refer to an earlier period of spending).

The reasons for the differences for the World Bank and USAID are less clear. For USAID, it could perhaps be an issue to do with spending reported to the AIMS for FY15 that actually occurred in FY14, but may also be due to a large amount non-AIMS-reportable spending from USAID in its IATI data. For the World Bank, the data is being published relatively infrequently, one quarter in arrears, with spending aggregated into six-month periods – so there could be an issue with spending from FY14 either not yet being reported or being attributed to the wrong fiscal year. We understand that there may also be an issue to do with the completeness of the World Bank's IATI reporting which is currently being addressed.

Below USD 50 million, there are still a number of DPs with large differences, but the numbers are more in line with what would be expected given differences between what is published in IATI data and what can be reported to the AIMS.

### Chart 2. Comparison of actual disbursements recorded for FY14

![Chart 2: Comparison of actual disbursements recorded for FY14](/img/background-aims-chart2.png "Chart 2: Comparison of actual disbursements recorded for FY14")

On this chart, we only show the difference in disbursement values for FY14 for space considerations. In general, there does seem to be a greater value reported to IATI than to the AIMS. However, it becomes more difficult to identify reasons for any discrepancies when looking across DPs at these smaller values. Some of these differences may also be due to the same spending being reported by different organisations at different stages of the project cycle. 

The foregoing discussion underscores the importance of taking a DP-by-DP approach to importing IATI data to the AIMS, to ensure that discrepancies are identified, understood, and can be handled with care. It also shows the benefits of being able to see the numbers that are flowing direct out of headquarters systems – so IATI data can be used as a "sense check" even just by looking at the aggregate numbers.

We do not go into any further comparison of the quality of data available in different systems (e.g. detail of sector coding or geocoding); that is beyond the scope of this report. But it may be useful to conduct this kind of analysis in the later stages of this work in order to help users understand the nature of the data they are importing. It may also be useful as a way of evaluating the relative costs and benefits of using IATI data to supplement data captured by AIMS.

## Surrounding processes
The AIMS is hosted by the Development Effectiveness Wing within the Economic Relations Division (ERD) of the Ministry of Finance. Within ERD, other data is also collected by the Foreign Aid Budget and Accounts (FABA) Unit, which is responsible for debt management and budgeting of foreign aid. The intention is that over time, the AIMS should provide all the data required by FABA and that there should be no need for a parallel data collection process.

We are keenly aware of the need to ensure the data provided by the AIMS to FABA satisfies the needs of FABA – which will be important if the link between the AIMS and FABA is to be strengthened. From our initial meetings, the key priority appears to be to ensure that there is detailed financial data (including actual rather than aggregated financials, because of the need for precise currency conversion), clarity around whether the funds are spent through government systems and a detailed mapping to government budget classifications (which is currently performed manually).

## Technology used in the AIMS
The AIMS uses a combination of Microsoft technology. It is hosted on a Windows server physically located inside the Aid Effectiveness Unit. The database is run on Microsoft SQL Server and the software runs on a .NET MVC framework with C# for the business logic. The front-end uses ASP.net and JQuery for some of the user interfaces. Charts are run through Highcharts and SAP reports are used in a few cases to create printable reports.