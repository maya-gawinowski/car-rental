import { cars } from '../../data/cars'
import { Aarhus, Copenhagen, Odense, Roskilde } from '../../data/locations'
import ICar from '../models/ICar'
import ILocation from '../models/ILocation'
import IReservation from '../models/IReservation'
import IUser from '../models/IUser'

class Database {
  public static readonly instance: Database = new Database()
  private readonly content: IDatabaseContent

  private constructor() {
    this.content = {
      cars,
      reservations: [],
      locations: [Odense, Aarhus, Copenhagen, Roskilde],
      users: [],
    }
  }

  public createNew<Instance extends keyof IDatabaseContent>(
    instance: Instance,
    data: NewDatabaseEntity<Instance>
  ) {
    const id = this.content[instance].length.toString()
    const newEntity = {
      ...data,
      id,
    } as SingleDatabaseEntity<Instance>
    this.content[instance].push(newEntity as any)
    return newEntity
  }

  public getByAttribute<Instance extends keyof IDatabaseContent>(
    instance: Instance,
    filter: EntityFilter<Instance>
  ): SingleDatabaseEntity<Instance> | null {
    return (this.content[instance] as DatabaseEntityArray<Instance>).find(
      (item) => this.getKeys(filter).every((key) => item[key] === filter[key])
    ) as SingleDatabaseEntity<Instance> | null
  }

  public getAll<Instance extends keyof IDatabaseContent>(
    instance: Instance,
    filter: EntityFilter<Instance>
  ): SingleDatabaseEntity<Instance>[] {
    console.log('filter', filter)
    console.log('this.content[instance]', this.content[instance])
    return (this.content[instance] as DatabaseEntityArray<Instance>).filter(
      (item) =>
        this.getKeys(filter).every(
          (key) => item[key].toString() === filter[key]?.toString()
        )
    ) as SingleDatabaseEntity<Instance>[]
  }

  public findAndUpdate<Instance extends keyof IDatabaseContent>(
    instance: Instance,
    filter: EntityFilter<Instance>,
    changes: Partial<DatabaseEntityArray<Instance>[0]>
  ) {
    const entity = this.getByAttribute(instance, filter)
    if (entity) {
      return Object.assign(entity, changes)
    }
    return null
  }

  public findAndDelete<Instance extends keyof IDatabaseContent>(
    instance: Instance,
    filter: EntityFilter<Instance>
  ) {
    const entity = this.getByAttribute(instance, filter)
    if (entity) {
      const index = this.content[instance].indexOf(entity as any)
      this.content[instance].splice(index, 1)
      return entity
    }
    return null
  }

  private getKeys<Instance extends SingleDatabaseEntity>(
    object: Partial<Instance>
  ) {
    return Object.keys(object) as (keyof SingleDatabaseEntity)[]
  }
}

export interface IDatabaseContent {
  cars: ICar[]
  reservations: IReservation[]
  locations: ILocation[]
  users: IUser[]
}

export type DatabaseEntityArray<T extends keyof IDatabaseContent> =
  IDatabaseContent[T]
export type EntityFilter<T extends keyof IDatabaseContent> = Partial<
  IDatabaseContent[T][0]
>

type SingleDatabaseEntity<
  T extends keyof IDatabaseContent | undefined = undefined
> = T extends keyof IDatabaseContent
  ? IDatabaseContent[T][0]
  : IDatabaseContent[keyof IDatabaseContent][0]

export type NewDatabaseEntity<T extends keyof IDatabaseContent> = Omit<
  SingleDatabaseEntity<T>,
  'id'
>

export default Database
