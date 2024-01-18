class Animal {
    species: string;
    attackPower: number;
    defensePower: number;
    healthPoints: number;
  
    constructor(species: string, attackPower: number, defensePower: number, healthPoints: number) {
      this.species = species;
      this.attackPower = attackPower;
      this.defensePower = defensePower;
      this.healthPoints = healthPoints;
    }
  
    attack(enemy: Animal): number {
      const minDamage = this.attackPower / 10;
      const maxDamage = (this.attackPower * 100) / (100 + enemy.defensePower);
  
      const actualDamage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
  
      enemy.healthPoints -= actualDamage;
  
      return actualDamage;
    }
  
    isDead(): boolean {
      return this.healthPoints <= 0;
    }
  }
  
  function battle(animal1: Animal, animal2: Animal): void {
    let round = 1;
  
    while (!animal1.isDead() && !animal2.isDead()) {
      console.log(`Round ${round}`);
      const animal1Damage = animal1.attack(animal2);
      const animal2Damage = animal2.attack(animal1);
  
      console.log(`${animal1.species} attacks ${animal2.species} and deals ${animal1Damage} damage.`);
      console.log(`${animal2.species} attacks ${animal1.species} and deals ${animal2Damage} damage.`);
  
      console.log(`${animal1.species} health: ${animal1.healthPoints}`);
      console.log(`${animal2.species} health: ${animal2.healthPoints}`);
      
      round++;
    }
  
    if (animal1.isDead()) {
      console.log(`${animal1.species} has been defeated!`);
    } else {
      console.log(`${animal2.species} has been defeated!`);
    }
  }
  
  // Example usage
  const bull = new Animal("Bull", 45, 145, 300);
  const tiger = new Animal("Tiger", 100, 70, 200);
  const eagle = new Animal("Eagle", 75, 110, 250);
  
  battle(bull, tiger);
  