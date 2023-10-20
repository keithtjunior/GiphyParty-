const gallery = document.querySelector('#gallery-container');
const searchField = document.querySelector('#search');
const searchBtn = document.querySelector('#submit');
const deleteBtn = document.querySelector('#delete');

async function getGiphyImage(value){
    let res = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${value}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);
    console.log(res);
    const {embed_url, url} = getRandomGiphy(res.data);
    addGiphy(embed_url, url);
}

function getRandomGiphy(data){
    let randomNum = Math.floor(Math.random() * data.data.length);
    return data.data[randomNum];
}

function addGiphy(embed_url, url){
    const iframe = document.createElement("iframe");
    const p = document.createElement('p');
    const link = document.createElement('a');
    iframe.setAttribute('src', embed_url);
    iframe.setAttribute('width', 250);
    iframe.setAttribute('frameBorder', 0);
    iframe.classList.add('giphy-embed');
    link.setAttribute('href', url);
    p.append(link);
    gallery.append(iframe);
    gallery.append(p);
}

searchBtn.addEventListener('click', function(e){
    e.preventDefault();
    const searchVal = searchField.value;
    if(searchVal && searchVal.length >= 2)
        getGiphyImage(searchVal);
    else 
        alert('Please enter a search value with at least 2 characters');
    searchField.value = '';
    searchField.focus();
})

deleteBtn.addEventListener('click', function(e){
    e.preventDefault();
    if(gallery.innerHTML.length > 0)
        gallery.innerHTML = '';
    else
        alert('There are no Giphys to delete');
})