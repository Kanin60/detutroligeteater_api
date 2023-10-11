import ReservationLine from '../Models/reservationline.model.js'

class ReservationLineController {

	/**
	 * List Metode - henter alle records
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	list = async (req, res) => {
		try {
			const result = await ReservationLine.findAll({
				attributes: ['seat_id', 'order_id']
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
		const { id } = req.params

		try {
			const result = await ReservationLine.findOne({
				attributes: ['id', 'seat_id', 'order_id'],
				where: { id: req.params.id}
			});
			res.json(result)				
		} catch (error) {
			res.status(418).send({
				message: `Something went wrong: ${error}`
			})						
		}
	}

	/**
	 * Create Metode - opretter ny record
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {number} Returnerer nyt id
	 */
	 create = async (obj) => {
		const { seat_id, order_id } = obj

		if(seat_id && order_id) {
			try {
				const model = await ReservationLine.create(obj)
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
			res.status(418).send({
				message: `Something went wrong: ${error}`
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
				await ReservationLine.destroy({ 
					where: { id: id }
				})
				res.status(200).send({
					message: `Record deleted`
				})
			}
			catch(error) {
				res.status(418).send({
					message: `Could not delete record: ${error}`
				})
			}	
		} else {
			res.status(403).send({
				message: `Wrong parameter values`
			})
		}
	}	
}

export default ReservationLineController