import { Meteor } from "meteor/meteor";
import { Products } from "./productCollection";
import { Categorys } from "../Category/categoryCollection";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import Files from "../files/collection";

new ValidatedMethod({
  name: "products.create",
  validate: new SimpleSchema({
    data: {
      type: String,
      min: 1,
    },
    name: {
      type: String,
      min: 1,
    },
    price: {
      type: Number,
      min: 0,
    },
    categoryId: {
      type: String,
    },
    photoId: {
      type: String,
      optional: true,
    },
    newPhotoId: {
      type: String,
      optional: true,
    },
  }).validator(),
  async run({ data, price, categoryId, create_date, name, photoId }) {
    if (Meteor.isServer) {
      return await Products.insertAsync({
        data: data,
        price: price,
        categoryId: categoryId,
        photoId: photoId,
        name: name,
        photoId: photoId,
        create_date: new Date(),
      });
    }
  },
});

new ValidatedMethod({
  name: "product.remove",
  validate: new SimpleSchema({
    id: {
      type: String,
      required: true,
    },
  }).validator(),

  run({ id }) {
    if (Meteor.isServer) {
      return Products.removeAsync({
        _id: id,
      });
    }
  },
});

new ValidatedMethod({
  name: "product.findById",
  validate: new SimpleSchema({
    id: {
      type: String,
      required: true,
    },
  }).validator(),

  run({ id }) {
    if (Meteor.isServer) {
      return Products.findOneAsync({
        _id: id,
      });
    }
  },
});

new ValidatedMethod({
  name: "product.update",
  validate: new SimpleSchema({
    _id: {
      type: String,
      optional: true,
    },
    data: {
      type: String,
      min: 1,
      optional: true,
    },
    name: {
      type: String,
      min: 1,
      optional: true,
    },
    price: {
      type: Number,
      min: 0,
      optional: true,
    },
    categoryId: {
      type: String,
      optional: true,
    },
    photoId: {
      type: String,
      optional: true,
    },
    // newPhotoId: {
    //   type: String,
    //   optional: true,
    // },
    create_date: {
      type: Date,
    },
  }).validator(),
  async run({ _id, data, name, price, categoryId, photoId, newPhotoId }) {
    if (Meteor.isServer) {
      console.log(_id);
      return await Products.updateAsync(
        { _id: _id },
        {
          $set: {
            data: data,
            name: name,
            price: price,
            categoryId: categoryId,
            photoId: photoId,
            // newPhotoId: newPhotoId,
            create_date: new Date(),
          },
        }
      );
    }
  },
});

Meteor.methods({
  async productJoinCategory() {
    const productData = await Products.rawCollection()
      .aggregate([
        {
          $lookup: {
            from: "category",
            localField: "categoryId",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },

        {
          $unwind: "$categoryDetails",
        },

        {
          $group: {
            _id: "$categoryDetails.name",
            totalProducts: { $sum: 1 },
            products: {
              $push: {
                _id: "$_id",
                data: "$data",
                name: "$name",
                price: "$price",
                create_date: "$create_date",
                photoId: "$photoId",
                newPhotoId: "$newPhotoId",
              },
            },
          },
        },
        {
          $project: {
            categoryName: "$_id",
            totalProducts: 1,
            products: 1,
          },
        },
      ])
      .toArray();

    const url = Meteor.absoluteUrl();

    for (let it of productData) {
      for (let item of it.products) {
        if (item.photoId) {
          const fileRef = await Files.collection.findOneAsync({
            _id: item.photoId,
          });

          item.url = Files.link(fileRef, "original", url);
        } else if (item.newPhotoId) {
          const fileRef = await Files.collection.findOneAsync({
            _id: item.newPhotoId,
          });
          item.url = Files.link(fileRef, "original", url);
        }
      }
    }

    return productData;
  },
});
