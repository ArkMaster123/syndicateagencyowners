import { TiledMap, TileLayer, GroupLayer, ObjectLayer, MapObject, JitsiMeetingRoom } from './types';

export class MapParser {
  private mapData: TiledMap | null = null;

  async loadMap(mapPath: string): Promise<TiledMap> {
    try {
      const response = await fetch(mapPath);
      const data = await response.json();
      this.mapData = data;
      return data;
    } catch (error) {
      console.error('Failed to load map:', error);
      throw error;
    }
  }

  getLayerByName(layerName: string): TileLayer | null {
    if (!this.mapData) return null;

    const findLayer = (layers: (TileLayer | GroupLayer | ObjectLayer)[]): TileLayer | null => {
      for (const layer of layers) {
        if (layer.type === 'tilelayer' && layer.name === layerName) {
          return layer as TileLayer;
        }
        if (layer.type === 'group' && layer.layers) {
          const found = findLayer(layer.layers);
          if (found) return found;
        }
      }
      return null;
    };

    return findLayer(this.mapData.layers);
  }

  getObjectLayers(): ObjectLayer[] {
    if (!this.mapData) return [];

    const objectLayers: ObjectLayer[] = [];
    const findObjectLayers = (layers: any[]) => {
      for (const layer of layers) {
        // Check if layer has objects array (it's an object layer)
        if (layer.objects && Array.isArray(layer.objects)) {
          objectLayers.push(layer as ObjectLayer);
        } else if (layer.type === 'group' && layer.layers) {
          findObjectLayers(layer.layers);
        }
      }
    };

    findObjectLayers(this.mapData.layers);
    console.log('[MapParser] Found object layers:', objectLayers.length);
    return objectLayers;
  }

  getJitsiMeetingRooms(): JitsiMeetingRoom[] {
    const objectLayers = this.getObjectLayers();
    const meetingRooms: JitsiMeetingRoom[] = [];

    console.log('[MapParser] Checking', objectLayers.length, 'object layers for Jitsi rooms');

    for (const layer of objectLayers) {
      console.log('[MapParser] Layer has', layer.objects?.length || 0, 'objects');
      for (const obj of layer.objects) {
        console.log('[MapParser] Object:', obj.name, 'type:', obj.type, 'properties:', obj.properties);
        
        // Check if object has jitsiRoom property
        const jitsiRoomProp = obj.properties?.find(p => p.name === 'jitsiRoom');
        if (jitsiRoomProp) {
          console.log('[MapParser] Found Jitsi room:', obj.name, jitsiRoomProp);
          
          if (typeof jitsiRoomProp.value === 'string') {
            const getProperty = (name: string): string | number | boolean | undefined => {
              return obj.properties?.find(p => p.name === name)?.value;
            };

            const room = {
              id: `jitsi-${obj.id}`,
              name: obj.name || `Room-${obj.id}`,
              x: obj.x / 32, // Convert pixels to tiles (assuming 32px tiles)
              y: obj.y / 32,
              width: obj.width / 32,
              height: obj.height / 32,
              jitsiRoom: jitsiRoomProp.value,
              jitsiTrigger: (getProperty('jitsiTrigger') as 'onaction' | 'onenter') || 'onenter',
              jitsiTriggerMessage: getProperty('jitsiTriggerMessage') as string | undefined,
              jitsiWidth: getProperty('jitsiWidth') as number | undefined,
              jitsiClosable: getProperty('jitsiClosable') !== false,
              jitsiConfig: getProperty('jitsiConfig') as string | undefined,
              jitsiInterfaceConfig: getProperty('jitsiInterfaceConfig') as string | undefined,
            };
            
            console.log('[MapParser] Created room:', room);
            meetingRooms.push(room);
          }
        }
      }
    }

    console.log('[MapParser] Total Jitsi rooms found:', meetingRooms.length);
    return meetingRooms;
  }

  getCollisionLayer(): TileLayer | null {
    return this.getLayerByName('collisions');
  }

  getFloorLayers(): TileLayer[] {
    if (!this.mapData) return [];

    const floorLayers: TileLayer[] = [];
    const findFloorLayers = (layers: (TileLayer | GroupLayer | ObjectLayer)[]) => {
      for (const layer of layers) {
        if (layer.type === 'group' && layer.layers) {
          if (layer.name === 'floor') {
            floorLayers.push(...layer.layers.filter((l) => l.type === 'tilelayer') as TileLayer[]);
          } else {
            findFloorLayers(layer.layers);
          }
        }
      }
    };

    findFloorLayers(this.mapData.layers);
    return floorLayers;
  }

  getWallLayers(): TileLayer[] {
    if (!this.mapData) return [];

    const wallLayers: TileLayer[] = [];
    const findWallLayers = (layers: (TileLayer | GroupLayer | ObjectLayer)[]) => {
      for (const layer of layers) {
        if (layer.type === 'group' && layer.layers) {
          if (layer.name === 'walls') {
            wallLayers.push(...layer.layers.filter((l) => l.type === 'tilelayer') as TileLayer[]);
          } else {
            findWallLayers(layer.layers);
          }
        }
      }
    };

    findWallLayers(this.mapData.layers);
    return wallLayers;
  }

  getFurnitureLayers(): TileLayer[] {
    if (!this.mapData) return [];

    const furnitureLayers: TileLayer[] = [];
    const findFurnitureLayers = (layers: (TileLayer | GroupLayer | ObjectLayer)[]) => {
      for (const layer of layers) {
        if (layer.type === 'group' && layer.layers) {
          if (layer.name === 'furniture') {
            furnitureLayers.push(...layer.layers.filter((l) => l.type === 'tilelayer') as TileLayer[]);
          } else {
            findFurnitureLayers(layer.layers);
          }
        }
      }
    };

    findFurnitureLayers(this.mapData.layers);
    return furnitureLayers;
  }

  isCollisionTile(x: number, y: number): boolean {
    const collisionLayer = this.getCollisionLayer();
    if (!collisionLayer) return false;

    const tileIndex = y * collisionLayer.width + x;
    return collisionLayer.data[tileIndex] > 0;
  }

  getMapData(): TiledMap | null {
    return this.mapData;
  }
}
