import { ICourierLoc, IOrder } from "./interfaces"

export const mockCouriers: ICourierLoc[] = [
  {
    latitude : 62.032336,
    longitude: 129.75272,
  },
  {
    latitude : 62.044938,
    longitude: 129.735708,
  },
  {
    latitude : 62.037804,
    longitude: 129.732401,
  },
  {
    latitude : 62.028231,
    longitude: 129.698421,
  },
  {
    latitude : 62.026574,
    longitude: 129.72713,
  },
  {
    latitude : 62.030194,
    longitude: 129.753673,
  },
  {
    latitude : 62.051161,
    longitude: 129.716788,
  },
  {
    latitude : 62.013654,
    longitude: 129.718633,
  },
  {
    latitude : 62.025382,
    longitude: 129.692018,
  },
]

export const mockOrders: IOrder[] = [
  {
    from: {
      latitude : 62.040902,
      longitude: 129.736604,
    },
    to: {
      latitude : 62.031341,
      longitude: 129.746819,
    },
    price: 250
  },
  {
    from: {
      latitude : 62.018487,
      longitude: 129.714487,
    },
    to: {
      latitude : 62.009647,
      longitude: 129.702448,
    },
    price: 450
  },
  {
    from: {
      latitude : 62.047216,
      longitude: 129.760544,
    },
    to: {
      latitude : 62.049269,
      longitude: 129.731229,
    },
    price: 450
  },
  {
    from: {
      latitude : 62.031869,
      longitude: 129.717653,
    },
    to: {
      latitude : 62.04182,
      longitude: 129.751196,
    },
    price: 350
  },
  {
    from: {
      latitude : 62.04636,
      longitude: 129.72302,
    },
    to: {
      latitude : 62.04182,
      longitude: 129.723422,
    },
    price: 345
  },
  {
    from: {
      latitude : 62.024086,
      longitude: 129.701703,
    },
    to: {
      latitude : 62.011192,
      longitude: 129.716631,
    },
    price: 345
  },
  {
    from: {
      latitude : 62.027618,
      longitude: 129.72357,
    },
    to: {
      latitude : 62.036589,
      longitude: 129.730794,
    },
    price: 345
  },
  {
    from: {
      latitude : 62.033634,
      longitude: 129.694382,
    },
    to: {
      latitude : 62.019077,
      longitude: 129.706092,
    },
    price: 345
  },
  {
    from: {
      latitude : 62.032154,
      longitude: 129.731187,
    },
    to: {
      latitude : 62.029171,
      longitude: 129.758262,
    },
    price: 345
  },
]