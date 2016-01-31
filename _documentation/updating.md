---
layout: documentation
comments: true
title: Updating data
permalink: /documentation/updating/
order: 4
---

## Updating activities

Where a field has been tied to a specific IATI activity, it should be possible to update that field automatically as IATI data changes. IATI data should be checked for updates each night. To begin with, a user should be prompted when a relevant change has been identified. They should then be able to choose whether to accept the changes or reject them. Their choices should be persistent if the update is rejected, i.e. the following night, even though the IATI data differs from the AIMS data, the user should not be prompted to update. Notifications could be provided periodically be email (see "User settings and controls", below) or by using the AIMS' notifications interface (see "Writing to the AIMS", above).

We assume that users will generally want to update fields that have been sourced from IATI data, but not where fields have been sourced from AIMS data. However, at least to begin with, users should always have to choose to import data rather than for it to occur automatically without prompting. In time, as more analytics are collected on the way the import tool is being used, users could decide to allow the data to automatically flow in.

The following steps could be used to check for and manage updates:

1. on a nightly basis, download relevant data from the IATI Registry;
2. record activities that are not matched at all in the AIMS. Flag those originating from DPs that have imported some data from IATI to the AIMS (they could be new activities);
3. where an IATI activity is linked to an AIMS activity, check to see if any of the matched fields have different values. This could be achieved by comparing values in the AIMS with the values in the most recent IATI data, or it could be achieved by comparing the most recent IATI data with the previously downloaded IATI data.

Different approaches should be taken depending on the nature of the change:

1. if there are new activities, present the user with the option to begin importing those activities (following the methodology outlined above – beginning at stage 1);
2. if there are differences in matched fields, present the user with the option to update those fields with the new values;
3. if there are new fields that were previously unknown to the AIMS (e.g. there is now data on the location of activities), present the user with the option of importing that data to their activities (following the methodology outlined above – beginning at stage 2);
4. if activities are deleted, alert the user. Provide the option to remove the activities from the AIMS or unlink them from the IATI data. It is also important to state how many other activities were deleted – it could be a technical error that has caused the activities to be deleted. We should be particularly careful about deleting information and would suggest not doing so automatically for the foreseeable future.
 
It will probably be desirable to develop a distinct module that can compare and record differences in IATI data files, as well as expose that data in an intuitive way.

## Updating transactions

Financial transactions should be handled in a similar way to activities – using the same methodology for comparing and recording differences in IATI data files. However, given the potential large volume of changes to financial transactions, users will need to be presented with an aggregate overview of the nature of the changes, so that they can make an informed decision about the implications of any changes to the transactions, and whether they would like to import them.

Financial transactions should generally not be overwritten or deleted from the AIMS; IATI data should be assumed "append-only" in this respect. However, it is important to be aware of and handle potential exceptions to that rule (e.g. where an organisation changes the dates of transactions after the fact). We will consider the best approach to handling exceptions to this – whether it is better to try to adjust the data in the user interface or to work with donors to fix their data.
