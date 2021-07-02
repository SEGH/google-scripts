function getFeedback() {
  const myName = "Susan Holland"
  const htmlMessage = `<p>Thank you!<br>${myName}`

  GmailApp.sendEmail("centraltutorsupport@bootcampspot.com", "Please send me the student feedback from my tutorial sessions", htmlMessage, {
    from: "sholland2@bootcampspot.com",
    htmlBody: htmlMessage
  });
}
