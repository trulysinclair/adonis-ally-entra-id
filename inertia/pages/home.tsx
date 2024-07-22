import type User from '#models/user'
import { Head } from '@inertiajs/react'

export default function Home(props: { version: number; user?: User }) {
  return (
    <>
      <Head title="Homepage" />
      <div className="container">
        <div className="title">AdonisJS {props.version} x Inertia x React</div>
        {props.user && <div>{props.user.name}</div>}
        <span>
          Learn more about AdonisJS and Inertia.js by visiting the{' '}
          <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
        </span>
      </div>
    </>
  )
}
