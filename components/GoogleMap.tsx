"use client"

import { useEffect, useRef } from 'react'

interface GoogleMapProps {
  latitude: number
  longitude: number
  address: string
}

const GoogleMap = ({ latitude, longitude, address }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)

  useEffect(() => {
    const mapElement = mapRef.current
    if (!mapElement) return

    const initMap = () => {
      const mapOptions: google.maps.MapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 20,
        mapTypeId: 'satellite',
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        scaleControl: false,
        rotateControl: false,
        panControl: false,
        disableDefaultUI: true,
        tilt: 45,
      }

      // Create the map instance
      const map = new google.maps.Map(mapElement, mapOptions)
      mapInstanceRef.current = map

      // Create a marker
      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: address,
        animation: google.maps.Animation.DROP,
      })
      markerRef.current = marker

      // Create an info window with styled content
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; font-family: Arial, sans-serif;">
            <strong style="font-size: 14px; color: #333;">${address}</strong>
          </div>
        `,
      })

      // Add click listener to marker
      marker.addListener("click", () => {
        infoWindow.open(map, marker)
      })

      // Open info window by default
      infoWindow.open(map, marker)
    }

    initMap()

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null)
      }
      mapInstanceRef.current = null
      markerRef.current = null
    }
  }, [latitude, longitude, address])

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default GoogleMap 