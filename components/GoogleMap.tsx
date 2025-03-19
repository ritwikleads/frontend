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
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
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

      // Create an info window
      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 8px;">${address}</div>`,
      })

      // Add click listener to marker
      marker.addListener("click", () => {
        infoWindow.open(map, marker)
      })
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
    <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-md">
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default GoogleMap 