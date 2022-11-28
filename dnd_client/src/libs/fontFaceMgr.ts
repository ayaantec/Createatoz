
import FontFaceObserver from 'fontfaceobserver';

class FontFaceManager {
  private readonly FontFacePrefix = `fontFace__`;
  private readonly _hasBeenAdded: { [key: string]: boolean } = {};

  private resolveFormat(url: string): string | undefined {
    if (!!!url) return;
    const _url = url.toLowerCase();
    if (_url.endsWith('.ttf')) return 'format("truetype")';
    if (_url.endsWith('.otf')) return 'format("opentype")';
    if (_url.endsWith('.woff2')) return 'format("woff2")';
    return;
  }

  private generateFontFamily(id: string): string {
    return `${this.FontFacePrefix}${id}`;
  }

  private generateStyle(id: string, url: string): string {
    const fontType = this.resolveFormat(url);
    return `@font-face{font-family: ${this.generateFontFamily(id)};src: url(${url})${fontType ? ` ${fontType}` : ''};}`;
  }

  public AppendFontFace(id: string, url: string): void {
    if (this._hasBeenAdded[id]) return;
    const ffStyle = this.generateStyle(id, url);
    const styleElem = window.document.createElement('style');
    styleElem.innerHTML = ffStyle;
    window.document.head.appendChild(styleElem);
    this._hasBeenAdded[id] = true;
  }

  public AppendFontFaces(fonts: { id: string, url: string }[] = []): void {
    fonts.forEach(font => this.AppendFontFace(font.id, font.url));
  }

  public GetFontFamilyById(id: string): string {
    return this.generateFontFamily(id);
  }

  public GetIdByFontFamily(fontFamily: string): string | undefined {
    if (!fontFamily.startsWith(this.FontFacePrefix)) return undefined;
    return fontFamily.slice(this.FontFacePrefix.length);
  }

  public async LoadFontById(id: string): Promise<string> {
    const fontFamily = this.GetFontFamilyById(id);
    const fontObserver = new FontFaceObserver(fontFamily);
    try {
      await fontObserver.load(null, 15000);
      return fontFamily;
    } catch (e) {
      throw new Error('FontFaceObserver returned error');
    }
  }
}

export const FontFaceMgr = new FontFaceManager();