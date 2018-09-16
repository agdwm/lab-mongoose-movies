"use strict";
const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

router.get('/', (req, res, next) => {
	Celebrity.find()
		.then(celebrities => {
			res.render('celebrities/index', {celebrities, title: 'Celebrities'});
		})
		.catch( e => {
			console.log('Error on retrieving the list of celebrities', e);
			next(e);
		})
});

//(C)RUD -> Show
router.get('/new', (req, res, next) => {
	res.render('celebrities/new', {title: 'Create a new celebrity'});
});

router.post('/', (req, res, next) => {
	const { name, occupation, catchPhrase } = req.body;
	const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
	newCelebrity.save()
		.then( celebrity => {
			res.redirect('/celebrities');
		})
		.catch( e => {
			console.log('Error on creating a new celebrity', e);
			res.render('celebrities/new', {title: 'Create a new celebrity'});
		})
});


router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	Celebrity.findById({_id:id})
	.then(celebrity => {
		console.log(celebrity);
		res.render('celebrities/show', {celebrity, title: 'Celebrity Detail'});
	})
	.catch(e => {
		console.log('Error on retrieving the detail of the celebrity', e);
		next(e);
	})
});



module.exports = router;