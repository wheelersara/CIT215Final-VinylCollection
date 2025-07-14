//Creates the default page layout for the vinyl collection as a function
const getPageLayout = () => {
  $(".container").append(`
    <header><h1>Vinyl Collection</h1></header>
    <div class="content">
        <aside><h1>Add A Vinyl to the Collection</h1></aside>
        <article>
            <div class="cardbox"></div>
        </article>
    </div>
  `);
};

//Function to add functionality to the buttons on the vinyl cards
const functionButtons = () => {
//Event listener for the buttons
  $(".cardbox").on("click", "button", function () {
    const type = this.className;
    const index = $("button." + type).index(this);
    //Checks the class of the button that was clicked with if/else statements and calls the functions associated
    if (type === "edit") {
      editVinyl(index);
    } else if (type === "details") {
      viewDetails(index);
    } else if (type === "delete") {
      deleteVinyl(index);
    }
});
}

//Creates the vinyl cards for each vinyl record in the array "vinyls" and appends them to a card in the cardbox
const getVinylCard = () =>{
    vinyls.forEach((vinyl, index) => { 
        $(".cardbox").append(`
            <div class="card">
                <h2>${vinyl.album}</h2>
                <img src="${vinyl.photo}">
                <p>Artist: ${vinyl.artist}</p>
                <div class="buttons">
                    <button class = "details">View More Details</button>
                    <button class = "edit">Edit Vinyl Details</button>
                    <button class="delete">Delete Vinyl</button>
                </div>
            </div>
        `)
    });
};

//Creates the function to add a new vinyl to the collection
const getNewVinyl = () => {
  //Disables the "Add Vinyl" button until the new vinyl form is filled out
  $("button.create").prop("disabled", true);
  //Creates element "newCard" with the HTML for the new vinyl 
  let newCard = $(`
    <h3>Album Name</h3>
    <input type="text" id="new_album">
    <h3>Artist Name</h3>
    <input type="text" id="new_artist">
    <h3>Genre</h3>
    <input type="text" id="new_genre">
    <h3>Year Released</h3>
    <input type="text" id="new_year_released">
    <h3>Number of Songs</h3>
    <input type="text" id="new_num_songs">
    `);

    //Appends the newCard element to the aside element within the content div
    $(".content aside").append(newCard);
    $("aside").append('<button class="create">Add Vinyl</button>');

    $("button.create").on("click" , function() {
        newVinyl = {
            album: $("#new_album").val(),
            artist: $("#new_artist").val(),
            genre: $("#new_genre").val(),
            year_released: $("#new_year_released").val(),
            num_songs: $("#new_num_songs").val(),
            photo: 'pictures/default.jpg' 
        };

        alert(`Vinyl has been created!`);

        vinyls.push(newVinyl);
        $(".cardbox").empty();
        getVinylCard();
        functionButtons();

    });

}

//Function to edit details of a vinyl
const editVinyl = (index) => {
    //Select card from the cardbox with the index of the button that was selected
    let card = $(".cardbox .card").eq(index);
            //HTML for editing vinyl details
            let editVinylDetails = $(`
                <div class="updateDetails">
                    <h2>Edit Vinyl Details</h2>
                    <p>Album Name:</p>
                    <input type="text" id="update_album" value="${vinyls[index].album}" />
                    <p>Artist Name:</p>
                    <input type="text" id="update_artist" value="${vinyls[index].artist}" />
                    <p>Genre:</p>
                    <input type="text" id="update_genre" value="${vinyls[index].genre}" />
                    <p>Year Released:</p>
                    <input type="text" id="update_year" value="${vinyls[index].year_released}" />
                    <p>Number of Songs:</p>
                    <input type="text" id="update_songs" value="${vinyls[index].num_songs}" />
                    <p>Save Changes:</p>
                    <button class="saveChanges">Save Changes</button>
                </div>
            `);
            
            //Appends the HTML from editVinylDetails to the card element
            card.html(editVinylDetails);
            
            //Applies the update values when "Save Changes" button is clicked
            $(".saveChanges").on("click", function() {
                vinyls[index] = {
                album: $("#update_album").val(),
                artist: $("#update_artist").val(),
                genre: $("#update_genre").val(),
                year_released: $("#update_year").val(),
                num_songs: $("#update_songs").val(),
                photo: 'pictures/default.jpg'
                };

                //Alert user that the vinyl is successfully modified
                alert(`Vinyl has been modified!`);
                $(".cardbox").empty();
                getVinylCard();
                functionButtons();
            });
};

//Function to view additional details of a vinyl
const viewDetails = (index) => {
    //Selects the card with the index of the vinyl
    let card = $(".cardbox .card").eq(index);
    //The HTML for the vinyl details is set to the variable viewVinylDetails
    const viewVinylDetails = $(`
      <h2>Vinyl Details</h2>
      <p>Album Name: ${vinyls[index].album}</p>
      <p>Artist Name: ${vinyls[index].artist}</p>
      <p>Genre: ${vinyls[index].genre}</p>
      <p>Year Released: ${vinyls[index].year_released}</p>
      <p>Number of Songs: ${vinyls[index].num_songs}</p>
      <div class="buttons">
        <button class="details">View More Details</button>
        <button class="edit">Edit Vinyl Details</button>
        <button class="delete">Delete Vinyl</button>
        <button class="returnHome">Return to Collection</button>
      </div>
    `);
  
  //Applies the HTML for the vinyl details to the card element
  card.html(viewVinylDetails);

  //Funtion called when the "Return to Collection" button is hit
  $(".returnHome").on("click", () => {
      //Sets the card to empty and calls function to display the card again and add back buttons
      $(".cardbox").empty();
      getVinylCard();
      functionButtons();
  });  
}


//Function to delete a vinyl from the collection
const deleteVinyl = (index) => {
    //Uses splice to remove the vinyl from the array
    vinyls.splice(index, 1);
    //Sets the card box to "empty"
    $(".cardbox").empty();

    //Calls the function to display the vinyl cards again and add funtions to the buttons
    getVinylCard();
    functionButtons();
    //Alert user of vinyl deletion
    alert(`Vinyl has been deleted from the collection.`);
};


//Calls the funtion to display the layout for the page, add new vinyls, display the cards
//with vinyl information, and assign functions to the buttons.
$(document).ready(() => {
    getPageLayout();
    getNewVinyl();
    getVinylCard();
    functionButtons();
});
