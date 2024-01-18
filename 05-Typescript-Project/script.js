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
var Choice;
(function (Choice) {
    Choice["Rock"] = "rock";
    Choice["Paper"] = "paper";
    Choice["Scissors"] = "scissors";
})(Choice || (Choice = {}));
const getEnumValues = (enumObj) => {
    return Object.keys(enumObj).map(key => enumObj[key]);
};
const isValidChoice = (input) => {
    return getEnumValues(Choice).includes(input);
};
const getRandomChoice = () => {
    const choices = getEnumValues(Choice);
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};
const getUserChoice = () => __awaiter(void 0, void 0, void 0, function* () {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question('Enter your choice (rock, paper, scissors, or exit): ', (userChoiceInput) => {
            rl.close();
            if (!userChoiceInput) {
                resolve('exit');
                return;
            }
            const normalizedInput = userChoiceInput.toLowerCase();
            if (normalizedInput === 'exit') {
                resolve('exit');
            }
            else if (isValidChoice(normalizedInput)) {
                resolve(normalizedInput);
            }
            else {
                console.log('Invalid input. Please choose rock, paper, or scissors.');
                resolve(getUserChoice());
            }
        });
    });
});
const playRound = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
        return 'It\'s a tie!';
    }
    if ((userChoice === Choice.Rock && computerChoice === Choice.Scissors) ||
        (userChoice === Choice.Paper && computerChoice === Choice.Rock) ||
        (userChoice === Choice.Scissors && computerChoice === Choice.Paper)) {
        return 'You win!';
    }
    return 'You lose!';
};
const playGame = () => __awaiter(void 0, void 0, void 0, function* () {
    let score = { wins: 0, losses: 0, ties: 0 };
    let cheatingEnabled = false;
    while (score.losses < 10) {
        const userChoice = yield getUserChoice();
        if (userChoice === 'exit') {
            break;
        }
        const computerChoice = cheatingEnabled && Math.random() < 0.25
            ? getRandomChoice()
            : getRandomChoice();
        console.log(`Computer chose: ${computerChoice}`);
        const result = playRound(userChoice, computerChoice);
        if (result === 'You lose!') {
            score.losses++;
        }
        else if (result === 'You win!') {
            score.wins++;
        }
        else {
            score.ties++;
        }
        console.log(`Score - Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
    }
    console.log('Game over. Thanks for playing!');
});
playGame();
// npm i --save-dev @types/node
