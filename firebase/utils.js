import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config'
import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut  } from "firebase/auth";
import { getDatabase, ref, onValue, set, child, get, remove, update} from "firebase/database";

const app = initializeApp(firebaseConfig)

const auth = getAuth();
const provider = new GoogleAuthProvider();
const providerFB = new FacebookAuthProvider();

const db = getDatabase(app);

function onAuth(setUserProfile, setUserData) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserProfile(user)
      getData(setUserData)
    } else {
      setUserProfile(user)
    }
  });
}

// ---------------------------Login, Sign Up and Sign In------------------------------------

function signUpWithEmail(email, password, setUserSuccess) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const obj = {displayName: user.displayName, email: user.email}
      return writeUserData('/users/' + user.uid, obj)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setUserSuccess('SignUpError')
      // ..
    });
}

function signInWithEmail(email, password, setUserSuccess) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setUserSuccess('Verify')
    });
}

 





  





function handleSignOut () {
  signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}

// -------------------------------Firebase Realtime Database------------------------------------

const dbRef = ref(getDatabase());

function getData(setUserData) {

  onValue(ref(db, '/'), (snapshot) => {
    if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setUserData('');
        }
    
  });
}

function getImageData(uid, setUserImage) {

  onValue(ref(db, `/${uid}`), (snapshot) => {
    if (snapshot.exists()) {
      setUserImage(snapshot.val());
        } 
    
  });
}

function getSpecificData(query, setUserSpecificData) {

  get(child(dbRef, `users/${query}`)).then((snapshot) => {
    if (snapshot.exists()) {
      setUserSpecificData(snapshot.val()) 
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

function writeUserData (rute, object, setUserSuccess, data) {
  console.log('write')
  update(ref(db, rute), object )
  .then(()=> setUserSuccess !== null? setUserSuccess(data ? data : 'save'): console.log('Save'))
  .catch(()=> setUserSuccess !== null?setUserSuccess('repeat'): console.log('no save'))
}

async function removeData (rute, setUserData, setUserSuccess) {
  await remove(ref(db, rute)).then(()=>setUserSuccess('save')).catch(()=>setUserSuccess('repeat'));
  getData(setUserData)

}
function getCode(code, uid, setUserSuccess){
  onValue(ref(db, '/activadores'), function(snapshot){  
        var b = snapshot.child(code).exists();                
        if (b === true ){
              var val = snapshot.child(code).val();
              if(val == false) {
                    const us = 'users' 
                    update(ref(db, '/activadores'), {[code]: true} )
                    // db.ref(`/activadores/${code}`).set(true)
                    update(ref(db, `/${us}/${uid}`), { uid: code, date: Date()}) 
                    setUserSuccess('Premium')
              }else{
                    console.log('ya esta en uso')
                    setUserSuccess('InUse')
              }
        } else {
           console.log('no exist')
           setUserSuccess('NonExist')
        }
  })
}

export { onAuth, signUpWithEmail, handleSignOut, getData, getSpecificData, writeUserData, removeData, getCode, signInWithEmail, getImageData}
