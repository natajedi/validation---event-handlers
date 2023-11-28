document.addEventListener('DOMContentLoaded', function() {
    let registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', handleSubmit);
    let agree = document.getElementById('agree');
    agree.addEventListener('change', handleAgreeChange);
 });
 
 function handleSubmit(event) {
    event.preventDefault();
 
    let email = document.getElementById('email');
    let fullName = document.getElementById('fullName');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');
 
    let emailError = createErrorElement(email);
    let fullNameError = createErrorElement(fullName);
    let passwordError = createErrorElement(password);
    let confirmPasswordError = createErrorElement(confirmPassword);
 
    let isValid = validateEmail(email, emailError);
    isValid = validateFullName(fullName, fullNameError) && isValid;
    isValid = validatePassword(password, passwordError) && isValid;
    isValid = validateConfirmPassword(password, confirmPassword, confirmPasswordError) && isValid;
 
    if (email.value === '' || fullName.value === '' || password.value === '' || confirmPassword.value === '') {
        alert('Заполните все поля');
        isValid = false;
    }
 
    if (isValid) {
        localStorage.setItem('email', email.value);
        localStorage.setItem('fullName', fullName.value);
        localStorage.setItem('password', password.value);
        alert('Вы успешно создали аккаунт');
    }
 }
 
 function handleAgreeChange() {
    let agree = document.getElementById('agree');
    let agreeError = document.getElementById('agreeError');
 
    if (!agree.checked) {
        agreeError.textContent = 'Вы обязаны подтвердить, что хотите зарегистрироваться';
        agreeError.style.display = 'block';
    } else {
        agreeError.textContent = '';
        agreeError.style.display = 'none';
    }
 }
 
 function createErrorElement(element) {
    let errorElement = document.createElement('div');
    errorElement.className = 'form-control__error';
    element.parentNode.insertBefore(errorElement, element.nextSibling);
    return errorElement;
 }
 
 function validateEmail(email, emailError) {
    let isValid = true;
    if (!email.validity.valid) {
        emailError.textContent = 'Некорректный email';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.textContent = '';
        emailError.style.display = 'none';
    }
    return isValid;
 }
 
 function validateFullName(fullName, fullNameError) {
    let isValid = true;
    if (fullName.value.length < 3) {
        fullNameError.textContent = 'Минимально допустимый размер ФИО 3 символа Максимально допустимый размер ФИО 150 символов';
        fullNameError.style.display = 'block';
        isValid = false;
    } else {
        fullNameError.textContent = '';
        fullNameError.style.display = 'none';
    }
    return isValid;
 }
 
 function validatePassword(password, passwordError) {
    let isValid = true;
    if (!password.validity.valid || !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,}$/.test(password.value)) {
        passwordError.textContent = 'Пароль должен содержать как минимум 8 символов, включая одну цифру, одну строчную букву, одну прописную букву и один специальный символ';
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.textContent = '';
        passwordError.style.display = 'none';
    }
    return isValid;
 }
 
 function validateConfirmPassword(password, confirmPassword, confirmPasswordError) {
    let isValid = true;
    if (password.value !== confirmPassword.value) {
        confirmPasswordError.textContent = 'Пароли не совпадают';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    } else {
        confirmPasswordError.textContent = '';
        confirmPasswordError.style.display = 'none';
    }
    return isValid;
 }
 