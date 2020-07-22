<?php

$jsonString = file_get_contents('data.json');
$data = json_decode($jsonString, true);
$botFileName = $_POST["botFileName"];
$humanFileName = $_POST["humanFileName"];
$folder = $_POST["folder"];

$data['id'] = 1;
$data['bot'] = "./assets/ads/bot/" . $botFileName;
$data['human'] = "./assets/ads/human/" . $humanFileName;


$newJsonString = json_encode($data, JSON_UNESCAPED_SLASHES);
file_put_contents('data.json', $newJsonString);

$srcfile='./data.json';
$dstfile= "../../" . $folder . "/assets/js/data.json";
// mkdir(dirname($dstfile), 0777, true);
copy($srcfile, $dstfile);

echo "Success";

?>