# Giphy / SoundCloud Mashup

**Small site using the Giphy and SoundCloud APIs**

**Developed with Gulp, Browserify, BabelJS, Less, React, Bootstrap and ES6.**

This is a small, single-page site that allows the user to pick from six moods (sad, happy, excited, angry, love or sleepy).

Based on the selected mood, it retrieves an mp4 from giphy (http://api.giphy.com/) and a track from soundcloud (https://developers.soundcloud.com/).

**Motivation**:
- To learn node and npm
- To learn gulp, browserify and babel
- To try out ES6 imports and exports
- To show how great React js is :-D

**Installation Instructions**:
- Install node (https://nodejs.org)
- Run ``npm install``
- Edit the ``src/javascripts/app.jsx`` replacing ``client_id`` with your soundcloud application ID (you can generate one at http://soundcloud.com/you/apps)
- Edit the ``src/javascripts/services.js`` replacing the ``giphyApiKey`` with your own (the default one is their public beta, you can get your own at http://api.giphy.com/submit)
- Run ``gulp build``

The installation process may require Gulp to be installed as a global package. Run ``npm install --global gulp`` if necessary.

Production Builds:
- Run ``gulp build --production``

When deploying, it is highly recommended to build with the ``--production`` flag. The *production* build is much smaller in size.

**Running Instructions**:
- Run ``npm start``
- Browse ``http://localhost:8080/``

**Development Instructions**:
- Run ``gulp build``
- Run ``gulp watch``

You can now edit any files in your ``src/`` directory and the appropriate re-compilation steps will be taken for you. Refresh your browser page to view your changes.

**Further Work**:
- Make the site mobile friendly (video should render in the background and music should play, or at least have usable controls).
- There is an issue with the track not __always__ changing when the image does.
- Should be made to use Redux (https://github.com/rackt/redux) for state.
- Add basic music controls (mute, volume and image that comes with track, static in bottom right corner of page?)
- Make music search better (at the moment we just search on mood, we can probably use the SC api better).
- Display an error to the user is we his the Rate Limit on sound cloud (https://developers.soundcloud.com/docs/api/rate-limits#play-requests)
- Make music loop (select a new track after the current one ends?)
- Gif service should use promises (jQuery defer) to bring it in line with the music service.
- Provide a link service, so people can share combinations of track / gif that they like.
- Ensure correct terms of use of giphy and soundcloud APIs (do we need to mention them on the page somewhere?)


Resources:
- Gulp http://gulpjs.com/
- Browserify http://browserify.org/
- BabelJS https://babeljs.io/
- React http://facebook.github.io/react/
- Bootstrap http://getbootstrap.com/
- Giphy http://api.giphy.com/
- SoundCloud https://developers.soundcloud.com/
