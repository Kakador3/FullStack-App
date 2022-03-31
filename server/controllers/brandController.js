import models from '../models/models.js'
import ApiError from '../error/ApiError.js'

class BrandController {
  async create(req, res, next) {
    try {
      const { Brand } = models
      const { name } = req.body
      const brand = await Brand.create({ name })
      return res.json(brand)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const { Brand } = models
      const brands = await Brand.findAll()
      return res.json(brands)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { Brand } = models
      const { id } = req.query
      const type = await Brand.destroy({ where: { id } })

      if (!type) {
        return next(ApiError.badRequest('Бренд с таким id не найден'))
      }
      return res.json({ message: 'Удаление бренда прошло успешно' })
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

export default new BrandController()
