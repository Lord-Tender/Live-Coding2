import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, listAll, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyCGHMNZxZC5nYvM8DvVIwWSEsvXBIdTXcE",
    authDomain: "live-coding-test-b976a.firebaseapp.com",
    projectId: "live-coding-test-b976a",
    storageBucket: "live-coding-test-b976a.appspot.com",
    messagingSenderId: "547114992199",
    appId: "1:547114992199:web:b49daacc6712e33ef2a762"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage();

let toDelete = ""

onAuthStateChanged(auth, (user) => {
    let userUid = user.uid

    const listRef = ref(storage, `${userUid}/Image/`);
    listAll(listRef)
        .then((res) => {
            res.prefixes.forEach((folderRef) => {
                console.log(folderRef);
            });
            res.items.forEach((itemRef, index) => {
                toDelete = itemRef
                getDownloadURL(itemRef)
                    .then((url) => {
                        if (res.items.length > 0) {
                            showImage.innerHTML += `
                                <div>
                                    <img src="${url}" alt=""/>
                                    <button class="form-control btn btn-danger btn-sm mt-3" onclick="deleteNow('${url}')">Delete</button>
                                </div>
                            `
                        }
                    })
                    .catch((error) => {

                    });
            });
        })
})

const deleteNow = () => {
    const desertRef = ref(storage, `${toDelete}`);
    deleteObject(desertRef).then(() => {
        alert("Deleted")
    }).catch((error) => {
        // Uh-oh, an error occurred!
    });
}

window.deleteNow = deleteNow

const upLoadFile = () => {
    alert("upLoadFile")
    let fileName = document.getElementById("fileName").value
    let file = document.getElementById('file').files
    if (file.length !== 0 && fileName !== "") {
        onAuthStateChanged(auth, (user) => {
            let currentUser = user.uid
            const storage = getStorage();

            const storageRef = ref(storage, `${currentUser}/Image/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file[0]);
        })
    }
}
window.upLoadFile = upLoadFile;