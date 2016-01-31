---
layout: documentation
comments: true
title: Currency conversion
permalink: /documentation/currency/
order: 9
---

* 
{:toc}

The primary currency used in the AIMS is USD, though it also has mechanisms for conversion to BDT and a host of donor currencies. Given that the AIMS already has a way of handling currency conversion, this does not all need to be performed in the IATI import tool front end. However, it is important to understand how it works and how the IATI import tool can help to make life easier.

## Currency conversion rates to BDT

In accordance with the AIMS, we will generally use the [Bangladesh Bank](https://www.bb.org.bd/) (the central bank) rates. These could be programmatically retrieved from the following site, though an API returning JSON would probably be preferable:

    https://www.bb.org.bd/econdata/exchangerate_dtl.php?loadmode=2&cboCurrency=All&ddlYear=2016&UsersList=January&SelectPeriod=January,%202015    

The `value/@value-date` attribute in IATI data provides the specific value date for currency conversion. We should find the exchange rate at the closest date in the Bangladesh central bank data to the `value/@value-date`

The Bangladesh Bank [explains how these rates are calculated](https://www.bb.org.bd/econdata/exchangerate.php):

> Inter-bank exchange rates are also used by BB for purchase and sale transactions with the Government and different International Organizations. The USD/BDT buying and selling rates below are highest and lowest inter-bank exchange rates at Dhaka. The cross rates of BDT with other foreign currencies are based on NY and Dhaka closing exchange rates.

<div class="important-notice">
<i class="fa fa-exclamation-triangle"></i>
In some cases, it is important to know the exact exchange rate according to the donor - e.g. for debt sustainability analysis. This information is not currently available in the IATI Standard, and will have to be collected manually.
</div>

## Currency availability in central bank data

The following currencies are available in central bank data:

* USD
* EUR
* GBP
* AUD
* JPY
* CAD
* SEK
* SGD
* CNH
* INR

## Other currencies

<div class="important-notice">
<i class="fa fa-exclamation-triangle"></i>
We need to have a source for other currencies. What should this source be?
</div>

