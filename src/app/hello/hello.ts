import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hello',
  imports: [],
  templateUrl: './hello.html',
  styleUrl: './hello.scss',
})
export class Hello {
  name = signal("Vansh Gupta");
  changeName(newName:string){
    this.name.set(newName);
  }
}
