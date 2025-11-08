import { Tileset, TileImage } from './types';

export class TilesetLoader {
  private tilesets: Map<string, TileImage> = new Map();
  private tilesetData: Map<string, Tileset> = new Map();

  async loadTilesets(tilesets: Tileset[]): Promise<void> {
    const loadPromises = tilesets.map(async (tileset) => {
      const img = new Image();
      const imageUrl = `/tilesets/${tileset.image.split('/').pop()}`;
      
      return new Promise<void>((resolve) => {
        img.onload = () => {
          this.tilesets.set(tileset.name, { img, loaded: true });
          this.tilesetData.set(tileset.name, tileset);
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load tileset: ${imageUrl}`);
          resolve();
        };
        img.src = imageUrl;
      });
    });

    await Promise.all(loadPromises);
  }

  getTileImage(tilesetName: string): TileImage | undefined {
    return this.tilesets.get(tilesetName);
  }

  getTilesetData(tilesetName: string): Tileset | undefined {
    return this.tilesetData.get(tilesetName);
  }

  drawTile(
    ctx: CanvasRenderingContext2D,
    tileId: number,
    x: number,
    y: number,
    tileSize: number = 32
  ): void {
    // Find which tileset contains this tile ID
    for (const [tilesetName, tileset] of this.tilesetData) {
      if (tileId >= tileset.firstgid && tileId < tileset.firstgid + tileset.tilecount) {
        const tileImage = this.tilesets.get(tilesetName);
        if (!tileImage || !tileImage.loaded) continue;

        const localTileId = tileId - tileset.firstgid;
        const tileX = (localTileId % tileset.columns) * tileset.tilewidth;
        const tileY = Math.floor(localTileId / tileset.columns) * tileset.tileheight;

        ctx.drawImage(
          tileImage.img,
          tileX,
          tileY,
          tileset.tilewidth,
          tileset.tileheight,
          x,
          y,
          tileSize,
          tileSize
        );
        break;
      }
    }
  }

  isLoaded(): boolean {
    return Array.from(this.tilesets.values()).every(tile => tile.loaded);
  }
}
