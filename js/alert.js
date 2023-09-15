export const alert = document.getElementById("alert-background");
export const alertMsg = document.getElementById("alert-msg");

export const setAlertPick = (msg) => alertMsg.innerHTML = msg

export const showAlert = () => alert.classList.add('visible')
export const hideAlert = () => alert.classList.remove('visible')
