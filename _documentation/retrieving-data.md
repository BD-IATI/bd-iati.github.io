---
layout: documentation
comments: true
title: Retrieving IATI data
permalink: /documentation/retrieving-data/
order: 0
---

* 
{:toc}

## Introduction

When loading data into the IATI-AIMS import tool, users should not be required to look at or handle XML files. This must be handled behind the scenes.

We're proposing to retrieve the data from the IATI Datastore in the first instance. The Datastore makes it possible to query for subsets of IATI data according to a number of filters.

## Retrieving from the IATI Datastore

To retrieve data from Bangladesh for a particular donor, we can run the following query:

    http://datastore.iatistandard.org/api/1/access/activity.xml?recipient-country=BD&reporting-org=CA-3&stream=True

In this instance, we've chosen to receive all activities tagged as Bangladesh from Canada's DFATD. The parameters should be adjusted as follows:

* `reporting-org`: the organisation identifier for the reporting organisation you're interested in. This maps to `reporting-org/@ref` in IATI data. In the example above, we've chosen `CA-3` for Canada DFATD.

## Troubleshooting

The Datastore has some [known issues](https://github.com/iati/iati-datastore/issues).

If it's not possible to use the IATI Datastore, we can also try using [OIPA](http://www.oipa.nl/api/v3/docs/).
