import { Colors } from './colors';

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type FontFamily = 'Montserrat-Regular' | 'Montserrat-Medium' | 'Montserrat-Bold';

interface ITextStyles {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  h5: TextStyle;
  h6: TextStyle;
  label: TextStyle;
  body: TextStyle;
  bodyBold: TextStyle;
  button: TextStyle;
  p1: TextStyle;
  p2: TextStyle;
  s1: TextStyle;
  s2: TextStyle;
  c1: TextStyle;
  c2: TextStyle;
}

class TextStyle {
  constructor(
    fontSize: number,
    fontWeight: FontWeight,
    color: Colors,
    fontFamily: FontFamily,
    lineHeight: number,
  ) {
    this.fontSize = fontSize;
    this.fontWeight = fontWeight;
    this.color = color;
    this.fontFamily = fontFamily;
    this.lineHeight = lineHeight;
  }

  fontSize: number;
  fontWeight: FontWeight;
  color: Colors;
  fontFamily: FontFamily;
  lineHeight: number;

  changeColor(color: Colors): TextStyle {
    return new TextStyle(this.fontSize, this.fontWeight, color, this.fontFamily, this.lineHeight);
  }
}

export const TextStyles: ITextStyles = {
  h1: new TextStyle(36, '600', Colors.Basic800, 'Montserrat-Bold', 48),
  h2: new TextStyle(32, '600', Colors.Basic800, 'Montserrat-Bold', 40),
  h3: new TextStyle(28, '600', Colors.Basic800, 'Montserrat-Bold', 36),
  h4: new TextStyle(24, '600', Colors.Basic800, 'Montserrat-Bold', 32),
  h5: new TextStyle(20, '600', Colors.Basic800, 'Montserrat-Bold', 28),
  h6: new TextStyle(16, '600', Colors.Basic800, 'Montserrat-Bold', 22),
  label: new TextStyle(12, '400', Colors.Basic800, 'Montserrat-Regular', 12),
  body: new TextStyle(14, '400', Colors.Basic800, 'Montserrat-Regular', 18),
  bodyBold: new TextStyle(14, '600', Colors.Basic800, 'Montserrat-Bold', 18),
  button: new TextStyle(14, '600', Colors.Basic100, 'Montserrat-Bold', 18),
  p1: new TextStyle(15, '500', Colors.Basic800, 'Montserrat-Medium', 20),
  p2: new TextStyle(13, '400', Colors.Basic800, 'Montserrat-Regular', 18),
  s1: new TextStyle(15, '500', Colors.Basic800, 'Montserrat-Medium', 24),
  s2: new TextStyle(13, '500', Colors.Basic800, 'Montserrat-Medium', 24),
  c1: new TextStyle(12, '400', Colors.Basic800, 'Montserrat-Regular', 16),
  c2: new TextStyle(12, '500', Colors.Basic800, 'Montserrat-Medium', 16),
};
