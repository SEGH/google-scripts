function getFeedback() {
    const myName = "Susan Holland"
    const htmlMessage = `<p>Thank you!<br>${myName}`
  
    MailApp.sendEmail({
      to: "centraltutorsupport@bootcampspot.com",
      subject: "Please send me the student feedback from my tutorial sessions",
      htmlBody: htmlMessage
    });
  }
  