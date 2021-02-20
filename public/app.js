const auth = firebase.auth();
const firestore = firebase.firestore();
const usersRef = firestore.collection("users");

const sections = document.getElementsByTagName("section");
const homePage = document.getElementById("particles-js");
const emailSignIn = document.getElementById("email-sign-in");
const passwordSignIn = document.getElementById("password-sign-in");
const signUpPage = document.getElementById("sign-up-page");

const firstnameSignUp = document.getElementById("firstname-sign-up-input");
const lastnameSignUp = document.getElementById("lastname-sign-up-input");
const birthdaySignUp = document.getElementById("birthday-sign-up-input");
const provinceSignUp = document.getElementById("province-sign-up-input");
const citySignUp = document.getElementById("city-sign-up-input");
const brgySignUp = document.getElementById("barangay-sign-up-input");
const emailSignUp = document.getElementById("email-sign-up-input");
const passwordSignUp = document.getElementById("password-sign-up-input");
const signUpBtn = document.getElementById("sign-up-btn");
const qrCodeDl = document.getElementById("download-qr-code-btn");
const confirmPasswordSignUp = document.getElementById(
	"confirm-password-sign-up-input"
);
const accType = document.querySelector('input[name="acc-type-radio"]:checked');
const signUpInput = document.getElementsByClassName("sign-up-input");
const modalTitle = document.getElementById("exampleModalLabel");
const showQR = document.getElementById("show-qr-code");
const birthdayValue = new Date(Date.parse(birthdaySignUp.value));

const showSignUp = () => {
	homePage.style.display = "none";
	signUpPage.style.display = "block";
};
const returnHome = () => {
	if (!qrCodeDl.classList.contains("disabled")) {
		qrCodeDl.classList.add("disabled");
		console.log("disabled qrcodedl");
	}
	if (!showQR.classList.contains("visually-hidden")) {
		showQR.classList.add("visually-hidden");
		console.log("visually hidden show qr");
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
qrCodeDl.addEventListener("click", (linkElement) => {
	var myDiv = document.getElementById("qrcode");
	var myImage = myDiv.children[1];
	// linkElement.href = myImage.src;
	linkElement.target.href = myImage.src;
});
signUpBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const firstname = firstnameSignUp.value;

	const lastname = lastnameSignUp.value;
	const birthday = birthdaySignUp.value;
	const province = provinceSignUp.value;
	const city = citySignUp.value;
	const barangay = brgySignUp.value;
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
					type: accType.value,
					firstname: firstname,
					lastname: lastname,
					birthday: birthday,
					province: province,
					city: city,
					barangay: barangay,
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
const signIn = () => {
	const email = emailSignIn.value;
	const password = passwordSignIn.value;
	auth
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			var user = userCredential.user;
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
			console.log(errorCode);
		});
};
auth.onAuthStateChanged((user) => {
	if (user) {
		console.log(user.email + " is logged in");
	} else {
		console.log("no one's here");
	}
});

// shinanigans section

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
