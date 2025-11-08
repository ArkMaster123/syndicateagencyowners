export interface CharacterSprite {
  image: HTMLImageElement;
  width: number;
  height: number;
  frameWidth: number;
  frameHeight: number;
  framesPerRow: number;
  totalFrames: number;
}

export class CharacterSpriteManager {
  private sprites: Map<string, CharacterSprite> = new Map();
  private loaded = false;

  async loadSprites(): Promise<void> {
    const spritePromises: Promise<void>[] = [];

    // Load male sprites
    for (let i = 1; i <= 18; i++) {
      const spritePath = `/character-sprites/male/Male ${i.toString().padStart(2, '0')}-1.png`;
      spritePromises.push(this.loadCharacterSprite(`male_${i.toString().padStart(2, '0')}`, spritePath));
    }

    // Load female sprites  
    for (let i = 1; i <= 25; i++) {
      const spritePath = `/character-sprites/female/Female ${i.toString().padStart(2, '0')}-1.png`;
      spritePromises.push(this.loadCharacterSprite(`female_${i.toString().padStart(2, '0')}`, spritePath));
    }

    // Load cat sprite
    spritePromises.push(this.loadCharacterSprite('cat_01', '/character-sprites/animal/cat_01.png'));

    try {
      await Promise.all(spritePromises);
      this.loaded = true;
      console.log('Character sprites loaded successfully');
    } catch (error) {
      console.error('Failed to load character sprites:', error);
    }
  }

  private async loadCharacterSprite(id: string, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Cat sprites are 96x128 (3 columns x 4 rows)
        // Character sprites are 128x128 (4 columns x 4 rows)
        const isCat = id.startsWith('cat_');
        const frameWidth = 32;
        const frameHeight = 32;
        const framesPerRow = isCat ? 3 : 4;
        const totalFrames = isCat ? 12 : 16;
        
        this.sprites.set(id, {
          image: img,
          width: img.width,
          height: img.height,
          frameWidth,
          frameHeight,
          framesPerRow,
          totalFrames
        });
        resolve();
      };
      img.onerror = reject;
      img.src = path;
    });
  }

  drawCharacter(
    ctx: CanvasRenderingContext2D,
    characterId: string,
    x: number,
    y: number,
    facing: 'up' | 'down' | 'left' | 'right' = 'down',
    animationFrame: number = 0
  ): void {
    const sprite = this.sprites.get(characterId);
    if (!sprite) {
      console.warn(`Character sprite not found: ${characterId}`);
      return;
    }

    // Calculate frame based on facing direction and animation
    let frameRow = 0;
    switch (facing) {
      case 'down':
        frameRow = 0;
        break;
      case 'left':
        frameRow = 1;
        break;
      case 'right':
        frameRow = 2;
        break;
      case 'up':
        frameRow = 3;
        break;
    }

    // Use animation frame for walking (0-3), but use frame 1 for standing
    const frameCol = animationFrame % 4;
    const frameIndex = frameRow * sprite.framesPerRow + frameCol;

    const sourceX = (frameIndex % sprite.framesPerRow) * sprite.frameWidth;
    const sourceY = Math.floor(frameIndex / sprite.framesPerRow) * sprite.frameHeight;

    ctx.drawImage(
      sprite.image,
      sourceX,
      sourceY,
      sprite.frameWidth,
      sprite.frameHeight,
      x,
      y,
      sprite.frameWidth,
      sprite.frameHeight
    );
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  getRandomCharacter(gender: 'male' | 'female' = 'male'): string {
    const maleCount = 18;
    const femaleCount = 25;
    const count = gender === 'male' ? maleCount : femaleCount;
    const randomIndex = Math.floor(Math.random() * count) + 1;
    return `${gender}_${randomIndex.toString().padStart(2, '0')}`;
  }
}