window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.");
}

const tempData = [
    { author: "Lewis Gavin", postname:"First Post", file: "js/posts/post1.txt", create_date: new Date()}
];

var db;
var request = window.indexedDB.open("postdb", 1);

request.onerror = function(event) {
  console.log("error: couldnt create/open db"); 
};

request.onsuccess = function(event){
    db = request.result;
    console.log("success: "+db);
};

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("posts", {autoIncrement:true});
    objectStore.add(tempData[0]);
};

function add(theAuthor, pName, theFilename){
    var request = db.transaction(["posts"], "readwrite")
                .objectStore("posts")
                .add({author: theAuthor, postname: pName, file: theFilename, create_date: new Date()});
                                 
        request.onsuccess = function(event) {
                alert("Successfully added");
        };
         
        request.onerror = function(event) {
                alert("Unable to add data to DB ");      
        }
}

function read(id) {
    var transaction = db.transaction(["posts"]);
    var objectStore = transaction.objectStore("posts");
    var request = objectStore.get(id);
    request.onerror = function(event){
        alert("Unable to retrieve data from database!");
        };
        request.onsuccess = function(event) {
            
            var theFile = new XMLHttpRequest();
            var allText;
            theFile.open("GET", request.result.file, false);
            theFile.onreadystatechange = function ()
            {
                if(theFile.readyState === 4)
                {
                    if(theFile.status === 200 || theFile.status == 0)
                    {
                        allText = theFile.responseText;
                    }
                }
            }
            theFile.send(null);

            var para = document.createElement("p");
            var theText = document.createTextNode(allText);
            para.appendChild(theText);
            var element = document.getElementById("article");
            element.appendChild(para);
            
            para = document.createElement("h2");
            theText = document.createTextNode(request.result.postname);
            para.appendChild(theText);
            element = document.getElementById("postname");
            element.appendChild(para);
            
            para = document.createElement("h3");
            theText = document.createTextNode("Author: " + request.result.author);
            para.appendChild(theText);
            element = document.getElementById("author");
            element.appendChild(para);

        };

}

function readAll() {
        var objectStore = db.transaction("posts").objectStore("posts");
  
        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
                alert("ID " + cursor.key + " is " + cursor.value.author + ", file: " + cursor.value.file + ", Date: " + cursor.value.create_date);
                cursor.continue();
          }
          else {
                alert("No more entries!");
          }
        };      
}

