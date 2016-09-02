/**
 * Created by yos on 09/07/2016.
 */

import {Component, ReflectiveInjector} from '@angular/core';
import {QuestionText, QuestionDate} from "../models/questions";
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder} from '@angular/forms'

@Component({
    selector: 'qDate',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    inputs : ['q', 'formGroup', 'name', 'editMode', 'inferredAnswer'],
    template: `
          
          <div *ngIf="!editMode && q.isDateValid()" class="answer-confirmed" (click)="editMode = true">
            {{q.getDisplayedDate()}}                                    
            <div class="close" ><img src='assets/img/edit-cross.png' alt=""></div>
          </div>
            
            
            
           <div *ngIf="editMode && !inferredAnswer" class="answer-edit">                            
                <div class="wrap-block-style"><div class="block-style">{{q.question_text}}</div></div>                  
                <input type="text" class="input-style-fileld"
                    placeholder="{{q.question_hint}}"
                    [(ngModel)]="q.answer"
                    [formControl] = "formGroup.controls[name]" >
           </div>
           
            <div *ngIf="editMode && inferredAnswer || !q.isDateValid()" class="answer-edit gray-panel">
                                        
                <div style="color: #4A90E2;">{{q.question_text}}</div>
                                  
                                  
                <div style="height: 45px">
                    <input type="text" [(ngModel)]="dd_value" placeholder="dd" #dd (focus)="focus(dd)" (keyup)="keyup(dd.value, mm)" class="input-style-fileld" style="margin-bottom: 0px; float: left; width: 55px; " (ngModelChange)="dateChanged(dd)" 
                    (blur)="blur(dd)" >                  

                    <input type="text" [(ngModel)]="mm_value" placeholder="mm" #mm (focus)="focus(mm)" (keyup)="keyup(mm.value, yy)"   class="input-style-fileld" style="margin-bottom: 0px; float: left; width: 55px; margin-left: 5px;" (ngModelChange)="monthChanged(mm)"
                    (blur)= "blur(mm)"> 

                    <input type="text" [(ngModel)]="yy_value" placeholder="yy" #yy (focus)="focus(yy)" (keyup)="keyup(yy.value, null)" class="input-style-fileld" style="margin-bottom: 0px; float: left; width: 75px; margin-left: 5px;" (ngModelChange)="yearChanged(yy)">
                /div>
                
                
           </div>


})

export class QuestionDateComponent {
    q : QuestionDate;
    formGroup : FormGroup;
    name : string;


    dd_value : string;
    mm_value : string;
    yy_value : string;

    inferredAnswer : boolean;
    control : any;

    keyup(value, next){
        if (value.length == 2 && next) next.focus();
    }

    blur(elt){
        if(elt.value<10 && elt.value.length==1){
            elt.value = '0'+elt.value;
        }
    }

    /*if the newly enterd value is not a numeric it should not be entered*/
    dateChanged(elt){
        if( isNaN(elt.value) ){
            if(elt.value.length>1){
                this.dd_value = elt.value = elt.value.substr(0, elt.value.length-1);
            } else{            
                this.dd_value = elt.value = '';
            }
        } else if( elt.value > 31){

            this.dd_value = elt.value = 31;
        } else if(elt.value.length>2 && elt.value[0] == 0){

            this.dd_value = elt.value = elt.value.substr(1, elt.value.length);
        }
    }
    monthChanged(elt){
        if( isNaN(elt.value) ){
            if(elt.value.length>1){
                this.mm_value = elt.value = elt.value.substr(0, elt.value.length-1);
            } else{            
                this.mm_value = elt.value = '';
            }
        }
    }
    yearChanged(elt){
        if( isNaN(elt.value) ){
            if(elt.value.length>1){
                this.yy_value = elt.value = elt.value.substr(0, elt.value.length-1);
            } else{            
                this.yy_value = elt.value = '';
            }
        }
    }

    focus(c){
        c.select();
    }

    ngOnInit(){
        this.dd_value = this.q.getDay()<10 ? '0'+this.q.getDay() : this.q.getDay();
        this.mm_value = this.q.getMonth()<10 ? '0'+this.q.getMonth() : this.q.getMonth();
        this.yy_value = this.q.getYear().toString();
    }

    constructor(){

    }
}
