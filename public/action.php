<?php

if(isset($_POST["action"])){
    // if($_POST["action"] == "fetch"){
    //     $folder = array_filter(glob('*'), 'is_dir');
    //     $output = '
    //     <table class="table table-boarded table-striped">
    //         <tr>
    //             <th>Folder Name</th>
    //             <th>Total File</th>
    //             <th>Update</th>
    //             <th>Delete</th>
    //             <th>Upload File</th>
    //             <th>View Upload File</th>
    //         </tr>
    //     ';

    //     if(count($folder) > 0){
    //         foreach($folder as $name){
    //             $output .= '
    //                 <tr>
    //                     <td>'.$name.'</td>
    //                     <td>'.(count(scandir($name)) - 2).'</td>
    //                     <td> <button type="button" name="update" data-name="'.$name.'" class="update btn btn-warning btn-xs">Update</button></td>
    //                     <td> <button type="button" name="delete" data-name="'.$name.'" class="delete btn btn-danger btn-xs">Delete</button></td>
    //                     <td> <button type="button" name="upload" data-name="'.$name.'" class="upload btn btn-info btn-xs">Upload File</button></td>
    //                     <td> <button type="button" name="view_files" data-name="'.$name.'" class="view_files btn btn-default btn-xs">View Files</button></td>
    //                 </tr>
    //             ';
    //         }
    //     } else {
    //         $output .= '
    //         <tr>
    //             <td colspan="6">No Folder Found</td>
    //         </tr>
    //         ';
    //     }
    //     $output .= '</table>';
    //     echo $output;

    // }

    if($_POST["action"] == "create"){
        if(!file_exists($_POST["folder_name"])){
            mkdir($_POST["folder_name"], 0777, true);
            echo 'Folder Created';
        } else {
            echo 'Folder Already Created';
        }
    }
}

?>