export const ItemTypes = {
  REWARD: "reward",
  INDICATOR: "indicator",
};

export type DragObject = {
  srcCategory?: string;
  reward: string;
  type: string;
};
