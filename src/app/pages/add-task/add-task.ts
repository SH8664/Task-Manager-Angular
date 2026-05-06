import { Component } from '@angular/core';
import { InputForm } from '../../components/InputForm/inputForm';
import { Task } from '../../types';

@Component({
  selector: 'app-add-task',
  imports: [InputForm],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {

}
