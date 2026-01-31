import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import dotenv from "dotenv";

dotenv.config();

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  //sheild protects your app from common attacks example: SQL injection
  rules: [
    shield({ mode: "LIVE" }),
    //Block all the bots except search engine
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval:10,
      capacity:10
    }),
  ],
});

export default aj