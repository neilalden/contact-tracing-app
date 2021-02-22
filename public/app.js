const auth = firebase.auth();
const firestore = firebase.firestore();
const usersRef = firestore.collection("users");
const activityRef = firestore.collection("activity");
const sections = document.getElementsByTagName("section");
const homePage = document.getElementById("particles-js");
const signUpPage = document.getElementById("sign-up-page");
const dashboardPage = document.getElementById("dashboard");

const signUpReturnHome = document.getElementById("sign-up-return-home");
const emailSignIn = document.getElementById("email-sign-in");
const passwordSignIn = document.getElementById("password-sign-in");
const loaders = document.getElementsByClassName("loading-screen");
const qrCodeDl = document.getElementById("download-qr-code-btn");
const modalTitle = document.getElementById("exampleModalLabel");
const showQR = document.getElementById("show-qr-code");

const signUpInput = document.getElementsByClassName("sign-up-input");
const signUpInputBusiness = document.getElementsByClassName(
	"sign-up-input-business"
);
const signUpForms = document.getElementsByClassName("sign-up-form");
const accTypeSignUp = document.querySelector(
	'input[name="acc-type-radio"]:checked'
);
const rad = document.querySelectorAll(
	'input[type=radio][name="acc-type-radio"]'
);
const firstnameSignUp = document.getElementById("firstname-sign-up-individual");
const lastnameSignUp = document.getElementById("lastname-sign-up-individual");
const birthdaySignUp = document.getElementById("birthday-sign-up-individual");
const phoneNumberSignUp = document.getElementById(
	"phone-number-sign-up-individual"
);
const citySignUp = document.getElementById("city-sign-up-individual");
const brgySignUp = document.getElementById("barangay-sign-up-individual");
const houseNumberSignUp = document.getElementById(
	"house-number-sign-up-individual"
);
const streetSignUp = document.getElementById("street-sign-up-individual");
const emailSignUp = document.getElementById("email-sign-up-individual");
const passwordSignUp = document.getElementById("password-sign-up-individual");
const confirmPasswordSignUp = document.getElementById(
	"confirm-password-sign-up-individual"
);
const btnSignUpIndividual = document.getElementById("btn-sign-up-individual");
const businessNumberSignUpBusiness = document.getElementById(
	"business-number-sign-up-business"
);
const buildingNameSignUpBusiness = document.getElementById(
	"building-name-sign-up-business"
);

const contactPersonSignUpBusiness = document.getElementById(
	"contact-person-sign-up-business"
);
const contactNumberSignUpBusiness = document.getElementById(
	"contact-number-sign-up-business"
);
const emailSignUpBusiness = document.getElementById("email-sign-up-business");
const passwordSignUpBusiness = document.getElementById(
	"password-sign-up-business"
);
const confirmPasswordSignUpBusiness = document.getElementById(
	"confirm-password-sign-up-business"
);
const btnSignUpBusiness = document.getElementById("btn-sign-up-business");

const userDashboard = document.getElementsByClassName("user-dashboard");
const firstNameDash = document.getElementById("first-name-dashboard");
const contactPersonDash = document.getElementById("contact-person-dashboard");
const canvas = document.getElementsByTagName("canvas");
// const birthdayValue = new Date(Date.parse(birthdaySignUp.value));
let businessID = "";
let justSignedUp = false;
function handleClick(myRadio) {
	const ind = document.getElementById("individual-form");
	const bus = document.getElementById("business-form");
	if (myRadio.value == "individual") {
		ind.setAttribute("style", "display: flex !important");
		bus.setAttribute("style", "display: none !important");
	} else {
		ind.setAttribute("style", "display: none !important");
		bus.setAttribute("style", "display: flex !important");
	}
}
auth.onAuthStateChanged((user) => {
	if (user) {
		if (!justSignedUp) {
			showDashboard(user.uid);
		}
	} else {
		businessID = "";
		returnHome();
	}
	removeLoadingScreen();
});

