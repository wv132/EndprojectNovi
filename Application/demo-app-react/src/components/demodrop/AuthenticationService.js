import CryptoJS from "crypto-js";

class AuthenticationService {
  registerSuccesfulLogin(username, role) {
    var encrypted = CryptoJS.AES.encrypt(username, "Secret Passphrase");
    var encryptedRole = CryptoJS.AES.encrypt(role, "Secret Passphrase");

    console.log("registerSuccesfulLogin");
    sessionStorage.setItem("authenticatedUser", encrypted);
    sessionStorage.setItem("userRole", encryptedRole);
    
  }

  logout() {
    sessionStorage.removeItem("authenticatedUser");
    sessionStorage.removeItem("userRole");
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return false;
    return true;
  }
  getLoggedInUserName() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return "";
    return user;
  }
  getLoggedInUserRole() {
    let role = sessionStorage.getItem("userRole", "Secret Passphrase");

    if (role === null) return "";
    return role;
  }
}

export default new AuthenticationService();