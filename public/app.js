const auth = firebase.auth();
const firestore = firebase.firestore();
const usersRef = firestore.collection("users");
const activityRef = firestore.collection("activity");

const sections = document.getElementsByTagName("section");
const homePage = document.getElementById("particles-js");
const signUpPage = document.getElementById("sign-up-page");
const dashboardPage = document.getElementById("dashboard");

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
const firstnameDashboard = document.getElementById(
	"firstname-dashboard-individual"
);
const lastnameDashboard = document.getElementById(
	"lastname-dashboard-individual"
);
const birthdayDashboard = document.getElementById(
	"birthday-dashboard-individual"
);
const phoneNumberDashboard = document.getElementById(
	"phone-number-dashboard-individual"
);
const cityDashboard = document.getElementById("city-dashboard-individual");
const brgyDashboard = document.getElementById("barangay-dashboard-individual");
const streetDashboard = document.getElementById("street-dashboard-individual");
const houseNumberDashboard = document.getElementById(
	"house-number-dashboard-individual"
);
// /////////////////////////////////////////////
const businessNumberDashboardBusiness = document.getElementById(
	"business-number-dashboard-business"
);
const buildingNameDashboardBusiness = document.getElementById(
	"building-name-dashboard-business"
);

const contactPersonDashboardBusiness = document.getElementById(
	"contact-person-dashboard-business"
);
const contactNumberDashboardBusiness = document.getElementById(
	"contact-number-dashboard-business"
);

const signUpReturnHome = document.getElementById("sign-up-return-home");
const emailSignIn = document.getElementById("email-sign-in");
const passwordSignIn = document.getElementById("password-sign-in");
const loaders = document.getElementsByClassName("loading-screen");
const qrCodeDl = document.getElementById("download-qr-code-btn");
const modalTitle = document.getElementById("exampleModalLabel");
const showQRSignUp = document.getElementById("show-qr-code-sign-up");
const showQRDashboar = document.getElementById("show-qr-code-dashboard");

const userDashboard = document.getElementsByClassName("user-dashboard");
const canvas = document.getElementsByTagName("canvas");
const logsTableIndividual = document.getElementById("logs-table-individual");
const logsTableBusiness = document.getElementById("logs-table-business");
// const prevBusiness = document.getElementById("paginate-prev-business");
// const nextBusiness = document.getElementById("paginate-next-business");
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var qrcode;
let businessId = "";
let buildingName = "";
let justSignedUp = false;
auth.onAuthStateChanged((user) => {
	if (user) {
		if (!justSignedUp) {
			showDashboard(user.uid);
		}
	} else {
		businessID = "";
		buildingName = "";
		if (qrcode != undefined) {
			modalTitle.innerText = "No QR";
			qrcode.clear();
			qrCodeDl.classList.add("disabled");
		}
		returnHome();
	}
	removeLoadingScreen();
});

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
			if (qrcode != undefined) {
				modalTitle.innerText = "No QR";
				qrcode.clear();
				qrCodeDl.classList.add("disabled");
			}
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
				const id = user.data().id;
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
					id,
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
				businessId = user.data().id;
				buildingName = user.data().buildingName;
				const businessNumber = user.data().businessNumber;
				const contactPerson = user.data().contactPerson;
				const contactNumber = user.data().contactNumber;
				const email = user.data().email;
				const password = user.data().password;
				showUserBusiness({
					businessId,
					type,
					businessNumber,
					buildingName,
					contactPerson,
					contactNumber,
					email,
					password,
				});
			} else {
				console.log("tf is wrong with you?");
			}
		})
		.catch((error) => {
			console.log("Error getting document:", error);
		});
};

const showUserIndividual = (userData) => {
	modalTitle.innerText = userData.firstname;
	makeCode(userData.id);
	qrCodeDl.classList.remove("disabled");
	firstnameDashboard.value = userData.firstname;
	lastnameDashboard.value = userData.lastname;
	birthdayDashboard.value = userData.birthday;
	phoneNumberDashboard.value = userData.phoneNumber;
	cityDashboard.value = userData.city;
	brgyDashboard.value = userData.barangay;
	streetDashboard.value = userData.street;
	houseNumberDashboard.value = userData.houseNumber;

	activityRef
		.where("individualID", "==", userData.id)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const d = new Date(doc.data().enteredAt.toDate());
				const m = d.getMonth();
				const date = d.getDate();
				const hour = d.getHours();
				const minute = d.getMinutes();

				logsTableIndividual.innerHTML += `
					<tr>
						<td>${month[m]}-${date} </td>
						<td> ${hour}:${minute}</td>
						<td colspan="2">${doc.data().buildingName}</td>
					</tr>
				`;
			});
		});
};

