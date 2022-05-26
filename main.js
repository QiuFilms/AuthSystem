import Auth from "./Auth/Auth.js";

const user = new Auth({
    apiKey: "###123",
    projectID: "aQdf"
})

//user.signUp("dd@gmail.com","asd123").then((data) =>{})

//user.signOut()

//user.signIn("dd@gmail.com","asd123").then((data) =>{console.log(data)})
console.log(user.currentUser)

console.log(user.generateRandomUser())

