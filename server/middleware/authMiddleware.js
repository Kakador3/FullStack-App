import jwt from 'jsonwebtoken'

export default function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    //получаем токен из хедера
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' })
    }
    //Проверка валидности токена
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Не авторизован' })
  }
}