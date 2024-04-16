import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import url from 'url';

//make sure that we can acces the avatarfolder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directoryPath = __dirname;
const companyAvatarFolderPath = path.join(directoryPath, 'Company_avatars');
// save the image to the filesystem
const saveCompanyImageToFilesystem = (imageData, filename, callback) => { 
    const imagePath = path.join(companyAvatarFolderPath, filename); 
    
    fs.writeFile(imagePath, imageData, 'binary', (err) => {
        if (err) {
            console.error('Error saving image to filesystem:', err);
            callback(err);
        } else {
            console.log('Image saved to filesystem:', imagePath);
            callback(null, imagePath); 
        }
    });
  };

// Generate a random filename
const generateRandomCompFilename = () => {
    const array = new Uint32Array(2); 
    crypto.getRandomValues(array);
    return array.join('-'); 
};

  export  {saveCompanyImageToFilesystem, generateRandomCompFilename}