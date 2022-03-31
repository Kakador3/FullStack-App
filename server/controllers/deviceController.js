// @ts-nocheck
import * as uuid from 'uuid'
import path from 'path'
import fs from 'fs'
import models from '../models/models.js'
import ApiError from '../error/ApiError.js'

class DeviceController {
  async create(req, res, next) {
    try {
      const { Device, DeviceInfo } = models
      let { name, price, brandId, typeId, info } = req.body

      //Достаем картинку из запроса и перемещаем в папку static
      const { img } = req.files
      const fileName = uuid.v4() + '.jpg'
      const __dirname = path.resolve()
      img.mv(path.resolve(__dirname, 'static', fileName))

      //Создаем Device в БД
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      })

      //Проверяем есть ли информация, парсим ее и в массиве добавляем в базу данных
      if (info) {
        info = JSON.parse(info)
        info.forEach((infoElement) =>
          DeviceInfo.create({
            title: infoElement.title,
            description: infoElement.description,
            deviceId: device.id,
          })
        )
      }

      return res.json(device)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const { Device } = models
      let { brandId, typeId, limit, page } = req.query
      page = page || 1
      limit = limit || 9

      //Отступ после перехода на следующую страницу
      let offset = page * limit - limit
      let devices

      //Проверяем наличие query параметров и выдаем список устройств, который соответствует им
      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit, offset })
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          limit,
          offset,
        })
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          limit,
          offset,
        })
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId, brandId },
          limit,
          offset,
        })
      }

      return res.json(devices)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async getOne(req, res, next) {
    try {
      const { Device, DeviceInfo } = models

      //По id из запроса ищем запись в БД
      const { id } = req.params
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }],
      })
      return res.json(device)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { Device, DeviceInfo } = models

      //По id из запроса ищем запись в БД
      const { id } = req.query
      const device = await Device.findOne({
        where: { id },
      })

      //Если такой девайс не найден, выходим из метода
      if (!device) {
        return next(ApiError.badRequest('Девайс с таким id не найден'))
      }

      //Удаляем сначала информацию о устростве, его фотографию и потом само устройство
      await DeviceInfo.destroy({ where: { deviceId: id } })
      const __dirname = path.resolve()
      fs.unlinkSync(path.resolve(__dirname, 'static', device.dataValues.img))
      await device.destroy()

      return res.json({ message: 'Удаление прошло успешно' })
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

export default new DeviceController()
