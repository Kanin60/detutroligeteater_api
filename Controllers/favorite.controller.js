import Favorite from '../Models/favorite.model.js'
import { getUserFromToken } from '../Middleware/auth.js'

class FavoriteController {

	/**
	 * List Metode - henter alle records
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	list = async (req, res) => {
		const result = await Favorite.findAll({
			attributes: ['user_id', 'event_id'],
		})
		// Parser resultat som json
		res.json(result)
	}

	/**
	 * Create Metode - opretter ny record
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {number} Returnerer nyt id
	 */
	 create = async (req, res) => {
		const user_id = await getUserFromToken(req, res)
		const { event_id } = req.body

		if (event_id && user_id) {
			try {				
				const model = await Favorite.create({ user_id: user_id, event_id: event_id })
				res.status(201).send({ 
					message: `Favorite created` 
				})
			} catch (err) {
				if(err.name === 'SequelizeUniqueConstraintError') {
					res.status(200).send({ 
						message: `Creation Error: User favorite exists` 
					})
				} else {
					res.status(401).send({ 
						message: `Creation Error: ${err}`
					})
				}
			}
		} else {
			res.status(401).send({ 
				message: 'Wrong parameter values'
			});
		}
	}	

	/**
	 * Delete Metode - sletter record
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {boolean} Returnerer true/false
	 */	
	remove = async (req, res) => {
		const user_id = await getUserFromToken(req, res)
		const { event_id } = req.params

		if(event_id && user_id) {
			try {
				const model = await Favorite.destroy({ 
					where: { user_id: user_id, event_id: event_id }
				})
				res.status(201).send({ message: 'Favorite deleted' })
			} catch(err) {
				console.log(err);
				res.status(200).send({ 
					message: 'Could not delete record'
				})
			}		
		} else {
			res.status(401).send({ 
				message: 'Wrong parameter values'
			});
		}
	}	
}

export default FavoriteController