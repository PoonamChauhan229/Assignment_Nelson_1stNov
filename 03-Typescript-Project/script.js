"use strict";
class Video {
    constructor(title, length, format, platforms) {
        this.title = title;
        this.length = length;
        this.format = format;
        this.platforms = platforms;
        // Validate format
        this.validateFormat();
        // Validate platforms
        this.validatePlatforms();
    }
    //validations are for the arguments which you will be passing
    validateFormat() {
        if (this.format !== 'movie' && this.format !== 'show') {
            throw new Error('Invalid format. Format must be "movie" or "show".');
        }
    }
    validatePlatforms() {
        const allowedPlatforms = ['YouTube', 'Netflix', 'Prime Videos', 'Apple+', 'Disney+'];
        if (!Array.isArray(this.platforms)) { // if its an array or not
            throw new Error('Platforms must be an array.');
        }
        // for of loop
        for (const platform of this.platforms) {
            if (!allowedPlatforms.includes(platform)) {
                throw new Error(`Invalid platform: ${platform}. Allowed platforms are ${allowedPlatforms.join(', ')}.`);
            }
        }
    }
    movieLength() {
        const hours = Math.floor(this.length / 60); //quotient
        const minutes = this.length % 60; // remainder modulus
        return `${hours} hours ${minutes} minutes`; // back ticks + js ${}
    }
    joinPlatform(newPlatform) {
        if (!this.platforms.includes(newPlatform)) {
            this.platforms.push(newPlatform);
        }
    }
    removePlatform(platformToRemove) {
        const platformIndex = this.platforms.indexOf(platformToRemove);
        if (platformIndex !== -1) {
            this.platforms.splice(platformIndex, 1); //remove 
        }
    }
}
// Example usage:
const video = new Video('Sample Movie', 120, 'movie', ['YouTube', 'Netflix']);
console.log(video.movieLength()); // Output: 2 hours 0 minutes
video.joinPlatform('Prime Videos');
console.log(video.platforms); // Output: ['YouTube', 'Netflix', 'Prime Videos']
video.removePlatform('Netflix');
console.log(video.platforms); // Output: ['YouTube', 'Prime Videos']
class Platform {
    constructor(title) {
        this.title = title;
        this.videos = [];
    }
    addVideo(video) {
        if (!(video instanceof Video)) {
            throw new Error('Invalid video instance.');
        }
        this.videos.push(video);
    }
    createVideo(title, length, format) {
        const newVideo = new Video(title, length, format, [this.title]);
        this.addVideo(newVideo);
    }
    removeVideo(title) {
        this.videos = this.videos.filter(video => video.title !== title);
    }
    listVideos() {
        console.log(`Videos on ${this.title} platform:`);
        this.videos.forEach(video => console.log(video.title));
    }
}
// Create instances of the Video class
const video1 = new Video('Action Movie', 120, 'movie', ['YouTube']);
const video2 = new Video('Comedy Show', 30, 'show', ['Netflix']);
// Create an instance of the Platform class
const netflix = new Platform('Netflix');
// Add videos to the platform using the addVideo method
netflix.addVideo(video1);
netflix.addVideo(video2);
// List videos on the platform
netflix.listVideos(); // Output: Videos on Netflix platform:\nAction Movie\nComedy Show
// Create a new video on the platform using the createVideo method
netflix.createVideo('Drama Movie', 150, 'movie');
// List videos again to see the updated list
netflix.listVideos(); // Output: Videos on Netflix platform:\nAction Movie\nComedy Show\nDrama Movie
// Remove a video from the platform using the removeVideo method
netflix.removeVideo('Comedy Show');
// List videos again to see the updated list
netflix.listVideos(); // Output: Videos on Netflix platform:\nAction Movie\nDrama Movie
