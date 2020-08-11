
const dataUrl = 'https://randomuser.me/api/?results=12'
let galleryContainer = document.querySelector(".gallery")
var profileData;
let searchInput = document.getElementById('search-input');
console.log(searchInput.value)

searchInput.addEventListener("keyup", (e) => {
    e.preventDefault();
    let searchedElements = profileData.filter(element => element.name.first.toLowerCase().includes(searchInput.value.toLowerCase()));
    galleryContainer.innerHTML = "";
    if(searchedElements.length > 0) {
        searchedElements.map(person => {
            let searchedElementHtml = document.createElement('section');
            searchedElementHtml.innerHTML = `
                <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${person.picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="card-text">${person.email}</p>
                        <p class="card-text cap">${person.location.city}</p>
                    </div>
                </div>
                `;
            galleryContainer.appendChild(searchedElementHtml);
        })    
    } else {
        console.log("Nobody found")
        let errorMessage = document.createElement('div');
        errorMessage.innerHTML = `
            <div style="width:50%; height:0; padding-bottom:50%; position:relative;">
                <iframe src="https://giphy.com/embed/d2jjuAZzDSVLZ5kI" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <p>
                <a href="https://giphy.com/gifs/lidl-voyages-confused-lost-d2jjuAZzDSVLZ5kI">via GIPHY</a>
            </p>
            <h3> We are sorry :) </h3>
            <p> I seems like ${searchInput.value} is not working here  </p>
        `
        galleryContainer.appendChild(errorMessage);
    }
})


function getProfiles (profileData) {
    profileData.map(person => {
        let section = document.createElement('section');
        section.innerHTML = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${person.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                    <p class="card-text">${person.email}</p>
                    <p class="card-text cap">${person.location.city}</p>
                </div>
            </div> 
            `;
        galleryContainer.appendChild(section);
    }) 
}

function showModal(e){
    let profilClickedOnDiv = e.target
    let profileClickedOnData = profileData.find(element => element.name.first + " " + element.name.last == profilClickedOnDiv.children[1].children[0].innerText)
    
    let dobDay = profileClickedOnData.dob.date.substring(8,10); 
    let dobMonth = profileClickedOnData.dob.date.substring(5,7)
    let dobYear = profileClickedOnData.dob.date.substring(2,4)
    let dob = `${dobMonth + "/" + dobDay + "/" + dobYear}`
   
    let modal = document.createElement('div');

    let cellNumberCleaned = ('' + profileClickedOnData.cell).replace(/\D/g, '') 
    let formatCheckNumber = cellNumberCleaned.match(/^(\d{3})(\d{3})(\d{2,})$/)
    let userCellNumber = '(' + formatCheckNumber[1] + ') ' + formatCheckNumber[2] + '-' + formatCheckNumber[3]

    modal.innerHTML = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${profileClickedOnData.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${profileClickedOnData.name.first + " " + profileClickedOnData.name.last}</h3>
                <p class="modal-text">${profileClickedOnData.email}</p>
                <p class="modal-text cap">${profileClickedOnData.location.city}</p>
                <hr>
                <p class="modal-text"> ${userCellNumber}</p>
                <p class="modal-text">${profileClickedOnData.location.street.number + " " + profileClickedOnData.location.street.name+ ", " + profileClickedOnData.location.state + ", " + profileClickedOnData.location.postcode }</p>
                <p class="modal-text">Birthday: ${dob}</p>
            </div>
        </div>
    </div>
    `
    document.body.appendChild(modal);
    
    let closeButton = document.getElementById("modal-close-btn")
    closeButton.addEventListener("click", ()=> {
        modal.innerHTML = "";
        cellNumberCleaned = "";
        formatCheckNumber = ""; 
    })
}

fetch(dataUrl)
    .then(response => response.json())
    .then(data => profileData = data.results)
    .then(getProfiles) 
    
galleryContainer.addEventListener("click", showModal);



