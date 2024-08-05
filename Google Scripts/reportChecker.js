function reportChecker(e) {
    const activeSheet = e.source.getActiveSheet();
    const sheetName = activeSheet.getName();
  
    const emailAddress = 'email@email.com'; // Email address goes here.
    const subject = 'Google Sheet Modified';
    
    const userEmail = Session.getEffectiveUser().getEmail();
    
    const body = `The "Report" sheet in the Google Sheet for Conga_2873464754 has been modified.
    \n\nModified by: ${userEmail}`;
  
    const shouldSendEmail = sheetName === 'Report';
  
    shouldSendEmail && MailApp.sendEmail(emailAddress, subject, body);
  }
  
  function createTrigger() {
    // Trigger, but you could ignore this function and use the default triggers that Google App Scripts have to offer.
    ScriptApp.newTrigger('reportChecker')
      .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
      .onEdit()
      .create();
  }
  