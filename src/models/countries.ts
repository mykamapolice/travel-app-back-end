import mongoose, { Schema } from 'mongoose';
import Icountry from '../interfaces/countries';

const CountrySchema = new Schema(
  {
    name: { type: String, required: true },
    capital: { type: String, required: true },
    photo: { type: String, required: true },

    details: {
      info: { type: Array, required: false },
      videoURL: { type: String, required: false },
      views: { type: Array, required: false },

      mapCoords: {
        center: {
          latitude: { type: Number, required: true },
          longitude: { type: Number, required: true },
        },
        capital: {
          latitude: { type: Number, required: true },
          longitude: { type: Number, required: true },
        },
      },
    },

    extraInformation: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

CountrySchema.post<Icountry>('save', function () {
  this.extraInformation = 'This is some extra info';
});

export default mongoose.model<Icountry>('Country', CountrySchema);
