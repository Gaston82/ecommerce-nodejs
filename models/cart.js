const { Schema, model } = require("mongoose");

const CartSchema = Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      amount: Number,
    },
  ],
});

CartSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

module.exports = model("Cart", CartSchema);
