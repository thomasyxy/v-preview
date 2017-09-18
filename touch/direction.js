/**
 * 判断swipe方向
 */
export default function swipeDirection(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) >=	Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
}
