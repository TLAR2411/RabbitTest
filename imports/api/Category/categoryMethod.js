import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import { Categorys } from "./categoryCollection";

new ValidatedMethod({
  name: "category.create",
  validate: new SimpleSchema({
    name: {
      type: String,
      min: 1,
    },
  }).validator(),
  async run({ name }) {
    if (Meteor.isServer) {
      //   if (!this.userId) {
      //     throw new Meteor.Error(
      //       "Not authorized",
      //       "You must be logged in to add a product."
      //     );
      //   }
      return await Categorys.insertAsync({
        name: name,
        createdAt: new Date(),
      });
    }
  },
});

// new ValidatedMethod({
//   name: "category.find",
//   validate: new SimpleSchema({
//     limit: {
//       type: Number,
//       optional: true, // Optional limit to control the number of documents returned
//     },
//     sort: {
//       type: Object,
//       optional: true, // Sorting option, optional
//       defaultValue: { name: 1 }, // Default sort by name in ascending order
//     },
//   }).validator(),
//   async run({ limit, sort }) {
//     if (Meteor.isServer) {
//       const categories = await Categorys.find(
//         {},
//         {
//           limit: limit || 0, // Return all if no limit is provided
//           sort: sort,
//         }
//       ).fetch();
//       return categories;
//     }
//   },
// });

Meteor.methods({
  async "category.find"() {
    const categories = await Categorys.find({}).fetch();
    return categories;
  },
});
