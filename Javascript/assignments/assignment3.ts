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
  