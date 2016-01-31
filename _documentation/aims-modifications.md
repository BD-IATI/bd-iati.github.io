---
layout: documentation
comments: true
title: Modifications to the AIMS
permalink: /documentation/aims-modifications/
order: 6
---

* 
{:toc}

## Reading from the AIMS

In order to reconcile projects from IATI with existing projects, it will be necessary to read data out of the existing database and provide access to it via an API.

The API will need to provide the following functionality:

1. list projects according to a series of set queries, including:
  * by DP
  * by sector
  * all data (all DPs and all sectors)
2. list trust funds
3. list DPs (name, identification)

It may be necessary to add additional filters in time, so a flexible approach will be required for querying the data.

Where project data is provided, the data should be provided in the IATI-XML format so that it can be read in by the front end in the same way as IATI data published by donors. There is an additional benefit in doing this in providing IATI export functionality from the AIMS.

In order to do this, the software supplier will require access to the AIMS source code.

## Writing to the AIMS

In order to implement the decisions taken in the IATI import tool, it will also be necessary to have the ability to write into the AIMS. This will be a question of updating the data in the AIMS for a particular project, by mapping project data from the IATI import tool to specific fields. The AIMS' **notifications interface** may be useful in integrating the IATI-AIMS import tool into the AIMS.

It may be necessary to make some adjustments to the database structure in order to record the provenance of data and allow for it to be automatically updated in the future. The nature of these adjustments will depend on the way the existing database is structured, as well as the effects of other business logic in the source code.

In order to do this, the software supplier will require access to the AIMS source code under the same conditions as stated above.
