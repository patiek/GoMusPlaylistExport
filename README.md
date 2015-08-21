# GoMusPlaylistExport
Google Music playlist exporter allowing Google Play Music playlist export with javascript.

# About
This code allows you to export your Google Music playlist into a CSV file or a text file, allowing potential import into other applications (such as Spotify).

# Usage
## Basic Usage
1. Open [Google Music](https://play.google.com/music/)
2. Navigate to the playlist you want to export in google music and ensure you have not scrolled down the page.
3. Open your browser's inspector window (in Chrome, right click > inspect element).
4. Copy & paste the javascript from exporter.js into the console tab of your inspector window and press enter.
5. Scroll down the page at a good pace, the exporter will scrape the playlist as you scroll.
6. After 30 seconds, the exporter will automatically initialize a file download of your playlist file.

## Exporting to Spotify
1. Perform the steps under Basic Usage.
2. Use [Ivy](http://www.ivyishere.org/) to create a playlist file for Spotify from the playlist.txt file using the Copy/Paste functionality of Ivy to copy the text from the playlist.txt file.

## Options
The javascript takes two arguments which you will find on the last line:
#### maxTime 
##### default: 30
This is the time in seconds that the script waits for you to scroll the playlist before downloading the file.
#### format
##### default: ivy
This is the format the script will download the file as. Supports 'ivy' and 'csv'. If you need a custom format, you should download as a CSV and then open with spreadsheet software such as Excel or Google Docs.
