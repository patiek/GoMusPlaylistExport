# GoMusPlaylistExport
Google Music playlist exporter allowing Google Play Music playlist export with javascript.

# About
This code allows you to export your Google Music playlist into an M3U playlist file, CSV file, or a text file, allowing potential import into other applications (such as Spotify, rdio, SoundCloud, Tidal, Deezer, Groove, Napster).

# Usage
## Basic Usage
1. Open [Google Music](https://play.google.com/music/)
2. Navigate to the playlist you want to export in google music and ensure you have not scrolled down the page.
3. Open your browser's inspector window (in Chrome, right click > inspect element).
4. Copy & paste the javascript from exporter.js into the console tab of your inspector window and press enter.
5. View the page, a dialog prompt will ask you what type of playlist you would like to generate.
6. Scroll down the page, the exporter will scrape the playlist as you scroll, indicating number of songs scraped in lower right of browser.
7. After no new songs have been scraped for 10 seconds, the exporter will automatically initialize a file download of your playlist file.

## Importing Generated Playlist to Other Services
There are two options for importing the generated playlist:
#### Import using Soundiiz
1. Use [Soundiiz](http://soundiiz.com/) to connect to other music services (such as Spotify, rdio, SoundCloud, Tidal, Deezer, Groove, Napster).
2. Drag & Drop the generated m3u playlist file from Basic Usage steps above into Soundiiz.
3. Soundiiz will process your file and prompt you to select the services you connected in step 1 as the destination of your playlist.

#### Import using Ivy
1. Perform the steps under Basic Usage.
2. Use [Ivy](http://www.ivyishere.org/) to create a playlist file for Spotify from the playlist.txt file using the Copy/Paste functionality of Ivy to copy the text from the playlist.txt file.

## Options
The javascript takes two arguments which you will find on the last line:
#### maxTime 
##### default: -1
This is the time in seconds that the script waits for you to scroll the playlist before downloading the file. 
A -1 value indicates to wait until on new songs have been found for 10 seconds.
#### format
##### default: prompt
This is the format the script will download the file as. Supports 'prompt', 'm3u', 'ivy' and 'csv'. The 'prompt' value will generate an in-page dialog asking your to specify. 
If you need a custom format, you should download as a CSV and then open with spreadsheet software such as Excel or Google Docs.
