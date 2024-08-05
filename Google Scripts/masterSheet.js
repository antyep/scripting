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
  
