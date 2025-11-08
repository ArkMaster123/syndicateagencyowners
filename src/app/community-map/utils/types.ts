export interface LayerBase {
  name: string;
  type: string;
  visible: boolean;
  x: number;
  y: number;
}

export interface TileLayer extends LayerBase {
  type: 'tilelayer';
  data: number[];
  height: number;
  width: number;
}

export interface ObjectProperty {
  name: string;
  type: string;
  value: string | number | boolean;
}

export interface MapObject {
  id: number;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  visible: boolean;
  properties?: ObjectProperty[];
}

export interface ObjectLayer extends LayerBase {
  type: 'objectlayer';
  objects: MapObject[];
  draworder?: string;
}

export interface GroupLayer extends LayerBase {
  type: 'group';
  layers: (TileLayer | GroupLayer | ObjectLayer)[];
}

export interface Tileset {
  firstgid: number;
  image: string;
  imageheight: number;
  imagewidth: number;
  name: string;
  tileheight: number;
  tilewidth: number;
  columns: number;
  tilecount: number;
}

export interface TiledMap {
  height: number;
  width: number;
  tileheight: number;
  tilewidth: number;
  layers: (TileLayer | GroupLayer | ObjectLayer)[];
  tilesets: Tileset[];
}

export interface JitsiMeetingRoom {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  jitsiRoom: string;
  jitsiTrigger?: 'onaction' | 'onenter';
  jitsiTriggerMessage?: string;
  jitsiWidth?: number;
  jitsiClosable?: boolean;
  jitsiConfig?: string;
  jitsiInterfaceConfig?: string;
}

export interface TileImage {
  img: HTMLImageElement;
  loaded: boolean;
}

export interface GameState {
  player: {
    x: number;
    y: number;
    facing: 'up' | 'down' | 'left' | 'right';
  };
  npcs: Array<{
    id: string;
    name: string;
    role: string;
    x: number;
    y: number;
    available: boolean;
    color: string;
  }>;
  tileSize: number;
  mapWidth: number;
  mapHeight: number;
  keys: Record<string, boolean>;
  mobileControls: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
  };
}
