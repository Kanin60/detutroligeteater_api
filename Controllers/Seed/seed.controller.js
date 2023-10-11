import fs from 'fs'
import csv from 'csv-parser'
import path from 'path';
import sequelize from '../../Config/sequelize.config.js';

import Orgs from '../../Models/System/org.model.js';
import Groups from '../../Models/System/group.model.js';
import Users from '../../Models/System/user.model.js';
import UserGroupRel from '../../Models/System/user-group-rel.model.js';

import Stage from '../../Models/stage.model.js';
import Genre from '../../Models/genre.model.js';
import Actor from '../../Models/actor.model.js';
import Event from '../../Models/event.model.js';
import EventActorRel from '../../Models/event-actor-rel.model.js';
import Seat from '../../Models/seat.model.js';
import Favorite from '../../Models/favorite.model.js';
import Review from '../../Models/review.model.js';
import Reservation from '../../Models/reservation.model.js';
import ReservationLine from '../../Models/reservationline.model.js'

/**
 * Controller for Seed Actions
 */
class SeedController {
	constructor() {
		console.log('Class Seed Controller: Running seeds');
	} 

	seed_from_csv = async () => {

		const transaction = await sequelize.transaction();
	
		try {

			// Orgs
			const orgData = await this.get_csv_data('org.csv')
			const insertedOrgs = await Orgs.bulkCreate(orgData, { transaction });

			// Groups
			const groupData = await this.get_csv_data('group.csv')
			const insertedGroups = await Groups.bulkCreate(groupData, { transaction });

			// User
			const userData = await this.get_csv_data('user.csv')
			const insertedUser = await Users.bulkCreate(userData, { transaction });

			// Genre
			const genreData = await this.get_csv_data('genre.csv')
			const insertedGenre = await Genre.bulkCreate(genreData, { transaction });

			// Stages
			const stageData = await this.get_csv_data('stage.csv')
			const insertedStage = await Stage.bulkCreate(stageData, { transaction });

			// Seats
			const seatsData = await this.get_csv_data('seat.csv')
			const insertedSeats = await Seat.bulkCreate(seatsData, { transaction });

			// Events
			const eventsData = await this.get_csv_data('event.csv')
			const insertedEvents = await Event.bulkCreate(eventsData, { transaction });

			// Actors
			const actorData = await this.get_csv_data('actor.csv')
			const insertedActors = await Actor.bulkCreate(actorData, { transaction });

			// Reviews
			const reviewData = await this.get_csv_data('review.csv')
			const insertedReviews = await Review.bulkCreate(reviewData, { transaction });

			// Reservation
			const reservationData = await this.get_csv_data('reservation.csv')
			const insertedReservation = await Reservation.bulkCreate(reservationData, { transaction });

			// User Groups Relations
			const userGroupData = await this.get_csv_data('user-group-rel.csv')
			const insertedUserGroup = await UserGroupRel.bulkCreate(userGroupData, { transaction });

			// ReservationLine
			const reservationLineData = await this.get_csv_data('reservation-line.csv')
			const insertedLines = await ReservationLine.bulkCreate(reservationLineData, { transaction });
			
			// Actors Events Relations
			const eventActorData = await this.get_csv_data('event-actor-rel.csv')
			const insertedEventActors = await EventActorRel.bulkCreate(eventActorData, { transaction });

			// Favorite Relations
			const favoriteData = await this.get_csv_data('favorite.csv')
			const insertedFavorite = await Favorite.bulkCreate(favoriteData, { transaction });

			// Confirm transaction
			await transaction.commit();
		
			console.log('Seeding completed');
		} catch (error) {
			// Hvis der opstår en fejl, rul tilbage transaktionen
			await transaction.rollback();
			console.error('Seeding error:', error);
		}		
	}

	get_csv_data = async file => {
		const csvpath = path.resolve(`./Data/${file}`);
		const data = []

		return new Promise((resolve, reject) => {
			fs.createReadStream(csvpath)
			.pipe(csv())
			.on('data', row => {
				data.push(row)
			})
			.on('end', async () => {
				resolve(data);
			})
			.on('error', error => {
				reject(error)
			})
		}) 

	}
}

export default SeedController