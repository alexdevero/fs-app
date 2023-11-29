import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'

@Entity()
export class User {
  @PrimaryKey()
  id: string = v4()

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt = new Date()

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date()

  @Property({ unique: true })
  email!: string

  @Property()
  password!: string

  @Property()
  name!: string
}
