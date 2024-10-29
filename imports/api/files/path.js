import { Meteor } from "meteor/meteor";
import path from "path";

export const getFilePath = () => {
  // const { appName = "App" } = Meteor.settings.public;
  return Meteor.isProduction
    ? `/data/file_uploads`
    : path.join(
        `${process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]}`,
        `file_uploads`
      );
};
