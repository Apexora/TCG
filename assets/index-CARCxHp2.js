var fg=Object.defineProperty;var pg=(n,e,t)=>e in n?fg(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var qe=(n,e,t)=>pg(n,typeof e!="symbol"?e+"":e,t);import{onSesion as mg,registrarVisita as gg}from"https://apexora.github.io/portal/portal-perfil.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();let H,ir,Ns,Ji,Ss,ec=!1,Rt=!1,Bu=!1,Dd=0,Ca=0,qu=0,Ui=0;try{Rt=localStorage.getItem("cartas-mute")==="1"}catch{}const _g=()=>Rt;function yg(){Rt=!Rt;try{localStorage.setItem("cartas-mute",Rt?"1":"0")}catch{}return ec&&Ji.gain.setTargetAtTime(Rt?0:.85,H.currentTime,.06),Rt}function vg(n){Dd=n}const Q=n=>440*Math.pow(2,(n-69)/12),Rs=(n,e)=>n+Math.random()*(e-n);function Eg(n){const e=H.sampleRate,t=Math.floor(e*n),r=H.createBuffer(2,t,e);for(let s=0;s<2;s++){const i=r.getChannelData(s);let a=0;for(let c=0;c<t;c++){const l=c/t,h=.9-.78*l;a+=(Math.random()*2-1-a)*h,i[c]=c<e*.018?0:a*Math.pow(1-l,2.8)*(c<e*.02?.2:1)}for(const[c,l]of[[23,.5],[37,.35],[53,.3],[71,.22]])i[Math.floor(e*(c+s*5)/1e3)]+=l*(s?-1:1)}return r}function Uc(){if(ec){H.state==="suspended"&&H.resume();return}H=new AudioContext,ec=!0;const n=H.createDynamicsCompressor();n.threshold.value=-20,n.knee.value=18,n.ratio.value=3.5,n.attack.value=.004,n.release.value=.22;const e=H.createBiquadFilter();e.type="lowshelf",e.frequency.value=140,e.gain.value=2.5;const t=H.createBiquadFilter();t.type="highshelf",t.frequency.value=6500,t.gain.value=1.5,Ji=H.createGain(),Ji.gain.value=Rt?0:.85;const r=H.createGain();r.connect(e).connect(t).connect(n).connect(Ji).connect(H.destination);const s=H.createConvolver();s.buffer=Eg(3.2);const i=H.createGain();i.gain.value=.9,s.connect(i).connect(r);const a=H.createDelay(1);a.delayTime.value=.375;const c=H.createGain();c.gain.value=.4;const l=H.createBiquadFilter();l.type="lowpass",l.frequency.value=2200,a.connect(l).connect(c).connect(a),l.connect(r),l.connect(s),ir=H.createGain(),Ns=H.createGain(),Ns.gain.value=.55;const h=(p,g,A)=>{p.connect(r);const k=H.createGain();if(k.gain.value=g,p.connect(k).connect(s),A){const V=H.createGain();V.gain.value=A,p.connect(V).connect(a)}};h(ir,.32,.06),h(Ns,.6,.22),Ss=H.createWaveShaper();const f=new Float32Array(1024);for(let p=0;p<1024;p++){const g=p/512-1;f[p]=Math.tanh(g*4)*.8}Ss.curve=f,Ss.oversample="2x",Ss.connect(ir)}function ye(n,e,t,r={}){const s=H.createGain(),i=H.createBiquadFilter(),a=H.createStereoPanner(),c=(r.vol??.1)*(r.det?.6:1),l=r.att??.004;if(i.type="lowpass",i.Q.value=r.q??.7,i.frequency.setValueAtTime(r.lp??9e3,e),r.lpEnd&&i.frequency.exponentialRampToValueAtTime(Math.max(40,r.lpEnd),e+t),a.pan.value=r.pan??0,s.gain.setValueAtTime(1e-4,e),s.gain.linearRampToValueAtTime(c,e+l),r.pad){const h=r.rel??t*.4;s.gain.setValueAtTime(c,e+Math.max(l,t-h)),s.gain.linearRampToValueAtTime(1e-4,e+t)}else s.gain.exponentialRampToValueAtTime(1e-4,e+t);i.connect(s).connect(a).connect(r.bus??ir);for(const h of r.det?[-r.det,r.det]:[0]){const f=H.createOscillator();if(f.type=r.type??"sine",f.frequency.setValueAtTime(n,e),f.detune.value=h,r.slide&&f.frequency.exponentialRampToValueAtTime(Math.max(20,n*Math.pow(2,r.slide/12)),e+t),r.vib){const p=H.createOscillator(),g=H.createGain();p.frequency.value=5,g.gain.value=r.vib,p.connect(g).connect(f.detune),p.start(e),p.stop(e+t+.1)}f.connect(i),f.start(e),f.stop(e+t+.1)}}function ke(n,e,t,r={}){const s=H.createOscillator(),i=H.createOscillator(),a=H.createGain(),c=H.createGain(),l=H.createStereoPanner(),h=(r.idx??2)*n;s.frequency.value=n,i.frequency.value=n*(r.ratio??2.01),a.gain.setValueAtTime(h,e),a.gain.exponentialRampToValueAtTime(Math.max(1,h*.02),e+t),i.connect(a).connect(s.frequency),c.gain.setValueAtTime(1e-4,e),c.gain.linearRampToValueAtTime(r.vol??.1,e+(r.att??.003)),c.gain.exponentialRampToValueAtTime(1e-4,e+t),l.pan.value=r.pan??0,s.connect(c).connect(l).connect(r.bus??ir),s.start(e),i.start(e),s.stop(e+t+.1),i.stop(e+t+.1)}let Ts;function Od(){if(Ts)return Ts;Ts=H.createBuffer(1,H.sampleRate*2,H.sampleRate);const n=Ts.getChannelData(0);let e=0,t=0,r=0;for(let s=0;s<n.length;s++){const i=Math.random()*2-1;e=.99765*e+i*.099,t=.963*t+i*.2965,r=.57*r+i*1.0527,n[s]=(e+t+r+i*.1848)*.2}return Ts}function Ne(n,e,t={}){const r=H.createBufferSource(),s=H.createBiquadFilter(),i=H.createGain(),a=H.createStereoPanner(),c=t.att??.004;r.buffer=Od(),s.type=t.type??"bandpass",s.Q.value=t.q??1,s.frequency.setValueAtTime(t.f0??1e3,n),s.frequency.exponentialRampToValueAtTime(Math.max(30,t.f1??t.f0??1e3),n+e),i.gain.setValueAtTime(1e-4,n),i.gain.linearRampToValueAtTime(t.vol??.1,n+c),i.gain.exponentialRampToValueAtTime(1e-4,n+e),a.pan.value=t.pan??0,r.connect(s).connect(i).connect(a).connect(t.bus??ir),r.start(n,Math.random()*1.4),r.stop(n+e+.05)}function pe(n,e,t,r){const s=H.createOscillator(),i=H.createGain();s.frequency.setValueAtTime(e*2.2,n),s.frequency.exponentialRampToValueAtTime(e,n+.09),i.gain.setValueAtTime(t,n),i.gain.exponentialRampToValueAtTime(1e-4,n+.7),s.connect(i).connect(r??ir),s.start(n),s.stop(n+.75),Ne(n,.06,{type:"lowpass",f0:1200,f1:300,vol:t*.5,bus:r})}const Fe=()=>H.currentTime+.01,Dr={hover:()=>ke(Q(96),Fe(),.09,{vol:.02,ratio:3.5,idx:.8,pan:Rs(-.3,.3)}),click:()=>{const n=Fe();Ne(n,.06,{f0:2200,f1:900,q:2,vol:.12}),ye(220,n,.1,{vol:.14,slide:-7})},select:()=>{const n=Fe();ke(Q(84),n,.5,{vol:.07,ratio:2,idx:1.2,pan:-.15}),ke(Q(91),n+.06,.6,{vol:.05,ratio:2,idx:1,pan:.15})},start:()=>{const n=Fe();[38,45,50,57,62,65].forEach((t,r)=>ye(Q(t),n,2.4,{type:"sawtooth",vol:.035,att:1,pad:!0,rel:1.2,lp:300,lpEnd:3200,det:9,pan:(r-2.5)*.15})),Ne(n,1.3,{f0:300,f1:7e3,q:.8,vol:.13,att:1.15}),pe(n,40,.5);const e=n+1.25;pe(e,48,1),[62,65,69,74,81].forEach((t,r)=>ye(Q(t),e,2.6,{type:"triangle",vol:.06,lp:4e3,pan:(r-2)*.25})),ke(Q(86),e,3,{vol:.09,ratio:1.5,idx:2})},pass:()=>{const n=Fe();Ne(n,.35,{f0:600,f1:200,q:1.2,vol:.09,att:.08}),ye(Q(50),n,.3,{vol:.08,slide:-5})},summon:()=>{const n=Fe();pe(n,48,.9),Ne(n,.5,{type:"lowpass",f0:3e3,f1:150,q:.7,vol:.25}),[81,86,90,93].forEach((e,t)=>ke(Q(e),n+.05+t*.05,1.2,{vol:.05,ratio:3,idx:1.5,pan:(t-1.5)*.3})),ye(Q(38),n,.9,{type:"sawtooth",vol:.08,lp:1500,lpEnd:150,det:12,att:.02})},summon_lum:()=>{const n=Fe();pe(n,52,.85),Ne(n,.75,{type:"bandpass",f0:400,f1:6500,q:.8,vol:.12,att:.4}),ye(Q(45),n+.12,1.3,{type:"triangle",vol:.11,lp:1800,att:.03}),[69,73,76,81,85].forEach((e,t)=>ke(Q(e),n+.2+t*.06,1.7,{vol:.06,ratio:2,idx:1.4,pan:(t-2)*.25})),ke(Q(93),n+.45,2.2,{vol:.045,ratio:3.01,idx:1})},summon_umb:()=>{const n=Fe();ye(Q(33),n,1.4,{type:"sawtooth",vol:.16,slide:-9,lp:1800,lpEnd:90,det:14,att:.02}),pe(n,40,1),Ne(n,.9,{type:"lowpass",f0:2200,f1:90,q:.7,vol:.22}),Ne(n+.1,.8,{type:"bandpass",f0:300,f1:1500,q:2,vol:.08,att:.3}),ke(Q(58),n+.05,1.9,{vol:.06,ratio:1.41,idx:3}),ke(Q(65),n+.12,1.7,{vol:.05,ratio:1.41,idx:2.5,pan:.3})},spell_lum:()=>{const n=Fe();[74,76,78,81,83,86,90].forEach((e,t)=>ye(Q(e),n+t*.055,1.3,{type:"triangle",vol:.07,pan:-.5+t*.16})),ke(Q(93),n+.4,2.2,{vol:.06,ratio:2.76,idx:1}),Ne(n,1.2,{type:"highpass",f0:5e3,f1:9e3,vol:.05,att:.5})},spell_umb:()=>{const n=Fe();ye(Q(50),n,1.4,{type:"sawtooth",vol:.12,slide:-12,lp:2400,lpEnd:100,det:15}),ye(Q(25),n,1.6,{vol:.35,att:.05}),Ne(n,1.2,{type:"lowpass",f0:200,f1:2600,vol:.18,att:.9}),ke(Q(63),n+.2,2,{ratio:1.414,idx:3,vol:.06,pan:-.3}),ke(Q(57),n+.2,2,{ratio:1.414,idx:3,vol:.05,pan:.3})},attack:()=>{const n=Fe(),e=n+.2;Ne(n,.22,{f0:800,f1:7e3,q:1.5,vol:.18,att:.12}),ke(Q(88),e,.7,{ratio:3.1,idx:3,vol:.09}),ke(Q(95),e,.5,{ratio:4.7,idx:2,vol:.05}),pe(e,70,.5),Ne(e,.12,{type:"highpass",f0:3e3,f1:1500,vol:.15})},hurt:()=>{const n=Fe();pe(n,45,1),ye(Q(40),n,.5,{type:"sawtooth",vol:.18,lp:1200,lpEnd:120,bus:Ss}),Ne(n,.35,{type:"lowpass",f0:2500,f1:100,vol:.3}),ke(Q(79),n+.02,1.2,{ratio:1.41,idx:2,vol:.04})},heal:()=>{const n=Fe();[74,78,81,86].forEach((e,t)=>ke(Q(e),n+t*.08,1.4,{vol:.06,ratio:2,idx:.8,pan:-.3+t*.2})),[62,69].forEach(e=>ye(Q(e),n,1.6,{vol:.08,att:.3,pad:!0}))},death:()=>{const n=Fe();ye(Q(55),n,1,{type:"sawtooth",vol:.14,slide:-14,lp:2500,lpEnd:100,det:14}),Ne(n,.9,{f0:3e3,f1:150,q:.6,vol:.16}),pe(n+.05,42,.7)},round:()=>{const n=Fe();[1,2.32,3.17,4.1,5.4].forEach((e,t)=>ye(Q(43)*e,n,3.6-t*.4,{vol:.09/(t+1),pan:(t%2?1:-1)*.2})),pe(n,52,.8),Ne(n,.5,{f0:500,f1:3e3,vol:.06,att:.4})},win:()=>{const n=Fe();[[62,66,69,74],[67,71,74,79],[69,73,76,81,86]].forEach((e,t)=>{e.forEach((r,s)=>{ye(Q(r),n+t*.45,1.9,{type:"triangle",vol:.055,lp:5e3,pan:(s-2)*.2}),ke(Q(r+12),n+t*.45+.02*s,1.8,{vol:.03,ratio:2,idx:.7})})}),pe(n+.9,50,.8)},lose:()=>{const n=Fe();[62,60,57,55,50].forEach((e,t)=>ye(Q(e),n+t*.5,2,{type:"sawtooth",vol:.07,lp:900,lpEnd:150,det:10,att:.1})),ye(Q(26),n,3,{vol:.2,att:.4,pad:!0})},msg:()=>{const n=Fe();ke(Q(93),n,.5,{vol:.05,ratio:2,idx:.6}),ke(Q(98),n+.08,.6,{vol:.04,ratio:2,idx:.6})}},Xi=new Map;function wg(n){Xi.has(n)||(Xi.set(n,null),fetch(`/TCG/sfx/${n}.mp3`).then(e=>{e.ok&&(e.headers.get("content-type")||"").startsWith("audio")&&Xi.set(n,e.url)}).catch(()=>{}))}const ht=(n,e,t=.07,r=.06,s=2,i=1.4)=>e.forEach((a,c)=>ke(Q(a),n+c*t,1.5,{vol:r,ratio:s,idx:i,pan:(c-(e.length-1)/2)*.25})),Pa=(n,e,t=.06,r=.07)=>e.forEach((s,i)=>ye(Q(s),n+i*t,1.1,{type:"triangle",vol:r,pan:(i-(e.length-1)/2)*.2})),fn=(n,e,t=.9,r=.1)=>ye(Q(e),n,t,{type:"sawtooth",vol:r,lp:500,lpEnd:2600,att:.12,det:8}),Vt=(n,e,t=1,r=.14,s=-8)=>ye(Q(e),n,t,{type:"sawtooth",vol:r,slide:s,lp:1800,lpEnd:90,det:14,att:.02}),Va=(n,e,t=1.2,r=.1)=>ye(Q(e),n,t,{type:"sawtooth",vol:r,slide:5,lp:1500,lpEnd:600,vib:25,att:.2}),Nt=(n,e,t=1.6,r=.04)=>e.forEach((s,i)=>ye(Q(s),n,t,{type:"sawtooth",vol:r,pad:!0,att:.5,rel:.8,lp:1400,vib:12,det:6,pan:(i-(e.length-1)/2)*.3})),bt=(n,e,t,r=.6,s=.12,i=.3)=>Ne(n,r,{type:"bandpass",f0:e,f1:t,q:.9,vol:s,att:i}),$i=(n,e=.5,t=.08)=>Ne(n,e,{type:"highpass",f0:5e3,f1:9e3,vol:t,att:.1}),Is=(n,e=1,t=.2)=>Ne(n,e,{type:"lowpass",f0:900,f1:80,q:.7,vol:t,att:.06}),dt=(n,e,t=.07)=>{ke(Q(e),n,1.6,{vol:t,ratio:1.41,idx:3}),ke(Q(e+7),n+.02,1.3,{vol:t*.7,ratio:2.76,idx:2})},bs=(n,e,t=.05,r=.1)=>{for(let s=0;s<e;s++)Ne(n+s*t,.04,{type:"highpass",f0:3e3,f1:6e3,vol:r,pan:s%2?.3:-.3})},Na=(n,e,t=.05,r=.09)=>{for(let s=0;s<e;s++)Ne(n+s*t,.09,{type:"bandpass",f0:1500,f1:600,q:1,vol:r,att:.02,pan:s%2?.4:-.4})},Tg={lum_acolita:n=>{ht(n,[84,88,91],.08,.05),Pa(n+.05,[76,79],.1,.05)},lum_vigia:n=>{fn(n,57,.5,.08),ht(n+.2,[88],.1,.05),pe(n,55,.4)},lum_centinela:n=>{dt(n,62),dt(n+.1,69,.05),pe(n,50,.7)},lum_portador:n=>{Pa(n,[72,76,79,84],.07),bt(n,800,4e3,.5,.08)},lum_halcon:n=>{bt(n,3e3,800,.4,.12,.05),Na(n+.05,5,.04),ht(n+.3,[96],.1,.05)},lum_novicia:n=>{Nt(n,[69,72,76],1.2),ht(n+.2,[81],.1,.05)},lum_sanadora:n=>{Pa(n,[67,71,74,79,83],.08),Nt(n,[67,74],1.5)},lum_vidente:n=>{ht(n,[88,93,98],.12),bt(n,2e3,6e3,.7,.06,.4)},lum_oraculo:n=>{Nt(n,[62,69,74],1.7),ht(n+.2,[86,90],.15),$i(n,.6,.05)},lum_paladin:n=>{fn(n,50,.9,.12),dt(n+.05,67),Na(n+.1,6,.05,.07)},lum_heraldo:n=>{fn(n,62,.8),fn(n+.15,69,.8),ht(n+.3,[93],.1)},lum_coloso:n=>{pe(n,43,1),dt(n,38,.09),Nt(n,[50,57],1.6),pe(n+.2,40,.7)},lum_lider:n=>{fn(n,55,.5),fn(n+.25,62,.5),fn(n+.5,67,.9,.12),dt(n+.5,74),pe(n+.5,48,.8)},lum_serafin:n=>{Na(n,10,.045),Nt(n,[74,81,86,93],2),ht(n+.3,[98,105],.15)},lum_arcangel:n=>{pe(n,40,1),fn(n,45,1.4,.14),Nt(n,[57,64,69,76],2.2),ht(n+.4,[93,100,105],.14),bt(n,500,7e3,.9,.1,.5)},umb_sombra:n=>{bt(n,1500,300,.6,.12,.08),Vt(n,45,.7,.06,-5)},umb_aprendiz:n=>{bs(n,4,.06),Vt(n+.1,52,.4,.08,-4)},umb_acechador:n=>{$i(n,.35,.1),dt(n+.05,86,.04),pe(n+.05,48,.5)},umb_cultista:n=>{Nt(n,[45,48,52],1.5,.05),ht(n+.2,[63,69],.2,.05,1.41,2.5)},umb_espectro:n=>{bt(n,4e3,500,.5,.1,.05),ye(Q(88),n,.7,{vol:.06,slide:-14,vib:30})},umb_esqueleto:n=>{bs(n,8,.04,.12),pe(n+.1,55,.5),dt(n+.3,60,.03)},umb_reptante:n=>{$i(n,.9,.1),Vt(n,40,.9,.1,-3),bs(n+.3,3,.08,.08)},umb_lobo:n=>{Va(n,57,1.3),Vt(n,40,.6,.1)},umb_sanguijuela:n=>{Ne(n,.5,{type:"lowpass",f0:900,f1:200,vol:.18,att:.15}),ye(Q(52),n,.6,{vol:.08,slide:7,vib:40})},umb_ritualista:n=>{Nt(n,[45,51,58],1.8,.05),ht(n+.15,[63,69],.2,.05,1.41,2.5),bt(n,400,2500,.8,.06,.4)},umb_golem:n=>{pe(n,36,1),dt(n,40,.1),Is(n,1,.2),dt(n+.18,43,.07)},umb_verdugo:n=>{bt(n,3e3,400,.3,.12,.05),dt(n+.2,50,.1),pe(n+.2,38,.9),Vt(n+.2,38,.8,.1)},umb_jinete:n=>{[0,.12,.24,.36].forEach((e,t)=>pe(n+e,t%2?55:60,.6)),Va(n+.3,69,1,.08),bt(n,600,3e3,.7,.08,.3)},umb_basalto:n=>{pe(n,38,1),Is(n,1.1,.2),dt(n,43,.08),bs(n+.1,3,.07,.1)},umb_devoradora:n=>{Vt(n,35,1.4,.15,-9),$i(n,.8,.09),ht(n+.2,[58,64],.15,.05,1.41,3),Va(n+.3,45,1.1,.06)},umb_azote:n=>{bt(n,800,5e3,.3,.14,.04),dt(n+.1,74,.08),Vt(n+.1,43,.6,.12),bs(n+.15,3,.05)},umb_behemot:n=>{pe(n,34,1),pe(n+.35,34,.8),Vt(n,31,1.6,.2,-6),Is(n,1.2,.22)},umb_abisal:n=>{Vt(n,29,2,.2,-10),Nt(n,[34,41,46],2.4,.05),Is(n,1.6,.18),ht(n+.3,[58,65],.2,.05,1.41,3)},umb_senor:n=>{pe(n,32,1),Nt(n,[38,45,50,57],2.4,.05),dt(n+.05,33,.12),bt(n,300,4e3,1,.08,.5),ht(n+.5,[69,75],.2,.05,1.41,3)},umb_titan:n=>{[0,.3,.6].forEach(e=>pe(n+e,30,1)),Vt(n,26,2.2,.22,-8),Is(n,1.8,.24),dt(n+.6,36,.12)}};for(const[n,e]of Object.entries(Tg))Dr["u_"+n]=()=>e(Fe());function Ig(n){if(!Rt)try{Uc(),(Dr["u_"+n]??Dr[n.startsWith("umb")?"summon_umb":"summon_lum"])()}catch{}}function ve(n){var t;if(Rt)return;wg(n);const e=Xi.get(n);if(e){const r=new Audio(e);r.volume=.7,r.play().catch(()=>{});return}try{Uc(),(t=Dr[n])==null||t.call(Dr)}catch{}}const Yi=60/72,Zi=Yi*4,bg=[38,34,41,36],Ag=[[62,65,69,74],[58,62,65,70],[57,60,65,69],[55,60,64,67]],ju=[62,65,67,69,72,74,77];function Sg(n,e){if(Rt||document.hidden)return;Ca+=(Dd-Ca)*.5;const t=e%4,r=Ag[t],s=Ca,i=Ns;if(r.forEach((c,l)=>ye(Q(c),n,Zi*1.08,{type:"sawtooth",vol:.02,att:1.2,pad:!0,rel:1.3,lp:650+s*900,det:8+l*2,pan:(l-1.5)*.35,bus:i})),ye(Q(bg[t]),n,Zi*1.02,{vol:.15,att:.25,pad:!0,rel:1,bus:i}),[0,2,1,3,2,1,3,2].forEach((c,l)=>{if(Math.random()<(s?.9:.7)){const h=r[c]+(l%4===3&&Math.random()<.4?12:0)+12;ye(Q(h),n+l*Yi/2,1.1,{type:"triangle",vol:.035+s*.01,pan:Math.sin(l)*.5,bus:i})}}),e%2===0&&Math.random()<.7&&ke(Q(ju[Math.floor(Math.random()*ju.length)]+12),n+Yi*(Math.random()<.5?0:2),3,{vol:.045,ratio:2,idx:.7,pan:Rs(-.5,.5),bus:i}),t===0&&pe(n,44,.35,i),s>.5)for(let c=0;c<4;c++)pe(n+c*Yi,c%2?80:58,c===2?.28:.18,i);for(let c=0;c<4;c++)Math.random()<.6&&Ne(n+Rs(0,Zi),.03,{type:"highpass",f0:4e3,f1:3e3,vol:Rs(.008,.02),pan:Rs(-.8,.8),bus:i})}function Rg(){const n=H.createBufferSource(),e=H.createBiquadFilter(),t=H.createGain(),r=H.createOscillator(),s=H.createGain();n.buffer=Od(),n.loop=!0,e.type="bandpass",e.frequency.value=420,e.Q.value=.9,t.gain.value=.045,r.frequency.value=.07,s.gain.value=.03,r.connect(s).connect(t.gain);const i=H.createOscillator(),a=H.createGain();return i.frequency.value=.05,a.gain.value=250,i.connect(a).connect(e.frequency),n.connect(e).connect(t).connect(Ns),n.start(),r.start(),i.start(),()=>{t.gain.setTargetAtTime(0,H.currentTime,.4),setTimeout(()=>{n.stop(),r.stop(),i.stop()},2e3)}}function kg(){Bu||(Uc(),Bu=!0,qu=0,Ui=H.currentTime+.15,Rg(),window.setInterval(()=>{for(;Ui<H.currentTime+1.3;)Sg(Ui,qu++),Ui+=Zi},400))}const Cg={lum:[45,168],umb:[272,350],fire:[22,48],heal:[145,50]},Ie=Math.random,L=(n,e)=>n+Ie()*(e-n),xa=n=>1-(1-n)**3;let wr,x,Br=0,Pn=0,tc=!1,nc=0;const Ar=[];function J(n){Ar.push({x:0,y:0,vx:0,vy:0,g:0,d:1,t:0,life:600,delay:0,sz:4,gr:0,rot:0,vr:0,h:45,s:100,l:70,a:1,n:0,w:2,add:!0,x1:0,y1:0,bulge:0,pts:[],cx:0,cy:0,ang:0,rad:0,va:0,vrad:0,...n}),tc||(tc=!0,nc=performance.now(),requestAnimationFrame(Md))}const qs=(n,e)=>setTimeout(e,n);function Md(n){const e=Math.min(40,n-nc),t=e/16.667;nc=n,x.clearRect(0,0,Br,Pn);for(let r=Ar.length-1;r>=0;r--){const s=Ar[r];if(s.delay>0){s.delay-=e;continue}if(s.t+=e,s.t>=s.life){Ar.splice(r,1);continue}if(s.k==="vort"){if(s.ang+=s.va*e,s.rad+=s.vrad*e,s.rad<2){Ar.splice(r,1);continue}s.x=s.cx+Math.cos(s.ang)*s.rad,s.y=s.cy+Math.sin(s.ang)*s.rad}else{s.vy+=s.g*t;const i=s.d**t;s.vx*=i,s.vy*=i,s.x+=s.vx*t,s.y+=s.vy*t,s.rot+=s.vr*t}Pg(s)}x.globalCompositeOperation="source-over",Ar.length?requestAnimationFrame(Md):(tc=!1,x.clearRect(0,0,Br,Pn))}function Pg(n){const e=n.t/n.life,t=1-e,r=s=>`hsla(${n.h},${n.s}%,${n.l}%,${Math.max(0,s)})`;switch(x.globalCompositeOperation=n.add?"lighter":"source-over",n.k){case"spark":x.lineCap="round",x.strokeStyle=r(t*.45),x.lineWidth=n.sz*2.6*t+1,x.beginPath(),x.moveTo(n.x,n.y),x.lineTo(n.x-n.vx*2.6,n.y-n.vy*2.6),x.stroke(),x.strokeStyle=`hsla(${n.h},60%,92%,${t})`,x.lineWidth=n.sz*t+.4,x.stroke();break;case"glow":case"smoke":case"vort":{const s=Math.max(1,n.sz*(1+n.gr*(n.k==="vort"?0:e))),i=n.a*(n.k==="smoke"?Math.min(1,e*6)*t:t),a=x.createRadialGradient(n.x,n.y,0,n.x,n.y,s);a.addColorStop(0,r(i)),a.addColorStop(.4,r(i*.45)),a.addColorStop(1,r(0)),x.fillStyle=a,x.beginPath(),x.arc(n.x,n.y,s,0,6.3),x.fill();break}case"ring":x.strokeStyle=r(n.a*t),x.lineWidth=n.w*t+.6,x.beginPath(),x.arc(n.x,n.y,n.sz+n.gr*xa(e),0,6.3),x.stroke();break;case"shard":x.save(),x.translate(n.x,n.y),x.rotate(n.rot),x.fillStyle=r(t*.95),x.beginPath(),x.moveTo(0,-n.sz),x.lineTo(n.sz*.45,n.sz*.6),x.lineTo(-n.sz*.4,n.sz*.5),x.closePath(),x.fill(),x.strokeStyle=`hsla(${n.h},40%,95%,${t})`,x.lineWidth=1,x.stroke(),x.restore();break;case"rune":{const s=n.sz*xa(Math.min(1,e*2.6)),i=n.a*(e<.12?e/.12:e>.6?(1-e)/.4:1),a=n.rot+n.vr*n.t;x.strokeStyle=r(i),x.lineWidth=2.2,x.beginPath(),x.arc(n.x,n.y,s,0,6.3),x.stroke(),x.lineWidth=1,x.beginPath(),x.arc(n.x,n.y,s*.84,0,6.3),x.stroke(),x.lineWidth=1.6,x.beginPath();for(let c=0;c<n.n;c++){const l=a+c/n.n*6.283,h=c%2?.93:.88;x.moveTo(n.x+Math.cos(l)*s*.84,n.y+Math.sin(l)*s*.84),x.lineTo(n.x+Math.cos(l)*s*(h+.07),n.y+Math.sin(l)*s*(h+.07))}if(x.stroke(),n.w>2){const c=n.w,l=c%2?(c-1)/2:c/2-1||1;x.lineWidth=1.8,x.beginPath();for(let h=0;h<=c;h++){const f=-a*.7-1.5708+h*l%c/c*6.283,p=n.x+Math.cos(f)*s*.8,g=n.y+Math.sin(f)*s*.8;h?x.lineTo(p,g):x.moveTo(p,g)}x.stroke()}break}case"pillar":{const s=n.sz*(.35+.65*Math.sin(Math.min(1,e*1.4)*1.57))*(e>.6?(1-e)/.4:1),i=n.a*(e<.1?e/.1:e>.55?(1-e)/.45:1),a=x.createLinearGradient(n.x-s,0,n.x+s,0);a.addColorStop(0,r(0)),a.addColorStop(.5,r(i)),a.addColorStop(1,r(0));const c=x.createLinearGradient(0,n.y-n.gr,0,n.y);c.addColorStop(0,"rgba(255,255,255,0)"),c.addColorStop(.4,"rgba(255,255,255,1)"),c.addColorStop(1,"rgba(255,255,255,0)"),x.fillStyle=a,x.fillRect(n.x-s,n.y-n.gr,s*2,n.gr);break}case"bolt":if(Ie()<.25)break;x.lineJoin="round",x.strokeStyle=r(t*.7),x.lineWidth=n.sz*3,x.beginPath(),n.pts.forEach((s,i)=>i?x.lineTo(s[0],s[1]):x.moveTo(s[0],s[1])),x.stroke(),x.strokeStyle=`hsla(${n.h},50%,96%,${t})`,x.lineWidth=n.sz*.8,x.stroke();break;case"slash":{const s=xa(Math.min(1,e*4)),i=n.x+(n.x1-n.x)*s,a=n.y+(n.y1-n.y)*s,c=(n.x+i)/2,l=(n.y+a)/2,h=-(a-n.y),f=i-n.x,p=Math.hypot(h,f)||1,g=n.bulge*s,A=h/p*g,k=f/p*g;x.beginPath(),x.moveTo(n.x,n.y),x.quadraticCurveTo(c+A,l+k,i,a),x.quadraticCurveTo(c+A*.3,l+k*.3,n.x,n.y),x.fillStyle=`hsla(${n.h},60%,96%,${t})`,x.shadowColor=`hsl(${n.h},100%,60%)`,x.shadowBlur=24,x.fill(),x.shadowBlur=0,x.strokeStyle=r(t*.7),x.lineWidth=3,x.stroke();break}}}const rt=(n,e=0)=>Cg[n][e];function tr(n,e,t,r,s,i={}){for(let a=0;a<t;a++){const c=i.rot??Ie()*6.283,l=L(.35,1)*s,h=i.rot!==void 0?L(-.5,.5):0;J({k:"spark",x:n,y:e,vx:Math.cos(c+h)*l,vy:Math.sin(c+h)*l,g:.16,d:.93,life:L(420,820),sz:L(1.6,3),h:rt(r,Ie()<.35?1:0),l:66,...i,rot:0})}}function fo(n,e,t,r,s=L(-.9,-.5)){const i=Math.cos(s)*t,a=Math.sin(s)*t;J({k:"slash",x:n-i,y:e-a,x1:n+i,y1:e+a,bulge:t*.28,life:420,h:rt(r),s:100,l:66,add:!0}),J({k:"slash",x:n-i*.8,y:e-a*.8+t*.12,x1:n+i*.9,y1:e+a*.9+t*.12,bulge:t*.2,life:360,delay:60,h:rt(r,1),s:100,l:70,add:!0})}function js(n,e,t,r,s=1){J({k:"glow",x:n,y:e,sz:t*.95,gr:1.1,life:420,h:rt(r),l:78,a:.95}),J({k:"glow",x:n,y:e,sz:t*.38,gr:.3,life:180,h:50,s:40,l:96,a:1}),J({k:"ring",x:n,y:e,sz:t*.12,gr:t*1.05,w:7,life:520,h:rt(r),l:72}),J({k:"ring",x:n,y:e,sz:t*.1,gr:t*.75,w:3,life:480,delay:90,h:rt(r,1),l:74}),fo(n,e,t*.8,r),tr(n,e,Math.round(26*s),r,t*.1);for(let i=0;i<7*s;i++){const a=Ie()*6.283,c=L(2,6)*t/110;J({k:"shard",x:n,y:e,vx:Math.cos(a)*c,vy:Math.sin(a)*c-1.5,g:.2,d:.97,rot:Ie()*6,vr:L(-.25,.25),sz:t*L(.05,.1),life:L(520,860),h:rt(r,i%2),l:62})}for(let i=0;i<3;i++)J({k:"smoke",x:n+L(-8,8),y:e,vx:L(-.5,.5),vy:L(-.7,-.1),d:.98,sz:t*L(.3,.5),gr:1,life:L(700,1e3),a:.3,h:r==="umb"?272:30,s:40,l:r==="umb"?30:60})}const po=n=>n.getBoundingClientRect();function Ld(){const n=document.getElementById("app");n&&(n.classList.remove("shk-soft","shk-hard"),n.offsetWidth,n.classList.add("shk-hard"))}function Vg(n,e,t,r){const a=e.width,c=e.height,l=e.left+a/2,h=e.top+c/2,f=Array.from({length:5},(V,N)=>Array.from({length:4},(K,z)=>[z/3*a+(z&&z<3?L(-.09,.09)*a:0),N/4*c+(N&&N<4?L(-.07,.07)*c:0)])),p=n.cloneNode(!0);p.classList.remove("dying","enter","hurt","boost"),p.removeAttribute("data-a"),p.removeAttribute("data-uid"),p.style.cssText=`--w:${a}px;position:fixed;left:${e.left}px;top:${e.top}px;width:${a}px;height:${c}px;margin:0;animation:none;transition:none;pointer-events:none;z-index:90;will-change:transform,opacity`;const g=document.createDocumentFragment(),A=[],k=[];for(let V=0;V<4;V++)for(let N=0;N<3;N++){const K=f[V][N],z=f[V][N+1],B=f[V+1][N+1],j=f[V+1][N],le=(N+V)%2;for(const q of le?[[K,z,j],[z,B,j]]:[[K,z,B],[K,B,j]]){const E=p.cloneNode(!0),_=(q[0][0]+q[1][0]+q[2][0])/3,y=(q[0][1]+q[1][1]+q[2][1])/3;E.style.clipPath=`polygon(${q.map(pt=>pt[0].toFixed(1)+"px "+pt[1].toFixed(1)+"px").join(",")})`;const w=_-a/2,T=y-c/2,I=Math.hypot(w,T)||1,v=L(.8,1.9)*a*.55*r,De=L(-240,240)*r;g.append(E),k.push(E),A.push(E.animate([{transform:"translate(0,0) rotate(0)",opacity:1,filter:"brightness(2.6) saturate(1.4)"},{transform:`translate(${w/I*v*.55}px,${T/I*v*.55-c*.12}px) rotate(${De*.5}deg)`,opacity:1,filter:"brightness(1.2)",offset:.35},{transform:`translate(${w/I*v}px,${T/I*v+c*L(.5,1)}px) rotate(${De}deg) scale(.8)`,opacity:0,filter:"brightness(.6)"}],{duration:L(650,1e3),easing:"cubic-bezier(.2,.7,.4,1)",fill:"forwards"}))}}document.body.append(g),Promise.allSettled(A.map(V=>V.finished)).then(()=>k.forEach(V=>V.remove())),J({k:"glow",x:l,y:h,sz:a*1.1,gr:.6,life:380,h:rt(t),l:85,a:.8}),J({k:"ring",x:l,y:h,sz:a*.2,gr:a*1.2*r,w:6,life:520,h:rt(t),l:78})}function Ng(n,e,t,r){x&&(J({k:"glow",x:n,y:e,sz:t*1.3,gr:.5,life:260,h:48,s:40,l:96,a:1}),js(n,e,t*1.15,r,1.4),js(n,e,t*.7,"fire",1),Ld())}function xg(n,e,t){if(!x)return;const r=performance.now();let s=NaN,i=NaN;const a=()=>{if(!n.isConnected||performance.now()-r>e)return;const c=po(n),l=c.left+c.width/2,h=c.top+c.height/2,f=c.width;if(!isNaN(s)){const p=Math.hypot(l-s,h-i),g=Math.min(14,Math.ceil(p/(f*.16)));if(p>1.5)for(let A=1;A<=g;A++){const k=A/g,V=s+(l-s)*k,N=i+(h-i)*k;J({k:"glow",x:V,y:N,sz:f*L(.42,.6),gr:-.35,life:360,h:rt(t,A%2),l:68,a:.42}),Ie()<.4&&J({k:"spark",x:V+L(-f*.3,f*.3),y:N+L(-f*.3,f*.3),vx:-(l-s)*.08,vy:-(h-i)*.08,g:0,d:.92,life:L(260,440),sz:1.8,h:rt(t),l:78})}}s=l,i=h,requestAnimationFrame(a)};requestAnimationFrame(a)}function Dg(n,e,t){J({k:"glow",x:n,y:e,sz:t*.9,gr:.6,life:1100,h:46,l:82,a:.55}),J({k:"pillar",x:n,y:Pn,sz:t*.55,gr:Pn*1.1,life:1250,h:48,l:76,a:.7}),J({k:"rune",x:n,y:e,sz:t,n:28,w:8,life:1500,rot:0,vr:7e-4,h:46,l:72,a:.95}),J({k:"rune",x:n,y:e,sz:t*.62,n:18,w:6,life:1400,delay:80,rot:1,vr:-.0011,h:168,l:70,a:.85});for(let r=0;r<46;r++){const s=Ie()*6.283,i=L(.2,1)*t;J({k:"glow",x:n+Math.cos(s)*i,y:e+Math.sin(s)*i*.55+t*.3,vx:L(-.3,.3),vy:-L(.8,3.2),g:-.01,d:.995,sz:L(3,8),life:L(800,1500),delay:Ie()*600,h:Ie()<.3?168:48,l:82,a:.9})}qs(460,()=>{J({k:"ring",x:n,y:e,sz:t*.2,gr:t*2.1,w:10,life:800,h:48,l:80}),J({k:"ring",x:n,y:e,sz:t*.1,gr:t*1.5,w:4,life:700,h:168,l:80}),J({k:"glow",x:n,y:e,sz:t*1.3,gr:.5,life:500,h:50,s:40,l:96,a:.8}),tr(n,e,44,"lum",t*.085)})}function Og(n,e,t){J({k:"smoke",x:n,y:e,sz:t*1.2,gr:.8,life:1500,h:270,s:60,l:14,a:.55,add:!1}),J({k:"rune",x:n,y:e,sz:t,n:20,w:5,life:1500,rot:0,vr:-9e-4,h:350,l:62,a:.95}),J({k:"rune",x:n,y:e,sz:t*.66,n:12,w:0,life:1400,delay:70,rot:2,vr:.0012,h:272,l:68,a:.85});for(let r=0;r<80;r++)J({k:"vort",cx:n,cy:e,ang:Ie()*6.283,rad:L(.55,1.5)*t,va:L(.0035,.006),vrad:-L(6e-4,.0011)*t,sz:L(3,7),life:1200,delay:Ie()*350,h:Ie()<.5?272:350,l:68,a:.9});qs(720,()=>{J({k:"glow",x:n,y:e,sz:t*1.1,gr:.8,life:520,h:300,s:90,l:70,a:.85}),J({k:"ring",x:n,y:e,sz:t*.15,gr:t*2.2,w:11,life:800,h:350,l:62}),J({k:"ring",x:n,y:e,sz:t*.1,gr:t*1.6,w:4,life:740,delay:80,h:272,l:72}),tr(n,e,52,"umb",t*.09);for(let r=0;r<7;r++){const s=Ie()*6.283,i=[[n,e]];let a=n,c=e,l=s;for(let h=0;h<9;h++)l+=L(-.55,.55),a+=Math.cos(l)*t*.17,c+=Math.sin(l)*t*.17,i.push([a,c]);J({k:"bolt",pts:i,sz:2.4,life:520,h:r%2?350:280,l:66})}for(let r=0;r<8;r++){const s=Ie()*6.283,i=L(3,8);J({k:"shard",x:n,y:e,vx:Math.cos(s)*i,vy:Math.sin(s)*i,d:.965,rot:Ie()*6,vr:L(-.3,.3),sz:L(8,16),life:800,h:r%2?350:272,l:58})}for(let r=0;r<6;r++)J({k:"smoke",x:n+L(-30,30),y:e+L(-20,20),vx:L(-1,1),vy:L(-1,.2),d:.985,sz:t*L(.3,.55),gr:1.1,life:1300,h:275,s:55,l:16,a:.5,add:!1})})}function Mg(n,e,t,r){const s=document.createElement("div");s.className="dmgnum "+r,s.textContent=t,s.style.left=n+"px",s.style.top=e+"px",document.body.append(s),setTimeout(()=>s.remove(),1500)}function Lg(n,e){var k;const t=n.closest(".pt"),r=t==null?void 0:t.querySelector(".ava"),s=r?po(r):e,i=!!(t!=null&&t.classList.contains("me")),a=(((k=n.querySelector(".fx"))==null?void 0:k.textContent)??"").trim(),c=Math.abs(parseInt(a.replace(/[^\d-]/g,""),10)||3),l=Math.min(2,.8+c*.13),h=s.left+s.width/2,f=s.top+s.height/2,p=s.width*2.3*l;J({k:"glow",x:h,y:f,sz:p*1.35,gr:.9,life:560,h:358,l:62,a:1}),J({k:"glow",x:h,y:f,sz:p*.55,gr:.4,life:240,h:40,s:30,l:97,a:1}),J({k:"ring",x:h,y:f,sz:p*.15,gr:p*1.7,w:14,life:760,h:355,l:62}),J({k:"ring",x:h,y:f,sz:p*.1,gr:p*1.2,w:7,life:700,delay:80,h:25,l:68}),J({k:"ring",x:h,y:f,sz:p*.1,gr:p*2.4,w:3,life:900,delay:170,h:350,l:70}),fo(h,f,p*.95,"fire",-.75),fo(h,f,p*.95,"umb",.75);for(let V=0;V<16;V++){const N=V/16*6.283+L(-.1,.1);tr(h,f,1,"fire",p*.26,{rot:N,life:L(380,620),sz:3.4})}tr(h,f,Math.round(60*l),"fire",p*.12),tr(h,f,24,"umb",p*.1);for(let V=0;V<16;V++){const N=Ie()*6.283,K=L(3,9)*p/140;J({k:"shard",x:h,y:f,vx:Math.cos(N)*K,vy:Math.sin(N)*K-2,g:.24,d:.975,rot:Ie()*6,vr:L(-.3,.3),sz:p*L(.05,.11),life:L(600,1e3),h:V%3?355:28,l:60})}for(let V=0;V<5;V++)J({k:"smoke",x:h+L(-14,14),y:f,vx:L(-.8,.8),vy:L(-1,-.2),d:.985,sz:p*L(.3,.5),gr:1.1,life:L(900,1300),a:.35,h:355,s:50,l:22,add:!1});qs(140,()=>{js(h,f,p*.6,"fire",1),tr(h,f,30,"fire",p*.14)});const g=document.createElement("div");g.className="nexflash"+(i?" mine":" foe"),document.body.append(g),setTimeout(()=>g.remove(),900);const A=document.getElementById("app");A&&(A.classList.remove("shk-soft","shk-hard"),A.offsetWidth,A.classList.add("shk-hard")),Mg(h,f-s.height*.15,a||"−"+c,i?"mine":"foe")}let zu=-1e9,Da="lum";const Bi=new Map,Qn=(n,e)=>{const t=performance.now();return t-(Bi.get(n)??-1e9)<e?!1:(Bi.set(n,t),Bi.size>80&&Bi.clear(),!0)},Gu=n=>n.classList.contains("umb")?"umb":"lum";function Fg(n){const e=po(n),t=e.left+e.width/2,r=e.top+e.height/2,s=n.className.split(" ")[0]+Math.round(t/24)+","+Math.round(r/24),i=n.classList;if(i.contains("cast")){if(!Qn("cast",500))return;const a=document.querySelector(".plane-wrap"),c=a?po(a):null,l=c?c.left+c.width/2:Br/2,h=c?c.top+c.height*.5:Pn/2,f=Math.min(c?c.width:Br,c?c.height:Pn)*.42;zu=performance.now(),Da=i.contains("umb")?"umb":"lum",(i.contains("umb")?Og:Dg)(l,h,f)}else if(i.contains("card")&&i.contains("attacking")){if(!Qn("a"+s,800))return;const a=Gu(n),c=i.contains("up")?-1:1,l=e.width;J({k:"glow",x:t,y:r,sz:l*.95,gr:.2,life:520,h:rt(a),l:70,a:.6});for(let h=0;h<18;h++){const f=Ie()*6.283,p=l*L(.8,1.5);J({k:"vort",cx:t,cy:r,ang:f,rad:p,va:.004,vrad:-p/360,sz:L(2.5,5),life:380,delay:Ie()*90,h:rt(a,h%3?0:1),l:76,a:.9})}qs(430,()=>{const h=t,f=r+c*(e.height*.5+46);for(let p=0;p<12;p++)J({k:"spark",x:t+L(-l*.4,l*.4),y:r+c*e.height*.3,vx:L(-1.2,1.2),vy:-c*L(3,9),g:0,d:.93,life:L(260,480),sz:2,h:rt(a,p%2),l:72});J({k:"ring",x:h,y:f,sz:l*.1,gr:l*.95,w:6,life:380,h:rt(a),l:76}),fo(h,f,l*.75,a,c<0?L(-2.5,-2.1):L(.55,1))})}else if(i.contains("card")&&i.contains("dying")){if(!Qn("d"+s,900))return;const a=Gu(n),c=e.width,l=performance.now()-zu<2200,h=l?Da:a;n.style.animation="none",qs(l?Da==="umb"?720:460:0,()=>{n.style.opacity="0",Vg(n,e,h,l?1.7:1.15),js(t,r,c*1.05,h,l?1.5:1.1),l&&Ld();for(let f=0;f<14;f++)J({k:"glow",x:t+L(-c*.35,c*.35),y:r+L(-c*.2,c*.3),vx:L(-.3,.3),vy:-L(.6,2),g:-.008,sz:L(3,7),life:L(900,1500),delay:Ie()*250,h:rt(h,f%2),l:80,a:.9})})}else if(i.contains("card")&&i.contains("hurt")){if(!Qn("h"+s,500))return;js(t,r,e.width*.75,"fire",.7)}else if(i.contains("card")&&i.contains("boost")){if(!Qn("b"+s,500))return;J({k:"ring",x:t,y:r+e.height*.2,sz:e.width*.2,gr:e.width*.8,w:4,life:600,h:145,l:74});for(let a=0;a<16;a++)J({k:"glow",x:t+L(-e.width*.4,e.width*.4),y:r+e.height*.35,vy:-L(1,3.2),g:-.02,d:.99,sz:L(3,6),life:L(600,1e3),delay:Ie()*250,h:Ie()<.5?145:48,l:78,a:.9})}else if(i.contains("orb")&&i.contains("hit")){if(!Qn("oh"+s,700))return;Lg(n,e)}else if(i.contains("orb")&&i.contains("heal")){if(!Qn("oe"+s,700))return;J({k:"ring",x:t,y:r,sz:e.width*.3,gr:e.width*1.5,w:5,life:700,h:145,l:74}),J({k:"glow",x:t,y:r,sz:e.width*1.3,gr:.5,life:600,h:145,l:78,a:.7});for(let a=0;a<22;a++)J({k:"glow",x:t+L(-e.width,e.width),y:r+L(0,e.width*.6),vy:-L(1,3),g:-.02,d:.99,sz:L(3,7),life:L(700,1300),delay:Ie()*300,h:Ie()<.5?145:48,l:80,a:.9})}}const Hu=".card.attacking,.card.dying,.card.hurt,.card.boost,.orb.hit,.orb.heal,.vfx.cast";function Ug(){if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;wr=document.createElement("canvas"),wr.id="combatfx",document.body.append(wr),x=wr.getContext("2d");const n=()=>{const e=Math.min(2,devicePixelRatio||1);Br=innerWidth,Pn=innerHeight,wr.width=Br*e,wr.height=Pn*e,x.setTransform(e,0,0,e,0,0)};n(),addEventListener("resize",n),new MutationObserver(e=>{const t=[];e.forEach(r=>r.addedNodes.forEach(s=>{s instanceof HTMLElement&&(s.matches(Hu)&&t.push(s),s.querySelectorAll(Hu).forEach(i=>t.push(i)))})),t.sort((r,s)=>+s.classList.contains("cast")-+r.classList.contains("cast")).forEach(Fg)}).observe(document.body,{childList:!0,subtree:!0})}const Oa=(n,e,t)=>n.style.setProperty(e,t);function $g(){const n=document.createElement("canvas");n.id="embers",document.body.prepend(n);const e=n.getContext("2d");let t=0,r=0;const s=[],i=()=>{t=n.width=innerWidth,r=n.height=innerHeight};i(),addEventListener("resize",i);for(let c=0;c<90;c++)s.push({x:Math.random()*2e3,y:Math.random()*1200,r:Math.random()*2+.4,v:Math.random()*.5+.12,a:Math.random()*.6+.2,hue:Math.random()<.55?40:265,ph:Math.random()*6});let a=0;(function c(){a+=.01,e.clearRect(0,0,t,r);for(const l of s){l.y-=l.v,l.x+=Math.sin(a+l.ph)*.35,l.y<-10&&(l.y=r+10,l.x=Math.random()*t);const h=.6+Math.sin(a*3+l.ph)*.4;e.beginPath(),e.fillStyle=`hsla(${l.hue},95%,68%,${l.a*h})`,e.shadowColor=`hsl(${l.hue},95%,60%)`,e.shadowBlur=10,e.arc(l.x%t,l.y,l.r,0,6.3),e.fill()}requestAnimationFrame(c)})()}function Bg(){const n=document.createElement("div");n.id="glow",document.body.append(n);let e=0,t=0,r=0,s=0;addEventListener("pointermove",i=>{r=i.clientX,s=i.clientY}),function i(){e+=(r-e)*.14,t+=(s-t)*.14,n.style.transform=`translate(${e-160}px,${t-160}px)`,requestAnimationFrame(i)}()}function qg(){let n=null;document.addEventListener("pointermove",t=>{const r=t.target.closest(".card");if(!r)return;const s=r.getBoundingClientRect(),i=(t.clientX-s.left)/s.width,a=(t.clientY-s.top)/s.height;Oa(r,"--mx",(i*100).toFixed(1)+"%"),Oa(r,"--my",(a*100).toFixed(1)+"%"),Oa(r,"--ang",((i-.5)*60).toFixed(1)+"deg")});let e=0;document.addEventListener("pointerover",t=>{const r=t.target.closest(".slotc,.card[data-a],button,.btn");if(!r||r===n)return;n=r;const s=performance.now();s-e>70&&(ve("hover"),e=s)}),document.addEventListener("pointerout",()=>{n=null})}function jg(){new MutationObserver(n=>n.forEach(e=>e.addedNodes.forEach(t=>{if(!(t instanceof HTMLElement)||!t.classList.contains("vfx"))return;const r=t.classList;r.contains("vhit")?qi("hard"):r.contains("banner")&&!r.contains("small")?Wu("#ffd27a33"):r.contains("cast")?(Wu(r.contains("lum")?"#8fe9ff33":"#a24dff44"),qi("soft")):r.contains("report")&&qi("soft")}))).observe(document.body,{childList:!0}),new MutationObserver(()=>document.querySelectorAll(".card.attacking:not(.fxdone)").forEach(n=>{n.classList.add("fxdone"),qi("soft")})).observe(document.getElementById("app"),{childList:!0,subtree:!0})}function qi(n){const e=document.getElementById("app");e.classList.remove("shk-soft","shk-hard"),e.offsetWidth,e.classList.add("shk-"+n)}function Wu(n){const e=document.createElement("div");e.className="flash",e.style.background=`radial-gradient(circle at 50% 50%,${n},transparent 70%)`,document.body.append(e),setTimeout(()=>e.remove(),700)}let mo=null;function Fd(){if(mo)return;const n=mo=document.createElement("div");n.id="title",n.innerHTML=`<div class="t-bg"></div><div class="t-art l"></div><div class="t-art u"></div>
    <div class="t-in"><p class="t-kicker"><i></i>DUELO DE LEYENDAS<i></i></p><h1>CARTAS</h1><div class="t-sub"><i></i><span>ALFA</span><i></i></div>
    <div class="t-fac"><b class="l">☀ LUMINARAE</b><i>◆</i><b class="u">UMBRA ☾</b></div>
    <div class="t-menu"><button class="t-go" data-m="ia" autofocus>⚔ JUGAR CONTRA LA IA</button><button class="t-go alt" data-m="online">🌐 JUGAR ONLINE</button></div>
    <p class="t-hint">Elige un modo · sonido activado</p></div>`,document.body.append(n),n.querySelectorAll("[data-m]").forEach(e=>e.addEventListener("click",()=>{ve("start"),kg(),e.dataset.m==="ia"?(Ud(),document.dispatchEvent(new Event("menu:ia"))):document.dispatchEvent(new Event("menu:online"))}))}function Ud(){const n=mo;n&&(mo=null,n.classList.add("out"),setTimeout(()=>n.remove(),900))}function zg(){Fd()}function Gg(){Ug(),$g(),Bg(),qg(),jg(),zg()}const se=(n,e,t,r,s,i=[],a="",c=[],l)=>({id:n,name:e,cost:t,type:"unit",atk:r,hp:s,kw:i,text:a,fx:c,grow:l}),Te=(n,e,t,r,s,i)=>({id:n,name:e,cost:t,type:"spell",atk:0,hp:0,kw:[],text:s,fx:i,speed:r}),$d=[se("lum_acolita","Acólita del Alba",1,1,1,[],"Al jugarla: cura 2 a tu Nexo.",[{t:"healNexus",n:2}]),se("lum_vigia","Vigía del Alba",1,1,2,["regenera"]),se("lum_centinela","Centinela Radiante",2,2,2,["barrera"]),se("lum_portador","Portador de Luz",2,2,1,[],"Al jugarla: +1/+1 a otra aliada.",[{t:"buffOther",a:1,h:1}]),se("lum_halcon","Halcón Dorado",2,3,1,["elusivo"]),se("lum_novicia","Novicia Curandera",2,1,3,["robovida"]),se("lum_sanadora","Sanadora de Aurora",3,3,3,["robovida"]),se("lum_vidente","Vidente del Alba",3,2,3,[],"Al jugarla: roba 1.",[{t:"draw",n:1}]),se("lum_oraculo","Oráculo Sereno",3,2,2,[],"Al jugarla: roba 1 y cura 2 a tu Nexo.",[{t:"draw",n:1},{t:"healNexus",n:2}]),se("lum_paladin","Paladín Alado",4,3,4,["barrera"]),se("lum_heraldo","Heraldo Solar",4,2,3,[],"Al jugarla: +1/+1 a tus unidades.",[{t:"buffAll",a:1,h:1}]),se("lum_coloso","Coloso de Marfil",5,4,4,["barrera","robovida"]),se("lum_lider","Capitana Aurora",5,4,5,["rapido","retador"]),se("lum_serafin","Serafín Eterno",6,5,6,["elusivo","robovida"]),se("lum_arcangel","Arcángel del Amanecer",7,5,5,["barrera"],"Al jugarla: cura 4 a tu Nexo.",[{t:"healNexus",n:4}]),Te("lum_destello","Destello Sanador",1,"burst","Cura 4 a tu Nexo.",[{t:"healNexus",n:4}]),Te("lum_rocio","Rocío Vital",1,"burst","Cura 3 a una unidad aliada.",[{t:"healUnit",n:3}]),Te("lum_fervor","Fervor",2,"burst","Una aliada gana +2/+0 esta ronda.",[{t:"tempBuff",a:2,h:0}]),Te("lum_escudo","Escudo de Fe",2,"fast","Una aliada gana Barrera.",[{t:"giveKw",kw:"barrera"}]),Te("lum_velo","Velo Etéreo",2,"fast","Una aliada gana Elusivo.",[{t:"giveKw",kw:"elusivo"}]),Te("lum_absorcion","Luz Absorbente",2,"fast","Inflige 2 a una enemiga y cura 2 a tu Nexo.",[{t:"drain",n:2}]),Te("lum_plegaria","Plegaria",3,"fast","Cura 5 a tu Nexo y roba 1.",[{t:"healNexus",n:5},{t:"draw",n:1}]),Te("lum_resplandor","Resplandor",3,"fast","Tus unidades ganan +1/+1 esta ronda.",[{t:"tempBuffAll",a:1,h:1}]),Te("lum_juicio","Juicio Radiante",4,"fast","Inflige 4 a una unidad enemiga.",[{t:"dmgEnemy",n:4}]),Te("lum_escarcha","Escarcha Sagrada",3,"focus","Una unidad enemiga tiene 0 de poder esta ronda.",[{t:"frost"}]),Te("lum_vision","Visión del Alba",2,"focus","Roba 2 cartas.",[{t:"draw",n:2}]),Te("lum_bendicion","Bendición",2,"slow","Una aliada gana +2/+2.",[{t:"buffAlly",a:2,h:2}]),Te("lum_renacer","Renacer",3,"slow","Una aliada gana Regeneración y se cura 4.",[{t:"giveKw",kw:"regenera"},{t:"healUnit",n:4}]),Te("lum_estrellas","Lluvia de Estrellas",4,"slow","Inflige 2 a todas las unidades enemigas y cura 2 a tu Nexo.",[{t:"dmgAll",n:2},{t:"healNexus",n:2}]),Te("lum_amanecer","Amanecer Eterno",6,"slow","Cura 6 a tu Nexo y +1/+1 a tus unidades.",[{t:"healNexus",n:6},{t:"buffAll",a:1,h:1}])],Bd=[se("umb_sombra","Sombra Inquieta",1,2,1),se("umb_aprendiz","Aprendiz de Huesos",1,1,2,["duro"]),se("umb_acechador","Acechador Nocturno",2,1,1,["letal"]),se("umb_cultista","Cultista del Vacío",2,3,3,[],"Al jugarla: tu Nexo recibe 1.",[{t:"hurtNexus",n:1}]),se("umb_espectro","Espectro Fugaz",2,3,1,["rapido","efimero"]),se("umb_esqueleto","Esqueleto Guardián",2,1,4,["duro"]),se("umb_reptante","Reptante Abisal",3,2,3,["temible"]),se("umb_lobo","Lobo de Ceniza",3,3,3,["arrollar"]),se("umb_sanguijuela","Sanguijuela",3,3,2,["robovida"]),se("umb_ritualista","Ritualista",3,2,2,[],"Al jugarla: sacrifica una aliada para robar 2.",[{t:"sacDraw",n:2}]),se("umb_golem","Gólem de Hierro",3,2,5,["duro"]),se("umb_verdugo","Verdugo Sombrío",4,3,3,["letal"]),se("umb_jinete","Jinete Espectral",4,5,3,["arrollar"]),se("umb_basalto","Centinela de Basalto",4,3,5,["duro"]),se("umb_devoradora","Devoradora de Almas",5,4,4,[],"Gana +1/+1 cuando muere una aliada.",[],{a:1,h:1}),se("umb_azote","Azote del Vacío",5,4,3,["rapido","arrollar"]),se("umb_behemot","Behemot de Hierro",5,5,5,["duro"]),se("umb_abisal","Coloso Abisal",6,5,5,["duro","robovida"]),se("umb_senor","Señor de la Noche Eterna",7,6,6,["letal"]),se("umb_titan","Titán Regenerante",8,7,7,["regenera","arrollar"]),Te("umb_punalada","Puñalada",1,"burst","Inflige 2 a una unidad enemiga.",[{t:"dmgEnemy",n:2}]),Te("umb_piel","Piel de Hierro",2,"burst","Una aliada gana Duro.",[{t:"giveKw",kw:"duro"}]),Te("umb_embestida","Embestida",3,"focus","Inflige 3 al Nexo enemigo.",[{t:"dmgNexus",n:3}]),Te("umb_furia","Furia Sombría",2,"fast","Una aliada gana +3/+0 esta ronda.",[{t:"tempBuff",a:3,h:0}]),Te("umb_drenar","Drenar",3,"fast","Inflige 3 a una enemiga y cura 3 a tu Nexo.",[{t:"drain",n:3}]),Te("umb_plaga","Plaga Sombría",3,"fast","Inflige 1 a todas las unidades enemigas.",[{t:"dmgAll",n:1}]),Te("umb_pacto","Pacto de Sangre",2,"slow","Sacrifica tu unidad más débil; daña a una enemiga igual a su ataque.",[{t:"sacDmg"}]),Te("umb_maldicion","Maldición de Sombras",4,"slow","Las unidades enemigas pierden 2/2.",[{t:"debuffEnemies",a:2,h:2}]),Te("umb_aplastar","Aplastar",4,"slow","Inflige 5 a una unidad enemiga.",[{t:"dmgEnemy",n:5}]),Te("umb_eclipse","Eclipse",6,"slow","Destruye una unidad enemiga y roba 1.",[{t:"destroyEnemy"},{t:"draw",n:1}])],he=Object.fromEntries([...$d,...Bd].map(n=>[n.id,n])),Hg=["lum_acolita","lum_vigia","lum_centinela","lum_portador","lum_novicia","lum_halcon","lum_destello","lum_rocio","lum_escudo","lum_bendicion"],Wg=["umb_sombra","umb_aprendiz","umb_acechador","umb_esqueleto","umb_cultista","umb_lobo","umb_golem","umb_punalada","umb_furia","umb_drenar"],zs={Luminarae:[...$d.map(n=>n.id),...Hg],Umbra:[...Bd.map(n=>n.id),...Wg]},tt=n=>1-n;function qd(n){n.seed=n.seed+1831565813|0;let e=n.seed;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function jd(n,e){for(let t=e.length-1;t>0;t--){const r=Math.floor(qd(n)*(t+1));[e[t],e[r]]=[e[r],e[t]]}}function qr(n,e,t){const r=n.p[e];for(let s=0;s<t;s++){const i=r.deck.pop();if(!i){n.winner=tt(e);break}r.hand.length<10&&r.hand.push(i)}}const go=(n,e,t)=>{n.p[e].nexus=Math.min(20,n.p[e].nexus+t)},ue=n=>Math.max(0,n.atk+n.ta),Re=n=>n.hp+n.th-n.dmg,En=n=>{n.dmg=n.hp+n.th+999},_o=n=>ue(n)*1e6+Re(n)*1e3+he[n.card].cost,Qt=n=>n.reduce((e,t)=>!e||_o(t)>_o(e)?t:e,void 0),Ku=n=>n.reduce((e,t)=>!e||_o(t)<_o(e)?t:e,void 0),Kg=["dmgEnemy","drain","destroyEnemy","sacDmg","frost"],Qg=["buffAlly","giveKw","tempBuff","healUnit"];function Yr(n){const e=he[n];return!e||e.type!=="spell"?null:e.fx.some(t=>Kg.includes(t.t))?"enemy":e.fx.some(t=>Qg.includes(t.t))?"ally":null}function $c(n,e){return!(n.kw.includes("elusivo")&&!e.kw.includes("elusivo")||n.kw.includes("temible")&&ue(e)<3)}function zd(n,e){const t=s=>({nexus:20,deck:[...s],hand:[],board:[],mana:0,maxMana:0,spell:0,played:[]}),r={p:[t(n[0]),t(n[1])],round:0,token:0,active:0,phase:"mulligan",passes:0,winner:null,seed:e,uid:0,log:[],stack:[],attackers:[],blocks:{},forced:[],tok:[!1,!1],resumePhase:"main",mull:[!1,!1]};return r.p.forEach(s=>jd(r,s.deck)),qr(r,0,4),qr(r,1,4),r.token=qd(r)<.5?0:1,r}function Ma(n,e,t){const r=n.p[e],s=[...new Set(t)].filter(i=>i>=0&&i<r.hand.length).sort((i,a)=>a-i);for(const i of s)r.deck.push(r.hand.splice(i,1)[0]);jd(n,r.deck),qr(n,e,s.length)}function rc(n){if(n.round++,n.round>40){n.winner=-1;return}n.token=tt(n.token),n.active=n.token,n.phase="main",n.passes=0,n.attackers=[],n.blocks={},n.forced=[],n.stack=[],n.tok=[!1,!1],n.tok[n.token]=!0;for(const e of[n.token,tt(n.token)]){const t=n.p[e];if(t.maxMana=Math.min(10,t.maxMana+1),t.mana=t.maxMana,qr(n,e,1),n.winner!==null)return}n.log=n.log.slice(-40),n.log.push(`— Ronda ${n.round} (ficha: J${n.token+1}) —`),cr(n)}function Jg(n){for(const e of n.p)e.spell=Math.min(3,e.spell+e.mana),e.mana=0;for(const e of n.p)e.board.forEach(t=>{t.kw.includes("regenera")&&(t.dmg=0)});for(const e of n.p)e.board.forEach(t=>{t.kw.includes("efimero")&&En(t)});Vn(n);for(const e of n.p)e.board.forEach(t=>{t.ta=0,t.th=0,t.dmg>=t.hp&&(t.dmg=t.hp-1)});cr(n),n.winner===null&&rc(n)}function cr(n){if(n.winner!==null)return;const e=n.p[0].nexus<=0,t=n.p[1].nexus<=0;e&&t?n.winner=-1:e?n.winner=1:t&&(n.winner=0)}function Vn(n){for(let e=!0;e;){e=!1;for(const t of n.p){const r=t.board.filter(s=>Re(s)<=0);if(r.length){e=!0,t.board=t.board.filter(s=>Re(s)>0);for(const s of t.board){const i=he[s.card].grow;i&&(s.atk+=i.a*r.length,s.hp+=i.h*r.length)}}}}}function Pr(n,e,t,r){if(t<=0)return 0;const s=e.kw.indexOf("barrera");if(s>=0)return e.kw.splice(s,1),0;if(e.kw.includes("duro")&&(t=Math.max(0,t-1)),t<=0)return 0;const i=Math.min(t,Math.max(0,Re(e)));return e.dmg+=t,r&&(r.u.kw.includes("letal")&&En(e),r.u.kw.includes("robovida")&&go(n,r.owner,i)),i}function sc(n,e,t,r,s){const i=n.p[e],a=n.p[tt(e)];switch(t.t){case"healNexus":go(n,e,t.n);break;case"hurtNexus":i.nexus-=t.n;break;case"dmgNexus":a.nexus-=t.n;break;case"draw":qr(n,e,t.n);break;case"buffOther":{const c=Qt(i.board.filter(l=>l!==r));c&&(c.atk+=t.a,c.hp+=t.h);break}case"buffAlly":{const c=s??Qt(i.board);c&&(c.atk+=t.a,c.hp+=t.h);break}case"tempBuff":{const c=s??Qt(i.board);c&&(c.ta+=t.a,c.th+=t.h);break}case"healUnit":{const c=s??i.board.find(l=>l.dmg>0);c&&(c.dmg=Math.max(0,c.dmg-t.n));break}case"tempBuffAll":i.board.forEach(c=>{c.ta+=t.a,c.th+=t.h});break;case"buffAll":i.board.forEach(c=>{c.atk+=t.a,c.hp+=t.h});break;case"giveKw":{const c=s??Qt(i.board);c&&!c.kw.includes(t.kw)&&c.kw.push(t.kw);break}case"dmgEnemy":{const c=s??Qt(a.board);c&&Pr(n,c,t.n);break}case"drain":{const c=s??Qt(a.board);c&&go(n,e,Pr(n,c,t.n));break}case"dmgAll":a.board.forEach(c=>Pr(n,c,t.n));break;case"frost":{const c=s??Qt(a.board);c&&(c.ta-=ue(c));break}case"sacDraw":{const c=Ku(i.board.filter(l=>l!==r));c&&(En(c),Vn(n),qr(n,e,t.n));break}case"sacDmg":{const c=Ku(i.board),l=s??Qt(a.board);if(c&&l){const h=ue(c);En(c),Pr(n,l,h)}break}case"debuffEnemies":a.board.forEach(c=>{c.atk=Math.max(0,c.atk-t.a),c.hp-=t.h});break;case"destroyEnemy":{const c=s??Qt(a.board);c&&En(c);break}}Vn(n)}function Zr(n,e,t){const r=n.p[e],s=he[r.hand[t]];if(!s||n.winner!==null||n.active!==e||n.phase==="mulligan")return!1;if(s.type==="unit")return n.phase==="main"&&!n.stack.length&&!n.attackers.length&&r.board.length<6&&s.cost<=r.mana;if(s.cost>r.mana+r.spell)return!1;const i=s.speed??"fast";if((i==="slow"||i==="focus")&&(n.phase!=="main"||n.stack.length||n.attackers.length))return!1;const a=Yr(s.id);return!(a==="enemy"&&!n.p[tt(e)].board.length||a==="ally"&&!r.board.length||s.fx.some(c=>c.t==="sacDmg")&&!r.board.length)}function Gd(n){if(n.phase!=="block"&&!(n.phase==="stack"&&n.resumePhase==="block"))return;const e=n.p[n.token],t=n.p[tt(n.token)];for(const r of Object.keys(n.blocks)){const s=e.board.find(a=>String(a.uid)===r),i=t.board.find(a=>a.uid===n.blocks[r]);s&&i&&$c(s,i)||(s&&i&&n.log.push(`Bloqueo anulado: {${i.card}} ya no puede bloquear a {${s.card}}`),delete n.blocks[r],n.forced=n.forced.filter(a=>String(a)!==r))}}function Xg(n){const e=n.stack.pop();if(!e)return;const t=he[e.card],r=Yr(e.card);let s;if(r&&(s=[...n.p[0].board,...n.p[1].board].find(i=>i.uid===e.target),!s)){n.log.push(`{${e.card}} se disipa: el objetivo ya no existe`);return}n.log.push(`Se resuelve {${e.card}}`),t.fx.forEach(i=>sc(n,e.owner,i,void 0,s)),Vn(n),cr(n)}function Yg(n){var t;const e=((t=n.stack[0])==null?void 0:t.owner)??n.active;for(;n.stack.length&&n.winner===null;)Xg(n);n.winner===null&&(Gd(n),n.phase=n.resumePhase,n.active=tt(e),n.passes=0)}function Zg(n){const e=n.token,t=tt(e),r=n.p[e],s=n.p[t],i=n.attackers.map(h=>r.board.find(f=>f.uid===h)).filter(h=>!!h).map(h=>({u:h,had:n.blocks[String(h.uid)]!==void 0,b:s.board.find(f=>f.uid===n.blocks[String(h.uid)])})),a=new Set,c=(h,f)=>{f<=0||(n.p[t].nexus-=f,h.kw.includes("robovida")&&go(n,e,f))},l=(h,f,p)=>{const g=Re(p)+(p.kw.includes("duro")?1:0),A=ue(h);return Pr(n,p,A,{u:h,owner:f}),a.add(h.uid),Math.max(0,A-g)};for(const{u:h,b:f}of i)if(f&&h.kw.includes("rapido")&&ue(h)>0){const p=l(h,e,f);h.kw.includes("arrollar")&&c(h,p),h.kw.includes("efimero")&&En(h)}if(Vn(n),cr(n),n.winner===null){for(const{u:h,had:f,b:p}of i){if(Re(h)<=0)continue;const g=a.has(h.uid);if(p&&Re(p)>0){let A=0;!g&&ue(h)>0&&(A=l(h,e,p)),ue(p)>0&&Pr(n,h,ue(p),{u:p,owner:t}),h.kw.includes("arrollar")&&!g&&c(h,A),h.kw.includes("efimero")&&!g&&En(h)}else f?h.kw.includes("arrollar")&&!g&&c(h,ue(h)):(c(h,ue(h)),h.kw.includes("efimero")&&ue(h)>0&&En(h))}Vn(n),cr(n),n.attackers=[],n.blocks={},n.forced=[],n.winner===null&&(n.phase="main",n.active=t,n.passes=0)}}function Gs(n,e){if(n.winner!==null)return n;const t=structuredClone(n),r=t.active,s=t.p[r],i=t.p[tt(r)];if(e.type==="mulligan")return t.phase!=="mulligan"?n:e.player!==void 0?e.player!==0&&e.player!==1||t.mull[e.player]||!Array.isArray(e.idx)?n:(Ma(t,e.player,e.idx),t.mull[e.player]=!0,t.mull[0]&&t.mull[1]&&rc(t),t):(Ma(t,0,e.idx),Ma(t,1,t.p[1].hand.map((a,c)=>he[a].cost>=4?c:-1).filter(a=>a>=0)),rc(t),t);if(t.phase==="mulligan")return n;if(e.type==="play"){if(!Zr(t,r,e.hand))return n;const a=s.hand[e.hand],c=he[a],l=Yr(a);let h;if(l&&(h=(l==="enemy"?i:s).board.find(f=>f.uid===e.target),!h))return n;if(c.type==="unit")s.mana-=c.cost;else{const f=Math.min(s.spell,c.cost);s.spell-=f,s.mana-=c.cost-f}if(s.hand.splice(e.hand,1),s.played.push(a),t.log.push(`J${r+1} juega {${a}}`),c.type==="unit"){const f={uid:++t.uid,card:a,atk:c.atk,hp:c.hp,dmg:0,kw:[...c.kw],ta:0,th:0};s.board.push(f),c.fx.forEach(p=>sc(t,r,p,f)),Vn(t),cr(t),t.active=tt(r),t.passes=0}else{const f=c.speed??"fast";f==="burst"||f==="focus"?(c.fx.forEach(p=>sc(t,r,p,void 0,h)),Vn(t),cr(t),Gd(t)):(t.resumePhase=t.phase==="stack"?t.resumePhase:t.phase,t.stack.push({card:a,owner:r,target:h==null?void 0:h.uid}),t.phase="stack",t.active=tt(r),t.passes=0)}}else if(e.type==="pass"||e.type==="confirmBlocks"){if(e.type==="confirmBlocks"&&!(t.phase==="block"&&r===tt(t.token)))return n;t.log.push(`J${r+1} pasa prioridad`),t.phase==="stack"?Yg(t):t.phase==="block"?r===tt(t.token)?(t.active=t.token,t.passes=1):Zg(t):++t.passes>=2?Jg(t):t.active=tt(r)}else if(e.type==="attack"){if(t.phase!=="main"||t.stack.length||t.attackers.length||!t.tok[r])return n;const a=[...new Set(e.units)].map(l=>s.board[l]).filter(l=>!!l);if(!a.length)return n;t.tok[r]=!1,t.attackers=a.map(l=>l.uid),t.blocks={},t.forced=[];const c=new Set;for(const l of a)if(l.kw.includes("retador")){const h=i.board.filter(f=>!c.has(f.uid)).sort((f,p)=>(ue(l)>=Re(p)?1:0)-(ue(l)>=Re(f)?1:0)||Re(f)-Re(p))[0];h&&(t.blocks[String(l.uid)]=h.uid,t.forced.push(l.uid),c.add(h.uid))}t.phase="block",t.active=tt(r),t.passes=0,t.log.push(`J${r+1} declara ataque con ${a.length} unidad(es)`)}else if(e.type==="block"){if(t.phase!=="block"||r!==tt(t.token))return n;const a=t.p[t.token].board[e.attacker],c=s.board[e.blocker];if(!a||!c||!t.attackers.includes(a.uid)||t.forced.includes(a.uid)||!$c(a,c))return n;const l=String(a.uid);if(t.blocks[l]===c.uid)delete t.blocks[l];else{if(Object.values(t.blocks).includes(c.uid))return n;t.blocks[l]=c.uid}}return t}const e_=n=>he[n].fx.reduce((e,t)=>e+(t.t==="dmgEnemy"||t.t==="drain"?t.n:0),0),As=n=>ue(n)*10+Re(n);function Qu(n,e){const t=n.p[e],r=n.p[1-e];let s=null;return t.hand.forEach((i,a)=>{const c=he[i];if(c.type!=="spell"||!Zr(n,e,a))return;const l=Yr(i);let h=0,f;if(l==="enemy"){const p=[...r.board].sort((k,V)=>As(V)-As(k)),g=e_(i),A=p.find(k=>g>0&&Re(k)<=g)??(c.fx.some(k=>k.t==="destroyEnemy"||k.t==="frost")?p[0]:void 0);if(!A||c.fx.some(k=>k.t==="sacDmg")&&t.board.length<2)return;f=A.uid,h=As(A)/2+c.cost}else if(l==="ally"){const p=c.fx.some(k=>k.t==="healUnit"),A=[...p?t.board.filter(k=>k.dmg>0):t.board].sort((k,V)=>p?V.dmg-k.dmg:As(V)-As(k))[0];if(!A)return;f=A.uid,h=p?2+A.dmg:3}else for(const p of c.fx)p.t==="healNexus"&&t.nexus<=20-p.n?h+=2:p.t==="buffAll"&&t.board.length>=2||(p.t==="debuffEnemies"||p.t==="dmgAll")&&r.board.length>=2?h+=3:p.t==="dmgNexus"?h+=r.nexus<=p.n?20:1:p.t==="tempBuffAll"&&t.board.length>=2&&n.tok[e]?h+=3:p.t==="draw"&&(h+=t.hand.length<6?2:0);h>0&&(!s||h>s.sc)&&(s={a:{type:"play",hand:a,target:f},sc:h})}),s?s.a:null}function t_(n){const e=n.active,t=n.p[e],r=n.p[1-e];if(n.phase==="mulligan")return{type:"mulligan",idx:[]};if(n.phase==="block"){if(e===n.token)return{type:"pass"};const a=n.attackers.map(h=>n.p[n.token].board.find(f=>f.uid===h)).filter(h=>!!h),c=a.reduce((h,f)=>h+ue(f),0),l=new Set(Object.values(n.blocks));for(const h of a.filter(f=>n.blocks[String(f.uid)]===void 0).sort((f,p)=>ue(p)-ue(f))){const f=t.board.map((g,A)=>({u:g,k:A})).filter(g=>!l.has(g.u.uid)&&$c(h,g.u)),p=f.find(g=>ue(g.u)>=Re(h)&&Re(g.u)>ue(h))??f.find(g=>(ue(g.u)>=Re(h)||g.u.kw.includes("letal"))&&ue(h)>=3)??(t.nexus<=c?f.sort((g,A)=>Re(A.u)-Re(g.u))[0]:void 0);if(p)return{type:"block",attacker:n.p[n.token].board.indexOf(h),blocker:p.k}}return{type:"confirmBlocks"}}if(n.phase==="stack")return(Math.random()<.5?Qu(n,e):null)??{type:"pass"};let s=-1;if(t.hand.forEach((a,c)=>{he[a].type==="unit"&&Zr(n,e,c)&&(s<0||he[a].cost>he[t.hand[s]].cost)&&(s=c)}),s>=0)return{type:"play",hand:s};const i=Qu(n,e);if(i&&Math.random()<.7)return i;if(n.tok[e]&&!n.attackers.length){const a=t.board.map((h,f)=>({u:h,k:f})),c=a.reduce((h,f)=>h+ue(f.u),0)>=r.nexus,l=a.filter(({u:h})=>c||!r.board.length||h.kw.includes("barrera")||h.kw.includes("elusivo")||r.board.every(f=>ue(f)<Re(h)&&!f.kw.includes("letal")));if(l.length)return{type:"attack",units:l.map(h=>h.k)}}return{type:"pass"}}const Hd={},n_="cartas-skins";let Bc={};try{Bc=JSON.parse(localStorage.getItem(n_)||"{}")}catch{}const vt=n=>{var e,t;return((e=Bc[n])==null?void 0:e.name)||((t=Hd[n])==null?void 0:t.name)||he[n].name},r_=n=>{var e,t;return((e=Bc[n])==null?void 0:e.image)||((t=Hd[n])==null?void 0:t.image)||`/TCG/img/${n}.webp`},s_=new Set(Object.values(zs).map(n=>n.filter(e=>he[e].type==="unit").sort((e,t)=>he[t].cost-he[e].cost||he[t].atk+he[t].hp-he[e].atk-he[e].hp)[0])),i_=n=>s_.has(n),o_=3300;let Tr=null;function a_(n,e,t){Tr==null||Tr.remove();const r=n.slice(0,3)==="umb"?"umb":"lum",s=he[n],i=Tr=document.createElement("div");i.className=`epic ${r}`;const a=Array.from({length:18},()=>`<i style="--x:${(Math.random()*100).toFixed(1)}%;--d:${(2.2+Math.random()*2.6).toFixed(2)}s;--t:${(Math.random()*1.6).toFixed(2)}s;--s:${(2+Math.random()*4).toFixed(1)}px"></i>`).join("");i.innerHTML=`<div class="ep-dim"></div><div class="ep-rays"></div><div class="ep-rays r2"></div><div class="ep-beam"></div><div class="ep-halo"></div>
    <div class="ep-dust">${a}</div><div class="ep-stage"><div class="ep-card">${e}<div class="ep-shine"></div></div>
    <div class="ep-name"><small>${r==="umb"?"EL VACÍO SE ALZA":"LA LUZ DESCIENDE"}</small><b>${s.name}</b></div></div>
    <div class="ep-ring"></div><div class="ep-flash"></div>`,document.body.append(i),document.body.classList.add("epic-on");const c=document.getElementById("app");setTimeout(()=>{i.isConnected&&c&&(c.classList.remove("shk-soft","shk-hard"),c.offsetWidth,c.classList.add("shk-hard"))},780);let l=!1;const h=()=>{l||(l=!0,i.classList.add("out"),setTimeout(()=>{i.remove(),Tr===i&&(Tr=null,document.body.classList.remove("epic-on")),t()},520))};i.addEventListener("click",h),setTimeout(h,o_)}const c_={hello:["Las sombras te saludan.","Hola, mortal. Disfruta tus últimos turnos.","¿Listo para caer?"],gg:["Buena partida. La próxima será peor para ti.","GG… por ahora."],idle:["Interesante… aunque inútil.","Habla todo lo que quieras.","La oscuridad escucha.","Juega tu carta.","..."],cast:["¿Sentiste eso?","Las sombras obedecen.","Eso va a doler."],win:["Imposible… la luz me venció esta vez.","Buena partida. Quiero la revancha."],lose:["La noche siempre gana.","Tu luz se apaga."]};class l_{constructor(){qe(this,"cbs",[]);qe(this,"last",0)}onMessage(e){this.cbs.push(e)}emit(e){this.cbs.forEach(t=>t(e))}push(e){this.emit(e)}sys(e){this.emit({from:"",text:e,side:"sys"})}send(e){this.emit({from:"Tú",text:e,side:"me"});const t=/hola|buenas|hey/i.test(e)?"hello":/\bgg\b|bien jugado/i.test(e)?"gg":"idle";setTimeout(()=>this.say(t),700+Math.random()*900)}react(e){e==="cast"&&(Date.now()-this.last<2e4||Math.random()>.35)||this.say(e)}say(e){const t=c_[e];this.last=Date.now(),this.emit({from:"Umbra",text:t[Math.floor(Math.random()*t.length)],side:"foe"})}}const u_=()=>{};var Ju={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wd=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},h_=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Kd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|h>>6,A=h&63;l||(A=64,a||(g=64)),r.push(t[f],t[p],t[g],t[A])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Wd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):h_(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new d_;const g=i<<2|c>>4;if(r.push(g),h!==64){const A=c<<4&240|h>>2;if(r.push(A),p!==64){const k=h<<6&192|p;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class d_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const f_=function(n){const e=Wd(n);return Kd.encodeByteArray(e,!0)},yo=function(n){return f_(n).replace(/\./g,"")},Qd=function(n){try{return Kd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m_=()=>p_().__FIREBASE_DEFAULTS__,g_=()=>{if(typeof process>"u"||typeof Ju>"u")return;const n=Ju.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},__=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Qd(n[1]);return e&&JSON.parse(e)},Bo=()=>{try{return u_()||m_()||g_()||__()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Jd=n=>{var e,t;return(t=(e=Bo())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},y_=n=>{const e=Jd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Xd=()=>{var n;return(n=Bo())===null||n===void 0?void 0:n.config},Yd=n=>{var e;return(e=Bo())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function es(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Zd(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E_(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[yo(JSON.stringify(t)),yo(JSON.stringify(a)),""].join(".")}const xs={};function w_(){const n={prod:[],emulator:[]};for(const e of Object.keys(xs))xs[e]?n.emulator.push(e):n.prod.push(e);return n}function T_(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Xu=!1;function ef(n,e){if(typeof window>"u"||typeof document>"u"||!es(window.location.host)||xs[n]===e||xs[n]||Xu)return;xs[n]=e;function t(g){return`__firebase__banner__${g}`}const r="__firebase__banner",i=w_().prod.length>0;function a(){const g=document.getElementById(r);g&&g.remove()}function c(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function l(g,A){g.setAttribute("width","24"),g.setAttribute("id",A),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function h(){const g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{Xu=!0,a()},g}function f(g,A){g.setAttribute("id",A),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function p(){const g=T_(r),A=t("text"),k=document.getElementById(A)||document.createElement("span"),V=t("learnmore"),N=document.getElementById(V)||document.createElement("a"),K=t("preprendIcon"),z=document.getElementById(K)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){const B=g.element;c(B),f(N,V);const j=h();l(z,K),B.append(z,k,N,j),document.body.appendChild(B)}i?(k.innerText="Preview backend disconnected.",z.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(z.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",A)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function I_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(it())}function b_(){var n;const e=(n=Bo())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function A_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function S_(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function R_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function k_(){const n=it();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function C_(){return!b_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function P_(){try{return typeof indexedDB=="object"}catch{return!1}}function V_(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_="FirebaseError";class cn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=N_,Object.setPrototypeOf(this,cn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ai.prototype.create)}}class ai{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?x_(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new cn(s,c,r)}}function x_(n,e){return n.replace(D_,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const D_=/\{\$([^}]+)}/g;function O_(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function lr(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Yu(i)&&Yu(a)){if(!lr(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Yu(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ci(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function M_(n,e){const t=new L_(n,e);return t.subscribe.bind(t)}class L_{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");F_(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=La),s.error===void 0&&(s.error=La),s.complete===void 0&&(s.complete=La);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function F_(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function La(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(n){return n&&n._delegate?n._delegate:n}class ur{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new v_;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(B_(e))try{this.getOrInitializeService({instanceIdentifier:Jn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Jn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Jn){return this.instances.has(e)}getOptions(e=Jn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:$_(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Jn){return this.component?this.component.multipleInstances?e:Jn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function $_(n){return n===Jn?void 0:n}function B_(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new U_(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ne;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ne||(ne={}));const j_={debug:ne.DEBUG,verbose:ne.VERBOSE,info:ne.INFO,warn:ne.WARN,error:ne.ERROR,silent:ne.SILENT},z_=ne.INFO,G_={[ne.DEBUG]:"log",[ne.VERBOSE]:"log",[ne.INFO]:"info",[ne.WARN]:"warn",[ne.ERROR]:"error"},H_=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=G_[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class qc{constructor(e){this.name=e,this._logLevel=z_,this._logHandler=H_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ne))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?j_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ne.DEBUG,...e),this._logHandler(this,ne.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ne.VERBOSE,...e),this._logHandler(this,ne.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ne.INFO,...e),this._logHandler(this,ne.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ne.WARN,...e),this._logHandler(this,ne.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ne.ERROR,...e),this._logHandler(this,ne.ERROR,...e)}}const W_=(n,e)=>e.some(t=>n instanceof t);let Zu,eh;function K_(){return Zu||(Zu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Q_(){return eh||(eh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const tf=new WeakMap,ic=new WeakMap,nf=new WeakMap,Fa=new WeakMap,jc=new WeakMap;function J_(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(wn(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&tf.set(t,n)}).catch(()=>{}),jc.set(e,n),e}function X_(n){if(ic.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});ic.set(n,e)}let oc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ic.get(n);if(e==="objectStoreNames")return n.objectStoreNames||nf.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return wn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Y_(n){oc=n(oc)}function Z_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Ua(this),e,...t);return nf.set(r,e.sort?e.sort():[e]),wn(r)}:Q_().includes(n)?function(...e){return n.apply(Ua(this),e),wn(tf.get(this))}:function(...e){return wn(n.apply(Ua(this),e))}}function e0(n){return typeof n=="function"?Z_(n):(n instanceof IDBTransaction&&X_(n),W_(n,K_())?new Proxy(n,oc):n)}function wn(n){if(n instanceof IDBRequest)return J_(n);if(Fa.has(n))return Fa.get(n);const e=e0(n);return e!==n&&(Fa.set(n,e),jc.set(e,n)),e}const Ua=n=>jc.get(n);function t0(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=wn(a);return r&&a.addEventListener("upgradeneeded",l=>{r(wn(a.result),l.oldVersion,l.newVersion,wn(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const n0=["get","getKey","getAll","getAllKeys","count"],r0=["put","add","delete","clear"],$a=new Map;function th(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if($a.get(e))return $a.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=r0.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||n0.includes(t)))return;const i=async function(a,...c){const l=this.transaction(a,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&l.done]))[0]};return $a.set(e,i),i}Y_(n=>({...n,get:(e,t,r)=>th(e,t)||n.get(e,t,r),has:(e,t)=>!!th(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s0{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(i0(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function i0(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ac="@firebase/app",nh="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nn=new qc("@firebase/app"),o0="@firebase/app-compat",a0="@firebase/analytics-compat",c0="@firebase/analytics",l0="@firebase/app-check-compat",u0="@firebase/app-check",h0="@firebase/auth",d0="@firebase/auth-compat",f0="@firebase/database",p0="@firebase/data-connect",m0="@firebase/database-compat",g0="@firebase/functions",_0="@firebase/functions-compat",y0="@firebase/installations",v0="@firebase/installations-compat",E0="@firebase/messaging",w0="@firebase/messaging-compat",T0="@firebase/performance",I0="@firebase/performance-compat",b0="@firebase/remote-config",A0="@firebase/remote-config-compat",S0="@firebase/storage",R0="@firebase/storage-compat",k0="@firebase/firestore",C0="@firebase/ai",P0="@firebase/firestore-compat",V0="firebase",N0="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc="[DEFAULT]",x0={[ac]:"fire-core",[o0]:"fire-core-compat",[c0]:"fire-analytics",[a0]:"fire-analytics-compat",[u0]:"fire-app-check",[l0]:"fire-app-check-compat",[h0]:"fire-auth",[d0]:"fire-auth-compat",[f0]:"fire-rtdb",[p0]:"fire-data-connect",[m0]:"fire-rtdb-compat",[g0]:"fire-fn",[_0]:"fire-fn-compat",[y0]:"fire-iid",[v0]:"fire-iid-compat",[E0]:"fire-fcm",[w0]:"fire-fcm-compat",[T0]:"fire-perf",[I0]:"fire-perf-compat",[b0]:"fire-rc",[A0]:"fire-rc-compat",[S0]:"fire-gcs",[R0]:"fire-gcs-compat",[k0]:"fire-fst",[P0]:"fire-fst-compat",[C0]:"fire-vertex","fire-js":"fire-js",[V0]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vo=new Map,D0=new Map,lc=new Map;function rh(n,e){try{n.container.addComponent(e)}catch(t){nn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function jr(n){const e=n.name;if(lc.has(e))return nn.debug(`There were multiple attempts to register component ${e}.`),!1;lc.set(e,n);for(const t of vo.values())rh(t,n);for(const t of D0.values())rh(t,n);return!0}function zc(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ot(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Tn=new ai("app","Firebase",O0);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M0{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ur("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Tn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ts=N0;function rf(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:cc,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw Tn.create("bad-app-name",{appName:String(s)});if(t||(t=Xd()),!t)throw Tn.create("no-options");const i=vo.get(s);if(i){if(lr(t,i.options)&&lr(r,i.config))return i;throw Tn.create("duplicate-app",{appName:s})}const a=new q_(s);for(const l of lc.values())a.addComponent(l);const c=new M0(t,r,a);return vo.set(s,c),c}function sf(n=cc){const e=vo.get(n);if(!e&&n===cc&&Xd())return rf();if(!e)throw Tn.create("no-app",{appName:n});return e}function In(n,e,t){var r;let s=(r=x0[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),nn.warn(c.join(" "));return}jr(new ur(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L0="firebase-heartbeat-database",F0=1,Hs="firebase-heartbeat-store";let Ba=null;function of(){return Ba||(Ba=t0(L0,F0,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Hs)}catch(t){console.warn(t)}}}}).catch(n=>{throw Tn.create("idb-open",{originalErrorMessage:n.message})})),Ba}async function U0(n){try{const t=(await of()).transaction(Hs),r=await t.objectStore(Hs).get(af(n));return await t.done,r}catch(e){if(e instanceof cn)nn.warn(e.message);else{const t=Tn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});nn.warn(t.message)}}}async function sh(n,e){try{const r=(await of()).transaction(Hs,"readwrite");await r.objectStore(Hs).put(e,af(n)),await r.done}catch(t){if(t instanceof cn)nn.warn(t.message);else{const r=Tn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});nn.warn(r.message)}}}function af(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $0=1024,B0=30;class q0{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new z0(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ih();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>B0){const a=G0(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){nn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ih(),{heartbeatsToSend:r,unsentEntries:s}=j0(this._heartbeatsCache.heartbeats),i=yo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return nn.warn(t),""}}}function ih(){return new Date().toISOString().substring(0,10)}function j0(n,e=$0){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),oh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),oh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class z0{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return P_()?V_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await U0(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return sh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return sh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function oh(n){return yo(JSON.stringify({version:2,heartbeats:n})).length}function G0(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H0(n){jr(new ur("platform-logger",e=>new s0(e),"PRIVATE")),jr(new ur("heartbeat",e=>new q0(e),"PRIVATE")),In(ac,nh,n),In(ac,nh,"esm2017"),In("fire-js","")}H0("");var ah=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var bn,cf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function y(){}y.prototype=_.prototype,E.D=_.prototype,E.prototype=new y,E.prototype.constructor=E,E.C=function(w,T,I){for(var v=Array(arguments.length-2),De=2;De<arguments.length;De++)v[De-2]=arguments[De];return _.prototype[T].apply(w,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,_,y){y||(y=0);var w=Array(16);if(typeof _=="string")for(var T=0;16>T;++T)w[T]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(T=0;16>T;++T)w[T]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=E.g[0],y=E.g[1],T=E.g[2];var I=E.g[3],v=_+(I^y&(T^I))+w[0]+3614090360&4294967295;_=y+(v<<7&4294967295|v>>>25),v=I+(T^_&(y^T))+w[1]+3905402710&4294967295,I=_+(v<<12&4294967295|v>>>20),v=T+(y^I&(_^y))+w[2]+606105819&4294967295,T=I+(v<<17&4294967295|v>>>15),v=y+(_^T&(I^_))+w[3]+3250441966&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(I^y&(T^I))+w[4]+4118548399&4294967295,_=y+(v<<7&4294967295|v>>>25),v=I+(T^_&(y^T))+w[5]+1200080426&4294967295,I=_+(v<<12&4294967295|v>>>20),v=T+(y^I&(_^y))+w[6]+2821735955&4294967295,T=I+(v<<17&4294967295|v>>>15),v=y+(_^T&(I^_))+w[7]+4249261313&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(I^y&(T^I))+w[8]+1770035416&4294967295,_=y+(v<<7&4294967295|v>>>25),v=I+(T^_&(y^T))+w[9]+2336552879&4294967295,I=_+(v<<12&4294967295|v>>>20),v=T+(y^I&(_^y))+w[10]+4294925233&4294967295,T=I+(v<<17&4294967295|v>>>15),v=y+(_^T&(I^_))+w[11]+2304563134&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(I^y&(T^I))+w[12]+1804603682&4294967295,_=y+(v<<7&4294967295|v>>>25),v=I+(T^_&(y^T))+w[13]+4254626195&4294967295,I=_+(v<<12&4294967295|v>>>20),v=T+(y^I&(_^y))+w[14]+2792965006&4294967295,T=I+(v<<17&4294967295|v>>>15),v=y+(_^T&(I^_))+w[15]+1236535329&4294967295,y=T+(v<<22&4294967295|v>>>10),v=_+(T^I&(y^T))+w[1]+4129170786&4294967295,_=y+(v<<5&4294967295|v>>>27),v=I+(y^T&(_^y))+w[6]+3225465664&4294967295,I=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(I^_))+w[11]+643717713&4294967295,T=I+(v<<14&4294967295|v>>>18),v=y+(I^_&(T^I))+w[0]+3921069994&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^I&(y^T))+w[5]+3593408605&4294967295,_=y+(v<<5&4294967295|v>>>27),v=I+(y^T&(_^y))+w[10]+38016083&4294967295,I=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(I^_))+w[15]+3634488961&4294967295,T=I+(v<<14&4294967295|v>>>18),v=y+(I^_&(T^I))+w[4]+3889429448&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^I&(y^T))+w[9]+568446438&4294967295,_=y+(v<<5&4294967295|v>>>27),v=I+(y^T&(_^y))+w[14]+3275163606&4294967295,I=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(I^_))+w[3]+4107603335&4294967295,T=I+(v<<14&4294967295|v>>>18),v=y+(I^_&(T^I))+w[8]+1163531501&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(T^I&(y^T))+w[13]+2850285829&4294967295,_=y+(v<<5&4294967295|v>>>27),v=I+(y^T&(_^y))+w[2]+4243563512&4294967295,I=_+(v<<9&4294967295|v>>>23),v=T+(_^y&(I^_))+w[7]+1735328473&4294967295,T=I+(v<<14&4294967295|v>>>18),v=y+(I^_&(T^I))+w[12]+2368359562&4294967295,y=T+(v<<20&4294967295|v>>>12),v=_+(y^T^I)+w[5]+4294588738&4294967295,_=y+(v<<4&4294967295|v>>>28),v=I+(_^y^T)+w[8]+2272392833&4294967295,I=_+(v<<11&4294967295|v>>>21),v=T+(I^_^y)+w[11]+1839030562&4294967295,T=I+(v<<16&4294967295|v>>>16),v=y+(T^I^_)+w[14]+4259657740&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^I)+w[1]+2763975236&4294967295,_=y+(v<<4&4294967295|v>>>28),v=I+(_^y^T)+w[4]+1272893353&4294967295,I=_+(v<<11&4294967295|v>>>21),v=T+(I^_^y)+w[7]+4139469664&4294967295,T=I+(v<<16&4294967295|v>>>16),v=y+(T^I^_)+w[10]+3200236656&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^I)+w[13]+681279174&4294967295,_=y+(v<<4&4294967295|v>>>28),v=I+(_^y^T)+w[0]+3936430074&4294967295,I=_+(v<<11&4294967295|v>>>21),v=T+(I^_^y)+w[3]+3572445317&4294967295,T=I+(v<<16&4294967295|v>>>16),v=y+(T^I^_)+w[6]+76029189&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(y^T^I)+w[9]+3654602809&4294967295,_=y+(v<<4&4294967295|v>>>28),v=I+(_^y^T)+w[12]+3873151461&4294967295,I=_+(v<<11&4294967295|v>>>21),v=T+(I^_^y)+w[15]+530742520&4294967295,T=I+(v<<16&4294967295|v>>>16),v=y+(T^I^_)+w[2]+3299628645&4294967295,y=T+(v<<23&4294967295|v>>>9),v=_+(T^(y|~I))+w[0]+4096336452&4294967295,_=y+(v<<6&4294967295|v>>>26),v=I+(y^(_|~T))+w[7]+1126891415&4294967295,I=_+(v<<10&4294967295|v>>>22),v=T+(_^(I|~y))+w[14]+2878612391&4294967295,T=I+(v<<15&4294967295|v>>>17),v=y+(I^(T|~_))+w[5]+4237533241&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~I))+w[12]+1700485571&4294967295,_=y+(v<<6&4294967295|v>>>26),v=I+(y^(_|~T))+w[3]+2399980690&4294967295,I=_+(v<<10&4294967295|v>>>22),v=T+(_^(I|~y))+w[10]+4293915773&4294967295,T=I+(v<<15&4294967295|v>>>17),v=y+(I^(T|~_))+w[1]+2240044497&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~I))+w[8]+1873313359&4294967295,_=y+(v<<6&4294967295|v>>>26),v=I+(y^(_|~T))+w[15]+4264355552&4294967295,I=_+(v<<10&4294967295|v>>>22),v=T+(_^(I|~y))+w[6]+2734768916&4294967295,T=I+(v<<15&4294967295|v>>>17),v=y+(I^(T|~_))+w[13]+1309151649&4294967295,y=T+(v<<21&4294967295|v>>>11),v=_+(T^(y|~I))+w[4]+4149444226&4294967295,_=y+(v<<6&4294967295|v>>>26),v=I+(y^(_|~T))+w[11]+3174756917&4294967295,I=_+(v<<10&4294967295|v>>>22),v=T+(_^(I|~y))+w[2]+718787259&4294967295,T=I+(v<<15&4294967295|v>>>17),v=y+(I^(T|~_))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(T+(v<<21&4294967295|v>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+I&4294967295}r.prototype.u=function(E,_){_===void 0&&(_=E.length);for(var y=_-this.blockSize,w=this.B,T=this.h,I=0;I<_;){if(T==0)for(;I<=y;)s(this,E,I),I+=this.blockSize;if(typeof E=="string"){for(;I<_;)if(w[T++]=E.charCodeAt(I++),T==this.blockSize){s(this,w),T=0;break}}else for(;I<_;)if(w[T++]=E[I++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=_},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;var y=8*this.o;for(_=E.length-8;_<E.length;++_)E[_]=y&255,y/=256;for(this.u(E),E=Array(16),_=y=0;4>_;++_)for(var w=0;32>w;w+=8)E[y++]=this.g[_]>>>w&255;return E};function i(E,_){var y=c;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=_(E)}function a(E,_){this.h=_;for(var y=[],w=!0,T=E.length-1;0<=T;T--){var I=E[T]|0;w&&I==_||(y[T]=I,w=!1)}this.g=y}var c={};function l(E){return-128<=E&&128>E?i(E,function(_){return new a([_|0],0>_?-1:0)}):new a([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return p;if(0>E)return N(h(-E));for(var _=[],y=1,w=0;E>=y;w++)_[w]=E/y|0,y*=4294967296;return new a(_,0)}function f(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return N(f(E.substring(1),_));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(_,8)),w=p,T=0;T<E.length;T+=8){var I=Math.min(8,E.length-T),v=parseInt(E.substring(T,T+I),_);8>I?(I=h(Math.pow(_,I)),w=w.j(I).add(h(v))):(w=w.j(y),w=w.add(h(v)))}return w}var p=l(0),g=l(1),A=l(16777216);n=a.prototype,n.m=function(){if(V(this))return-N(this).m();for(var E=0,_=1,y=0;y<this.g.length;y++){var w=this.i(y);E+=(0<=w?w:4294967296+w)*_,_*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(V(this))return"-"+N(this).toString(E);for(var _=h(Math.pow(E,6)),y=this,w="";;){var T=j(y,_).g;y=K(y,T.j(_));var I=((0<y.g.length?y.g[0]:y.h)>>>0).toString(E);if(y=T,k(y))return I+w;for(;6>I.length;)I="0"+I;w=I+w}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(var _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function V(E){return E.h==-1}n.l=function(E){return E=K(this,E),V(E)?-1:k(E)?0:1};function N(E){for(var _=E.g.length,y=[],w=0;w<_;w++)y[w]=~E.g[w];return new a(y,~E.h).add(g)}n.abs=function(){return V(this)?N(this):this},n.add=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],w=0,T=0;T<=_;T++){var I=w+(this.i(T)&65535)+(E.i(T)&65535),v=(I>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=v>>>16,I&=65535,v&=65535,y[T]=v<<16|I}return new a(y,y[y.length-1]&-2147483648?-1:0)};function K(E,_){return E.add(N(_))}n.j=function(E){if(k(this)||k(E))return p;if(V(this))return V(E)?N(this).j(N(E)):N(N(this).j(E));if(V(E))return N(this.j(N(E)));if(0>this.l(A)&&0>E.l(A))return h(this.m()*E.m());for(var _=this.g.length+E.g.length,y=[],w=0;w<2*_;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(var T=0;T<E.g.length;T++){var I=this.i(w)>>>16,v=this.i(w)&65535,De=E.i(T)>>>16,pt=E.i(T)&65535;y[2*w+2*T]+=v*pt,z(y,2*w+2*T),y[2*w+2*T+1]+=I*pt,z(y,2*w+2*T+1),y[2*w+2*T+1]+=v*De,z(y,2*w+2*T+1),y[2*w+2*T+2]+=I*De,z(y,2*w+2*T+2)}for(w=0;w<_;w++)y[w]=y[2*w+1]<<16|y[2*w];for(w=_;w<2*_;w++)y[w]=0;return new a(y,0)};function z(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function B(E,_){this.g=E,this.h=_}function j(E,_){if(k(_))throw Error("division by zero");if(k(E))return new B(p,p);if(V(E))return _=j(N(E),_),new B(N(_.g),N(_.h));if(V(_))return _=j(E,N(_)),new B(N(_.g),_.h);if(30<E.g.length){if(V(E)||V(_))throw Error("slowDivide_ only works with positive integers.");for(var y=g,w=_;0>=w.l(E);)y=le(y),w=le(w);var T=q(y,1),I=q(w,1);for(w=q(w,2),y=q(y,2);!k(w);){var v=I.add(w);0>=v.l(E)&&(T=T.add(y),I=v),w=q(w,1),y=q(y,1)}return _=K(E,T.j(_)),new B(T,_)}for(T=p;0<=E.l(_);){for(y=Math.max(1,Math.floor(E.m()/_.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),I=h(y),v=I.j(_);V(v)||0<v.l(E);)y-=w,I=h(y),v=I.j(_);k(I)&&(I=g),T=T.add(I),E=K(E,v)}return new B(T,E)}n.A=function(E){return j(this,E).h},n.and=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],w=0;w<_;w++)y[w]=this.i(w)&E.i(w);return new a(y,this.h&E.h)},n.or=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],w=0;w<_;w++)y[w]=this.i(w)|E.i(w);return new a(y,this.h|E.h)},n.xor=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],w=0;w<_;w++)y[w]=this.i(w)^E.i(w);return new a(y,this.h^E.h)};function le(E){for(var _=E.g.length+1,y=[],w=0;w<_;w++)y[w]=E.i(w)<<1|E.i(w-1)>>>31;return new a(y,E.h)}function q(E,_){var y=_>>5;_%=32;for(var w=E.g.length-y,T=[],I=0;I<w;I++)T[I]=0<_?E.i(I+y)>>>_|E.i(I+y+1)<<32-_:E.i(I+y);return new a(T,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,cf=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,bn=a}).apply(typeof ah<"u"?ah:typeof self<"u"?self:typeof window<"u"?window:{});var ji=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var lf,ks,uf,eo,uc,hf,df,ff;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,d){return o==Array.prototype||o==Object.prototype||(o[u]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ji=="object"&&ji];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,u){if(u)e:{var d=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var b=o[m];if(!(b in d))break e;d=d[b]}o=o[o.length-1],m=d[o],u=u(m),u!=m&&u!=null&&e(d,o,{configurable:!0,writable:!0,value:u})}}function i(o,u){o instanceof String&&(o+="");var d=0,m=!1,b={next:function(){if(!m&&d<o.length){var R=d++;return{value:u(R,o[R]),done:!1}}return m=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}s("Array.prototype.values",function(o){return o||function(){return i(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function h(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function f(o,u,d){return o.call.apply(o.bind,arguments)}function p(o,u,d){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,m),o.apply(u,b)}}return function(){return o.apply(u,arguments)}}function g(o,u,d){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,g.apply(null,arguments)}function A(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function k(o,u){function d(){}d.prototype=u.prototype,o.aa=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(m,b,R){for(var O=Array(arguments.length-2),_e=2;_e<arguments.length;_e++)O[_e-2]=arguments[_e];return u.prototype[b].apply(m,O)}}function V(o){const u=o.length;if(0<u){const d=Array(u);for(let m=0;m<u;m++)d[m]=o[m];return d}return[]}function N(o,u){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(l(m)){const b=o.length||0,R=m.length||0;o.length=b+R;for(let O=0;O<R;O++)o[b+O]=m[O]}else o.push(m)}}class K{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function z(o){return/^[\s\xa0]*$/.test(o)}function B(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function j(o){return j[" "](o),o}j[" "]=function(){};var le=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function q(o,u,d){for(const m in o)u.call(d,o[m],m,o)}function E(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function _(o){const u={};for(const d in o)u[d]=o[d];return u}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(o,u){let d,m;for(let b=1;b<arguments.length;b++){m=arguments[b];for(d in m)o[d]=m[d];for(let R=0;R<y.length;R++)d=y[R],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function T(o){var u=1;o=o.split(":");const d=[];for(;0<u&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function I(o){c.setTimeout(()=>{throw o},0)}function v(){var o=ee;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class De{constructor(){this.h=this.g=null}add(u,d){const m=pt.get();m.set(u,d),this.h?this.h.next=m:this.g=m,this.h=m}}var pt=new K(()=>new D,o=>o.reset());class D{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let F,U=!1,ee=new De,ge=()=>{const o=c.Promise.resolve(void 0);F=()=>{o.then(ot)}};var ot=()=>{for(var o;o=v();){try{o.h.call(o.g)}catch(d){I(d)}var u=pt;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}U=!1};function de(){this.s=this.s,this.C=this.C}de.prototype.s=!1,de.prototype.ma=function(){this.s||(this.s=!0,this.N())},de.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ae(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}ae.prototype.h=function(){this.defaultPrevented=!0};var Tt=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};c.addEventListener("test",d,u),c.removeEventListener("test",d,u)}catch{}return o}();function Ht(o,u){if(ae.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(le){e:{try{j(u.nodeName);var b=!0;break e}catch{}b=!1}b||(u=null)}}else d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:cs[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Ht.aa.h.call(this)}}k(Ht,ae);var cs={2:"touch",3:"pen",4:"mouse"};Ht.prototype.h=function(){Ht.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Je="closure_listenable_"+(1e6*Math.random()|0),qn=0;function Ti(o,u,d,m,b){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!m,this.ha=b,this.key=++qn,this.da=this.fa=!1}function jn(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function zn(o){this.src=o,this.g={},this.h=0}zn.prototype.add=function(o,u,d,m,b){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var O=aa(o,u,m,b);return-1<O?(u=o[O],d||(u.fa=!1)):(u=new Ti(u,this.src,R,!!m,b),u.fa=d,o.push(u)),u};function ln(o,u){var d=u.type;if(d in o.g){var m=o.g[d],b=Array.prototype.indexOf.call(m,u,void 0),R;(R=0<=b)&&Array.prototype.splice.call(m,b,1),R&&(jn(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function aa(o,u,d,m){for(var b=0;b<o.length;++b){var R=o[b];if(!R.da&&R.listener==u&&R.capture==!!d&&R.ha==m)return b}return-1}var ca="closure_lm_"+(1e6*Math.random()|0),la={};function ql(o,u,d,m,b){if(Array.isArray(u)){for(var R=0;R<u.length;R++)ql(o,u[R],d,m,b);return null}return d=Gl(d),o&&o[Je]?o.K(u,d,h(m)?!!m.capture:!1,b):Fm(o,u,d,!1,m,b)}function Fm(o,u,d,m,b,R){if(!u)throw Error("Invalid event type");var O=h(b)?!!b.capture:!!b,_e=ha(o);if(_e||(o[ca]=_e=new zn(o)),d=_e.add(u,d,m,O,R),d.proxy)return d;if(m=Um(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)Tt||(b=O),b===void 0&&(b=!1),o.addEventListener(u.toString(),m,b);else if(o.attachEvent)o.attachEvent(zl(u.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Um(){function o(d){return u.call(o.src,o.listener,d)}const u=$m;return o}function jl(o,u,d,m,b){if(Array.isArray(u))for(var R=0;R<u.length;R++)jl(o,u[R],d,m,b);else m=h(m)?!!m.capture:!!m,d=Gl(d),o&&o[Je]?(o=o.i,u=String(u).toString(),u in o.g&&(R=o.g[u],d=aa(R,d,m,b),-1<d&&(jn(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete o.g[u],o.h--)))):o&&(o=ha(o))&&(u=o.g[u.toString()],o=-1,u&&(o=aa(u,d,m,b)),(d=-1<o?u[o]:null)&&ua(d))}function ua(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Je])ln(u.i,o);else{var d=o.type,m=o.proxy;u.removeEventListener?u.removeEventListener(d,m,o.capture):u.detachEvent?u.detachEvent(zl(d),m):u.addListener&&u.removeListener&&u.removeListener(m),(d=ha(u))?(ln(d,o),d.h==0&&(d.src=null,u[ca]=null)):jn(o)}}}function zl(o){return o in la?la[o]:la[o]="on"+o}function $m(o,u){if(o.da)o=!0;else{u=new Ht(u,this);var d=o.listener,m=o.ha||o.src;o.fa&&ua(o),o=d.call(m,u)}return o}function ha(o){return o=o[ca],o instanceof zn?o:null}var da="__closure_events_fn_"+(1e9*Math.random()>>>0);function Gl(o){return typeof o=="function"?o:(o[da]||(o[da]=function(u){return o.handleEvent(u)}),o[da])}function Xe(){de.call(this),this.i=new zn(this),this.M=this,this.F=null}k(Xe,de),Xe.prototype[Je]=!0,Xe.prototype.removeEventListener=function(o,u,d,m){jl(this,o,u,d,m)};function at(o,u){var d,m=o.F;if(m)for(d=[];m;m=m.F)d.push(m);if(o=o.M,m=u.type||u,typeof u=="string")u=new ae(u,o);else if(u instanceof ae)u.target=u.target||o;else{var b=u;u=new ae(m,o),w(u,b)}if(b=!0,d)for(var R=d.length-1;0<=R;R--){var O=u.g=d[R];b=Ii(O,m,!0,u)&&b}if(O=u.g=o,b=Ii(O,m,!0,u)&&b,b=Ii(O,m,!1,u)&&b,d)for(R=0;R<d.length;R++)O=u.g=d[R],b=Ii(O,m,!1,u)&&b}Xe.prototype.N=function(){if(Xe.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var d=o.g[u],m=0;m<d.length;m++)jn(d[m]);delete o.g[u],o.h--}}this.F=null},Xe.prototype.K=function(o,u,d,m){return this.i.add(String(o),u,!1,d,m)},Xe.prototype.L=function(o,u,d,m){return this.i.add(String(o),u,!0,d,m)};function Ii(o,u,d,m){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var b=!0,R=0;R<u.length;++R){var O=u[R];if(O&&!O.da&&O.capture==d){var _e=O.listener,He=O.ha||O.src;O.fa&&ln(o.i,O),b=_e.call(He,m)!==!1&&b}}return b&&!m.defaultPrevented}function Hl(o,u,d){if(typeof o=="function")d&&(o=g(o,d));else if(o&&typeof o.handleEvent=="function")o=g(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function Wl(o){o.g=Hl(()=>{o.g=null,o.i&&(o.i=!1,Wl(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Bm extends de{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Wl(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ls(o){de.call(this),this.h=o,this.g={}}k(ls,de);var Kl=[];function Ql(o){q(o.g,function(u,d){this.g.hasOwnProperty(d)&&ua(u)},o),o.g={}}ls.prototype.N=function(){ls.aa.N.call(this),Ql(this)},ls.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var fa=c.JSON.stringify,qm=c.JSON.parse,jm=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function pa(){}pa.prototype.h=null;function Jl(o){return o.h||(o.h=o.i())}function Xl(){}var us={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ma(){ae.call(this,"d")}k(ma,ae);function ga(){ae.call(this,"c")}k(ga,ae);var Gn={},Yl=null;function bi(){return Yl=Yl||new Xe}Gn.La="serverreachability";function Zl(o){ae.call(this,Gn.La,o)}k(Zl,ae);function hs(o){const u=bi();at(u,new Zl(u))}Gn.STAT_EVENT="statevent";function eu(o,u){ae.call(this,Gn.STAT_EVENT,o),this.stat=u}k(eu,ae);function ct(o){const u=bi();at(u,new eu(u,o))}Gn.Ma="timingevent";function tu(o,u){ae.call(this,Gn.Ma,o),this.size=u}k(tu,ae);function ds(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function fs(){this.g=!0}fs.prototype.xa=function(){this.g=!1};function zm(o,u,d,m,b,R){o.info(function(){if(o.g)if(R)for(var O="",_e=R.split("&"),He=0;He<_e.length;He++){var ce=_e[He].split("=");if(1<ce.length){var Ye=ce[0];ce=ce[1];var Ze=Ye.split("_");O=2<=Ze.length&&Ze[1]=="type"?O+(Ye+"="+ce+"&"):O+(Ye+"=redacted&")}}else O=null;else O=R;return"XMLHTTP REQ ("+m+") [attempt "+b+"]: "+u+`
`+d+`
`+O})}function Gm(o,u,d,m,b,R,O){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+b+"]: "+u+`
`+d+`
`+R+" "+O})}function _r(o,u,d,m){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Wm(o,d)+(m?" "+m:"")})}function Hm(o,u){o.info(function(){return"TIMEOUT: "+u})}fs.prototype.info=function(){};function Wm(o,u){if(!o.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var m=d[o];if(!(2>m.length)){var b=m[1];if(Array.isArray(b)&&!(1>b.length)){var R=b[0];if(R!="noop"&&R!="stop"&&R!="close")for(var O=1;O<b.length;O++)b[O]=""}}}}return fa(d)}catch{return u}}var Ai={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},nu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},_a;function Si(){}k(Si,pa),Si.prototype.g=function(){return new XMLHttpRequest},Si.prototype.i=function(){return{}},_a=new Si;function un(o,u,d,m){this.j=o,this.i=u,this.l=d,this.R=m||1,this.U=new ls(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ru}function ru(){this.i=null,this.g="",this.h=!1}var su={},ya={};function va(o,u,d){o.L=1,o.v=Pi(Wt(u)),o.m=d,o.P=!0,iu(o,null)}function iu(o,u){o.F=Date.now(),Ri(o),o.A=Wt(o.v);var d=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),vu(d.i,"t",m),o.C=0,d=o.j.J,o.h=new ru,o.g=Lu(o.j,d?u:null,!o.m),0<o.O&&(o.M=new Bm(g(o.Y,o,o.g),o.O)),u=o.U,d=o.g,m=o.ca;var b="readystatechange";Array.isArray(b)||(b&&(Kl[0]=b.toString()),b=Kl);for(var R=0;R<b.length;R++){var O=ql(d,b[R],m||u.handleEvent,!1,u.h||u);if(!O)break;u.g[O.key]=O}u=o.H?_(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),hs(),zm(o.i,o.u,o.A,o.l,o.R,o.m)}un.prototype.ca=function(o){o=o.target;const u=this.M;u&&Kt(o)==3?u.j():this.Y(o)},un.prototype.Y=function(o){try{if(o==this.g)e:{const Ze=Kt(this.g);var u=this.g.Ba();const Er=this.g.Z();if(!(3>Ze)&&(Ze!=3||this.g&&(this.h.h||this.g.oa()||Su(this.g)))){this.J||Ze!=4||u==7||(u==8||0>=Er?hs(3):hs(2)),Ea(this);var d=this.g.Z();this.X=d;t:if(ou(this)){var m=Su(this.g);o="";var b=m.length,R=Kt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Hn(this),ps(this);var O="";break t}this.h.i=new c.TextDecoder}for(u=0;u<b;u++)this.h.h=!0,o+=this.h.i.decode(m[u],{stream:!(R&&u==b-1)});m.length=0,this.h.g+=o,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,Gm(this.i,this.u,this.A,this.l,this.R,Ze,d),this.o){if(this.T&&!this.K){t:{if(this.g){var _e,He=this.g;if((_e=He.g?He.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!z(_e)){var ce=_e;break t}}ce=null}if(d=ce)_r(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,wa(this,d);else{this.o=!1,this.s=3,ct(12),Hn(this),ps(this);break e}}if(this.P){d=!0;let It;for(;!this.J&&this.C<O.length;)if(It=Km(this,O),It==ya){Ze==4&&(this.s=4,ct(14),d=!1),_r(this.i,this.l,null,"[Incomplete Response]");break}else if(It==su){this.s=4,ct(15),_r(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else _r(this.i,this.l,It,null),wa(this,It);if(ou(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ze!=4||O.length!=0||this.h.h||(this.s=1,ct(16),d=!1),this.o=this.o&&d,!d)_r(this.i,this.l,O,"[Invalid Chunked Response]"),Hn(this),ps(this);else if(0<O.length&&!this.W){this.W=!0;var Ye=this.j;Ye.g==this&&Ye.ba&&!Ye.M&&(Ye.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),Ra(Ye),Ye.M=!0,ct(11))}}else _r(this.i,this.l,O,null),wa(this,O);Ze==4&&Hn(this),this.o&&!this.J&&(Ze==4?xu(this.j,this):(this.o=!1,Ri(this)))}else hg(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,ct(12)):(this.s=0,ct(13)),Hn(this),ps(this)}}}catch{}finally{}};function ou(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Km(o,u){var d=o.C,m=u.indexOf(`
`,d);return m==-1?ya:(d=Number(u.substring(d,m)),isNaN(d)?su:(m+=1,m+d>u.length?ya:(u=u.slice(m,m+d),o.C=m+d,u)))}un.prototype.cancel=function(){this.J=!0,Hn(this)};function Ri(o){o.S=Date.now()+o.I,au(o,o.I)}function au(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=ds(g(o.ba,o),u)}function Ea(o){o.B&&(c.clearTimeout(o.B),o.B=null)}un.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Hm(this.i,this.A),this.L!=2&&(hs(),ct(17)),Hn(this),this.s=2,ps(this)):au(this,this.S-o)};function ps(o){o.j.G==0||o.J||xu(o.j,o)}function Hn(o){Ea(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,Ql(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function wa(o,u){try{var d=o.j;if(d.G!=0&&(d.g==o||Ta(d.h,o))){if(!o.K&&Ta(d.h,o)&&d.G==3){try{var m=d.Da.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var b=m;if(b[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)Mi(d),Di(d);else break e;Sa(d),ct(18)}}else d.za=b[1],0<d.za-d.T&&37500>b[2]&&d.F&&d.v==0&&!d.C&&(d.C=ds(g(d.Za,d),6e3));if(1>=uu(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Kn(d,11)}else if((o.K||d.g==o)&&Mi(d),!z(u))for(b=d.Da.g.parse(u),u=0;u<b.length;u++){let ce=b[u];if(d.T=ce[0],ce=ce[1],d.G==2)if(ce[0]=="c"){d.K=ce[1],d.ia=ce[2];const Ye=ce[3];Ye!=null&&(d.la=Ye,d.j.info("VER="+d.la));const Ze=ce[4];Ze!=null&&(d.Aa=Ze,d.j.info("SVER="+d.Aa));const Er=ce[5];Er!=null&&typeof Er=="number"&&0<Er&&(m=1.5*Er,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const It=o.g;if(It){const Fi=It.g?It.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Fi){var R=m.h;R.g||Fi.indexOf("spdy")==-1&&Fi.indexOf("quic")==-1&&Fi.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Ia(R,R.h),R.h=null))}if(m.D){const ka=It.g?It.g.getResponseHeader("X-HTTP-Session-Id"):null;ka&&(m.ya=ka,we(m.I,m.D,ka))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var O=o;if(m.qa=Mu(m,m.J?m.ia:null,m.W),O.K){hu(m.h,O);var _e=O,He=m.L;He&&(_e.I=He),_e.B&&(Ea(_e),Ri(_e)),m.g=O}else Vu(m);0<d.i.length&&Oi(d)}else ce[0]!="stop"&&ce[0]!="close"||Kn(d,7);else d.G==3&&(ce[0]=="stop"||ce[0]=="close"?ce[0]=="stop"?Kn(d,7):Aa(d):ce[0]!="noop"&&d.l&&d.l.ta(ce),d.v=0)}}hs(4)}catch{}}var Qm=class{constructor(o,u){this.g=o,this.map=u}};function cu(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function lu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function uu(o){return o.h?1:o.g?o.g.size:0}function Ta(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Ia(o,u){o.g?o.g.add(u):o.h=u}function hu(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}cu.prototype.cancel=function(){if(this.i=du(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function du(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.D);return u}return V(o.i)}function Jm(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],d=o.length,m=0;m<d;m++)u.push(o[m]);return u}u=[],d=0;for(m in o)u[d++]=o[m];return u}function Xm(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var d=0;d<o;d++)u.push(d);return u}u=[],d=0;for(const m in o)u[d++]=m;return u}}}function fu(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var d=Xm(o),m=Jm(o),b=m.length,R=0;R<b;R++)u.call(void 0,m[R],d&&d[R],o)}var pu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ym(o,u){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var m=o[d].indexOf("="),b=null;if(0<=m){var R=o[d].substring(0,m);b=o[d].substring(m+1)}else R=o[d];u(R,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function Wn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Wn){this.h=o.h,ki(this,o.j),this.o=o.o,this.g=o.g,Ci(this,o.s),this.l=o.l;var u=o.i,d=new _s;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),mu(this,d),this.m=o.m}else o&&(u=String(o).match(pu))?(this.h=!1,ki(this,u[1]||"",!0),this.o=ms(u[2]||""),this.g=ms(u[3]||"",!0),Ci(this,u[4]),this.l=ms(u[5]||"",!0),mu(this,u[6]||"",!0),this.m=ms(u[7]||"")):(this.h=!1,this.i=new _s(null,this.h))}Wn.prototype.toString=function(){var o=[],u=this.j;u&&o.push(gs(u,gu,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(gs(u,gu,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(gs(d,d.charAt(0)=="/"?tg:eg,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",gs(d,rg)),o.join("")};function Wt(o){return new Wn(o)}function ki(o,u,d){o.j=d?ms(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Ci(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function mu(o,u,d){u instanceof _s?(o.i=u,sg(o.i,o.h)):(d||(u=gs(u,ng)),o.i=new _s(u,o.h))}function we(o,u,d){o.i.set(u,d)}function Pi(o){return we(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function ms(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function gs(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,Zm),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Zm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var gu=/[#\/\?@]/g,eg=/[#\?:]/g,tg=/[#\?]/g,ng=/[#\?@]/g,rg=/#/g;function _s(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function hn(o){o.g||(o.g=new Map,o.h=0,o.i&&Ym(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=_s.prototype,n.add=function(o,u){hn(this),this.i=null,o=yr(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function _u(o,u){hn(o),u=yr(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function yu(o,u){return hn(o),u=yr(o,u),o.g.has(u)}n.forEach=function(o,u){hn(this),this.g.forEach(function(d,m){d.forEach(function(b){o.call(u,b,m,this)},this)},this)},n.na=function(){hn(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let m=0;m<u.length;m++){const b=o[m];for(let R=0;R<b.length;R++)d.push(u[m])}return d},n.V=function(o){hn(this);let u=[];if(typeof o=="string")yu(this,o)&&(u=u.concat(this.g.get(yr(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)u=u.concat(o[d])}return u},n.set=function(o,u){return hn(this),this.i=null,o=yr(this,o),yu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function vu(o,u,d){_u(o,u),0<d.length&&(o.i=null,o.g.set(yr(o,u),V(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var m=u[d];const R=encodeURIComponent(String(m)),O=this.V(m);for(m=0;m<O.length;m++){var b=R;O[m]!==""&&(b+="="+encodeURIComponent(String(O[m]))),o.push(b)}}return this.i=o.join("&")};function yr(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function sg(o,u){u&&!o.j&&(hn(o),o.i=null,o.g.forEach(function(d,m){var b=m.toLowerCase();m!=b&&(_u(this,m),vu(this,b,d))},o)),o.j=u}function ig(o,u){const d=new fs;if(c.Image){const m=new Image;m.onload=A(dn,d,"TestLoadImage: loaded",!0,u,m),m.onerror=A(dn,d,"TestLoadImage: error",!1,u,m),m.onabort=A(dn,d,"TestLoadImage: abort",!1,u,m),m.ontimeout=A(dn,d,"TestLoadImage: timeout",!1,u,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else u(!1)}function og(o,u){const d=new fs,m=new AbortController,b=setTimeout(()=>{m.abort(),dn(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:m.signal}).then(R=>{clearTimeout(b),R.ok?dn(d,"TestPingServer: ok",!0,u):dn(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(b),dn(d,"TestPingServer: error",!1,u)})}function dn(o,u,d,m,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),m(d)}catch{}}function ag(){this.g=new jm}function cg(o,u,d){const m=d||"";try{fu(o,function(b,R){let O=b;h(b)&&(O=fa(b)),u.push(m+R+"="+encodeURIComponent(O))})}catch(b){throw u.push(m+"type="+encodeURIComponent("_badmap")),b}}function Vi(o){this.l=o.Ub||null,this.j=o.eb||!1}k(Vi,pa),Vi.prototype.g=function(){return new Ni(this.l,this.j)},Vi.prototype.i=function(o){return function(){return o}}({});function Ni(o,u){Xe.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Ni,Xe),n=Ni.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,vs(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ys(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,vs(this)),this.g&&(this.readyState=3,vs(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Eu(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Eu(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?ys(this):vs(this),this.readyState==3&&Eu(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,ys(this))},n.Qa=function(o){this.g&&(this.response=o,ys(this))},n.ga=function(){this.g&&ys(this)};function ys(o){o.readyState=4,o.l=null,o.j=null,o.v=null,vs(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function vs(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Ni.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function wu(o){let u="";return q(o,function(d,m){u+=m,u+=":",u+=d,u+=`\r
`}),u}function ba(o,u,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=wu(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):we(o,u,d))}function Ve(o){Xe.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(Ve,Xe);var lg=/^https?$/i,ug=["POST","PUT"];n=Ve.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():_a.g(),this.v=this.o?Jl(this.o):Jl(_a),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(R){Tu(this,R);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var b in m)d.set(b,m[b]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const R of m.keys())d.set(R,m.get(R));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),b=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(ug,u,void 0))||m||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,O]of d)this.g.setRequestHeader(R,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Au(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){Tu(this,R)}};function Tu(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Iu(o),xi(o)}function Iu(o){o.A||(o.A=!0,at(o,"complete"),at(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,at(this,"complete"),at(this,"abort"),xi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),xi(this,!0)),Ve.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?bu(this):this.bb())},n.bb=function(){bu(this)};function bu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Kt(o)!=4||o.Z()!=2)){if(o.u&&Kt(o)==4)Hl(o.Ea,0,o);else if(at(o,"readystatechange"),Kt(o)==4){o.h=!1;try{const O=o.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var m;if(m=O===0){var b=String(o.D).match(pu)[1]||null;!b&&c.self&&c.self.location&&(b=c.self.location.protocol.slice(0,-1)),m=!lg.test(b?b.toLowerCase():"")}d=m}if(d)at(o,"complete"),at(o,"success");else{o.m=6;try{var R=2<Kt(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",Iu(o)}}finally{xi(o)}}}}function xi(o,u){if(o.g){Au(o);const d=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||at(o,"ready");try{d.onreadystatechange=m}catch{}}}function Au(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function Kt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<Kt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),qm(u)}};function Su(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function hg(o){const u={};o=(o.g&&2<=Kt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(z(o[m]))continue;var d=T(o[m]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=u[b]||[];u[b]=R,R.push(d)}E(u,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Es(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function Ru(o){this.Aa=0,this.i=[],this.j=new fs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Es("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Es("baseRetryDelayMs",5e3,o),this.cb=Es("retryDelaySeedMs",1e4,o),this.Wa=Es("forwardChannelMaxRetries",2,o),this.wa=Es("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new cu(o&&o.concurrentRequestLimit),this.Da=new ag,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Ru.prototype,n.la=8,n.G=1,n.connect=function(o,u,d,m){ct(0),this.W=o,this.H=u||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=Mu(this,null,this.W),Oi(this)};function Aa(o){if(ku(o),o.G==3){var u=o.U++,d=Wt(o.I);if(we(d,"SID",o.K),we(d,"RID",u),we(d,"TYPE","terminate"),ws(o,d),u=new un(o,o.j,u),u.L=2,u.v=Pi(Wt(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=u.v,d=!0),d||(u.g=Lu(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Ri(u)}Ou(o)}function Di(o){o.g&&(Ra(o),o.g.cancel(),o.g=null)}function ku(o){Di(o),o.u&&(c.clearTimeout(o.u),o.u=null),Mi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Oi(o){if(!lu(o.h)&&!o.s){o.s=!0;var u=o.Ga;F||ge(),U||(F(),U=!0),ee.add(u,o),o.B=0}}function dg(o,u){return uu(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=ds(g(o.Ga,o,u),Du(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const b=new un(this,this.j,o);let R=this.o;if(this.S&&(R?(R=_(R),w(R,this.S)):R=this.S),this.m!==null||this.O||(b.H=R,R=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=Pu(this,b,u),d=Wt(this.I),we(d,"RID",o),we(d,"CVER",22),this.D&&we(d,"X-HTTP-Session-Id",this.D),ws(this,d),R&&(this.O?u="headers="+encodeURIComponent(String(wu(R)))+"&"+u:this.m&&ba(d,this.m,R)),Ia(this.h,b),this.Ua&&we(d,"TYPE","init"),this.P?(we(d,"$req",u),we(d,"SID","null"),b.T=!0,va(b,d,null)):va(b,d,u),this.G=2}}else this.G==3&&(o?Cu(this,o):this.i.length==0||lu(this.h)||Cu(this))};function Cu(o,u){var d;u?d=u.l:d=o.U++;const m=Wt(o.I);we(m,"SID",o.K),we(m,"RID",d),we(m,"AID",o.T),ws(o,m),o.m&&o.o&&ba(m,o.m,o.o),d=new un(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Pu(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ia(o.h,d),va(d,m,u)}function ws(o,u){o.H&&q(o.H,function(d,m){we(u,m,d)}),o.l&&fu({},function(d,m){we(u,m,d)})}function Pu(o,u,d){d=Math.min(o.i.length,d);var m=o.l?g(o.l.Na,o.l,o):null;e:{var b=o.i;let R=-1;for(;;){const O=["count="+d];R==-1?0<d?(R=b[0].g,O.push("ofs="+R)):R=0:O.push("ofs="+R);let _e=!0;for(let He=0;He<d;He++){let ce=b[He].g;const Ye=b[He].map;if(ce-=R,0>ce)R=Math.max(0,b[He].g-100),_e=!1;else try{cg(Ye,O,"req"+ce+"_")}catch{m&&m(Ye)}}if(_e){m=O.join("&");break e}}}return o=o.i.splice(0,d),u.D=o,m}function Vu(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;F||ge(),U||(F(),U=!0),ee.add(u,o),o.v=0}}function Sa(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=ds(g(o.Fa,o),Du(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Nu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=ds(g(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ct(10),Di(this),Nu(this))};function Ra(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Nu(o){o.g=new un(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=Wt(o.qa);we(u,"RID","rpc"),we(u,"SID",o.K),we(u,"AID",o.T),we(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&we(u,"TO",o.ja),we(u,"TYPE","xmlhttp"),ws(o,u),o.m&&o.o&&ba(u,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Pi(Wt(u)),d.m=null,d.P=!0,iu(d,o)}n.Za=function(){this.C!=null&&(this.C=null,Di(this),Sa(this),ct(19))};function Mi(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function xu(o,u){var d=null;if(o.g==u){Mi(o),Ra(o),o.g=null;var m=2}else if(Ta(o.h,u))d=u.D,hu(o.h,u),m=1;else return;if(o.G!=0){if(u.o)if(m==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var b=o.B;m=bi(),at(m,new tu(m,d)),Oi(o)}else Vu(o);else if(b=u.s,b==3||b==0&&0<u.X||!(m==1&&dg(o,u)||m==2&&Sa(o)))switch(d&&0<d.length&&(u=o.h,u.i=u.i.concat(d)),b){case 1:Kn(o,5);break;case 4:Kn(o,10);break;case 3:Kn(o,6);break;default:Kn(o,2)}}}function Du(o,u){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*u}function Kn(o,u){if(o.j.info("Error code "+u),u==2){var d=g(o.fb,o),m=o.Xa;const b=!m;m=new Wn(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||ki(m,"https"),Pi(m),b?ig(m.toString(),d):og(m.toString(),d)}else ct(2);o.G=0,o.l&&o.l.sa(u),Ou(o),ku(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),ct(2)):(this.j.info("Failed to ping google.com"),ct(1))};function Ou(o){if(o.G=0,o.ka=[],o.l){const u=du(o.h);(u.length!=0||o.i.length!=0)&&(N(o.ka,u),N(o.ka,o.i),o.h.i.length=0,V(o.i),o.i.length=0),o.l.ra()}}function Mu(o,u,d){var m=d instanceof Wn?Wt(d):new Wn(d);if(m.g!="")u&&(m.g=u+"."+m.g),Ci(m,m.s);else{var b=c.location;m=b.protocol,u=u?u+"."+b.hostname:b.hostname,b=+b.port;var R=new Wn(null);m&&ki(R,m),u&&(R.g=u),b&&Ci(R,b),d&&(R.l=d),m=R}return d=o.D,u=o.ya,d&&u&&we(m,d,u),we(m,"VER",o.la),ws(o,m),m}function Lu(o,u,d){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new Ve(new Vi({eb:d})):new Ve(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Fu(){}n=Fu.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Li(){}Li.prototype.g=function(o,u){return new mt(o,u)};function mt(o,u){Xe.call(this),this.g=new Ru(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!z(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!z(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new vr(this)}k(mt,Xe),mt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},mt.prototype.close=function(){Aa(this.g)},mt.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=fa(o),o=d);u.i.push(new Qm(u.Ya++,o)),u.G==3&&Oi(u)},mt.prototype.N=function(){this.g.l=null,delete this.j,Aa(this.g),delete this.g,mt.aa.N.call(this)};function Uu(o){ma.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const d in u){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}k(Uu,ma);function $u(){ga.call(this),this.status=1}k($u,ga);function vr(o){this.g=o}k(vr,Fu),vr.prototype.ua=function(){at(this.g,"a")},vr.prototype.ta=function(o){at(this.g,new Uu(o))},vr.prototype.sa=function(o){at(this.g,new $u)},vr.prototype.ra=function(){at(this.g,"b")},Li.prototype.createWebChannel=Li.prototype.g,mt.prototype.send=mt.prototype.o,mt.prototype.open=mt.prototype.m,mt.prototype.close=mt.prototype.close,ff=function(){return new Li},df=function(){return bi()},hf=Gn,uc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ai.NO_ERROR=0,Ai.TIMEOUT=8,Ai.HTTP_ERROR=6,eo=Ai,nu.COMPLETE="complete",uf=nu,Xl.EventType=us,us.OPEN="a",us.CLOSE="b",us.ERROR="c",us.MESSAGE="d",Xe.prototype.listen=Xe.prototype.K,ks=Xl,Ve.prototype.listenOnce=Ve.prototype.L,Ve.prototype.getLastError=Ve.prototype.Ka,Ve.prototype.getLastErrorCode=Ve.prototype.Ba,Ve.prototype.getStatus=Ve.prototype.Z,Ve.prototype.getResponseJson=Ve.prototype.Oa,Ve.prototype.getResponseText=Ve.prototype.oa,Ve.prototype.send=Ve.prototype.ea,Ve.prototype.setWithCredentials=Ve.prototype.Ha,lf=Ve}).apply(typeof ji<"u"?ji:typeof self<"u"?self:typeof window<"u"?window:{});const ch="@firebase/firestore",lh="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}nt.UNAUTHENTICATED=new nt(null),nt.GOOGLE_CREDENTIALS=new nt("google-credentials-uid"),nt.FIRST_PARTY=new nt("first-party-uid"),nt.MOCK_USER=new nt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ns="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hr=new qc("@firebase/firestore");function Sr(){return hr.logLevel}function $(n,...e){if(hr.logLevel<=ne.DEBUG){const t=e.map(Gc);hr.debug(`Firestore (${ns}): ${n}`,...t)}}function rn(n,...e){if(hr.logLevel<=ne.ERROR){const t=e.map(Gc);hr.error(`Firestore (${ns}): ${n}`,...t)}}function Nn(n,...e){if(hr.logLevel<=ne.WARN){const t=e.map(Gc);hr.warn(`Firestore (${ns}): ${n}`,...t)}}function Gc(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,pf(n,r,t)}function pf(n,e,t){let r=`FIRESTORE (${ns}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw rn(r),new Error(r)}function oe(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||pf(e,s,r)}function Z(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends cn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class W0{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(nt.UNAUTHENTICATED))}shutdown(){}}class K0{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Q0{constructor(e){this.t=e,this.currentUser=nt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){oe(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new Zt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Zt,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Zt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(oe(typeof r.accessToken=="string",31837,{l:r}),new mf(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return oe(e===null||typeof e=="string",2055,{h:e}),new nt(e)}}class J0{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=nt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class X0{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new J0(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(nt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class uh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Y0{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ot(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){oe(this.o===void 0,3512);const r=i=>{i.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,$("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new uh(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(oe(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new uh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z0(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gf(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Z0(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function te(n,e){return n<e?-1:n>e?1:0}function hc(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),s=e.codePointAt(t);if(r!==s){if(r<128&&s<128)return te(r,s);{const i=gf(),a=ey(i.encode(hh(n,t)),i.encode(hh(e,t)));return a!==0?a:te(r,s)}}t+=r>65535?2:1}return te(n.length,e.length)}function hh(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function ey(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return te(n[t],e[t]);return te(n.length,e.length)}function zr(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh="__name__";class xt{constructor(e,t,r){t===void 0?t=0:t>e.length&&W(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&W(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return xt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof xt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=xt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return te(e.length,t.length)}static compareSegments(e,t){const r=xt.isNumericId(e),s=xt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?xt.extractNumericId(e).compare(xt.extractNumericId(t)):hc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return bn.fromString(e.substring(4,e.length-2))}}class me extends xt{construct(e,t,r){return new me(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new M(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new me(t)}static emptyPath(){return new me([])}}const ty=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ke extends xt{construct(e,t,r){return new Ke(e,t,r)}static isValidIdentifier(e){return ty.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ke.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===dh}static keyField(){return new Ke([dh])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new M(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new M(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new M(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new M(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ke(t)}static emptyPath(){return new Ke([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(me.fromString(e))}static fromName(e){return new G(me.fromString(e).popFirst(5))}static empty(){return new G(me.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&me.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return me.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new me(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _f(n,e,t){if(!t)throw new M(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function ny(n,e,t,r){if(e===!0&&r===!0)throw new M(C.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function fh(n){if(!G.isDocumentKey(n))throw new M(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ph(n){if(G.isDocumentKey(n))throw new M(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function yf(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function qo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":W(12329,{type:typeof n})}function wt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new M(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=qo(n);throw new M(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(n,e){const t={typeString:n};return e&&(t.value=e),t}function li(n,e){if(!yf(n))throw new M(C.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new M(C.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh=-62135596800,gh=1e6;class be{static now(){return be.fromMillis(Date.now())}static fromDate(e){return be.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*gh);return new be(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<mh)throw new M(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/gh}_compareTo(e){return this.seconds===e.seconds?te(this.nanoseconds,e.nanoseconds):te(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:be._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(li(e,be._jsonSchema))return new be(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-mh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}be._jsonSchemaVersion="firestore/timestamp/1.0",be._jsonSchema={type:Le("string",be._jsonSchemaVersion),seconds:Le("number"),nanoseconds:Le("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{static fromTimestamp(e){return new X(e)}static min(){return new X(new be(0,0))}static max(){return new X(new be(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ws=-1;function ry(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=X.fromTimestamp(r===1e9?new be(t+1,0):new be(t,r));return new xn(s,G.empty(),e)}function sy(n){return new xn(n.readTime,n.key,Ws)}class xn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new xn(X.min(),G.empty(),Ws)}static max(){return new xn(X.max(),G.empty(),Ws)}}function iy(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=G.comparator(n.documentKey,e.documentKey),t!==0?t:te(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oy="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ay{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rs(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==oy)throw n;$("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&W(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,r)=>{t(e)})}static reject(e){return new P((t,r)=>{r(e)})}static waitFor(e){return new P((t,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&t()},l=>r(l))}),a=!0,i===s&&t()})}static or(e){let t=P.resolve(!1);for(const r of e)t=t.next(s=>s?P.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new P((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;t(e[h]).next(f=>{a[h]=f,++c,c===i&&r(a)},f=>s(f))}})}static doWhile(e,t){return new P((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function cy(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ss(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}jo.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc=-1;function ui(n){return n==null}function Eo(n){return n===0&&1/n==-1/0}function ly(n){return typeof n=="number"&&Number.isInteger(n)&&!Eo(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vf="";function uy(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=_h(e)),e=hy(n.get(t),e);return _h(e)}function hy(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case vf:t+="";break;default:t+=i}}return t}function _h(n){return n+vf+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function $n(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Ef(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,t){this.comparator=e,this.root=t||We.EMPTY}insert(e,t){return new Pe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,We.BLACK,null,null))}remove(e){return new Pe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,We.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new zi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new zi(this.root,e,this.comparator,!1)}getReverseIterator(){return new zi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new zi(this.root,e,this.comparator,!0)}}class zi{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class We{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??We.RED,this.left=s??We.EMPTY,this.right=i??We.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new We(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return We.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return We.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,We.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,We.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw W(43730,{key:this.key,value:this.value});if(this.right.isRed())throw W(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw W(27949);return e+(this.isRed()?0:1)}}We.EMPTY=null,We.RED=!0,We.BLACK=!1;We.EMPTY=new class{constructor(){this.size=0}get key(){throw W(57766)}get value(){throw W(16141)}get color(){throw W(16727)}get left(){throw W(29726)}get right(){throw W(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new We(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.comparator=e,this.data=new Pe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new vh(this.data.getIterator())}getIteratorFrom(e){return new vh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ue)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ue(this.comparator);return t.data=e,t}}class vh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e){this.fields=e,e.sort(Ke.comparator)}static empty(){return new _t([])}unionWith(e){let t=new Ue(Ke.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new _t(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return zr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new wf("Invalid base64 string: "+i):i}}(e);return new Qe(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new Qe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return te(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Qe.EMPTY_BYTE_STRING=new Qe("");const dy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Dn(n){if(oe(!!n,39018),typeof n=="string"){let e=0;const t=dy.exec(n);if(oe(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:xe(n.seconds),nanos:xe(n.nanos)}}function xe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function On(n){return typeof n=="string"?Qe.fromBase64String(n):Qe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tf="server_timestamp",If="__type__",bf="__previous_value__",Af="__local_write_time__";function Kc(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[If])===null||t===void 0?void 0:t.stringValue)===Tf}function zo(n){const e=n.mapValue.fields[bf];return Kc(e)?zo(e):e}function Ks(n){const e=Dn(n.mapValue.fields[Af].timestampValue);return new be(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(e,t,r,s,i,a,c,l,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=f}}const wo="(default)";class Qs{constructor(e,t){this.projectId=e,this.database=t||wo}static empty(){return new Qs("","")}get isDefaultDatabase(){return this.database===wo}isEqual(e){return e instanceof Qs&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf="__type__",py="__max__",Gi={mapValue:{}},Rf="__vector__",To="value";function Mn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Kc(n)?4:gy(n)?9007199254740991:my(n)?10:11:W(28295,{value:n})}function Gt(n,e){if(n===e)return!0;const t=Mn(n);if(t!==Mn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ks(n).isEqual(Ks(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Dn(s.timestampValue),c=Dn(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return On(s.bytesValue).isEqual(On(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return xe(s.geoPointValue.latitude)===xe(i.geoPointValue.latitude)&&xe(s.geoPointValue.longitude)===xe(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return xe(s.integerValue)===xe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=xe(s.doubleValue),c=xe(i.doubleValue);return a===c?Eo(a)===Eo(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return zr(n.arrayValue.values||[],e.arrayValue.values||[],Gt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(yh(a)!==yh(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!Gt(a[l],c[l])))return!1;return!0}(n,e);default:return W(52216,{left:n})}}function Js(n,e){return(n.values||[]).find(t=>Gt(t,e))!==void 0}function Gr(n,e){if(n===e)return 0;const t=Mn(n),r=Mn(e);if(t!==r)return te(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return te(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=xe(i.integerValue||i.doubleValue),l=xe(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Eh(n.timestampValue,e.timestampValue);case 4:return Eh(Ks(n),Ks(e));case 5:return hc(n.stringValue,e.stringValue);case 6:return function(i,a){const c=On(i),l=On(a);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),l=a.split("/");for(let h=0;h<c.length&&h<l.length;h++){const f=te(c[h],l[h]);if(f!==0)return f}return te(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=te(xe(i.latitude),xe(a.latitude));return c!==0?c:te(xe(i.longitude),xe(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return wh(n.arrayValue,e.arrayValue);case 10:return function(i,a){var c,l,h,f;const p=i.fields||{},g=a.fields||{},A=(c=p[To])===null||c===void 0?void 0:c.arrayValue,k=(l=g[To])===null||l===void 0?void 0:l.arrayValue,V=te(((h=A==null?void 0:A.values)===null||h===void 0?void 0:h.length)||0,((f=k==null?void 0:k.values)===null||f===void 0?void 0:f.length)||0);return V!==0?V:wh(A,k)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===Gi.mapValue&&a===Gi.mapValue)return 0;if(i===Gi.mapValue)return 1;if(a===Gi.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=a.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let p=0;p<l.length&&p<f.length;++p){const g=hc(l[p],f[p]);if(g!==0)return g;const A=Gr(c[l[p]],h[f[p]]);if(A!==0)return A}return te(l.length,f.length)}(n.mapValue,e.mapValue);default:throw W(23264,{le:t})}}function Eh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return te(n,e);const t=Dn(n),r=Dn(e),s=te(t.seconds,r.seconds);return s!==0?s:te(t.nanos,r.nanos)}function wh(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Gr(t[s],r[s]);if(i)return i}return te(t.length,r.length)}function Hr(n){return dc(n)}function dc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Dn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return On(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return G.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=dc(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${dc(t.fields[a])}`;return s+"}"}(n.mapValue):W(61005,{value:n})}function to(n){switch(Mn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=zo(n);return e?16+to(e):16;case 5:return 2*n.stringValue.length;case 6:return On(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+to(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return $n(r.fields,(i,a)=>{s+=i.length+to(a)}),s}(n.mapValue);default:throw W(13486,{value:n})}}function Th(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function fc(n){return!!n&&"integerValue"in n}function Qc(n){return!!n&&"arrayValue"in n}function Ih(n){return!!n&&"nullValue"in n}function bh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function no(n){return!!n&&"mapValue"in n}function my(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Sf])===null||t===void 0?void 0:t.stringValue)===Rf}function Ds(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return $n(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Ds(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ds(n.arrayValue.values[t]);return e}return Object.assign({},n)}function gy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===py}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e){this.value=e}static empty(){return new ut({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!no(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ds(t)}setAll(e){let t=Ke.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=Ds(a):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());no(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Gt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];no(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){$n(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new ut(Ds(this.value))}}function kf(n){const e=[];return $n(n.fields,(t,r)=>{const s=new Ke([t]);if(no(r)){const i=kf(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new _t(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new ze(e,0,X.min(),X.min(),X.min(),ut.empty(),0)}static newFoundDocument(e,t,r,s){return new ze(e,1,t,X.min(),r,s,0)}static newNoDocument(e,t){return new ze(e,2,t,X.min(),X.min(),ut.empty(),0)}static newUnknownDocument(e,t){return new ze(e,3,t,X.min(),X.min(),ut.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(X.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ut.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ut.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=X.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ze&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ze(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,t){this.position=e,this.inclusive=t}}function Ah(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=G.comparator(G.fromName(a.referenceValue),t.key):r=Gr(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Sh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Gt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t="asc"){this.field=e,this.dir=t}}function _y(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{}class Me extends Cf{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new vy(e,t,r):t==="array-contains"?new Ty(e,r):t==="in"?new Iy(e,r):t==="not-in"?new by(e,r):t==="array-contains-any"?new Ay(e,r):new Me(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Ey(e,r):new wy(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Gr(t,this.value)):t!==null&&Mn(this.value)===Mn(t)&&this.matchesComparison(Gr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return W(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Pt extends Cf{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new Pt(e,t)}matches(e){return Pf(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function Pf(n){return n.op==="and"}function Vf(n){return yy(n)&&Pf(n)}function yy(n){for(const e of n.filters)if(e instanceof Pt)return!1;return!0}function pc(n){if(n instanceof Me)return n.field.canonicalString()+n.op.toString()+Hr(n.value);if(Vf(n))return n.filters.map(e=>pc(e)).join(",");{const e=n.filters.map(t=>pc(t)).join(",");return`${n.op}(${e})`}}function Nf(n,e){return n instanceof Me?function(r,s){return s instanceof Me&&r.op===s.op&&r.field.isEqual(s.field)&&Gt(r.value,s.value)}(n,e):n instanceof Pt?function(r,s){return s instanceof Pt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&Nf(a,s.filters[c]),!0):!1}(n,e):void W(19439)}function xf(n){return n instanceof Me?function(t){return`${t.field.canonicalString()} ${t.op} ${Hr(t.value)}`}(n):n instanceof Pt?function(t){return t.op.toString()+" {"+t.getFilters().map(xf).join(" ,")+"}"}(n):"Filter"}class vy extends Me{constructor(e,t,r){super(e,t,r),this.key=G.fromName(r.referenceValue)}matches(e){const t=G.comparator(e.key,this.key);return this.matchesComparison(t)}}class Ey extends Me{constructor(e,t){super(e,"in",t),this.keys=Df("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class wy extends Me{constructor(e,t){super(e,"not-in",t),this.keys=Df("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Df(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>G.fromName(r.referenceValue))}class Ty extends Me{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Qc(t)&&Js(t.arrayValue,this.value)}}class Iy extends Me{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Js(this.value.arrayValue,t)}}class by extends Me{constructor(e,t){super(e,"not-in",t)}matches(e){if(Js(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Js(this.value.arrayValue,t)}}class Ay extends Me{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Qc(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Js(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sy{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Pe=null}}function Rh(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Sy(n,e,t,r,s,i,a)}function Jc(n){const e=Z(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>pc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),ui(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Hr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Hr(r)).join(",")),e.Pe=t}return e.Pe}function Xc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!_y(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Nf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Sh(n.startAt,e.startAt)&&Sh(n.endAt,e.endAt)}function mc(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function Ry(n,e,t,r,s,i,a,c){return new is(n,e,t,r,s,i,a,c)}function Go(n){return new is(n)}function kh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Of(n){return n.collectionGroup!==null}function Os(n){const e=Z(n);if(e.Te===null){e.Te=[];const t=new Set;for(const i of e.explicitOrderBy)e.Te.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Ue(Ke.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Te.push(new Xs(i,r))}),t.has(Ke.keyField().canonicalString())||e.Te.push(new Xs(Ke.keyField(),r))}return e.Te}function Ut(n){const e=Z(n);return e.Ie||(e.Ie=ky(e,Os(n))),e.Ie}function ky(n,e){if(n.limitType==="F")return Rh(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Xs(s.field,i)});const t=n.endAt?new Io(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Io(n.startAt.position,n.startAt.inclusive):null;return Rh(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function gc(n,e){const t=n.filters.concat([e]);return new is(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function _c(n,e,t){return new is(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ho(n,e){return Xc(Ut(n),Ut(e))&&n.limitType===e.limitType}function Mf(n){return`${Jc(Ut(n))}|lt:${n.limitType}`}function Rr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>xf(s)).join(", ")}]`),ui(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Hr(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Hr(s)).join(",")),`Target(${r})`}(Ut(n))}; limitType=${n.limitType})`}function Wo(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):G.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of Os(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,c,l){const h=Ah(a,c,l);return a.inclusive?h<=0:h<0}(r.startAt,Os(r),s)||r.endAt&&!function(a,c,l){const h=Ah(a,c,l);return a.inclusive?h>=0:h>0}(r.endAt,Os(r),s))}(n,e)}function Cy(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Lf(n){return(e,t)=>{let r=!1;for(const s of Os(n)){const i=Py(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Py(n,e,t){const r=n.field.isKeyField()?G.comparator(e.key,t.key):function(i,a,c){const l=a.data.field(i),h=c.data.field(i);return l!==null&&h!==null?Gr(l,h):W(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return W(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){$n(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Ef(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vy=new Pe(G.comparator);function sn(){return Vy}const Ff=new Pe(G.comparator);function Cs(...n){let e=Ff;for(const t of n)e=e.insert(t.key,t);return e}function Uf(n){let e=Ff;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function nr(){return Ms()}function $f(){return Ms()}function Ms(){return new pr(n=>n.toString(),(n,e)=>n.isEqual(e))}const Ny=new Pe(G.comparator),xy=new Ue(G.comparator);function re(...n){let e=xy;for(const t of n)e=e.add(t);return e}const Dy=new Ue(te);function Oy(){return Dy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yc(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Eo(e)?"-0":e}}function Bf(n){return{integerValue:""+n}}function qf(n,e){return ly(e)?Bf(e):Yc(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(){this._=void 0}}function My(n,e,t){return n instanceof Ys?function(s,i){const a={fields:{[If]:{stringValue:Tf},[Af]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Kc(i)&&(i=zo(i)),i&&(a.fields[bf]=i),{mapValue:a}}(t,e):n instanceof Zs?zf(n,e):n instanceof ei?Gf(n,e):function(s,i){const a=jf(s,i),c=Ch(a)+Ch(s.Ee);return fc(a)&&fc(s.Ee)?Bf(c):Yc(s.serializer,c)}(n,e)}function Ly(n,e,t){return n instanceof Zs?zf(n,e):n instanceof ei?Gf(n,e):t}function jf(n,e){return n instanceof ti?function(r){return fc(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Ys extends Ko{}class Zs extends Ko{constructor(e){super(),this.elements=e}}function zf(n,e){const t=Hf(e);for(const r of n.elements)t.some(s=>Gt(s,r))||t.push(r);return{arrayValue:{values:t}}}class ei extends Ko{constructor(e){super(),this.elements=e}}function Gf(n,e){let t=Hf(e);for(const r of n.elements)t=t.filter(s=>!Gt(s,r));return{arrayValue:{values:t}}}class ti extends Ko{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function Ch(n){return xe(n.integerValue||n.doubleValue)}function Hf(n){return Qc(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(e,t){this.field=e,this.transform=t}}function Fy(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Zs&&s instanceof Zs||r instanceof ei&&s instanceof ei?zr(r.elements,s.elements,Gt):r instanceof ti&&s instanceof ti?Gt(r.Ee,s.Ee):r instanceof Ys&&s instanceof Ys}(n.transform,e.transform)}class Uy{constructor(e,t){this.version=e,this.transformResults=t}}class st{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new st}static exists(e){return new st(void 0,e)}static updateTime(e){return new st(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ro(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Qo{}function Kf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Zc(n.key,st.none()):new hi(n.key,n.data,st.none());{const t=n.data,r=ut.empty();let s=new Ue(Ke.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Bn(n.key,r,new _t(s.toArray()),st.none())}}function $y(n,e,t){n instanceof hi?function(s,i,a){const c=s.value.clone(),l=Vh(s.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Bn?function(s,i,a){if(!ro(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Vh(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(Qf(s)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Ls(n,e,t,r){return n instanceof hi?function(i,a,c,l){if(!ro(i.precondition,a))return c;const h=i.value.clone(),f=Nh(i.fieldTransforms,l,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Bn?function(i,a,c,l){if(!ro(i.precondition,a))return c;const h=Nh(i.fieldTransforms,l,a),f=a.data;return f.setAll(Qf(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(i,a,c){return ro(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function By(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=jf(r.transform,s||null);i!=null&&(t===null&&(t=ut.empty()),t.set(r.field,i))}return t||null}function Ph(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&zr(r,s,(i,a)=>Fy(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class hi extends Qo{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Bn extends Qo{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Qf(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Vh(n,e,t){const r=new Map;oe(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,Ly(a,c,t[s]))}return r}function Nh(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,My(i,a,e))}return r}class Zc extends Qo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Jf extends Qo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&$y(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ls(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ls(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=$f();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const l=Kf(a,c);l!==null&&r.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(X.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),re())}isEqual(e){return this.batchId===e.batchId&&zr(this.mutations,e.mutations,(t,r)=>Ph(t,r))&&zr(this.baseMutations,e.baseMutations,(t,r)=>Ph(t,r))}}class el{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){oe(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let s=function(){return Ny}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new el(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zy{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Oe,ie;function Xf(n){switch(n){case C.OK:return W(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return W(15467,{code:n})}}function Yf(n){if(n===void 0)return rn("GRPC error has no .code"),C.UNKNOWN;switch(n){case Oe.OK:return C.OK;case Oe.CANCELLED:return C.CANCELLED;case Oe.UNKNOWN:return C.UNKNOWN;case Oe.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case Oe.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case Oe.INTERNAL:return C.INTERNAL;case Oe.UNAVAILABLE:return C.UNAVAILABLE;case Oe.UNAUTHENTICATED:return C.UNAUTHENTICATED;case Oe.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case Oe.NOT_FOUND:return C.NOT_FOUND;case Oe.ALREADY_EXISTS:return C.ALREADY_EXISTS;case Oe.PERMISSION_DENIED:return C.PERMISSION_DENIED;case Oe.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case Oe.ABORTED:return C.ABORTED;case Oe.OUT_OF_RANGE:return C.OUT_OF_RANGE;case Oe.UNIMPLEMENTED:return C.UNIMPLEMENTED;case Oe.DATA_LOSS:return C.DATA_LOSS;default:return W(39323,{code:n})}}(ie=Oe||(Oe={}))[ie.OK=0]="OK",ie[ie.CANCELLED=1]="CANCELLED",ie[ie.UNKNOWN=2]="UNKNOWN",ie[ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ie[ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ie[ie.NOT_FOUND=5]="NOT_FOUND",ie[ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",ie[ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",ie[ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",ie[ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ie[ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ie[ie.ABORTED=10]="ABORTED",ie[ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",ie[ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",ie[ie.INTERNAL=13]="INTERNAL",ie[ie.UNAVAILABLE=14]="UNAVAILABLE",ie[ie.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gy=new bn([4294967295,4294967295],0);function xh(n){const e=gf().encode(n),t=new cf;return t.update(e),new Uint8Array(t.digest())}function Dh(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new bn([t,r],0),new bn([s,i],0)]}class tl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ps(`Invalid padding: ${t}`);if(r<0)throw new Ps(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ps(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ps(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=bn.fromNumber(this.fe)}pe(e,t,r){let s=e.add(t.multiply(bn.fromNumber(r)));return s.compare(Gy)===1&&(s=new bn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=xh(e),[r,s]=Dh(t);for(let i=0;i<this.hashCount;i++){const a=this.pe(r,s,i);if(!this.ye(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new tl(i,s,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.fe===0)return;const t=xh(e),[r,s]=Dh(t);for(let i=0;i<this.hashCount;i++){const a=this.pe(r,s,i);this.we(a)}}we(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ps extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,di.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Jo(X.min(),s,new Pe(te),sn(),re())}}class di{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new di(r,t,re(),re(),re())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e,t,r,s){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=s}}class Zf{constructor(e,t){this.targetId=e,this.De=t}}class ep{constructor(e,t,r=Qe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Oh{constructor(){this.ve=0,this.Ce=Mh(),this.Fe=Qe.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=re(),t=re(),r=re();return this.Ce.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:W(38017,{changeType:i})}}),new di(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=Mh()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,oe(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class Hy{constructor(e){this.We=e,this.Ge=new Map,this.ze=sn(),this.je=Hi(),this.Je=Hi(),this.He=new Pe(te)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:W(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,s)=>{this.nt(s)&&t(s)})}it(e){const t=e.targetId,r=e.De.count,s=this.st(t);if(s){const i=s.target;if(mc(i))if(r===0){const a=new G(i.path);this.Xe(t,a,ze.newNoDocument(a,X.min()))}else oe(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const c=this._t(e),l=c?this.ut(c,e,a):1;if(l!==0){this.rt(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=On(r).toUint8Array()}catch(l){if(l instanceof wf)return Nn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new tl(a,s,i)}catch(l){return Nn(l instanceof Ps?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.fe===0?null:c}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.We.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.We.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.Xe(t,i,null),s++)}),s}Pt(e){const t=new Map;this.Ge.forEach((i,a)=>{const c=this.st(a);if(c){if(i.current&&mc(c.target)){const l=new G(c.target.path);this.Tt(l).has(a)||this.It(a,l)||this.Xe(a,l,ze.newNoDocument(l,e))}i.Ne&&(t.set(a,i.Le()),i.ke())}});let r=re();this.Je.forEach((i,a)=>{let c=!0;a.forEachWhile(l=>{const h=this.st(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.ze.forEach((i,a)=>a.setReadTime(e));const s=new Jo(e,t,this.He,this.ze,r);return this.ze=sn(),this.je=Hi(),this.Je=Hi(),this.He=new Pe(te),s}Ze(e,t){if(!this.nt(e))return;const r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;const s=this.tt(e);this.It(e,t)?s.qe(t,1):s.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new Oh,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new Ue(te),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new Ue(te),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||$("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Oh),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function Hi(){return new Pe(G.comparator)}function Mh(){return new Pe(G.comparator)}const Wy={asc:"ASCENDING",desc:"DESCENDING"},Ky={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Qy={and:"AND",or:"OR"};class Jy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function yc(n,e){return n.useProto3Json||ui(e)?e:{value:e}}function bo(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function tp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Xy(n,e){return bo(n,e.toTimestamp())}function yt(n){return oe(!!n,49232),X.fromTimestamp(function(t){const r=Dn(t);return new be(r.seconds,r.nanos)}(n))}function nl(n,e){return vc(n,e).canonicalString()}function vc(n,e){const t=function(s){return new me(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function np(n){const e=me.fromString(n);return oe(cp(e),10190,{key:e.toString()}),e}function Ao(n,e){return nl(n.databaseId,e.path)}function Fs(n,e){const t=np(e);if(t.get(1)!==n.databaseId.projectId)throw new M(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new M(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new G(sp(t))}function rp(n,e){return nl(n.databaseId,e)}function Yy(n){const e=np(n);return e.length===4?me.emptyPath():sp(e)}function Ec(n){return new me(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function sp(n){return oe(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Lh(n,e,t){return{name:Ao(n,e),fields:t.value.mapValue.fields}}function Zy(n,e){return"found"in e?function(r,s){oe(!!s.found,43571),s.found.name,s.found.updateTime;const i=Fs(r,s.found.name),a=yt(s.found.updateTime),c=s.found.createTime?yt(s.found.createTime):X.min(),l=new ut({mapValue:{fields:s.found.fields}});return ze.newFoundDocument(i,a,c,l)}(n,e):"missing"in e?function(r,s){oe(!!s.missing,3894),oe(!!s.readTime,22933);const i=Fs(r,s.missing),a=yt(s.readTime);return ze.newNoDocument(i,a)}(n,e):W(7234,{result:e})}function ev(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:W(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(oe(f===void 0||typeof f=="string",58123),Qe.fromBase64String(f||"")):(oe(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Qe.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(h){const f=h.code===void 0?C.UNKNOWN:Yf(h.code);return new M(f,h.message||"")}(a);t=new ep(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Fs(n,r.document.name),i=yt(r.document.updateTime),a=r.document.createTime?yt(r.document.createTime):X.min(),c=new ut({mapValue:{fields:r.document.fields}}),l=ze.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new so(h,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Fs(n,r.document),i=r.readTime?yt(r.readTime):X.min(),a=ze.newNoDocument(s,i),c=r.removedTargetIds||[];t=new so([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Fs(n,r.document),i=r.removedTargetIds||[];t=new so([],i,s,null)}else{if(!("filter"in e))return W(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new zy(s,i),c=r.targetId;t=new Zf(c,a)}}return t}function ip(n,e){let t;if(e instanceof hi)t={update:Lh(n,e.key,e.value)};else if(e instanceof Zc)t={delete:Ao(n,e.key)};else if(e instanceof Bn)t={update:Lh(n,e.key,e.data),updateMask:lv(e.fieldMask)};else{if(!(e instanceof Jf))return W(16599,{Rt:e.type});t={verify:Ao(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof Ys)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Zs)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof ei)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ti)return{fieldPath:a.field.canonicalString(),increment:c.Ee};throw W(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:Xy(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:W(27497)}(n,e.precondition)),t}function tv(n,e){return n&&n.length>0?(oe(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?yt(s.updateTime):yt(i);return a.isEqual(X.min())&&(a=yt(i)),new Uy(a,s.transformResults||[])}(t,e))):[]}function nv(n,e){return{documents:[rp(n,e.path)]}}function rv(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=rp(n,s);const i=function(h){if(h.length!==0)return ap(Pt.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(f=>function(g){return{field:kr(g.field),direction:ov(g.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=yc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:t,parent:s}}function sv(n){let e=Yy(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){oe(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const g=op(p);return g instanceof Pt&&Vf(g)?g.getFilters():[g]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(g=>function(k){return new Xs(Cr(k.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(p){let g;return g=typeof p=="object"?p.value:p,ui(g)?null:g}(t.limit));let l=null;t.startAt&&(l=function(p){const g=!!p.before,A=p.values||[];return new Io(A,g)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const g=!p.before,A=p.values||[];return new Io(A,g)}(t.endAt)),Ry(e,s,a,i,c,"F",l,h)}function iv(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function op(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Cr(t.unaryFilter.field);return Me.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Cr(t.unaryFilter.field);return Me.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Cr(t.unaryFilter.field);return Me.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Cr(t.unaryFilter.field);return Me.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return W(61313);default:return W(60726)}}(n):n.fieldFilter!==void 0?function(t){return Me.create(Cr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return W(58110);default:return W(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Pt.create(t.compositeFilter.filters.map(r=>op(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return W(1026)}}(t.compositeFilter.op))}(n):W(30097,{filter:n})}function ov(n){return Wy[n]}function av(n){return Ky[n]}function cv(n){return Qy[n]}function kr(n){return{fieldPath:n.canonicalString()}}function Cr(n){return Ke.fromServerFormat(n.fieldPath)}function ap(n){return n instanceof Me?function(t){if(t.op==="=="){if(bh(t.value))return{unaryFilter:{field:kr(t.field),op:"IS_NAN"}};if(Ih(t.value))return{unaryFilter:{field:kr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(bh(t.value))return{unaryFilter:{field:kr(t.field),op:"IS_NOT_NAN"}};if(Ih(t.value))return{unaryFilter:{field:kr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:kr(t.field),op:av(t.op),value:t.value}}}(n):n instanceof Pt?function(t){const r=t.getFilters().map(s=>ap(s));return r.length===1?r[0]:{compositeFilter:{op:cv(t.op),filters:r}}}(n):W(54877,{filter:n})}function lv(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function cp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,t,r,s,i=X.min(),a=X.min(),c=Qe.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new vn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new vn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new vn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new vn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uv{constructor(e){this.gt=e}}function hv(n){const e=sv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?_c(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(){this.Dn=new fv}addToCollectionParentIndex(e,t){return this.Dn.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(xn.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(xn.min())}updateCollectionGroup(e,t,r){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class fv{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ue(me.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ue(me.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},lp=41943040;class ft{static withCacheSize(e){return new ft(e,ft.DEFAULT_COLLECTION_PERCENTILE,ft.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ft.DEFAULT_COLLECTION_PERCENTILE=10,ft.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ft.DEFAULT=new ft(lp,ft.DEFAULT_COLLECTION_PERCENTILE,ft.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ft.DISABLED=new ft(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Wr(0)}static ur(){return new Wr(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh="LruGarbageCollector",pv=1048576;function $h([n,e],[t,r]){const s=te(n,t);return s===0?te(e,r):s}class mv{constructor(e){this.Tr=e,this.buffer=new Ue($h),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();$h(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class gv{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){$(Uh,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ss(t)?$(Uh,"Ignoring IndexedDB error during garbage collection: ",t):await rs(t)}await this.Rr(3e5)})}}class _v{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return P.resolve(jo.ue);const r=new mv(t);return this.Vr.forEachTarget(e,s=>r.Er(s.sequenceNumber)).next(()=>this.Vr.gr(e,s=>r.Er(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Fh)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Fh):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,s,i,a,c,l,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,t))).next(p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(h=Date.now(),Sr()<=ne.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(h-l)+`ms
Total Duration: ${h-f}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function yv(n,e){return new _v(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{constructor(){this.changes=new pr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ze.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?P.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ev{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Ls(r.mutation,s,_t.empty(),be.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,re()).next(()=>r))}getLocalViewOfDocuments(e,t,r=re()){const s=nr();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=Cs();return i.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=nr();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,re()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,s){let i=sn();const a=Ms(),c=function(){return Ms()}();return t.forEach((l,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Bn)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Ls(f.mutation,h,f.mutation.getFieldMask(),be.now())):a.set(h.key,_t.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var p;return c.set(h,new Ev(f,(p=a.get(h))!==null&&p!==void 0?p:null))}),c))}recalculateAndSaveOverlays(e,t){const r=Ms();let s=new Pe((a,c)=>a-c),i=re();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(l=>{const h=t.get(l);if(h===null)return;let f=r.get(l)||_t.empty();f=c.applyToLocalView(h,f),r.set(l,f);const p=(s.get(c.batchId)||re()).add(l);s=s.insert(c.batchId,p)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,f=l.value,p=$f();f.forEach(g=>{if(!i.has(g)){const A=Kf(t.get(g),r.get(g));A!==null&&p.set(g,A),i=i.add(g)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return P.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return G.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Of(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):P.resolve(nr());let c=Ws,l=i;return a.next(h=>P.forEach(h,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?P.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{l=l.insert(f,g)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,l,h,re())).next(f=>({batchId:c,changes:Uf(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new G(t)).next(r=>{let s=Cs();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Cs();return this.indexManager.getCollectionParents(e,i).next(c=>P.forEach(c,l=>{const h=function(p,g){return new is(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(f=>{f.forEach((p,g)=>{a=a.insert(p,g)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((l,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,ze.newInvalidDocument(f)))});let c=Cs();return a.forEach((l,h)=>{const f=i.get(l);f!==void 0&&Ls(f.mutation,h,_t.empty(),be.now()),Wo(t,h)&&(c=c.insert(l,h))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tv{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return P.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(s){return{id:s.id,version:s.version,createTime:yt(s.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(s){return{name:s.name,query:hv(s.bundledQuery),readTime:yt(s.readTime)}}(t)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iv{constructor(){this.overlays=new Pe(G.comparator),this.kr=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const r=nr();return P.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.wt(e,t,i)}),P.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.kr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.kr.delete(r)),P.resolve()}getOverlaysForCollection(e,t,r){const s=nr(),i=t.length+1,a=new G(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return P.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Pe((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=nr(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=nr(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=s)););return P.resolve(c)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.kr.get(s.largestBatchId).delete(r.key);this.kr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new jy(t,r));let i=this.kr.get(t);i===void 0&&(i=re(),this.kr.set(t,i)),this.kr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bv{constructor(){this.sessionToken=Qe.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(){this.qr=new Ue(je.Qr),this.$r=new Ue(je.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new je(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new je(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){const t=new G(new me([])),r=new je(t,e),s=new je(t,e+1),i=[];return this.$r.forEachInRange([r,s],a=>{this.Wr(a),i.push(a.key)}),i}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new G(new me([])),r=new je(t,e),s=new je(t,e+1);let i=re();return this.$r.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new je(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class je{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return G.comparator(e.key,t.key)||te(e.Hr,t.Hr)}static Ur(e,t){return te(e.Hr,t.Hr)||G.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new Ue(je.Qr)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new qy(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Yr=this.Yr.add(new je(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return P.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Wc:this.er-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new je(t,0),s=new je(t,Number.POSITIVE_INFINITY),i=[];return this.Yr.forEachInRange([r,s],a=>{const c=this.Zr(a.Hr);i.push(c)}),P.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ue(te);return t.forEach(s=>{const i=new je(s,0),a=new je(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([i,a],c=>{r=r.add(c.Hr)})}),P.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;G.isDocumentKey(i)||(i=i.child(""));const a=new je(new G(i),0);let c=new Ue(te);return this.Yr.forEachWhile(l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Hr)),!0)},a),P.resolve(this.ei(c))}ei(e){const t=[];return e.forEach(r=>{const s=this.Zr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){oe(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return P.forEach(t.mutations,s=>{const i=new je(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){const r=new je(t,0),s=this.Yr.firstAfterOrEqual(r);return P.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sv{constructor(e){this.ni=e,this.docs=function(){return new Pe(G.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return P.resolve(r?r.document.mutableCopy():ze.newInvalidDocument(t))}getEntries(e,t){let r=sn();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ze.newInvalidDocument(s))}),P.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=sn();const a=t.path,c=new G(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:f}}=l.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||iy(sy(f),r)<=0||(s.has(f.key)||Wo(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return P.resolve(i)}getAllFromCollectionGroup(e,t,r,s){W(9500)}ri(e,t){return P.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Rv(this)}getSize(e){return P.resolve(this.size)}}class Rv extends vv{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Or.addEntry(e,s)):this.Or.removeEntry(r)}),P.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kv{constructor(e){this.persistence=e,this.ii=new pr(t=>Jc(t),Xc),this.lastRemoteSnapshotVersion=X.min(),this.highestTargetId=0,this.si=0,this.oi=new rl,this.targetCount=0,this._i=Wr.ar()}forEachTarget(e,t){return this.ii.forEach((r,s)=>t(s)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),P.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new Wr(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.hr(t),P.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ii.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ii.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),P.waitFor(i).next(()=>s)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return P.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),P.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),P.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return P.resolve(r)}containsKey(e,t){return P.resolve(this.oi.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e,t){this.ai={},this.overlays={},this.ui=new jo(0),this.ci=!1,this.ci=!0,this.li=new bv,this.referenceDelegate=e(this),this.hi=new kv(this),this.indexManager=new dv,this.remoteDocumentCache=function(s){return new Sv(s)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new uv(t),this.Ti=new Tv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Iv,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new Av(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){$("MemoryPersistence","Starting transaction:",e);const s=new Cv(this.ui.next());return this.referenceDelegate.Ii(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ei(e,t){return P.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}}class Cv extends ay{constructor(e){super(),this.currentSequenceNumber=e}}class sl{constructor(e){this.persistence=e,this.Ai=new rl,this.Ri=null}static Vi(e){return new sl(e)}get mi(){if(this.Ri)return this.Ri;throw W(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),P.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),P.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(s=>this.mi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.mi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.mi,r=>{const s=G.fromPath(r);return this.fi(e,s).next(i=>{i||t.removeEntry(s,X.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return P.or([()=>P.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class So{constructor(e,t){this.persistence=e,this.gi=new pr(r=>uy(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=yv(this,t)}static Vi(e,t){return new So(e,t)}Ii(){}di(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return P.forEach(this.gi,(r,s)=>this.Sr(e,r,s).next(i=>i?P.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ri(e,a=>this.Sr(e,a,t).next(c=>{c||(r++,i.removeEntry(a,X.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),P.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),P.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=to(e.data.value)),t}Sr(e,t,r){return P.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.gi.get(t);return P.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=s}static Es(e,t){let r=re(),s=re();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new il(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vv{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return C_()?8:cy(it())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ps(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ys(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Pv;return this.ws(e,t,a).next(c=>{if(i.result=c,this.Rs)return this.Ss(e,t,a,c.size)})}).next(()=>i.result)}Ss(e,t,r,s){return r.documentReadCount<this.Vs?(Sr()<=ne.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",Rr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),P.resolve()):(Sr()<=ne.DEBUG&&$("QueryEngine","Query:",Rr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.fs*s?(Sr()<=ne.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",Rr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ut(t))):P.resolve())}ps(e,t){if(kh(t))return P.resolve(null);let r=Ut(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=_c(t,null,"F"),r=Ut(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=re(...i);return this.gs.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const h=this.bs(t,c);return this.Ds(t,h,a,l.readTime)?this.ps(e,_c(t,null,"F")):this.vs(e,h,t,l)}))})))}ys(e,t,r,s){return kh(t)||s.isEqual(X.min())?P.resolve(null):this.gs.getDocuments(e,r).next(i=>{const a=this.bs(t,i);return this.Ds(t,a,r,s)?P.resolve(null):(Sr()<=ne.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Rr(t)),this.vs(e,a,t,ry(s,Ws)).next(c=>c))})}bs(e,t){let r=new Ue(Lf(e));return t.forEach((s,i)=>{Wo(e,i)&&(r=r.add(i))}),r}Ds(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ws(e,t,r){return Sr()<=ne.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",Rr(t)),this.gs.getDocumentsMatchingQuery(e,t,xn.min(),r)}vs(e,t,r,s){return this.gs.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol="LocalStore",Nv=3e8;class xv{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.Fs=new Pe(te),this.Ms=new pr(i=>Jc(i),Xc),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new wv(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function Dv(n,e,t,r){return new xv(n,e,t,r)}async function hp(n,e){const t=Z(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let l=re();for(const h of s){a.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return t.localDocuments.getDocuments(r,l).next(h=>({Bs:h,removedBatchIds:a,addedBatchIds:c}))})})}function Ov(n,e){const t=Z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Os.newChangeBuffer({trackRemovals:!0});return function(c,l,h,f){const p=h.batch,g=p.keys();let A=P.resolve();return g.forEach(k=>{A=A.next(()=>f.getEntry(l,k)).next(V=>{const N=h.docVersions.get(k);oe(N!==null,48541),V.version.compareTo(N)<0&&(p.applyToRemoteDocument(V,h),V.isValidDocument()&&(V.setReadTime(h.commitVersion),f.addEntry(V)))})}),A.next(()=>c.mutationQueue.removeMutationBatch(l,p))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=re();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function dp(n){const e=Z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function Mv(n,e){const t=Z(n),r=e.snapshotVersion;let s=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Os.newChangeBuffer({trackRemovals:!0});s=t.Fs;const c=[];e.targetChanges.forEach((f,p)=>{const g=s.get(p);if(!g)return;c.push(t.hi.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.hi.addMatchingKeys(i,f.addedDocuments,p)));let A=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?A=A.withResumeToken(Qe.EMPTY_BYTE_STRING,X.min()).withLastLimboFreeSnapshotVersion(X.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,r)),s=s.insert(p,A),function(V,N,K){return V.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=Nv?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0}(g,A,f)&&c.push(t.hi.updateTargetData(i,A))});let l=sn(),h=re();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(Lv(i,a,e.documentUpdates).next(f=>{l=f.Ls,h=f.ks})),!r.isEqual(X.min())){const f=t.hi.getLastRemoteSnapshotVersion(i).next(p=>t.hi.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return P.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,l,h)).next(()=>l)}).then(i=>(t.Fs=s,i))}function Lv(n,e,t){let r=re(),s=re();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=sn();return t.forEach((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(X.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):$(ol,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{Ls:a,ks:s}})}function Fv(n,e){const t=Z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Wc),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Uv(n,e){const t=Z(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.hi.getTargetData(r,e).next(i=>i?(s=i,P.resolve(s)):t.hi.allocateTargetId(r).next(a=>(s=new vn(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Fs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function wc(n,e,t){const r=Z(n),s=r.Fs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!ss(a))throw a;$(ol,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(s.target)}function Bh(n,e,t){const r=Z(n);let s=X.min(),i=re();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,h,f){const p=Z(l),g=p.Ms.get(f);return g!==void 0?P.resolve(p.Fs.get(g)):p.hi.getTargetData(h,f)}(r,a,Ut(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,c.targetId).next(l=>{i=l})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?s:X.min(),t?i:re())).next(c=>($v(r,Cy(e),c),{documents:c,qs:i})))}function $v(n,e,t){let r=n.xs.get(e)||X.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.xs.set(e,r)}class qh{constructor(){this.activeTargetIds=Oy()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Bv{constructor(){this.Fo=new qh,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new qh,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qv{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jh="ConnectivityMonitor";class zh{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){$(jh,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){$(jh,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wi=null;function Tc(){return Wi===null?Wi=function(){return 268435456+Math.round(2147483648*Math.random())}():Wi++,"0x"+Wi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa="RestConnection",jv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class zv{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.Ko=this.databaseId.database===wo?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const a=Tc(),c=this.Go(e,t.toUriEncodedString());$(qa,`Sending RPC '${e}' ${a}:`,c,r);const l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(l,s,i);const{host:h}=new URL(c),f=es(h);return this.jo(e,c,l,r,f).then(p=>($(qa,`Received RPC '${e}' ${a}: `,p),p),p=>{throw Nn(qa,`RPC '${e}' ${a} failed with error: `,p,"url: ",c,"request:",r),p})}Jo(e,t,r,s,i,a){return this.Wo(e,t,r,s,i)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ns}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Go(e,t){const r=jv[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gv{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et="WebChannelConnection";class Hv extends zv{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,s,i){const a=Tc();return new Promise((c,l)=>{const h=new lf;h.setWithCredentials(!0),h.listenOnce(uf.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case eo.NO_ERROR:const p=h.getResponseJson();$(et,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),c(p);break;case eo.TIMEOUT:$(et,`RPC '${e}' ${a} timed out`),l(new M(C.DEADLINE_EXCEEDED,"Request time out"));break;case eo.HTTP_ERROR:const g=h.getStatus();if($(et,`RPC '${e}' ${a} failed with status:`,g,"response text:",h.getResponseText()),g>0){let A=h.getResponseJson();Array.isArray(A)&&(A=A[0]);const k=A==null?void 0:A.error;if(k&&k.status&&k.message){const V=function(K){const z=K.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(z)>=0?z:C.UNKNOWN}(k.status);l(new M(V,k.message))}else l(new M(C.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new M(C.UNAVAILABLE,"Connection failed."));break;default:W(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{$(et,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(s);$(et,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)})}P_(e,t,r){const s=Tc(),i=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=ff(),c=df(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.zo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const f=i.join("");$(et,`Creating RPC '${e}' stream ${s}: ${f}`,l);const p=a.createWebChannel(f,l);this.T_(p);let g=!1,A=!1;const k=new Gv({Ho:N=>{A?$(et,`Not sending because RPC '${e}' stream ${s} is closed:`,N):(g||($(et,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),$(et,`RPC '${e}' stream ${s} sending:`,N),p.send(N))},Yo:()=>p.close()}),V=(N,K,z)=>{N.listen(K,B=>{try{z(B)}catch(j){setTimeout(()=>{throw j},0)}})};return V(p,ks.EventType.OPEN,()=>{A||($(et,`RPC '${e}' stream ${s} transport opened.`),k.s_())}),V(p,ks.EventType.CLOSE,()=>{A||(A=!0,$(et,`RPC '${e}' stream ${s} transport closed`),k.__(),this.I_(p))}),V(p,ks.EventType.ERROR,N=>{A||(A=!0,Nn(et,`RPC '${e}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),k.__(new M(C.UNAVAILABLE,"The operation could not be completed")))}),V(p,ks.EventType.MESSAGE,N=>{var K;if(!A){const z=N.data[0];oe(!!z,16349);const B=z,j=(B==null?void 0:B.error)||((K=B[0])===null||K===void 0?void 0:K.error);if(j){$(et,`RPC '${e}' stream ${s} received error:`,j);const le=j.status;let q=function(y){const w=Oe[y];if(w!==void 0)return Yf(w)}(le),E=j.message;q===void 0&&(q=C.INTERNAL,E="Unknown error status: "+le+" with message "+j.message),A=!0,k.__(new M(q,E)),p.close()}else $(et,`RPC '${e}' stream ${s} received:`,z),k.a_(z)}}),V(c,hf.STAT_EVENT,N=>{N.stat===uc.PROXY?$(et,`RPC '${e}' stream ${s} detected buffering proxy`):N.stat===uc.NOPROXY&&$(et,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.o_()},0),k}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}function ja(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xo(n){return new Jy(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=s,this.A_=i,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&$("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh="PersistentStream";class fp{constructor(e,t,r,s,i,a,c,l){this.Fi=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new al(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(rn(t.toString()),rn("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.b_===t&&this.W_(r,s)},r=>{e(()=>{const s=new M(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)})})}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(s=>{r(()=>this.G_(s))}),this.stream.onMessage(s=>{r(()=>++this.C_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return $(Gh,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():($(Gh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Wv extends fp{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=ev(this.serializer,e),r=function(i){if(!("targetChange"in i))return X.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?X.min():a.readTime?yt(a.readTime):X.min()}(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=Ec(this.serializer),t.addTarget=function(i,a){let c;const l=a.target;if(c=mc(l)?{documents:nv(i,l)}:{query:rv(i,l).Vt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=tp(i,a.resumeToken);const h=yc(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(X.min())>0){c.readTime=bo(i,a.snapshotVersion.toTimestamp());const h=yc(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const r=iv(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){const t={};t.database=Ec(this.serializer),t.removeTarget=e,this.k_(t)}}class Kv extends fp{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return oe(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,oe(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){oe(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=tv(e.writeResults,e.commitTime),r=yt(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=Ec(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ip(this.serializer,r))};this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qv{}class Jv extends Qv{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new M(C.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Wo(e,vc(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new M(C.UNKNOWN,i.toString())})}Jo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Jo(e,vc(t,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new M(C.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class Xv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(rn(t),this._a=!1):$("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr="RemoteStore";class Yv{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=i,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{mr(this)&&($(dr,"Restarting streams for network reachability change."),await async function(l){const h=Z(l);h.Ia.add(4),await fi(h),h.Aa.set("Unknown"),h.Ia.delete(4),await Yo(h)}(this))})}),this.Aa=new Xv(r,s)}}async function Yo(n){if(mr(n))for(const e of n.da)await e(!0)}async function fi(n){for(const e of n.da)await e(!1)}function pp(n,e){const t=Z(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),hl(t)?ul(t):os(t).x_()&&ll(t,e))}function cl(n,e){const t=Z(n),r=os(t);t.Ta.delete(e),r.x_()&&mp(t,e),t.Ta.size===0&&(r.x_()?r.B_():mr(t)&&t.Aa.set("Unknown"))}function ll(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(X.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}os(n).H_(e)}function mp(n,e){n.Ra.$e(e),os(n).Y_(e)}function ul(n){n.Ra=new Hy({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),os(n).start(),n.Aa.aa()}function hl(n){return mr(n)&&!os(n).M_()&&n.Ta.size>0}function mr(n){return Z(n).Ia.size===0}function gp(n){n.Ra=void 0}async function Zv(n){n.Aa.set("Online")}async function eE(n){n.Ta.forEach((e,t)=>{ll(n,e)})}async function tE(n,e){gp(n),hl(n)?(n.Aa.la(e),ul(n)):n.Aa.set("Unknown")}async function nE(n,e,t){if(n.Aa.set("Online"),e instanceof ep&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds)s.Ta.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Ta.delete(c),s.Ra.removeTarget(c))}(n,e)}catch(r){$(dr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ro(n,r)}else if(e instanceof so?n.Ra.Ye(e):e instanceof Zf?n.Ra.it(e):n.Ra.et(e),!t.isEqual(X.min()))try{const r=await dp(n.localStore);t.compareTo(r)>=0&&await function(i,a){const c=i.Ra.Pt(a);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.Ta.get(h);f&&i.Ta.set(h,f.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,h)=>{const f=i.Ta.get(l);if(!f)return;i.Ta.set(l,f.withResumeToken(Qe.EMPTY_BYTE_STRING,f.snapshotVersion)),mp(i,l);const p=new vn(f.target,l,h,f.sequenceNumber);ll(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){$(dr,"Failed to raise snapshot:",r),await Ro(n,r)}}async function Ro(n,e,t){if(!ss(e))throw e;n.Ia.add(1),await fi(n),n.Aa.set("Offline"),t||(t=()=>dp(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{$(dr,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Yo(n)})}function _p(n,e){return e().catch(t=>Ro(n,t,e))}async function Zo(n){const e=Z(n),t=Ln(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Wc;for(;rE(e);)try{const s=await Fv(e.localStore,r);if(s===null){e.Pa.length===0&&t.B_();break}r=s.batchId,sE(e,s)}catch(s){await Ro(e,s)}yp(e)&&vp(e)}function rE(n){return mr(n)&&n.Pa.length<10}function sE(n,e){n.Pa.push(e);const t=Ln(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function yp(n){return mr(n)&&!Ln(n).M_()&&n.Pa.length>0}function vp(n){Ln(n).start()}async function iE(n){Ln(n).na()}async function oE(n){const e=Ln(n);for(const t of n.Pa)e.X_(t.mutations)}async function aE(n,e,t){const r=n.Pa.shift(),s=el.from(r,e,t);await _p(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Zo(n)}async function cE(n,e){e&&Ln(n).Z_&&await async function(r,s){if(function(a){return Xf(a)&&a!==C.ABORTED}(s.code)){const i=r.Pa.shift();Ln(r).N_(),await _p(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Zo(r)}}(n,e),yp(n)&&vp(n)}async function Hh(n,e){const t=Z(n);t.asyncQueue.verifyOperationInProgress(),$(dr,"RemoteStore received new credentials");const r=mr(t);t.Ia.add(3),await fi(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Yo(t)}async function lE(n,e){const t=Z(n);e?(t.Ia.delete(2),await Yo(t)):e||(t.Ia.add(2),await fi(t),t.Aa.set("Unknown"))}function os(n){return n.Va||(n.Va=function(t,r,s){const i=Z(t);return i.ia(),new Wv(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:Zv.bind(null,n),e_:eE.bind(null,n),n_:tE.bind(null,n),J_:nE.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),hl(n)?ul(n):n.Aa.set("Unknown")):(await n.Va.stop(),gp(n))})),n.Va}function Ln(n){return n.ma||(n.ma=function(t,r,s){const i=Z(t);return i.ia(),new Kv(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:iE.bind(null,n),n_:cE.bind(null,n),ea:oE.bind(null,n),ta:aE.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await Zo(n)):(await n.ma.stop(),n.Pa.length>0&&($(dr,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dl{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Zt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new dl(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function fl(n,e){if(rn("AsyncQueue",`${e}: ${n}`),ss(n))return new M(C.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{static emptySet(e){return new Or(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||G.comparator(t.key,r.key):(t,r)=>G.comparator(t.key,r.key),this.keyedMap=Cs(),this.sortedSet=new Pe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Or)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Or;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{constructor(){this.fa=new Pe(G.comparator)}track(e){const t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):W(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}}class Kr{constructor(e,t,r,s,i,a,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new Kr(e,t,Or.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ho(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uE{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class hE{constructor(){this.queries=Kh(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const s=Z(t),i=s.queries;s.queries=Kh(),i.forEach((a,c)=>{for(const l of c.wa)l.onError(r)})})(this,new M(C.ABORTED,"Firestore shutting down"))}}function Kh(){return new pr(n=>Mf(n),Ho)}async function Ep(n,e){const t=Z(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.Sa()&&e.ba()&&(r=2):(i=new uE,r=e.ba()?0:1);try{switch(r){case 0:i.ya=await t.onListen(s,!0);break;case 1:i.ya=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=fl(a,`Initialization of query '${Rr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.wa.push(e),e.va(t.onlineState),i.ya&&e.Ca(i.ya)&&pl(t)}async function wp(n,e){const t=Z(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.wa.indexOf(e);a>=0&&(i.wa.splice(a,1),i.wa.length===0?s=e.ba()?0:1:!i.Sa()&&e.ba()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function dE(n,e){const t=Z(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.wa)c.Ca(s)&&(r=!0);a.ya=s}}r&&pl(t)}function fE(n,e,t){const r=Z(n),s=r.queries.get(e);if(s)for(const i of s.wa)i.onError(t);r.queries.delete(e)}function pl(n){n.Da.forEach(e=>{e.next()})}var Ic,Qh;(Qh=Ic||(Ic={})).Fa="default",Qh.Cache="cache";class Tp{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Kr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Kr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Ic.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{constructor(e){this.key=e}}class bp{constructor(e){this.key=e}}class pE{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=re(),this.mutatedKeys=re(),this.Xa=Lf(e),this.eu=new Or(this.Xa)}get tu(){return this.Ha}nu(e,t){const r=t?t.ru:new Wh,s=t?t.eu:this.eu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const g=s.get(f),A=Wo(this.query,p)?p:null,k=!!g&&this.mutatedKeys.has(g.key),V=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let N=!1;g&&A?g.data.isEqual(A.data)?k!==V&&(r.track({type:3,doc:A}),N=!0):this.iu(g,A)||(r.track({type:2,doc:A}),N=!0,(l&&this.Xa(A,l)>0||h&&this.Xa(A,h)<0)&&(c=!0)):!g&&A?(r.track({type:0,doc:A}),N=!0):g&&!A&&(r.track({type:1,doc:g}),N=!0,(l||h)&&(c=!0)),N&&(A?(a=a.add(A),i=V?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{eu:a,ru:r,Ds:c,mutatedKeys:i}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const a=e.ru.pa();a.sort((f,p)=>function(A,k){const V=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W(20277,{At:N})}};return V(A)-V(k)}(f.type,p.type)||this.Xa(f.doc,p.doc)),this.su(r),s=s!=null&&s;const c=t&&!s?this.ou():[],l=this.Za.size===0&&this.current&&!s?1:0,h=l!==this.Ya;return this.Ya=l,a.length!==0||h?{snapshot:new Kr(this.query,e.eu,i,a,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:c}:{_u:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Wh,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=re(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new bp(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new Ip(r))}),t}uu(e){this.Ha=e.qs,this.Za=re();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Kr.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const ml="SyncEngine";class mE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class gE{constructor(e){this.key=e,this.lu=!1}}class _E{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new pr(c=>Mf(c),Ho),this.Tu=new Map,this.Iu=new Set,this.du=new Pe(G.comparator),this.Eu=new Map,this.Au=new rl,this.Ru={},this.Vu=new Map,this.mu=Wr.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function yE(n,e,t=!0){const r=Pp(n);let s;const i=r.Pu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cu()):s=await Ap(r,e,t,!0),s}async function vE(n,e){const t=Pp(n);await Ap(t,e,!0,!1)}async function Ap(n,e,t,r){const s=await Uv(n.localStore,Ut(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await EE(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&pp(n.remoteStore,s),c}async function EE(n,e,t,r,s){n.gu=(p,g,A)=>async function(V,N,K,z){let B=N.view.nu(K);B.Ds&&(B=await Bh(V.localStore,N.query,!1).then(({documents:E})=>N.view.nu(E,B)));const j=z&&z.targetChanges.get(N.targetId),le=z&&z.targetMismatches.get(N.targetId)!=null,q=N.view.applyChanges(B,V.isPrimaryClient,j,le);return Xh(V,N.targetId,q._u),q.snapshot}(n,p,g,A);const i=await Bh(n.localStore,e,!0),a=new pE(e,i.qs),c=a.nu(i.documents),l=di.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,l);Xh(n,t,h._u);const f=new mE(e,t,a);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),h.snapshot}async function wE(n,e,t){const r=Z(n),s=r.Pu.get(e),i=r.Tu.get(s.targetId);if(i.length>1)return r.Tu.set(s.targetId,i.filter(a=>!Ho(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await wc(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&cl(r.remoteStore,s.targetId),bc(r,s.targetId)}).catch(rs)):(bc(r,s.targetId),await wc(r.localStore,s.targetId,!0))}async function TE(n,e){const t=Z(n),r=t.Pu.get(e),s=t.Tu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),cl(t.remoteStore,r.targetId))}async function IE(n,e,t){const r=PE(n);try{const s=await function(a,c){const l=Z(a),h=be.now(),f=c.reduce((A,k)=>A.add(k.key),re());let p,g;return l.persistence.runTransaction("Locally write mutations","readwrite",A=>{let k=sn(),V=re();return l.Os.getEntries(A,f).next(N=>{k=N,k.forEach((K,z)=>{z.isValidDocument()||(V=V.add(K))})}).next(()=>l.localDocuments.getOverlayedDocuments(A,k)).next(N=>{p=N;const K=[];for(const z of c){const B=By(z,p.get(z.key).overlayedDocument);B!=null&&K.push(new Bn(z.key,B,kf(B.value.mapValue),st.exists(!0)))}return l.mutationQueue.addMutationBatch(A,h,K,c)}).next(N=>{g=N;const K=N.applyToLocalDocumentSet(p,V);return l.documentOverlayCache.saveOverlays(A,N.batchId,K)})}).then(()=>({batchId:g.batchId,changes:Uf(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,l){let h=a.Ru[a.currentUser.toKey()];h||(h=new Pe(te)),h=h.insert(c,l),a.Ru[a.currentUser.toKey()]=h}(r,s.batchId,t),await pi(r,s.changes),await Zo(r.remoteStore)}catch(s){const i=fl(s,"Failed to persist write");t.reject(i)}}async function Sp(n,e){const t=Z(n);try{const r=await Mv(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Eu.get(i);a&&(oe(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.lu=!0:s.modifiedDocuments.size>0?oe(a.lu,14607):s.removedDocuments.size>0&&(oe(a.lu,42227),a.lu=!1))}),await pi(t,r,e)}catch(r){await rs(r)}}function Jh(n,e,t){const r=Z(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Pu.forEach((i,a)=>{const c=a.view.va(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const l=Z(a);l.onlineState=c;let h=!1;l.queries.forEach((f,p)=>{for(const g of p.wa)g.va(c)&&(h=!0)}),h&&pl(l)}(r.eventManager,e),s.length&&r.hu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function bE(n,e,t){const r=Z(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Eu.get(e),i=s&&s.key;if(i){let a=new Pe(G.comparator);a=a.insert(i,ze.newNoDocument(i,X.min()));const c=re().add(i),l=new Jo(X.min(),new Map,new Pe(te),a,c);await Sp(r,l),r.du=r.du.remove(i),r.Eu.delete(e),gl(r)}else await wc(r.localStore,e,!1).then(()=>bc(r,e,t)).catch(rs)}async function AE(n,e){const t=Z(n),r=e.batch.batchId;try{const s=await Ov(t.localStore,e);kp(t,r,null),Rp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await pi(t,s)}catch(s){await rs(s)}}async function SE(n,e,t){const r=Z(n);try{const s=await function(a,c){const l=Z(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return l.mutationQueue.lookupMutationBatch(h,c).next(p=>(oe(p!==null,37113),f=p.keys(),l.mutationQueue.removeMutationBatch(h,p))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>l.localDocuments.getDocuments(h,f))})}(r.localStore,e);kp(r,e,t),Rp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await pi(r,s)}catch(s){await rs(s)}}function Rp(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function kp(n,e,t){const r=Z(n);let s=r.Ru[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Ru[r.currentUser.toKey()]=s}}function bc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||Cp(n,r)})}function Cp(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(cl(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),gl(n))}function Xh(n,e,t){for(const r of t)r instanceof Ip?(n.Au.addReference(r.key,e),RE(n,r)):r instanceof bp?($(ml,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||Cp(n,r.key)):W(19791,{yu:r})}function RE(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||($(ml,"New document in limbo: "+t),n.Iu.add(r),gl(n))}function gl(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new G(me.fromString(e)),r=n.mu.next();n.Eu.set(r,new gE(t)),n.du=n.du.insert(t,r),pp(n.remoteStore,new vn(Ut(Go(t.path)),r,"TargetPurposeLimboResolution",jo.ue))}}async function pi(n,e,t){const r=Z(n),s=[],i=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((c,l)=>{a.push(r.gu(l,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(l.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(h){s.push(h);const p=il.Es(l.targetId,h);i.push(p)}}))}),await Promise.all(a),r.hu.J_(s),await async function(l,h){const f=Z(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>P.forEach(h,g=>P.forEach(g.Is,A=>f.persistence.referenceDelegate.addReference(p,g.targetId,A)).next(()=>P.forEach(g.ds,A=>f.persistence.referenceDelegate.removeReference(p,g.targetId,A)))))}catch(p){if(!ss(p))throw p;$(ol,"Failed to update sequence numbers: "+p)}for(const p of h){const g=p.targetId;if(!p.fromCache){const A=f.Fs.get(g),k=A.snapshotVersion,V=A.withLastLimboFreeSnapshotVersion(k);f.Fs=f.Fs.insert(g,V)}}}(r.localStore,i))}async function kE(n,e){const t=Z(n);if(!t.currentUser.isEqual(e)){$(ml,"User change. New user:",e.toKey());const r=await hp(t.localStore,e);t.currentUser=e,function(i,a){i.Vu.forEach(c=>{c.forEach(l=>{l.reject(new M(C.CANCELLED,a))})}),i.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await pi(t,r.Bs)}}function CE(n,e){const t=Z(n),r=t.Eu.get(e);if(r&&r.lu)return re().add(r.key);{let s=re();const i=t.Tu.get(e);if(!i)return s;for(const a of i){const c=t.Pu.get(a);s=s.unionWith(c.view.tu)}return s}}function Pp(n){const e=Z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Sp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=CE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=bE.bind(null,e),e.hu.J_=dE.bind(null,e.eventManager),e.hu.pu=fE.bind(null,e.eventManager),e}function PE(n){const e=Z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=AE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=SE.bind(null,e),e}class ko{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Xo(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return Dv(this.persistence,new Vv,e.initialUser,this.serializer)}Du(e){return new up(sl.Vi,this.serializer)}bu(e){return new Bv}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ko.provider={build:()=>new ko};class VE extends ko{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){oe(this.persistence.referenceDelegate instanceof So,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new gv(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?ft.withCacheSize(this.cacheSizeBytes):ft.DEFAULT;return new up(r=>So.Vi(r,t),this.serializer)}}class Ac{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Jh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=kE.bind(null,this.syncEngine),await lE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new hE}()}createDatastore(e){const t=Xo(e.databaseInfo.databaseId),r=function(i){return new Hv(i)}(e.databaseInfo);return function(i,a,c,l){return new Jv(i,a,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,c){return new Yv(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Jh(this.syncEngine,t,0),function(){return zh.C()?new zh:new qv}())}createSyncEngine(e,t){return function(s,i,a,c,l,h,f){const p=new _E(s,i,a,c,l,h);return f&&(p.fu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=Z(s);$(dr,"RemoteStore shutting down."),i.Ia.add(5),await fi(i),i.Ea.shutdown(),i.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ac.provider={build:()=>new Ac};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):rn("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NE{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new M(C.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(s,i){const a=Z(s),c={documents:i.map(p=>Ao(a.serializer,p))},l=await a.Jo("BatchGetDocuments",a.serializer.databaseId,me.emptyPath(),c,i.length),h=new Map;l.forEach(p=>{const g=Zy(a.serializer,p);h.set(g.key.toString(),g)});const f=[];return i.forEach(p=>{const g=h.get(p.toString());oe(!!g,55234,{key:p}),f.push(g)}),f}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Zc(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{const s=G.fromPath(r);this.mutations.push(new Jf(s,this.precondition(s)))}),await async function(r,s){const i=Z(r),a={writes:s.map(c=>ip(i.serializer,c))};await i.Wo("Commit",i.serializer.databaseId,me.emptyPath(),a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw W(50498,{Wu:e.constructor.name});t=X.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new M(C.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(X.min())?st.exists(!1):st.updateTime(t):st.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(X.min()))throw new M(C.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return st.updateTime(t)}return st.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xE{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.Gu=r.maxAttempts,this.F_=new al(this.asyncQueue,"transaction_retry")}zu(){this.Gu-=1,this.ju()}ju(){this.F_.g_(async()=>{const e=new NE(this.datastore),t=this.Ju(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(s=>{this.Hu(s)}))}).catch(r=>{this.Hu(r)})})}Ju(e){try{const t=this.updateFunction(e);return!ui(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Hu(e){this.Gu>0&&this.Yu(e)?(this.Gu-=1,this.asyncQueue.enqueueAndForget(()=>(this.ju(),Promise.resolve()))):this.deferred.reject(e)}Yu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Xf(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fn="FirestoreClient";class DE{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=nt.UNAUTHENTICATED,this.clientId=Hc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{$(Fn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>($(Fn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Zt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=fl(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function za(n,e){n.asyncQueue.verifyOperationInProgress(),$(Fn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await hp(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>{Nn("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{$("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(s=>{Nn("Terminating Firestore due to IndexedDb database deletion failed",s)})}),n._offlineComponents=e}async function Yh(n,e){n.asyncQueue.verifyOperationInProgress();const t=await OE(n);$(Fn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Hh(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Hh(e.remoteStore,s)),n._onlineComponents=e}async function OE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){$(Fn,"Using user provided OfflineComponentProvider");try{await za(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Nn("Error using user provided cache. Falling back to memory cache: "+t),await za(n,new ko)}}else $(Fn,"Using default OfflineComponentProvider"),await za(n,new VE(void 0));return n._offlineComponents}async function _l(n){return n._onlineComponents||(n._uninitializedComponentsProvider?($(Fn,"Using user provided OnlineComponentProvider"),await Yh(n,n._uninitializedComponentsProvider._online)):($(Fn,"Using default OnlineComponentProvider"),await Yh(n,new Ac))),n._onlineComponents}function ME(n){return _l(n).then(e=>e.syncEngine)}function LE(n){return _l(n).then(e=>e.datastore)}async function Sc(n){const e=await _l(n),t=e.eventManager;return t.onListen=yE.bind(null,e.syncEngine),t.onUnlisten=wE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=vE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=TE.bind(null,e.syncEngine),t}function FE(n,e,t={}){const r=new Zt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,l,h){const f=new Vp({next:g=>{f.Ou(),a.enqueueAndForget(()=>wp(i,p));const A=g.docs.has(c);!A&&g.fromCache?h.reject(new M(C.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&g.fromCache&&l&&l.source==="server"?h.reject(new M(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new Tp(Go(c.path),f,{includeMetadataChanges:!0,ka:!0});return Ep(i,p)}(await Sc(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Np(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zh=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xp="firestore.googleapis.com",ed=!0;class td{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new M(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=xp,this.ssl=ed}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:ed;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=lp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<pv)throw new M(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ny("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Np((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new M(C.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new M(C.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new M(C.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ea{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new td({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new M(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new td(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new W0;switch(r.type){case"firstParty":return new X0(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new M(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Zh.get(t);r&&($("ComponentProvider","Removing Datastore"),Zh.delete(t),r.terminate())}(this),Promise.resolve()}}function UE(n,e,t,r={}){var s;n=wt(n,ea);const i=es(e),a=n._getSettings(),c=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),l=`${e}:${t}`;i&&(Zd(`https://${l}`),ef("Firestore",!0)),a.host!==xp&&a.host!==l&&Nn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},a),{host:l,ssl:i,emulatorOptions:r});if(!lr(h,c)&&(n._setSettings(h),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=nt.MOCK_USER;else{f=E_(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new M(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new nt(g)}n._authCredentials=new K0(new mf(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new gr(this.firestore,e,this._query)}}class Ce{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new An(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ce(this.firestore,e,this._key)}toJSON(){return{type:Ce._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(li(t,Ce._jsonSchema))return new Ce(e,r||null,new G(me.fromString(t.referencePath)))}}Ce._jsonSchemaVersion="firestore/documentReference/1.0",Ce._jsonSchema={type:Le("string",Ce._jsonSchemaVersion),referencePath:Le("string")};class An extends gr{constructor(e,t,r){super(e,t,Go(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ce(this.firestore,null,new G(e))}withConverter(e){return new An(this.firestore,e,this._path)}}function Ga(n,e,...t){if(n=Be(n),_f("collection","path",e),n instanceof ea){const r=me.fromString(e,...t);return ph(r),new An(n,null,r)}{if(!(n instanceof Ce||n instanceof An))throw new M(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return ph(r),new An(n.firestore,null,r)}}function Jt(n,e,...t){if(n=Be(n),arguments.length===1&&(e=Hc.newId()),_f("doc","path",e),n instanceof ea){const r=me.fromString(e,...t);return fh(r),new Ce(n,null,new G(r))}{if(!(n instanceof Ce||n instanceof An))throw new M(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return fh(r),new Ce(n.firestore,n instanceof An?n.converter:null,new G(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nd="AsyncQueue";class rd{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new al(this,"async_queue_retry"),this.oc=()=>{const r=ja();r&&$(nd,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=ja();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=ja();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new Zt;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!ss(e))throw e;$(nd,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,rn("INTERNAL UNHANDLED ERROR: ",sd(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const s=dl.createAndSchedule(this,e,t,r,i=>this.lc(i));return this.ec.push(s),s}ac(){this.tc&&W(47125,{hc:sd(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function sd(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function id(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class Un extends ea{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new rd,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new rd(e),this._firestoreClient=void 0,await e}}}function $E(n,e){const t=typeof n=="object"?n:sf(),r=typeof n=="string"?n:wo,s=zc(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=y_("firestore");i&&UE(s,...i)}return s}function ta(n){if(n._terminated)throw new M(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||BE(n),n._firestoreClient}function BE(n){var e,t,r;const s=n._freezeSettings(),i=function(c,l,h,f){return new fy(c,l,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Np(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new DE(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new gt(Qe.fromBase64String(e))}catch(t){throw new M(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new gt(Qe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:gt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(li(e,gt._jsonSchema))return gt.fromBase64String(e.bytes)}}gt._jsonSchemaVersion="firestore/bytes/1.0",gt._jsonSchema={type:Le("string",gt._jsonSchemaVersion),bytes:Le("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new M(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ke(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return te(this._lat,e._lat)||te(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:$t._jsonSchemaVersion}}static fromJSON(e){if(li(e,$t._jsonSchema))return new $t(e.latitude,e.longitude)}}$t._jsonSchemaVersion="firestore/geoPoint/1.0",$t._jsonSchema={type:Le("string",$t._jsonSchemaVersion),latitude:Le("number"),longitude:Le("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Bt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(li(e,Bt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Bt(e.vectorValues);throw new M(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Bt._jsonSchemaVersion="firestore/vectorValue/1.0",Bt._jsonSchema={type:Le("string",Bt._jsonSchemaVersion),vectorValues:Le("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qE=/^__.*__$/;class jE{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Bn(e,this.data,this.fieldMask,t,this.fieldTransforms):new hi(e,this.data,t,this.fieldTransforms)}}class Dp{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Bn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Op(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw W(40011,{Ec:n})}}class yl{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new yl(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.fc(e),s}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.Ac(),s}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Co(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(Op(this.Ec)&&qE.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class zE{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Xo(e)}Dc(e,t,r,s=!1){return new yl({Ec:e,methodName:t,bc:r,path:Ke.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _i(n){const e=n._freezeSettings(),t=Xo(n._databaseId);return new zE(n._databaseId,!!e.ignoreUndefinedProperties,t)}function vl(n,e,t,r,s,i={}){const a=n.Dc(i.merge||i.mergeFields?2:0,e,t,s);Tl("Data must be an object, but it was:",a,r);const c=Fp(r,a);let l,h;if(i.merge)l=new _t(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const g=Rc(e,p,t);if(!a.contains(g))throw new M(C.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);$p(f,g)||f.push(g)}l=new _t(f),h=a.fieldTransforms.filter(p=>l.covers(p.field))}else l=null,h=a.fieldTransforms;return new jE(new ut(c),l,h)}class na extends gi{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof na}}class El extends gi{_toFieldTransform(e){return new Wf(e.path,new Ys)}isEqual(e){return e instanceof El}}class wl extends gi{constructor(e,t){super(e),this.Cc=t}_toFieldTransform(e){const t=new ti(e.serializer,qf(e.serializer,this.Cc));return new Wf(e.path,t)}isEqual(e){return e instanceof wl&&this.Cc===e.Cc}}function Mp(n,e,t,r){const s=n.Dc(1,e,t);Tl("Data must be an object, but it was:",s,r);const i=[],a=ut.empty();$n(r,(l,h)=>{const f=Il(e,l,t);h=Be(h);const p=s.gc(f);if(h instanceof na)i.push(f);else{const g=yi(h,p);g!=null&&(i.push(f),a.set(f,g))}});const c=new _t(i);return new Dp(a,c,s.fieldTransforms)}function Lp(n,e,t,r,s,i){const a=n.Dc(1,e,t),c=[Rc(e,r,t)],l=[s];if(i.length%2!=0)throw new M(C.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(Rc(e,i[g])),l.push(i[g+1]);const h=[],f=ut.empty();for(let g=c.length-1;g>=0;--g)if(!$p(h,c[g])){const A=c[g];let k=l[g];k=Be(k);const V=a.gc(A);if(k instanceof na)h.push(A);else{const N=yi(k,V);N!=null&&(h.push(A),f.set(A,N))}}const p=new _t(h);return new Dp(f,p,a.fieldTransforms)}function GE(n,e,t,r=!1){return yi(t,n.Dc(r?4:3,e))}function yi(n,e){if(Up(n=Be(n)))return Tl("Unsupported field value:",e,n),Fp(n,e);if(n instanceof gi)return function(r,s){if(!Op(s.Ec))throw s.wc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const c of r){let l=yi(c,s.yc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Be(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return qf(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=be.fromDate(r);return{timestampValue:bo(s.serializer,i)}}if(r instanceof be){const i=new be(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:bo(s.serializer,i)}}if(r instanceof $t)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof gt)return{bytesValue:tp(s.serializer,r._byteString)};if(r instanceof Ce){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:nl(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Bt)return function(a,c){return{mapValue:{fields:{[Sf]:{stringValue:Rf},[To]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw c.wc("VectorValues must only contain numeric values.");return Yc(c.serializer,h)})}}}}}}(r,s);throw s.wc(`Unsupported field value: ${qo(r)}`)}(n,e)}function Fp(n,e){const t={};return Ef(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):$n(n,(r,s)=>{const i=yi(s,e.Vc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function Up(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof be||n instanceof $t||n instanceof gt||n instanceof Ce||n instanceof gi||n instanceof Bt)}function Tl(n,e,t){if(!Up(t)||!yf(t)){const r=qo(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function Rc(n,e,t){if((e=Be(e))instanceof mi)return e._internalPath;if(typeof e=="string")return Il(n,e);throw Co("Field path arguments must be of type string or ",n,!1,void 0,t)}const HE=new RegExp("[~\\*/\\[\\]]");function Il(n,e,t){if(e.search(HE)>=0)throw Co(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new mi(...e.split("."))._internalPath}catch{throw Co(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Co(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${r}`),a&&(l+=` in document ${s}`),l+=")"),new M(C.INVALID_ARGUMENT,c+n+l)}function $p(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ce(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new WE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(bl("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class WE extends Po{data(){return super.data()}}function bl(n,e){return typeof e=="string"?Il(n,e):e instanceof mi?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KE(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new M(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Al{}class Bp extends Al{}function QE(n,e,...t){let r=[];e instanceof Al&&r.push(e),r=r.concat(t),function(i){const a=i.filter(l=>l instanceof Rl).length,c=i.filter(l=>l instanceof Sl).length;if(a>1||a>0&&c>0)throw new M(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Sl extends Bp{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Sl(e,t,r)}_apply(e){const t=this._parse(e);return qp(e._query,t),new gr(e.firestore,e.converter,gc(e._query,t))}_parse(e){const t=_i(e.firestore);return function(i,a,c,l,h,f,p){let g;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new M(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){ad(p,f);const k=[];for(const V of p)k.push(od(l,i,V));g={arrayValue:{values:k}}}else g=od(l,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||ad(p,f),g=GE(c,a,p,f==="in"||f==="not-in");return Me.create(h,f,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Rl extends Al{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Rl(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Pt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const l of c)qp(a,l),a=gc(a,l)}(e._query,t),new gr(e.firestore,e.converter,gc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class kl extends Bp{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new kl(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new M(C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new M(C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Xs(i,a)}(e._query,this._field,this._direction);return new gr(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new is(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function JE(n,e="asc"){const t=e,r=bl("orderBy",n);return kl._create(r,t)}function od(n,e,t){if(typeof(t=Be(t))=="string"){if(t==="")throw new M(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Of(e)&&t.indexOf("/")!==-1)throw new M(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(me.fromString(t));if(!G.isDocumentKey(r))throw new M(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Th(n,new G(r))}if(t instanceof Ce)return Th(n,t._key);throw new M(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${qo(t)}.`)}function ad(n,e){if(!Array.isArray(n)||n.length===0)throw new M(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function qp(n,e){const t=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new M(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new M(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class jp{convertValue(e,t="none"){switch(Mn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return xe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(On(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw W(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return $n(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[To].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>xe(a.doubleValue));return new Bt(i)}convertGeoPoint(e){return new $t(xe(e.latitude),xe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=zo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Ks(e));default:return null}}convertTimestamp(e){const t=Dn(e);return new be(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=me.fromString(e);oe(cp(r),9688,{name:e});const s=new Qs(r.get(1),r.get(3)),i=new G(r.popFirst(5));return s.isEqual(t)||rn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class XE extends jp{constructor(e){super(),this.firestore=e}convertBytes(e){return new gt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ce(this.firestore,null,t)}}class Vr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Sn extends Po{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new io(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(bl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Sn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Sn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Sn._jsonSchema={type:Le("string",Sn._jsonSchemaVersion),bundleSource:Le("string","DocumentSnapshot"),bundleName:Le("string"),bundle:Le("string")};class io extends Sn{data(e={}){return super.data(e)}}class Mr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Vr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new io(this._firestore,this._userDataWriter,r.key,r,new Vr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new M(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const l=new io(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Vr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new io(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Vr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:YE(c.type),doc:l,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Mr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Hc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function YE(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return W(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ha(n){n=wt(n,Ce);const e=wt(n.firestore,Un);return FE(ta(e),n._key).then(t=>zp(e,n,t))}Mr._jsonSchemaVersion="firestore/querySnapshot/1.0",Mr._jsonSchema={type:Le("string",Mr._jsonSchemaVersion),bundleSource:Le("string","QuerySnapshot"),bundleName:Le("string"),bundle:Le("string")};class Pl extends jp{constructor(e){super(),this.firestore=e}convertBytes(e){return new gt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ce(this.firestore,null,t)}}function cd(n,e,t){n=wt(n,Ce);const r=wt(n.firestore,Un),s=Cl(n.converter,e,t);return Vl(r,[vl(_i(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,st.none())])}function ZE(n,e,t,...r){n=wt(n,Ce);const s=wt(n.firestore,Un),i=_i(s);let a;return a=typeof(e=Be(e))=="string"||e instanceof mi?Lp(i,"updateDoc",n._key,e,t,r):Mp(i,"updateDoc",n._key,e),Vl(s,[a.toMutation(n._key,st.exists(!0))])}function ew(n,e){const t=wt(n.firestore,Un),r=Jt(n),s=Cl(n.converter,e);return Vl(t,[vl(_i(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,st.exists(!1))]).then(()=>r)}function Wa(n,...e){var t,r,s;n=Be(n);let i={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||id(e[a])||(i=e[a++]);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(id(e[a])){const p=e[a];e[a]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[a+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[a+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let l,h,f;if(n instanceof Ce)h=wt(n.firestore,Un),f=Go(n._key.path),l={next:p=>{e[a]&&e[a](zp(h,n,p))},error:e[a+1],complete:e[a+2]};else{const p=wt(n,gr);h=wt(p.firestore,Un),f=p._query;const g=new Pl(h);l={next:A=>{e[a]&&e[a](new Mr(h,g,p,A))},error:e[a+1],complete:e[a+2]},KE(n._query)}return function(g,A,k,V){const N=new Vp(V),K=new Tp(A,N,k);return g.asyncQueue.enqueueAndForget(async()=>Ep(await Sc(g),K)),()=>{N.Ou(),g.asyncQueue.enqueueAndForget(async()=>wp(await Sc(g),K))}}(ta(h),f,c,l)}function Vl(n,e){return function(r,s){const i=new Zt;return r.asyncQueue.enqueueAndForget(async()=>IE(await ME(r),s,i)),i.promise}(ta(n),e)}function zp(n,e,t){const r=t.docs.get(e._key),s=new Pl(n);return new Sn(n,s,e._key,r,new Vr(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tw={maxAttempts:5};function Vs(n,e){if((n=Be(n)).firestore!==e)throw new M(C.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nw{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=_i(e)}get(e){const t=Vs(e,this._firestore),r=new XE(this._firestore);return this._transaction.lookup([t._key]).then(s=>{if(!s||s.length!==1)return W(24041);const i=s[0];if(i.isFoundDocument())return new Po(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new Po(this._firestore,r,t._key,null,t.converter);throw W(18433,{doc:i})})}set(e,t,r){const s=Vs(e,this._firestore),i=Cl(s.converter,t,r),a=vl(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,a),this}update(e,t,r,...s){const i=Vs(e,this._firestore);let a;return a=typeof(t=Be(t))=="string"||t instanceof mi?Lp(this._dataReader,"Transaction.update",i._key,t,r,s):Mp(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,a),this}delete(e){const t=Vs(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rw extends nw{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Vs(e,this._firestore),r=new Pl(this._firestore);return super.get(e).then(s=>new Sn(this._firestore,r,t._key,s._document,new Vr(!1,!1),t.converter))}}function Gp(n,e,t){n=wt(n,Un);const r=Object.assign(Object.assign({},tw),t);return function(i){if(i.maxAttempts<1)throw new M(C.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(i,a,c){const l=new Zt;return i.asyncQueue.enqueueAndForget(async()=>{const h=await LE(i);new xE(i.asyncQueue,h,c,a,l).zu()}),l.promise}(ta(n),s=>e(new rw(n,s)),r)}function Us(){return new El("serverTimestamp")}function sw(n){return new wl("increment",n)}(function(e,t=!0){(function(s){ns=s})(ts),jr(new ur("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new Un(new Q0(r.getProvider("auth-internal")),new Y0(a,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new M(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Qs(h.options.projectId,f)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),In(ch,lh,e),In(ch,lh,"esm2017")})();var iw="firebase",ow="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */In(iw,ow,"app");function Nl(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Hp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const aw=Hp,Wp=new ai("auth","Firebase",Hp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo=new qc("@firebase/auth");function cw(n,...e){Vo.logLevel<=ne.WARN&&Vo.warn(`Auth (${ts}): ${n}`,...e)}function oo(n,...e){Vo.logLevel<=ne.ERROR&&Vo.error(`Auth (${ts}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(n,...e){throw xl(n,...e)}function qt(n,...e){return xl(n,...e)}function Kp(n,e,t){const r=Object.assign(Object.assign({},aw()),{[e]:t});return new ai("auth","Firebase",r).create(e,{appName:n.name})}function or(n){return Kp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function xl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Wp.create(n,...e)}function Y(n,e,...t){if(!n)throw xl(e,...t)}function Xt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw oo(e),new Error(e)}function an(n,e){n||Xt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function lw(){return ld()==="http:"||ld()==="https:"}function ld(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(lw()||S_()||"connection"in navigator)?navigator.onLine:!0}function hw(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e,t){this.shortDelay=e,this.longDelay=t,an(t>e,"Short delay should be less than long delay!"),this.isMobile=I_()||R_()}get(){return uw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dl(n,e){an(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Xt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Xt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Xt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fw=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],pw=new vi(3e4,6e4);function Ol(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function as(n,e,t,r,s={}){return Jp(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=ci(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:l},i);return A_()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&es(n.emulatorConfig.host)&&(h.credentials="include"),Qp.fetch()(await Xp(n,n.config.apiHost,t,c),h)})}async function Jp(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},dw),e);try{const s=new gw(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Ki(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ki(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw Ki(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw Ki(n,"user-disabled",a);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Kp(n,f,h);on(n,f)}}catch(s){if(s instanceof cn)throw s;on(n,"network-request-failed",{message:String(s)})}}async function mw(n,e,t,r,s={}){const i=await as(n,e,t,r,s);return"mfaPendingCredential"in i&&on(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Xp(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Dl(n.config,s):`${n.config.apiScheme}://${s}`;return fw.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class gw{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(qt(this.auth,"network-request-failed")),pw.get())})}}function Ki(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=qt(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _w(n,e){return as(n,"POST","/v1/accounts:delete",e)}async function No(n,e){return as(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $s(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function yw(n,e=!1){const t=Be(n),r=await t.getIdToken(e),s=Ml(r);Y(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:$s(Ka(s.auth_time)),issuedAtTime:$s(Ka(s.iat)),expirationTime:$s(Ka(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Ka(n){return Number(n)*1e3}function Ml(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return oo("JWT malformed, contained fewer than 3 sections"),null;try{const s=Qd(t);return s?JSON.parse(s):(oo("Failed to decode base64 JWT payload"),null)}catch(s){return oo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function ud(n){const e=Ml(n);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ni(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof cn&&vw(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function vw({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ew{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=$s(this.lastLoginAt),this.creationTime=$s(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xo(n){var e;const t=n.auth,r=await n.getIdToken(),s=await ni(n,No(t,{idToken:r}));Y(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Yp(i.providerUserInfo):[],c=Tw(n.providerData,a),l=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!(c!=null&&c.length),f=l?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new Cc(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function ww(n){const e=Be(n);await xo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Tw(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Yp(n){return n.map(e=>{var{providerId:t}=e,r=Nl(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iw(n,e){const t=await Jp(n,{},async()=>{const r=ci({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Xp(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&es(n.emulatorConfig.host)&&(l.credentials="include"),Qp.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function bw(n,e){return as(n,"POST","/v2/accounts:revokeToken",Ol(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ud(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const t=ud(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Iw(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Lr;return r&&(Y(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(Y(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(Y(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Lr,this.toJSON())}_performRefresh(){return Xt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pn(n,e){Y(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class kt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Nl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Ew(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Cc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await ni(this,this.stsTokenManager.getToken(this.auth,e));return Y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return yw(this,e)}reload(){return ww(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new kt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await xo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ot(this.auth.app))return Promise.reject(or(this.auth));const e=await this.getIdToken();return await ni(this,_w(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,c,l,h,f;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,g=(s=t.email)!==null&&s!==void 0?s:void 0,A=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,k=(a=t.photoURL)!==null&&a!==void 0?a:void 0,V=(c=t.tenantId)!==null&&c!==void 0?c:void 0,N=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,K=(h=t.createdAt)!==null&&h!==void 0?h:void 0,z=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:B,emailVerified:j,isAnonymous:le,providerData:q,stsTokenManager:E}=t;Y(B&&E,e,"internal-error");const _=Lr.fromJSON(this.name,E);Y(typeof B=="string",e,"internal-error"),pn(p,e.name),pn(g,e.name),Y(typeof j=="boolean",e,"internal-error"),Y(typeof le=="boolean",e,"internal-error"),pn(A,e.name),pn(k,e.name),pn(V,e.name),pn(N,e.name),pn(K,e.name),pn(z,e.name);const y=new kt({uid:B,auth:e,email:g,emailVerified:j,displayName:p,isAnonymous:le,photoURL:k,phoneNumber:A,tenantId:V,stsTokenManager:_,createdAt:K,lastLoginAt:z});return q&&Array.isArray(q)&&(y.providerData=q.map(w=>Object.assign({},w))),N&&(y._redirectEventId=N),y}static async _fromIdTokenResponse(e,t,r=!1){const s=new Lr;s.updateFromServerResponse(t);const i=new kt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await xo(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];Y(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Yp(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Lr;c.updateFromIdToken(r);const l=new kt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Cc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,h),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hd=new Map;function Yt(n){an(n instanceof Function,"Expected a class definition");let e=hd.get(n);return e?(an(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,hd.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Zp.type="NONE";const dd=Zp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ao(n,e,t){return`firebase:${n}:${e}:${t}`}class Fr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ao(this.userKey,s.apiKey,i),this.fullPersistenceKey=ao("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await No(this.auth,{idToken:e}).catch(()=>{});return t?kt._fromGetAccountInfoResponse(this.auth,t,e):null}return kt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Fr(Yt(dd),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Yt(dd);const a=ao(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const g=await No(e,{idToken:f}).catch(()=>{});if(!g)break;p=await kt._fromGetAccountInfoResponse(e,g,f)}else p=kt._fromJSON(e,f);h!==i&&(c=p),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Fr(i,e,r):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Fr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fd(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(rm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(em(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(im(e))return"Blackberry";if(om(e))return"Webos";if(tm(e))return"Safari";if((e.includes("chrome/")||nm(e))&&!e.includes("edge/"))return"Chrome";if(sm(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function em(n=it()){return/firefox\//i.test(n)}function tm(n=it()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function nm(n=it()){return/crios\//i.test(n)}function rm(n=it()){return/iemobile/i.test(n)}function sm(n=it()){return/android/i.test(n)}function im(n=it()){return/blackberry/i.test(n)}function om(n=it()){return/webos/i.test(n)}function Ll(n=it()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Aw(n=it()){var e;return Ll(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Sw(){return k_()&&document.documentMode===10}function am(n=it()){return Ll(n)||sm(n)||om(n)||im(n)||/windows phone/i.test(n)||rm(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cm(n,e=[]){let t;switch(n){case"Browser":t=fd(it());break;case"Worker":t=`${fd(it())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ts}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rw{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const l=e(i);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kw(n,e={}){return as(n,"GET","/v2/passwordPolicy",Ol(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cw=6;class Pw{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Cw,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vw{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new pd(this),this.idTokenSubscription=new pd(this),this.beforeStateQueue=new Rw(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Yt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Fr.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await No(this,{idToken:e}),r=await kt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ot(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&(l!=null&&l.user)&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await xo(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=hw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ot(this.app))return Promise.reject(or(this));const t=e?Be(e):null;return t&&Y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ot(this.app)?Promise.reject(or(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ot(this.app)?Promise.reject(or(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Yt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await kw(this),t=new Pw(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ai("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await bw(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Yt(e)||this._popupRedirectResolver;Y(t,this,"argument-error"),this.redirectPersistenceManager=await Fr.create(this,[Yt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=cm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(Ot(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&cw(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Fl(n){return Be(n)}class pd{constructor(e){this.auth=e,this.observer=null,this.addObserver=M_(t=>this.observer=t)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ul={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Nw(n){Ul=n}function xw(n){return Ul.loadJS(n)}function Dw(){return Ul.gapiScript}function Ow(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mw(n,e){const t=zc(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(lr(i,e??{}))return s;on(s,"already-initialized")}return t.initialize({options:e})}function Lw(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Yt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Fw(n,e,t){const r=Fl(n);Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=lm(e),{host:a,port:c}=Uw(e),l=c===null?"":`:${c}`,h={url:`${i}//${a}${l}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){Y(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Y(lr(h,r.config.emulator)&&lr(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,es(a)?(Zd(`${i}//${a}${l}`),ef("Auth",!0)):$w()}function lm(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Uw(n){const e=lm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:md(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:md(a)}}}function md(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function $w(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class um{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Xt("not implemented")}_getIdTokenResponse(e){return Xt("not implemented")}_linkToIdToken(e,t){return Xt("not implemented")}_getReauthenticationResolver(e){return Xt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ur(n,e){return mw(n,"POST","/v1/accounts:signInWithIdp",Ol(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bw="http://localhost";class fr extends um{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new fr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):on("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Nl(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new fr(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Ur(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Ur(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ur(e,t)}buildRequest(){const e={requestUri:Bw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ci(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei extends hm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn extends Ei{constructor(){super("facebook.com")}static credential(e){return fr._fromParams({providerId:mn.PROVIDER_ID,signInMethod:mn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return mn.credentialFromTaggedObject(e)}static credentialFromError(e){return mn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return mn.credential(e.oauthAccessToken)}catch{return null}}}mn.FACEBOOK_SIGN_IN_METHOD="facebook.com";mn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn extends Ei{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return fr._fromParams({providerId:gn.PROVIDER_ID,signInMethod:gn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return gn.credentialFromTaggedObject(e)}static credentialFromError(e){return gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return gn.credential(t,r)}catch{return null}}}gn.GOOGLE_SIGN_IN_METHOD="google.com";gn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n extends Ei{constructor(){super("github.com")}static credential(e){return fr._fromParams({providerId:_n.PROVIDER_ID,signInMethod:_n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _n.credentialFromTaggedObject(e)}static credentialFromError(e){return _n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _n.credential(e.oauthAccessToken)}catch{return null}}}_n.GITHUB_SIGN_IN_METHOD="github.com";_n.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn extends Ei{constructor(){super("twitter.com")}static credential(e,t){return fr._fromParams({providerId:yn.PROVIDER_ID,signInMethod:yn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return yn.credentialFromTaggedObject(e)}static credentialFromError(e){return yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return yn.credential(t,r)}catch{return null}}}yn.TWITTER_SIGN_IN_METHOD="twitter.com";yn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await kt._fromIdTokenResponse(e,r,s),a=gd(r);return new Qr({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=gd(r);return new Qr({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function gd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do extends cn{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Do.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Do(e,t,r,s)}}function dm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Do._fromErrorAndOperation(n,i,e,r):i})}async function qw(n,e,t=!1){const r=await ni(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Qr._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jw(n,e,t=!1){const{auth:r}=n;if(Ot(r.app))return Promise.reject(or(r));const s="reauthenticate";try{const i=await ni(n,dm(r,s,e,n),t);Y(i.idToken,r,"internal-error");const a=Ml(i.idToken);Y(a,r,"internal-error");const{sub:c}=a;return Y(n.uid===c,r,"user-mismatch"),Qr._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&on(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zw(n,e,t=!1){if(Ot(n.app))return Promise.reject(or(n));const r="signIn",s=await dm(n,r,e),i=await Qr._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function Gw(n,e,t,r){return Be(n).onIdTokenChanged(e,t,r)}function Hw(n,e,t){return Be(n).beforeAuthStateChanged(e,t)}function Ww(n,e,t,r){return Be(n).onAuthStateChanged(e,t,r)}const Oo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Oo,"1"),this.storage.removeItem(Oo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kw=1e3,Qw=10;class pm extends fm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=am(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);Sw()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Qw):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Kw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}pm.type="LOCAL";const Jw=pm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm extends fm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}mm.type="SESSION";const gm=mm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ra(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,i)),l=await Xw(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ra.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $l(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const h=$l("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(){return window}function Zw(n){jt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _m(){return typeof jt().WorkerGlobalScope<"u"&&typeof jt().importScripts=="function"}async function eT(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function tT(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function nT(){return _m()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ym="firebaseLocalStorageDb",rT=1,Mo="firebaseLocalStorage",vm="fbase_key";class wi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function sa(n,e){return n.transaction([Mo],e?"readwrite":"readonly").objectStore(Mo)}function sT(){const n=indexedDB.deleteDatabase(ym);return new wi(n).toPromise()}function Pc(){const n=indexedDB.open(ym,rT);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Mo,{keyPath:vm})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Mo)?e(r):(r.close(),await sT(),e(await Pc()))})})}async function _d(n,e,t){const r=sa(n,!0).put({[vm]:e,value:t});return new wi(r).toPromise()}async function iT(n,e){const t=sa(n,!1).get(e),r=await new wi(t).toPromise();return r===void 0?null:r.value}function yd(n,e){const t=sa(n,!0).delete(e);return new wi(t).toPromise()}const oT=800,aT=3;class Em{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Pc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>aT)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return _m()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ra._getInstance(nT()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await eT(),!this.activeServiceWorker)return;this.sender=new Yw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||tT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Pc();return await _d(e,Oo,"1"),await yd(e,Oo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>_d(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>iT(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>yd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=sa(s,!1).getAll();return new wi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),oT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Em.type="LOCAL";const cT=Em;new vi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lT(n,e){return e?Yt(e):(Y(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl extends um{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ur(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ur(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ur(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function uT(n){return zw(n.auth,new Bl(n),n.bypassAuthState)}function hT(n){const{auth:e,user:t}=n;return Y(t,e,"internal-error"),jw(t,new Bl(n),n.bypassAuthState)}async function dT(n){const{auth:e,user:t}=n;return Y(t,e,"internal-error"),qw(t,new Bl(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return uT;case"linkViaPopup":case"linkViaRedirect":return dT;case"reauthViaPopup":case"reauthViaRedirect":return hT;default:on(this.auth,"internal-error")}}resolve(e){an(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){an(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fT=new vi(2e3,1e4);class Nr extends wm{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Nr.currentPopupAction&&Nr.currentPopupAction.cancel(),Nr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){an(this.filter.length===1,"Popup operations only handle one event");const e=$l();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(qt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(qt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Nr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(qt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,fT.get())};e()}}Nr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT="pendingRedirect",co=new Map;class mT extends wm{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=co.get(this.auth._key());if(!e){try{const r=await gT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}co.set(this.auth._key(),e)}return this.bypassAuthState||co.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function gT(n,e){const t=vT(e),r=yT(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function _T(n,e){co.set(n._key(),e)}function yT(n){return Yt(n._redirectPersistence)}function vT(n){return ao(pT,n.config.apiKey,n.name)}async function ET(n,e,t=!1){if(Ot(n.app))return Promise.reject(or(n));const r=Fl(n),s=lT(r,e),a=await new mT(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wT=10*60*1e3;class TT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!IT(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Tm(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(qt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=wT&&this.cachedEventUids.clear(),this.cachedEventUids.has(vd(e))}saveEventToCache(e){this.cachedEventUids.add(vd(e)),this.lastProcessedEventTime=Date.now()}}function vd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Tm({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function IT(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Tm(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bT(n,e={}){return as(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ST=/^https?/;async function RT(n){if(n.config.emulator)return;const{authorizedDomains:e}=await bT(n);for(const t of e)try{if(kT(t))return}catch{}on(n,"unauthorized-domain")}function kT(n){const e=kc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!ST.test(t))return!1;if(AT.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CT=new vi(3e4,6e4);function Ed(){const n=jt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function PT(n){return new Promise((e,t)=>{var r,s,i;function a(){Ed(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ed(),t(qt(n,"network-request-failed"))},timeout:CT.get()})}if(!((s=(r=jt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=jt().gapi)===null||i===void 0)&&i.load)a();else{const c=Ow("iframefcb");return jt()[c]=()=>{gapi.load?a():t(qt(n,"network-request-failed"))},xw(`${Dw()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw lo=null,e})}let lo=null;function VT(n){return lo=lo||PT(n),lo}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NT=new vi(5e3,15e3),xT="__/auth/iframe",DT="emulator/auth/iframe",OT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},MT=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function LT(n){const e=n.config;Y(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Dl(e,DT):`https://${n.config.authDomain}/${xT}`,r={apiKey:e.apiKey,appName:n.name,v:ts},s=MT.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${ci(r).slice(1)}`}async function FT(n){const e=await VT(n),t=jt().gapi;return Y(t,n,"internal-error"),e.open({where:document.body,url:LT(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:OT,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=qt(n,"network-request-failed"),c=jt().setTimeout(()=>{i(a)},NT.get());function l(){jt().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},$T=500,BT=600,qT="_blank",jT="http://localhost";class wd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function zT(n,e,t,r=$T,s=BT){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},UT),{width:r.toString(),height:s.toString(),top:i,left:a}),h=it().toLowerCase();t&&(c=nm(h)?qT:t),em(h)&&(e=e||jT,l.scrollbars="yes");const f=Object.entries(l).reduce((g,[A,k])=>`${g}${A}=${k},`,"");if(Aw(h)&&c!=="_self")return GT(e||"",c),new wd(null);const p=window.open(e||"",c,f);Y(p,n,"popup-blocked");try{p.focus()}catch{}return new wd(p)}function GT(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HT="__/auth/handler",WT="emulator/auth/handler",KT=encodeURIComponent("fac");async function Td(n,e,t,r,s,i){Y(n.config.authDomain,n,"auth-domain-config-required"),Y(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ts,eventId:s};if(e instanceof hm){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",O_(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof Ei){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await n._getAppCheckToken(),h=l?`#${KT}=${encodeURIComponent(l)}`:"";return`${QT(n)}?${ci(c).slice(1)}${h}`}function QT({config:n}){return n.emulator?Dl(n,WT):`https://${n.authDomain}/${HT}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa="webStorageSupport";class JT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=gm,this._completeRedirectFn=ET,this._overrideRedirectResult=_T}async _openPopup(e,t,r,s){var i;an((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await Td(e,t,r,kc(),s);return zT(e,a,$l())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Td(e,t,r,kc(),s);return Zw(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(an(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await FT(e),r=new TT(e);return t.register("authEvent",s=>(Y(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Qa,{type:Qa},s=>{var i;const a=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Qa];a!==void 0&&t(!!a),on(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=RT(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return am()||tm()||Ll()}}const XT=JT;var Id="@firebase/auth",bd="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZT(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function eI(n){jr(new ur("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;Y(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:cm(n)},h=new Vw(r,s,i,l);return Lw(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),jr(new ur("auth-internal",e=>{const t=Fl(e.getProvider("auth").getImmediate());return(r=>new YT(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),In(Id,bd,ZT(n)),In(Id,bd,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tI=5*60,nI=Yd("authIdTokenMaxAge")||tI;let Ad=null;const rI=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>nI)return;const s=t==null?void 0:t.token;Ad!==s&&(Ad=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function sI(n=sf()){const e=zc(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Mw(n,{popupRedirectResolver:XT,persistence:[cT,Jw,gm]}),r=Yd("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=rI(i.toString());Hw(t,a,()=>a(t.currentUser)),Gw(t,c=>a(c))}}const s=Jd("auth");return s&&Fw(t,`http://${s}`),t}function iI(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Nw({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=qt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",iI().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});eI("Browser");const oI={apiKey:"AIzaSyAsw466_wzsiLtbjw6FXZ1_O3HQ_AkVyU8",authDomain:"album-apexora.firebaseapp.com",projectId:"album-apexora",appId:"1:17231648284:web:20edb8477453f50473f1d9"},Im=rf(oI),ia=sI(Im),At=$E(Im),aI={tcg_primera_victoria:{nombre:"Primer duelo",desc:"Gana una partida de Cartas Alfa",icono:"⚔️",juego:"tcg",premio:{comun:25}},tcg_10_victorias:{nombre:"Duelista",desc:"10 victorias en Cartas Alfa",icono:"🏆",juego:"tcg",premio:{comun:100,rara:1}},sala_primer_reto:{nombre:"Desafiante",desc:"Completa tu primer reto",icono:"🎯",juego:"sala",premio:{comun:25}},album_primer_sobre:{nombre:"Coleccionista",desc:"Abre tu primer sobre",icono:"📖",juego:"album",premio:{comun:25}}},cI="@apexora-sala.app",bm="apexora_players",lI=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Argentina/Buenos_Aires"}).format(new Date),uI=n=>{const e=new Date(n+"T12:00:00Z");return e.setUTCDate(e.getUTCDate()-1),e.toISOString().slice(0,10)},hI=()=>Jt(At,bm,ia.currentUser.uid);function Ja(n="/Portal/"){return new Promise(e=>{const t=Ww(ia,async r=>{var s;t(),(s=r==null?void 0:r.email)!=null&&s.endsWith(cI)?(await dI(),e(r)):location.href=n+"?volver="+encodeURIComponent(location.href)})})}async function dI(){const n=ia.currentUser;if(!n)return null;const e=Jt(At,bm,n.uid),t=lI(),r=await Gp(At,async i=>{const a=await i.get(e);if(!a.exists()){const p={nombre:n.email.split("@")[0],streak:{current:1,best:1,lastDay:t},logros:{},fragmentos:{comun:0,rara:0},stats:{},cupo:{dia:t,comun:0},creado:Us(),ts:Us(),tn:Us()};return i.set(e,p),p}const c=a.data(),l=c.streak;if(l.lastDay===t)return c;const h=l.lastDay===uI(t)?l.current+1:1,f={current:h,best:Math.max(l.best,h),lastDay:t};return i.update(e,{streak:f}),{...c,streak:f}}),s=r.streak.current;return await Qi("primera_visita"),s>=3&&await Qi("racha_3"),s>=7&&await Qi("racha_7"),s>=30&&await Qi("racha_30"),r}async function Qi(n){const e=aI[n];if(!ia.currentUser||!e)return!1;const t=hI();return Gp(At,async r=>{var a;const s=await r.get(t);if(!s.exists()||(a=s.data().logros)!=null&&a[n])return!1;const i={[`logros.${n}`]:{fecha:Us(),juego:e.juego}};for(const[c,l]of Object.entries(e.premio||{}))i[`fragmentos.${c}`]=sw(l);return r.update(t,i),!0})}function Ir(n){const e=n,t=String((e==null?void 0:e.code)??"");return t.includes("permission-denied")?"Firebase rechazó la operación (¿sala llena, ya empezada, sesión inválida o reglas sin publicar?).":t.includes("unavailable")||t.includes("network")?"Sin conexión con Firebase.":(e==null?void 0:e.message)??"Error de conexión"}const fI=n=>zd([zs.Luminarae,zs.Umbra],n);function Vc(n,e){if(e===0)return n;const t=r=>1-r;return{...n,p:[n.p[1],n.p[0]],token:t(n.token),active:t(n.active),winner:n.winner===null||n.winner===-1?n.winner:t(n.winner),tok:[n.tok[1],n.tok[0]],mull:[n.mull[1],n.mull[0]],stack:n.stack.map(r=>({...r,owner:t(r.owner)}))}}function Am(n,e,t){return!t||typeof t.type!="string"?!1:t.type==="mulligan"?n.phase==="mulligan"&&t.player===e&&!n.mull[e]:n.phase!=="mulligan"&&n.active===e}function Sm(n,e,t){if(e===-1||!Am(n,e,t))return n;try{return Gs(n,t)}catch{return n}}const pI=(n,e)=>n.type==="mulligan"?{...n,player:e}:n,mI=n=>n.type==="mulligan"?{...n,player:0}:n,Sd="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",gI=()=>Array.from({length:4},()=>Sd[Math.floor(Math.random()*Sd.length)]).join(""),Xa="tcgRoom";class Rn{constructor(e){qe(this,"code","");qe(this,"seat",0);qe(this,"uid","");qe(this,"g");qe(this,"host","");qe(this,"guest","");qe(this,"seed",0);qe(this,"applied",0);qe(this,"sending",!1);qe(this,"sentAt",-1);qe(this,"unsubs",[]);qe(this,"chatSeen",new Set);qe(this,"ready",!1);qe(this,"pulled",!1);qe(this,"waiters",[]);this.h=e}static savedCode(){try{return localStorage.getItem(Xa)}catch{return null}}save(){try{localStorage.setItem(Xa,this.code)}catch{}}static clearSaved(){try{localStorage.removeItem(Xa)}catch{}}async create(){try{const e=await Ja();this.uid=e.uid,this.seat=0,this.seed=Math.floor(Math.random()*2**31);for(let t=0;t<8;t++){const r=gI();if(!(await Ha(Jt(At,"tcgGames",r))).exists())return await cd(Jt(At,"tcgGames",r),{host:e.uid,guest:null,seed:this.seed,status:"waiting",createdAt:Us()}),this.code=r,this.save(),this.h.onStatus(`Sala ${r}: esperando rival…`),this.listen(),r}}catch(e){throw new Error(Ir(e))}throw new Error("No se pudo crear la sala, inténtalo de nuevo")}async join(e){var r,s;const t=e.trim().toUpperCase();if(t.length!==4)throw new Error("El código tiene 4 caracteres");try{const i=await Ja();this.uid=i.uid;const a=Jt(At,"tcgGames",t),c=await Ha(a);if(!c.exists())throw new Error("Esa sala no existe");const l=c.data();if(l.host===i.uid)this.seat=0;else if(l.guest===i.uid)this.seat=1;else{if(l.guest)throw new Error("La sala ya está llena");await ZE(a,{guest:i.uid,status:"playing"}),this.seat=1}this.code=t,this.save(),this.listen()}catch(i){throw new Error((r=i.message)!=null&&r.startsWith("Esa sala")||(s=i.message)!=null&&s.startsWith("La sala")?i.message:Ir(i))}}async resume(e){try{const t=await Ja(),r=await Ha(Jt(At,"tcgGames",e.trim().toUpperCase())),s=r.data();if(!r.exists()||(s==null?void 0:s.status)!=="playing"||s.host!==t.uid&&s.guest!==t.uid)throw Rn.clearSaved(),new Error("Sala no disponible")}catch(t){throw Rn.clearSaved(),t}await this.join(e)}listen(){const e=Jt(At,"tcgGames",this.code);this.unsubs.push(Wa(e,t=>{const r=t.data();r&&(this.host=r.host,this.guest=r.guest??"",this.seed=r.seed,r.status==="playing"&&this.guest&&!this.ready&&(this.ready=!0,this.g=fI(this.seed),this.applied=0,this.pulled=!1,this.h.onReady(),this.h.onStatus(`Sala ${this.code}: ¡partida en marcha!`),this.unsubs.push(Wa(QE(Ga(e,"chat"),JE("t")),s=>s.docChanges().forEach(i=>{var c,l;if(i.type!=="added"||this.chatSeen.has(i.doc.id))return;this.chatSeen.add(i.doc.id);const a=i.doc.data();(l=(c=this.h).onChat)==null||l.call(c,{id:i.doc.id,mine:a.by===this.uid,text:String(a.text??"")})}),s=>this.h.onStatus("Chat: "+Ir(s)))),this.unsubs.push(Wa(Ga(e,"moves"),{includeMetadataChanges:!0},s=>this.pull(s.docs),s=>this.h.onStatus(Ir(s))))))},t=>this.h.onStatus(Ir(t))))}pull(e){const t=new Map;for(const c of e)c.metadata.hasPendingWrites||t.set(Number(c.id),c.data());const r=!this.pulled;this.pulled=!0;const s=[],i=this.applied;let a=!1;for(;t.has(this.applied);){const c=this.applied,l=t.get(c),h=l.by===this.host?0:l.by===this.guest?1:-1,f=this.g,p=Sm(f,h,l.action);p!==f&&h!==-1&&s.push({before:f,action:l.action,seat:h}),this.g=p,this.applied++,this.sending&&l.by===this.uid&&c===this.sentAt&&(this.sending=!1,a=!0)}this.applied===i&&!r||(this.h.onMoves(this.g,s,r||s.length>3),a&&this.h.onSettled(),this.waiters.splice(0).forEach(c=>c()))}waitAdvance(e,t){return new Promise(r=>{if(this.applied>e)return r(!0);const s=setTimeout(()=>r(!1),t);this.waiters.push(()=>{clearTimeout(s),r(this.applied>e)})})}async send(e){if(this.sending||!this.ready)return!1;this.sending=!0;for(let t=0;t<3;t++){const r=this.applied,s=JSON.parse(JSON.stringify(pI(e,this.seat)));this.sentAt=r;try{return await cd(Jt(At,"tcgGames",this.code,"moves",String(r)),{by:this.uid,action:s,t:Date.now()}),!0}catch{if(!await this.waitAdvance(r,4e3)||!Am(this.g,this.seat,s))break}}return this.sending=!1,this.h.onStatus("No se pudo enviar la jugada; revisa el tablero y repítela."),!1}async sendChat(e){if(!this.ready)throw new Error("El chat se activa cuando entra el rival.");try{await ew(Ga(At,"tcgGames",this.code,"chat"),{by:this.uid,text:e.slice(0,140),t:Date.now()})}catch(t){throw new Error(Ir(t))}}get busy(){return this.sending}get isReady(){return this.ready}close(){this.unsubs.forEach(e=>e()),this.unsubs=[],this.waiters=[],Rn.clearSaved()}}const _I=`
.onl{position:fixed;inset:0;z-index:9000;display:grid;place-items:center;background:rgba(5,5,12,.78)}
.onl>div{background:#14141f;border:1px solid #3a3a5a;border-radius:14px;padding:22px 24px;width:min(92vw,340px);display:grid;gap:12px;color:#eee;text-align:center}
.onl h2{margin:0}.onl input{padding:10px;font-size:22px;letter-spacing:6px;text-align:center;text-transform:uppercase;border-radius:8px;border:1px solid #444;background:#0c0c14;color:#fff}
.onl .st{min-height:1.2em;font-size:13px;opacity:.85}
.roomtag{position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:8000;font-size:12px;padding:3px 10px;border-radius:99px;background:rgba(20,20,31,.85);color:#ddd;pointer-events:none}
`;let br=null,lt=null;function Rm(){if(!document.getElementById("onl-css")){const n=document.createElement("style");n.id="onl-css",n.textContent=_I,document.head.append(n)}}function ri(n){Rm(),br||(br=document.createElement("div"),br.className="roomtag",document.body.append(br)),br.textContent=n,br.hidden=!n}function Bs(){lt==null||lt.remove(),lt=null}function Lo(n){const e=lt==null?void 0:lt.querySelector(".st");e&&(e.textContent=n)}function Nc(n){Rm(),Bs(),lt=document.createElement("div"),lt.className="onl",lt.innerHTML=`<div><h2>Jugar online</h2>
    ${n.inRoom?'<p>Ya estás en una sala.</p><button class="btn" data-x="leave">Salir de la sala</button>':'<button class="btn" data-x="create">Crear sala</button><p style="margin:0;opacity:.7">o únete con un código</p><input data-x="code" maxlength="4" placeholder="K7QF" autocomplete="off"><button class="btn" data-x="join">Unirse</button>'}
    <div class="st"></div><button class="ghost" data-x="close">Cerrar</button></div>`,document.body.append(lt);const e=t=>{Lo("Conectando…"),t().catch(r=>Lo((r==null?void 0:r.message)??"Error"))};lt.addEventListener("click",t=>{var s;const r=t.target.dataset.x;r&&(r==="close"?Bs():r==="create"?e(n.create):r==="join"?e(()=>n.join(lt.querySelector("[data-x=code]").value)):r==="leave"&&((s=n.leave)==null||s.call(n),Bs()))}),lt.addEventListener("keydown",t=>{var r;t.stopPropagation(),t.key==="Enter"&&((r=lt.querySelector("[data-x=join]"))==null||r.click())})}const si=document.getElementById("app"),St=document.createElement("div");St.className="preview";document.body.append(St);const km={barrera:"Barrera",robovida:"Robo de vida",arrollar:"Arrollar",letal:"Letal",rapido:"Ataque rápido",duro:"Duro",elusivo:"Elusivo",temible:"Temible",retador:"Retador",regenera:"Regeneración",efimero:"Efímero"},yI={barrera:"anula el siguiente daño que recibiría y luego se pierde.",robovida:"el daño que inflige cura a tu Nexo.",arrollar:"el daño sobrante sobre su bloqueador va al Nexo.",letal:"destruye cualquier unidad a la que dañe.",rapido:"al atacar, golpea antes que su bloqueador.",duro:"recibe 1 de daño menos de cada fuente.",elusivo:"solo puede ser bloqueada por unidades elusivas.",temible:"solo la bloquean unidades con 3 o más de poder.",retador:"al atacar, elige qué enemigo debe bloquearla.",regenera:"se cura por completo al final de cada ronda.",efimero:"muere al golpear o al acabar la ronda."},vI={barrera:"🛡",robovida:"🩸",arrollar:"🐗",letal:"☠",rapido:"⚡",duro:"🪨",elusivo:"🌫",temible:"👁",retador:"⚔",regenera:"♻",efimero:"⏳"},EI={burst:"Ráfaga",focus:"Enfoque",fast:"Rápido",slow:"Lento"},wI={burst:"Ráfaga: se resuelve al instante, no pasa la prioridad y sirve como reacción.",focus:"Enfoque: se resuelve al instante, no pasa la prioridad; solo como acción original.",fast:"Rápido: va a la pila; el rival puede responder. Sirve como reacción.",slow:"Lento: va a la pila; solo como acción original (con la pila vacía)."},ar=n=>n.replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),oa=()=>zd([zs.Luminarae,zs.Umbra],Date.now());let S=oa(),Ae=null,Xn=!1,Ge=new Set,Dt=new Set,ii=!1,$e=!1,Fo=!1,Lt=0,Se=null,Ft=null,zt=null,Et=[20,20],Yn=new Set,Uo=[0,0],Zn=0,$r=new Map,rr=[[],[]],xr=S;const Rd=new Map;let oi=!1,kd=0,Cd=-1,Ya=0,fe=null,kn=0;const xc=n=>(n+kn)%2,Dc=n=>xc(n)?"Umbra":"Luminarae",Za=n=>{fe||tn.react(n)};function er(n,e=""){const t=document.createElement("div");t.className="vfx "+n,t.textContent=e,document.body.append(t),setTimeout(()=>t.remove(),1400)}function en(n){document.querySelectorAll(".toast").forEach(t=>t.remove());const e=document.createElement("div");e.className="vfx toast",e.textContent=n,document.body.append(e),setTimeout(()=>e.remove(),1800)}const tn=new l_,Ct=document.createElement("aside");Ct.className="chat";Ct.innerHTML=`<div class="tabs"><button data-t="chat" class="on">Chat</button><button data-t="log">Registro</button></div>
  <div class="msgs" id="msgs"></div><div class="logv" id="logv" hidden></div>
  <div class="inp"><input id="chat-in" maxlength="140" placeholder="Escribe un mensaje…" autocomplete="off"><button id="chat-send">➤</button></div>`;document.body.append(Ct);const uo=Ct.querySelector("#msgs"),Cm=Ct.querySelector("#logv"),Oc=Ct.querySelector("#chat-in");tn.onMessage(n=>{const e=document.createElement("div");if(e.className="msg "+n.side,n.side==="sys")e.textContent=n.text;else{const t=document.createElement("b");t.textContent=n.from+":",e.append(t,document.createTextNode(n.text))}uo.append(e),uo.scrollTop=uo.scrollHeight,n.side==="foe"&&ve("msg")});const Pm=()=>{const n=Oc.value.trim();n&&(Oc.value="",fe?fe.sendChat(n).catch(e=>tn.sys((e==null?void 0:e.message)??"No se pudo enviar el mensaje")):tn.send(n))};Ct.querySelector("#chat-send").addEventListener("click",Pm);Oc.addEventListener("keydown",n=>{n.key==="Enter"&&Pm(),n.stopPropagation()});Ct.querySelectorAll(".tabs button").forEach(n=>n.addEventListener("click",()=>{const e=n.dataset.t==="log";Cm.hidden=!e,uo.hidden=e,Ct.querySelector(".inp").hidden=e,Ct.querySelectorAll(".tabs button").forEach(t=>t.classList.toggle("on",t===n))}));tn.sys("Chat local: escribe y el rival te responderá. Más adelante puede conectarse a Firebase.");function ho(n,e,t=-1){const r=he[n],s=e.map(a=>`<p><b>${km[a]}:</b> ${yI[a]}</p>`),i=Yr(n);if(r.type==="spell"){const a=Math.min(S.p[0].spell,r.cost);s.push(`<p>✦ ${wI[r.speed??"fast"]}</p><p>💎 Se paga primero con la reserva de hechizo: ${a} de reserva + ${r.cost-a} de maná.</p>`)}else s.push("<p>Puede atacar nada más jugarla. Solo el jugador con la ficha de ataque puede atacar.</p>");if(i&&s.push(`<p>🎯 Eliges tú el objetivo (${i==="enemy"?"unidad enemiga":"unidad aliada"}). Si desaparece antes de resolverse, el hechizo se disipa.</p>`),r.fx.some(a=>a.t==="sacDraw"||a.t==="sacDmg")&&s.push("<p>⚠ Sacrifica a tu unidad más débil.</p>"),t>=0&&!Zr(S,0,t)){const a=S.p[0],c=r.type==="spell"?a.mana+a.spell:a.mana;s.push(`<p>⛔ ${r.cost>c?`Maná insuficiente: cuesta ${r.cost}, tienes ${c}.`:S.active!==0?"Ahora no tienes la prioridad.":r.type==="unit"?a.board.length>=6?"Tu tablero está lleno.":"Solo se juegan unidades con la pila vacía, en tu turno.":"Ahora no puedes jugarla (¿necesita objetivo o pila vacía?)."}</p>`)}return`<div class="rules">${s.join("")}</div>`}const TI=n=>{const e=n.slice(0,3);return`<div class="art"><span class="glyph">${he[n].type==="spell"?"✦":e==="lum"?"☀":"☾"}</span><img src="${r_(n)}" onerror="this.remove()"></div>`};function Mt(n,e="",t="",r,s=""){const i=he[n],a=n.slice(0,3),c=r?r.kw:i.kw,l=r&&r.dmg>0?"dmg":"",h=(i.type==="spell"?[EI[i.speed??"fast"]]:[]).concat(c.map(f=>km[f])).join(" · ");return`<div class="card ${i.type} ${a} ${t}" ${e}>${TI(n)}
    <div class="side"><i class="cost">${i.cost}</i>${c.map(f=>`<i class="ki">${vI[f]}</i>`).join("")}</div>
    <div class="panel"><div class="nm">${vt(n)}</div><div class="orn"></div><p class="tx"><em>${h}</em>${i.text}</p></div>
    ${i.type==="unit"?`<b class="atk ${r&&r.ta?"tmp":""}">${r?ue(r):i.atk}<s>⚔</s></b><b class="hp ${l}">${r?Re(r):i.hp}<s>♥</s></b>`:""}${s}</div>`}function Pd(n,e,t){document.querySelectorAll(".spot").forEach(s=>s.remove());const r=document.createElement("div");r.className="vfx spot",r.innerHTML=`<div class="spot-l">Juegas</div>${Mt(n,"","",t)}`,document.body.append(r),setTimeout(()=>r.remove(),1250)}function Vd(n,e,t){document.querySelectorAll(".reader").forEach(c=>c.remove());const r=he[n],s=r.type==="spell"?6500:3800,i=document.createElement("div");i.className="reader foe",oi=!0,i.innerHTML=`<div class="rd-h">⚠ El rival juega</div>${Mt(n,"","",t)}<div class="rd-t"><b>${ar(vt(n))}</b> · coste ${r.cost}<p>${ar(r.text)}</p></div>${ho(n,t?t.kw:r.kw)}<button class="rd-ok" type="button">Entendido ✓</button><i class="rd-bar" style="animation-duration:${s}ms"></i>`,document.body.append(i);const a=()=>{i.isConnected&&(i.remove(),oi=!1)};i.querySelector(".rd-ok").addEventListener("click",a),i.addEventListener("click",a),setTimeout(a,s)}function Nd(n,e,t){const r=n.nexus<Et[e]?"hit":n.nexus>Et[e]?"heal":"",s=n.nexus-Et[e],i=Array.from({length:n.maxMana},(a,c)=>`<u class="${c<n.mana?"on":""}"></u>`).join("");return`<div class="pt ${e?"foe":"me"}"><div class="ava"><span>${xc(e)?"☾":"☀"}</span><img src="/TCG/img/avatar_${xc(e)?"umb":"lum"}.webp" onerror="this.remove()"></div>
    <div class="orb ${r}">${Math.max(0,n.nexus)}${s?`<span class="fx">${s>0?"+":""}${s}</span>`:""}</div>
    <div class="pname">${t}</div><div class="pmana">${i}<span class="sm">${[0,1,2].map(a=>`<i class="${a<n.spell?"on":""}"></i>`).join("")}</span></div></div>`}function Vm(n,e){if(S.phase!=="main")return;if(fe){sr({type:"attack",units:n});return}const t=Lt;$e=!0,zt={side:e,idx:n},ve("attack"),er("banner small",`⚔ ${e?"El rival ataca":"Atacas"} con ${n.length}`),Ee(),setTimeout(()=>{if(t!==Lt)return;zt=null,$e=!1;const r=Gs(S,{type:"attack",units:n});if(r===S){en("No puedes atacar ahora"),Ge.clear(),Ee();return}S=r,Ge.clear(),Ee(),Jr()},900)}function Nm(n,e){const t=n.token,r=1-t,s=n.p[r].nexus-e.p[r].nexus,i=g=>n.p[g].board.filter(A=>!e.p[g].board.some(k=>k.uid===A.uid)).map(A=>vt(A.card)),a=i(0),c=i(1),l=n.attackers.length,h=[`${t?"El rival atacó":"Atacaste"} con ${l}`,s>0?`${t?"Tu Nexo":"Nexo rival"} −${s}`:"sin daño al Nexo"];a.length&&h.push("Tuyas caídas: "+a.join(", ")),c.length&&h.push("Rivales caídas: "+c.join(", "));const f="⚔ "+h.join(" · "),p=document.createElement("div");p.className="vfx report"+(t?"":" good"),p.textContent=f,document.body.append(p),setTimeout(()=>p.remove(),3600),tn.sys(f)}const xm=(n,e)=>n!==e&&n.phase==="block"&&n.attackers.length>0&&e.attackers.length===0&&n.round===e.round;function Dm(n,e,t){const r=Lt,s=n.token,i=1-s,a=n.attackers.filter(B=>n.p[s].board.some(j=>j.uid===B)).map(B=>({uid:B,bid:n.blocks[String(B)]}));if(!a.length){t();return}const c=Math.max(0,n.p[i].nexus-e.p[i].nexus),l=a.map(({uid:B,bid:j})=>{const le=n.p[s].board.find(E=>E.uid===B),q=j!==void 0?n.p[i].board.find(E=>E.uid===j):void 0;return q?le.kw.includes("arrollar")?Math.max(0,ue(le)-Re(q)-(q.kw.includes("duro")?1:0)):0:j===void 0||le.kw.includes("arrollar")?ue(le):0}),h=l.reduce((B,j)=>B+j,0),f=[];let p=0;l.forEach((B,j)=>{const le=j===l.length-1?c-p:h?Math.round(B/h*c):0;f.push(Math.max(0,le)),p+=f[j]});const g=B=>{const j=structuredClone(n),le=new Set;a.slice(0,B+1).forEach(({uid:q,bid:E})=>{le.add(q),E!==void 0&&le.add(E)});for(const q of[0,1])j.p[q].board=j.p[q].board.filter(E=>!le.has(E.uid)||e.p[q].board.some(_=>_.uid===E.uid)),j.p[q].board.forEach(E=>{if(le.has(E.uid)){const _=e.p[q].board.find(y=>y.uid===E.uid);_&&Object.assign(E,_)}});return j.p[i].nexus=n.p[i].nexus-f.slice(0,B+1).reduce((q,E)=>q+E,0),j.attackers=a.slice(B+1).map(q=>q.uid),j.blocks={},j.attackers.forEach(q=>{const E=n.blocks[String(q)];E!==void 0&&j.p[i].board.some(_=>_.uid===E)&&(j.blocks[String(q)]=E)}),j.forced=j.forced.filter(q=>j.attackers.includes(q)),j},A=a.length>3?.7:1,k=480*A,V=340,N=760*A;Xn=!0,Ge.clear(),Se=null,Ft=null;const K=()=>{Ae=null,Xn=!1,Nm(n,e),t()},z=B=>{if(r!==Lt){Ae=null,Xn=!1;return}if(B>=a.length){K();return}const{uid:j,bid:le}=a[B],q=le!==void 0?n.p[i].board.find(_=>_.uid===le):void 0,E=n.p[s].board.find(_=>_.uid===j);S=B?g(B-1):n,Ae={atk:j,blk:q?q.uid:null,strike:!1,def:i,cap:`⚔ Duelo ${B+1}/${a.length} · ${ar(vt(E.card))} ${q?"contra "+ar(vt(q.card)):"→ directo al Nexo"}`},Ee(),setTimeout(()=>{if(r!==Lt){Ae=null,Xn=!1;return}const _=document.querySelector(`[data-uid="${j}"]`),y=q?document.querySelector(`[data-uid="${q.uid}"]`):document.querySelector(`.pt.${i===0?"me":"foe"} .ava`),w=150,T=330,I=70,v=560,De=w+T,pt=De+I+v,D=e.p[s].board.some(U=>U.uid===j),F=E.card.startsWith("umb")?"umb":"lum";if(_&&y){const U=_.getBoundingClientRect(),ee=y.getBoundingClientRect(),ge=ee.top+ee.height/2-(U.top+U.height/2),ot=Math.sign(ge)||1,de=ee.left+ee.width/2-(U.left+U.width/2),ae=ge-ot*((U.height*1.08+ee.height)/2-(q?4:16)),Tt=Math.hypot(de,ae)||1,Ht=-de/Tt*Math.min(26,Tt*.09),cs=-ae/Tt*Math.min(26,Tt*.09),Je=_.cloneNode(!0);Je.classList.remove("duel","duelatk","sel","can","enter","atkr"),Je.removeAttribute("data-a"),Je.removeAttribute("data-uid"),Je.style.cssText=`position:fixed;left:${U.left}px;top:${U.top}px;width:${U.width}px;height:${U.height}px;--w:${U.width}px;margin:0;z-index:80;pointer-events:none;will-change:transform;box-shadow:0 0 0 2px #ffd36e,0 12px 30px #000a,0 0 30px #ffd36eaa`,document.body.append(Je),Ae.fly=!0;const qn=ln=>ln/pt,Ti="translate(0,0) scale(1)",jn=`translate(${de}px,${ae}px) scale(1.08)`,zn=Je.animate([{transform:Ti,offset:0,easing:"cubic-bezier(.3,0,.4,1)"},{transform:`translate(${Ht}px,${cs}px) scale(1.05)`,offset:qn(w),easing:"cubic-bezier(.6,0,.25,1)"},{transform:jn,offset:qn(De),easing:"linear"},{transform:jn,offset:qn(De+I),easing:"cubic-bezier(.45,0,.2,1)"},{transform:Ti,offset:1}],{duration:pt,fill:"forwards"});xg(Je,w+T+40,F),zn.onfinish=()=>{Je.remove(),Ae&&Ae.atk===j&&(Ae.fly=!1,Ee())},setTimeout(()=>{var ln;D||(zn.cancel(),Je.remove(),Ae&&Ae.atk===j&&(Ae.fly=!1)),Ng(ee.left+ee.width/2,ee.top+ee.height/2-ot*ee.height/2+ot*4,U.width,F),q&&((ln=document.querySelector(`[data-uid="${q.uid}"]`))==null||ln.animate([{transform:"scale(1.08)"},{transform:`translateY(${ot*16}px) rotate(${ot*3}deg) scale(1.02)`,filter:"brightness(2.2)",offset:.3},{transform:"scale(1.08)"}],{duration:340,easing:"ease-out"}))},De)}Ae.strike=!0,ve("attack"),Ee(),setTimeout(()=>{if(r!==Lt){Ae=null,Xn=!1;return}S=g(B),Ae.strike=!1,Ee(),setTimeout(()=>z(B+1),N)},_&&y?De:V)},k)};z(0)}function Om(n){if(Ge.clear(),Se=null,Ft=null,xm(S,n)){$e=!0,Dm(S,n,()=>{$e=!1,S=n,Ee(),Jr()});return}S=n,Ee(),Jr()}function Ee(){S.round!==Zn&&S.round>0&&S.phase!=="mulligan"&&(kd=Date.now()+1400,setTimeout(()=>Ee(),1450)),St.style.display="none",vg(S.phase==="block"||S.stack.length?1:0);const n=S.p[0],e=S.p[1],t=S.active===0&&S.winner===null&&!$e&&S.phase!=="mulligan",r=S.phase==="block"&&S.token===1&&S.active===0,s=new Set(Object.values(S.blocks)),i=new Set(S.attackers),a=S.attackers.length?S.token:0,c=[];S.attackers.length?S.attackers.forEach(D=>{const F=S.p[a].board.findIndex(ge=>ge.uid===D);if(F<0)return;const U=S.blocks[String(D)],ee=U===void 0?-1:S.p[1-a].board.findIndex(ge=>ge.uid===U);c.push({a:S.p[a].board[F],ai:F,b:ee>=0?S.p[1-a].board[ee]:void 0,bi:ee})}):S.phase==="main"&&Ge.size&&[...Ge].forEach(D=>{n.board[D]&&c.push({a:n.board[D],ai:D,bi:-1})});const l=(D,F)=>c.some(U=>(F===a?U.a:U.b)===D),h=(D,F,U)=>{const ee=U===0,ge=$r.get(D.uid),ot=Re(D);let de="",ae="";ge&&S.round===Zn&&(ot<ge[1]?(ae="hurt",de=String(ot-ge[1])):(ot>ge[1]||ue(D)>ge[0])&&(ae="boost",de="+"+(ot>ge[1]?ot-ge[1]:ue(D)-ge[0]))),Rd.set(D.uid,Mt(D.card,"","mini dying",D));const Tt=Se&&(Se.kind==="enemy"&&!ee||Se.kind==="ally"&&ee),Ht=Tt?"tgt":ee?"unit":r&&i.has(D.uid)?"enemy-unit":"view",cs=ee&&t&&S.phase==="main"&&S.tok[0]&&!S.attackers.length,Je=`mini ${Ge.has(F)&&ee?"sel ":""}${cs?"can ":""}${Yn.has(D.uid)?"":"enter "}${ae} ${Tt?"tgtok ":""}${!ee&&Ft===F?"blocktarget ":""}${ee&&s.has(D.uid)?"assignedblock ":""}${S.forced.includes(D.uid)||S.forced.some(qn=>S.blocks[String(qn)]===D.uid)?"forced ":""}${i.has(D.uid)?"atkr ":""}${zt&&zt.side===U&&zt.idx.includes(F)?"attacking "+(U?"down":"up"):""}${Ae&&D.uid===Ae.atk?"duel duelatk "+(Ae.fly?"fly ":""):Ae&&D.uid===Ae.blk?"duel duelblk ":""}`;return Mt(D.card,`data-u="${U}:${F}" data-a="${Ht}" data-i="${F}" data-uid="${D.uid}"`,Je,D,de?`<span class="fx">${de}</span>`:"")},f=(D,F)=>{const U=[],ee=[];D.board.forEach((de,ae)=>{l(de,F)||U.push(h(de,ae,F))}),c.forEach(de=>{const ae=F===a?de.a:de.b,Tt=F===a?de.ai:de.bi;ee.push(ae?h(ae,Tt,F):`<div class="slot cslot ${F?"umb":"lum"} ${r&&F===0?"ask":""}">${r&&F===0?"<span>Elige<br>defensor</span>":""}</div>`)});const ge=rr[F].filter(de=>!D.board.some(ae=>ae.uid===de)).map(de=>Rd.get(de)??""),ot=Array.from({length:Math.max(0,6-D.board.length)},(de,ae)=>`<div class="slot ${F?"umb":"lum"}">${ge[ae]??""}</div>`).join("");return{back:U.join("")+ot,comb:ee.join("")}},p=f(e,1),g=f(n,0),A=S.phase==="mulligan"?"Mulligan":S.phase==="main"?"Prioridad":S.phase==="block"?"Bloqueos":"Pila",k=S.winner!==null?S.winner===-1?"Empate":S.winner===0?"¡Victoria!":"Derrota":Se?`Elige objetivo para ${vt(n.hand[Se.hand])} · Esc cancela`:S.phase==="stack"?t?`Responde o pulsa OK · ${S.stack.length} en la pila`:`Pila · ${S.stack.length}`:S.phase==="block"?r?"Toca un atacante y luego tu bloqueador":S.active===0?"Rival bloqueó: puedes responder o resolver":"El rival asigna bloqueos…":t?S.passes===1?"El rival pasó: pasa también para cerrar la ronda":S.tok[0]?"Tu turno: juega cartas o selecciona unidades y ataca":"Tu turno: juega cartas o pasa":"El rival tiene la prioridad…",V=S.log.slice(-14).map(D=>D.replace(/\{(\w+)\}/g,(F,U)=>`<b>${vt(U)}</b>`)).join("<br>"),N=S.attackers.length?`<div class="blocksummary"><b>⚔ Combate</b>${S.attackers.map(D=>{const F=S.p[S.token].board.find(ge=>ge.uid===D),U=S.blocks[String(D)],ee=U===void 0?void 0:S.p[1-S.token].board.find(ge=>ge.uid===U);return`<span>${F?vt(F.card):"?"} <i>→</i> ${ee?vt(ee.card):"<em>Sin bloquear</em>"}</span>`}).join("")}</div>`:"";let K="RIVAL",z="wait";t&&(S.phase==="main"?Ge.size?(K=`ATACAR ${Ge.size}`,z="atk"):(K=S.passes===1?"FIN DE RONDA":"PASAR",z="go"):S.phase==="block"?(K=r?Object.keys(S.blocks).length?"BLOQUEAR":"SIN BLOQUEO":"RESOLVER",z="go"):(K="OK",z="go"));const B=D=>{const F=D===void 0?void 0:[...S.p[0].board,...S.p[1].board].find(U=>U.uid===D);return F?vt(F.card):""},j=S.stack.length?`<div class="stacktray"><b>✦ Pila · se resuelve de arriba abajo</b>${[...S.stack].map((D,F)=>({x:D,k:F})).reverse().map(({x:D,k:F},U)=>{const ee=he[D.card],ge=B(D.target);return`<div data-st="${F}" class="stackitem ${D.owner?"foe":"me"} ${U===0?"top":""}"><div class="si-h"><em>${D.owner?"Rival":"Tú"}</em><strong>${vt(D.card)}</strong><i>${ee.cost}</i></div><p>${ar(ee.text)}</p>${ge?`<small>🎯 Objetivo: ${ar(ge)}</small>`:""}</div>`}).join("")}</div>`:"",le=Date.now()<kd&&S.phase!=="mulligan",q=S.phase==="block"||S.phase==="stack"&&S.resumePhase==="block",E=S.phase==="mulligan"?-1:le?0:q?2:S.passes===1&&!S.attackers.length&&S.phase==="main"?3:1,_=[["ROBO","Robas 1 carta y ganas 1 de maná"],["INVOCACIÓN","Juega unidades y hechizos"],["COMBATE","Ataque y bloqueo · hechizos rápidos permitidos"],["FINAL","Si ambos pasáis, acaba la ronda y pasa el turno"]];si.dataset.ph=String(E);const y=S.winner!==null||S.phase==="mulligan"?"":S.active===0?"mine":"theirs",w=`<div class="phasehud ${y}"><div class="who">${y==="mine"?"⚡ TU TURNO":y?"⏳ TURNO RIVAL":"PARTIDA"}</div><ol>${_.map((D,F)=>`<li class="${F===E?"on":F<E?"done":""}"><i>${F+1}</i><span>${D[0]}</span>${F===E?`<small>${D[1]}</small>`:""}</li>`).join("")}</ol>${S.stack.length?'<div class="hstack">✦ Pila activa</div>':""}</div>`,T=n.hand.length,I=n.hand.map((D,F)=>{const U=F-(T-1)/2;return`<div class="slotc" data-a="hand" data-i="${F}" style="--rot:${(U*3.2).toFixed(1)}deg;--y:${(U*U*2.6).toFixed(1)}px" aria-label="${ar(vt(D))}, coste ${he[D].cost}">${Mt(D,"",`${t&&Zr(S,0,F)?"ok":"no"} ${(Se==null?void 0:Se.hand)===F?"sel":""}`)}</div>`}).join(""),v=S.phase==="mulligan"&&S.mull[0]?'<div class="mull"><h2>Mulligan</h2><p>Esperando al rival…</p></div>':S.phase==="mulligan"?`<div class="mull"><h2>Mulligan</h2><p>Toca las cartas que quieras reemplazar (0 a 4)</p><div class="mrow">${n.hand.map((D,F)=>Mt(D,`data-a="mul" data-i="${F}"`,Dt.has(F)?"sel swap":"")).join("")}</div><button class="btn" data-a="mulgo">${Dt.size?`Reemplazar ${Dt.size}`:"Conservar mano"}</button></div>`:"";si.innerHTML=`<header><div class="brand"><span class="brand-mark">✦</span><h1>Cartas <small>ALFA</small></h1></div><div class="header-state"><span class="rd">Ronda ${S.round}/40</span><span class="phase-chip">${A}</span><span class="tok">${S.tok[0]?"⚑ Tienes la ficha de ataque":S.tok[1]?"⚑ Ficha de ataque: rival":"⚑ Ficha gastada"}</span></div>
    <nav class="toolbar"><button class="ghost" data-a="chat">${ii?"✕ Cerrar":"☰ Chat / registro"}</button><button class="ghost icon-btn" data-a="mute">${_g()?"🔇":"🔊"}</button><button class="ghost" data-a="menu">⌂ Menú</button><button class="ghost" data-a="online">🌐 Online</button><button class="ghost" data-a="new">↻ Nueva partida</button></nav></header><main class="stage ${Se?"targeting":""}${Xn?" dueling":""}" data-dnex="${Ae&&Ae.blk===null?Ae.def:""}">${Ae?`<div class="duelcap">${Ae.cap}</div>`:""}
      <div class="foehand">${Array.from({length:e.hand.length},()=>"<i></i>").join("")}</div>
      <div class="plane-wrap"><div class="plane"><div class="lane foeback">${p.back}</div><div class="lane foecomb">${p.comb}</div><div class="lane mycomb">${g.comb}</div><div class="lane myback">${g.back}</div></div></div>
      
      <div class="msgbar"><span class="pill ${t?"go":""}">${k}</span></div>
      <aside class="sideL">${w}${j}${N}<div class="pgroup me"><div class="pile p0" data-l="MAZO" title="Tu mazo"><b>${n.deck.length}</b></div>${Nd(n,0,`${Dc(0)} · Tú`)}</div></aside>
      <aside class="sideR"><div class="pgroup foe">${Nd(e,1,`${Dc(1)} · Rival`)}<div class="pile p1" data-l="MAZO" title="Mazo rival"><b>${e.deck.length}</b></div></div>
      <div class="manapanel"><div class="mrow2"><b>MANÁ</b><span>${n.mana}/${n.maxMana}</span></div><div class="gems">${Array.from({length:Math.max(n.maxMana,1)},(D,F)=>`<u class="${F<n.mana?"on":""}"></u>`).join("")}</div>
        <div class="mrow2" title="Reserva exclusiva para hechizos: se gasta ANTES que el maná normal y se rellena con el maná que te sobra al acabar la ronda (máximo 3)."><b>RESERVA ✦</b><span>${n.spell}/3</span></div><div class="gems sp">${[0,1,2].map(D=>`<u class="${D<n.spell?"on":""}"></u>`).join("")}</div><p class="mnote">Reserva: solo hechizos, se gasta primero. Se llena con el maná que sobra al cerrar la ronda (máx. 3).</p></div>
      <button class="endbtn ${z}" data-a="${z==="atk"?"attack":"go"}" ${z==="wait"?"disabled":""}><span>${K}</span></button></aside>
      <div class="fan">${I}</div></main>`+v+(S.winner!==null?`<div class="over"><h2>${k}</h2><button class="btn" data-a="new">Jugar de nuevo</button></div>`:"");const De=S.p.some(D=>D.board.some(F=>!Yn.has(F.uid))),pt=rr.some(D=>D.some(F=>!S.p.some(U=>U.board.some(ee=>ee.uid===F))));De&&S.p.flatMap(D=>D.board.filter(F=>!Yn.has(F.uid)).map(F=>F.card)).forEach((D,F)=>setTimeout(()=>Ig(D),F*170)),pt&&ve("death"),S.p.forEach((D,F)=>D.board.filter(U=>!Yn.has(U.uid)).forEach(U=>{i_(U.card)?(document.querySelectorAll(".spot,.reader").forEach(ee=>ee.remove()),oi=!0,ve("round"),a_(U.card,Mt(U.card,"","",U),()=>{oi=!1})):F?Vd(U.card,1,U):Pd(U.card,0,U)})),n.nexus<Et[0]?er("vhit"):n.nexus>Et[0]&&er("vheal"),(n.nexus<Et[0]||e.nexus<Et[1])&&ve("hurt"),(n.nexus>Et[0]||e.nexus>Et[1])&&ve("heal"),S.p.forEach((D,F)=>{const U=D.played[D.played.length-1];D.played.length>Uo[F]&&U&&he[U].type==="spell"&&(er("cast "+U.slice(0,3)),ve("spell_"+U.slice(0,3)),F?Vd(U):Pd(U),F===1&&Za("cast"))}),S.round!==Zn&&S.round>0&&(er("banner",`Ronda ${S.round}`),ve("round"),n.spell>Ya&&setTimeout(()=>en(`✦ +${n.spell-Ya} reserva de hechizo (maná sobrante)`),1500)),S.active===0&&Cd!==0&&!$e&&S.winner===null&&S.phase!=="mulligan"&&S.round===Zn&&(er("banner small turn",r?"🛡 Tu turno · bloquea":"⚡ Tu turno"),ve("round")),Cd=S.phase==="mulligan"?-1:S.active,Ya=n.spell,!Xn&&xr.attackers.length&&!S.attackers.length&&xr.round===S.round&&Nm(xr,S),Et=[n.nexus,e.nexus],Uo=S.p.map(D=>D.played.length),Zn=S.round,xr=S,$r=new Map,rr=[[],[]],S.p.forEach((D,F)=>D.board.forEach(U=>{Yn.add(U.uid),$r.set(U.uid,[ue(U),Re(U)]),rr[F].push(U.uid)})),S.winner!==null&&!Fo&&(Fo=!0,fe&&Rn.clearSaved(),ve(S.winner===0?"win":"lose"),S.winner===0?Za("win"):S.winner===1&&Za("lose")),Cm.innerHTML=V,Ct.hidden=!ii}function sr(n){if(fe){if($e||fe.busy)return;if(!fe.isReady){en("Esperando al rival… Para jugar contra la IA, sal de la sala desde 🌐 Online");return}if(Gs(S,mI(n))===S){en(n.type==="block"?"Ese bloqueo no es válido (Elusivo/Temible/ya asignado)":n.type==="play"?"No puedes jugar eso ahora":"Acción no válida");return}(n.type==="pass"||n.type==="confirmBlocks")&&ve("pass"),$e=!0,Ge.clear(),Se=null,Ft=null,Ee(),fe.send(n).then(r=>{r||($e=!1,Ee())});return}const e=Gs(S,n);if(e===S){en(n.type==="block"?"Ese bloqueo no es válido (Elusivo/Temible/ya asignado)":n.type==="play"?"No puedes jugar eso ahora":"Acción no válida");return}(n.type==="pass"||n.type==="confirmBlocks")&&ve("pass"),Om(e)}function Jr(){if(fe||S.winner!==null||S.active!==1||S.phase==="mulligan")return;const n=Lt,e=()=>{if(n!==Lt||$e||S.winner!==null||S.active!==1)return;if(oi){setTimeout(e,300);return}const t=t_(S);if(t.type==="attack"){Vm(t.units,1);return}Om(Gs(S,t))};setTimeout(e,1200)}function Mc(){S.active===0&&S.winner===null&&!$e&&(ve("click"),S.phase==="main"&&Ge.size?Vm([...Ge],0):S.phase==="block"&&S.token===1?sr({type:"confirmBlocks"}):sr({type:"pass"}))}si.addEventListener("click",n=>{const e=n.target.closest("[data-a]");if(Se&&(e==null?void 0:e.dataset.a)!=="tgt"&&(Se=null,Ee(),!e||e.dataset.a==="hand")||!e)return;const t=e.dataset.a,r=Number(e.dataset.i),s=S.active===0&&S.winner===null&&!$e&&S.phase!=="mulligan";if(t==="chat")ii=!ii,ve("click"),Ee();else if(t==="mute")yg(),ve("click"),Ee();else if(t==="new"&&fe)en("Para otra partida online crea o únete a una sala nueva"),Nc(Lc());else if(t==="menu")ve("click"),Fd();else if(t==="online")ve("click"),Nc(Lc());else if(t==="new")ve("click"),Lt++,$e=!1,zt=null,Ft=null,Se=null,S=oa(),Ge.clear(),Dt.clear(),Et=[20,20],Yn.clear(),Uo=[0,0],Zn=0,$r.clear(),rr=[[],[]],Fo=!1,xr=S,Ee();else if(t==="mul")ve("select"),Dt.has(r)?Dt.delete(r):Dt.add(r),Ee();else if(t==="mulgo"){ve("click");const i=[...Dt];Dt.clear(),sr({type:"mulligan",idx:i})}else if(s)if(t==="tgt"){if(Se){const i=Number(e.dataset.uid),a=Se.hand;sr({type:"play",hand:a,target:i})}}else if(t==="hand"){if(!Zr(S,0,r)){en("No puedes jugar esa carta ahora");return}const i=Yr(S.p[0].hand[r]);ve("select"),i?(Se={hand:r,kind:i},Ee()):sr({type:"play",hand:r})}else t==="go"||t==="attack"?Mc():t==="enemy-unit"&&S.phase==="block"?(Ft=r,ve("select"),Ee()):t==="unit"&&S.phase==="block"&&S.token===1?Ft===null?en("Primero toca al atacante rival"):sr({type:"block",attacker:Ft,blocker:r}):t==="unit"&&S.phase==="main"&&S.tok[0]&&!S.attackers.length&&(Ge.has(r)?Ge.delete(r):Ge.add(r),ve("select"),Ee());else return});document.addEventListener("keydown",n=>{n.target.tagName!=="INPUT"&&(n.key==="Escape"&&Se?(Se=null,Ee()):n.key===" "&&S.phase!=="mulligan"&&(n.preventDefault(),Mc()))});document.addEventListener("contextmenu",n=>{Se&&(n.preventDefault(),Se=null,Ee())});const Mm=()=>document.querySelectorAll(".manapanel u.pay").forEach(n=>n.classList.remove("pay"));function II(n){Mm();const e=he[n],t=S.p[0],r=e.type==="spell"?Math.min(t.spell,e.cost):0,s=e.cost-r,i=document.querySelectorAll(".manapanel .gems"),a=(c,l,h)=>{var p;if(!c)return;const f=c.querySelectorAll("u");for(let g=l-1;g>=Math.max(0,l-h);g--)(p=f[g])==null||p.classList.add("pay")};a(i[0],t.mana,s),a(i[1],t.spell,r)}si.addEventListener("mouseover",n=>{var r,s;const e=n.target.closest("[data-st]");if(e){const i=(r=S.stack[Number(e.dataset.st)])==null?void 0:r.card;i&&(St.innerHTML=Mt(i)+ho(i,he[i].kw),St.style.display="block");return}const t=n.target.closest('[data-u],[data-a="hand"]');if((!t||!t.dataset.i||t.dataset.a!=="hand")&&Mm(),(t==null?void 0:t.dataset.a)==="hand"){const i=S.p[0].hand[Number(t.dataset.i)];i&&II(i)}if(!t){St.style.display="none";return}if(t.dataset.u){const[i,a]=t.dataset.u.split(":").map(Number),c=(s=S.p[i])==null?void 0:s.board[a];c&&(St.innerHTML=Mt(c.card,"","",c)+ho(c.card,c.kw),St.style.display="block")}else{const i=Number(t.dataset.i),a=S.p[0].hand[i];a&&(St.innerHTML=Mt(a)+ho(a,he[a].kw,i),St.style.display="block")}});si.addEventListener("mouseleave",()=>{St.style.display="none"});const Cn=[];let Xr=!1;function $o(n){Lt++,$e=!1,zt=null,Ft=null,Se=null,S=n,Ge.clear(),Dt.clear(),Fo=n.winner!==null,Et=[n.p[0].nexus,n.p[1].nexus],Uo=n.p.map(e=>e.played.length),Zn=n.round,xr=n,Yn=new Set(n.p.flatMap(e=>e.board.map(t=>t.uid))),$r=new Map,rr=[[],[]],n.p.forEach((e,t)=>e.board.forEach(r=>{$r.set(r.uid,[ue(r),Re(r)]),rr[t].push(r.uid)})),Ee()}function Lm(){const n=Cn.shift();if(!n){Xr=!1;return}Xr=!0;const e=Vc(Sm(n.before,n.seat,n.action),kn),t=()=>{zt=null,$e=!1,S=e,Ge.clear(),Se=null,Ft=null,Ee(),setTimeout(Lm,0)},r=()=>{xm(S,e)&&Cn.length===0?($e=!0,zt=null,Dm(S,e,t)):t()};if(n.action.type==="attack"&&Cn.length===0){const s=n.seat===kn?0:1;$e=!0,zt={side:s,idx:n.action.units},ve("attack"),er("banner small",`⚔ ${s?"El rival ataca":"Atacas"} con ${n.action.units.length}`),Ee(),setTimeout(r,900)}else r()}function Lc(){return{inRoom:!!fe,create:async()=>{Fc();try{const n=await fe.create();ri(`Sala ${n} · esperando rival…`),Lo(`Código de sala: ${n} — pásaselo a tu rival`)}catch(n){throw fe=null,n}},join:async n=>{Fc();try{await fe.join(n)}catch(e){throw fe=null,e}},leave:()=>{fe==null||fe.close(),fe=null,kn=0,Cn.length=0,Xr=!1,ri(""),$o(oa()),Jr()}}}function Fc(){fe||(fe=new Rn({onStatus:n=>{ri(n),Lo(n)},onChat:n=>{tn.push({from:n.mine?"Tú":"Rival",text:n.text,side:n.mine?"me":"foe"}),!n.mine&&!ii&&en("💬 Rival: "+n.text.slice(0,60))},onReady:()=>{kn=fe.seat,Bs(),Ud(),tn.sys("Chat online activo: puedes escribir a tu rival."),$o(Vc(fe.g,kn)),tn.sys(`Sala ${fe.code}: juegas con ${Dc(0)}.`)},onMoves:(n,e,t)=>{t?(Cn.length=0,$o(Vc(n,kn))):(Cn.push(...e),Xr||Lm())},onSettled:()=>{!Xr&&!Cn.length&&$e&&($e=!1,Ee())}}))}const xd=Rn.savedCode();xd&&(Fc(),fe.resume(xd).catch(()=>{fe=null,Rn.clearSaved(),ri("")}));document.addEventListener("menu:ia",()=>{fe&&(fe.close(),fe=null,kn=0,Cn.length=0,Xr=!1,ri(""),Bs(),$o(oa()),Jr())});document.addEventListener("menu:online",()=>Nc(Lc()));Ee();Jr();Gg();mg(n=>{n&&gg()});
