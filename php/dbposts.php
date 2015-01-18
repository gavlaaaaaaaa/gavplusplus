<?php

class MyDB extends SQLite3
{
  function __construct()
  {
      
     $this->open('Blog/database/posts.db');
  }

}
$db = new MyDB();
if(!$db){
    echo 'Unable to connect to Database  - ' . $db->lastErrorMsg();
}

$POSTPAGENAME = "../posts.php";


if(isset($_POST['submit']))
{
   insertPost($db, $_POST['authorinput'], $_POST['postnameinput'], $_POST['posttextinput']);
} 

function insertPost($db, $author, $title, $posttext){
    
    $create_time = date('Y-m-d H:i:s');
    $filename = $author.$title.$create_time.".txt";
    $filename = preg_replace('/\s+/', '', $filename);
    $content = $_POST['posttextinput'];
    $fp = fopen($_SERVER['DOCUMENT_ROOT'] . "/Blog/database/postfiles/$filename", "wb");
    fwrite($fp, $content);
    fclose($fp);
    
    
    $ret = $db->exec("INSERT INTO POST (id, author, title, filename, create_time) VALUES (NULL, '$author', '$title', '$filename', '$create_time')");
    if(!$ret){
        echo $db->lastErrorMsg();
    }
    else{
        $pid = $db->lastInsertRowID();
        header('Location: http://localhost/Blog/posts.php?post='.$pid);
   }
     
}


if($_SERVER['SCRIPT_NAME'] == $POSTPAGENAME){

    if(isset($_GET['post'])){
        $postid= $_GET['post'];
    }
    else{
        $postid = 1;
    }
    
    displayPost($db, $postid);
}
else{
    loadlinks($db);
}

function displayPost($db, $postid){
    $ret = $db->query("SELECT * FROM post WHERE id=$postid");
    $row = $ret->fetchArray(SQLITE3_ASSOC);
    if(@$row['id'] != null){
        $title = $row['title'];
        $author = $row['author'];
        $createtime = $row['create_time'];
        $filename = $row['filename'];

        $date = new DateTime($createtime);
        $date->setTimezone(new DateTimeZone('Europe/London'));

        $createtime = $date->format('d/m/Y');

        $handle = fopen("Blog/database/postfiles/".$filename, "r");
        $contents = fread($handle, 5000);
        fclose($handle);
        $contents = nl2br($contents);

        echo "<div id='postname'><h2>$title</h2></div>
                <div id='author'><h3>$author - $createtime</h3></div>";
        loadLinks($db);
        echo "<p>$contents</p> </div>";
    }
    else{
        loadLinks($db);
        echo "<p>No such post - Why not select one from the links on the left!</p>";
    }
}

function loadLinks($db){
        echo "<div id='poststitle'><a href='createpost.php'>Submit a post!</a><br><br>Other Posts</div>
        <div id='article'><div id='posts'>";

        $ret = $db->query("SELECT id, title FROM post");
        while($row = $ret->fetchArray(SQLITE3_ASSOC)){
            echo "<p><a href='posts.php?post=".$row['id']."'>".$row['title'].'</a><br><br>';
        }
        echo "</p></div>";
}
    
?>