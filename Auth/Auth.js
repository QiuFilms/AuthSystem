import fetch from "node-fetch";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage('./storage'); 

class Auth {
    constructor({apiKey,projectID}){
        this.apiKey = apiKey
        this.projectID = projectID

        this.user = {}
        this.session = this.currentUser
    }

    

    get currentUser() {
        const session = JSON.parse(localStorage.getItem("user"))
        if(!session==false){
            return session
        }
        return this.user
    }

    setCurrentUser(user) {
        this.user = user
    }



    async signUp(email,password){
        const data = {
            email: email,
            password: password,
            apiKey:this.apiKey,
            projectID:this.projectID
        }


        return await fetch('http://localhost:5000/signUp', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(respond => respond.json())
            .then(json =>{
                if(json.status ==="failure"){
                    return "User already exist"
                }
                
                this.user = json
                localStorage.setItem("user",JSON.stringify(this.user))
                return json
            }

            )
    }

    signOut(){
        this.user = {}
        localStorage.setItem("user",false)
    }


    async signIn(email, password){
        const data = {
            email: email,
            password: password,
            apiKey:this.apiKey,
            projectID:this.projectID
        }

        return await fetch('http://localhost:5000/signIn', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(respond => respond.json())
            .then(json =>{
                if(json.status ==="failure"){
                    return "User does not exist"
                }
                
                this.user = json
                localStorage.setItem("user",JSON.stringify(this.user))
                return json
            })
    }


    generateRandomUser(){
        const email = Math.random().toString(36).slice(-8)+"@mail.com";
        const password = Math.random().toString(36).slice(-8);
        return this.signUp(email,password)
    }
}


export default Auth
export {}