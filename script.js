const scene=document.getElementById("scene"),status=document.getElementById("status"),message=document.getElementById("message"),sign=document.getElementById("placeSign"),pathLabel=document.getElementById("pathLabel"),theater=document.getElementById("theaterVisual"),interaction=document.getElementById("interaction"),interactionTitle=document.getElementById("interactionTitle"),interactionText=document.getElementById("interactionText"),continueBtn=document.getElementById("continue"),fade=document.getElementById("fade");
let step=0, x=50, y=68, canMove=true, interacted=false;
const steps=[
 {name:"ノスタルジア駅",msg:"駅を出て、追憶劇場へ向かう。"},
 {name:"追憶劇場",msg:"追憶劇場に着いた。入口を調べられる。"},
 {name:"黄昏坂",msg:"劇場を出た。夕暮れの坂道を、茶庭へ向かって歩く。"},
 {name:"宵凪茶庭",msg:"宵凪茶庭に着いた。水盤のそばで少し休める。"}
];
function setStep(n){
 step=n; const s=steps[step]; status.textContent=s.name; message.textContent=s.msg;
 scene.className="scene "+["station","theater","slope","garden"][step];
 sign.textContent=s.name;
 theater.style.display=step===0||step===1?"block":"none";
 pathLabel.textContent=step===0?"追憶劇場はこちら":step===1?"坂道へ":"";
 if(step===2){scene.querySelector(".sky").style.background="linear-gradient(#9a6e68,#e0a06f 65%,#e7c28b)";pathLabel.classList.add("walkHint")}
 if(step===3){scene.querySelector(".sky").style.background="linear-gradient(#202c35,#6c6470 65%,#a88973)";pathLabel.classList.remove("walkHint")}
}
function move(dx,dy){
 if(!canMove)return;
 x=Math.max(8,Math.min(92,x+dx)); y=Math.max(18,Math.min(88,y+dy));
 scene.style.setProperty("--px",x+"%");
 if(step===0 && x>68){open("追憶劇場","駅から見える劇場。ここから中へ入れる。","入る");}
 else if(step===1 && y<42){open("黄昏坂","劇場から宵凪茶庭へ向かう道。夕暮れの名所。","歩く");}
 else if(step===2 && y<30){open("宵凪茶庭","感情を抱え込むのではなく、巡らせるための庭。","入る");}
 else if(step===3 && x>40 && x<65 && y>55){open("静養水盤","浅い水盤と座れる場所がある。浄鱗魚が静かに泳いでいる。","座る");}
}
function open(title,text,action){if(interaction.classList.contains("hidden")){interactionTitle.textContent=title;interactionText.textContent=text;continueBtn.textContent=action;interaction.classList.remove("hidden");canMove=false}}
continueBtn.onclick=()=>{interaction.classList.add("hidden");canMove=true;
 if(step===0)setStep(1);
 else if(step===1)setStep(2);
 else if(step===2)setStep(3);
 else {message.textContent="しばらく水音を聞いて過ごした。"; interacted=true;}
};
document.addEventListener("keydown",e=>{
 const k=e.key.toLowerCase();
 if(k==="e"&&!interaction.classList.contains("hidden"))continueBtn.click();
 if(k==="arrowup"||k==="w")move(0,-4);
 if(k==="arrowdown"||k==="s")move(0,4);
 if(k==="arrowleft"||k==="a")move(-4,0);
 if(k==="arrowright"||k==="d")move(4,0);
});
document.querySelectorAll("[data-dir]").forEach(b=>b.addEventListener("pointerdown",e=>{e.preventDefault();const d=b.dataset.dir;({up:()=>move(0,-4),down:()=>move(0,4),left:()=>move(-4,0),right:()=>move(4,0)})[d]() }));
setStep(0);