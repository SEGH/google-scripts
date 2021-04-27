function sendStudentEmailBlast() {
    const emailAddresses = []
    let emailList = "susan@segh.dev";
    const students = ContactsApp.getContactGroup('Coding Students').getContacts();
  
    students.forEach(student => emailAddresses.push(student.getEmails()));
    emailAddresses.forEach(contact => emailList = emailList + `, ${contact[0].getAddress()}`)
  
    console.log(emailList);
  
    const htmlMessage = "<h1>Hi everyone!</h1><p>I hope you all had a great week! If you haven't already scheduled a session for next week and would like to, you can do that on my <a href='https://calendly.com/susanholland' target='_blank'>Calendly page</a>. If you don't see any times that work for you, let me know and I'll see if we can figure something out.</p><h3 style='font-weight: 200; margin-bottom: 0;'>Keep in mind:</h3><ul><li>On the Calendly page, please be sure you have the correct time zone selected in the section labeled 'Times are in'</li><li>Part-time students (6 month boot camp) are entitled to 1 session/week<br>Full-time students (3 month boot camp) are entitled to 2 sessions/week<br>Weeks run Monday-Sunday<li>If you'd like to schedule regular, recurring sessions at the same day and time each week, let me know!<br>This is particularly useful if you have a strict schedule so you won't have to compete for time on my calendar.</li></ul><div style='border: solid 1px black; padding: 1rem;'><h5 style='margin: 0;'>Boot camp tip!</h5><p>Our Learning Assistant team is available to help you every day with your curriculum-based questions. We think you’ll find this resource very helpful as a supplement to tutor support, TA office hours, and class time. If you’re unsure how to utilize that resource please speak to your TAs, Instructor, or Success Manager (SSM / PSM).</p></div><p>Feel free to reach out to me if you have any questions by replying to this email (using REPLY ALL to include Central Support) or messaging me on Slack.</p><h2 style='font-weight: 100'>Kind Regards,</h2><h2 style='font-weight: 100'>Susan Holland</h2>"
  
    MailApp.sendEmail("", 'Coding Boot Camp - Tutorials available', '', {
      bcc: emailList,
      cc: "centraltutorsupport@bootcampspot.com",
      htmlBody: htmlMessage
    });
  }
  