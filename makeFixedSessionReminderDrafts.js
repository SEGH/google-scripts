function makeFixedSessionReminderDrafts() {
    const students = ContactsApp.getContactGroup('Coding Students W/ Fixed Schedules').getContacts();
    console.log(students)
  
    for (let i = 0; i < students.length; i++) {
      var email = students[i].getEmails()[0].getAddress();
      var name = students[i].getGivenName()
      var fields = students[i].getCustomFields()
      var zoomLink = fields[0].getValue();
      var timeZone = fields[1].getValue();
      var day = fields[2].getValue();
      var time = fields[3].getValue();
      console.log(email)
      console.log(name)
      console.log(zoomLink)
      console.log(timeZone)
      console.log(day)
      console.log(time)
      const htmlMessage = `<p>Hi ${name}!<br><br>Thank you for scheduling your session with me. I am looking forward to our session on ${day} at ${time} ${timeZone} Time.<br><br>If something comes up and the scheduled time will not work, <strong>let me know a minimum of 6 hours before the appointment time</strong> and we’ll figure something out.<br><br>This session will take place here: ${zoomLink}<br><br>(If you have not used zoom before please join the meeting at least 15 minutes early because it may have you download and install some software.)<br><br>Again, all I need from you:<ul><li>Be on Tutors & Students Slack 5 minutes before your time slot.</li><li>Make sure your computer/mic/internet connection are working.</li><li>Make sure your workspace is quiet and free from interruptions.</li><li>At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.</li></ul><br>Slack or email me with any questions.  I’m looking forward to our meeting!<br><br><strong>Please Reply All to this email so that I know you have seen it.</strong><br><br><strong>(CC Central Support on all tutor email by always using REPLY ALL).</strong><br><br>Sincerely,<br><br>Susan`
  
      GmailApp.createDraft(email, `Coding Boot Camp - Tutorial Confirmation - ${day} at ${time} ${timeZone} Time`, htmlMessage, { cc: 'centraltutorsupport@bootcampspot.com ', htmlBody: htmlMessage })
    }
  }
  