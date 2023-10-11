import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

// Skriver ny klasse og udvider den med SQ's Model klasse
class Actor extends Model {}

// Initialiserer model
Actor.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'Ikke navngivet'
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	image: {
		type: DataTypes.TEXT,
		allowNull: true
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'actor', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
})

export default Actor