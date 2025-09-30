import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);
const rootDir = path.join(currentDir, '..', '..')

const storage = multer.diskStorage({
    destination: path.resolve(rootDir, './uploads'),
    filename: (req, file, callback) => {
        callback(null, uuidv4() + path.extname(file.originalname))
    } 
})

const upload = multer({ storage })

export default upload