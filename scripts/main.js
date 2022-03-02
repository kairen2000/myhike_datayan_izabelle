function read_display_Quote() {
    // get into the right collection
    db.collection("quotes").doc("Tuesday")                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(TuesdayDoc => {                                                               //arrow notation
           console.log("current document data: " + TuesdayDoc.data());                          //.data() returns data object
           document.getElementById("quote-goes-here").innerHTML = TuesdayDoc.data().quote;      //using javascript to display the data on the right place
           
           //Here are other ways to access key:value data fields
           //$('#quote-goes-here').text(c.data().quote);                                       //using jquery object dot notation
           //$("#quote-goes-here").text(c.data()["quote"]);                                    //using json object indexing
      })
}
read_display_Quote()        //calling the function

//Callback example format #2  (function notation)
// db.collection("quotes").doc("Tuesday")
//     .get()
//     .then(
//     function(snap){                 //this is the callback function header
// 			  console.log(snap.data());   //print key value pairs
//     });

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {                                                                 
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                  .then(userDoc => {
               var user_Name = userDoc.data().name;
               console.log(user_Name);
               //method #1:  insert with html only
               //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
               //method #2:  insert using jquery
               $("#name-goes-here").text(user_Name);                         //using jquery
            })
        } else {
            // No user is signed in.
        }
    });
}
insertName();

function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code:"hikesquarry",
        name: "Quarry Rock Hike",
        city: "North Vancouver",
        province: "BC",
        level: "easy",
        length: "4 km",
        details: "Izabelle thinks this is a relaxing hike"
    });
    hikesRef.add({
        code:"hikescrunch",
        name: "Coquitlam Crunch",
        city: "Coquitlam",
        province: "BC",
        level: "moderate",
        length: "6.3 km",
        details: "Izabelle goes here regularly"
    });
    hikesRef.add({
        code:"hikes",
        name: "Garibaldi Lake Hike",
        city: "Squamish",
        province: "BC",
        level: "hard",
        length: "18 km",
        details: "Izabelle loves the view here"
    });
}

function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);
                var code = doc.data().code;

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = "./images/" + code + ".jpg"; //hikes.jpg

                //give unique ids to all elements for future use
                newcard.querySelector('.card-title').setAttribute("id", "hiketitle" + i);
                newcard.querySelector('.card-text').setAttribute("id", "hiketext" + i);
                newcard.querySelector('.card-image').setAttribute("id", "hikeimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;

                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("hikes");