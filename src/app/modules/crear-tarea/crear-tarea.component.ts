import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit {
  createMode: boolean = true; 
  
  crearTarea!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.crearTarea =this.formBuilder.group({
      title:['', Validators.required],
      description:['', Validators.required],
      done: false
    })
  }

  saveCrearTarea(){
    if(this.crearTarea.invalid){
      return;
    }
  }

}
