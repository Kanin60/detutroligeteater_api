import Seat from '../Models/seat.model.js'
import Stage from '../Models/stage.model.js';

// Relation - one to many
Stage.hasMany(Seat)
Seat.belongsTo(Stage)

class SeatController {

	/**
	 * List Metode - henter alle records
	 * @param {object} req 
	 * @param {object} res 
	 * @return {array} Returnerer JSON array
	 */
	list = async (req, res) => {

		try {
			const result = await Seat.findAll({
				attributes: ['id', 'number'],
				include: {
					model: Stage
				}
			})
			// Parser resultat som json
			res.json(result)				
		} catch (error) {
			res.status(418).send({
				message: `Something went wrong: ${error}`
			})						
		}
	}	
}

export default SeatController