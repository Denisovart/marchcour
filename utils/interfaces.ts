export interface ICourierLoc {
  latitude: number,
  longitude: number
}

export interface IClosestOrder extends ICourierLoc {}

export interface IOrder {
  from: {
    latitude: number,
    longitude: number,
  },
  to: {
    latitude : number,
    longitude: number,
  },
  price: number
}

export interface IClosestOrderTrack {
  courierLoc: {
    latitude: number,
    longitude: number
  },
  orderStart: {
    latitude: number,
    longitude: number
  }
}