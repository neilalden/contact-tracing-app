const auth = firebase.auth();
const firestore = firebase.firestore();
const usersRef = firestore.collection("users");

const sections = document.getElementsByTagName("section");
const homePage = document.getElementById("particles-js");
const signUpPage = document.getElementById("sign-up-page");
const dashboardPage = document.getElementById("dashboard");

const emailSignIn = document.getElementById("email-sign-in");
const passwordSignIn = document.getElementById("password-sign-in");

const firstnameSignUp = document.getElementById("firstname-sign-up-input");
const lastnameSignUp = document.getElementById("lastname-sign-up-input");
const birthdaySignUp = document.getElementById("birthday-sign-up-input");
const phoneNumberSignUp = document.getElementById("phone-number-sign-up-input");
const citySignUp = document.getElementById("city-sign-up-input");
const brgySignUp = document.getElementById("barangay-sign-up-input");
const houseNumberSignUp = document.getElementById("house-number-sign-up-input");
const streetSignUp = document.getElementById("street-sign-up-input");
const emailSignUp = document.getElementById("email-sign-up-input");
const passwordSignUp = document.getElementById("password-sign-up-input");
const signUpBtn = document.getElementById("sign-up-btn");
const qrCodeDl = document.getElementById("download-qr-code-btn");
const confirmPasswordSignUp = document.getElementById(
	"confirm-password-sign-up-input"
);
const accNameDash = document.getElementById("account-name-dashboard");
const modalTitle = document.getElementById("exampleModalLabel");
const showQR = document.getElementById("show-qr-code");
const accTypeSignUp = document.querySelector(
	'input[name="acc-type-radio"]:checked'
);
const rad = document.querySelectorAll(
	'input[type=radio][name="acc-type-radio"]'
);
const signUpInput = document.getElementsByClassName("sign-up-input");
const signUpForms = document.getElementsByClassName("sign-up-form");
const loaders = document.getElementsByClassName("loading-screen");
const birthdayValue = new Date(Date.parse(birthdaySignUp.value));

const userActivity = [];
function handleClick(myRadio) {
	const ind = document.getElementById("individual-form");
	const bus = document.getElementById("business-form");
	if (myRadio.value == "individual") {
		ind.setAttribute("style", "display: none !important");
		bus.setAttribute("style", "display: flex !important");
	} else {
		ind.setAttribute("style", "display: flex !important");
		bus.setAttribute("style", "display: none !important");
	}
}
auth.onAuthStateChanged((user) => {
	removeLoadingScreen();
	if (user) {
		showDashboard(user.uid);
	} else {
		returnHome();
	}
});

const showSignUp = () => {
	homePage.style.display = "none";
	signUpPage.style.display = "block";
};
const showLoadingScreen = () => {
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
	if (!qrCodeDl.classList.contains("disabled")) {
		qrCodeDl.classList.add("disabled");
	}
	if (!showQR.classList.contains("visually-hidden")) {
		showQR.classList.add("visually-hidden");
	}
	for (let i = 0; i < sections.length; i++) {
		sections[i].style.display = "none";
	}
	for (let i = 0; i < signUpInput.length; i++) {
		signUpInput[i].value = "";
		signUpInput[i].classList.remove("is-valid");
		signUpInput[i].classList.remove("is-invalid");
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
		auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				var user = userCredential.user.uid;
				showDashboard(user);
				emailSignIn.classList.remove("is-invalid");
				passwordSignIn.classList.remove("is-invalid");
				emailSignIn.value = null;
				passwordSignIn.value = null;
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(errorMessage);
				console.log(errorMessage);
				console.log(errorCode);

				emailSignIn.classList.add("is-invalid");
				passwordSignIn.classList.add("is-invalid");
			});
	}
};
const signOut = () => {
	auth
		.signOut()
		.then(() => {
			returnHome();
			userActivity.length = 0;
		})
		.catch((error) => {
			console.log(error);
		});
};

const showDashboard = (userId) => {
	for (let i = 0; i < sections.length; i++) {
		sections[i].style.display = "none";
	}
	dashboardPage.style.display = "block";

	usersRef
		.doc(userId)
		.get()
		.then((user) => {
			const type = user.data().type;
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
			showUserData({
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
		})
		.catch((error) => {
			console.log("Error getting document:", error);
		});
};

const showUserData = (userData) => {
	accNameDash.innerText = userData.firstname;
};

// add event listeners

qrCodeDl.addEventListener("click", (linkElement) => {
	var myDiv = document.getElementById("qrcode");
	var myImage = myDiv.children[1];
	linkElement.target.href = myImage.src;
});
signUpBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const accType = accTypeSignUp.value;
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
	let isOK = true;

	for (let i = 0; i < signUpInput.length; i++) {
		if (signUpInput[i].value == "") {
			signUpInput[i].classList.remove("is-valid");
			signUpInput[i].classList.add("is-invalid");
			isOK = false;
		} else {
			signUpInput[i].classList.remove("is-invalid");
			signUpInput[i].classList.add("is-valid");
		}
	}
	if (passwordSignUp.value != confirmPasswordSignUp.value) {
		passwordSignUp.classList.remove("is-valid");
		confirmPasswordSignUp.classList.remove("is-valid");
		passwordSignUp.classList.add("is-invalid");
		confirmPasswordSignUp.classList.add("is-invalid");
	} else if (isOK == false) {
		alert("make sure to fill up the form correctly");
	} else {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				const userID = userCredential.user.uid;
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
				usersRef.doc(userID).set(data);
				makeCode(userID);
				modalTitle.innerText = firstname;
				showQR.click();
				qrCodeDl.classList.remove("disabled");
				showQR.classList.remove("visually-hidden");
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
				alert(errorMessage);
			});
	}
});

// shinanigans section //

const makeCode = (data) => {
	const qrCodeContainer = document.getElementById("qrcode");
	while (qrCodeContainer.firstChild) {
		qrCodeContainer.removeChild(qrCodeContainer.lastChild);
	}
	const qrCode = new QRCode(qrCodeContainer);
	qrCode.makeCode(data);
};
particlesJS.load("particles-js", "src/particles.json", function () {});
var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
	fps: 10,
	qrbox: 250,
});
function onScanSuccess(qrCodeMessage) {
	console.log(qrCodeMessage);
}
html5QrcodeScanner.render(onScanSuccess);
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}