const showSignUp = () => {
	emailSignIn.value = "";
	passwordSignIn.value = "";
	emailSignIn.classList.remove("is-invalid");
	passwordSignIn.classList.remove("is-invalid");
	homePage.style.display = "none";
	signUpPage.style.display = "block";
};
const showLoadingScreen = () => {
	for (let i = 0; i < sections.length; i++) {
		sections[i].style.display = "none";
	}
	for (let i = 0; i < loaders.length; i++) {
		loaders[i].style.display = "block";
	}
};
const removeLoadingScreen = () => {
	for (let i = 0; i < loaders.length; i++) {
		loaders[i].style.display = "none";
	}
};
const returnHome = () => {
	for (let i = 0; i < sections.length; i++) {
		sections[i].style.display = "none";
	}

	homePage.style.display = "block";
	particlesJS.load("particles-js", "src/particles.json", function () {});
};

const signIn = () => {
	const email = emailSignIn.value;
	const password = passwordSignIn.value;
	emailSignIn.classList.remove("is-invalid");
	passwordSignIn.classList.remove("is-invalid");

	if (email == "") {
		emailSignIn.classList.add("is-invalid");
	} else if (password == "") {
		passwordSignIn.classList.add("is-invalid");
	} else {
		showLoadingScreen();
		auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				var user = userCredential.user.uid;
				emailSignIn.classList.remove("is-invalid");
				passwordSignIn.classList.remove("is-invalid");
				emailSignIn.value = null;
				passwordSignIn.value = null;
			})
			.catch((error) => {
				// var errorCode = error.code;
				var errorMessage = error.message;
				emailSignIn.classList.add("is-invalid");
				passwordSignIn.classList.add("is-invalid");
				alert(errorMessage);

				removeLoadingScreen();
				returnHome();
			});
	}
};
const signOut = () => {
	auth
		.signOut()
		.then(() => {
			returnHome();
		})
		.catch((error) => {
			console.log(error);
		});
};

const showDashboard = (userId) => {
	for (let i = 0; i < sections.length; i++) {
		sections[i].style.display = "none";
	}
	for (let i = 0; i < userDashboard.length; i++) {
		userDashboard[i].style.display = "none";
	}
	dashboardPage.style.display = "block";
	usersRef
		.doc(userId)
		.get()
		.then((user) => {
			const type = user.data().type;
			document.getElementById(`${type}-dashboard`).style.display = "block";
			if (type == "individual") {
				const firstname = user.data().firstname;
				const lastname = user.data().lastname;
				const birthday = user.data().birthday;
				const phoneNumber = user.data().phoneNumber;
				const city = user.data().city;
				const barangay = user.data().barangay;
				const street = user.data().street;
				const houseNumber = user.data().houseNumber;
				const email = user.data().email;
				const password = user.data().password;
				showUserIndividual({
					type,
					firstname,
					lastname,
					birthday,
					phoneNumber,
					city,
					barangay,
					street,
					houseNumber,
					email,
					password,
				});
			} else if (type == "business") {
				businessID = user.data().id;
				const businessNumber = user.data().businessNumber;
				const contactPerson = user.data().contactPerson;
				const email = user.data().email;
				const password = user.data().password;
				showUserBusiness({ businessNumber, contactPerson, email, password });
			} else {
				console.log("tf is wrong with you?");
			}
		})
		.catch((error) => {
			console.log("Error getting document:", error);
		});
};

const showUserIndividual = (userData) => {
	firstNameDash.innerText = userData.firstname;
};

const showUserBusiness = (userData) => {
	contactPersonDash.innerText = userData.contactPerson;
	console.log(userData);
};

// add event listeners

