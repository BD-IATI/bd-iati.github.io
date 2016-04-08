---
layout: post
title: Automatically importing financial data into Bangladesh's AIMS
author: mark
excerpt: At the mid point of development, we summarise our progress in the last two weeks, and look forward to challenges in the remaining stages of development.
---

Since February we've been working with [Technovista](http://www.technovista.com.bd/) on building an IATI import tool for the Bangladesh AIMS. We now have a large amount of functionality developed, making it a good point to reflect and consider what's left to get done by the end of May. [(Check out our previous blogs on earlier stages of development.)](/blog/)

## Cleaning up the user interface

![Ismail and Faruque, Technovista's developers](/img/summary-mark-ismail-faruque-sm.png "Ismail and Faruque, Technovista's developers"){: .img-caption } 

We spent a little more time last week cleaning up the user interface -- simplifying and clarifying language, as well as some design improvements. We know we need to do some clever and complicated things to get the data in the correct shape and avoid double-counting. The challenge is to hide most of that complexity from the user, while still allowing them input on decisions they need to take.

## Handling financial data

We're now handling financial data quite nicely. Our approach is to say that -- within each of the main categories (commitments, disbursements and planned disbursements) -- data can either be taken from the AIMS **or** from IATI, but not both. This way we can avoid double-counting and ensure consistency in the data.

## Next steps

It feels like we've broken the back of the work - we can now handle complex projects, financial data, and updating in the system. In the remainder of the work we will work on the following main areas:

* import more complex fields (including documents and locations)
* automatically update financial and non-financial data from the IATI Registry
* further improvements to the user interface, workflow and performance
* develop an interface to allow grouping of activities into projects -- this will be useful for DPs that have a very granular unit of aid in their IATI data (particularly the US)
* reconsider all of our logic, particularly the way we handle co-financed projects and trust funds

Keep reading for a more detailed walk-through of what we've developed to date.

------

## Walk-through of interface to date

### DP Dashboard

![Canada's IATI Import Dashboard](/img/summary-1-sm.png "Canada's IATI Import Dashboard"){: .img-caption } 

We set up a simple overview Dashboard that summarises the current progress on importing an individual DP's IATI data, and allows access to preferences and settings. We've also improved the look and feel of the module, by improving the navigation between steps and tweaking the design.

<hr class="hidden" />

### Calculating financial data

![Previewing Netherlands financial data](/img/summary-2-sm.png "Previewing Netherlands financial data"){: .img-caption } 

Using an API kindly provided by the Bank of Bangladesh (the central bank), we convert values from the DP's own currency to USD, for import into the AIMS. At the moment, we are using monthly average rates, but as soon as daily rates are available, we will use them instead. The system is set up to use the closest currency conversion date to the transaction's value date.

<hr class="hidden" />

### Handling forward budget data

A tricky issue is handling foward budget data, which in IATI appears under both `budget` and `planned-disbursement` elements. These two elements appear to have been used differently by different DPs. In addition, reconciling *original* and *revised* budgets involves some tricky logic to avoid double-counting. Eventually, we may have some recommendations about how the standard, guidance, or implementation could be improved.

<hr class="hidden" />

### Improving the way we handle co-financed / trust fund projects

![Merging DFID, Netherlands and World Bank financial data for a co-financed project, the Health Sector Development Programme](/img/summary-3-sm.png "Merging DFID, Netherlands and World Bank financial data for a co-financed project, the Health Sector Development Programme"){: .img-caption } 

We've taken another look at how we handle merging projects from different DPs. We now roll up numbers for each DP for each type of financial data. The Managing DP can then choose to include, for example, commitments reported by DFID and the Netherlands, or if those commitments are included in the amount it has already entered in the AIMS, it can choose to leave them out.

<hr class="hidden" />
