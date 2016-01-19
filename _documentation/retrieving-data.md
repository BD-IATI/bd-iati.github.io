---
layout: documentation
comments: true
title: Retrieving IATI data
permalink: /documentation/retrieving-data/
order: 3
---

When loading data into the IATI-AIMS import tool, users should not be required to look at or handle XML files. This must be handled behind the scenes.

We're proposing to retrieve the data from the IATI Datastore in the first instance. The Datastore makes it possible to query for subsets of IATI data according to a number of filters.

To retrieve data from Bangladesh for a particular donor, we can run the following query:

    http://datastore.iatistandard.org/api/1/access/activity.xml?recipient-country=BD&reporting-org=CA-3&limit=50&offset=0

In this instance, we've chosen to receive 50 activities tagged as Bangladesh from Canada's DFATD. The parameters should be adjusted as follows:

* `reporting-org`: the organisation identifier for the reporting organisation you're interested in. This maps to `reporting-org/@ref` in IATI data. In the example above, we've chosen `CA-3` for Canada DFATD.
* `limit`: specifies the maximum number of activities to return. Increasing this number means you can page through faster, but large numbers can cause problems on the datastore, according to [the API documentation](http://datastore.iatistandard.org/docs/api/).
* `offset`: allows you to page through results. Assuming `limit=50`:
  * `offset=50` will retrieve page 2
  * `offset=100` will retrieve page 3
  * etc.

## Troubleshooting

The Datastore has some [known issues](https://github.com/iati/iati-datastore/issues).

If it's not possible to use the IATI Datastore, we can also try using [OIPA](http://www.oipa.nl/api/v3/docs/).
