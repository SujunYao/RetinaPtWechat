import { createIconSet } from '@expo/vector-icons';
import iconConfig from '../assets/fonts/iconfont.json';

interface GLYPH {
  icon_id: string
  name: string
  font_class: string
  unicode: string
  unicode_decimal: number
}

const glyphMap: { [key: string]: number } = {};
iconConfig.glyphs.forEach((glyhp: GLYPH) => {
  glyphMap[glyhp.name] = glyhp.unicode_decimal;
});

export default createIconSet(glyphMap, 'retina-icons', 'iconfont.ttf');