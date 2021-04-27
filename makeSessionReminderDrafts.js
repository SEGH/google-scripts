function makeSessionReminderDrafts() {
    var sessions = SpreadsheetApp.openById('1VWBy9TZ4lDEzxL6D74zrHujE9tek1e3OAExMapgO9M4').getDataRange().getValues()
    var newSession = sessions[sessions.length - 1]
    console.log(newSession)
  
    var email = newSession[0];
  
    var dateInfo = newSession[1].split("-");
    var date = dateInfo[1]
    var time = date.match(/\d[^\s]+/)[0];
    var day = date.match(/([A-Z][a-z]+, [A-Z][a-z]+ \d+)/)[0];
  
    var contact = ContactsApp.getContact(email);
    var name = contact.getGivenName()
    var fields = contact.getCustomFields()
    var zoomLink = fields[0].getValue();
    var timeZone = fields[1].getValue();
  
    const htmlMessage = `<p>Hi ${name}!<br><br>Thank you for scheduling your session with me. I am looking forward to our session on ${day} at ${time} ${timeZone} Time.<br><br>If something comes up and the scheduled time will not work, <strong>let me know a minimum of 6 hours before the appointment time</strong> and we’ll figure something out.<br><br>This session will take place here: ${zoomLink}<br><br>(If you have not used zoom before please join the meeting at least 15 minutes early because it may have you download and install some software.)<br><br>Again, all I need from you:<ul><li>Be on Tutors & Students Slack 5 minutes before your time slot.</li><li>Make sure your computer/mic/internet connection are working.</li><li>Make sure your workspace is quiet and free from interruptions.</li><li>At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.</li></ul><br>Slack or email me with any questions.  I’m looking forward to our meeting!<br><br><strong>Please Reply All to this email so that I know you have seen it.</strong><br><br><strong>(CC Central Support on all tutor email by always using REPLY ALL).</strong><br><br>Sincerely,<br><br>Susan`
  
    GmailApp.createDraft(email, `Coding Boot Camp - Tutorial Confirmation - ${date} ${timeZone} Time`, htmlMessage, { cc: 'centraltutorsupport@bootcampspot.com ', htmlBody: htmlMessage })
  
  }