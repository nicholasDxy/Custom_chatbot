import os

class FileManager:
    
    def __init__(self):
        self.folder_path = './files'
        self.loaded_file = {}
        
    
    def getFiles(self):
        files = [f for f in os.listdir(self.folder_path) if os.path.isfile(os.path.join(self.folder_path, f))]
        file_names = []
        for file in files:
            split_file = file.split('_')
            uid = split_file[0]
            file_name = split_file[1]
            file_names.append({'uid': uid, 'file_name': file_name})
        return file_names

    def getFileNameByUid(self, uid):
        folder_path = './files'
        for f in os.listdir(folder_path):
            if f.startswith(str(uid)):
                return f
        return None

