OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function(options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        ); 
        this.handler = new OpenLayers.Handler.Click(
            this, {
                'click': this.trigger
            }, this.handlerOptions
        );
    }, 

    trigger: function(e) {
        // console.log(e);
        var lonlat = map.getLonLatFromPixel(e.xy);
        // var lonlat = map.getLonLatFromViewPortPx(e.xy);
        convertWGS84(lonlat.lon, lonlat.lat);
        // console.log("You clicked near " + lonlat.lat + " N, " + lonlat.lon + " E");
    }

});