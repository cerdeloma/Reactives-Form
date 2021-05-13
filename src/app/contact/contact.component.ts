import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit { 
    signupForm: FormGroup;
    courses = ['HTML', 'CSS', 'JS', 'PHP', 'JAVA', 'NODE']

    constructor(private formBuilder: FormBuilder) {}


    ngOnInit(){
        this.signupForm = this.formBuilder.group({
            username: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            courses: this.buildCourses()
        })
    }

    buildCourses(){
        const values = this.courses.map(v => new FormControl(false));
        return this.formBuilder.array(values)
    }

    getCoursesControls(){
        return this.signupForm.get('courses') ? 
            (<FormArray>this.signupForm.get('courses')).controls : null;
    }

    onSubmit(){
        // console.log(this.signupForm)

        let valueSubmit = Object.assign({}, this.signupForm.value)

        valueSubmit = Object.assign(valueSubmit, {
            courses: valueSubmit.courses
            .map((v, i) => v ? this.courses[i] : null)
            .filter(v => v !== null)
        })
        console.log(valueSubmit)
    }


}