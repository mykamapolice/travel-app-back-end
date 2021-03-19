import express from 'express';
import controller from '../controllers/countries';

const router = express.Router();

// router.post('/update/view', controller.updateView);
router.post('/create/country', controller.createCountry);
router.get('/get/countries/:page', controller.getAllCountries);
router.get('/get/countryInfo/:name', controller.getCountryInfo);

export = router;
