class Student {
    firstName: string;
    lastName: string;
    assignmentMark: { K: number; T: number; C: number; A: number };
  
    static maxMark = { K: 30, T: 100, C: 25, A: 40 };
    static knowledgeWt = 20;
    static thinkingWt = 30;
    static communicationWt = 20;
    static applicationWt = 30;
  
    constructor(firstName: string, lastName: string, assignmentMark: { K: number; T: number; C: number; A: number }) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.assignmentMark = assignmentMark;
    }
  
    rawAvg(): number {
      const { K, T, C, A } = this.assignmentMark;
      return (K + T + C + A) / 4;
    }
  
    weightedAvg(): number {
      const { K, T, C, A } = this.assignmentMark;
      const totalWeightedMarks =
        K * Student.knowledgeWt + T * Student.thinkingWt + C * Student.communicationWt + A * Student.applicationWt;
      const totalWeight = Student.knowledgeWt + Student.thinkingWt + Student.communicationWt + Student.applicationWt;
      return totalWeightedMarks / totalWeight;
    }
  
    static classRawAvg(students: Student[]): number {
      const totalRawAvg = students.reduce((sum, student) => sum + student.rawAvg(), 0);
      return totalRawAvg / students.length;
    }
  
    static classWeightedAvg(students: Student[]): number {
      const totalWeightedAvg = students.reduce((sum, student) => sum + student.weightedAvg(), 0);
      return totalWeightedAvg / students.length;
    }
  }
  
  // Creating instances of students
  // object with a new keyword
  const student1 = new Student("Chatty", "Katty", { K: 5, T: 10, C: 25, A: 0 });
  const student2 = new Student("Lucky", "Roll", { K: 7, T: 7, C: 7, A: 7 });
  const student3 = new Student("Eh-ss", "Ian-da-ho", { K: 30, T: 100, C: 25, A: 40 });
  const student4 = new Student("Szo", "Klous", { K: 29, T: 99, C: 24, A: 39 });
  const student5 = new Student("Mi", "Dough", { K: 15, T: 50, C: 12.5, A: 20 });
  
  // Calculating averages
  console.log("Student 1 Weighted Average:", student1.weightedAvg());
  console.log("Class Raw Average:", Student.classRawAvg([student1, student2, student3, student4, student5]));
  console.log("Class Weighted Average:", Student.classWeightedAvg([student1, student2, student3, student4, student5]));
  