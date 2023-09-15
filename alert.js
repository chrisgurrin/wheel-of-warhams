const alert = document.getElementById("alert-background");
const alertMsg = document.getElementById("alert-msg");

export const setAlertMsg = (msg) => alertMsg.innerHTML = msg

export const showAlert = () => alert.classList.add('visible')
export const hideAlert = () => alert.classList.remove('visible')

alert.onclick = hideAlert
alertMsg.onclick = hideAlert