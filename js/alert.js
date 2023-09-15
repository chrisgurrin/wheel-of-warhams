export const pickAlert = document.getElementById("pick-alert-background");
export const pickAlertMsg = document.getElementById("pick-alert-msg");

export const helpAlert = document.getElementById("help-alert-background");

export const setAlertMsg = (alertMsg, msg) => alertMsg.innerHTML = msg

export const showAlert = (alert) => alert.classList.add('visible')
export const hideAlert = (alert) => alert.classList.remove('visible')
