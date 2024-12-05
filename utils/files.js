import fs from 'fs/promises';
import path from 'path';

export async function getFilesInDirectory(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);
    return files;
  } catch (error) {
    console.error(`Error reading directory: ${directoryPath}`, error);
    throw error;
  }
}