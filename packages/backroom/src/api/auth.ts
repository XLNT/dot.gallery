import { Entity } from "../prisma";
import {
  SignOptions,
  VerifyOptions,
  verify as jwtVerify,
  sign,
} from "jsonwebtoken";

const kSignOptions: SignOptions = {
  algorithm: "HS256",
  expiresIn: "7d",
};

const kVerifyOptions: VerifyOptions = {
  algorithms: ["HS256"],
};

interface Payload {
  id: string;
}

export const make = (payload: Payload): Promise<string> =>
  new Promise((resolve, reject) =>
    sign(payload, process.env.BACKROOM_SECRET, kSignOptions, (err, res) =>
      err ? reject(err) : resolve(res),
    ),
  );

export const makeForEntity = (entity: Entity): Promise<string> =>
  make({ id: entity.id });

export const verify = (jwt: string): Promise<Payload> =>
  new Promise((resolve, reject) =>
    jwtVerify(jwt, process.env.BACKROOM_SECRET, kVerifyOptions, (err, res) =>
      err ? reject(err) : resolve(res as Payload),
    ),
  );
