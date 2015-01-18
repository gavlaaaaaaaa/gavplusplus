

<!DOCTYPE html>
<html>
<head>
<link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Blog Posts</title>
<meta name="description" content="Programming Posts">
<meta name="author" content="Lewis Gavin">
<!-- CSS Code -->
<link rel="stylesheet" href="../css/blogstyle.css">
<script src="../js/poststore.js"></script>

</head>

<body>

    <h1><a href="../aboutme.html"><img src="../css/pics/icon.png" id="icon"/></a>Lewis Gavin<br>
        <a href="https://uk.linkedin.com/in/lewisdgavin"><img src="../css/pics/linkedin-white.svg"/></a>
        <a href="https://plus.google.com/+LewisGavin/about"><img src="../css/pics/gplus-white.svg"/></a>
        <a href="https://twitter.com/GavLaaaaaaaa"><img src="../css/pics/twitter-white.svg"/></a></h1>
    
    <div id="nav"><a href="posts.php">Home</a><a href="createpost.php">Submit Post</a><a href="../aboutme.html">About Me</a></div>
               
        <?php 
            ini_set('display_errors',1); 
             error_reporting(E_ALL);
            include '../php/dbposts.php';
        ?>  

</body>

</html>