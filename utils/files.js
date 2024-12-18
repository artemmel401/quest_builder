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

export async function getDirectoriesInDirectory(directoryPath) {
  try {
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });

    const directories = await Promise.all(
      entries.filter(entry => entry.isDirectory())
        .map(async entry => {
          const fullPath = path.join(directoryPath, entry.name);
          return { name: entry.name, path: fullPath };
        })
    );

    return directories;
  } catch (error) {
    console.error(`Error reading directory: ${directoryPath}`, error);
    throw error;
  }
}