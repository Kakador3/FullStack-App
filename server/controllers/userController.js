import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import models from '../models/models.js'
import jwt from 'jsonwebtoken'

const generateJwt = (id, email, role) => {
  return jwt.sign({ id: id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  })
}

class UserController {
  async registration(req, res, next) {
    try {
      const { User, Basket } = models
      const { email, password, role } = req.body

      if (!email || !password) {
        return next(ApiError.badRequest('Некорректный email или password'))
      }

      //Ищем пользователя с таким email в БД
      const candidate = await User.findOne({ where: { email } })
      if (candidate) {
        return next(
          ApiError.badRequest('Пользователь с таким email уже существует')
        )
      }

      //Хешируем пароль и создаем пользователя в бд
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({
        email,
        role,
        password: hashPassword,
      })

      //Добавляем пользователю его корзину
      const basket = await Basket.create({ userId: user.id })

      //JWT токен
      const token = generateJwt(user.id, user.email, user.role)

      return res.json({ token })
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async login(req, res, next) {
    try {
      const { User } = models
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })

      if (!user) {
        return next(ApiError.internal('Пользователь не найден'))
      }

      //Проверка введеного пароля и зашифрованного пароля из БД
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return next(ApiError.internal('Указан неверный пароль'))
      }
      const token = generateJwt(user.id, user.email, user.role)
      return res.json({ token })
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role)
      return res.json({ token })
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

export default new UserController()
