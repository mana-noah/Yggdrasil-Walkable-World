const scene=document.getElementById("scene"),status=document.getElementById("status"),message=document.getElementById("message"),sign=document.getElementById("placeSign"),pathLabel=document.getElementById("pathLabel"),theater=document.getElementById("theaterVisual"),player=document.getElementById("player"),interaction=document.getElementById("interaction"),interactionTitle=document.getElementById("interactionTitle"),interactionText=document.getElementById("interactionText"),continueBtn=document.getElementById("continue"),facingEl=document.getElementById("facing"),directionMark=document.getElementById("directionMark"),landmark=document.getElementById("landmark");
let step=0,x=50,y=68,canMove=true,interacted=false,facing="down";
const steps=[
{name:"ノスタルジア駅",msg:"駅を出て、追憶劇場へ向かう。"},
{name:"追憶劇場",msg:"劇場の前に立った。入口を調べられる。"},
{name:"黄昏坂",msg:"劇場を出た。夕暮れの坂道を、茶庭へ向かって歩く。"},
{name:"宵凪茶庭",msg:"宵凪茶庭に着いた。水盤のそばで少し休める。"}
];
const facingNames={up:"北",down:"南",left:"西",right:"東"};
function renderPlayer(){player.style.left=x+"%";player.style.top=y+"%";const rot={up:0,right:90,down:180,left:270}[facing];player.querySelector(".player-facing").style.transform="translateX(-50%) rotate("+rot+"deg)";facingEl.textContent=facingNames[facing]}
function setStep(n){
 step=n;x=50;y=68;facing="down";renderPlayer();
 const s=steps[step];status.textContent=s.name;message.textContent=s.msg;scene.className="scene "+["station","theater","slope","garden"][step];sign.textContent=s.name;
 theater.style.display=step===0||step===1?"block":"none";
 pathLabel.textContent=step===0?"追憶劇場":step===1?"黄昏坂":step===2?"宵凪茶庭":"静養水盤";
 pathLabel.classList.toggle("walkHint",step<3);
 directionMark.textContent=step===0?"↑":step===1?"↑":step===2?"↑":"●";
 directionMark.style.display="block";
 landmark.style.display=step===3?"block":"none";
 if(step===2)scene.querySelector(".sky").style.background="linear-gradient(#9a6e68,#e0a06f 65%,#e7c28b)";
 if(step===3)scene.querySelector(".sky").style.background="linear-gradient(#202c35,#6c6470 65%,#a88973)";
}
function move(dx,dy,dir){
 if(!canMove)return;
 if(dir)facing=dir;
 x=Math.max(8,Math.min(92,x+dx));y=Math.max(18,Math.min(88,y+dy));renderPlayer();
 if(step===0&&x>68)open("追憶劇場","駅から見える劇場。正面へ近づくと、入口が見えてくる。","入る");
 else if(step===1&&y<42)open("黄昏坂","劇場から宵凪茶庭へ向かう道。夕暮れの名所。","歩く");
 else if(step===2&&y<30)open("宵凪茶庭","感情を抱え込むのではなく、巡らせるための庭。","入る");
 else if(step===3&&x>40&&x<65&&y>55)open("静養水盤","浅い水盤と座れる場所がある。浄鱗魚が静かに泳いでいる。","座る");
}
function open(title,text,action){if(interaction.classList.contains("hidden")){interactionTitle.textContent=title;interactionText.textContent=text;continueBtn.textContent=action;interaction.classList.remove("hidden");canMove=false}}
continueBtn.onclick=()=>{interaction.classList.add("hidden");canMove=true;if(step===0)setStep(1);else if(step===1)setStep(2);else if(step===2)setStep(3);else{message.textContent="しばらく水音を聞いて過ごした。";interacted=true;directionMark.textContent="●";pathLabel.textContent="静養水盤"}}};
document.addEventListener("keydown",e=>{const k=e.key.toLowerCase();if(k==="e"&&!interaction.classList.contains("hidden"))continueBtn.click();if(k==="arrowup"||k==="w")move(0,-4,"up");if(k==="arrowdown"||k==="s")move(0,4,"down");if(k==="arrowleft"||k==="a")move(-4,0,"left");if(k==="arrowright"||k==="d")move(4,0,"right")});
document.querySelectorAll("[data-dir]").forEach(b=>{b.addEventListener("click",e=>{e.preventDefault();const d=b.dataset.dir;if(d==="up")move(0,-4,"up");if(d==="down")move(0,4,"down");if(d==="left")move(-4,0,"left");if(d==="right")move(4,0,"right")})});
setStep(0);