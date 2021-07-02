function makeSessionReminderDrafts() {

  // Function to make a draft for a session
  const makeDraft = newSession => {

    // Get email message
    const message = newSession.getMessages()[0]

    // Get time and day from subject
    const sessionInfo = message.getSubject();
    const dateInfo = sessionInfo.split("-");
    const date = dateInfo[1]
    let time = date.match(/\d[^\s]+/)[0];
    const day = date.match(/([A-Z][a-z]+, [A-Z][a-z]+ \d+)/)[0];

    console.log(time, day)

    // Get student's email from body content by matching email regex
    const content = message.getPlainBody()
    const studentEmail = content.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)[0];

    console.log(studentEmail)

    // Find student in contacts by email, get name and custom fields
    const contact = ContactsApp.getContact(studentEmail);
    const name = contact.getGivenName()
    const fields = contact.getCustomFields()
    const zoomLink = fields[0].getValue();
    const timeZone = fields[1].getValue();

    // Function to change time
    const adjustEasternTime = (time, diff) => {
      // Split time into hour, minutes, and meridiem
      let timeArray = time.split(":");
      let hour = timeArray[0];
      let minutes = timeArray[1].slice(0, 2);
      let meridiem = timeArray[1].slice(-2);
      // If it's noon, change meridiem
      if (meridiem === "pm" && hour == 12) {
        meridiem = "am"
      }
      //Subtract difference
      hour -= diff
      // If the hour ends up being less than to equal to zero, modify time
      if (meridiem === "pm" && hour <= 0) {
        switch (hour) {
          case 0:
            hour = 12;
            break;
          case -1:
            hour = 11;
            meridiem = "am";
            break;
          case -2:
            hour = 10;
            meridiem = "am";
            break;
          default:
            break;
        }
      }
      // Rejoin time array with new hour and meridiem
      timeArray[0] = hour;
      timeArray[1] = minutes + meridiem;
      return timeArray.join(":");
    }

    // Check time zone and set time to value of adjusted time depending on hour difference
    switch (timeZone) {
      case "Eastern":
        break;
      case "Central":
        time = adjustEasternTime(time, 1);
        break;
      case "Mountain":
        time = adjustEasternTime(time, 2);
        break;
      case "Mountain Standard":
      case "Pacific":
        time = adjustEasternTime(time, 3);
        break;
      default:
        break;
    }

    // Write message and create draft
    const htmlMessage = `<p>Hi ${name}!<br><br>Thank you for scheduling your session with me. I am looking forward to our session on ${day} at ${time} ${timeZone} Time.<br><br>If something comes up and the scheduled time will not work, <strong>let me know a minimum of 6 hours before the appointment time</strong> and we’ll figure something out.<br><br>This session will take place here: ${zoomLink}<br><br>(If you have not used zoom before please join the meeting at least 15 minutes early because it may have you download and install some software.)<br><br>Again, all I need from you:<ul><li>Be on Tutors & Students Slack 5 minutes before your time slot.</li><li>Make sure your computer/mic/internet connection are working.</li><li>Make sure your workspace is quiet and free from interruptions.</li><li>At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.</li></ul><br>Slack or email me with any questions.  I’m looking forward to our meeting!<br><br><strong>Please Reply All to this email so that I know you have seen it.</strong><br><br><strong>(CC Central Support on all tutor email by always using REPLY ALL).</strong><br><br>Sincerely,<br><br>Susan`

    GmailApp.createDraft(studentEmail, `Coding Boot Camp - Tutorial Confirmation - ${day} at ${time} ${timeZone} Time`, htmlMessage, { from: "sholland2@bootcampspot.com", cc: 'centraltutorsupport@bootcampspot.com ', htmlBody: htmlMessage })

    // Unstar message
    message.unstar();
  }

  // Get emails from calendly about new sessions
  const newSessions = GmailApp.search('is:starred AND label:ScheduledSessions');
  console.log(newSessions)

  // Run makeDraft for each
  newSessions?.length > 0 ? newSessions.forEach(session => makeDraft(session)) : console.log("No New Sessions");
}
