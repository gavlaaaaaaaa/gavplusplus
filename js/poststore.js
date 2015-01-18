var posts;

var tags = ['<a', '<snip', '<code'];

window.onload = function(){
    //posts = parsecsv();
    //loadFirstPage(posts);
    var postheight = document.getElementById("posts").offsetHeight;
    var textheight = document.getElementById("article").offsetHeight;
    if(postheight < textheight){
        document.getElementById("posts").style.height = textheight+"px";
    }
};

window.onresize = function(event) {
    var postheight = document.getElementById("posts").offsetHeight;
    var textheight = document.getElementById("article").offsetHeight;
    if(postheight < textheight){
        document.getElementById("posts").style.height = textheight+"px";
    }

};

function parsecsv() {
    var theFile = new XMLHttpRequest();
    var allText;
    theFile.open("GET", "js/postlist.txt", false);
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
    var postList = allText.split(',\n');
    var posts = [];
    for (var i in postList){
        var data = postList[i].split(", ");
        posts.push({id: data[0], author: data[1], postname: data[2], filename: data[3], date: data[4]});
    }
    return posts;
    
}

function loadFirstPage(posts){
    var p = document.createElement("p");
    var element = document.getElementById('posts');
    
    var article_id = -1;

    for (var i in posts){
        var a = document.createElement("a");
        if(document.URL[document.URL.length-2] == '='){
            a.href = document.URL.substring(0, document.URL.length-3) + "?="+i;
            article_id = parseInt(document.URL[document.URL.length-1]);
        }
        else{
            a.href = document.URL + "?="+i;
        }
        a.innerHTML = posts[i].postname;
        p.appendChild(a);
        p.appendChild(document.createElement("br"));
        p.appendChild(document.createElement("br"));
        
    }
    element.appendChild(p);
    
    
    if(article_id >= 0){
        loadArticle(article_id);
    }
    else{
        loadArticle(0);
    }
}

function loadArticle(id){
    var postname = document.createElement("h2");
    var element = document.getElementById("postname");
    postname.appendChild(document.createTextNode(posts[id].postname));
    postname.appendChild(document.createElement("br"));
    postname.appendChild(document.createElement("br"));
    postname.appendChild(document.createTextNode(posts[id].date));
    element.appendChild(postname);

    var theFile = new XMLHttpRequest();
    var allText;

    var element = document.getElementById("article");
    var para = document.createElement("p");
    para.setAttribute("id", "text");
    
    theFile.open("GET", "js/posts/"+posts[id].filename, false);
    theFile.onreadystatechange = function ()
    {
        if(theFile.readyState === 4)
        {
            if(theFile.status === 200 || theFile.status == 0)
            {
                allText = theFile.responseText;
                allText = allText.split('\n');
                var theText;
                
                for(var i =0 ; i< allText.length; i++){
                    theText = allText[i];
                    var currentText = allText[i];
                    
                    for (var j = 0; j < tags.length; j++) {
                        if (allText[i].indexOf(tags[j]) > -1) {
                            var codetext = '';
                            if(tags[j] == "<code"){
                                
                                var temp = allText;
                                
                                for(var p = i; p < allText.length; p++){
                                    var line = temp[p];
                                    if(line[line.length-1] == '>'){
                                        codetext += temp[p];
                                        
                                        break;
                                    }
                                    codetext += temp[p] + ">>>";
                                }
                                currentText = codetext;
                                i = ++p;
                                
                            }
                            createNode(para, currentText, tags[j]);
                            theText ='';
                        }
 
                    }
                    
                    para.appendChild(document.createTextNode(theText));
                    para.appendChild(document.createElement("br"));
                }
            }
            else{
                allText = "Could not load post - try again later";
                para.appendChild(document.createTextNode(allText));
            }
            element.appendChild(para);
        }
    }
    theFile.send(null);
    
    
    var postheight = document.getElementById("posts").offsetHeight;
    var textheight = document.getElementById("text").offsetHeight;
    if(postheight < textheight){
        document.getElementById("posts").style.height = textheight+"px";
    }

}

function createNode(theElement, theText, theTag){
   
        var splittext = theText.split(theTag);

        theElement.appendChild(document.createTextNode(splittext[0]));
        if(splittext[1][0] == ' '){
            splittext[1] = splittext[1].substring(1);
        }
        var edittext = splittext[1].split('>');
    
        switch (theTag){
            case "<a":
                var a = document.createElement("a");
                a.href = edittext[0];
                var inner = "";
                for(var i = 1; i < edittext.length; i++){
                   inner += edittext[i] + " ";
                }
                a.innerHTML = inner;
                theElement.appendChild(a);
                break;
            case "<snip":
                var code = document.createElement("code");
                code.appendChild(document.createTextNode(edittext[0]));
                theElement.appendChild(code);
                theElement.appendChild(document.createTextNode(edittext[1]));
                break;
            case "<code":
                var codediv = document.createElement("div");
                codediv.setAttribute("id", "codediv");
                
                splittext[1] = splittext[1].substring(0, splittext[1].length-1);
                var edittext = splittext[1].split('>>>');
                
                var code = document.createElement("code1");
                                  
                for(var i in edittext){
                    code.appendChild(document.createTextNode(edittext[i]));
                    code.appendChild(document.createElement("br"));
                }
                codediv.appendChild(code);
                theElement.appendChild(codediv);
                break;
        }
}


