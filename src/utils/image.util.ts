import axios from 'axios';
import { Base64Encode } from 'base64-stream';

export enum EMimeType {
  PNG = 'image/png',
  GIF = 'image/gif',
}

export const convertImageURLtoURI = async (
  url: string,
  mimeType: EMimeType,
) => {
  const res = await axios.get(url, { responseType: 'stream' });

  const base64string = await new Promise<string | null>((resolve, reject) => {
    if (!res.data) {
      return reject(null);
    }

    let chunks: any[] = [];

    const stream = res.data.pipe(new Base64Encode());

    stream.on('data', (chunk: any) => {
      chunks = chunks.concat(chunk);
    });

    stream.on('end', () => {
      resolve(chunks.toString());
    });
  });

  if (base64string) {
    return `data:${mimeType};base64,${base64string}`;
  }

  return null;
};
