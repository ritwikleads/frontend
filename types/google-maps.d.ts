declare namespace google.maps {
  interface MapOptions {
    center: { lat: number; lng: number }
    zoom: number
    mapTypeControl?: boolean
    streetViewControl?: boolean
    fullscreenControl?: boolean
  }

  class Map {
    constructor(mapDiv: Element, opts?: MapOptions)
    setCenter(latLng: LatLng): void
    setZoom(zoom: number): void
  }

  class Marker {
    constructor(opts?: MarkerOptions)
    setMap(map: Map | null): void
    addListener(eventName: string, handler: Function): void
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions)
    open(map?: Map, anchor?: Marker): void
  }

  interface MarkerOptions {
    position: { lat: number; lng: number }
    map?: Map
    title?: string
    animation?: Animation
  }

  interface InfoWindowOptions {
    content?: string | Element
  }

  enum Animation {
    DROP,
    BOUNCE
  }

  class LatLng {
    constructor(lat: number, lng: number)
    lat(): number
    lng(): number
  }
} 