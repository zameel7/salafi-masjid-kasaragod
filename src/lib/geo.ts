/**
 * Haversine formula to compute great-circle distance between two lat/lng points.
 * Returns distance in kilometres.
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // Earth's radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Format a distance in km for display.
 * Below 1 km shows metres; above shows km with 1 decimal.
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
}

export function getOSMTile(lat: number, lng: number, zoom = 15) {
  const n = Math.pow(2, zoom)
  const xf = ((lng + 180) / 360) * n
  const latRad = (lat * Math.PI) / 180
  const yf = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  const x = Math.floor(xf)
  const y = Math.floor(yf)
  const px = Math.round((xf - x) * 256)
  const py = Math.round((yf - y) * 256)

  // 2×2 grid of tiles so the point stays centered without upscaling
  const ox = px >= 128 ? 0 : -1
  const oy = py >= 128 ? 0 : -1
  const tileUrl = (tx: number, ty: number) =>
    `https://a.basemaps.cartocdn.com/rastertiles/voyager/${zoom}/${tx}/${ty}.png`

  return {
    tiles: [
      { url: tileUrl(x + ox,     y + oy),     left: ox * 256,       top: oy * 256 },
      { url: tileUrl(x + ox + 1, y + oy),     left: (ox + 1) * 256, top: oy * 256 },
      { url: tileUrl(x + ox,     y + oy + 1), left: ox * 256,       top: (oy + 1) * 256 },
      { url: tileUrl(x + ox + 1, y + oy + 1), left: (ox + 1) * 256, top: (oy + 1) * 256 },
    ],
    px,
    py,
  }
}

/**
 * Get user geolocation as a promise.
 */
export function getUserLocation(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(new Error(err.message)),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  });
}
