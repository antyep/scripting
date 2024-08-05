  // Script made to work from Monday to Friday with a trigger at 1AM everyday. 
  // Once we are in that hour the script moves all the data to another Sheet in the same file and clears the current day sheet.

function transferClearConsultations() {
    const currentDay = new Date().getDay();
    const shouldExecute = currentDay >= 1 && currentDay <= 5;
  
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const consultationsSheet = ss.getSheetByName("Consultas de hoy");
    const historySheet = ss.getSheetByName("Historial");
  
    const consultationsRange = consultationsSheet.getRange("A3:P250");
    const consultationsData = consultationsRange.getValues();
  
    const lastHistoryRow = historySheet.getLastRow();
  
    shouldExecute && historySheet.getRange(lastHistoryRow + 1, 1, consultationsData.length, consultationsData[0].length).setValues(consultationsData);
    shouldExecute && consultationsSheet.getRange("F3:I250").clearContent();
  }
  

