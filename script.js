const chatContainer = document.getElementById("chatContainer");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const typing = document.getElementById("typing");
const clearChat = document.getElementById("clearChat");
const themeToggle = document.getElementById("themeToggle");
const sendSound = document.getElementById("sendSound");

window.onload = () => {

  setTimeout(()=>{
    document.getElementById("loader").style.display="none";
  },1500);

  loadMessages();

  if(chatContainer.innerHTML.trim()===""){
    addMessage(
      "Hello 👋 I am Nova AI. How can I help you today?",
      "bot"
    );
  }
};

sendBtn.addEventListener("click",sendMessage);

userInput.addEventListener("keypress",(e)=>{
  if(e.key==="Enter"){
    sendMessage();
  }
});

clearChat.addEventListener("click",()=>{
  localStorage.removeItem("novaChat");
  chatContainer.innerHTML="";
});

themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("light");
});

function sendMessage(){

  const message = userInput.value.trim();

  if(message==="") return;

  addMessage(message,"user");

  userInput.value="";

  sendSound.play();

  typing.style.display="block";

  setTimeout(()=>{

    typing.style.display="none";

    const response = getBotResponse(message.toLowerCase());

    addMessage(response,"bot");

  },1000);
}

function addMessage(text,sender){

  const messageDiv = document.createElement("div");

  messageDiv.classList.add("message",sender);

  const avatar = document.createElement("div");

  avatar.classList.add("avatar");

  avatar.classList.add(
    sender==="bot" ? "bot-avatar" : "user-avatar"
  );

  avatar.textContent = sender==="bot" ? "🤖" : "🧑";

  const bubble = document.createElement("div");

  bubble.classList.add("bubble");

  const time = new Date().toLocaleTimeString([],{
    hour:"2-digit",
    minute:"2-digit"
  });

  bubble.innerHTML = `
    ${text}
    <span class="time">${time}</span>
  `;

  if(sender==="user"){
    messageDiv.appendChild(bubble);
    messageDiv.appendChild(avatar);
  }else{
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
  }

  chatContainer.appendChild(messageDiv);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  saveMessages();
}

function getRandom(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function getBotResponse(input){

  const greetings = [
    "Hello 👋",
    "Hi there 😊",
    "Hey! How can I help?",
    "Greetings 🚀"
  ];

  const jokes = [
    "Why do programmers hate nature? Too many bugs 😂",
    "Why was the computer cold? It left its Windows open 😄",
    "Why do Java developers wear glasses? Because they don't C# 🤣"
  ];

  const motivation = [
    "Believe in yourself 💪",
    "Success starts with consistency 🚀",
    "Small progress is still progress 🌟"
  ];

  if(input.includes("hello") || input.includes("hi")){
    return getRandom(greetings);
  }

  else if(input.includes("how are you")){
    return "I'm doing amazing 🤖";
  }

  else if(input.includes("your name")){
    return "I am Nova AI Assistant.";
  }

  else if(input.includes("time")){
    return "Current time is " + new Date().toLocaleTimeString();
  }

  else if(input.includes("date")){
    return "Today's date is " + new Date().toLocaleDateString();
  }

  else if(input.includes("joke")){
    return getRandom(jokes);
  }

  else if(input.includes("motivate")){
    return getRandom(motivation);
  }

  else if(input.includes("weather")){
    return "I cannot access live weather yet 🌦";
  }

  else if(input.includes("ai")){
    return "Artificial Intelligence enables machines to simulate human intelligence 🤖";
  }

  else if(input.includes("code")){
    return "Coding is the language of the future 💻";
  }

  else if(input.includes("thank")){
    return "You're welcome 😊";
  }

  else if(input.includes("bye")){
    return "Goodbye 👋 Have a wonderful day!";
  }

  else if(input.includes("help")){
    return "You can ask about AI, coding, time, jokes, motivation, and more.";
  }

  else{
    return "I'm still learning 🤖 Please try asking something else.";
  }
}

function saveMessages(){
  localStorage.setItem(
    "novaChat",
    chatContainer.innerHTML
  );
}

function loadMessages(){

  const saved = localStorage.getItem("novaChat");

  if(saved){
    chatContainer.innerHTML = saved;
  }
}

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

for(let i=0;i<100;i++){

  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    radius:Math.random()*2,
    dx:(Math.random()-0.5),
    dy:(Math.random()-0.5)
  });
}

function animateParticles(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.radius,
      0,
      Math.PI*2
    );

    ctx.fillStyle="#00d2ff";

    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if(p.x<0 || p.x>canvas.width){
      p.dx *= -1;
    }

    if(p.y<0 || p.y>canvas.height){
      p.dy *= -1;
    }

  });

  requestAnimationFrame(animateParticles);
}

animateParticles();
