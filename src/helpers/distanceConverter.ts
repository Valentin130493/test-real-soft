export const DistanceConverter = (distance: any) => {
    if (distance < 1000) {
        return `${Math.floor(distance)} m`
    } else {
        return `${(distance / 1000).toFixed(2)} km`
    }
}