# I created this Script for cooperative work, some information was given in Excel, which does not facilitate real time co-working.

# Scripts moves everything the excel has to a Google Sheet. You require Google Cloud services to use it properly.

"""
Created on Mon Feb 13 11:03:12 2024

@author: antonioyepez
"""

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SCOPES = ['https://www.googleapis.com/auth/drive']
SERVICE_ACCOUNT_FILE = 'key.json' # Service account token

credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)

drive_service = build('drive', 'v3', credentials=credentials)

def upload_excel_to_gsheet(excel_file_path, gsheet_name):
    file_metadata = {
        'name': gsheet_name,
        'mimeType': 'application/vnd.google-apps.spreadsheet'
    }
    media = MediaFileUpload(excel_file_path,
                            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            resumable=True)

    file = drive_service.files().create(body=file_metadata,
                                        media_body=media,
                                        fields='id').execute()
    
    print(f'File ID: {file.get("id")}')
    return file.get("id")

excel_file_path = 'your_excel_file.xlsx'
gsheet_name = 'Migrated Google Sheet'

upload_excel_to_gsheet(excel_file_path, gsheet_name)
