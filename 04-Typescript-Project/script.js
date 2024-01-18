"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
class Animal {
    constructor(species, attackPower, defensePower, healthPoints) {
        this.species = species;
        this.attackPower = attackPower;
        this.defensePower = defensePower;
        this.healthPoints = healthPoints;
    }
    attack(enemy) {
        const minDamage = this.attackPower / 10;
        const maxDamage = (this.attackPower * 2);
        const actualDamage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
        enemy.healthPoints -= actualDamage;
        return actualDamage;
    }
    isDead() {
        return this.healthPoints <= 0;
    }
}
function battle(animal1, animal2) {
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
    }
    else {
        console.log(`${animal1.species} has won!`);
    }
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function getUserAnimalInput(promptMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        let species;
        while (true) {
            species = yield getUserInput(promptMessage);
            if (["bull", "tiger", "eagle"].includes(species.toLowerCase())) {
                break;
            }
            else {
                console.log("Invalid animal name. Please choose from bull, tiger, or eagle.");
            }
        }
        return new Animal(species, 50, 30, 200);
    });
}
function getUserInput(promptMessage) {
    return new Promise((resolve) => {
        rl.question(promptMessage, (answer) => {
            resolve(answer);
        });
    });
}
function startBattle() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Welcome to animal battle! You can choose two animals to fight each other. The options are bull, tiger, and eagle.");
        const animal1 = yield getUserAnimalInput("What is the first animal? ");
        const animal2 = yield getUserAnimalInput("What is the second animal? ");
        battle(animal1, animal2);
        rl.close();
    });
}
startBattle();
