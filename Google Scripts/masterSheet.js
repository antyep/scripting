// Sheets are censored for safety. Basically it takes all the data from different sheets and includes them in one.

// Due to memory in Drive and also performance, this is the best way to sync different sheets with a lot of data.

// Why not use importRange?: 
// ImportaRange does not give the real-time information, it just clones it, if there is any wrong in any sheet modification it will break the master datasheet and collapse it until the mistake is fixed.

// Why not python?:
// Google App Scripts is worth using when you are using the Google Environment, all the Data Sheets are made and Save in Google Services
// This leads to a better performance and rendering, in my own experience, but it could be made in Python.

const SOURCE_SHEET_URLS = [
    'sheet1',
    'sheet2',
    'sheet3'
  ];
  
  const MASTER_SHEET_NAME = 'BBDD - CNG Modelos 2024'; 
  
  function syncData() {
    const masterSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MASTER_SHEET_NAME);
    
    masterSheet && masterSheet.clear();
  
    SOURCE_SHEET_URLS.forEach(url => {
      const sourceSheet = SpreadsheetApp.openByUrl(url).getActiveSheet();
      const data = sourceSheet.getDataRange().getValues();
      
      data.forEach(row => masterSheet && masterSheet.appendRow(row));
    });
  
    Logger.log('Data synchronized successfully.');
  }
  
  function createTrigger() {
    ScriptApp.newTrigger('syncData')
      .timeBased()
      .everyHours(4)
      .create();
  }
  

  // NOTE: This is an example, since the company has too many Google Sheets there are many functions and datasheets, but this is the main model made by me.

