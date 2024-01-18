import * as readline from 'readline';

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
    const maxDamage = (this.attackPower * 2);
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
    console.log(`==============`);
    console.log(`Round ${round}`);

    const animal1Damage = animal1.attack(animal2);
    console.log(`${animal1.species} did ${animal1Damage} damage to ${animal2.species}!`);
    console.log(`${animal2.species} now has ${animal2.healthPoints} HP.`);

    const animal2Damage = animal2.attack(animal1);
    console.log(`${animal2.species} did ${animal2Damage} damage to ${animal1.species}!`);
    console.log(`${animal1.species} now has ${animal1.healthPoints} HP.`);

    round++;
  }

  console.log(`==============`);
  if (animal1.isDead()) {
    console.log(`${animal2.species} has won!`);
  } else {
    console.log(`${animal1.species} has won!`);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function getUserAnimalInput(promptMessage: string): Promise<Animal> {
  let species: string;
  while (true) {
    species = await getUserInput(promptMessage);
    if (["bull", "tiger", "eagle"].includes(species.toLowerCase())) {
      break;
    } else {
      console.log("Invalid animal name. Please choose from bull, tiger, or eagle.");
    }
  }

  return new Animal(species, 50, 30, 200);
}

function getUserInput(promptMessage: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(promptMessage, (answer) => {
      resolve(answer);
    });
  });
}

async function startBattle() {
  console.log("Welcome to animal battle! You can choose two animals to fight each other. The options are bull, tiger, and eagle.");

  const animal1 = await getUserAnimalInput("What is the first animal? ");
  const animal2 = await getUserAnimalInput("What is the second animal? ");

  battle(animal1, animal2);

  rl.close();
}

startBattle();
