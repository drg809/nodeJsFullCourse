abstract class Animal {
   protected name: string;
   age: number;

   constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
   }

   toString(): string {
      return `name: ${this.name}, age: ${this.age}`;
   }
}


class Mammal extends Animal {
   canSwin: boolean;

   constructor(data: { name: string; age: number; canSwin: boolean }) {
      const { name, age, canSwin } = data;
      super(name, age);
      this.canSwin = canSwin;
   }

   swim(): void {
      console.log(`${this.name} can fly ${this.canSwin}`);
   }
}

class Bird extends Animal {
   canFly: boolean;

   constructor(data: { name: string; age: number; canFly: boolean }) {
      const { name, age, canFly } = data;
      super(name, age);
      this.canFly = canFly;
   }

   fly(): void {
      console.log(`${this.name} can fly ${this.canFly}`);
   }
}

const dog = new Mammal({ name: 'LULU', age: 2, canSwin: true });
const condor = new Bird({ name: 'Pedro', age: 10, canFly: true });

console.log('mammal', dog.toString());
console.log('bird', condor.toString());
condor.fly();

class Person {
   protected _name: string;
   age: number;
   protected readonly _dni: string;

   constructor(data: { name: string; age: number; dni: string }) {
      const { name, age, dni } = data;
      this._name = name;
      this.age = age;
      this._dni = dni;
   }

   get dni(): string {
      return this._dni;
   }

   get name(): string {
      return this._name;
   }

   set name(value: string) {
      if (value.trim().length === 0) {
         throw new Error('invalid name');
      }
      this._name = value;
   }
}

const user: Person = new Person({ name: 'Dani', age: 32, dni: '12345678A' });

console.log('user name', user.name);

user.name = 'Paco';

console.log('user name', user.name);
console.log('user age', user.age);
console.log('user dni', user.dni);


class AppConfig {
   static apiKey: string = '121232323';

   static getData(): number {
      return 1200;
   }
}

AppConfig.apiKey;
AppConfig.getData();

class Vehicle {
   model: string;
   year: number;

   constructor(data: { model: string; year: number }) {
      const { model, year } = data;
      this.model = model;
      this.year = year;
   }

}

class Employee {
   id: number;
   name: string;
   vehicle?: Vehicle;

   constructor(data: { id: number; name: string; vehicle?: Vehicle }) {
      const { id, name, vehicle } = data;
      this.id = id;
      this.name = name;
      this.vehicle = vehicle;
   }
}

const kia1 = new Vehicle({ model: 'Cerato', year: 2010 });

const dani = new Employee({ id: 123, name: 'Daniel Rodriguez' })

console.log('id', dani.id);
console.log('vehículo', dani.vehicle);

const getPrice = (normalPrice: number, discount: number = 0): number => normalPrice - ((normalPrice * discount) / 100);

console.log('galleta::', getPrice(0.50, 10));
console.log('galleta::', getPrice(0.50));

interface User {
   name: string;
   age: number;
   address?: string;
}

interface Employee1 extends User {
   job: string;

}

let user1: Employee1 = {
   name: 'Dani',
   lastname: 'Rodriguez',
   age: 32,
   job: 'software developer'
}

interface Authentication {
   apiHost?: string;
   login(email: string, password: string): string | null;

   register(data: { username: string, email: string, password: string }): boolean;
}

class AuthenticationClient implements Authentication {
   register(data: { username: string; email: string; password: string; }): boolean {
      return false;
   }
   apiHost?: string;
   login(email: string, password: string): string | null {
      return null;
   }

}

const checkCredentials = (email: string, password: string): string => {
   return 'login ok';
}

const login = (data: { email: string; password?: string; loginType: string; }): string => {
   const { email, password, loginType } = data;

   switch (loginType) {
      case 'password':
         return checkCredentials(email, password!);
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

}

class User {
   name: string;
   lastname: string;
   age: number;

   // name!: string;
   // lastname!: string;
   // age!: number;

   private constructor(name: string, lastname: string, age: number) {
      this.name = name;
      this.lastname = lastname;
      this.age = age;
   }

   // private constructor() { }

   static fromJson(data: { name: string; lastname: string; age: number; }): User {
      return new User(data.name, data.lastname, data.age);
   }

   // static fromJson(data: { name: string; lastname: string; age: number; }): User {
   //    const user = new User();
   //    user.name = data.name;
   //    user.lastname = data.lastname;
   //    user.age = data.age;

   //    return user;
   // }
}

User.fromJson({ name: 'Dani', lastname: 'Rodirguez', age: 32 });


const login1 = (email: string, loginType: string, password?: string, password1?: string): void => { }

login1('email', 'facebook', undefined, '122334');

type LevelType = 'basic' | 'intermedium' | 'advance';

type Course = {
   name: string;
   price: number;
   level: LevelType;
}

const createCourse = (name: string, level: string): LevelType => {
   const newCourse: Course = {
      name,
      price: 0.99,
      level: level as LevelType,
   };

   return newCourse.level;
}

const sleep = (seconds: number): Promise<number> => {
   return new Promise<number>((resolve, reject) => {
      setTimeout(() => {
         resolve(seconds);
      }, seconds * 1000);
   });
}

const run = () => {
   sleep(2).then(() => {
      console.log('HOLA');
   });
}

run();

const run1 = async (): Promise<void> => {
   const value: number = await sleep(2);
   console.log('HOLA ASYNC');
}

run1();

enum FileType {
   video = '.mp4', image = '.jpg', audio = '.mp3'
}

const getFileType = (url: string): FileType => {
   if(url==='.mp3') return FileType.audio;
   if(url==='.mp4') return FileType.video;

   return FileType.image;
}

const parseDate = (url: string) => {
   const type: FileType = url.substring(0,10) as FileType;

   switch(type){
      case FileType.audio:
         ///
         break;
      case FileType.video:
         break;
      case FileType.image:
         break;
   }

}