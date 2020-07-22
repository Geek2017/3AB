<?php 
$copy = $_POST['copy'];
$folder = $_POST["folder_name"];
// mkdir("test");

$nfodler="../../" . $folder;
$createJS = "../../" . $folder . "/js";
$createHTML = "../../" . $folder . "/html";
$createADS = "../../" . $folder . "/ads";
$createBot = "../../" . $folder . "/assets/ads/bot";
$createHuman = "../../" . $folder . "/assets/ads/human";
$createCSS = "../../" . $folder . "/css";
// echo $nfodler;

if($_POST["action"] == "create"){
    if(!file_exists($folder)){
        mkdir($nfodler, 0777, true);
        // mkdir($createJS, 0777, true);
        // mkdir($createHTML, 0777, true);
        mkdir($createBot, 0777, true);
        mkdir($createHuman, 0777, true);
        // mkdir($createCSS, 0777, true);
        echo 'Folder Created';
    } else {
        echo 'Folder Already Created';
    }
}



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

    // function custom_copy2($src2, $dst2) {  
  
    //     // open the source directory 
    //     $dir = opendir($src2);  
      
    //     // Make the destination directory if not exist 
    //     @mkdir($dst2);  
      
    //     // Loop through the files in source directory 
    //     while( $file = readdir($dir) ) {  
      
    //         if (( $file != '.' ) && ( $file != '..' )) {  
    //             if ( is_dir($src2 . '/' . $file) )  
    //             {  
      
    //                 // Recursively calling custom copy function 
    //                 // for sub directory  
    //                 custom_copy($src2 . '/' . $file, $dst2 . '/' . $file);  
      
    //             }  
    //             else {  
    //                 copy($src2 . '/' . $file, $dst2 . '/' . $file);  
    //             }  
    //         }  
    //     }  
      
    //     closedir($dir); 
    // }  

    // function custom_copy3($src3, $dst3) {  
  
    //     // open the source directory 
    //     $dir = opendir($src3);  
      
    //     // Make the destination directory if not exist 
    //     @mkdir($dst3);  
      
    //     // Loop through the files in source directory 
    //     while( $file = readdir($dir) ) {  
      
    //         if (( $file != '.' ) && ( $file != '..' )) {  
    //             if ( is_dir($src3 . '/' . $file) )  
    //             {  
      
    //                 // Recursively calling custom copy function 
    //                 // for sub directory  
    //                 custom_copy($src3 . '/' . $file, $dst3 . '/' . $file);  
      
    //             }  
    //             else {  
    //                 copy($src3 . '/' . $file, $dst3 . '/' . $file);  
    //             }  
    //         }  
    //     }  
      
    //     closedir($dir); 
    // } 
      
    // $src = "C:/xampp/htdocs/VerkoMarketing/skeliton/assets/js"; 
      
    // $dst = "C:/xampp/htdocs/VerkoMarketing/Copy/js"; 

    if($_POST["adType"] == "5Sec"){
        $src = "./Structure/5Sec"; 
    } else if ($_POST["adType"] == "Loader"){
        if($_POST["loader"] == "Default"){
            $src = "./Structure/Loader/DefaultLoader"; 
        } else if($_POST["loader"] == "Circle 1"){
            $src = "./Structure/Loader/Circle1Loader"; 
        } else if($_POST["loader"] == "Circle 2"){
            $src = "./Structure/Loader/Circle2Loader"; 
        }
        
    } else if ($_POST["adType"] == "ReadMore"){
        $src = "./Structure/ReadMore"; 
    }
      
    $dst = $nfodler; 

    // $src2 = "../../skeliton/assets/css"; 
      
    // $dst2 = $createCSS; 

    // $src3 = "../../skeliton/assets/ads"; 
      
    // $dst3 = $createADS; 
      
    custom_copy($src, $dst); 
    // custom_copy2($src2, $dst2); 
    // custom_copy3($src3, $dst3);
   }
  

  
?> 