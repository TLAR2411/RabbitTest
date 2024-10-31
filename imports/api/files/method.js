import { Meteor } from "meteor/meteor";

import Files from "./collection";

Meteor.methods({
  async findImageData() {
    if (Meteor.isServer) {
      let images = await Files.collection
        .find({}, { sort: { date: -1 } })
        .fetch();

      const url = Meteor.absoluteUrl();
      // console.log("urllll", url);

      for (let i = 0; i < images.length; i++) {
        const o = images[i];

        const fileRef = await Files.collection.findOneAsync({ _id: o._id });

        o.url = Files.link(fileRef, "original", url);
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
