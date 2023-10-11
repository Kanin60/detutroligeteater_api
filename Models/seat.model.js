import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Stage from './stage.model.js'

// Skriver ny klasse og udvider den med SQ's Model klasse
class Seat extends Model {}

// Initialiserer model
Seat.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	stage_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Stage,
			key: 'id'
		}
	},
	number: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'seat', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
	timestamps: false
	//freezeTableName: false, // Lås tabelnavne til ental
	//createdAt: true, // Undlad createdAt felt
	//updatedAt: true //Undlad updatedAt felt
})

export default Seat