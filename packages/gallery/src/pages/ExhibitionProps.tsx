export enum Flow {
  Preflight,
  Foyer,
  Gallery,
  DoubleConfirm,
  GiftShop,
}

export type ExhibitionProps<T> = {
  exhibition: number;
  show: number;
  setFlow: (flow: Flow) => void;
} & T;
