import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
  constructor() {
    this._types = []
    this._brands = []
    this._devices = []
    this._selectedType = {}
    this._selectedBrand = {}
    this._selectedDevice = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 4
    this._selectedPage = 1
    makeAutoObservable(this)
  }

  setTypes(type) {
    this._types = type
  }

  setBrands(brand) {
    this._brands = brand
  }

  setDevices(device) {
    this._devices = device
  }

  setSelectedType(type) {
    this.setPage(1)
    if (this._selectedType === type) {
      return (this._selectedType = {})
    }
    this._selectedType = type
  }

  setSelectedBrand(brand) {
    this.setPage(1)
    if (this._selectedBrand === brand) {
      return (this._selectedBrand = {})
    }
    this._selectedBrand = brand
  }

  setSelectedDevice(device) {
    this._selectedDevice = device
  }

  setPage(page) {
    this._page = page
  }

  setTotalCount(count) {
    this._totalCount = count
  }

  // @ts-ignore
  get types() {
    return this._types
  }

  // @ts-ignore
  get brands() {
    return this._brands
  }

  // @ts-ignore
  get devices() {
    return this._devices
  }

  // @ts-ignore
  get selectedType() {
    return this._selectedType
  }

  // @ts-ignore
  get selectedBrand() {
    return this._selectedBrand
  }

  // @ts-ignore
  get selectedDevice() {
    return this._selectedDevice
  }

  // @ts-ignore
  get totalCount() {
    return this._totalCount
  }

  // @ts-ignore
  get page() {
    return this._page
  }

  // @ts-ignore
  get limit() {
    return this._limit
  }
}
