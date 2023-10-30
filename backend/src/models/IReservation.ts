interface IReservation {
  id: string
  start: Date
  end: Date
  carId: string
  locationId: string
  userId: string
}

export default IReservation
