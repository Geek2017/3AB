<?php
// $filename = $_POST["file_name"];
$folder = $_POST["folder"];

// $toBeDeleted = glob("../../". $folder . "/assets/ads/*"); // get all file names
// foreach($toBeDeleted as $file){ // iterate files
//   if(is_file($file))
//     unlink($file); // delete file
// }



if($_FILES["botFile"]["name"] != ''){
    //$test = explode(".", $_FILES["botFile"],["name"]);
    $location = "../../" . $folder . "/assets/ads/bot/" . basename($_FILES["botFile"]["name"]);
    move_uploaded_file($_FILES["botFile"]["tmp_name"], $location);
    // echo "Added";
    $zip = new ZipArchive;
if ($zip->open($location) === TRUE) {
    $zip->extractTo("../../" . $folder . "/assets/ads/bot/");
    $zip->close();
    echo 'Your .zip file was uploaded and unpacked.';
} else {
    echo 'There was a problem with the upload. Please try again.';
}

}

?>