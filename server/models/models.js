import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketDevice = sequelize.define('basket_device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Device = sequelize.define('device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
})

const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Brand = sequelize.define('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
})

const DeviceInfo = sequelize.define('device_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
})

const TypeBrand = sequelize.define('type_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

//Одна User имеет одну Basket
User.hasOne(Basket)
Basket.belongsTo(User)

//Одна User имеет несколько Rating
User.hasMany(Rating)
Rating.belongsTo(User)

//В одной Basket может быть несколько BasketDevice
Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

//Один Type имеет несколько Device
Type.hasMany(Device)
Device.belongsTo(Type)

//Один Brand имеет несколько Device
Brand.hasMany(Device)
Device.belongsTo(Brand)

//Один Device имеет несколько Rating
Device.hasMany(Rating)
Rating.belongsTo(Device)

//Один Device может быть в нескольких корзинах
Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

//Один Device может иметь несколько DeviceInfo
Device.hasMany(DeviceInfo, { as: 'info' })
DeviceInfo.belongsTo(Device)

//Один Type может принадлежать нескольким Brand и наоборот
Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

export default {
  User,
  Basket,
  BasketDevice,
  Device,
  Type,
  Brand,
  Rating,
  TypeBrand,
  DeviceInfo,
}
