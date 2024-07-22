/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/login', async ({ ally }) => {
  return ally.use('entra').redirect()
})

router.get('/entra/callback', async ({ ally }) => {
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

  return user
})
