const express = require('express')
const bodyParser = require('body-parser')
const ejs = require("ejs");
const patients = [{
	name: 'Aditya',
	number: '8175826846',
	dob: '29/09/2001',
	city: 'Mirzapur',
	roomNo: '1',
}]
const availableBeds = 4;

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

app.get("/", function (req, res) {
	res.render("home", {
		data: patients
	})
})
app.get("/api/patients",(req,res)=>{
    res.send(patients)
})

app.post("/register", (req, res) => {
	const name = req.body.name
	const number = req.body.number
	const dob = req.body.dob
	const city = req.body.city
	if (patients.length < availableBeds) {
		const roomNo = patients.length + 1;

		patients.push({
			name: name,
			number: number,
			dob: dob,
			city: city,
			roomNo: roomNo
		})

		res.render("home", {
			data: patients
		})
	}
	else {
		res.send("No room available");
	}
})

app.post('/discharge', (req, res) => {
	var name = req.body.name;

	var j = 0;
	patients.forEach(patient => {
		j = j + 1;
		if (patient.name == name) {
			patients.splice((j - 1), 1)
		}
	})

	res.render("home", {
		data: patients
	})
})

app.listen(3000, (req, res) => {
	console.log("App is running on port 3000")
})
