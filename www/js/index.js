function handleOpenURL(url) {
    setTimeout(function() {
        Metrix.appWillOpenUrl(url);
    }, 0);
}
    
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        this.initMetrix();
    },

    initMetrix: function () {
        var metrixConfig = new MetrixConfig("yfgetewbvkowsze");

        metrixConfig.setOnAttributionChangeListener(function(attribution) {
            console.log("[MetrixExample]: Attribution callback received.");
            console.log("[MetrixExample]: acquisitionAd = " + attribution.acquisitionAd);
            console.log("[MetrixExample]: acquisitionAdSet = " + attribution.acquisitionAdSet);
            console.log("[MetrixExample]: acquisitionCampaign = " + attribution.acquisitionCampaign);
            console.log("[MetrixExample]: acquisitionSource = " + attribution.acquisitionSource);
            console.log("[MetrixExample]: attributionStatus = " + attribution.attributionStatus);
        });

        // metrixConfig.setFirebaseAppId("myFirebaseAppId");

        metrixConfig.setShouldLaunchDeeplink(true);
        metrixConfig.setOnDeeplinkResponseListener(function(deeplink) {
            console.log("[MetrixExample]: Deeplink callback received. deeplink: " + deeplink);
        });

        metrixConfig.setLocationListening(true);
        metrixConfig.setEventUploadThreshold(50);
        metrixConfig.setEventUploadMaxBatchSize(200);
        metrixConfig.setEventMaxCount(1500);
        metrixConfig.setEventUploadPeriodMillis(15000);
        metrixConfig.setSessionTimeoutMillis(180000);
        metrixConfig.setDefaultTracker("trackerToken");
        metrixConfig.setAppSecret(12345, 12345, 12345, 12345, 12345);
        metrixConfig.setStore("google play");

        metrixConfig.setOnReceiveUserIdListener(function(metrixUserId) {
            console.log("[MetrixExample]: UserId listener called. ID: " + metrixUserId);
        });

        metrixConfig.setOnSessionIdListener(function(metrixSessionId) {
            console.log("[MetrixExample]: SessionId listener called. ID: " + metrixSessionId);
        });

        Metrix.create(metrixConfig);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('[MetrixExample]: Received Event: ' + id);

        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        var btnTrackSimpleEvent = document.getElementById("btnSendEvent");
        var btnTrackFeaturedEvent = document.getElementById("btnSendEventWithAttributes");
        
        var btnGetSessionNum = document.getElementById("btnGetSessionNum");
        
        var btnAddAttributes = document.getElementById("btnAddAttributes");
        
        var btnSendSimpleRevenue = document.getElementById("btnSendSimpleRevenue");
        var btnSendFullRevenue = document.getElementById("btnSendFullRevenue");
        
        btnTrackSimpleEvent.addEventListener('click', function() {
            Metrix.newEvent("nkrza")
        }, false);

        btnTrackFeaturedEvent.addEventListener('click', function() {
            var attributes = {};
            attributes['first_name'] = 'Ali';
            attributes['last_name'] = 'Bagheri';
            attributes['manufacturer'] = 'Nike';
            attributes['product_name'] = 'shirt';
            attributes['type'] = 'sport';
            attributes['size'] = 'large';
            Metrix.newEvent("qqwnq", attributes)
        }, false);

        btnGetSessionNum.addEventListener('click',function() { 
            Metrix.getSessionNum(function(sessionNum) {
                btnGetSessionNum.innerHTML = "session number: " + sessionNum;
            });
        }, false);

        btnAddAttributes.addEventListener('click', function() {
            var attributes = {};
            attributes['first'] = 'Ken';
            attributes['last'] = 'Adams';
            Metrix.addUserAttributes(attributes);
        }, false);

        btnSendSimpleRevenue.addEventListener('click', function() {
            Metrix.newRevenue('ftlrc', 3200.55);
        }, false);

        btnSendFullRevenue.addEventListener('click', function() {
            Metrix.newRevenue('zpfll', 35500.155, 0, '150');
        }, false);
    }
};

app.initialize();