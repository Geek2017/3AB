<?php
// $filename = $_POST["file_name"];
$folder = $_POST["folder"];


if($_FILES["humanFile"]["name"] != ''){
    //$test = explode(".", $_FILES["botFile"],["name"]);
    $location = "../../" . $folder . "/assets/ads/human/" . basename($_FILES["humanFile"]["name"]);
    move_uploaded_file($_FILES["humanFile"]["tmp_name"], $location);
    // echo "Added";
    $zip = new ZipArchive;
if ($zip->open($location) === TRUE) {
    $zip->extractTo("../../" . $folder . "/assets/ads/human/");
    $zip->close();
    echo 'Your .zip file was uploaded and unpacked.';
} else {
    echo 'There was a problem with the upload. Please try again.';
}

}

?>