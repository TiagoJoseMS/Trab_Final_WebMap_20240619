// Define a basic style for individual features within the cluster or if clustering is off.
// The main cluster styling (size, text) is handled in layers.js.
var style_SouthAmericaVIIRSNOAA2124hrsfireshotspots_5 = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 5.0, // Base radius for a single point
        stroke: new ol.style.Stroke({color: 'rgba(128,17,25,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1.52}), 
        fill: new ol.style.Fill({color: 'rgba(219,30,42,1.0)'})
    })
});

// Note: The createTextStyle function is expected to be defined globally, typically in resources/functions.js
// The cluster-specific text (count) is added by the style function within layers.js.

