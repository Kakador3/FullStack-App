import React, { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { Context } from '../index'
import getRole from '../utils/getRole'

const NavBar = observer(() => {
  const { user, device } = useContext(Context)
  const navigate = useNavigate()

  //Запоминаем роль и меняем ее, если вышли/зашли в аккаунт
  const role = useMemo(() => getRole(user.isAuth), [user.isAuth])

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
    navigate(SHOP_ROUTE)
  }

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Button
          className='border-0 shadow-none'
          style={{
            color: 'white',
            fontSize: '20px',
            backgroundColor: 'transparent',
          }}
          variant={'outline-light'}
          onClick={() => {
            navigate(SHOP_ROUTE)
            device.setSelectedType({})
            device.setSelectedBrand({})
          }}
        >
          BuyDevice
        </Button>

        {user.isAuth ? (
          <Nav className='ms-auto' style={{ color: 'white' }}>
            {role === 'ADMIN' && (
              <Button
                style={{ marginRight: 10 }}
                variant={'outline-light'}
                onClick={() => {
                  navigate(ADMIN_ROUTE)
                  device.setSelectedType({})
                  device.setSelectedBrand({})
                }}
              >
                Админ панель
              </Button>
            )}

            <Button variant={'outline-light'} onClick={() => logOut()}>
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className='ml-auto' style={{ color: 'white' }}>
            <Button
              variant={'outline-light'}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
})

export default NavBar
