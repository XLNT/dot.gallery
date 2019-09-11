import { Coords } from "lib/rooms";
import React, { PropsWithChildren } from "react";

const strokeWidth = 4;
const extent = 72.0; // relative extent
const padding = 7;
const circleRadius = 4;

// eslint-disable-next-line react/display-name
export default React.forwardRef<HTMLDivElement, any>(
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
    const length = (extent - padding * 2) / size; // the extent of each grid item
    const originOffset = padding + length / 2;

    for (let i = 1; i < journey.length; i++) {
      const [fromX, fromY] = journey[i - 1];
      const [toX, toY] = journey[i];

      const _fX = originOffset + fromX * length;
      const _fY = originOffset + fromY * length;

      const _tX = originOffset + toX * length;
      const _tY = originOffset + toY * length;

      const didOverflowUp = fromY === 0 && toY === size - 1;
      const didOverflowDown = fromY === size - 1 && toY === 0;
      const didOverflowLeft = fromX === 0 && toX === size - 1;
      const didOverflowRight = fromX === size - 1 && toX === 0;

      const didOverflowX = didOverflowLeft || didOverflowRight;
      const didOverflowY = didOverflowUp || didOverflowDown;

      if (didOverflowX) {
        // draw horizontal overflow
        things.push(
          <line
            key={`${i}-1`}
            x1={_fX}
            y1={_fY}
            x2={didOverflowLeft ? _fX - padding : _fX + padding}
            y2={_fY}
            stroke="red"
          />,
        );
        things.push(
          <line
            key={`${i}-2`}
            x1={didOverflowLeft ? _tX + padding : _tX - padding}
            y1={_tY}
            x2={_tX}
            y2={_tY}
            stroke="red"
          />,
        );
      } else if (didOverflowY) {
        // draw vertical overflow
        things.push(
          <line
            key={`${i}-1`}
            x1={_fX}
            y1={_fY}
            x2={_fX}
            y2={didOverflowUp ? _fY - padding : _fY + padding}
            stroke="red"
          />,
        );
        things.push(
          <line
            key={`${i}-2`}
            x1={_tX}
            y1={didOverflowUp ? _tY + padding : _tY - padding}
            x2={_tX}
            y2={_tY}
            stroke="red"
          />,
        );
      } else {
        things.push(
          <line key={i} x1={_fX} y1={_fY} x2={_tX} y2={_tY} stroke="red" />,
        );
      }

      if (i === journey.length - 1) {
        things.push(
          <circle
            key="circle"
            fill="white"
            r={circleRadius}
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
          strokeWidth={strokeWidth}
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
            strokeWidth={strokeWidth * 2}
          ></rect>
          {things}
        </svg>
      </div>
    );
  },
);
