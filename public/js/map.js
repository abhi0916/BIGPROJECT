    mapboxgl.accessToken =  mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: "mapbox://styles/maobox/streets-v12",
        center: coordinates,  // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    

    const marker = new mapboxgl.Marker()
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML("<h1>Hello World!</h1>"))
    .addTo(map);
 