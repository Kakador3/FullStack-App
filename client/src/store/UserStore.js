import { makeAutoObservable } from 'mobx'

export default class UserStore {
  constructor() {
    this._isAuth = false
    this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }

  setUser(user) {
    this._user = user
  }

  // @ts-ignore
  get isAuth() {
    return this._isAuth
  }

  // @ts-ignore
  get user() {
    return this._user
  }
}
