import { Document } from 'mongoose';
interface ILocalization {
  en: string;
  ru: string;
  be: string;
}

type ICoords = {
  latitude: number;
  longitude: number;
};

type IRaiting = {
  name: string;
  rating: number;
};

type IView = {
  imgURL: string;
  viewName: ILocalization;
  about: ILocalization;
  averageRating: number;
  usersRating: IRaiting[];
};

interface ILocation {
  center: ICoords;
  capital: ICoords;
}

interface IDetails {
  info: ILocalization;
  videoURL: string;
  views: IView[];
  mapCoords: ILocation;
}

export default interface ICountry extends Document {
  nameEN: string;
  nameRU: string;
  nameBE: string;
  capital: ILocalization;
  photo: string;
  details: IDetails;
  extraInformation: string;
}
