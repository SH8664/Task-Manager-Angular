import { v4 as uuidv4 } from 'uuid';
export class Task {
  id: String;
  title: String;
  description: String;
  priority: 'Low' | 'Medium' | 'High';
  date: Date;
  category: 'Study' | 'Work' | 'Personal';
  status: 'Done' | 'Not Done';
  constructor(
    title: String = '',
    description: String = '',
    priority: 'Low' | 'Medium' | 'High' = 'Low',
    date: Date = new Date(),
    category: 'Study' | 'Work' | 'Personal' = 'Study',
  ) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.date = date;
    this.category = category;
    this.status = 'Not Done';
  }
  get getTitle() {
    return this.title;
  }
  set setTitle(title: String) {
    this.title = title;
  }
  get getDescription() {
    return this.description;
  }
  set setDescription(description: String) {
    this.description = description;
  }
  get getPriority() {
    return this.priority;
  }
  set setPriority(priority: 'Low' | 'Medium' | 'High') {
    this.priority = priority;
  }
  get getDate() {
    return this.date;
  }
  set setDate(date: Date) {
    this.date = date;
  }
  get getCategory() {
    return this.category;
  }
  set setCategory(category: 'Study' | 'Work' | 'Personal') {
    this.category = category;
  }

  set setStatus(status: 'Done' | 'Not Done') {
    this.status = status;
  }
  get getStatus() {
    return this.status;
  }
}

export class User {
  id: String;
  email: String;
  password: String;
  username: String;
  constructor(email: String = '', password: String = '', username: String = '') {
    this.id = uuidv4();
    this.email = email;
    this.password = password;
    this.username = username;
  }
  get Email() {
    return this.email;
  }
  get Username() {
    return this.username;
  }

  set Password(password: String) {
    this.password = password;
  }
  set Email(email: String) {
    this.email = email;
  }
  set Username(username: String) {
    this.username = username;
  }
  get Password() {
    return this.password;
  }
}
