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
      case "Pacific":
        time = adjustEasternTime(time, 3);
        break;
      default:
        break;
    }
  
    const htmlMessage = `<p>Hi ${name}!<br><br>Thank you for scheduling your session with me. I am looking forward to our session on ${day} at ${time} ${timeZone} Time.<br><br>If something comes up and the scheduled time will not work, <strong>let me know a minimum of 6 hours before the appointment time</strong> and we’ll figure something out.<br><br>This session will take place here: ${zoomLink}<br><br>(If you have not used zoom before please join the meeting at least 15 minutes early because it may have you download and install some software.)<br><br>Again, all I need from you:<ul><li>Be on Tutors & Students Slack 5 minutes before your time slot.</li><li>Make sure your computer/mic/internet connection are working.</li><li>Make sure your workspace is quiet and free from interruptions.</li><li>At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.</li></ul><br>Slack or email me with any questions.  I’m looking forward to our meeting!<br><br><strong>Please Reply All to this email so that I know you have seen it.</strong><br><br><strong>(CC Central Support on all tutor email by always using REPLY ALL).</strong><br><br>Sincerely,<br><br>Susan`
  
    GmailApp.createDraft(email, `Coding Boot Camp - Tutorial Confirmation - ${date} ${timeZone} Time`, htmlMessage, { cc: 'centraltutorsupport@bootcampspot.com ', htmlBody: htmlMessage })
  
  }