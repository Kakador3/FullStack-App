import React, { useContext, useState } from 'react'
import { registration, login } from '../http/userAPI'
import { Button, Card, Col, Container, Form } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './../utils/consts'
import { observer } from 'mobx-react-lite'
import { Context } from '../index.js'

const Auth = observer(() => {
  const { user } = useContext(Context)
  const navigate = useNavigate()

  //Получаем текующую страницу
  const location = useLocation()
  //Переменная для перехода на страницу логина/регистрации
  const isLogin = location.pathname === LOGIN_ROUTE

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //Обработка входа и регистрации
  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }

      user.setUser(data)
      user.setIsAuth(true)
      navigate(SHOP_ROUTE)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className='p-5'>
        <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            className='mt-3'
            placeholder='Введите ваш email...'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <Form.Control
            className='mt-3'
            placeholder='Введите ваш пароль...'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type='password'
          />

          <Col className='d-flex justify-content-between mt-3'>
            {isLogin ? (
              <span>
                Нет аккаунта ?{' '}
                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
              </span>
            ) : (
              <span>
                Есть аккаунт ? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
              </span>
            )}

            <Button onClick={click} variant={'outline-success'}>
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </Col>
        </Form>
      </Card>
    </Container>
  )
})

export default Auth
