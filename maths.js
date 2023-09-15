export const twoPi = 2 * Math.PI;

export const deg2rad = (degrees) => degrees * (Math.PI / 180);

export const rad2deg = (radians) => radians * (180/Math.PI)

export const easeOutCirc = (elapsed, initialValue, amountOfChange, duration) => {
    return amountOfChange * Math.sqrt(1 - (elapsed = elapsed / duration - 1) * elapsed) + initialValue;
}

export function easeInOutCirc(elapsed, initialValue, amountOfChange, duration) {
	if ((elapsed /= duration / 2) < 1) {
		return -amountOfChange / 2 * (Math.sqrt(1 - elapsed * elapsed) - 1) + initialValue;
	}
	return amountOfChange / 2 * (Math.sqrt(1 - (elapsed -= 2) * elapsed) + 1) + initialValue;
}

export function getScaledValue(value, sourceRangeMin, sourceRangeMax, targetRangeMin, targetRangeMax) {
    var targetRange = targetRangeMax - targetRangeMin;
    var sourceRange = sourceRangeMax - sourceRangeMin;
    return (value - sourceRangeMin) * targetRange / sourceRange + targetRangeMin;
}