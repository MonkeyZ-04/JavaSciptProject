const form=document.getElementById('form');
const search=document.getElementById('search');
const result=document.getElementById('result');
const more=document.getElementById('more');

const apiURL="https://api.lyrics.ovh";

form.addEventListener('submit',e=>{
    e.preventDefault(); //กดปุ่มsubmit จะไม่มีการกระพริบหน้าจอ และไม่reset
    const songtext=search.value.trim(); //trim ลบช่องว่างซ้ายขวา

    if(!songtext){
        alert("Fill Music");
    }else{
        searchLyrics();
    }
});

async function searchLyrics(song){
    const res = await fetch(`${apiURL}/suggest/${song}`);
    //fetch ดึงข้อมูลจากapi
    const allSong = await res.json();
    showData(allSong);
}
function showData(songs){
    result.innerHTML=`
        <ul class="song">
            ${songs.data.map(song=>
                
                `<li>
                <span>
                    <strong>${song.artist.name}</strong> - ${song.title}
                </span>
                <button class="btn"
                 data-artist="${song.artist.name}"
                 data-song="${song.title}"
                >เนื้อเพลง</button>
                </li>`    

            ).join("")}
        </ul>    
    `;
    if(song.next || songs.prev){
        more.innerHTML=`
        ${songs.prev ? `<button class="btn" onclick="getMoreSongs(${songs.prev})">Next</button>`: ''}
        ${songs.next ? `<button class="btn" onclick="getMoreSongs(${songs.next})">Next</button>`: ''}
        `;
    }else{
        more.innerHTML="";
    }
}

async function getMoreSongs(songs){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${songUrl}`);
    const allSong = await res.json();
    showData(allSong);
}

result.addEventListener('click',e=>{
    const clickEl=e.target;

    if(clickEl.tagName=="BUTTON"){
        const artist = clickEl.getAttribute('data-artist');
        const songName = clickEl.getAttribute('data-song');

        getLyrics(artist,songName);
    }
});

async function getLyrics(artist,songName){
    const res = await fetch(`${apiURL}/v1/${artist}/${songName}`);
    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,"<br>");
    if(lyrics){
        result.innerHTML=`
        <h2><span>
        <strong>${artist}</strong> - ${songName}
        </span></h2>
        <span>${lyrics}</span>
        `;
    }else{
        result.innerHTML=`
        <h2><span>
        <strong>${artist}</strong> - ${songName}
        </span></h2>
        <span>NO Data</span>
        `;
    }
    more.innerHTML='';
}