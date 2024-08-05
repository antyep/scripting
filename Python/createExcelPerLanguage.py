"""
Created on Wed May 29 17:13:07 2024

@author: antonioyepez
"""

# Script made to verify a main file (Excel) and generate 1 file per language, in this case, 9 languages.

import pandas as pd
import os

input_file_path = os.path.expanduser("/Users/antonioyepez/Desktop/Todas_recetas.xlsx")
output_folder = os.path.expanduser("/Users/antonioyepez/Desktop/test1")

if not os.path.exists(output_folder):
    os.makedirs(output_folder)

df = pd.read_excel(input_file_path, dtype={'id': str})

languages = ['cs', 'de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'pt']

for language in languages:
    df_filtrado = df[df['language'] == language]
    output_file_path = os.path.join(output_folder, f"Todas_recetas_{language}.xlsx")
    df_filtrado.to_excel(output_file_path, index=False, engine='openpyxl')

print("Files generated successfully.")


