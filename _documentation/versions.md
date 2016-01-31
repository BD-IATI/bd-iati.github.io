---
layout: documentation
comments: true
title: Versions
permalink: /documentation/versions/
order: 5
---

## Versions of the IATI Standard

There are now a number of versions of the IATI Standard. The main breaking changes are:

* Versions 1.03-1.04 &ndash; substantial change to the sub-national location / geocoding schema ([see changelog](http://iatistandard.org/upgrades/decimal-upgrade-to-1-04/1-04-changes/)). One of the main changes was where location coordinates were stored. 1.03 used:

      <coordinates latitude="34.341944400000003000" longitude="62.203055599999971000" precision="2" />
    
    Whereas 1.04 uses:

      <point srsName="http://www.opengis.net/def/crs/EPSG/0/4326">
        <pos>31.616944 65.716944</pos>
      </point>
    
    See [location in 1.03](http://iatistandard.org/103/activities-standard/location/index.html) and [location in 1.04](http://iatistandard.org/104/activity-standard/iati-activities/iati-activity/location/)
* Versions 1.x to 2.x &ndash; two major changes:
   * a number of English-language codelists were changed to numeric codes. The most important of these are:
     * [activity date type](http://iatistandard.org/201/upgrades/integer-upgrade-to-2-01/2-01-changes/#activity-date-type-amended-codes)
     * [organisation role](http://iatistandard.org/201/upgrades/integer-upgrade-to-2-01/2-01-changes/#organisation-role-amended-codes)
     * [sector vocabulary](http://iatistandard.org/201/upgrades/integer-upgrade-to-2-01/2-01-changes/#sector-vocabulary-was-vocabulary-amended-codes)
     * [transaction type](http://iatistandard.org/201/upgrades/integer-upgrade-to-2-01/2-01-changes/#transaction-type-amended-codes)
   * changes to improve the way the Standard handles publication in multiple languages.
     * The main change here was to include a `narrative` element under [various elements](http://iatistandard.org/201/upgrades/integer-upgrade-to-2-01/2-01-changes/#narrative-new-elements), which then contains the text that would previously have been just within the text of the elements themselves.
     * For example, in v1.x, Canada's titles looked something like:
           
           <title xml:lang="en">Legal Reform</title>
           <title xml:lang="fr">Réforme juridique</title>

         Whereas in v2.01, the data looks something like this:
           
           <title>
             <narrative xml:lang="en">Legal Reform</narrative>
             <narrative xml:lang="fr">Réforme juridique</narrative>
           </title>

## Approach to handling different versions

IATI data retrieved from different donors may be available in different versions of the IATI Standard. A component to automatically convert all data to a single version of the IATI Standard will make it significantly easier to handle the data later in the application. We will take version 2.02 of the IATI Standard as our basis, as it's the most recent version of the Standard. IATI-XML data from the AIMS should also be passed through this component. The import process of matching data from different sources will become significantly easier once all the data is in the same format.

This component should:

*	Allow data from different IATI-XML versions to be imported and converted to a standard JSON representation, including nesting hierarchical activities
*	Be available as a distinct module so that it can be used and maintained by other users of IATI data.

## Standardising and converting data

There are two different ways we could do this:

1. Standardise XML, then convert to JSON:
  * Create a converter from each version of the IATI Standard to version 2.02
  * Create one converter from version 2.02 of the IATI Standard to a standard JSON representation

2. Convert to standard JSON:
  * Create a converter from each version of the IATI Standard to a standard JSON representation of the IATI data.

We will proceed with option 1 (standardise, then convert) as it is likely to involve less duplication in the code, and also because it is likely to be useful to other users who will need to handle data from different versions of the IATI Standard.
