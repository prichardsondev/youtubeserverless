function getPlaylist() {
    let genre = document.getElementById("genre").value;
    let yourStangeUrl ="https://g3k4zk06mc.execute-api.us-east-1.amazonaws.com/dev?"
    let url = `${yourStangeUrl}genre=${genre}`;
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data => window.open(data));

}

function addSong(){
    let genre = document.getElementById("genre").value;
    let id = document.getElementById("songid").value;
    let url = `https://g3k4zk06mc.execute-api.us-east-1.amazonaws.com/dev`;

    fetch(url, {  
        method: 'POST',   
        body: JSON.stringify({
        genre: genre,
        id:id
      })
    })
    .then(function (data) {  
      console.log('Request success: ', data);  
    })  
    .catch(function (error) {  
      console.log('Request failure: ', error);  
    });

}

