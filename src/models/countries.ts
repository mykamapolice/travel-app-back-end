import mongoose, { Schema } from 'mongoose';
import ICountry from '../interfaces/countries';

const CountrySchema = new Schema(
  {
    nameEN: { type: String, required: true },
    nameRU: { type: String, required: true },
    nameBE: { type: String, required: true },
    capital: {
      en: { type: String, required: true },
      ru: { type: String, required: true },
      be: { type: String, required: true },
    },
    photo: { type: String, required: true },

    details: {
      info: { type: Object, required: true },
      views: { type: Array, required: true },
      videoURL: { type: String, required: false },

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

CountrySchema.post<ICountry>('save', function () {
  this.extraInformation = 'This is some extra info';
});

export default mongoose.model<ICountry>('Country', CountrySchema);
