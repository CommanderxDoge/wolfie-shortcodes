<?php
// PHP program to count the number  
// of occurrence of a word in 
// the given string given string 
function countWord($str, $word)  
{ 
    // split the string by spaces 
	$a = explode(" ", $str); 

    // search for pattern in string 
	$count = 0; 
	for ($i = 0; $i < sizeof($a); $i++)  
	{ 

    // if match found increase count 
		if ($word == $a[$i]) 
			$count++; 
	} 

	return $count; 
} 
// This code is contributed 
// by ChitraNayal 

