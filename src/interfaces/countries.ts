import { Document } from 'mongoose';

type Coords = {
  latitude: number;
  longitude: number;
};

type Raiting = {
  name: string;
  rating: number;
};

type View = {
  imgURL: string;
  viewName: string;
  about: string;
  averageRating: number;
  usersRating: Raiting[];
};

interface Location {
  center: Coords;
  capital: Coords;
}

interface Details {
  info: string[];
  videoURL: string;
  views: View[];
  mapCoords: Location;
}

export default interface Country extends Document {
  name: string;
  capital: string;
  photo: string;
  details: Details;
  extraInformation: string;
}
