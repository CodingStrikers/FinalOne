import {
	Component,
	OnInit
} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import {
	DataService
} from './data.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = 'riseabvall';
	showModal: boolean;
	showModal1: boolean;
	registerForm: FormGroup;
	loginForm: FormGroup;
	conForm: FormGroup;
	submitted = false;
	regdata: any;
	logdata: any;
	condata: any;

	customOptions: any = {
		loop: true,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		autoplayTimeout: 8000,
		smartSpeed: 1600,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 2
			},
			740: {
				items: 3
			},
			940: {
				items: 3
			}
		},
		nav: true
	}

	constructor(private formBuilder: FormBuilder, private q: FormBuilder, private r: FormBuilder, private d: DataService) {}
	show() {
		this.showModal = true;
	}
	hide() {
		this.showModal = false;
	}

	show1() {
		this.showModal1 = true;
	}

	hide1() {
		this.showModal1 = false;
	}
	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			firstname: ['', [Validators.required, Validators.minLength(6)]],
			mobile: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]]
		});


		this.loginForm = this.q.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});

		this.conForm = this.r.group({
			conname: ['', [Validators.required]],
			conemail: ['', [Validators.required, Validators.email]],
			concontact: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]],
			conquer: ['', [Validators.required]]
		})
	}

	get f() {
		return this.registerForm.controls;
	}
	onSubmit() {
		this.submitted = true;
		if (this.registerForm.invalid) {
			return;
		}
		if (this.submitted) {
			this.showModal = false;
			this.regdata = {
				FirstName: this.registerForm.get('firstname').value,
				Email: this.registerForm.get('email').value,
				Mobile: this.registerForm.get('mobile').value,
				Password: this.registerForm.get('password').value
			}
			console.log(this.regdata);
			this.d.postregdata(this.regdata).subscribe((res) => {
				if (res == 1) {
					alert("Thank You For Registring With Us");
				} else {
					alert("Something wrong with the data");
				}
			})
		}

	}
	get g() {
		return this.loginForm.controls;
	}

	onSubmit1() {
		this.submitted = true;

		if (this.loginForm.invalid) {
			return;
		}

		if (this.submitted) {
			this.showModal1 = false;
			this.logdata = {
				Email: this.loginForm.get('email').value,
				Password: this.loginForm.get('password').value
			}
			this.d.logindata(this.logdata).subscribe((res) => {
				if (res == 1) {
					alert("You have logged in successfully");
				} else {
					alert("Something wrong with the data");
				}
			})
			console.log(this.logdata);

		}

	}

	conSub() {
		this.condata = {
			coname: this.conForm.get('conname').value,
			coemail: this.conForm.get('conemail').value,
			cocontact: this.conForm.get('concontact').value,
			coquer: this.conForm.get('conquer').value
		}

		this.d.submitdata(this.condata).subscribe((res) => {
			if (res == 1) {
				console.log("Thanks for raising the query. We will get back to you soon");
				alert("Thanks for raising the query. We will get back to you soon");
			} else {
				console.log("Something is missing");
			}
		})
		console.log(this.condata);
	}

}