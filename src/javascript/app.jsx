'use strict';

import React from 'react';
import SC from 'soundcloud';
import { moods } from './constants';
import { gifService } from './services';
import { musicService } from './services';

SC.initialize({
    // This needs to be changed - will need unique id from sound cloud.
    // http://soundcloud.com/you/apps
    client_id: 'CLIENT_ID'
});

const App = React.createClass({

    getInitialState: function() {
        return {};
    },

    render: function () {
        return (
            <div>
                {this.state.moodGif !== undefined ? this.renderMood(this.state.moodGif) : null}
                <div className="control-panel">
                    <div className="container">
                        <h1>{this.renderWordWithRedTitleLetter("moody")}</h1>
                        <div className="row">
                            {moods.map(function(mood) {
                                return (
                                    <div className="col-md-2 col-sm-6 col-xs-12" onClick={function(){this.moodChange(mood.mood);}.bind(this)}>
                                        <div className="mood-selector">
                                            {this.renderWordWithRedTitleLetter(mood.mood)}
                                        </div>
                                    </div>
                                );
                            }.bind(this))}
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    renderWordWithRedTitleLetter: function(mood) {
        return (
            <span><span className="title-letter">{mood.charAt(0)}</span>{mood.slice(1)}</span>
        );
    },

    moodChange: function(mood) {
        // Stop previous track
        if (this.state.player !== undefined) {
            this.state.player.pause();
        }

        gifService.getGifForMood(mood, function(data) {
            this.setState({moodGif : data});
        }.bind(this));

        musicService.getTrackForMood(mood, function(track) {
            // get a player for that track
            SC.stream('/tracks/' + track.id).then(function(player){
                player.play();
                this.setState({player: player});
            }.bind(this));
        });
    },

    renderMood: function(moodGif) {
        return (
            <video className="background-vid" loop autoPlay width="100%" height="100%" src={moodGif.data.images.original.mp4}>
                Sorry, your browser doesn't support embedded mp4 videos.
            </video>
        );
    }

});

React.render(<App />, document.getElementById('target'));
