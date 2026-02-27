export default class Util {
  static getCircleArea(radius) {
    return (radius ** 2) * Math.PI;
  }
}

export function getTriangle(base, height) {
  return base * height / 2;
}