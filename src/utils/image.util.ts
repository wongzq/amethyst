import { Base64Encode } from "base64-stream";
import axios from "axios";

export const convertImageURLtoURI = async (url: string) => {
  const res = await axios.get(url, { responseType: "stream" });

  const base64string = await new Promise<string | null>((resolve, reject) => {
    if (!res.data) {
      return reject(null);
    }

    let chunks: any[] = [];

    const stream = res.data.pipe(new Base64Encode());

    stream.on("data", (chunk: any) => {
      chunks = chunks.concat(chunk);
    });

    stream.on("end", () => {
      resolve(chunks.toString());
    });
  });

  if (base64string) {
    return `data:image/png;base64,${base64string}`;
  }

  return null;
};
