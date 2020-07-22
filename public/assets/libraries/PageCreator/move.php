<?php
// $filename = $_POST["file_name"];
// $folder = $_POST["folder"];
$copy = $_POST['copy'];
$folder_name = $_POST["folder_name"];
// mkdir("test");

$nfodler="../../../../../" . $folder_name . "/assets/ads/bot";

$createBot = "../../../../../" . $folder_name . "/assets/ads/bot";
$createHuman = "../../../../../" . $folder_name . "/assets/ads/human";

// $toBeDeleted = glob("../../../../". $folder_name . "/assets/ads/*"); // get all file names
// foreach($toBeDeleted as $file){ // iterate files
//   if(is_file($file))
//     unlink($file); // delete file
// }

if($_POST["action"] == "create"){
    if(!file_exists($folder)){
        // mkdir($nfodler, 0777, true);
        // mkdir($createJS, 0777, true);
        // mkdir($createHTML, 0777, true);
        mkdir($createBot, 0777, true);
        mkdir($createHuman, 0777, true);
        // mkdir($createCSS, 0777, true);
        // echo 'Folder Created';
    } else {
        // echo 'Folder Already Created';
    }
}



// $createJS = "../" . $folder . "/js";
// $createHTML = "../" . $folder . "/html";
// $createADS = "../" . $folder . "/ads";
$createCSS = "../../../../" . $folder_name . "/assets/css";
// echo $nfodler;



if ($copy == "copy"){
    function custom_copy($src, $dst) {  
  
        // open the source directory 
        $dir = opendir($src);  
      
        // Make the destination directory if not exist 
        @mkdir($dst);  
      
        // Loop through the files in source directory 
        while( $file = readdir($dir) ) {  
      
            if (( $file != '.' ) && ( $file != '..' )) {  
                if ( is_dir($src . '/' . $file) )  
                {  
      
                    // Recursively calling custom copy function 
                    // for sub directory  
                    custom_copy($src . '/' . $file, $dst . '/' . $file);  
      
                }  
                else {  
                    copy($src . '/' . $file, $dst . '/' . $file);  
                }  
            }  
        }  
      
        closedir($dir); 
    }  

     function custom_copy2($src2, $dst2) {  
  
        // open the source directory 
        $dir = opendir($src2);  
      
        // Make the destination directory if not exist 
        @mkdir($dst2);  
      
        // Loop through the files in source directory 
        while( $file = readdir($dir) ) {  
      
            if (( $file != '.' ) && ( $file != '..' )) {  
                if ( is_dir($src2 . '/' . $file) )  
                {  
      
                    // Recursively calling custom copy function 
                    // for sub directory  
                    custom_copy($src2 . '/' . $file, $dst2 . '/' . $file);  
      
                }  
                else {  
                    copy($src2 . '/' . $file, $dst2 . '/' . $file);  
                }  
            }  
        }  
      
        closedir($dir); 
    }  

      
    $src = "./demo/narrow-jumbotron"; 

    $dst = $nfodler; 

    $src2 = "./css"; 
      
    $dst2 = $createCSS;


      
    custom_copy($src, $dst); 
    custom_copy2($src2, $dst2); 

   }



?>