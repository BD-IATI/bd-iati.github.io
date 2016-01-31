---
layout: documentation
comments: true
title: Financial data
permalink: /documentation/financial-data/
order: 3
---

* 
{:toc}

The Bangladesh AIMS contains a number of different sorts of financial data. IATI also has a number of different sorts of financial data, and has a couple of different ways of handling such data. Some donors may interpret this a little differently. Given these differences, the import tool will need to provide users with some information (e.g. comparing amounts in two systems) in order to help them make sensible decisions.

## Financial data in the AIMS

Financial data is found in the AIMS either at the project level (as a single value) or as a series of transactions of different types, under *funding information*.

### Project information

A single value (in different currencies, with a [currency conversion](../currency/) rate to USD) can be provided for each of the following fields:

* Project Cost in USD *(total project cost)*
* DP Contribution *(managing DP's contribution)*
* Other Contribution *(other DPs' contributions)*
* GoB Sharing *(government contribution)*

### Funding information

Many values (in different currencies, with currency conversion rates to USD) can be provided for each of the following fields:

* Commitments
* Planned disbursements
* Actual Disbursements
* Expenditure

Disbursements (both planned and actual) are linked to commitments (which are actually the value of financing agreements)

## Financial data in IATI

Financial data can be found in two places in IATI.

Most financial data is found in `<transaction>` elements. Each activity can have many transactions. Transactions can be of several different types. The main three we will be concerned with are `commitment`, `disbursement` and `expenditure`. There are also a series of transaction types relating to loans; we will look at these in more detail when the need arises.

Financial data relating to forward plans is found in two other elements, `<budget>` and `<planned-disbursement>`. The difference between these two is not well documented and usage varies. **Budget** is generally supposed to be medium-term forward plans for an activity &ndash; at least one year ahead, and broken down into quarterly chunks. **Planned disbursement** is generally supposed to show the specific date when specific tranches of funding will be disbursed. It is likely to be much more short term and particularly used in the context of budget support.

## Mapping financial data from IATI to AIMS

### Mapping to funding information

*Planned disbursements are handled somewhat differently &ndash; [see below](#mapping-to-planned-disbursements)*.

AIMS | IATI v1.x | IATI v2.x | IATI definition
---- | --------- | --------- | ---------------
Commitment | C | 2 | A firm, written obligation from a donor or provider to provide a specified amount of funds, under particular terms and conditions, for specific purposes, for the benefit of the recipient.
Actual Disbursement | D | 3 | Outgoing funds that are placed at the disposal of a recipient government or organisation, or funds transferred between two separately reported activities.
Actual Expenditure | E | 4 | Outgoing funds that are spent on goods and services for the activity.

Notes:

* it appears that in both the AIMS and IATI, donors use Disbursement and Expenditure interchangeably and inconsistently. We recommend in general mapping both of these types of transactions to Disbursements. In IATI, expenditures are sometimes used for administrative or ancilliary costs, or for funds spent on things that would not be expected to show up lower down the chain of IATI publishers &ndash; for example, office supplies. However, the definition and distinction is not very clear.
* there is not total agreement in IATI about the definition of "Commitment". While the original DAC definition (which the IATI definition is derived from, and fairly dependent upon) defines it as a "firm, written obligation" &ndash; normally a formal letter exchanged with the government &ndash; it is sometimes also understood to be the total value of the project. The `budget` element is probably more appropriate for the total value of the proejct, but we need to be mindful that donors may use this data in slightly different ways.

The two IATI columns show the codes used on the `transaction-type/@code` attribute on each `transaction`.

### Mapping to planned disbursements

We will generally map from `budget` to planned disbursements. We need to have a definition of what is required in the AIMS (e.g. must planned disbursements be disaggregated by quarter). We should consider how forward data is currently used in the AIMS, and what happens to "forward" data once the date is past.

### Mapping to project information

AIMS | IATI
---- | ----
Project Cost in USD | Sum of all `budget` elements (though see note above - we may need to consider commitments for this sometimes)
DP contribution | Sum of all `budget` elements for the managing DP
Other contribution | Sum of all `budget` elements for other contributing DPs
GoB sharing | *No mechanism for capturing this data in IATI &ndash; must be manually filled out in the AIMS*

<div class="important-notice">
<i class="fa fa-exclamation-triangle"></i>
Is each expenditure linked to a disbursement? It looks like expenditures are linked to loan/grant agreements, unclear how this can be as if the disbursement is made to an implementer, that is all the one pot, so at most, the expenditure can be linked to the withdrawal application, and then is made from the resulting disbursement but financially is one pot.
</div>
