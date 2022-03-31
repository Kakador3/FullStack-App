import { Context } from '../index'
import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from './../routes'
import { observer } from 'mobx-react-lite'

const AppRouter = observer(() => {
  const { user } = useContext(Context)

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}

      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  )
})

export default AppRouter
