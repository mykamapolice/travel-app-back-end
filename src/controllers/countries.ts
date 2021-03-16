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
  const page: number | 0 = Number(req.params.page) || 0;
  const count: number = 8;

  Country.find()
    .skip(page * count)
    .limit(count)
    .select('nameEN nameRU nameBE capital photo')
    .exec()
    .then((results) =>
      res.status(200).json({
        count: results.length,
        countries: results,
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
  const { name } = req.params;

  Country.find({ $or: [{ nameEN: name }, { nameRU: name }, { nameBE: name }] })
    .select('details')
    .exec()
    .then((results) => {
      const { details } = results[0];

      return res.status(200).json({
        details,
      });
    })
    .catch((error) =>
      res.status(500).json({
        message: error.message,
        error,
      })
    );
};

export default { createCountry, getAllCountries, getCountryInfo };
