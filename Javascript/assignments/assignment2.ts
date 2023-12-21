class Video {
    title: string;
    length: number;
    format: string;
    platforms: string[];
  
    constructor(title: string, length: number, format: string, platforms: string[]) {
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
    private validateFormat() {
      if (this.format !== 'movie' && this.format !== 'show') {
        throw new Error('Invalid format. Format must be "movie" or "show".');
      }
    }
  
    private validatePlatforms() {
      const allowedPlatforms = ['YouTube', 'Netflix', 'Prime Videos', 'Apple+', 'Disney+'];
  
      if (!Array.isArray(this.platforms)) {// if its an array or not
        throw new Error('Platforms must be an array.');
      }
  
      // for of loop
      for (const platform of this.platforms) {
        if (!allowedPlatforms.includes(platform)) {
          throw new Error(`Invalid platform: ${platform}. Allowed platforms are ${allowedPlatforms.join(', ')}.`);
        }
      }
    }
  
    movieLength() {// length of movie in hours and minutes
      const hours = Math.floor(this.length / 60);//quotient
      const minutes = this.length % 60;// remainder modulus
      return `${hours} hours ${minutes} minutes`;// back ticks + js ${}
    }
  
    joinPlatform(newPlatform: string) {
      if (!this.platforms.includes(newPlatform)) {
        this.platforms.push(newPlatform);
      }
    }
  
    removePlatform(platformToRemove: string) {
      const platformIndex = this.platforms.indexOf(platformToRemove);
      if (platformIndex !== -1) {
        this.platforms.splice(platformIndex, 1);//remove 
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
  