const form = document.querySelector(".button__submit");
const Name = document.getElementById("Name");
const email = document.getElementById("Email");
const passWord = document.getElementById("Password");
const passWord2 = document.getElementById("Password2");
const loginForm = document.querySelector("#login__form");
const registerForm = document.querySelector("#register__form");
let checkName = false,
  checkEmail = false,
  checkPassWord = false,
  checkPassWord2 = false;

form.addEventListener("click", (e) => {
  checkInputs();
  if (loginForm) {
    if (!checkEmail || !checkPassWord) {
      e.preventDefault();
    }
  }

  if (registerForm) {
    if (!checkEmail || !checkPassWord || !checkPassWord2 || !checkName) {
      e.preventDefault();
    }
  }
});

function checkInputs() {
  if (Name) {
    const nameValue = Name.value.trim();
    if (nameValue === "") {
      setErrorFor(Name, "Name cannot be blank");
      checkName = false;
    } else if (!isName(nameValue)) {
      setErrorFor(Name, "This is not Name");
      checkName = false;
    } else {
      setSuccessFor(Name);
      checkName = true;
    }
  }
  const emailValue = email.value.trim();
  const passWordValue = passWord.value.trim();

  if (passWord2) {
    const passWord2Value = passWord2.value.trim();
    if (passWord2Value === "") {
      setErrorFor(passWord2, "Rewrite password cannot be blank");
      checkPassWord2 = false;
    } else if (passWord2Value !== passWordValue) {
      setErrorFor(passWord2, "Password does not match");
      checkPassWord2 = false;
    } else {
      setSuccessFor(passWord2);
      checkPassWord2 = true;
    }
  }

  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
    checkEmail = false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "This is not Email");
    checkEmail = false;
  } else {
    setSuccessFor(email);
    checkEmail = true;
  }

  if (passWordValue === "") {
    setErrorFor(passWord, "Password cannot be blank");
    checkPassWord = false;
  } else if (!isPassWord(passWordValue)) {
    setErrorFor(passWord, "This is not Password");
    checkPassWord = false;
  } else {
    setSuccessFor(passWord);
    checkPassWord = true;
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const errorMassage = formControl.querySelector(".massage");
    errorMassage.innerText = message;
    formControl.className = "control error";
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "control success";
  }

  function isEmail(email) {
    return /^([\w-]+(\?\:\.[\w-]+)*)@((\?\:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(\?\:\.[a-z]{2})?)$/.test(
      email
    );
  }

  function isName(Name) {
    return /^[A-Za-z0-9]{1,20}$/.test(Name);
  }

  function isPassWord(passWord) {
    return /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/.test(passWord);
  }
}
