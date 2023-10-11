import { Sequelize } from 'sequelize'
import Event from '../Models/event.model.js'
import GenreModel from '../Models/genre.model.js';
import Actor from '../Models/actor.model.js';
import StageModel from '../Models/stage.model.js';
import { QueryParamsHandle } from '../Middleware/helpers.js';
import Stage from '../Models/stage.model.js';
import Genre from '../Models/genre.model.js';

// Kalder sq Operator til search clause
const Op = Sequelize.Op;

// Sætter modellers relationelle forhold - een til mange
Genre.hasMany(Event)
Event.belongsTo(Genre)

// Sætter modellers relationelle forhold - een til mange
Stage.hasMany(Event)
Event.belongsTo(Stage)

// Sætter modellers relationelle forhold - mange til mange
Actor.belongsToMany(Event, { through: 'event_actor_rel' })
Event.belongsToMany(Actor, { through: 'event_actor_rel' })

class EventController {

	/**
	 * List Metode - henter alle records
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	list = async (req, res) => {
		const qp = QueryParamsHandle(req, 'id, title')

		try {
			// Kalder SQ model
			const result = await Event.findAll({
				order: [qp.sort_key],
				limit: qp.limit,
				attributes: qp.attributes,
				include: [{
					model: Genre,
					attributes: ['id', 'name']
				},
				{
					model: Stage,
					attributes: ['id', 'name']
				}]
			})
			// Parser resultat som json
			res.json(result)
		} catch(err) {
			res.status(418).send({
				message: `Something went wrong: ${err}`
			})
		}
	}

	/**
	 * Search Metode - henter alle records ud fra en funden søgestrengf 
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	 search = async(req, res) => {
		const { keyword } = req.params

		if(keyword) {
			try {
				// Sætter resultat med sq metode
				const result = await Event.findAll({
					// where clause
					where: {
						[Op.or]: [
						// Søg på titel
						{
							title: {
								[Op.like]: `%${req.params.keyword}%`
							}
						},
						{
							description: {
								[Op.like]: `%${req.params.keyword}%`
							} 
	
						}]
					},
					// Attributter: array med felter
					attributes: ['id', 'title', 'image', 'startdate', 'stopdate'],
					// Inkluderer relationelle data fra artist via id
					include: [{
						model: Genre,
						attributes: ['id', 'name']
					},
					{
						model: Stage,
						attributes: ['id', 'name']
					}]
				})
				// Parser result som json
				res.json(result)
			} catch (err) {
				res.status(403).send({
					message: `Something went wrong: ${err}`
				})					
			}			
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}


	/**
	 * GET Metode henter record ud fra id
	 * @param {object} req 
	 * @param {object} res 
	 * @return {object} Returnerer JSON object med detaljer
	 */
	details = async (req, res) => {
		const { id } = req.params

		if(id) {
			// Sætter resultat efter sq metode
			try {
				const result = await Event.findOne({
					attributes: [
						'id', 'title', 'description', 'image', 'startdate', 'stopdate', 'duration_minutes',
						'price', 'created_at'
					],
					include: [{
						model: Genre,
						attributes: ['id', 'name']
					}, {
						model: Stage,
						attributes: ['id', 'name']
					}, {
						model: Actor,
						attributes: ['id', 'name', 'description', 'image']
					}],
					// Where clause
					where: { id: req.params.id}
				});
				// Parser resultat som json
				res.json(result)
					
			} catch (error) {
				res.status(403).send({
					message: `Something went wrong: ${error}`
				})					
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}


	/**
	 * Create Metode - opretter nyt event
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {number} Returnerer nyt id
	 */
	 create = async (req, res) => {
		const { 
				title, description, image, startdate, stopdate, duration_minutes, 
				price, genre_id, stage_id } = req.body

		if(title && description && image && startdate && stopdate && genre_id && stage_id) {
			try {
				const model = await Event.create(req.body)
				return res.json({
					message: `Record created`,
					newId: model.id
				})					
			} catch (error) {
				res.status(403).send({
					message: `Could not create record: ${err}`
				})									
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}

	/**
	 * Update Metode - opdaterer event
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */	
	 update = async (req, res) => {
		const { id } = req.params
		const { title, description, image, startdate, stopdate, duration_minutes, 
			price, genre_id, stage_id } = req.body

		if(id && title && description && image && startdate && stopdate) {
			try {
				const model = await Event.update(req.body, {
					where: {id: id}
				})
				return res.json({
					message: `Record updated`
				})					
			} catch (error) {
				res.status(403).send({
					message: `Could not update record: ${err}`
				})					
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}

	/**
	 * Delete Metode - sletter bruger ud fra id i url parameter
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */	
	remove = async (req, res) => {
		const { id } = req.params.id

		if(id) {
			try {
				await Event.destroy({ 
					where: { id: id }
				})
				res.sendStatus(200)
			}
			catch(err) {
				res.status(418).send({
					message: `Could not delete record: ${err}`
				})
			}	
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}	
}

export default EventController