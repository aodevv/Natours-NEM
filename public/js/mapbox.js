/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoibDNlZHNzYSIsImEiOiJjbDg3OWNyYWEwZXdyM3ZwNmt0NTZ3YzIyIn0.gy5BdP1A2ZhQEFC4JchaLQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/l3edssa/cl87a2h2g007o14nt8a36vnqu',
  scrollZoom: false
  // center: [-118.113493,34.111745],
  // zoom: 4,
  // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create a marker
  const el = document.createElement('div');
  el.className = 'marker';

  console.log(loc);
  // Add the marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include new locations
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
