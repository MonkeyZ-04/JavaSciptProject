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
    const res = await fetch(`${apiURL}/suggest/${song}`);;
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
                <button>เนื้อเพลง</button>
                </li>`    

            ).join("")}
        </ul>    
    `;
}