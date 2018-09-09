<?php
include "../controller/index/page.php";
$x=new page();
if(isset($_GET["m"])){
    $method=$_GET["m"];
}else{
    $method="index";
}
$x->$method();