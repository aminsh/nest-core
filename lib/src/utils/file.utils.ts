import * as fs from 'fs';

export const readFileAsync = (filename: string): Promise<string> => {
  return new Promise<string>(((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  }))
}
