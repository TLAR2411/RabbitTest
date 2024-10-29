import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
// import { createBlock } from "vue";

export const Products = new Mongo.Collection("products");

const Schemas = {};

Schemas.Product = new SimpleSchema({
  data: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  categoryId: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    required: true,
  },
  photoId: {
    type: String,
    optional: true,
  },
});
Products.attachSchema?.(Schemas.Product);
