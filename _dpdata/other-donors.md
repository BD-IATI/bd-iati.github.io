---
layout: data
comments: true
title: Other donors
permalink: /data/other-donors/
order: 5
---

* 
{:toc}

## Netherlands
For the the Netherlands' projects, commitments are made in the local currency value - in Bangladesh, this is USD rather than BDT. The commitment value is stored in the Ministry of Foreign Affairs' internal project management system in EUR and USD. The EUR value is shown in IATI data. At the start of each year, the EUR commitment values are recalculated to ensure that the local project value in USD is accurately reflected in EUR, given currency fluctuations over the previous year. This should be fairly straightforward to handle given the mechanisms the IATI Standard has for dealing with currencies, but it is useful to be aware of this nuance. The Netherlands also spends much of its funds through large tranches of programmatic funding to implementing partners such as Dutch NGOs. Including IATI data published by Dutch NGOs may help to provide a fuller picture of Dutch development cooperation projects.

## UNDP
UNDP receives funds from headquarters and from DPs in country to fund particular projects. It is important to avoid double-counting the DP-reported projects with the UNDP-reported projects. We propose to handle this issue by allowing DPs to map their projects to the UNDP project, and then allow UNDP to decide which data it chooses to take - its own, or others' data. This issue of data being reported at multiple levels will certainly apply to other organisations and the user interface will need to handle it in a general way.

## UNICEF
UNICEF has a unit of aid in its IATI data that shows results rather than projects. This issue cannot be solved in the user interface but would need to be taken up with headquarters to work out if the system could instead export project data.

## USAID
USAID has a very granular unit of aid in its IATI data ("awards"), so activities will need to be grouped together to create meaningful projects. It appears that in Bangladesh, one project has one or many associated awards, so an interface to allow grouping of awards into projects will be useful. There may however be awards belonging to multiple projects - we propose that such awards should not be "split" for now, but should be handled manually. Systems improvements currently underway at USAID could in time help to improve this process
