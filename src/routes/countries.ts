import express from 'express';
import controller from '../controllers/countries';
import { Routes } from '../utils/routes';

const router = express.Router();

const { createCountry, getAllCountries, getCountryInfo } = controller;

router.post(Routes.createCountry, createCountry);
router.get(Routes.allCountries, getAllCountries);
router.get(Routes.countryDetails, getCountryInfo);

export = router;
