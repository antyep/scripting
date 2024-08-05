"""
Created on Tue Nov 30 12:24:56 2023

@author: antonioyepez
"""

import os
import pandas as pd
import shutil

original_folder_path = '/Users/antonioyepez/Desktop/pythonCarpetasSV/rootfolder'

excel_path = '/Users/antonioyepez/Desktop/pythonServerScriptNormal/pending_folders_server.xlsx'

new_folders_path = '/Users/antonioyepez/Desktop/pythonSVScript/'

df = pd.read_excel(excel_path)

for index, row in df.iterrows():
    reference = str(row['Reference'])
    reference_with_zero = "" + reference 
    name = str(row['Name'])

    folder_name = f"{reference_with_zero}_{name.replace(' ', '_')}"

    new_folder_path = os.path.join(new_folders_path, folder_name)

    if not os.path.exists(new_folder_path):
        shutil.copytree(original_folder_path, new_folder_path)
        print(f"Copied folder {original_folder_path} to {new_folder_path}")
    else:
        print(f"Folder {new_folder_path} already exists.")

print("Process completed.")
