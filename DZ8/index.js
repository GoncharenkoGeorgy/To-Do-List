const arr = [1, 2, 1, 3, 4, 3,];
var strings = ["кришна", "кришна", "харе", "харе", "харе", "харе", "кришна", "кришна", "8-()"];

function unique(arr) {
  let hash = {};
  let result = [];
  for (let i = 0; i < arr.length; i++)
    if (!(arr[i] in hash)) {
      hash[arr[i]] = true;
      result.push(arr[i]);
    }
  return result;
}

console.log(unique(arr));
console.log(unique(strings));


function Person(first, last, age, gender, interests) {
  this.name = {
    first,
    last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
};

Person.prototype.greeting = function () {
  console.log('Hi! I\'m ' + this.name.first + '.');
};

var person1 = new Person('John', 'Griffiths', 31, 'male', 'football');

console.log(person1.name.first);
person1.greeting();

function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests);

  this.subject = subject;
}

Teacher.prototype = Object.create(Person.prototype);

Object.defineProperty(Teacher.prototype, 'constructor', {
  value: Teacher,
  enumerable: false, // false, чтобы данное свойство не появлялось в цикле for in
  writable: true,
});

Teacher.prototype.greeting = function () {
  let prefix;

  if (this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
    prefix = 'Mr.';
  } else if (this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
    prefix = 'Mrs.';
  } else {
    prefix = 'Mx.';
  }

  console.log('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
};

var teacher1 = new Teacher('Dave', 'Griffiths', 31, 'male', ['football', 'cookery'], 'mathematics');

console.log(teacher1.name.first);
console.log(teacher1.interests);
console.log(teacher1.subject);
teacher1.greeting();


class Student {
  constructor(name, cohort, age) {
    this._name = name;
    this._cohort = cohort;
    this._age = age;
    this._profession = null;
    this._trainingDuration = null;
  }

  getInfo() {
    return {
      name: this._name,
      cohort: this._cohort,
      age: this._age,
      profession: this._profession,
      trainingDuration: this._trainingDuration
    }
  }
}

class FrontDeveloperStudent extends Student {
  constructor(name, cohort, age) {
    super(name, cohort, age);
    this._profession = 'Frontend developer';
    this._trainingDuration = 9;
  }
}

class BeckDeveloperStudent extends Student {
  constructor(name, cohort, age) {
    super(name, cohort, age);
    this._profession = 'Backend developer';
    this._trainingDuration = 10;
  }
}

class WebDeveloperStudent extends Student {
  constructor(name, cohort, age) {
    super(name, cohort, age);
    this._profession = 'Web developer';
    this._trainingDuration = 11;
  }
}

const student1 = new FrontDeveloperStudent("Петя Петров", 1, 22);
const student2 = new BeckDeveloperStudent("Иван Иванов", 2, 21);
const student3 = new WebDeveloperStudent("Вася Васечкин", 3, 20);

console.log(student1.getInfo());
console.log(student2.getInfo());
console.log(student3.getInfo());


//тута
function NewStudent() { }

NewStudent.prototype.init = function (name, cohort, age) {
  this.name = name;
  this.cohort = cohort;
  this.age = age;
};

NewStudent.prototype.print = function () {
  console.log(this.name, this.cohort, this.age);
};

const test = new NewStudent();
test.init("test test", 4, 23);
test.print();

function inherit(ParentClass) {
  function ChildClass() { }
  ChildClass.prototype = Object.create(ParentClass.prototype);
  ChildClass.prototype.constructor = ChildClass;
  ChildClass.prototype._super = ParentClass.prototype;
  return ChildClass;
}

const PythonDeveloperStudent = inherit(NewStudent);
PythonDeveloperStudent.prototype = {
  init: function (name, cohort, age) {
    name = "Student " + name;
    cohort = cohort;
    age = age;
    this._super.init.call(this, name, cohort, age);
  }
}

const student4 = new PythonDeveloperStudent();
console.log(student4 instanceof NewStudent);

student4.init("Илья Ильич", 4, 23);
student4.print();
