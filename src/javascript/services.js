'use strict';

import $ from 'jquery';
import SC from 'soundcloud';

// The default one is giphy's public beta key. If putting this public, you should generate your own at http://api.giphy.com/submit.
var giphyApiKey = 'dc6zaTOxFJmzC';

export var gifService = {

    getGifForMood: function(mood, onSuccess, onError) {
        $.ajax({
            url: 'http://api.giphy.com/v1/gifs/translate?s=' + mood + '&api_key=' + giphyApiKey,
            method: 'GET',
            success: onSuccess,
            error: onError
        });
    }

};

export var musicService = {

    getTrackForMood: function(mood, onSuccess) {
        SC.get('/tracks', {
            // Only get tracks that are licensed 'creative commons'
            q: mood, license: 'cc-by-sa'
        }).then(function(tracks) {
            // pick a random track
            onSuccess(tracks[Math.floor(Math.random()*tracks.length)]);
        });
    }

};