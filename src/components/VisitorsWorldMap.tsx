"use client";

import WorldMap from "react-svg-worldmap";

type Props = {
  countries: Record<string, number>; // eg { US: 2, AE: 1 }
};

export function VisitorsWorldMap({ countries }: Props) {
  const data = Object.entries(countries)
    .filter(([code]) => code && code !== 'Unknown')
    .map(([code, value]) => ({
      country: code.toLowerCase(), // library expects lower case ISO 3166-1 alpha-2
      value,
    }));

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-white/50">
        <div className="text-center">
          <p>No visitor data yet</p>
          <p className="text-xs mt-2 text-white/30">Visitor tracking will appear here once you have visitors</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-4xl" style={{ color: '#00d4ff' }}>
        <WorldMap
          data={data}
          size="responsive"
          valueSuffix=" visitors"
          color="#00d4ff"
        />
      </div>
    </div>
  );
}

