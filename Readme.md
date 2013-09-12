# transmission-web

transmission-web provides web interface for [Transmission](http://transmissionbt.com/) using [ExtJS 4](http://www.sencha.com/products/extjs)

# Usage

### Using Environment Variables
If you're just trying transmission-web out, it is recommended to set the TRANSMISSION_WEB_HOME environment variable to the root path of this web client. Then you just need to open the location to the transmission web server (e.g. localhost:9091) and it will work.

### Installation
Move the transmission-web files in the right location, and the next time you start Transmission, it will use transmission-web. If you're using the daemon, you can simply send it a `SIGHUB`.

#### Linux
Without overwriting the default Web Interface, you can drop the transmission-web files into: `~/.local/share/transmission/web/`.

## Screenshots
[![](https://raw.github.com/fanatid/transmission-web/screenshots/screen1.thumb.png)](https://raw.github.com/fanatid/transmission-web/screenshots/screen1.png)
[![](https://raw.github.com/fanatid/transmission-web/screenshots/screen2.thumb.png)](https://raw.github.com/fanatid/transmission-web/screenshots/screen2.png)
[![](https://raw.github.com/fanatid/transmission-web/screenshots/screen3.thumb.png)](https://raw.github.com/fanatid/transmission-web/screenshots/screen3.png)
