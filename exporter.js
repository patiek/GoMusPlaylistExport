(function (maxWait,plstype){

    var self = this,
        downloaded = false,
        playlistEntries={},
        format = plstype,
        dialog;

    this.totalWait = 0;
    this.totalWaitSinceChange = 0;
    this.totalSongs = 0;

    this.quoteEscape = function(text) {
        return '"'+text.replace('"','""')+'"';
    };

    this.scrape = function() {
        var playlist = document.querySelectorAll('.song-table tr.song-row');
        for (var i = 0; i < playlist.length; i++) {
            var l = playlist[i],
                title = l.querySelectorAll('td[data-col="title"] .content')[0].textContent,
                artist = l.querySelectorAll('td[data-col="artist"] .content')[0].textContent,
                album = l.querySelectorAll('td[data-col="album"] .content')[0].textContent,
                duration = l.querySelectorAll('td[data-col="duration"] span')[0].textContent,
                lineFormat;
            if (self.format == 'ivy') {
                lineFormat = artist.replace('-', ' ').trim() + ' - ' + title.replace(/(.+?)\s*[\(\[].+[\)\]]\s*$/, '$1').trim();
            } else if (self.format == 'm3u') {
                var durationParts = duration.split(':'),
                    totalSeconds;

                if (durationParts.length === 3) {
                    totalSeconds = parseInt(durationParts[0],10) * 3600 + parseInt(durationParts[1],10) * 60 + parseInt(durationParts[2],10);
                } else if (durationParts.length == 2) {
                    totalSeconds = parseInt(durationParts[0],10) * 60 + parseInt(durationParts[1],10);
                } else {
                    totalSeconds = -1;
                }

                lineFormat = '#EXTINF:' + totalSeconds + ','
                    + artist.replace('-', ' ').trim()
                    + ' - '
                    + title.replace(/(.+?)\s*[\(\[].+[\)\]]\s*$/, '$1').trim()
                    + "\n"
                    + album.trim()
                    + '/'
                    + artist.replace('-', ' ').trim()
                    + ' - '
                    + title.replace(/(.+?)\s*[\(\[].+[\)\]]\s*$/, '$1').trim()
                    + '.mp3'
            } else {
                lineFormat = quoteEscape(artist)+','+quoteEscape(title)+','+quoteEscape(album)+','+quoteEscape(duration);
            }
            if (!playlistEntries.hasOwnProperty(lineFormat)) {
                self.totalSongs++;
                self.totalWaitSinceChange = 0;
                playlistEntries[lineFormat] = {
                    artist: artist,
                    title: title,
                    album: album,
                    duration: duration
                }
            }
        }
    };

    this.download = function() {
        if (downloaded) return;
        downloaded = true;
        var csvContent,
            downloadAnchor,
            downloadBlob,
            type,
            filename;
        csvContent = '';
        for (var line in playlistEntries) {
            csvContent += line + "\n";
        }
        if (self.format == 'ivy') {
            type = 'text';
            filename = 'playlist.txt';
        } else if (self.format == 'm3u') {
            csvContent = "#EXTM3U\n" + csvContent;
            type = 'text/m3u';
            filename = 'playlist.m3u';
        } else {
            type = 'text/csv';
            filename = 'playlist.csv';
        }
        downloadAnchor = document.createElement('a');
        downloadBlob = new Blob([csvContent], {'type': type});
        downloadAnchor.href = window.URL.createObjectURL(downloadBlob);
        downloadAnchor.download = filename;
        downloadAnchor.click();
    };

    this.scrollAll = function() {
        self.scrape();
        if (downloaded) {
            return;
        }
        var timeUntilDownload = maxWait >= 0 ? maxWait*1000 - self.totalWait: 9000 - self.totalWaitSinceChange;
        if (timeUntilDownload > 0) {
            self.totalWait += 50; // close enough
            self.totalWaitSinceChange += 50;
            self.statusBox.innerHTML = 'Download in ' + Math.round(timeUntilDownload/1000) + ' seconds; Songs: ' + self.totalSongs;
            setTimeout(function(){self.scrollAll();}, 50);
        } else {
            download();
        }
    };

    this.begin = function() {
        self.dialog.close();
        var playlistSelect = document.getElementById('playlist-format');
        self.format = playlistSelect.options[playlistSelect.selectedIndex].value;
        self.scrape();
        self.scrollAll();
        return false;
    };

    self.totalSongs = 0;
    self.statusBox = document.createElement('div');
    self.statusBox.style.position = 'fixed';
    self.statusBox.style.bottom = '0';
    self.statusBox.style.right = '0';
    self.statusBox.style.background = '#CCC';
    self.statusBox.style.zIndex = 999999;
    self.statusBox.innerHTML = 'Songs: 0';
    document.body.appendChild(self.statusBox);

    if (plstype === 'prompt') {
        self.dialog = document.createElement('dialog');
        self.dialog.innerHTML = '<form onsubmit="return self.begin()"><strong>Select Format:</strong><select id="playlist-format">'
            +'<option value="m3u">M3U (Generic, soundiiz.com, etc.)</option>'
            +'<option value="csv">CSV (Generic CSV)</option>'
            +'<option value="ivy">IVY (ivyishere.org)</option>'
            +'</select> <input type="submit" value="Begin"/></dialog>';
        document.body.appendChild(self.dialog);
        self.dialog.showModal();
    } else {
        self.begin();
    }

})(-1,'prompt');
