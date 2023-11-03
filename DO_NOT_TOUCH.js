// Load JSON text from a server-hosted file and return a JSON parsed object
function loadJSON(filePath) {
    // Load the JSON file;
    const json = loadTextFileAjaxSync(filePath, "application/json");
    // Parse JSON
    return JSON.parse(json);
}

// Load text with Ajax synchronously: takes a path to a file and an optional MIME type
function loadTextFileAjaxSync(filePath, mimeType) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    if (mimeType != null) {
        if (xmlhttp.overrideMimeType) {
            xmlhttp.overrideMimeType(mimeType);
        }
    }
    xmlhttp.send();
    if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
        return xmlhttp.responseText;
    } else {
        // TODO: Throw an exception or handle the error
        return null;
    }
}


