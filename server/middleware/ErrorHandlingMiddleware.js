import ApiError from '../error/ApiError.js'

export default function (error, req, res, next) {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message })
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка!' })
}
