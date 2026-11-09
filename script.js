let forward_btn=document.querySelector(".forward-btn");
let backward_btn=document.querySelector(".backward-btn");
let play_btn=document.querySelector(".play-btn");
let song_details=document.querySelector(".thumnail-song-details");
let singer_details=document.querySelector(".thumnail-singer-details");
let progress=document.querySelector("#progress");
let menue=document.querySelector("#menu-btn");
let current_index=-1;
let selection_pg_btn=document.querySelector("#selection-page");
if(selection_pg_btn){selection_pg_btn.addEventListener('click',()=>{
    window.location.href="song-selection.html";
});
}
let audio=new Audio();
let player_track;
let song_option_btn=document.querySelectorAll(".song-option-btn");
if(song_option_btn){
song_option_btn.forEach(element=>{
    element.addEventListener('click',()=>{
    document.querySelector(".container2").style.display='none';
    document.querySelector(".container3").style.display='block';
    playSong(element);   
    });
});
}
let song_back_btn2=document.querySelector("#back-btn2");
if(song_back_btn2){song_back_btn2.addEventListener('click',()=>{
    window.location.href="song-selection.html";
});
}
let song_back_btn1=document.querySelector("#back-btn");
if(song_back_btn1){song_back_btn1.addEventListener('click',()=>{
    window.location.href="Music-player.html";
});
}
function playSong(element){
  play_btn.removeEventListener('click',handlingReplay);
let song_src=element.getAttribute("data-src");
let singer_name=element.getAttribute("data-singer");
forward_btn.disabled=false;
backward_btn.disabled=false;
let song_name=element.innerText;
current_index=Array.from(song_option_btn).indexOf(element);
singer_details.innerHTML=singer_name;
song_details.innerHTML=song_name;
    audio.src=song_src;
    audio.onloadedmetadata=function(){
    progress.max=audio.duration;
    progress.value=audio.currentTime;
    audio.play();
    }  
    player_track="play";
}
if(progress){
  if(audio.played){
  setInterval(()=>{
   progress.value=audio.currentTime;
    },500);
    progress.onchange=function(){
    audio.currentTime=progress.value;
}
}

forward_btn.addEventListener('click',()=>{
  handlingReplayBtnVisibility();
   if(current_index<song_option_btn.length-1){
    current_index++;
    let next=song_option_btn[current_index];
    audio.src=next.getAttribute("data-src");
    playSong(next);
     }else{
    forward_btn.disabled=true;
   }
});
backward_btn.addEventListener('click',()=>{
  handlingReplayBtnVisibility();
    if(current_index!=0){
    backward_btn.disabled=false;
    current_index--;
    let prev=song_option_btn[current_index];
    audio.src=prev.getAttribute("data-src");
    playSong(prev);
   }else{
    backward_btn.disabled=true;
   }
});
play_btn.addEventListener("click",()=>{
    handlingPlayPause();
});
  let current_state=document.querySelector("#play");
function handlingPlayPause(){
  if(audio.paused){
    current_state.classList.remove("fa-play");
    current_state.classList.add("fa-pause");
    player_track="play";
    audio.play();
  }else if(!audio.paused) {
    current_state.classList.remove("fa-pause");
    current_state.classList.add("fa-play");
    audio.pause();
    player_track="pause";
  }
}
audio.addEventListener('ended',()=>{
  current_index++;
  let next=song_option_btn[current_index];
  if(!next){ 
     player_track="ended";
    if(player_track=="ended"){
        replayHandler();
    }
  progress.onchange=function(){
  audio.currentTime=progress.value;
  handlingReplayBtnVisibility();
  player_track="play";
  play_btn.removeEventListener('click',handlingReplay);
  audio.play();
  }
  }
else{
      playSong(next);
    }
});
//handle player replay
function replayHandler(){
  current_state.classList.remove("fa-pause");
  current_state.classList.add("fa-arrow-rotate-left");
  if(player_track=="ended"){
    play_btn.addEventListener('click',handlingReplay);
  }
}
function handlingReplay(){
 playSong(song_option_btn[0]);
    player_track="play";
  handlingReplayBtnVisibility();
}
function handlingReplayBtnVisibility(){
  current_state.classList.remove("fa-arrow-rotate-left");
  current_state.classList.add("fa-pause");
}
}
