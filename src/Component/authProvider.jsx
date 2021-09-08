import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase"; 

export const AuthContext=createContext();
let AuthProvider=({children})=>{ 

    let [loading, setLoading] = useState(true);
    let [currentUser, setCurrentUser] = useState(null);
    useEffect(()=>{
        console.log(children);
        let unsub=auth.onAuthStateChanged((user)=>{

            if(user){
                console.log(user);
                let {displayName, email, photoURL, uid}= user;
                console.log(displayName);
                
                let docRef=firestore.collection("users").doc(uid); // isne mujhe document ka reference diya. Agar pehle se document nhi hota to uska false reference deta hai
                console.log(docRef);
                docRef.get().then((doc)=>{
                     // yahan se maine document mangaya. Agar exist karta hoga to kuch may kar. Agar exits nhi karta to 
                     console.log(doc);
                    if(!doc.exists){
                        docRef.set({
                            displayName, 
                            email, 
                            photoURL,
                        })
                    }
                })

                setCurrentUser({displayName, uid, photoURL, email});
                // console.log(currentUser);
            }
            else {
                setCurrentUser(user);
            }

            setLoading(false);
        })

        return ()=>{
            console.log("HEllo");
            unsub();
        };
    }, [])

    return(
        <AuthContext.Provider value={currentUser}>
            { !loading && children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;