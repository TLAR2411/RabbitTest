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

Meteor.methods({
  productJoinCategory() {
    return Products.rawCollection()
      .aggregate([
        {
          $lookup: {
            from: "category",
            localField: "categoryId",
            foreignField: "_id",
            as: "categoryDetails",
          },
          $lookup: {
            from: "app_files",
            localField: "photoId",
            foreignField: "_id",
            as: "photoDetails",
          },
        },

        {
          $unwind: "$categoryDetails",
        },
        {
          $unwind: "$photoDetails",
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
                photoId: "$photoDetails",
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
  },
});
