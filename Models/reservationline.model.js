import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Reservation from './reservation.model.js'

// Skriver ny klasse og udvider den med SQ's Model klasse
class ReservationLine extends Model {}

// Initialiserer model
ReservationLine.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	reservation_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Reservation,
			key: 'id'
		}
	},
	seat_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'reservation_line', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
	//freezeTableName: false, // Lås tabelnavne til ental
	//createdAt: true, // Undlad createdAt felt
	//updatedAt: true //Undlad updatedAt felt
})

export default ReservationLine