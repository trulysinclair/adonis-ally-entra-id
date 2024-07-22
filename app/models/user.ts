import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

// const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
//   uids: ['email'],
//   passwordColumnName: 'password',
// })

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare entraId: string

  @column()
  declare name: string

  @column()
  declare email: string

  // @column({ serializeAs: null })
  // declare password: string

  @column()
  declare nickName: string

  @column()
  declare avatarUrl: string | null

  @column()
  declare displayName: string | null

  @column()
  declare jobTitle: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
