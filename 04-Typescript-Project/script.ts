import * as readline from 'readline';

enum Choice {
  Rock = 'rock',
  Paper = 'paper',
  Scissors = 'scissors',
}

interface Score {
  wins: number;
  losses: number;
  ties: number;
}

const getEnumValues = <T extends Record<string, string>>(enumObj: T): Array<T[keyof T]> => {
  return Object.keys(enumObj).map(key => enumObj[key as keyof T]);
};

const isValidChoice = (input: string): input is Choice => {
  return getEnumValues(Choice).includes(input as Choice);
};

const getRandomChoice = (): Choice => {
  const choices = getEnumValues(Choice);
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const getUserChoice = async (): Promise<Choice | 'exit'> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<Choice | 'exit'>((resolve) => {
    rl.question('Enter your choice (rock, paper, scissors, or exit): ', (userChoiceInput) => {
      rl.close();

      if (!userChoiceInput) {
        resolve('exit');
        return;
      }

      const normalizedInput = userChoiceInput.toLowerCase();
      if (normalizedInput === 'exit') {
        resolve('exit');
      } else if (isValidChoice(normalizedInput)) {
        resolve(normalizedInput as Choice);
      } else {
        console.log('Invalid input. Please choose rock, paper, or scissors.');
        resolve(getUserChoice());
      }
    });
  });
};

const playRound = (userChoice: Choice, computerChoice: Choice): string => {
  if (userChoice === computerChoice) {
    return 'It\'s a tie!';
  }

  if (
    (userChoice === Choice.Rock && computerChoice === Choice.Scissors) ||
    (userChoice === Choice.Paper && computerChoice === Choice.Rock) ||
    (userChoice === Choice.Scissors && computerChoice === Choice.Paper)
  ) {
    return 'You win!';
  }

  return 'You lose!';
};

const playGame = async (): Promise<void> => {
  let score: Score = { wins: 0, losses: 0, ties: 0 };
  let cheatingEnabled = false;

  while (score.losses < 10) {
    const userChoice = await getUserChoice();

    if (userChoice === 'exit') {
      break;
    }

    const computerChoice: Choice = cheatingEnabled && Math.random() < 0.25
      ? getRandomChoice()
      : getRandomChoice();

    console.log(`Computer chose: ${computerChoice}`);
    const result = playRound(userChoice, computerChoice);

    if (result === 'You lose!') {
      score.losses++;
    } else if (result === 'You win!') {
      score.wins++;
    } else {
      score.ties++;
    }

    console.log(`Score - Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
  }

  
  console.log('Game over. Thanks for playing!');
};

playGame();
// npm i --save-dev @types/node