qrCodeDl.addEventListener("click", (linkElement) => {
	var img = canvas[1].toDataURL("image/png");
	linkElement.target.href = img;
});
signUpReturnHome.addEventListener("click", () => {
	if (!qrCodeDl.classList.contains("disabled")) {
		qrCodeDl.classList.add("disabled");
	}
	if (!showQR.classList.contains("visually-hidden")) {
		showQR.classList.add("visually-hidden");
	}
	for (let i = 0; i < signUpInput.length; i++) {
		signUpInput[i].value = "";
		signUpInput[i].classList.remove("is-valid");
		signUpInput[i].classList.remove("is-invalid");
	}
	returnHome();
});
btnSignUpBusiness.addEventListener("click", (e) => {
	e.preventDefault();
	const accType = "business";
	const businessNumber = businessNumberSignUpBusiness.value;
	const buildingName = buildingNameSignUpBusiness.value;
	const contactPerson = contactPersonSignUpBusiness.value;
	const contactNumber = contactNumberSignUpBusiness.value;
	const email = emailSignUpBusiness.value;
	const password = passwordSignUpBusiness.value;
	const confirmPassword = confirmPasswordSignUpBusiness.value;
	let isOk = true;
	for (let i = 0; i < signUpInputBusiness.length; i++) {
		if (signUpInputBusiness[i].value == "") {
			signUpInputBusiness[i].classList.remove("is-valid");
			signUpInputBusiness[i].classList.add("is-invalid");
			isOk = false;
		} else {
			signUpInputBusiness[i].classList.remove("is-invalid");
			signUpInputBusiness[i].classList.add("is-valid");
		}
	}
	if (password != confirmPassword) {
		alert("confirm password does not match");
		passwordSignUpBusiness.classList.remove("is-valid");
		confirmPasswordSignUpBusiness.classList.remove("is-valid");
		passwordSignUpBusiness.classList.add("is-invalid");
		confirmPasswordSignUpBusiness.classList.add("is-invalid");
	} else if (!isOk) {
		alert("some input fields are still empty");
	} else {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				const userID = userCredential.user.uid;
				const data = {
					id: userID,
					type: accType,
					businessNumber: businessNumber,
					buildingName: buildingName,
					contactPerson: contactPerson,
					contactNumber: contactNumber,
					email: email,
					password: password,
				};
				usersRef.doc(userID).set(data);
				for (let i = 0; i < signUpInput.length; i++) {
					signUpInput[i].value = "";
					signUpInput[i].classList.remove("is-valid");
					signUpInput[i].classList.remove("is-invalid");
				}
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(error);
				console.log(errorCode);
				console.log(errorMessage);
			});
	}
});
btnSignUpIndividual.addEventListener("click", (e) => {
	e.preventDefault();
	const accType = "individual";
	const firstname = firstnameSignUp.value;

	modalTitle.innerText = firstname;
	makeCode(firstname);
	showQR.click();
	qrCodeDl.classList.remove("disabled");
	showQR.classList.remove("visually-hidden");
	// const lastname = lastnameSignUp.value;
	// const birthday = birthdaySignUp.value;
	// const phoneNumber = phoneNumberSignUp.value;
	// const city = citySignUp.value;
	// const barangay = brgySignUp.value;
	// const street = streetSignUp.value;
	// const houseNumber = houseNumberSignUp.value;
	// const email = emailSignUp.value;
	// const password = passwordSignUp.value;
	// const confirmPassword = confirmPasswordSignUp.value;
	// let isOk = true;

	// for (let i = 0; i < signUpInput.length; i++) {
	// 	if (signUpInput[i].value == "") {
	// 		signUpInput[i].classList.remove("is-valid");
	// 		signUpInput[i].classList.add("is-invalid");
	// 		isOk = false;
	// 	} else {
	// 		signUpInput[i].classList.remove("is-invalid");
	// 		signUpInput[i].classList.add("is-valid");
	// 	}
	// }
	// if (password != confirmPassword) {
	// 	alert("confirm password does not match");
	// 	passwordSignUp.classList.remove("is-valid");
	// 	confirmPasswordSignUp.classList.remove("is-valid");
	// 	passwordSignUp.classList.add("is-invalid");
	// 	confirmPasswordSignUp.classList.add("is-invalid");
	// } else if (!isOk) {
	// 	alert("some input fields are still empty");
	// } else {
	// 	auth
	// 		.createUserWithEmailAndPassword(email, password)
	// 		.then((userCredential) => {
	// 			const userID = userCredential.user.uid;

	// 			justSignedUp = true;
	// 			const data = {
	// 				id: userID,
	// 				type: accType,
	// 				firstname: firstname,
	// 				lastname: lastname,
	// 				birthday: birthday,
	// 				phoneNumber: phoneNumber,
	// 				city: city,
	// 				barangay: barangay,
	// 				street: street,
	// 				houseNumber: houseNumber,
	// 				email: email,
	// 				password: password,
	// 			};
	// 			usersRef
	// 				.doc(userID)
	// 				.set(data)
	// 				.then((response) => {
	// 					console.log("evrythings good in the hood");
	// 				})
	// 				.catch((error) => {
	// 					console.log("weee wooo weee wooo");
	// 				});

	// 			modalTitle.innerText = firstname;
	// 			makeCode(userID);
	// 			showQR.click();
	// 			qrCodeDl.classList.remove("disabled");
	// 			showQR.classList.remove("visually-hidden");
	// 			for (let i = 0; i < signUpInput.length; i++) {
	// 				signUpInput[i].value = "";
	// 				signUpInput[i].classList.remove("is-valid");
	// 				signUpInput[i].classList.remove("is-invalid");
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			var errorCode = error.code;
	// 			var errorMessage = error.message;
	// 			console.log(error);
	// 			console.log(errorCode);
	// 			console.log(errorMessage);
	// 		});
	// }
});

