

import {auth} from "../firebase-config"

const user = auth.currentUser;

if (user !== null) {
    user.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
    });
}
export default function UserPanel() {
    return <h1>profile.uid</h1>


}