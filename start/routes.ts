/*
 |--------------------------------------------------------------------------
 | Routes file
 |--------------------------------------------------------------------------
 |
 | The routes file is used for defining the HTTP routes.
 |
 */

import User from '#models/user'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return 'Hello, world!'
})

router
  .group(() => {
    router.get('/admin', async ({ auth }) => {
      return auth.user
    })
  })
  .use(middleware.auth())

router
  .get('/login', async ({ ally }) => {
    return ally.use('entra').redirect()
  })
  .use(middleware.guest())

router.get('/logout', async ({ auth, response }) => {
  await auth.use('web').logout()
  return response.redirect('/')
})

router.get('/entra/callback', async ({ ally, auth, response }) => {
  const entra = ally.use('entra')

  /**
   * User has denied access by canceling
   * the login flow
   */
  if (entra.accessDenied()) {
    return 'You have cancelled the login process or did not grant access to your profile'
  }

  /**
   * Microsoft responded with some error
   */
  if (entra.hasError()) {
    return entra.getError()
  }

  const user = await entra.user()

  if (user) {
    const usr = await User.firstOrCreate(
      {
        email: user.email!,
      },
      {
        entraId: user.id,
        name: user.name,
        email: user.email!,
        nickName: user.nickName,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        jobTitle: user.original?.jobTitle,
      }
    )
    await auth.use('web').login(usr)

    response.redirect('/')
  }
})
