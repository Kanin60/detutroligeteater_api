import Genre from '../Models/genre.model.js'

class GenreController {

	/**
	 * List Metode - henter alle records
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	list = async (req, res) => {
		try {
			const result = await Genre.findAll({
				attributes: ['id', 'name'],
			})
			// Parser resultat som json
			res.json(result)				
		} catch (error) {
			res.status(418).send({
				message: `Something went wrong: ${error}`
			})			
		}
	}

	/**
	 * GET Metode henter record ud fra id
	 * @param {object} req 
	 * @param {object} res 
	 * @return {object} Returnerer JSON object med detaljer
	 */
	get = async (req, res) => {
		const { id } = req.params.id

		if(id) {
			try {
				const result = await Genre.findOne({
					attributes: ['id', 'name'],
					where: { id: id}
				});
				res.json(result)				
			} catch (error) {
				res.status(418).send({
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
	 * Create Metode - opretter ny record
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {number} Returnerer nyt id
	 */
	 create = async (req, res) => {
		const { name } = req.body

		if(name) {
			try {
				const model = await Genre.create(req.body)
				return res.json({
					message: `Record created`,
					newId: model.id
				})					
			} catch (error) {
				res.status(418).send({
					message: `Could not create record: ${error}`
				})					
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}	

	/**
	 * Update Metode - opdaterer record
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {boolean} Returnerer true/false
	 */	
	 update = async (req, res) => {
		const { name } = req.body

		if(name) {
			try {
				const model = await Genre.update(req.body, {
					where: {id: req.params.id}
				})
				return res.json({
					message: `Record updated`
				})					
			} catch (error) {
				res.status(418).send({
					message: `Could not update record: ${error}`
				})									
			}
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}

	/**
	 * Delete Metode - sletter record
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {boolean} Returnerer true/false
	 */	
	remove = async (req, res) => {
		const { id } = req.params

		if(id) {
			try {
				await Genre.destroy({ 
					where: { id: id }
				})
				res.sendStatus(200)
			}
			catch(error) {
				res.status(418).send({
					message: `Could not delete record: ${error}`
				})									
			}	
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}	
}

export default GenreController