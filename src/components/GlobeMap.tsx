import { useEffect, useLayoutEffect, useState, useRef } from "react";
import GlobeImage from "@/images/earth-blue-marble.jpg";
import Airports from "@/data/airports.json";
import dynamic from "next/dynamic";

let GlobeGl = () => null;
if (typeof window !== "undefined") GlobeGl = require("react-globe.gl").default;

// https://github.com/vasturiano/react-globe.gl/blob/master/example/airline-routes/us-international-outbound.html

type LonLat = [number, number];
type Route = {
  srcAirport: LonLat;
  dstAirport: LonLat;
};

export default function GlobeMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  // @ts-ignore
  const globeRef = useRef();

  const [dimensions, setDimensions] = useState([400, 400]);

  const belem = Airports.features.find(
    (feat) => feat.properties["code"] == "BEL"
  );

  const airports = Airports.features.filter(
    (feat) => feat.properties["code"] != "BEL"
  );

  const routes = airports.map((airport) => ({
    srcAirport: airport["geometry"]["coordinates"],
    // @ts-ignore
    dstAirport: belem["geometry"]["coordinates"],
  }));

  useEffect(() => {
    // @ts-ignore
    globeRef?.current?.pointOfView({ lat: 5.382665, lng: -48.48028, altitude: 1.5 });
  }, []);

  return (
    <div ref={containerRef} className="flex items-center justify-center w-full h-full">
      <GlobeGl
        // @ts-ignore
        ref={globeRef}
        height={dimensions[1]}
        width={dimensions[0]}
        globeImageUrl={GlobeImage.src}
        arcsData={routes}
        backgroundColor="#ffffff"
        // @ts-ignore
        arcStartLat={(d) => +d.srcAirport[1]}
        // @ts-ignore
        arcStartLng={(d) => +d.srcAirport[0]}
        // @ts-ignore
        arcEndLat={(d) => +d.dstAirport[1]}
        // @ts-ignore
        arcEndLng={(d) => +d.dstAirport[0]}
        // arcDashLength={1}
        // arcDashGap={0.6}
        // arcDashInitialGap={() => Math.random()}
        // arcDashAnimateTime={1000}
        // arcColor={d => [`rgba(0, 255, 0, 1)`, `rgba(255, 0, 0,1)`]}
        // arcsTransitionDuration={0}
      />
    </div>
  );
}