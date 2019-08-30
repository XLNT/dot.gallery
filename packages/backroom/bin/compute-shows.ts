#!/usr/bin/env npx ts-node

import { DateTime } from "luxon";

const main = async () => {
  const now = DateTime.fromISO(process.argv[2])
    .toUTC()
    .set({ hour: 24 });
  // shows last 4 hours with 4 hour blocks inbetween, resetting at the beginning of the next day
  for (let i = 0; i < 21; i++) {
    const start = now.plus({ hours: i * 8 });
    const end = start.plus({ hours: 4 });

    console.log(`{
      number: ${i}
      opensAt: "${start.toString()}"
      closesAt: "${end.toString()}"
    }`);
  }
};

main().catch(console.error.bind(console));
