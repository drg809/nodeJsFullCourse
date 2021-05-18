"use strict";
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    toString() {
        return `name: ${this.name}, age: ${this.age}`;
    }
}
class Mammal extends Animal {
    constructor(data) {
        const { name, age, canSwin } = data;
        super(name, age);
        this.canSwin = canSwin;
    }
    swim() {
        console.log(`${this.name} can fly ${this.canSwin}`);
    }
}
class Bird extends Animal {
    constructor(data) {
        const { name, age, canFly } = data;
        super(name, age);
        this.canFly = canFly;
    }
    fly() {
        console.log(`${this.name} can fly ${this.canFly}`);
    }
}
const dog = new Mammal({ name: 'LULU', age: 2, canSwin: true });
const condor = new Bird({ name: 'Pedro', age: 10, canFly: true });
console.log('mammal', dog.toString());
console.log('bird', condor.toString());
condor.fly();
class Person {
    constructor(data) {
        const { name, age, dni } = data;
        this._name = name;
        this.age = age;
        this._dni = dni;
    }
    get dni() {
        return this._dni;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (value.trim().length === 0) {
            throw new Error('invalid name');
        }
        this._name = value;
    }
}
const user = new Person({ name: 'Dani', age: 32, dni: '12345678A' });
console.log('user name', user.name);
user.name = 'Paco';
console.log('user name', user.name);
console.log('user age', user.age);
console.log('user dni', user.dni);
class AppConfig {
    static getData() {
        return 1200;
    }
}
AppConfig.apiKey = '121232323';
AppConfig.apiKey;
AppConfig.getData();
class Vehicle {
    constructor(data) {
        const { model, year } = data;
        this.model = model;
        this.year = year;
    }
}
class Employee {
    constructor(data) {
        const { id, name, vehicle } = data;
        this.id = id;
        this.name = name;
        this.vehicle = vehicle;
    }
}
const kia1 = new Vehicle({ model: 'Cerato', year: 2010 });
const dani = new Employee({ id: 123, name: 'Daniel Rodriguez' });
console.log('id', dani.id);
console.log('vehículo', dani.vehicle);
const getPrice = (normalPrice, discount = 0) => normalPrice - ((normalPrice * discount) / 100);
console.log('galleta::', getPrice(0.50, 10));
console.log('galleta::', getPrice(0.50));
let user1 = {
    name: 'Dani',
    lastname: 'Rodriguez',
    age: 32,
    job: 'software developer'
};
class AuthenticationClient {
    register(data) {
        return false;
    }
    login(email, password) {
        return null;
    }
}
const checkCredentials = (email, password) => {
    return 'login ok';
};
const login = (data) => {
    const { email, password, loginType } = data;
    switch (loginType) {
        case 'password':
            return checkCredentials(email, password);
            break;
        case 'facebook':
            return 'login';
            break;
        case 'google':
            return 'login';
            break;
        default:
            return 'invalid login';
    }
};
class User {
    // name!: string;
    // lastname!: string;
    // age!: number;
    constructor(name, lastname, age) {
        this.name = name;
        this.lastname = lastname;
        this.age = age;
    }
    // private constructor() { }
    static fromJson(data) {
        return new User(data.name, data.lastname, data.age);
    }
}
User.fromJson({ name: 'Dani', lastname: 'Rodirguez', age: 32 });
const login1 = (email, loginType, password, password1) => { };
login1('email', 'facebook', undefined, '122334');
const createCourse = (name, level) => {
    const newCourse = {
        name,
        price: 0.99,
        level: level,
    };
    return newCourse.level;
};
const sleep = (seconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(seconds);
        }, seconds * 1000);
    });
};
const run = () => {
    sleep(2).then(() => {
        console.log('HOLA');
    });
};
run();
const run1 = async () => {
    const value = await sleep(2);
    console.log('HOLA ASYNC');
};
run1();
var FileType;
(function (FileType) {
    FileType["video"] = ".mp4";
    FileType["image"] = ".jpg";
    FileType["audio"] = ".mp3";
})(FileType || (FileType = {}));
const getFileType = (url) => {
    if (url === '.mp3')
        return FileType.audio;
    if (url === '.mp4')
        return FileType.video;
    return FileType.image;
};
const parseDate = (url) => {
    const type = url.substring(0, 10);
    switch (type) {
        case FileType.audio:
            ///
            break;
        case FileType.video:
            break;
        case FileType.image:
            break;
    }
};
