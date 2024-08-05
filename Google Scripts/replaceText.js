// Simple script made to replace text, since it is a manual job, I am looking to minimize the human error.
// It automatically updates once the field is filled in the Sheet to avoid mistakes has a "onSave" trigger in Google App Scripts.

function replaceTextInSheet(sheet, replaceNewText, newText) {
    const data = sheet.getDataRange().getValues();
    const updatedData = data.map(row => 
      row.map(cell => cell === replaceNewText ? newText : cell)
    );
    sheet.getRange(1, 1, updatedData.length, updatedData[0].length).setValues(updatedData);
  }
  
  function updateTexts() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    const replacements = [
      { replaceNewText: "Copy+ADC", newText: "C7290E" },
      { replaceNewText: "CECXXXX", newText: "CF5500" },
      { replaceNewText: "S1790", newText: "1790" },
      { replaceNewText: "Wind", newText: "Windrd" },
      { replaceNewText: "CAQ", newText: "A5600" }
    ];
    
    replacements.forEach(({ replaceNewText, newText }) => replaceTextInSheet(sheet, replaceNewText, newText));
  }
  

