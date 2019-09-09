import { Coords } from "lib/rooms";
import React, { PropsWithChildren } from "react";

const extent = 100.0;

// eslint-disable-next-line react/display-name
export default React.forwardRef(
  (
    {
      journey,
      size = 5,
      svgRef,
      ...rest
    }: PropsWithChildren<{
      journey: Coords[];
      size: number;
      [_: string]: any;
    }>,
    ref,
  ) => {
    const things = [];
    const length = extent / size;
    const originOffset = 0 + length / 2;

    for (let i = 1; i < journey.length; i++) {
      const [fromX, fromY] = journey[i - 1];
      const [toX, toY] = journey[i];

      const _fX = originOffset + fromX * length;
      const _fY = originOffset + fromY * length;

      const _tX = originOffset + toX * length;
      const _tY = originOffset + toY * length;

      things.push(
        <line key={i} x1={_fX} y1={_fY} x2={_tX} y2={_tY} stroke="red" />,
      );
      if (i === journey.length - 1) {
        things.push(
          <circle
            key="circle"
            fill="white"
            r={extent / 20}
            cx={_tX}
            cy={_tY}
            stroke="red"
          />,
        );
      }
    }

    return (
      <div ref={ref} style={{ width: "4.25rem", height: "4.25rem" }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${extent} ${extent}`}
          xmlns="http://www.w3.org/2000/svg"
          strokeWidth="4"
          strokeLinecap="square"
          {...rest}
        >
          <rect
            fill="white"
            stroke="red"
            x="0"
            y="0"
            width={extent}
            height={extent}
            strokeWidth="8"
          ></rect>
          {things}
        </svg>
      </div>
    );
  },
);
