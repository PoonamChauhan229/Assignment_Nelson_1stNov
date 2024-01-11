type Choice = "rock" | "paper" | "scissors";
type Result = "win" | "loss" | "tie";

class RPSGame {
    private userWins: number = 0;
    private cpuWins: number = 0;
    private ties: number = 0;
    private cpuCheating: boolean = false;
    private totalLosses: number = 0;

    private choices: Choice[] = ["rock", "paper", "scissors"];

    private getUserChoice(): Choice {
        const userInput: string = prompt("Enter your choice (rock, paper, scissors) or type 'exit' to stop playing:");

        if (userInput.toLowerCase() === "exit") {
            this.endGame();
        }

        const userChoice: Choice = userInput.toLowerCase() as Choice;

        if (this.choices.includes(userChoice)) {
            return userChoice;
        } else {
            console.log("Invalid choice. Please choose rock, paper, or scissors.");
            return this.getUserChoice();
        }
    }

    private getCpuChoice(): Choice {
        if (this.cpuCheating && Math.random() < 0.25) {
            console.log("CPU is cheating!");
            return this.choices[Math.floor(Math.random() * this.choices.length)];
        } else {
            return this.choices[Math.floor(Math.random() * this.choices.length)];
        }
    }

    private determineWinner(userChoice: Choice, cpuChoice: Choice): Result {
        if (userChoice === cpuChoice) {
            this.ties++;
            return "tie";
        } else if (
            (userChoice === "rock" && cpuChoice === "scissors") ||
            (userChoice === "paper" && cpuChoice === "rock") ||
            (userChoice === "scissors" && cpuChoice === "paper")
        ) {
            this.userWins++;
            return "win";
        } else {
            this.cpuWins++;
            return "loss";
        }
    }

    private printScore(): void {
        console.log(`Wins: ${this.userWins} | Losses: ${this.cpuWins} | Ties: ${this.ties}`);
    }

    private endGame(): void {
        console.log("Game over. Thanks for playing!");
        process.exit();
    }

    public playRound(): void {
        const userChoice: Choice = this.getUserChoice();
        const cpuChoice: Choice = this.getCpuChoice();

        console.log(`You chose: ${userChoice}`);
        console.log(`CPU chose: ${cpuChoice}`);

        const result: Result = this.determineWinner(userChoice, cpuChoice);

        console.log(`Result: ${result}`);
        this.printScore();

        if (result === "loss") {
            this.totalLosses++;

            if (this.totalLosses >= 10) {
                this.cpuCheating = true;
                console.log("CPU is now cheating!");
            }
        }

        console.log("---------------");

        if (this.cpuWins >= 10) {
            console.log("CPU wins too many times. Game over!");
            this.endGame();
        }

        this.playRound();
    }
}

const game = new RPSGame();
game.playRound();
