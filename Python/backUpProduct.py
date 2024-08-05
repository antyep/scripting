import os
import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
import io

# This script creates a back-up from a Google Sheet to a Google Drive. (It requires Scopes and service account)

SERVICE_ACCOUNT_FILE = 'key.json' # Service account

SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets']

SHEET_ID = '1crrVoR9Xwq1TRWoZjeDW6e-DtTDablNPnRvEOxFbfJE'
PRODUCT_FOLDER_NAME = 'Product'
TARGET_FOLDER_NAME = 'Conga_8729384728732'

credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
drive_service = build('drive', 'v3', credentials=credentials)
sheets_service = build('sheets', 'v4', credentials=credentials)

def get_folder_id(folder_name, parent_id=None):
    query = f"name = '{folder_name}'"
    if parent_id:
        query += f" and '{parent_id}' in parents"
    
    results = drive_service.files().list(q=query, spaces='drive', fields='files(id, name)').execute()
    items = results.get('files', [])
    return items[0]['id'] if items else None

def backup_google_sheet():
    current_date = datetime.datetime.now().strftime('%Y-%m-%d')
    backup_name = f"{current_date}_14-00_{TARGET_FOLDER_NAME}"
    
    product_folder_id = get_folder_id(PRODUCT_FOLDER_NAME)
    target_folder_id = get_folder_id(TARGET_FOLDER_NAME, parent_id=product_folder_id)
    
    if not target_folder_id:
        print(f"Target folder '{TARGET_FOLDER_NAME}' not found.")
        return
    
    backup_file_name = f"{backup_name}.xlsx"
    
    request = drive_service.files().export_media(fileId=SHEET_ID, mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    backup_file = io.BytesIO(request.execute())
    
    file_metadata = {
        'name': backup_file_name,
        'parents': [target_folder_id]
    }
    media = MediaFileUpload(backup_file, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    
    new_file = drive_service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    print(f"Backup created with ID: {new_file['id']}")

backup_google_sheet()
