export type GetSpecialPathParams = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

export const getSpecialPath = (
  { sourceX, sourceY, targetX, targetY }: GetSpecialPathParams,
  offset: number
): [path: string, labelX: number, labelY: number] => {
  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  return [
    `M ${sourceX} ${sourceY} Q ${centerX} ${
      centerY + offset
    } ${targetX} ${targetY}`,
    centerX,
    centerY,
  ];
};