const showUserBusiness = (userData) => {
	businessNumberDashboardBusiness.value = userData.businessNumber;
	buildingNameDashboardBusiness.value = userData.buildingName;
	contactPersonDashboardBusiness.value = userData.contactPerson;
	contactNumberDashboardBusiness.value = userData.contactNumber;
	document.getElementById("business-logs-header").innerText =
		userData.buildingName + " logs";
	activityRef
		.where("businessID", "==", userData.businessId)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const d = new Date(doc.data().enteredAt.toDate());
				const m = d.getMonth();
				const date = d.getDate();
				const hour = d.getHours();
				const minute = d.getMinutes();

				logsTableBusiness.innerHTML += `
					<tr>
						<td>${month[m]}-${date} </td>
						<td> ${hour}:${minute}</td>
						<td colspan="2">${doc.data().personName}</td>
					</tr>
				`;
			});
		});
};

// shinanigans section //

function makeCode(data) {
	const qrCodeContainer = document.getElementById("qrcode");
	while (qrCodeContainer.firstChild) {
		qrCodeContainer.removeChild(qrCodeContainer.lastChild);
	}
	qrcode = new QRCode(document.getElementById("qrcode"), {
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
let prevAcc = "";
html5QrcodeScanner.render((qrCodeMessage) => {
	if (qrCodeMessage == prevAcc) {
		console.log("user just been read");
	} else {
		prevAcc = qrCodeMessage;
		const business = businessID;
		const building = buildingName;
		usersRef
			.doc(qrCodeMessage)
			.get()
			.then((user) => {
				if (user.exists) {
					activityRef
						.add({
							enteredAt: firebase.firestore.FieldValue.serverTimestamp(),
							individualID: user.data().id,
							personName: `${user.data().firstname} ${user.data().lastname}`,
							businessID: business,
							buildingName: building,
						})
						.then((docRef) => {
							alert("scanned succesfully");
						})
						.catch((error) => {
							console.error("Error adding document: ", error);
						});
				} else {
					alert("user not registered");
				}
			})
			.catch((error) => {
				alert(error.message);
			});
	}
});

// add event listeners

var first = activityRef.orderBy("enteredAt").limit(1);
var lastVisible = null;
qrCodeDl.addEventListener("click", (linkElement) => {
	var img = canvas[1].toDataURL("image/png");
	linkElement.target.href = img;
});
signUpReturnHome.addEventListener("click", () => {
	if (!qrCodeDl.classList.contains("disabled")) {
		qrCodeDl.classList.add("disabled");
	}
	if (!showQRSignUp.classList.contains("visually-hidden")) {
		showQRSignUp.classList.add("visually-hidden");
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

	const lastname = lastnameSignUp.value;
	const birthday = birthdaySignUp.value;
	const phoneNumber = phoneNumberSignUp.value;
	const city = citySignUp.value;
	const barangay = brgySignUp.value;
	const street = streetSignUp.value;
	const houseNumber = houseNumberSignUp.value;
	const email = emailSignUp.value;
	const password = passwordSignUp.value;
	const confirmPassword = confirmPasswordSignUp.value;
	let isOk = true;

	for (let i = 0; i < signUpInput.length; i++) {
		if (signUpInput[i].value == "") {
			signUpInput[i].classList.remove("is-valid");
			signUpInput[i].classList.add("is-invalid");
			isOk = false;
		} else {
			signUpInput[i].classList.remove("is-invalid");
			signUpInput[i].classList.add("is-valid");
		}
	}
	if (password != confirmPassword) {
		alert("confirm password does not match");
		passwordSignUp.classList.remove("is-valid");
		confirmPasswordSignUp.classList.remove("is-valid");
		passwordSignUp.classList.add("is-invalid");
		confirmPasswordSignUp.classList.add("is-invalid");
	} else if (!isOk) {
		alert("some input fields are still empty");
	} else {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				const userID = userCredential.user.uid;

				justSignedUp = true;
				const data = {
					id: userID,
					type: accType,
					firstname: firstname,
					lastname: lastname,
					birthday: birthday,
					phoneNumber: phoneNumber,
					city: city,
					barangay: barangay,
					street: street,
					houseNumber: houseNumber,
					email: email,
					password: password,
				};
				usersRef
					.doc(userID)
					.set(data)
					.then((response) => {
						console.log("evrythings good in the hood");
					})
					.catch((error) => {
						console.log("weee wooo weee wooo");
					});

				modalTitle.innerText = firstname;
				makeCode(userID);
				showQRSignUp.click();
				qrCodeDl.classList.remove("disabled");
				showQRSignUp.classList.remove("visually-hidden");

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

// nextBusiness.addEventListener("click", () => {
// 	return first
// 		.startAfter(lastVisible || 0)
// 		.get()
// 		.then((documentSnapshots) => {
// 			lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
// 			for (let i = 0; i < documentSnapshots.docs.length; i++) {
// 				console.log(documentSnapshots.docs[i].data());
// 			}
// 		})
// 		.catch((e) => {
// 			console.log(e);
// 		});
// });
