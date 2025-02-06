import { Schema, model } from "mongoose";

const propertySchema = new Schema({
    username: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: "user"
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    sell: [{ type: String }],
    fav: [{ type: String }],
    imageUrls: [String],
    location: {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true }
    },
    category:{type:String,required:true},
    phone:{type:Number,required:true},
    city: { type: String },
    area: { type: Number },
    rating: { type: Number },
    count: { type: Number },
});

propertySchema.index({ location: "2dsphere" });

const Property = model("Property", propertySchema);

export default Property;
