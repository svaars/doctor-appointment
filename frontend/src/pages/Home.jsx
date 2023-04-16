import { Button } from 'antd'
import React from 'react'

export default function Home() {
  return (
    <section id='home'>
        <div id="account">
            <Button href='/login' block>Login</Button>
            <Button href='/signup' block>Signup</Button>
        </div>
    </section>
  )
}
