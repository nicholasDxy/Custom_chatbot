import os
import uuid
def get_all_files(folder_path):
    file_names = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    return file_names

print(str(uuid.uuid4())[:8])
