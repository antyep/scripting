// Simple script to avoid line breaks and replace them for "/".
// Was made to have the same size in all rows or otherwise when the data is introduce it will resize depending on the data it has.

function replaceLastLineBreaks() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName("Consultas sin respuesta");
    const lastRow = sheet.getLastRow();
  
    const startRow = Math.max(1, lastRow - 4);
    const range = sheet.getRange(startRow, 7, lastRow - startRow + 1, 1);
    const data = range.getValues();
    
    const updatedData = data.map(row => {
      const value = row[0];
      const isString = typeof value === 'string';
      const newValue = isString ? value.replace(/\n/g, ' / ') : value;
      return [newValue];
    });
  
    range.setValues(updatedData);
  }
  

