import { Meteor } from "meteor/meteor";

import Files from "./collection";

Meteor.methods({
  findImageData() {
    if (Meteor.isServer) {
      let images = Files.collection.find({}, { sort: { date: -1 } }).fetch();

      const url = Meteor.absoluteUrl();

      for (let i = 0; i < images.length; i++) {
        const o = images[i];

        const fileRef = Files.collection.findOne({ _id: o._id });

        o.url = Files.collection.link(fileRef, "original", url);
      }
      return images;
    }
  },
  findImage: ({ _id }) => {
    if (Meteor.isServer) {
      let images = Files.collection.find({ _id }).fetch();

      if (images.length) {
        let image = images[0];

        // Get image url
        image.url = Files.collection.findOne({ _id: image._id }).url();

        return image;
      }

      return null;
    }
  },
});
