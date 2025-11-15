import { useMemo } from "react";
import type { Draw } from "../common/Draw";

export function useDrawRows(draws: Draw[]) {
  return useMemo(
    () =>
      draws.map((draw, rowNr) => ({
        id: `${draw.number}-${rowNr}`,
        drawNumber: draw.number,
        date: new Date(draw.date),
        number1: draw.numbers[0],
        number2: draw.numbers[1],
        number3: draw.numbers[2],
        number4: draw.numbers[3],
        number5: draw.numbers[4],
        number6: draw.stars[0],
        number7: draw.stars[1],
      })),
    [draws]
  );
}