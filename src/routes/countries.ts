import express from 'express';
import controller from '../controllers/countries';

const router = express.Router();

router.post('/create/country', controller.createCountry);
router.get('/get/countries/:page', controller.getAllCountries);
router.get('/get/countryInfo/:name/:lang', controller.getCountryInfo);

export = router;
