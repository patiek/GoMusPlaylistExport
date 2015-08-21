(function (maxWait,format){

    var self = this,
        downloaded = false,
        playlistEntries={},
        totalWait=0;

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
                lineFormat;
            if (format=='ivy') {
                lineFormat = artist.replace('-',' ').trim() + ' - ' + title.replace(/(.+?)\s*[\(\[].+[\)\]]\s*$/, '$1').trim();
            } else {
                lineFormat = quoteEscape(artist)+','+quoteEscape(title)+','+quoteEscape(album);
            }
            playlistEntries[lineFormat] = {
                artist: artist,
                title: title,
                album: album
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
        if (format=='ivy') {
            type = 'text';
            filename = 'playlist.txt';
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
        if (!downloaded && totalWait < maxWait*1000) {
            totalWait += 200; // close enough
            setTimeout(function(){self.scrollAll();}, 200);
        } else if (!downloaded) {
          download();
        }
    };

    this.scrape();
    this.scrollAll();
})(30,'ivy');
