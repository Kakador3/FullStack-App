import jwt_decode from 'jwt-decode'

export default function getRole(isAuth) {
  if (isAuth) {
    // @ts-ignore
    const { role } = jwt_decode(localStorage.getItem('token'))
    return role
  }
}
