function makeFixedSessionReminderDrafts() {
  const students = ContactsApp.getContactGroup('Coding Students W/ Fixed Schedules').getContacts();
  console.log(students)

  for (let i = 0; i < students.length; i++) {
    let email = students[i].getEmails()[0].getAddress();
    let name = students[i].getGivenName()
    let fields = students[i].getCustomFields()
    let zoomLink = "";
    let timeZone = "";
    let day = "";
    let time = "";

    for (let i = 0; i < fields.length; i++) {
      let fieldValue = fields[i].getValue();
      let fieldLabel = fields[i].getLabel();
      switch (fieldLabel) {
        case 'Zoom-link':
          zoomLink = fieldValue;
          break;
        case 'Time-zone':
          timeZone = fieldValue;
          break;
        case 'Time':
          time = fieldValue;
          break;
        case 'Day':
          day = fieldValue;
          break;
        default:
          break;
      }
    }

    // Find date of next session
    const today = new Date();
    const sessionDay = day.slice(0, 3);
    const week = [];
    for (let i = 0; i < 7; i++) {
      let nextDay = new Date().setDate(today.getDate() + i)

      week.push(new Date(nextDay).toDateString());
    }

    let nextSession = week.filter(day => day.includes(sessionDay)) || "";
    nextSession = nextSession[0] ? nextSession[0].slice(4, -5) : "";
    console.log(nextSession)
    const htmlMessage = `<p>Hi ${name}!<br><br>Thank you for scheduling your session with me. I am looking forward to our session on ${day}, ${nextSession} at ${time} ${timeZone} Time.<br><br>If something comes up and the scheduled time will not work, <strong>let me know a minimum of 6 hours before the appointment time</strong> and we’ll figure something out.<br><br>This session will take place here: ${zoomLink}<br><br>(If you have not used zoom before please join the meeting at least 15 minutes early because it may have you download and install some software.)<br><br>Again, all I need from you:<ul><li>Be on Tutors & Students Slack 5 minutes before your time slot.</li><li>Make sure your computer/mic/internet connection are working.</li><li>Make sure your workspace is quiet and free from interruptions.</li><li>At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.</li></ul><br>Slack or email me with any questions.  I’m looking forward to our meeting!<br><br><strong>Please Reply All to this email so that I know you have seen it.</strong><br><br><strong>(CC Central Support on all tutor email by always using REPLY ALL).</strong><br><br>Sincerely,<br><br>Susan`

    GmailApp.createDraft(email, `Coding Boot Camp - Tutorial Confirmation - ${day}, ${nextSession} at ${time} ${timeZone} Time`, htmlMessage, { from: "sholland2@bootcampspot.com", cc: 'centraltutorsupport@bootcampspot.com ', htmlBody: htmlMessage })
  }
}
