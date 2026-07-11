import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hello',
  imports: [],
  templateUrl: './hello.html',
  styleUrl: './hello.scss',
})
export class Hello {
  name = "Vansh Gupta"
  paramName = signal<string|null>("");
  constructor(private route:ActivatedRoute){
    this.route.paramMap.subscribe((params)=>{
      this.paramName.set(params.get("name"))
    })
  }

}
