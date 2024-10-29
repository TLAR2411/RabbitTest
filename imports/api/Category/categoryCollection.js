import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";

export const Categorys = new Mongo.Collection("category");

const Schemas = {};

Schemas.Category = new SimpleSchema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

Categorys.attachSchema?.(Schemas.Category);
