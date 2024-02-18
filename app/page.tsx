"use client"

interface Point {
  latitude : number,
  longitude: number,
}

import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { useState } from "react";

const HomePage = () => {

  const [points, setPoints] = useState<Point[]>([])
  const [point, setPoint] = useState({
    latitude: "",
    longitude: ""
  })

  const handleAdd = () => {
    setPoints(prev => [...prev, {
      latitude: +point.latitude,
      longitude: +point.longitude
    }])
    setPoint({
      latitude: "",
      longitude: ""
    })
  }

  return (
    <YMaps>
      <div className="flex w-screen h-screen">
        <div className="flex-1">
          <Map
            defaultState={{
              center: [62.026909, 129.732238],
              zoom: 14
            }}
            className="w-full h-full"
          >
            {
              points.length > 0 && points.map(point => (
                <Placemark geometry={[point.latitude, point.longitude]}/>
              ))
            }
          </Map>
        </div>
        <div className="flex-1 flex flex-col">
          <input
            placeholder="ширина"
            value={point.latitude}
            onChange={e => setPoint((prev) => ({...prev, latitude: e.target.value}))}
            type="number"
          />
          <input
            value={point.longitude}
            placeholder="долгота"
            onChange={e => setPoint((prev) => ({...prev, longitude: e.target.value}))}
            type="number"
          />
          <button
            onClick={handleAdd}
          >
            Добавить
          </button>
        </div>
      </div>
    </YMaps>
  );
}
 
export default HomePage;