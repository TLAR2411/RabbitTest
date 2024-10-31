import path from "path";
import os from "os"

export const getFilePath = () => {

  return path.join(os.homedir(), "file_uploads");
};
