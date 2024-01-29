console.log("what it do malibu")

axios.get("/hello").then((res) => console.log(res.data.message))

const skiDisplay = document.querySelector("#skiDisplay");
const skiForm = document.querySelector("form");

    //1 create a new section element
    //2 add a class name "drinkCard"
    //3 add some innerHTML to newDrinkCard

const createSkicard = (skiObj) => {
    const skiCards = document.createElement("section")
    skiCards.className = "skiCard"
    
    skiCards.innerHTML = `
    <img src=${skiObj.picture} />
    <p>${skiObj.name}</p>
    
    <section>
    <button onclick="changeVote(${skiObj.id}, 'down')">-</button>
    How many votes? ${skiObj.votes}
    <button onclick="changeVote(${skiObj.id}, 'up')">+</button>
    </section>
    
    <br/>

    <button onclick="deleteSki(${skiObj.id})">Nah, not it fam!</button>
    `;
    
    skiDisplay.appendChild(skiCards)
};

//create a func that takes in an array of drink objects
//(our database array), and invokes createDrinkCard at each
//object in the array

const displayTheSkis = (skiArr) => {
    for (let i = 0; i < skiArr.length; i += 1) {
        createSkicard(skiArr[i])
    }
}

//function to call to the server and retrieve that data !!

const getTheSkis = () => {
    axios.get("/skis")
    .then ((res) => {
        console.log(res.data)
        displayTheSkis(res.data.allSkis)
    })

}

const newSkis = (evt) => {
    evt.preventDefault()
    let skiName = document.querySelector("#skiName");
    let skiImage = document.querySelector("#imgURL");
    
    let bodyObj = {
        skiName: skiName.value,
        skiImage: skiImage.value
    }
    
    skiDisplay.innerHTML = ""
    skiName.value = ""
    skiImage.value = ""

    axios.post("/newSki", bodyObj)
    .then((res) => {
        displayTheSkis(res.data.allSkis)
    });
}

const deleteSki = (id) => {
    axios

    .delete(`/deleteSki/${id}`)
    .then((res) => {
        skiDisplay.innerHTML = "";
        displayTheSkis(res.data.allSkis);
    });
}

const changeVote = (id, type) => {
    let bodyObj = {
        voteType: type
    }

    console.log("calling change vote", bodyObj);
    
    axios.put(`/changeVote/${id}`, bodyObj)
    .then((res) => {
        skiDisplay.innerHTML = "";
        displayTheSkis(res.data.allSkis)
    });
};

skiForm.addEventListener("submit", newSkis);
getTheSkis()