function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (!username || !password) {
    error.style.color = "red";
    error.textContent = "Please enter both email and password.";
    setTimeout(() => {
    error.textContent = "";
  }, 1000);

    return;

    
  } 

  localStorage.setItem("userDetails", JSON.stringify({ username, password }));
  error.style.color = "lightgreen";
  error.textContent = "Signup successful! click on next to proceed.";
  setTimeout(() => {
    error.textContent = "";
  }, 1000);
}

function next() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  let error = document.getElementById("error");

  const storedUser = JSON.parse(localStorage.getItem("userDetails"));

  if (storedUser && username === storedUser.username && password === storedUser.password) {
    navigateWithTransition("card.html"); 
  } 
  else {
    error.style.color = "red";
    error.textContent = "sign up to proceed.";
    setTimeout(() => {
    error.textContent = "";
  }, 1000);
  }
 

}
function loginpage(){
  navigateWithTransition("log.html");
}

  
  
    let count = 0;
    let maxClicks = 3; 
    let button = document.getElementById("button");
    let message = document.getElementById("clickError");
    let error = document.getElementById("Error");


    button.addEventListener("click", () => {
      
      let email = document.getElementById("userEmail");
      let Userpassword = document.getElementById("userPassword");
      let storedUser = JSON.parse(localStorage.getItem("userDetails"));
      
      count++;
      let turns = maxClicks - count;
      if (storedUser && email.value === storedUser.username && Userpassword.value === storedUser.password) {
        navigateWithTransition("convertion.html");
        
      } 
      else{
         error.style.color = "red";
           error.textContent = `Invalid credentials. You have left with ${turns} attempts`;
           setTimeout(() => {
           error.textContent = "";
  }, 2000);
        //       button.disabled = true;
        // message.textContent = "you have left with no more attempts.";
       }
       if (count >= maxClicks) {
         button.disabled = true;
        message.textContent = "you have exceeded the maximum number of attempts.";
        
          //  error.style.color = "red";
          //  error.textContent = "Invalid credentials. Please try again.";
    }
        
      
      });
    

  




function goBack(){
 navigateWithTransition("index.html");
}



















