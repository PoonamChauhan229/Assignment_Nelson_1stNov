class Platform {
    title: string;
    videos: Video[];
  
    constructor(title: string) {
      this.title = title;
      this.videos = [];
    }
  
    addVideo(video: Video): void {
      if (!(video instanceof Video)) {
        throw new Error('Invalid video instance.');
      }
  
      if (!video.platforms.includes(this.title)) {
        throw new Error(`The video must be on ${this.title} platform.`);
      }
  
      this.videos.push(video);
    }
  
    createVideo(title: string, length: number, format: 'movie' | 'show'): void {
      const newVideo = new Video(title, length, format, [this.title]);
      this.addVideo(newVideo);
    }
  
    removeVideo(title: string): void {
      this.videos = this.videos.filter(video => video.title !== title);
    }
  
    listVideos(): void {
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
