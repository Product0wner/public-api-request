console.log("It is connected");

let searchContainer = document.getElementsByClassName("search-container");
let form = document.createElement("form");

form.innerHTML = 
'<form action="#" method="get">'+
'<input type="search" id="search-input" class="search-input" placeholder="Search...">'+
'<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">'+
'</form>';
searchContainer[0].append(form);
