import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

// Skriver ny klasse og udvider den med SQ's Model klasse
class Event extends Model {}

// Initialiserer model
Event.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
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
	},
	startdate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	stopdate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	duration_minutes: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	price: {
		type: DataTypes.DOUBLE,
		allowNull: false,
		defaultValue: 0
	},
	genre_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	stage_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'event', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
	//freezeTableName: false, // Lås tabelnavne til ental
	//createdAt: true, // Undlad createdAt felt
	//updatedAt: true //Undlad updatedAt felt
})

export default Event