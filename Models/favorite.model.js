import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

// Skriver ny klasse og udvider den med SQ's Model klasse
class Favorite extends Model {}

// Initialiserer model
Favorite.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},	
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	event_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	}
}, {
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'event_id'], // Unik kombination af disse to felter
        }
    ],	
	sequelize, // Sequelize objekt
	modelName: 'favorite', // Model (tabel) navn
	underscored: true, // Brug underscore istedet for camelcase
	timestamps: false
	//freezeTableName: false, // Lås tabelnavne til ental
	//createdAt: true, // Undlad createdAt felt
	//updatedAt: true //Undlad updatedAt felt
})

export default Favorite