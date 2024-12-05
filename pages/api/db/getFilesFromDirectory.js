import { getFilesInDirectory } from "../../../utils/files";
import path from 'path';


export default async function handler(req, res) {
  const directoryPath = path.join(process.cwd(), `/public${req.body.dirpath}`); 
  const files = await getFilesInDirectory(directoryPath);
  res.status(200).json(files);
}