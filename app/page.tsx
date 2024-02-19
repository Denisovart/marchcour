"use client"
import { mockCouriers, mockOrders } from "@/utils/consts";
import { IClosestOrder, IClosestOrderTrack, ICourierLoc, IOrder } from "@/utils/interfaces";
import { Map, Placemark, Polyline, YMaps } from "@pbe/react-yandex-maps";
import { useState } from "react";

const HomePage = () => {

  const [points, setPoints] = useState<ICourierLoc[]>([])
  const [orders, setOrders] = useState<IOrder[]>([])
  const [closestOrderTracks, setClosestOrderTracks] = useState<IClosestOrderTrack[]>([])

  const [point, setPoint] = useState({
    latitude: "",
    longitude: ""
  })

  const [order, setOrder] = useState({
    from: {
      latitude: "",
      longitude: "",
    },
    to: {
      latitude : "",
      longitude: "",
    },
    price: ""
  })

  const [mockCourAdded, setMockCourAdded] = useState(false)
  const [mockOrdersAdded, setMockOrdersAdded] = useState(false)

  const handleAddCour = () => {
    setPoints(prev => [...prev, {
      latitude: +point.latitude,
      longitude: +point.longitude
    }])
    setPoint({
      latitude: "",
      longitude: ""
    })
  }

  const handleAddOrder = () => {
    setOrders(prev => [...prev, {
      from: {
        latitude: +order.from.latitude,
        longitude: +order.from.longitude,
      },
      to: {
        latitude : +order.to.latitude,
        longitude: +order.to.longitude,
      },
      price: +order.price
    }])
    setOrder({
      from: {
        latitude: "",
        longitude: "",
      },
      to: {
        latitude : "",
        longitude: "",
      },
      price: ""
    })
  }

  const handleAddMockCouriers = () => {
    mockCouriers.forEach((courier) => {
      setPoints((prev) => [...prev, {...courier}])
    })
    setMockCourAdded(true)
  }

  const handleAddMockOrders = () => {
    mockOrders.forEach((order) => {
      setOrders((prev) => [...prev, {...order}])
    })
    setMockOrdersAdded(true)
  }

  const handleShifter = () => {
    setClosestOrderTracks([])
    const pointsArr = [...points]
    let bestWay = Infinity
    let bestPairs: IClosestOrderTrack[] = []

    for (let i=0; i<pointsArr.length; i++) {

      let usedPoints = new Set<IClosestOrder>()
      const closestPairs: IClosestOrderTrack[] = []

      pointsArr.forEach((point) => {
        let minDistance = Infinity
        let closestOrder: IClosestOrder | null = null
  
        orders.forEach((order) => {
          const distance = Math.sqrt((point.latitude - order.from.latitude) ** 2 + (point.longitude - order.from.longitude) ** 2)
          if (distance < minDistance && !usedPoints.has(order.from)) {
            minDistance = distance
            closestOrder = order.from 
          }
        })

        if (closestOrder !== null) {
          closestPairs.push({courierLoc: point, orderStart: closestOrder})
          usedPoints.add(closestOrder);
        }
      })

      let totalDistance = 0

      closestPairs.forEach(pairs => {
        totalDistance += Math.sqrt((pairs.courierLoc.latitude - pairs.orderStart.latitude) ** 2 + (pairs.courierLoc.longitude - pairs.orderStart.longitude) ** 2)
      })

      console.log(totalDistance)
      
      if (totalDistance < bestWay) {
        bestWay = totalDistance
        bestPairs = closestPairs
      }

      pointsArr.push(pointsArr.shift() ?? {latitude: 0, longitude: 0})
    }
    console.log(bestWay)
    setClosestOrderTracks((prev) => [...prev, ...bestPairs])
  }

  return (
    <YMaps>
      <div className="flex w-screen h-screen">
        <div className="flex-1">
          <Map
            defaultState={{
              center: [62.026909, 129.732238],
              zoom: 13
            }}
            className="w-full h-full"
          >
            {
              points.length > 0 && points.map((point, index) => (
                <Placemark 
                  key={index}
                  geometry={[
                    point.latitude, 
                    point.longitude
                  ]}
                />
              ))
            }
            {
              orders.length > 0 && orders.map((order, index) => (
                <Polyline
                  key={index}
                  geometry={[
                    [order.from.latitude, order.from.longitude],
                    [order.to.latitude, order.to.longitude],
                  ]}
                  options={{
                    strokeColor: "#000",
                    strokeWidth: 4,
                    strokeOpacity: 0.5,
                  }}
                />
              ))
            }
            {
              closestOrderTracks.length > 0 && closestOrderTracks.map((order, index) => (
                <Polyline
                  key={index}
                  geometry={[
                    [order.courierLoc.latitude, order.courierLoc.longitude],
                    [order.orderStart.latitude, order.orderStart.longitude],
                  ]}
                  options={{
                    strokeColor: "#50c878",
                    strokeWidth: 4,
                    strokeOpacity: 0.5,
                  }}
                />
              ))
            }
          </Map>
        </div>
        <div className="flex-1 flex flex-col gap-9 p-7">
          <div className="flex justify-center items-center gap-2">
            <img 
              className="w-[125px]" 
              src="https://static.tildacdn.com/tild6565-6164-4837-b166-363538373732/Group_44.svg" 
              alt="drivee-logo" 
            />
            <div className=" text-4xl">
              |
            </div>
            <div className="flex flex-col uppercase font-bold">
              <div>Тестовое</div>
              <div>Задание</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-md flex flex-col gap-4">
            <span className="text-xl font-semibold uppercase">
              Mock данные
            </span>
            <div className="flex gap-4">
              <div className="flex-1">
                <button
                  onClick={handleAddMockCouriers}
                  disabled={mockCourAdded}
                  className="rounded-md bg-emerald-600 px-3.5 w-full py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 duration-300 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:bg-gray-400"
                >
                  Добавить mock курьеров
                </button>
              </div>
              <div className="flex-1">
                <button
                  onClick={handleAddMockOrders}
                  disabled={mockOrdersAdded}
                  className="rounded-md bg-emerald-600 px-3.5 py-2.5 w-full text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 duration-300 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:bg-gray-400"
                >
                  Добавить mock заказы
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-9">
            <div className="flex-1 flex flex-col gap-4 bg-white p-4 rounded-md">
              <span className="text-xl font-semibold uppercase">
                Добавление Курьера
              </span>
              <span className="text-md font-semibold text-black/50 uppercase">
                Геоданные:
              </span>
              <input
                className="border-2 rounded-md px-4 py-2 outline-none focus:ring-2 ring-emerald-500 ring-offset-2 duration-300"
                placeholder="Ширина"
                value={point.latitude}
                onChange={e => setPoint((prev) => ({...prev, latitude: e.target.value}))}
                type="number"
              />
              <input
                className="border-2 rounded-md px-4 py-2 outline-none focus:ring-2 ring-emerald-500 ring-offset-2 duration-300"
                value={point.longitude}
                placeholder="Долгота"
                onChange={e => setPoint((prev) => ({...prev, longitude: e.target.value}))}
                type="number"
              />
              <button
                className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 self-center disabled:bg-gray-400 duration-300"
                onClick={handleAddCour}
              >
                Добавить
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-4 bg-white p-4 rounded-md">
              <span className="text-xl font-semibold uppercase">
                Добавление Заказа
              </span>
              <span className="text-md font-semibold text-black/50 uppercase">
                Откуда:
              </span>
              <input
                className="border-2 rounded-md px-4 py-2 outline-none focus:ring-2 ring-emerald-500 ring-offset-2 duration-300"
                placeholder="Ширина"
                value={order.from.latitude}
                onChange={e => setOrder((prev) => ({...prev, from: {...prev.from, latitude: e.target.value}}))}
                type="number"
              />
              <input
                className="border-2 rounded-md px-4 py-2 outline-none focus:ring-2 ring-emerald-500 ring-offset-2 duration-300"
                value={order.from.longitude}
                placeholder="Долгота"
                onChange={e => setOrder((prev) => ({...prev, from: {...prev.from, longitude: e.target.value}}))}
                type="number"
              />
              <span className="text-md font-semibold text-black/50 uppercase">
                куда:
              </span>
              <input
                className="border-2 rounded-md px-4 py-2 outline-none focus:ring-2 ring-emerald-500 ring-offset-2 duration-300"
                placeholder="Ширина"
                value={order.to.latitude}
                onChange={e => setOrder((prev) => ({...prev, to: {...prev.to, latitude: e.target.value}}))}
                type="number"
              />
              <input
                className="border-2 rounded-md px-4 py-2 outline-none focus:ring-2 ring-emerald-500 ring-offset-2 duration-300"
                value={order.to.longitude}
                placeholder="Долгота"
                onChange={e => setOrder((prev) => ({...prev, to: {...prev.to, longitude: e.target.value}}))}
                type="number"
              />
              <span className="text-md font-semibold text-black/50 uppercase">
                Цена:
              </span>
              <input
                className="border-2 rounded-md px-4 py-2 outline-none focus:ring-2 ring-emerald-500 ring-offset-2 duration-300"
                value={order.price}
                placeholder="Цена"
                onChange={e => setOrder((prev) => ({...prev, price: e.target.value}))}
                type="number"
              />
              <button
                className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 self-center disabled:bg-gray-400 duration-300"
                onClick={handleAddOrder}
              >
                Добавить
              </button>
            </div>
          </div>



          <button
            onClick={handleShifter}
            className="rounded-md w-[300px] bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 focus-visible:outline-emerald-600 self-center disabled:bg-gray-400"
          >
            Расчитать
          </button>
        </div>
      </div>
    </YMaps>
  );
}
 
export default HomePage;