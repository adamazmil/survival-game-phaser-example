const toKey = (x, y) => `${x}x${y}`;

export default function findPath(start, target, groundLayer, wallLayer) {
  // Invalid target tile
  if (!groundLayer.getTileAt(target.x, target.y)) return [];

  // wall layer
  if (wallLayer.getTileAt(target.x, target.y)) return [];

  const queue = [];
  // has key to parent and Position
  const parentForKey = {};

  const startKey = toKey(start.x, start.y);
  const targetKey = toKey(target.x, target.y);

  parentForKey[startKey] = {
    key: "",
    position: { x: -1, y: -1 },
  };

  queue.push(start);

  //finds valid neighbors, creates the tree nodes traversing to target
  while (queue.length > 0) {
    const { x, y } = queue.shift();
    const currentKey = toKey(x, y);

    // exits code when target found
    if (currentKey === targetKey) {
      break;
    }

    const neighbors = [
      { x, y: y - 1 }, // top
      { x: x + 1, y }, // right
      { x, y: y + 1 }, // bottom
      { x: x - 1, y }, // left
    ];

    //populates neighbors
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      const tile = groundLayer.getTileAt(neighbor.x, neighbor.y);

      if (!tile) continue;
      if (wallLayer.getTileAt(neighbor.x, neighbor.y)) continue;

      const key = toKey(neighbor.x, neighbor.y);

      if (key in parentForKey) continue;

      parentForKey[key] = {
        key: currentKey,
        position: { x: neighbor.x, y: neighbor.y },
      };
      queue.push(neighbor);
    }
  }

  const path = [];
  //starts from target
  let currentKey = targetKey;
  let currentPos = parentForKey[targetKey].position;
  //build path from traversed tree
  while (currentKey != startKey) {
    const pos = groundLayer.tileToWorldXY(currentPos.x, currentPos.y);
    pos.x += groundLayer.tilemap.tileWidth * 0.5;
    pos.y += groundLayer.tilemap.tileHeight * 0.5;

    path.push(pos);

    const { key, position } = parentForKey[currentKey];
    currentKey = key;
    currentPos = position;
  }
  return path;
}
