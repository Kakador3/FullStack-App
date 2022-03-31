import models from '../models/models.js'
import ApiError from '../error/ApiError.js'

class TypeController {
  async create(req, res, next) {
    try {
      const { Type } = models
      const { name } = req.body
      const type = await Type.create({ name })
      return res.json(type)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const { Type } = models
      const types = await Type.findAll()
      return res.json(types)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { Type } = models
      const { id } = req.query
      const type = await Type.destroy({ where: { id } })

      if (!type) {
        return next(ApiError.badRequest('Тип с таким id не найден'))
      }
      return res.json({ message: 'Удаление типа прошло успешно' })
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

export default new TypeController()
