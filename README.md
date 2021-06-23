# google-scripts

## getFeedback

Modify with your name.

Add a time-based trigger to automatically run function at chosen time (one day of the month, week, etc) in order to request feedback regularly.

## sendStudentEmailBlast

Modify with personal email in email list (to receive a copy of email if desired), calendly link, name in html message, and 'from' field in sendEmail method options.

Must have a group of contacts that matches the getContactGroup argument. The function will send an email with those contacts as bcc recipients and cc Central Tutor Support.

Add a time-based trigger to automatically run function at chosen time.

## makeSessionReminderDrafts

Modify name in html message to be your name.

Must have spreadsheet with id that matches the openById argument, column A for email addresses, column B for session date.

Function searches for google contact by the email in the spreadsheet column A. Add zoomLink and timeZone custom fields to each contact in google contacts.

Add a trigger with 'From spreadsheet - On change' event to automatically run function when new session is added to spreadsheet.

Can create Zapier zap to add a new row to the spreadsheet when an email from Calendly for a new session is received.

## makeFixedSessionReminderDrafts

Modify name in html message to be your name.

Must have a groups of contacts that matches the getContactGroup argument. Add zoomLink, timeZone, day, and time custom fields to contacts. The function will draft an email for every contact in that group.

Add a time-based trigger to automatically run function at chosen time.

## Questions and Contributions

Feel free to reach out if you have any questions about setting these up in Google Apps Script or if you have suggestions for improving the functions! Check out the issues section for areas needing improvement.