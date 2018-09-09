<?php
include "../core/db.php";
class page extends db{ 
	const PER_PAGE =4;
	public function index(){
		if(isset($_GET["x"])){
		    $x=$_GET["x"];
        }else{
		    $x=1;
        }

        $stmt=$this->pdo->query("select * from  new where cid=$x");
        $rows = $stmt->fetchAll();

		include'../views/index/index.html';
	}
	public function category(){
		include'../views/index/category.html';
	}
	public function search(){
		include'../views/index/search.html';
	}
}