// shinanigans section //

function makeCode(data) {
	const qrCodeContainer = document.getElementById("qrcode");
	while (qrCodeContainer.firstChild) {
		qrCodeContainer.removeChild(qrCodeContainer.lastChild);
	}
	var qrcode = new QRCode(document.getElementById("qrcode"), {
		text: "",
		logo: "src/user.png",
		logoWidth: 80,
		logoHeight: 80,
		logoBackgroundTransparent: true,
		title: "Contact Tracing App",
		titleFont: "bold 14px Calibri",
		titleColor: "#000000",
		titleBackgroundColor: "#ffffff",
		titleHeight: 30,
		titleTop: 15,
		width: 240,
		height: 240,
		quietZone: 15,
		// colorDark: "dodgerblue",
	});
	qrcode.makeCode(data);
}

particlesJS.load("particles-js", "src/particles.json", function () {});

var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
	fps: 10,
	qrbox: 300,
});
html5QrcodeScanner.render((qrCodeMessage) => {
	const date = new Date();
	const entryDate =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	const entryTime = date.getHours() + ":" + date.getMinutes();
	const individual = qrCodeMessage;
	const business = businessID;
	console.log(qrCodeMessage);
	usersRef
		.doc(qrCodeMessage)
		.get()
		.then((user) => {
			if (user.exists) {
				activityRef
					.add({
						entryDate,
						entryTime,
						individualID: individual,
						businessID: business,
					})
					.then((docRef) => {
						alert("scanned succesfully");
					})
					.catch((error) => {
						console.error("Error adding document: ", error);
					});
			} else {
				alert("qr code does not exist");
			}
		})
		.catch((error) => {
			alert(error.message);
		});
});
// function onScanSuccess(qrCodeMessage) {
// 	const date = new Date();
// 	const entryDate =
// 		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
// 	const entryTime = date.getHours() + ":" + date.getMinutes();
// 	const individual = qrCodeMessage;
// 	const business = businessID;
// 	console.log(qrCodeMessage);
// 	usersRef
// 		.doc(qrCodeMessage)
// 		.get()
// 		.then((user) => {
// 			if (user.exists) {
// 				activityRef
// 					.add({
// 						entryDate,
// 						entryTime,
// 						individualID: individual,
// 						businessID: business,
// 					})
// 					.then((docRef) => {
// 						alert("scanned succesfully");
// 					})
// 					.catch((error) => {
// 						console.error("Error adding document: ", error);
// 					});
// 			} else {
// 				alert("qr code does not exist");
// 			}
// 		})
// 		.catch((error) => {
// 			alert(error.message);
// 		});

// 	// html5QrcodeScanner.clear();
// }
