import express from 'express'
const AppRouter = express.Router()
import ActorController from '../Controllers/actor.controller.js'
import EventController from '../Controllers/event.controller.js'
import SeatController from '../Controllers/seat.controller.js'
import ReservationController from '../Controllers/reservation.controller.js'
import ReviewsController from '../Controllers/review.controller.js'
import FavoriteController from '../Controllers/favorite.controller.js'
import { Authorize } from '../Middleware/auth.js'

// Event Routes
const eventcontrol = new EventController
AppRouter.get('/events', (req, res) => { eventcontrol.list(req, res) })
AppRouter.get('/events/search/:keyword([0-9a-zA-Z]*)', (req, res) => { eventcontrol.search(req, res) })
AppRouter.get('/events/:id([0-9]*)', (req, res) => { eventcontrol.details(req, res) })
AppRouter.post('/events', (req, res) => { eventcontrol.create(req, res) })
AppRouter.put('/events/:id([0-9]*)', (req, res) => { eventcontrol.update(req, res) })
AppRouter.delete('/events/:id([0-9]*)', (req, res) => { eventcontrol.remove(req, res) })

// Actor Routes
const actorcontrol = new ActorController
AppRouter.get('/actors', (req, res) => { actorcontrol.list(req, res) })
AppRouter.get('/actors/:id([0-9]*)', (req, res) => { actorcontrol.details(req, res) })
AppRouter.post('/actors', (req, res) => { actorcontrol.create(req, res) })
AppRouter.put('/actors/:id([0-9]*)', (req, res) => { actorcontrol.update(req, res) })
AppRouter.delete('/actors/:id([0-9]*)', (req, res) => { actorcontrol.remove(req, res) })

// Seat Routes
const seatcontrol = new SeatController
AppRouter.get('/seats/:event_id([0-9]*)', (req, res) => { seatcontrol.list(req, res) })

// Reservation Routes
const reservationcontrol = new ReservationController
AppRouter.get('/reservations', (req, res) => { reservationcontrol.list(req, res) })
AppRouter.get('/reservations/:id([0-9]*)', (req, res) => { reservationcontrol.details(req, res) })
AppRouter.post('/reservations', Authorize, (req, res) => { reservationcontrol.create(req, res) })
AppRouter.delete('/reservations/:id([0-9]*)', Authorize, (req, res) => { reservationcontrol.remove(req, res) })

// Review Routes
const reviewcontrol = new ReviewsController
AppRouter.get('/reviews/:event_id([0-9]*)', (req, res) => { reviewcontrol.list(req, res) })
AppRouter.get('/reviews/details/:id([0-9]*)', (req, res) => { reviewcontrol.details(req, res) })
AppRouter.post('/reviews', Authorize, (req, res) => { reviewcontrol.create(req, res) })
AppRouter.put('/reviews', Authorize, (req, res) => { reviewcontrol.update(req, res) })
AppRouter.delete('/reviews/:id([0-9]*)', Authorize, (req, res) => { reviewcontrol.remove(req, res) })
	
// Favorite Routes
const favcontrol = new FavoriteController
AppRouter.get('/favorites', (req, res) => { favcontrol.list(req, res) })
AppRouter.post('/favorites', Authorize, (req, res) => { favcontrol.create(req, res) })
AppRouter.delete('/favorites/:event_id([0-9]*)', Authorize, (req, res) => { favcontrol.remove(req, res) })



export default AppRouter