"use client";

import WorldMap from "react-svg-worldmap";

type Props = {
  countries: Record<string, number>; // eg { US: 2, AE: 1 }
};

export function VisitorsWorldMap({ countries }: Props) {
  const data = Object.entries(countries).map(([code, value]) => ({
    country: code.toLowerCase(), // library expects lower case ISO
    value,
  }));

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-slate-400">
        No visitor data yet
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <WorldMap
        data={data}
        size={"responsive"}
        valueSuffix=" visitors"
      />
    </div>
  );
}

