/* eslint-disable no-undef */
/* eslint-disable no-console */
// CODE here for your Lambda Classes

//Classes
class Person {
  constructor(attributes) {
    this.age = attributes.age;
    this.name = attributes.name;
    this.location = attributes.location;
  }

  speak() {
    console.log(`Hello my name is ${this.name}, I am from ${this.location}`);
  }
}

class Instructor extends Person {
  constructor(attributes) {
    super(attributes);
    this.specialty = attributes.specialty;
    this.favLanguage = attributes.favLanguage;
    this.catchPhrase = attributes.catchPhrase;
  }

  demo(str) {
    console.log(`Today we are learning about`, str);
  }

  grade(student, subject) {
    console.log(`${student.name} receives a perfect score on ${subject}`);
  }

  //Stretch
  randomlyGrade(student) {
    const oldGrade = student.grade;
    student.grade += Math.floor(Math.random() * 20 - 10);
    console.log(
      `${student.name}'s grade went from ${oldGrade} to ${student.grade}`
    );
  }
}

class Student extends Person {
  constructor(attributes) {
    super(attributes);
    this.previousBackground = attributes.previousBackground;
    this.className = attributes.className;
    this.favSubjects = attributes.favSubjects;
    //Stretch
    this.grade = attributes.grade;
  }

  listsSubjects() {
    this.favSubjects.forEach(element => console.log(element));
  }

  PRAssignment(subject) {
    console.log(`${this.name} has submitted a PR for ${subject}`);
  }

  sprintChallenge(subject) {
    console.log(`${this.name} has begun a spring challenge for ${subject}`);
  }

  //Stretch
  graduate() {
    if (this.grade > 70) {
      console.log(`Congratulations ${this.name}! You've graduated!`);
    } else {
      console.log(`Whoops! You're not ready to graduate yet! Back to work!`);
    }
  }
}

class ProjectManager extends Instructor {
  constructor(attributes) {
    super(attributes);
    this.gradClassName = attributes.gradClassName;
    this.favInstructor = attributes.favInstructor;
  }

  standUp(slack) {
    console.log(`${this.name} announces to ${slack}, @channel standy times!`);
  }

  debugCode(student, subject) {
    console.log(`${this.name} debugs ${student.name}'s code on ${subject}`);
  }
}

//Objects using the above classes
const fred = new Instructor({
  name: 'Fred',
  location: 'Bedrock',
  age: 37,
  favLanguage: 'JavaScript',
  specialty: 'Front-end',
  catchPhrase: `Don't forget the homies`,
});

const dan = new Instructor({
  name: 'Dan',
  age: Infinity,
  location: 'Denver',
  specialty: 'Relentless Debugger',
  favLanguage:
    'JavaScript, Python, Elm, ReasonML, SmallTalk, Haskell, C#, Java, Rust, Go, Ruby, Crystal, Elixir, Lua, and Julia',
  catchPhrase: 'If you can do the thing, you can get paid to do the thing!',
});

const brandon = new Student({
  name: 'Brandon',
  age: 26,
  location: 'California',
  previousBackground: 'Retail',
  className: 'WEB21',
  favSubjects: ['HTML', 'CSS', 'Javascript'],
  //Stretch
  grade: 70,
});

const isaiah = new Student({
  name: 'Isaiah',
  age: 18,
  location: 'Florida',
  previousBackground: 'High School last month',
  className: 'Web21',
  favSubjects: ['Html', 'CSS', 'JavaScript'],
  //Stretch
  grade: 70,
});

const marguel = new ProjectManager({
  name: 'Marguel',
  age: 'Maybe 26',
  gradClassName: 'WEBPT2',
  favInstructor: 'Me?',
  location: 'California',
  specialty: 'React',
  favLanguage: 'JavaScript, Python, Elm etc.',
  catchPhrase: 'Practice Flex Zombies !!!',
});

const mary = new ProjectManager({
  name: 'Mary',
  age: '24',
  gradClassName: 'WEB18',
  favInstructor: 'Josh Knell',
  location: 'New York',
  specialty: 'Express and Node.js',
  favLanguage: 'Javascript',
  catchPhrase: 'That looks AWESOME',
});

//Using above objects in examples

//Instructors
console.log(fred.name);
fred.speak();
fred.demo('Javascript Arrays');
console.log(dan.specialty);
dan.grade(brandon, 'Javascript Arrays');

//Students
console.log(brandon.name);
console.log(brandon.previousBackground);
brandon.listsSubjects();
isaiah.PRAssignment('Preprocessing');
isaiah.sprintChallenge('Preprocessing');

//Project Managers
console.log(marguel.name);
console.log(marguel.gradClassName);
marguel.standUp('#help');
mary.debugCode(brandon, 'Javascript Classes');

//Stretch - Student Grading
dan.randomlyGrade(brandon);
dan.randomlyGrade(brandon);
dan.randomlyGrade(brandon);
brandon.graduate();
