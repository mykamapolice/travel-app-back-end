import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Country from '../models/countries';

const createCountry = (req: Request, res: Response, next: NextFunction) => {
  let { name, capital, details, photo } = req.body;

  const country = new Country({
    _id: new mongoose.Types.ObjectId(),
    name,
    capital,
    details,
    photo,
  });

  return country
    .save()
    .then((result) =>
      res.status(201).json({
        country: result,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: error.message,
        error,
      })
    );
};

const getAllCountries = (req: Request, res: Response, next: NextFunction) => {
  const { fields } = req.body;

  Country.find()
    // поля которые необходимо загрузить
    // если первый запуск - "name"
    // иначе "name capital photo"
    .select(fields)
    .exec()
    .then((results) =>
      res.status(200).json({
        countries: results,
        count: results.length,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: error.message,
        error,
      })
    );
};

const getCountryInfo = (req: Request, res: Response, next: NextFunction) => {
  Country.find({ name: req.body.name })
    .select('details')
    .exec()
    .then((results) =>
      res.status(200).json({
        countryInfo: results,
        count: results.length,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: error.message,
        error,
      })
    );
};

export default { createCountry, getAllCountries, getCountryInfo };
