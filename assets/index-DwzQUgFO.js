var zg=Object.defineProperty;var Hg=(n,e,t)=>e in n?zg(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Le=(n,e,t)=>Hg(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();let W,ur,Gs,po,Fs,_c=!1,Pt=!1,ah=!1,nf=0,Qa=0,ch=0,to=0;try{Pt=localStorage.getItem("cartas-mute")==="1"}catch{}const Gg=()=>Pt;function Wg(){Pt=!Pt;try{localStorage.setItem("cartas-mute",Pt?"1":"0")}catch{}return _c&&po.gain.setTargetAtTime(Pt?0:.85,W.currentTime,.06),Pt}function Kg(n){nf=n}const Q=n=>440*Math.pow(2,(n-69)/12),Us=(n,e)=>n+Math.random()*(e-n);function Qg(n){const e=W.sampleRate,t=Math.floor(e*n),r=W.createBuffer(2,t,e);for(let s=0;s<2;s++){const i=r.getChannelData(s);let a=0;for(let c=0;c<t;c++){const l=c/t,h=.9-.78*l;a+=(Math.random()*2-1-a)*h,i[c]=c<e*.018?0:a*Math.pow(1-l,2.8)*(c<e*.02?.2:1)}for(const[c,l]of[[23,.5],[37,.35],[53,.3],[71,.22]])i[Math.floor(e*(c+s*5)/1e3)]+=l*(s?-1:1)}return r}function nl(){if(_c){W.state==="suspended"&&W.resume();return}W=new AudioContext,_c=!0;const n=W.createDynamicsCompressor();n.threshold.value=-20,n.knee.value=18,n.ratio.value=3.5,n.attack.value=.004,n.release.value=.22;const e=W.createBiquadFilter();e.type="lowshelf",e.frequency.value=140,e.gain.value=2.5;const t=W.createBiquadFilter();t.type="highshelf",t.frequency.value=6500,t.gain.value=1.5,po=W.createGain(),po.gain.value=Pt?0:.85;const r=W.createGain();r.connect(e).connect(t).connect(n).connect(po).connect(W.destination);const s=W.createConvolver();s.buffer=Qg(3.2);const i=W.createGain();i.gain.value=.9,s.connect(i).connect(r);const a=W.createDelay(1);a.delayTime.value=.375;const c=W.createGain();c.gain.value=.4;const l=W.createBiquadFilter();l.type="lowpass",l.frequency.value=2200,a.connect(l).connect(c).connect(a),l.connect(r),l.connect(s),ur=W.createGain(),Gs=W.createGain(),Gs.gain.value=.55;const h=(p,_,I)=>{p.connect(r);const R=W.createGain();if(R.gain.value=_,p.connect(R).connect(s),I){const V=W.createGain();V.gain.value=I,p.connect(V).connect(a)}};h(ur,.32,.06),h(Gs,.6,.22),Fs=W.createWaveShaper();const f=new Float32Array(1024);for(let p=0;p<1024;p++){const _=p/512-1;f[p]=Math.tanh(_*4)*.8}Fs.curve=f,Fs.oversample="2x",Fs.connect(ur)}function Ee(n,e,t,r={}){const s=W.createGain(),i=W.createBiquadFilter(),a=W.createStereoPanner(),c=(r.vol??.1)*(r.det?.6:1),l=r.att??.004;if(i.type="lowpass",i.Q.value=r.q??.7,i.frequency.setValueAtTime(r.lp??9e3,e),r.lpEnd&&i.frequency.exponentialRampToValueAtTime(Math.max(40,r.lpEnd),e+t),a.pan.value=r.pan??0,s.gain.setValueAtTime(1e-4,e),s.gain.linearRampToValueAtTime(c,e+l),r.pad){const h=r.rel??t*.4;s.gain.setValueAtTime(c,e+Math.max(l,t-h)),s.gain.linearRampToValueAtTime(1e-4,e+t)}else s.gain.exponentialRampToValueAtTime(1e-4,e+t);i.connect(s).connect(a).connect(r.bus??ur);for(const h of r.det?[-r.det,r.det]:[0]){const f=W.createOscillator();if(f.type=r.type??"sine",f.frequency.setValueAtTime(n,e),f.detune.value=h,r.slide&&f.frequency.exponentialRampToValueAtTime(Math.max(20,n*Math.pow(2,r.slide/12)),e+t),r.vib){const p=W.createOscillator(),_=W.createGain();p.frequency.value=5,_.gain.value=r.vib,p.connect(_).connect(f.detune),p.start(e),p.stop(e+t+.1)}f.connect(i),f.start(e),f.stop(e+t+.1)}}function Pe(n,e,t,r={}){const s=W.createOscillator(),i=W.createOscillator(),a=W.createGain(),c=W.createGain(),l=W.createStereoPanner(),h=(r.idx??2)*n;s.frequency.value=n,i.frequency.value=n*(r.ratio??2.01),a.gain.setValueAtTime(h,e),a.gain.exponentialRampToValueAtTime(Math.max(1,h*.02),e+t),i.connect(a).connect(s.frequency),c.gain.setValueAtTime(1e-4,e),c.gain.linearRampToValueAtTime(r.vol??.1,e+(r.att??.003)),c.gain.exponentialRampToValueAtTime(1e-4,e+t),l.pan.value=r.pan??0,s.connect(c).connect(l).connect(r.bus??ur),s.start(e),i.start(e),s.stop(e+t+.1),i.stop(e+t+.1)}let Ns;function rf(){if(Ns)return Ns;Ns=W.createBuffer(1,W.sampleRate*2,W.sampleRate);const n=Ns.getChannelData(0);let e=0,t=0,r=0;for(let s=0;s<n.length;s++){const i=Math.random()*2-1;e=.99765*e+i*.099,t=.963*t+i*.2965,r=.57*r+i*1.0527,n[s]=(e+t+r+i*.1848)*.2}return Ns}function Ne(n,e,t={}){const r=W.createBufferSource(),s=W.createBiquadFilter(),i=W.createGain(),a=W.createStereoPanner(),c=t.att??.004;r.buffer=rf(),s.type=t.type??"bandpass",s.Q.value=t.q??1,s.frequency.setValueAtTime(t.f0??1e3,n),s.frequency.exponentialRampToValueAtTime(Math.max(30,t.f1??t.f0??1e3),n+e),i.gain.setValueAtTime(1e-4,n),i.gain.linearRampToValueAtTime(t.vol??.1,n+c),i.gain.exponentialRampToValueAtTime(1e-4,n+e),a.pan.value=t.pan??0,r.connect(s).connect(i).connect(a).connect(t.bus??ur),r.start(n,Math.random()*1.4),r.stop(n+e+.05)}function ge(n,e,t,r){const s=W.createOscillator(),i=W.createGain();s.frequency.setValueAtTime(e*2.2,n),s.frequency.exponentialRampToValueAtTime(e,n+.09),i.gain.setValueAtTime(t,n),i.gain.exponentialRampToValueAtTime(1e-4,n+.7),s.connect(i).connect(r??ur),s.start(n),s.stop(n+.75),Ne(n,.06,{type:"lowpass",f0:1200,f1:300,vol:t*.5,bus:r})}const je=()=>W.currentTime+.01,Hr={hover:()=>Pe(Q(96),je(),.09,{vol:.02,ratio:3.5,idx:.8,pan:Us(-.3,.3)}),click:()=>{const n=je();Ne(n,.06,{f0:2200,f1:900,q:2,vol:.12}),Ee(220,n,.1,{vol:.14,slide:-7})},select:()=>{const n=je();Pe(Q(84),n,.5,{vol:.07,ratio:2,idx:1.2,pan:-.15}),Pe(Q(91),n+.06,.6,{vol:.05,ratio:2,idx:1,pan:.15})},start:()=>{const n=je();[38,45,50,57,62,65].forEach((t,r)=>Ee(Q(t),n,2.4,{type:"sawtooth",vol:.035,att:1,pad:!0,rel:1.2,lp:300,lpEnd:3200,det:9,pan:(r-2.5)*.15})),Ne(n,1.3,{f0:300,f1:7e3,q:.8,vol:.13,att:1.15}),ge(n,40,.5);const e=n+1.25;ge(e,48,1),[62,65,69,74,81].forEach((t,r)=>Ee(Q(t),e,2.6,{type:"triangle",vol:.06,lp:4e3,pan:(r-2)*.25})),Pe(Q(86),e,3,{vol:.09,ratio:1.5,idx:2})},pass:()=>{const n=je();Ne(n,.35,{f0:600,f1:200,q:1.2,vol:.09,att:.08}),Ee(Q(50),n,.3,{vol:.08,slide:-5})},summon:()=>{const n=je();ge(n,48,.9),Ne(n,.5,{type:"lowpass",f0:3e3,f1:150,q:.7,vol:.25}),[81,86,90,93].forEach((e,t)=>Pe(Q(e),n+.05+t*.05,1.2,{vol:.05,ratio:3,idx:1.5,pan:(t-1.5)*.3})),Ee(Q(38),n,.9,{type:"sawtooth",vol:.08,lp:1500,lpEnd:150,det:12,att:.02})},summon_lum:()=>{const n=je();ge(n,52,.85),Ne(n,.75,{type:"bandpass",f0:400,f1:6500,q:.8,vol:.12,att:.4}),Ee(Q(45),n+.12,1.3,{type:"triangle",vol:.11,lp:1800,att:.03}),[69,73,76,81,85].forEach((e,t)=>Pe(Q(e),n+.2+t*.06,1.7,{vol:.06,ratio:2,idx:1.4,pan:(t-2)*.25})),Pe(Q(93),n+.45,2.2,{vol:.045,ratio:3.01,idx:1})},summon_umb:()=>{const n=je();Ee(Q(33),n,1.4,{type:"sawtooth",vol:.16,slide:-9,lp:1800,lpEnd:90,det:14,att:.02}),ge(n,40,1),Ne(n,.9,{type:"lowpass",f0:2200,f1:90,q:.7,vol:.22}),Ne(n+.1,.8,{type:"bandpass",f0:300,f1:1500,q:2,vol:.08,att:.3}),Pe(Q(58),n+.05,1.9,{vol:.06,ratio:1.41,idx:3}),Pe(Q(65),n+.12,1.7,{vol:.05,ratio:1.41,idx:2.5,pan:.3})},spell_lum:()=>{const n=je();[74,76,78,81,83,86,90].forEach((e,t)=>Ee(Q(e),n+t*.055,1.3,{type:"triangle",vol:.07,pan:-.5+t*.16})),Pe(Q(93),n+.4,2.2,{vol:.06,ratio:2.76,idx:1}),Ne(n,1.2,{type:"highpass",f0:5e3,f1:9e3,vol:.05,att:.5})},spell_umb:()=>{const n=je();Ee(Q(50),n,1.4,{type:"sawtooth",vol:.12,slide:-12,lp:2400,lpEnd:100,det:15}),Ee(Q(25),n,1.6,{vol:.35,att:.05}),Ne(n,1.2,{type:"lowpass",f0:200,f1:2600,vol:.18,att:.9}),Pe(Q(63),n+.2,2,{ratio:1.414,idx:3,vol:.06,pan:-.3}),Pe(Q(57),n+.2,2,{ratio:1.414,idx:3,vol:.05,pan:.3})},attack:()=>{const n=je(),e=n+.2;Ne(n,.22,{f0:800,f1:7e3,q:1.5,vol:.18,att:.12}),Pe(Q(88),e,.7,{ratio:3.1,idx:3,vol:.09}),Pe(Q(95),e,.5,{ratio:4.7,idx:2,vol:.05}),ge(e,70,.5),Ne(e,.12,{type:"highpass",f0:3e3,f1:1500,vol:.15})},hurt:()=>{const n=je();ge(n,45,1),Ee(Q(40),n,.5,{type:"sawtooth",vol:.18,lp:1200,lpEnd:120,bus:Fs}),Ne(n,.35,{type:"lowpass",f0:2500,f1:100,vol:.3}),Pe(Q(79),n+.02,1.2,{ratio:1.41,idx:2,vol:.04})},heal:()=>{const n=je();[74,78,81,86].forEach((e,t)=>Pe(Q(e),n+t*.08,1.4,{vol:.06,ratio:2,idx:.8,pan:-.3+t*.2})),[62,69].forEach(e=>Ee(Q(e),n,1.6,{vol:.08,att:.3,pad:!0}))},death:()=>{const n=je();Ee(Q(55),n,1,{type:"sawtooth",vol:.14,slide:-14,lp:2500,lpEnd:100,det:14}),Ne(n,.9,{f0:3e3,f1:150,q:.6,vol:.16}),ge(n+.05,42,.7)},round:()=>{const n=je();[1,2.32,3.17,4.1,5.4].forEach((e,t)=>Ee(Q(43)*e,n,3.6-t*.4,{vol:.09/(t+1),pan:(t%2?1:-1)*.2})),ge(n,52,.8),Ne(n,.5,{f0:500,f1:3e3,vol:.06,att:.4})},win:()=>{const n=je();[[62,66,69,74],[67,71,74,79],[69,73,76,81,86]].forEach((e,t)=>{e.forEach((r,s)=>{Ee(Q(r),n+t*.45,1.9,{type:"triangle",vol:.055,lp:5e3,pan:(s-2)*.2}),Pe(Q(r+12),n+t*.45+.02*s,1.8,{vol:.03,ratio:2,idx:.7})})}),ge(n+.9,50,.8)},lose:()=>{const n=je();[62,60,57,55,50].forEach((e,t)=>Ee(Q(e),n+t*.5,2,{type:"sawtooth",vol:.07,lp:900,lpEnd:150,det:10,att:.1})),Ee(Q(26),n,3,{vol:.2,att:.4,pad:!0})},msg:()=>{const n=je();Pe(Q(93),n,.5,{vol:.05,ratio:2,idx:.6}),Pe(Q(98),n+.08,.6,{vol:.04,ratio:2,idx:.6})}},mo=new Map;function Jg(n){mo.has(n)||(mo.set(n,null),fetch(`/TCG/sfx/${n}.mp3`).then(e=>{e.ok&&(e.headers.get("content-type")||"").startsWith("audio")&&mo.set(n,e.url)}).catch(()=>{}))}const mt=(n,e,t=.07,r=.06,s=2,i=1.4)=>e.forEach((a,c)=>Pe(Q(a),n+c*t,1.5,{vol:r,ratio:s,idx:i,pan:(c-(e.length-1)/2)*.25})),Ja=(n,e,t=.06,r=.07)=>e.forEach((s,i)=>Ee(Q(s),n+i*t,1.1,{type:"triangle",vol:r,pan:(i-(e.length-1)/2)*.2})),gn=(n,e,t=.9,r=.1)=>Ee(Q(e),n,t,{type:"sawtooth",vol:r,lp:500,lpEnd:2600,att:.12,det:8}),Mt=(n,e,t=1,r=.14,s=-8)=>Ee(Q(e),n,t,{type:"sawtooth",vol:r,slide:s,lp:1800,lpEnd:90,det:14,att:.02}),Xa=(n,e,t=1.2,r=.1)=>Ee(Q(e),n,t,{type:"sawtooth",vol:r,slide:5,lp:1500,lpEnd:600,vib:25,att:.2}),Lt=(n,e,t=1.6,r=.04)=>e.forEach((s,i)=>Ee(Q(s),n,t,{type:"sawtooth",vol:r,pad:!0,att:.5,rel:.8,lp:1400,vib:12,det:6,pan:(i-(e.length-1)/2)*.3})),Rt=(n,e,t,r=.6,s=.12,i=.3)=>Ne(n,r,{type:"bandpass",f0:e,f1:t,q:.9,vol:s,att:i}),no=(n,e=.5,t=.08)=>Ne(n,e,{type:"highpass",f0:5e3,f1:9e3,vol:t,att:.1}),Os=(n,e=1,t=.2)=>Ne(n,e,{type:"lowpass",f0:900,f1:80,q:.7,vol:t,att:.06}),gt=(n,e,t=.07)=>{Pe(Q(e),n,1.6,{vol:t,ratio:1.41,idx:3}),Pe(Q(e+7),n+.02,1.3,{vol:t*.7,ratio:2.76,idx:2})},Ms=(n,e,t=.05,r=.1)=>{for(let s=0;s<e;s++)Ne(n+s*t,.04,{type:"highpass",f0:3e3,f1:6e3,vol:r,pan:s%2?.3:-.3})},Ya=(n,e,t=.05,r=.09)=>{for(let s=0;s<e;s++)Ne(n+s*t,.09,{type:"bandpass",f0:1500,f1:600,q:1,vol:r,att:.02,pan:s%2?.4:-.4})},Xg={lum_acolita:n=>{mt(n,[84,88,91],.08,.05),Ja(n+.05,[76,79],.1,.05)},lum_vigia:n=>{gn(n,57,.5,.08),mt(n+.2,[88],.1,.05),ge(n,55,.4)},lum_centinela:n=>{gt(n,62),gt(n+.1,69,.05),ge(n,50,.7)},lum_portador:n=>{Ja(n,[72,76,79,84],.07),Rt(n,800,4e3,.5,.08)},lum_halcon:n=>{Rt(n,3e3,800,.4,.12,.05),Ya(n+.05,5,.04),mt(n+.3,[96],.1,.05)},lum_novicia:n=>{Lt(n,[69,72,76],1.2),mt(n+.2,[81],.1,.05)},lum_sanadora:n=>{Ja(n,[67,71,74,79,83],.08),Lt(n,[67,74],1.5)},lum_vidente:n=>{mt(n,[88,93,98],.12),Rt(n,2e3,6e3,.7,.06,.4)},lum_oraculo:n=>{Lt(n,[62,69,74],1.7),mt(n+.2,[86,90],.15),no(n,.6,.05)},lum_paladin:n=>{gn(n,50,.9,.12),gt(n+.05,67),Ya(n+.1,6,.05,.07)},lum_heraldo:n=>{gn(n,62,.8),gn(n+.15,69,.8),mt(n+.3,[93],.1)},lum_coloso:n=>{ge(n,43,1),gt(n,38,.09),Lt(n,[50,57],1.6),ge(n+.2,40,.7)},lum_lider:n=>{gn(n,55,.5),gn(n+.25,62,.5),gn(n+.5,67,.9,.12),gt(n+.5,74),ge(n+.5,48,.8)},lum_serafin:n=>{Ya(n,10,.045),Lt(n,[74,81,86,93],2),mt(n+.3,[98,105],.15)},lum_arcangel:n=>{ge(n,40,1),gn(n,45,1.4,.14),Lt(n,[57,64,69,76],2.2),mt(n+.4,[93,100,105],.14),Rt(n,500,7e3,.9,.1,.5)},umb_sombra:n=>{Rt(n,1500,300,.6,.12,.08),Mt(n,45,.7,.06,-5)},umb_aprendiz:n=>{Ms(n,4,.06),Mt(n+.1,52,.4,.08,-4)},umb_acechador:n=>{no(n,.35,.1),gt(n+.05,86,.04),ge(n+.05,48,.5)},umb_cultista:n=>{Lt(n,[45,48,52],1.5,.05),mt(n+.2,[63,69],.2,.05,1.41,2.5)},umb_espectro:n=>{Rt(n,4e3,500,.5,.1,.05),Ee(Q(88),n,.7,{vol:.06,slide:-14,vib:30})},umb_esqueleto:n=>{Ms(n,8,.04,.12),ge(n+.1,55,.5),gt(n+.3,60,.03)},umb_reptante:n=>{no(n,.9,.1),Mt(n,40,.9,.1,-3),Ms(n+.3,3,.08,.08)},umb_lobo:n=>{Xa(n,57,1.3),Mt(n,40,.6,.1)},umb_sanguijuela:n=>{Ne(n,.5,{type:"lowpass",f0:900,f1:200,vol:.18,att:.15}),Ee(Q(52),n,.6,{vol:.08,slide:7,vib:40})},umb_ritualista:n=>{Lt(n,[45,51,58],1.8,.05),mt(n+.15,[63,69],.2,.05,1.41,2.5),Rt(n,400,2500,.8,.06,.4)},umb_golem:n=>{ge(n,36,1),gt(n,40,.1),Os(n,1,.2),gt(n+.18,43,.07)},umb_verdugo:n=>{Rt(n,3e3,400,.3,.12,.05),gt(n+.2,50,.1),ge(n+.2,38,.9),Mt(n+.2,38,.8,.1)},umb_jinete:n=>{[0,.12,.24,.36].forEach((e,t)=>ge(n+e,t%2?55:60,.6)),Xa(n+.3,69,1,.08),Rt(n,600,3e3,.7,.08,.3)},umb_basalto:n=>{ge(n,38,1),Os(n,1.1,.2),gt(n,43,.08),Ms(n+.1,3,.07,.1)},umb_devoradora:n=>{Mt(n,35,1.4,.15,-9),no(n,.8,.09),mt(n+.2,[58,64],.15,.05,1.41,3),Xa(n+.3,45,1.1,.06)},umb_azote:n=>{Rt(n,800,5e3,.3,.14,.04),gt(n+.1,74,.08),Mt(n+.1,43,.6,.12),Ms(n+.15,3,.05)},umb_behemot:n=>{ge(n,34,1),ge(n+.35,34,.8),Mt(n,31,1.6,.2,-6),Os(n,1.2,.22)},umb_abisal:n=>{Mt(n,29,2,.2,-10),Lt(n,[34,41,46],2.4,.05),Os(n,1.6,.18),mt(n+.3,[58,65],.2,.05,1.41,3)},umb_senor:n=>{ge(n,32,1),Lt(n,[38,45,50,57],2.4,.05),gt(n+.05,33,.12),Rt(n,300,4e3,1,.08,.5),mt(n+.5,[69,75],.2,.05,1.41,3)},umb_titan:n=>{[0,.3,.6].forEach(e=>ge(n+e,30,1)),Mt(n,26,2.2,.22,-8),Os(n,1.8,.24),gt(n+.6,36,.12)}};for(const[n,e]of Object.entries(Xg))Hr["u_"+n]=()=>e(je());function Yg(n){if(!Pt)try{nl(),(Hr["u_"+n]??Hr[n.startsWith("umb")?"summon_umb":"summon_lum"])()}catch{}}function de(n){var t;if(Pt)return;Jg(n);const e=mo.get(n);if(e){const r=new Audio(e);r.volume=.7,r.play().catch(()=>{});return}try{nl(),(t=Hr[n])==null||t.call(Hr)}catch{}}const go=60/72,_o=go*4,Zg=[38,34,41,36],e_=[[62,65,69,74],[58,62,65,70],[57,60,65,69],[55,60,64,67]],lh=[62,65,67,69,72,74,77];function t_(n,e){if(Pt||document.hidden)return;Qa+=(nf-Qa)*.5;const t=e%4,r=e_[t],s=Qa,i=Gs;if(r.forEach((c,l)=>Ee(Q(c),n,_o*1.08,{type:"sawtooth",vol:.02,att:1.2,pad:!0,rel:1.3,lp:650+s*900,det:8+l*2,pan:(l-1.5)*.35,bus:i})),Ee(Q(Zg[t]),n,_o*1.02,{vol:.15,att:.25,pad:!0,rel:1,bus:i}),[0,2,1,3,2,1,3,2].forEach((c,l)=>{if(Math.random()<(s?.9:.7)){const h=r[c]+(l%4===3&&Math.random()<.4?12:0)+12;Ee(Q(h),n+l*go/2,1.1,{type:"triangle",vol:.035+s*.01,pan:Math.sin(l)*.5,bus:i})}}),e%2===0&&Math.random()<.7&&Pe(Q(lh[Math.floor(Math.random()*lh.length)]+12),n+go*(Math.random()<.5?0:2),3,{vol:.045,ratio:2,idx:.7,pan:Us(-.5,.5),bus:i}),t===0&&ge(n,44,.35,i),s>.5)for(let c=0;c<4;c++)ge(n+c*go,c%2?80:58,c===2?.28:.18,i);for(let c=0;c<4;c++)Math.random()<.6&&Ne(n+Us(0,_o),.03,{type:"highpass",f0:4e3,f1:3e3,vol:Us(.008,.02),pan:Us(-.8,.8),bus:i})}function n_(){const n=W.createBufferSource(),e=W.createBiquadFilter(),t=W.createGain(),r=W.createOscillator(),s=W.createGain();n.buffer=rf(),n.loop=!0,e.type="bandpass",e.frequency.value=420,e.Q.value=.9,t.gain.value=.045,r.frequency.value=.07,s.gain.value=.03,r.connect(s).connect(t.gain);const i=W.createOscillator(),a=W.createGain();return i.frequency.value=.05,a.gain.value=250,i.connect(a).connect(e.frequency),n.connect(e).connect(t).connect(Gs),n.start(),r.start(),i.start(),()=>{t.gain.setTargetAtTime(0,W.currentTime,.4),setTimeout(()=>{n.stop(),r.stop(),i.stop()},2e3)}}function r_(){ah||(nl(),ah=!0,ch=0,to=W.currentTime+.15,n_(),window.setInterval(()=>{for(;to<W.currentTime+1.3;)t_(to,ch++),to+=_o},400))}const s_={lum:[45,168],umb:[272,350],fire:[22,48],heal:[145,50]},Ie=Math.random,L=(n,e)=>n+Ie()*(e-n),Za=n=>1-(1-n)**3;let Pr,D,Zr=0,Nn=0,yc=!1,vc=0;const Nr=[];function J(n){Nr.push({x:0,y:0,vx:0,vy:0,g:0,d:1,t:0,life:600,delay:0,sz:4,gr:0,rot:0,vr:0,h:45,s:100,l:70,a:1,n:0,w:2,add:!0,x1:0,y1:0,bulge:0,pts:[],cx:0,cy:0,ang:0,rad:0,va:0,vrad:0,...n}),yc||(yc=!0,vc=performance.now(),requestAnimationFrame(sf))}const ni=(n,e)=>setTimeout(e,n);function sf(n){const e=Math.min(40,n-vc),t=e/16.667;vc=n,D.clearRect(0,0,Zr,Nn);for(let r=Nr.length-1;r>=0;r--){const s=Nr[r];if(s.delay>0){s.delay-=e;continue}if(s.t+=e,s.t>=s.life){Nr.splice(r,1);continue}if(s.k==="vort"){if(s.ang+=s.va*e,s.rad+=s.vrad*e,s.rad<2){Nr.splice(r,1);continue}s.x=s.cx+Math.cos(s.ang)*s.rad,s.y=s.cy+Math.sin(s.ang)*s.rad}else{s.vy+=s.g*t;const i=s.d**t;s.vx*=i,s.vy*=i,s.x+=s.vx*t,s.y+=s.vy*t,s.rot+=s.vr*t}i_(s)}D.globalCompositeOperation="source-over",Nr.length?requestAnimationFrame(sf):(yc=!1,D.clearRect(0,0,Zr,Nn))}function i_(n){const e=n.t/n.life,t=1-e,r=s=>`hsla(${n.h},${n.s}%,${n.l}%,${Math.max(0,s)})`;switch(D.globalCompositeOperation=n.add?"lighter":"source-over",n.k){case"spark":D.lineCap="round",D.strokeStyle=r(t*.45),D.lineWidth=n.sz*2.6*t+1,D.beginPath(),D.moveTo(n.x,n.y),D.lineTo(n.x-n.vx*2.6,n.y-n.vy*2.6),D.stroke(),D.strokeStyle=`hsla(${n.h},60%,92%,${t})`,D.lineWidth=n.sz*t+.4,D.stroke();break;case"glow":case"smoke":case"vort":{const s=Math.max(1,n.sz*(1+n.gr*(n.k==="vort"?0:e))),i=n.a*(n.k==="smoke"?Math.min(1,e*6)*t:t),a=D.createRadialGradient(n.x,n.y,0,n.x,n.y,s);a.addColorStop(0,r(i)),a.addColorStop(.4,r(i*.45)),a.addColorStop(1,r(0)),D.fillStyle=a,D.beginPath(),D.arc(n.x,n.y,s,0,6.3),D.fill();break}case"ring":D.strokeStyle=r(n.a*t),D.lineWidth=n.w*t+.6,D.beginPath(),D.arc(n.x,n.y,n.sz+n.gr*Za(e),0,6.3),D.stroke();break;case"shard":D.save(),D.translate(n.x,n.y),D.rotate(n.rot),D.fillStyle=r(t*.95),D.beginPath(),D.moveTo(0,-n.sz),D.lineTo(n.sz*.45,n.sz*.6),D.lineTo(-n.sz*.4,n.sz*.5),D.closePath(),D.fill(),D.strokeStyle=`hsla(${n.h},40%,95%,${t})`,D.lineWidth=1,D.stroke(),D.restore();break;case"rune":{const s=n.sz*Za(Math.min(1,e*2.6)),i=n.a*(e<.12?e/.12:e>.6?(1-e)/.4:1),a=n.rot+n.vr*n.t;D.strokeStyle=r(i),D.lineWidth=2.2,D.beginPath(),D.arc(n.x,n.y,s,0,6.3),D.stroke(),D.lineWidth=1,D.beginPath(),D.arc(n.x,n.y,s*.84,0,6.3),D.stroke(),D.lineWidth=1.6,D.beginPath();for(let c=0;c<n.n;c++){const l=a+c/n.n*6.283,h=c%2?.93:.88;D.moveTo(n.x+Math.cos(l)*s*.84,n.y+Math.sin(l)*s*.84),D.lineTo(n.x+Math.cos(l)*s*(h+.07),n.y+Math.sin(l)*s*(h+.07))}if(D.stroke(),n.w>2){const c=n.w,l=c%2?(c-1)/2:c/2-1||1;D.lineWidth=1.8,D.beginPath();for(let h=0;h<=c;h++){const f=-a*.7-1.5708+h*l%c/c*6.283,p=n.x+Math.cos(f)*s*.8,_=n.y+Math.sin(f)*s*.8;h?D.lineTo(p,_):D.moveTo(p,_)}D.stroke()}break}case"pillar":{const s=n.sz*(.35+.65*Math.sin(Math.min(1,e*1.4)*1.57))*(e>.6?(1-e)/.4:1),i=n.a*(e<.1?e/.1:e>.55?(1-e)/.45:1),a=D.createLinearGradient(n.x-s,0,n.x+s,0);a.addColorStop(0,r(0)),a.addColorStop(.5,r(i)),a.addColorStop(1,r(0));const c=D.createLinearGradient(0,n.y-n.gr,0,n.y);c.addColorStop(0,"rgba(255,255,255,0)"),c.addColorStop(.4,"rgba(255,255,255,1)"),c.addColorStop(1,"rgba(255,255,255,0)"),D.fillStyle=a,D.fillRect(n.x-s,n.y-n.gr,s*2,n.gr);break}case"bolt":if(Ie()<.25)break;D.lineJoin="round",D.strokeStyle=r(t*.7),D.lineWidth=n.sz*3,D.beginPath(),n.pts.forEach((s,i)=>i?D.lineTo(s[0],s[1]):D.moveTo(s[0],s[1])),D.stroke(),D.strokeStyle=`hsla(${n.h},50%,96%,${t})`,D.lineWidth=n.sz*.8,D.stroke();break;case"slash":{const s=Za(Math.min(1,e*4)),i=n.x+(n.x1-n.x)*s,a=n.y+(n.y1-n.y)*s,c=(n.x+i)/2,l=(n.y+a)/2,h=-(a-n.y),f=i-n.x,p=Math.hypot(h,f)||1,_=n.bulge*s,I=h/p*_,R=f/p*_;D.beginPath(),D.moveTo(n.x,n.y),D.quadraticCurveTo(c+I,l+R,i,a),D.quadraticCurveTo(c+I*.3,l+R*.3,n.x,n.y),D.fillStyle=`hsla(${n.h},60%,96%,${t})`,D.shadowColor=`hsl(${n.h},100%,60%)`,D.shadowBlur=24,D.fill(),D.shadowBlur=0,D.strokeStyle=r(t*.7),D.lineWidth=3,D.stroke();break}}}const ot=(n,e=0)=>s_[n][e];function or(n,e,t,r,s,i={}){for(let a=0;a<t;a++){const c=i.rot??Ie()*6.283,l=L(.35,1)*s,h=i.rot!==void 0?L(-.5,.5):0;J({k:"spark",x:n,y:e,vx:Math.cos(c+h)*l,vy:Math.sin(c+h)*l,g:.16,d:.93,life:L(420,820),sz:L(1.6,3),h:ot(r,Ie()<.35?1:0),l:66,...i,rot:0})}}function Vo(n,e,t,r,s=L(-.9,-.5)){const i=Math.cos(s)*t,a=Math.sin(s)*t;J({k:"slash",x:n-i,y:e-a,x1:n+i,y1:e+a,bulge:t*.28,life:420,h:ot(r),s:100,l:66,add:!0}),J({k:"slash",x:n-i*.8,y:e-a*.8+t*.12,x1:n+i*.9,y1:e+a*.9+t*.12,bulge:t*.2,life:360,delay:60,h:ot(r,1),s:100,l:70,add:!0})}function ri(n,e,t,r,s=1){J({k:"glow",x:n,y:e,sz:t*.95,gr:1.1,life:420,h:ot(r),l:78,a:.95}),J({k:"glow",x:n,y:e,sz:t*.38,gr:.3,life:180,h:50,s:40,l:96,a:1}),J({k:"ring",x:n,y:e,sz:t*.12,gr:t*1.05,w:7,life:520,h:ot(r),l:72}),J({k:"ring",x:n,y:e,sz:t*.1,gr:t*.75,w:3,life:480,delay:90,h:ot(r,1),l:74}),Vo(n,e,t*.8,r),or(n,e,Math.round(26*s),r,t*.1);for(let i=0;i<7*s;i++){const a=Ie()*6.283,c=L(2,6)*t/110;J({k:"shard",x:n,y:e,vx:Math.cos(a)*c,vy:Math.sin(a)*c-1.5,g:.2,d:.97,rot:Ie()*6,vr:L(-.25,.25),sz:t*L(.05,.1),life:L(520,860),h:ot(r,i%2),l:62})}for(let i=0;i<3;i++)J({k:"smoke",x:n+L(-8,8),y:e,vx:L(-.5,.5),vy:L(-.7,-.1),d:.98,sz:t*L(.3,.5),gr:1,life:L(700,1e3),a:.3,h:r==="umb"?272:30,s:40,l:r==="umb"?30:60})}const Do=n=>n.getBoundingClientRect();function of(){const n=document.getElementById("app");n&&(n.classList.remove("shk-soft","shk-hard"),n.offsetWidth,n.classList.add("shk-hard"))}function o_(n,e,t,r){const a=e.width,c=e.height,l=e.left+a/2,h=e.top+c/2,f=Array.from({length:5},(V,x)=>Array.from({length:4},(H,q)=>[q/3*a+(q&&q<3?L(-.09,.09)*a:0),x/4*c+(x&&x<4?L(-.07,.07)*c:0)])),p=n.cloneNode(!0);p.classList.remove("dying","enter","hurt","boost"),p.removeAttribute("data-a"),p.removeAttribute("data-uid"),p.style.cssText=`--w:${a}px;position:fixed;left:${e.left}px;top:${e.top}px;width:${a}px;height:${c}px;margin:0;animation:none;transition:none;pointer-events:none;z-index:90;will-change:transform,opacity`;const _=document.createDocumentFragment(),I=[],R=[];for(let V=0;V<4;V++)for(let x=0;x<3;x++){const H=f[V][x],q=f[V][x+1],$=f[V+1][x+1],z=f[V+1][x],ae=(x+V)%2;for(const B of ae?[[H,q,z],[q,$,z]]:[[H,q,$],[H,$,z]]){const y=p.cloneNode(!0),g=(B[0][0]+B[1][0]+B[2][0])/3,v=(B[0][1]+B[1][1]+B[2][1])/3;y.style.clipPath=`polygon(${B.map(me=>me[0].toFixed(1)+"px "+me[1].toFixed(1)+"px").join(",")})`;const w=g-a/2,T=v-c/2,b=Math.hypot(w,T)||1,E=L(.8,1.9)*a*.55*r,Ce=L(-240,240)*r;_.append(y),R.push(y),I.push(y.animate([{transform:"translate(0,0) rotate(0)",opacity:1,filter:"brightness(2.6) saturate(1.4)"},{transform:`translate(${w/b*E*.55}px,${T/b*E*.55-c*.12}px) rotate(${Ce*.5}deg)`,opacity:1,filter:"brightness(1.2)",offset:.35},{transform:`translate(${w/b*E}px,${T/b*E+c*L(.5,1)}px) rotate(${Ce}deg) scale(.8)`,opacity:0,filter:"brightness(.6)"}],{duration:L(650,1e3),easing:"cubic-bezier(.2,.7,.4,1)",fill:"forwards"}))}}document.body.append(_),Promise.allSettled(I.map(V=>V.finished)).then(()=>R.forEach(V=>V.remove())),J({k:"glow",x:l,y:h,sz:a*1.1,gr:.6,life:380,h:ot(t),l:85,a:.8}),J({k:"ring",x:l,y:h,sz:a*.2,gr:a*1.2*r,w:6,life:520,h:ot(t),l:78})}function a_(n,e,t,r){D&&(J({k:"glow",x:n,y:e,sz:t*1.3,gr:.5,life:260,h:48,s:40,l:96,a:1}),ri(n,e,t*1.15,r,1.4),ri(n,e,t*.7,"fire",1),of())}function c_(n,e,t){if(!D)return;const r=performance.now();let s=NaN,i=NaN;const a=()=>{if(!n.isConnected||performance.now()-r>e)return;const c=Do(n),l=c.left+c.width/2,h=c.top+c.height/2,f=c.width;if(!isNaN(s)){const p=Math.hypot(l-s,h-i),_=Math.min(14,Math.ceil(p/(f*.16)));if(p>1.5)for(let I=1;I<=_;I++){const R=I/_,V=s+(l-s)*R,x=i+(h-i)*R;J({k:"glow",x:V,y:x,sz:f*L(.42,.6),gr:-.35,life:360,h:ot(t,I%2),l:68,a:.42}),Ie()<.4&&J({k:"spark",x:V+L(-f*.3,f*.3),y:x+L(-f*.3,f*.3),vx:-(l-s)*.08,vy:-(h-i)*.08,g:0,d:.92,life:L(260,440),sz:1.8,h:ot(t),l:78})}}s=l,i=h,requestAnimationFrame(a)};requestAnimationFrame(a)}function l_(n,e,t){J({k:"glow",x:n,y:e,sz:t*.9,gr:.6,life:1100,h:46,l:82,a:.55}),J({k:"pillar",x:n,y:Nn,sz:t*.55,gr:Nn*1.1,life:1250,h:48,l:76,a:.7}),J({k:"rune",x:n,y:e,sz:t,n:28,w:8,life:1500,rot:0,vr:7e-4,h:46,l:72,a:.95}),J({k:"rune",x:n,y:e,sz:t*.62,n:18,w:6,life:1400,delay:80,rot:1,vr:-.0011,h:168,l:70,a:.85});for(let r=0;r<46;r++){const s=Ie()*6.283,i=L(.2,1)*t;J({k:"glow",x:n+Math.cos(s)*i,y:e+Math.sin(s)*i*.55+t*.3,vx:L(-.3,.3),vy:-L(.8,3.2),g:-.01,d:.995,sz:L(3,8),life:L(800,1500),delay:Ie()*600,h:Ie()<.3?168:48,l:82,a:.9})}ni(460,()=>{J({k:"ring",x:n,y:e,sz:t*.2,gr:t*2.1,w:10,life:800,h:48,l:80}),J({k:"ring",x:n,y:e,sz:t*.1,gr:t*1.5,w:4,life:700,h:168,l:80}),J({k:"glow",x:n,y:e,sz:t*1.3,gr:.5,life:500,h:50,s:40,l:96,a:.8}),or(n,e,44,"lum",t*.085)})}function u_(n,e,t){J({k:"smoke",x:n,y:e,sz:t*1.2,gr:.8,life:1500,h:270,s:60,l:14,a:.55,add:!1}),J({k:"rune",x:n,y:e,sz:t,n:20,w:5,life:1500,rot:0,vr:-9e-4,h:350,l:62,a:.95}),J({k:"rune",x:n,y:e,sz:t*.66,n:12,w:0,life:1400,delay:70,rot:2,vr:.0012,h:272,l:68,a:.85});for(let r=0;r<80;r++)J({k:"vort",cx:n,cy:e,ang:Ie()*6.283,rad:L(.55,1.5)*t,va:L(.0035,.006),vrad:-L(6e-4,.0011)*t,sz:L(3,7),life:1200,delay:Ie()*350,h:Ie()<.5?272:350,l:68,a:.9});ni(720,()=>{J({k:"glow",x:n,y:e,sz:t*1.1,gr:.8,life:520,h:300,s:90,l:70,a:.85}),J({k:"ring",x:n,y:e,sz:t*.15,gr:t*2.2,w:11,life:800,h:350,l:62}),J({k:"ring",x:n,y:e,sz:t*.1,gr:t*1.6,w:4,life:740,delay:80,h:272,l:72}),or(n,e,52,"umb",t*.09);for(let r=0;r<7;r++){const s=Ie()*6.283,i=[[n,e]];let a=n,c=e,l=s;for(let h=0;h<9;h++)l+=L(-.55,.55),a+=Math.cos(l)*t*.17,c+=Math.sin(l)*t*.17,i.push([a,c]);J({k:"bolt",pts:i,sz:2.4,life:520,h:r%2?350:280,l:66})}for(let r=0;r<8;r++){const s=Ie()*6.283,i=L(3,8);J({k:"shard",x:n,y:e,vx:Math.cos(s)*i,vy:Math.sin(s)*i,d:.965,rot:Ie()*6,vr:L(-.3,.3),sz:L(8,16),life:800,h:r%2?350:272,l:58})}for(let r=0;r<6;r++)J({k:"smoke",x:n+L(-30,30),y:e+L(-20,20),vx:L(-1,1),vy:L(-1,.2),d:.985,sz:t*L(.3,.55),gr:1.1,life:1300,h:275,s:55,l:16,a:.5,add:!1})})}function h_(n,e,t,r){const s=document.createElement("div");s.className="dmgnum "+r,s.textContent=t,s.style.left=n+"px",s.style.top=e+"px",document.body.append(s),setTimeout(()=>s.remove(),1500)}function d_(n,e){var R;const t=n.closest(".pt"),r=t==null?void 0:t.querySelector(".ava"),s=r?Do(r):e,i=!!(t!=null&&t.classList.contains("me")),a=(((R=n.querySelector(".fx"))==null?void 0:R.textContent)??"").trim(),c=Math.abs(parseInt(a.replace(/[^\d-]/g,""),10)||3),l=Math.min(2,.8+c*.13),h=s.left+s.width/2,f=s.top+s.height/2,p=s.width*2.3*l;J({k:"glow",x:h,y:f,sz:p*1.35,gr:.9,life:560,h:358,l:62,a:1}),J({k:"glow",x:h,y:f,sz:p*.55,gr:.4,life:240,h:40,s:30,l:97,a:1}),J({k:"ring",x:h,y:f,sz:p*.15,gr:p*1.7,w:14,life:760,h:355,l:62}),J({k:"ring",x:h,y:f,sz:p*.1,gr:p*1.2,w:7,life:700,delay:80,h:25,l:68}),J({k:"ring",x:h,y:f,sz:p*.1,gr:p*2.4,w:3,life:900,delay:170,h:350,l:70}),Vo(h,f,p*.95,"fire",-.75),Vo(h,f,p*.95,"umb",.75);for(let V=0;V<16;V++){const x=V/16*6.283+L(-.1,.1);or(h,f,1,"fire",p*.26,{rot:x,life:L(380,620),sz:3.4})}or(h,f,Math.round(60*l),"fire",p*.12),or(h,f,24,"umb",p*.1);for(let V=0;V<16;V++){const x=Ie()*6.283,H=L(3,9)*p/140;J({k:"shard",x:h,y:f,vx:Math.cos(x)*H,vy:Math.sin(x)*H-2,g:.24,d:.975,rot:Ie()*6,vr:L(-.3,.3),sz:p*L(.05,.11),life:L(600,1e3),h:V%3?355:28,l:60})}for(let V=0;V<5;V++)J({k:"smoke",x:h+L(-14,14),y:f,vx:L(-.8,.8),vy:L(-1,-.2),d:.985,sz:p*L(.3,.5),gr:1.1,life:L(900,1300),a:.35,h:355,s:50,l:22,add:!1});ni(140,()=>{ri(h,f,p*.6,"fire",1),or(h,f,30,"fire",p*.14)});const _=document.createElement("div");_.className="nexflash"+(i?" mine":" foe"),document.body.append(_),setTimeout(()=>_.remove(),900);const I=document.getElementById("app");I&&(I.classList.remove("shk-soft","shk-hard"),I.offsetWidth,I.classList.add("shk-hard")),h_(h,f-s.height*.15,a||"−"+c,i?"mine":"foe")}let uh=-1e9,ec="lum";const ro=new Map,er=(n,e)=>{const t=performance.now();return t-(ro.get(n)??-1e9)<e?!1:(ro.set(n,t),ro.size>80&&ro.clear(),!0)},hh=n=>n.classList.contains("umb")?"umb":"lum";function f_(n){const e=Do(n),t=e.left+e.width/2,r=e.top+e.height/2,s=n.className.split(" ")[0]+Math.round(t/24)+","+Math.round(r/24),i=n.classList;if(i.contains("cast")){if(!er("cast",500))return;const a=document.querySelector(".plane-wrap"),c=a?Do(a):null,l=c?c.left+c.width/2:Zr/2,h=c?c.top+c.height*.5:Nn/2,f=Math.min(c?c.width:Zr,c?c.height:Nn)*.42;uh=performance.now(),ec=i.contains("umb")?"umb":"lum",(i.contains("umb")?u_:l_)(l,h,f)}else if(i.contains("card")&&i.contains("attacking")){if(!er("a"+s,800))return;const a=hh(n),c=i.contains("up")?-1:1,l=e.width;J({k:"glow",x:t,y:r,sz:l*.95,gr:.2,life:520,h:ot(a),l:70,a:.6});for(let h=0;h<18;h++){const f=Ie()*6.283,p=l*L(.8,1.5);J({k:"vort",cx:t,cy:r,ang:f,rad:p,va:.004,vrad:-p/360,sz:L(2.5,5),life:380,delay:Ie()*90,h:ot(a,h%3?0:1),l:76,a:.9})}ni(430,()=>{const h=t,f=r+c*(e.height*.5+46);for(let p=0;p<12;p++)J({k:"spark",x:t+L(-l*.4,l*.4),y:r+c*e.height*.3,vx:L(-1.2,1.2),vy:-c*L(3,9),g:0,d:.93,life:L(260,480),sz:2,h:ot(a,p%2),l:72});J({k:"ring",x:h,y:f,sz:l*.1,gr:l*.95,w:6,life:380,h:ot(a),l:76}),Vo(h,f,l*.75,a,c<0?L(-2.5,-2.1):L(.55,1))})}else if(i.contains("card")&&i.contains("dying")){if(!er("d"+s,900))return;const a=hh(n),c=e.width,l=performance.now()-uh<2200,h=l?ec:a;n.style.animation="none",ni(l?ec==="umb"?720:460:0,()=>{n.style.opacity="0",o_(n,e,h,l?1.7:1.15),ri(t,r,c*1.05,h,l?1.5:1.1),l&&of();for(let f=0;f<14;f++)J({k:"glow",x:t+L(-c*.35,c*.35),y:r+L(-c*.2,c*.3),vx:L(-.3,.3),vy:-L(.6,2),g:-.008,sz:L(3,7),life:L(900,1500),delay:Ie()*250,h:ot(h,f%2),l:80,a:.9})})}else if(i.contains("card")&&i.contains("hurt")){if(!er("h"+s,500))return;ri(t,r,e.width*.75,"fire",.7)}else if(i.contains("card")&&i.contains("boost")){if(!er("b"+s,500))return;J({k:"ring",x:t,y:r+e.height*.2,sz:e.width*.2,gr:e.width*.8,w:4,life:600,h:145,l:74});for(let a=0;a<16;a++)J({k:"glow",x:t+L(-e.width*.4,e.width*.4),y:r+e.height*.35,vy:-L(1,3.2),g:-.02,d:.99,sz:L(3,6),life:L(600,1e3),delay:Ie()*250,h:Ie()<.5?145:48,l:78,a:.9})}else if(i.contains("orb")&&i.contains("hit")){if(!er("oh"+s,700))return;d_(n,e)}else if(i.contains("orb")&&i.contains("heal")){if(!er("oe"+s,700))return;J({k:"ring",x:t,y:r,sz:e.width*.3,gr:e.width*1.5,w:5,life:700,h:145,l:74}),J({k:"glow",x:t,y:r,sz:e.width*1.3,gr:.5,life:600,h:145,l:78,a:.7});for(let a=0;a<22;a++)J({k:"glow",x:t+L(-e.width,e.width),y:r+L(0,e.width*.6),vy:-L(1,3),g:-.02,d:.99,sz:L(3,7),life:L(700,1300),delay:Ie()*300,h:Ie()<.5?145:48,l:80,a:.9})}}const dh=".card.attacking,.card.dying,.card.hurt,.card.boost,.orb.hit,.orb.heal,.vfx.cast";function p_(){if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;Pr=document.createElement("canvas"),Pr.id="combatfx",document.body.append(Pr),D=Pr.getContext("2d");const n=()=>{const e=Math.min(2,devicePixelRatio||1);Zr=innerWidth,Nn=innerHeight,Pr.width=Zr*e,Pr.height=Nn*e,D.setTransform(e,0,0,e,0,0)};n(),addEventListener("resize",n),new MutationObserver(e=>{const t=[];e.forEach(r=>r.addedNodes.forEach(s=>{s instanceof HTMLElement&&(s.matches(dh)&&t.push(s),s.querySelectorAll(dh).forEach(i=>t.push(i)))})),t.sort((r,s)=>+s.classList.contains("cast")-+r.classList.contains("cast")).forEach(f_)}).observe(document.body,{childList:!0,subtree:!0})}const ie=(n,e,t,r,s,i=[],a="",c=[],l)=>({id:n,name:e,cost:t,type:"unit",atk:r,hp:s,kw:i,text:a,fx:c,grow:l}),be=(n,e,t,r,s,i)=>({id:n,name:e,cost:t,type:"spell",atk:0,hp:0,kw:[],text:s,fx:i,speed:r}),No=[ie("lum_acolita","Acólita del Alba",1,1,1,[],"Al jugarla: cura 2 a tu Nexo.",[{t:"healNexus",n:2}]),ie("lum_vigia","Vigía del Alba",1,1,2,["regenera"]),ie("lum_centinela","Centinela Radiante",2,2,2,["barrera"]),ie("lum_portador","Portador de Luz",2,2,1,[],"Al jugarla: +1/+1 a otra aliada.",[{t:"buffOther",a:1,h:1}]),ie("lum_halcon","Halcón Dorado",2,3,1,["elusivo"]),ie("lum_novicia","Novicia Curandera",2,1,3,["robovida"]),ie("lum_sanadora","Sanadora de Aurora",3,3,3,["robovida"]),ie("lum_vidente","Vidente del Alba",3,2,3,[],"Al jugarla: roba 1.",[{t:"draw",n:1}]),ie("lum_oraculo","Oráculo Sereno",3,2,2,[],"Al jugarla: roba 1 y cura 2 a tu Nexo.",[{t:"draw",n:1},{t:"healNexus",n:2}]),ie("lum_paladin","Paladín Alado",4,3,4,["barrera"]),ie("lum_heraldo","Heraldo Solar",4,2,3,[],"Al jugarla: +1/+1 a tus unidades.",[{t:"buffAll",a:1,h:1}]),ie("lum_coloso","Coloso de Marfil",5,4,4,["barrera","robovida"]),ie("lum_lider","Capitana Aurora",5,4,5,["rapido","retador"]),ie("lum_serafin","Serafín Eterno",6,5,6,["elusivo","robovida"]),ie("lum_arcangel","Arcángel del Amanecer",7,5,5,["barrera"],"Al jugarla: cura 4 a tu Nexo.",[{t:"healNexus",n:4}]),be("lum_destello","Destello Sanador",1,"burst","Cura 4 a tu Nexo.",[{t:"healNexus",n:4}]),be("lum_rocio","Rocío Vital",1,"burst","Cura 3 a una unidad aliada.",[{t:"healUnit",n:3}]),be("lum_fervor","Fervor",2,"burst","Una aliada gana +2/+0 esta ronda.",[{t:"tempBuff",a:2,h:0}]),be("lum_escudo","Escudo de Fe",2,"fast","Una aliada gana Barrera.",[{t:"giveKw",kw:"barrera"}]),be("lum_velo","Velo Etéreo",2,"fast","Una aliada gana Elusivo.",[{t:"giveKw",kw:"elusivo"}]),be("lum_absorcion","Luz Absorbente",2,"fast","Inflige 2 a una enemiga y cura 2 a tu Nexo.",[{t:"drain",n:2}]),be("lum_plegaria","Plegaria",3,"fast","Cura 5 a tu Nexo y roba 1.",[{t:"healNexus",n:5},{t:"draw",n:1}]),be("lum_resplandor","Resplandor",3,"fast","Tus unidades ganan +1/+1 esta ronda.",[{t:"tempBuffAll",a:1,h:1}]),be("lum_juicio","Juicio Radiante",4,"fast","Inflige 4 a una unidad enemiga.",[{t:"dmgEnemy",n:4}]),be("lum_escarcha","Escarcha Sagrada",3,"focus","Una unidad enemiga tiene 0 de poder esta ronda.",[{t:"frost"}]),be("lum_vision","Visión del Alba",2,"focus","Roba 2 cartas.",[{t:"draw",n:2}]),be("lum_bendicion","Bendición",2,"slow","Una aliada gana +2/+2.",[{t:"buffAlly",a:2,h:2}]),be("lum_renacer","Renacer",3,"slow","Una aliada gana Regeneración y se cura 4.",[{t:"giveKw",kw:"regenera"},{t:"healUnit",n:4}]),be("lum_estrellas","Lluvia de Estrellas",4,"slow","Inflige 2 a todas las unidades enemigas y cura 2 a tu Nexo.",[{t:"dmgAll",n:2},{t:"healNexus",n:2}]),be("lum_amanecer","Amanecer Eterno",6,"slow","Cura 6 a tu Nexo y +1/+1 a tus unidades.",[{t:"healNexus",n:6},{t:"buffAll",a:1,h:1}])],Oo=[ie("umb_sombra","Sombra Inquieta",1,2,1),ie("umb_aprendiz","Aprendiz de Huesos",1,1,2,["duro"]),ie("umb_acechador","Acechador Nocturno",2,1,1,["letal"]),ie("umb_cultista","Cultista del Vacío",2,3,3,[],"Al jugarla: tu Nexo recibe 1.",[{t:"hurtNexus",n:1}]),ie("umb_espectro","Espectro Fugaz",2,3,1,["rapido","efimero"]),ie("umb_esqueleto","Esqueleto Guardián",2,1,4,["duro"]),ie("umb_reptante","Reptante Abisal",3,2,3,["temible"]),ie("umb_lobo","Lobo de Ceniza",3,3,3,["arrollar"]),ie("umb_sanguijuela","Sanguijuela",3,3,2,["robovida"]),ie("umb_ritualista","Ritualista",3,2,2,[],"Al jugarla: sacrifica una aliada para robar 2.",[{t:"sacDraw",n:2}]),ie("umb_golem","Gólem de Hierro",3,2,5,["duro"]),ie("umb_verdugo","Verdugo Sombrío",4,3,3,["letal"]),ie("umb_jinete","Jinete Espectral",4,5,3,["arrollar"]),ie("umb_basalto","Centinela de Basalto",4,3,5,["duro"]),ie("umb_devoradora","Devoradora de Almas",5,4,4,[],"Gana +1/+1 cuando muere una aliada.",[],{a:1,h:1}),ie("umb_azote","Azote del Vacío",5,4,3,["rapido","arrollar"]),ie("umb_behemot","Behemot de Hierro",5,5,5,["duro"]),ie("umb_abisal","Coloso Abisal",6,5,5,["duro","robovida"]),ie("umb_senor","Señor de la Noche Eterna",7,6,6,["letal"]),ie("umb_titan","Titán Regenerante",8,7,7,["regenera","arrollar"]),be("umb_punalada","Puñalada",1,"burst","Inflige 2 a una unidad enemiga.",[{t:"dmgEnemy",n:2}]),be("umb_piel","Piel de Hierro",2,"burst","Una aliada gana Duro.",[{t:"giveKw",kw:"duro"}]),be("umb_embestida","Embestida",3,"focus","Inflige 3 al Nexo enemigo.",[{t:"dmgNexus",n:3}]),be("umb_furia","Furia Sombría",2,"fast","Una aliada gana +3/+0 esta ronda.",[{t:"tempBuff",a:3,h:0}]),be("umb_drenar","Drenar",3,"fast","Inflige 3 a una enemiga y cura 3 a tu Nexo.",[{t:"drain",n:3}]),be("umb_plaga","Plaga Sombría",3,"fast","Inflige 1 a todas las unidades enemigas.",[{t:"dmgAll",n:1}]),be("umb_pacto","Pacto de Sangre",2,"slow","Sacrifica tu unidad más débil; daña a una enemiga igual a su ataque.",[{t:"sacDmg"}]),be("umb_maldicion","Maldición de Sombras",4,"slow","Las unidades enemigas pierden 2/2.",[{t:"debuffEnemies",a:2,h:2}]),be("umb_aplastar","Aplastar",4,"slow","Inflige 5 a una unidad enemiga.",[{t:"dmgEnemy",n:5}]),be("umb_eclipse","Eclipse",6,"slow","Destruye una unidad enemiga y roba 1.",[{t:"destroyEnemy"},{t:"draw",n:1}])],re=Object.fromEntries([...No,...Oo].map(n=>[n.id,n])),m_=["lum_acolita","lum_vigia","lum_centinela","lum_portador","lum_novicia","lum_halcon","lum_destello","lum_rocio","lum_escudo","lum_bendicion"],g_=["umb_sombra","umb_aprendiz","umb_acechador","umb_esqueleto","umb_cultista","umb_lobo","umb_golem","umb_punalada","umb_furia","umb_drenar"],ct={Luminarae:[...No.map(n=>n.id),...m_],Umbra:[...Oo.map(n=>n.id),...g_]},Ur=30,Ws=2,ls=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),$s=n=>n.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);function aa(n){if(!Array.isArray(n))return"Mazo inválido";if(n.length!==Ur)return`Necesitas exactamente ${Ur} cartas (llevas ${n.length})`;const e={};for(const t of n){if(typeof t!="string"||!ls(re,t))return"Hay una carta desconocida";if((e[t]=(e[t]||0)+1)>Ws)return`Máximo ${Ws} copias de ${re[t].name}`}return null}const af="tcgCustomDecks",cf="tcgDeck";let Dt=[];try{const n=JSON.parse(localStorage.getItem(af)||"[]");Array.isArray(n)&&(Dt=n.filter(e=>e&&typeof e.id=="string"&&typeof e.name=="string"&&!aa(e.cards)))}catch{}const lf=()=>{try{localStorage.setItem(af,JSON.stringify(Dt))}catch{}},js=()=>Dt.map(n=>({...n,cards:[...n.cards]})),__=()=>"c"+Date.now().toString(36)+Math.random().toString(36).slice(2,5);function y_(n){const e=aa(n.cards);if(e)throw new Error(e);const t={id:n.id,name:n.name.trim().slice(0,24)||"Mazo sin nombre",cards:[...n.cards]},r=Dt.findIndex(s=>s.id===n.id);r>=0?Dt[r]=t:Dt.push(t),lf()}function v_(n){Dt=Dt.filter(e=>e.id!==n),lf()}let Gr="Luminarae";try{Gr=localStorage.getItem(cf)||Gr}catch{}const On=()=>ls(ct,Gr)||Dt.some(n=>n.id===Gr)?Gr:"Luminarae";function uf(n){Gr=n;try{localStorage.setItem(cf,n)}catch{}}function pr(n){var e;return ls(ct,n)?ct[n]:((e=Dt.find(t=>t.id===n))==null?void 0:e.cards)??ct.Luminarae}const E_=n=>{var e;return ls(ct,n)?n:((e=Dt.find(t=>t.id===n))==null?void 0:e.name)??"Luminarae"},hf=n=>n.filter(e=>e.startsWith("umb")).length*2>n.length?"Umbra":"Luminarae",rl=n=>hf(pr(n))==="Umbra"?"Luminarae":"Umbra",fh=n=>ls(ct,n)?n:[...pr(n)];function ph(n,e){return typeof n=="string"&&ls(ct,n)?ct[n]:Array.isArray(n)&&!aa(n)?[...n]:ct[e]}const df={},w_="cartas-skins";let sl={};try{sl=JSON.parse(localStorage.getItem(w_)||"{}")}catch{}const Oe=n=>{var e,t;return((e=sl[n])==null?void 0:e.name)||((t=df[n])==null?void 0:t.name)||re[n].name},ff=n=>{var e,t;return((e=sl[n])==null?void 0:e.image)||((t=df[n])==null?void 0:t.image)||`/TCG/img/${n}.webp?v=mv73ltsa`},T_=`
.dk{position:fixed;inset:0;z-index:9500;background:rgba(5,4,10,.94);display:grid;place-items:center;color:#e9e6f2;font:500 13px Inter,system-ui,sans-serif}
.dk-in{width:min(1180px,98vw);height:min(760px,96vh);display:grid;grid-template-rows:auto auto 1fr;gap:10px;padding:14px;background:#100d18;border:1px solid #f2d58a44;border-radius:14px}
.dk .dk-h{display:flex;justify-content:space-between;align-items:center}.dk h2{margin:0;font:700 20px Cinzel,serif;color:#f2d58a;letter-spacing:.08em}
.dk button,.dk select,.dk input{font:inherit;color:inherit}
.dk .b{padding:8px 14px;border-radius:8px;border:1px solid #f2d58a66;background:#1b1722;cursor:pointer}.dk .b:hover:not(:disabled){background:#f2d58a;color:#1a1204}
.dk .b:disabled{opacity:.35;cursor:not-allowed}.dk .b.go{background:linear-gradient(#ffe39a,#d19a2f);color:#1a1204;font-weight:700}.dk .b.bad{border-color:#ff6a7488;color:#ff9aa2}
.dk-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.dk-bar select{padding:8px;border-radius:8px;background:#0c0a12;border:1px solid #f2d58a66;min-width:200px}
.dk-main{display:grid;grid-template-columns:1fr 300px;gap:12px;min-height:0}
.dk-cat,.dk-side{display:flex;flex-direction:column;gap:8px;min-height:0}
.dk-f{display:flex;gap:6px;flex-wrap:wrap}.dk-f button{padding:5px 11px;border-radius:99px;border:1px solid #ffffff22;background:none;cursor:pointer;opacity:.7}.dk-f button.on{opacity:1;border-color:#f2d58a;color:#f2d58a;background:#f2d58a14}
.dk-f input{padding:5px 10px;border-radius:99px;border:1px solid #ffffff22;background:#0c0a12;width:150px}
.dk-grid{overflow:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));grid-auto-rows:200px;gap:10px;align-content:start;padding:4px}
.dk .dk-t{all:unset;box-sizing:border-box;display:block;position:relative;height:200px;border-radius:10px;overflow:hidden;border:2px solid #ffffff22;background:#1b1722;cursor:pointer;text-align:left;transition:transform .12s,box-shadow .12s}
.dk .dk-t:focus-visible{outline:2px solid #fff}
.dk .dk-t.lum{border-color:#f2d58a88}.dk .dk-t.umb{border-color:#9a6bffaa}.dk .dk-t:hover{transform:translateY(-2px);box-shadow:0 6px 16px #000a}
.dk-t img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.dk-t::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 40%,#000e)}
.dk-t .c{position:absolute;top:6px;left:6px;z-index:2;width:26px;height:26px;border-radius:50%;background:#2a5fd4;display:grid;place-items:center;font:700 13px Inter;font-style:normal}
.dk-t .n{position:absolute;left:8px;right:8px;bottom:26px;z-index:2;font:700 13px Cinzel,serif;line-height:1.15;text-shadow:0 1px 3px #000}
.dk-t .s{position:absolute;left:8px;right:8px;bottom:8px;z-index:2;font-size:12px;opacity:.9}
.dk-t .k{position:absolute;top:5px;right:5px;z-index:2;padding:2px 7px;border-radius:99px;background:#f2d58a;color:#1a1204;font:700 12px Inter}
.dk .dk-t.full{filter:grayscale(.8) brightness(.6)}
.dk-side{background:#0c0a12;border:1px solid #ffffff1a;border-radius:10px;padding:10px}
.dk-side input{padding:8px;border-radius:8px;background:#14101c;border:1px solid #f2d58a55}
.dk-count{font:700 15px Inter}.dk-count.ok{color:#7dffb0}
.dk-list{flex:1;overflow:auto;margin:0;padding:0;list-style:none;display:grid;gap:3px;align-content:start}
.dk-list li{display:flex;gap:8px;align-items:center;padding:4px 8px;border-radius:6px;background:#1b1722;cursor:pointer;border-left:3px solid #f2d58a}.dk-list li.umb{border-left-color:#9a6bff}.dk-list li:hover{background:#2a2236}
.dk-list li i{width:20px;height:20px;border-radius:50%;background:#2a5fd4;display:grid;place-items:center;font:700 11px Inter;font-style:normal;flex:none}.dk-list li span{flex:1}.dk-list li em{opacity:.7;font-style:normal}
.dk-msg{min-height:1.3em;font-size:12px;color:#ffb3b9}.dk-msg.ok{color:#7dffb0}
@media(max-width:800px){.dk-main{grid-template-columns:1fr;grid-template-rows:1fr 1fr}.dk-in{height:98vh}}
`;let so=null;function b_(n){if(so)return;if(!document.getElementById("dk-css")){const y=document.createElement("style");y.id="dk-css",y.textContent=T_,document.head.append(y)}const e=[...No,...Oo];let t={id:null,name:"",cards:[]},r=!1,s="all",i="all",a="",c="",l=!1;const h=On(),f=js().find(y=>y.id===h);f&&(t={...f,cards:[...f.cards]});const p=so=document.createElement("div");p.className="dk",p.innerHTML=`<div class="dk-in">
    <div class="dk-h"><h2>🃏 Mis mazos</h2><button class="b" data-x="close">✕ Cerrar</button></div>
    <div class="dk-bar"><select data-x="pick"></select>
      <button class="b" data-x="tl">Copiar Luminarae</button><button class="b" data-x="tu">Copiar Umbra</button><button class="b" data-x="clear">Vaciar</button></div>
    <div class="dk-main">
      <section class="dk-cat"><div class="dk-f" data-x="filters">
        <button data-f="all" class="on">Todas</button><button data-f="lum">☀ Luminarae</button><button data-f="umb">☾ Umbra</button><span style="width:10px"></span>
        <button data-t="all" class="on">Todo</button><button data-t="unit">Unidades</button><button data-t="spell">Hechizos</button><input data-x="q" placeholder="Buscar…" autocomplete="off"></div>
        <div class="dk-grid"></div></section>
      <aside class="dk-side"><input data-x="name" maxlength="24" placeholder="Nombre del mazo">
        <div class="dk-count"></div><ul class="dk-list"></ul><div class="dk-msg"></div>
        <button class="b go" data-x="use">Guardar y jugar con este mazo</button><button class="b" data-x="save">Guardar</button><button class="b bad" data-x="del">Eliminar mazo</button></aside>
    </div></div>`,document.body.append(p);const _=y=>p.querySelector(y),I=y=>t.cards.filter(g=>g===y).length,R=()=>!r||confirm("Hay cambios sin guardar. ¿Descartarlos?"),V=()=>{const y=js();_("[data-x=pick]").innerHTML='<option value="">＋ Mazo nuevo</option>'+y.map(g=>`<option value="${g.id}" ${g.id===t.id?"selected":""}>${$s(g.name)}</option>`).join("")},x=()=>{const y=a.trim().toLowerCase();_(".dk-grid").innerHTML=e.filter(g=>(s==="all"||g.id.startsWith(s))&&(i==="all"||g.type===i)&&(!y||Oe(g.id).toLowerCase().includes(y)||g.text.toLowerCase().includes(y))).sort((g,v)=>g.cost-v.cost||Oe(g.id).localeCompare(Oe(v.id))).map(g=>{const v=I(g.id),w=v>=Ws||t.cards.length>=Ur;return`<button class="dk-t ${g.id.slice(0,3)} ${w?"full":""}" data-add="${g.id}" title="${$s(`${Oe(g.id)} — ${g.type==="unit"?`${g.atk}/${g.hp}`:"Hechizo"}
${g.kw.join(", ")} ${g.text}`)}">
          <img src="${ff(g.id)}" alt="" onerror="this.remove()"><i class="c">${g.cost}</i>${v?`<span class="k">×${v}</span>`:""}
          <b class="n">${$s(Oe(g.id))}</b><span class="s">${g.type==="unit"?`⚔ ${g.atk} · ♥ ${g.hp}`:"Hechizo"}</span></button>`}).join("")},H=()=>{const y=t.cards.length,g=aa(t.cards),v=[...new Set(t.cards)].sort((w,T)=>re[w].cost-re[T].cost||Oe(w).localeCompare(Oe(T)));_(".dk-count").textContent=`${y} / ${Ur} cartas`,_(".dk-count").classList.toggle("ok",!g),_(".dk-list").innerHTML=v.map(w=>`<li class="${w.slice(0,3)}" data-rm="${w}" title="Clic para quitar una copia"><i>${re[w].cost}</i><span>${$s(Oe(w))}</span><em>×${I(w)}</em></li>`).join("")||'<li style="cursor:default;opacity:.6">Toca cartas para añadirlas</li>',_(".dk-msg").textContent=c||(g??""),_(".dk-msg").classList.toggle("ok",!!c&&l),_("[data-x=save]").disabled=_("[data-x=use]").disabled=!!g,_("[data-x=del]").hidden=!t.id,_("[data-x=name]").value=t.name},q=()=>{x(),H(),V()},$=()=>{r=!0,c=""},z=()=>{try{return t.name.trim()||(t.name=`Mazo ${js().length+1}`),t.id??(t.id=__()),y_({id:t.id,name:t.name,cards:t.cards}),t.name=t.name.trim().slice(0,24),r=!1,c="Guardado ✓",l=!0,n(),!0}catch(y){return c=y.message,l=!1,!1}},ae=()=>{R()&&(p.remove(),so=null,n())},B=y=>{t={id:y.id,name:y.name,cards:[...y.cards]},r=!1,c="",q()};p.addEventListener("click",y=>{var Ce;const g=y.target,v=g.closest("[data-add]"),w=g.closest("[data-rm]"),T=g.closest("[data-f]"),b=g.closest("[data-t]"),E=(Ce=g.closest("[data-x]"))==null?void 0:Ce.dataset.x;if(v){const me=v.dataset.add;if(t.cards.length>=Ur){c=`El mazo ya tiene ${Ur} cartas: quita alguna primero`,l=!1,H();return}if(I(me)>=Ws){c=`Máximo ${Ws} copias de ${Oe(me)}`,l=!1,H();return}t.cards.push(me),$(),de("select"),q()}else if(w){const me=t.cards.lastIndexOf(w.dataset.rm);me>=0&&t.cards.splice(me,1),$(),q()}else if(T)s=T.dataset.f,p.querySelectorAll("[data-f]").forEach(me=>me.classList.toggle("on",me===T)),x();else if(b)i=b.dataset.t,p.querySelectorAll("[data-t]").forEach(me=>me.classList.toggle("on",me===b)),x();else if(E==="close")ae();else if(E==="tl"||E==="tu"){if(!R())return;B({id:null,name:E==="tl"?"Luminarae (copia)":"Umbra (copia)",cards:(E==="tl"?No:Oo).map(me=>me.id)}),r=!0}else if(E==="clear"){if(!t.cards.length)return;t.cards=[],$(),q()}else E==="save"?(z(),q()):E==="use"?z()?(uf(t.id),de("start"),p.remove(),so=null,n()):H():E==="del"&&t.id&&confirm(`¿Eliminar el mazo "${t.name}"?`)&&(v_(t.id),n(),B({id:null,name:"",cards:[]}))}),_("[data-x=pick]").addEventListener("change",y=>{const g=y.target.value;if(!R()){V();return}const v=js().find(w=>w.id===g);B(v??{id:null,name:"",cards:[]})}),_("[data-x=name]").addEventListener("input",y=>{t.name=y.target.value,r=!0}),_("[data-x=q]").addEventListener("input",y=>{a=y.target.value,x()}),p.addEventListener("keydown",y=>{y.stopPropagation(),y.key==="Escape"&&ae()}),q()}const tc=(n,e,t)=>n.style.setProperty(e,t);function I_(){const n=document.createElement("canvas");n.id="embers",document.body.prepend(n);const e=n.getContext("2d");let t=0,r=0;const s=[],i=()=>{t=n.width=innerWidth,r=n.height=innerHeight};i(),addEventListener("resize",i);for(let c=0;c<90;c++)s.push({x:Math.random()*2e3,y:Math.random()*1200,r:Math.random()*2+.4,v:Math.random()*.5+.12,a:Math.random()*.6+.2,hue:Math.random()<.55?40:265,ph:Math.random()*6});let a=0;(function c(){a+=.01,e.clearRect(0,0,t,r);for(const l of s){l.y-=l.v,l.x+=Math.sin(a+l.ph)*.35,l.y<-10&&(l.y=r+10,l.x=Math.random()*t);const h=.6+Math.sin(a*3+l.ph)*.4;e.beginPath(),e.fillStyle=`hsla(${l.hue},95%,68%,${l.a*h})`,e.shadowColor=`hsl(${l.hue},95%,60%)`,e.shadowBlur=10,e.arc(l.x%t,l.y,l.r,0,6.3),e.fill()}requestAnimationFrame(c)})()}function A_(){const n=document.createElement("div");n.id="glow",document.body.append(n);let e=0,t=0,r=0,s=0;addEventListener("pointermove",i=>{r=i.clientX,s=i.clientY}),function i(){e+=(r-e)*.14,t+=(s-t)*.14,n.style.transform=`translate(${e-160}px,${t-160}px)`,requestAnimationFrame(i)}()}function k_(){let n=null;document.addEventListener("pointermove",t=>{const r=t.target.closest(".card");if(!r)return;const s=r.getBoundingClientRect(),i=(t.clientX-s.left)/s.width,a=(t.clientY-s.top)/s.height;tc(r,"--mx",(i*100).toFixed(1)+"%"),tc(r,"--my",(a*100).toFixed(1)+"%"),tc(r,"--ang",((i-.5)*60).toFixed(1)+"deg")});let e=0;document.addEventListener("pointerover",t=>{const r=t.target.closest(".slotc,.card[data-a],button,.btn");if(!r||r===n)return;n=r;const s=performance.now();s-e>70&&(de("hover"),e=s)}),document.addEventListener("pointerout",()=>{n=null})}function S_(){new MutationObserver(n=>n.forEach(e=>e.addedNodes.forEach(t=>{if(!(t instanceof HTMLElement)||!t.classList.contains("vfx"))return;const r=t.classList;r.contains("vhit")?io("hard"):r.contains("banner")&&!r.contains("small")?mh("#ffd27a33"):r.contains("cast")?(mh(r.contains("lum")?"#8fe9ff33":"#a24dff44"),io("soft")):r.contains("report")&&io("soft")}))).observe(document.body,{childList:!0}),new MutationObserver(()=>document.querySelectorAll(".card.attacking:not(.fxdone)").forEach(n=>{n.classList.add("fxdone"),io("soft")})).observe(document.getElementById("app"),{childList:!0,subtree:!0})}function io(n){const e=document.getElementById("app");e.classList.remove("shk-soft","shk-hard"),e.offsetWidth,e.classList.add("shk-"+n)}function mh(n){const e=document.createElement("div");e.className="flash",e.style.background=`radial-gradient(circle at 50% 50%,${n},transparent 70%)`,document.body.append(e),setTimeout(()=>e.remove(),700)}let Mo=null;function pf(){if(Mo)return;const n=Mo=document.createElement("div");n.id="title",n.innerHTML=`<div class="t-bg"></div><div class="t-art l"></div><div class="t-art u"></div>
    <div class="t-in"><p class="t-kicker"><i></i>DUELO DE LEYENDAS<i></i></p><h1>CARTAS</h1><div class="t-sub"><i></i><span>ALFA</span><i></i></div>
    <div class="t-fac" role="radiogroup" aria-label="Elige tu mazo"></div>
    <div class="t-menu"><button class="t-go" data-m="ia" autofocus>⚔ JUGAR CONTRA LA IA</button><button class="t-go alt" data-m="online">🌐 JUGAR ONLINE</button><button class="t-go dk" data-m="decks">🃏 MIS MAZOS</button></div>
    <p class="t-hint">Elige tu mazo y un modo · sonido activado</p></div>`,document.body.append(n);const e=n.querySelector(".t-fac"),t=()=>{const r=On();e.innerHTML='<button class="l" data-d="Luminarae" role="radio">☀ LUMINARAE</button><i>◆</i><button class="u" data-d="Umbra" role="radio">UMBRA ☾</button>'+js().map(s=>`<i>◆</i><button class="c" data-d="${s.id}" role="radio">🃏 ${$s(s.name)}</button>`).join(""),e.querySelectorAll("[data-d]").forEach(s=>{const i=s.dataset.d===r;s.classList.toggle("on",i),s.setAttribute("aria-checked",String(i))})};e.addEventListener("click",r=>{const s=r.target.closest("[data-d]");s&&(uf(s.dataset.d),de("select"),t())}),t(),n.querySelectorAll("[data-m]").forEach(r=>r.addEventListener("click",()=>{if(r.dataset.m==="decks"){de("click"),b_(t);return}de("start"),r_(),r.dataset.m==="ia"?(mf(),document.dispatchEvent(new Event("menu:ia"))):document.dispatchEvent(new Event("menu:online"))}))}function mf(){const n=Mo;n&&(Mo=null,n.classList.add("out"),setTimeout(()=>n.remove(),900))}function R_(){pf()}function C_(){p_(),I_(),A_(),k_(),S_(),R_()}const rt=n=>1-n;function gf(n){n.seed=n.seed+1831565813|0;let e=n.seed;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function _f(n,e){for(let t=e.length-1;t>0;t--){const r=Math.floor(gf(n)*(t+1));[e[t],e[r]]=[e[r],e[t]]}}function es(n,e,t){const r=n.p[e];for(let s=0;s<t;s++){const i=r.deck.pop();if(!i){n.winner=rt(e);break}r.hand.length<10&&r.hand.push(i)}}const Lo=(n,e,t)=>{n.p[e].nexus=Math.min(20,n.p[e].nexus+t)},fe=n=>Math.max(0,n.atk+n.ta),Re=n=>n.hp+n.th-n.dmg,bn=n=>{n.dmg=n.hp+n.th+999},Fo=n=>fe(n)*1e6+Re(n)*1e3+re[n.card].cost,en=n=>n.reduce((e,t)=>!e||Fo(t)>Fo(e)?t:e,void 0),gh=n=>n.reduce((e,t)=>!e||Fo(t)<Fo(e)?t:e,void 0),P_=["dmgEnemy","drain","destroyEnemy","sacDmg","frost"],x_=["buffAlly","giveKw","tempBuff","healUnit"];function us(n){const e=re[n];return!e||e.type!=="spell"?null:e.fx.some(t=>P_.includes(t.t))?"enemy":e.fx.some(t=>x_.includes(t.t))?"ally":null}function il(n,e){return!(n.kw.includes("elusivo")&&!e.kw.includes("elusivo")||n.kw.includes("temible")&&fe(e)<3)}function yf(n,e){const t=s=>({nexus:20,deck:[...s],hand:[],board:[],mana:0,maxMana:0,spell:0,played:[]}),r={p:[t(n[0]),t(n[1])],round:0,token:0,active:0,phase:"mulligan",passes:0,winner:null,seed:e,uid:0,log:[],stack:[],attackers:[],blocks:{},forced:[],tok:[!1,!1],resumePhase:"main",mull:[!1,!1]};return r.p.forEach(s=>_f(r,s.deck)),es(r,0,4),es(r,1,4),r.token=gf(r)<.5?0:1,r}function nc(n,e,t){const r=n.p[e],s=[...new Set(t)].filter(i=>i>=0&&i<r.hand.length).sort((i,a)=>a-i);for(const i of s)r.deck.push(r.hand.splice(i,1)[0]);_f(n,r.deck),es(n,e,s.length)}function Ec(n){if(n.round++,n.round>40){n.winner=-1;return}n.token=rt(n.token),n.active=n.token,n.phase="main",n.passes=0,n.attackers=[],n.blocks={},n.forced=[],n.stack=[],n.tok=[!1,!1],n.tok[n.token]=!0;for(const e of[n.token,rt(n.token)]){const t=n.p[e];if(t.maxMana=Math.min(10,t.maxMana+1),t.mana=t.maxMana,es(n,e,1),n.winner!==null)return}n.log=n.log.slice(-40),n.log.push(`— Ronda ${n.round} (ficha: J${n.token+1}) —`),mr(n)}function V_(n){for(const e of n.p)e.spell=Math.min(3,e.spell+e.mana),e.mana=0;for(const e of n.p)e.board.forEach(t=>{t.kw.includes("regenera")&&(t.dmg=0)});for(const e of n.p)e.board.forEach(t=>{t.kw.includes("efimero")&&bn(t)});Mn(n);for(const e of n.p)e.board.forEach(t=>{t.ta=0,t.th=0,t.dmg>=t.hp&&(t.dmg=t.hp-1)});mr(n),n.winner===null&&Ec(n)}function mr(n){if(n.winner!==null)return;const e=n.p[0].nexus<=0,t=n.p[1].nexus<=0;e&&t?n.winner=-1:e?n.winner=1:t&&(n.winner=0)}function Mn(n){for(let e=!0;e;){e=!1;for(const t of n.p){const r=t.board.filter(s=>Re(s)<=0);if(r.length){e=!0,t.board=t.board.filter(s=>Re(s)>0);for(const s of t.board){const i=re[s.card].grow;i&&(s.atk+=i.a*r.length,s.hp+=i.h*r.length)}}}}}function $r(n,e,t,r){if(t<=0)return 0;const s=e.kw.indexOf("barrera");if(s>=0)return e.kw.splice(s,1),0;if(e.kw.includes("duro")&&(t=Math.max(0,t-1)),t<=0)return 0;const i=Math.min(t,Math.max(0,Re(e)));return e.dmg+=t,r&&(r.u.kw.includes("letal")&&bn(e),r.u.kw.includes("robovida")&&Lo(n,r.owner,i)),i}function wc(n,e,t,r,s){const i=n.p[e],a=n.p[rt(e)];switch(t.t){case"healNexus":Lo(n,e,t.n);break;case"hurtNexus":i.nexus-=t.n;break;case"dmgNexus":a.nexus-=t.n;break;case"draw":es(n,e,t.n);break;case"buffOther":{const c=en(i.board.filter(l=>l!==r));c&&(c.atk+=t.a,c.hp+=t.h);break}case"buffAlly":{const c=s??en(i.board);c&&(c.atk+=t.a,c.hp+=t.h);break}case"tempBuff":{const c=s??en(i.board);c&&(c.ta+=t.a,c.th+=t.h);break}case"healUnit":{const c=s??i.board.find(l=>l.dmg>0);c&&(c.dmg=Math.max(0,c.dmg-t.n));break}case"tempBuffAll":i.board.forEach(c=>{c.ta+=t.a,c.th+=t.h});break;case"buffAll":i.board.forEach(c=>{c.atk+=t.a,c.hp+=t.h});break;case"giveKw":{const c=s??en(i.board);c&&!c.kw.includes(t.kw)&&c.kw.push(t.kw);break}case"dmgEnemy":{const c=s??en(a.board);c&&$r(n,c,t.n);break}case"drain":{const c=s??en(a.board);c&&Lo(n,e,$r(n,c,t.n));break}case"dmgAll":a.board.forEach(c=>$r(n,c,t.n));break;case"frost":{const c=s??en(a.board);c&&(c.ta-=fe(c));break}case"sacDraw":{const c=gh(i.board.filter(l=>l!==r));c&&(bn(c),Mn(n),es(n,e,t.n));break}case"sacDmg":{const c=gh(i.board),l=s??en(a.board);if(c&&l){const h=fe(c);bn(c),$r(n,l,h)}break}case"debuffEnemies":a.board.forEach(c=>{c.atk=Math.max(0,c.atk-t.a),c.hp-=t.h});break;case"destroyEnemy":{const c=s??en(a.board);c&&bn(c);break}}Mn(n)}function hs(n,e,t){const r=n.p[e],s=re[r.hand[t]];if(!s||n.winner!==null||n.active!==e||n.phase==="mulligan")return!1;if(s.type==="unit")return n.phase==="main"&&!n.stack.length&&!n.attackers.length&&r.board.length<6&&s.cost<=r.mana;if(s.cost>r.mana+r.spell)return!1;const i=s.speed??"fast";if((i==="slow"||i==="focus")&&(n.phase!=="main"||n.stack.length||n.attackers.length))return!1;const a=us(s.id);return!(a==="enemy"&&!n.p[rt(e)].board.length||a==="ally"&&!r.board.length||s.fx.some(c=>c.t==="sacDmg")&&!r.board.length)}function vf(n){if(n.phase!=="block"&&!(n.phase==="stack"&&n.resumePhase==="block"))return;const e=n.p[n.token],t=n.p[rt(n.token)];for(const r of Object.keys(n.blocks)){const s=e.board.find(a=>String(a.uid)===r),i=t.board.find(a=>a.uid===n.blocks[r]);s&&i&&il(s,i)||(s&&i&&n.log.push(`Bloqueo anulado: {${i.card}} ya no puede bloquear a {${s.card}}`),delete n.blocks[r],n.forced=n.forced.filter(a=>String(a)!==r))}}function D_(n){const e=n.stack.pop();if(!e)return;const t=re[e.card],r=us(e.card);let s;if(r&&(s=[...n.p[0].board,...n.p[1].board].find(i=>i.uid===e.target),!s)){n.log.push(`{${e.card}} se disipa: el objetivo ya no existe`);return}n.log.push(`Se resuelve {${e.card}}`),t.fx.forEach(i=>wc(n,e.owner,i,void 0,s)),Mn(n),mr(n)}function N_(n){var t;const e=((t=n.stack[0])==null?void 0:t.owner)??n.active;for(;n.stack.length&&n.winner===null;)D_(n);n.winner===null&&(vf(n),n.phase=n.resumePhase,n.active=rt(e),n.passes=0)}function O_(n){const e=n.token,t=rt(e),r=n.p[e],s=n.p[t],i=n.attackers.map(h=>r.board.find(f=>f.uid===h)).filter(h=>!!h).map(h=>({u:h,had:n.blocks[String(h.uid)]!==void 0,b:s.board.find(f=>f.uid===n.blocks[String(h.uid)])})),a=new Set,c=(h,f)=>{f<=0||(n.p[t].nexus-=f,h.kw.includes("robovida")&&Lo(n,e,f))},l=(h,f,p)=>{const _=Re(p)+(p.kw.includes("duro")?1:0),I=fe(h);return $r(n,p,I,{u:h,owner:f}),a.add(h.uid),Math.max(0,I-_)};for(const{u:h,b:f}of i)if(f&&h.kw.includes("rapido")&&fe(h)>0){const p=l(h,e,f);h.kw.includes("arrollar")&&c(h,p),h.kw.includes("efimero")&&bn(h)}if(Mn(n),mr(n),n.winner===null){for(const{u:h,had:f,b:p}of i){if(Re(h)<=0)continue;const _=a.has(h.uid);if(p&&Re(p)>0){let I=0;!_&&fe(h)>0&&(I=l(h,e,p)),fe(p)>0&&$r(n,h,fe(p),{u:p,owner:t}),h.kw.includes("arrollar")&&!_&&c(h,I),h.kw.includes("efimero")&&!_&&bn(h)}else f?h.kw.includes("arrollar")&&!_&&c(h,fe(h)):(c(h,fe(h)),h.kw.includes("efimero")&&fe(h)>0&&bn(h))}Mn(n),mr(n),n.attackers=[],n.blocks={},n.forced=[],n.winner===null&&(n.phase="main",n.active=t,n.passes=0)}}function si(n,e){if(n.winner!==null)return n;const t=structuredClone(n),r=t.active,s=t.p[r],i=t.p[rt(r)];if(e.type==="mulligan")return t.phase!=="mulligan"?n:e.player!==void 0?e.player!==0&&e.player!==1||t.mull[e.player]||!Array.isArray(e.idx)?n:(nc(t,e.player,e.idx),t.mull[e.player]=!0,t.mull[0]&&t.mull[1]&&Ec(t),t):(nc(t,0,e.idx),nc(t,1,t.p[1].hand.map((a,c)=>re[a].cost>=4?c:-1).filter(a=>a>=0)),Ec(t),t);if(t.phase==="mulligan")return n;if(e.type==="play"){if(!hs(t,r,e.hand))return n;const a=s.hand[e.hand],c=re[a],l=us(a);let h;if(l&&(h=(l==="enemy"?i:s).board.find(f=>f.uid===e.target),!h))return n;if(c.type==="unit")s.mana-=c.cost;else{const f=Math.min(s.spell,c.cost);s.spell-=f,s.mana-=c.cost-f}if(s.hand.splice(e.hand,1),s.played.push(a),t.log.push(`J${r+1} juega {${a}}`),c.type==="unit"){const f={uid:++t.uid,card:a,atk:c.atk,hp:c.hp,dmg:0,kw:[...c.kw],ta:0,th:0};s.board.push(f),c.fx.forEach(p=>wc(t,r,p,f)),Mn(t),mr(t),t.active=rt(r),t.passes=0}else{const f=c.speed??"fast";f==="burst"||f==="focus"?(c.fx.forEach(p=>wc(t,r,p,void 0,h)),Mn(t),mr(t),vf(t)):(t.resumePhase=t.phase==="stack"?t.resumePhase:t.phase,t.stack.push({card:a,owner:r,target:h==null?void 0:h.uid}),t.phase="stack",t.active=rt(r),t.passes=0)}}else if(e.type==="pass"||e.type==="confirmBlocks"){if(e.type==="confirmBlocks"&&!(t.phase==="block"&&r===rt(t.token)))return n;t.log.push(`J${r+1} pasa prioridad`),t.phase==="stack"?N_(t):t.phase==="block"?r===rt(t.token)?(t.active=t.token,t.passes=1):O_(t):++t.passes>=2?V_(t):t.active=rt(r)}else if(e.type==="attack"){if(t.phase!=="main"||t.stack.length||t.attackers.length||!t.tok[r])return n;const a=[...new Set(e.units)].map(l=>s.board[l]).filter(l=>!!l);if(!a.length)return n;t.tok[r]=!1,t.attackers=a.map(l=>l.uid),t.blocks={},t.forced=[];const c=new Set;for(const l of a)if(l.kw.includes("retador")){const h=i.board.filter(f=>!c.has(f.uid)).sort((f,p)=>(fe(l)>=Re(p)?1:0)-(fe(l)>=Re(f)?1:0)||Re(f)-Re(p))[0];h&&(t.blocks[String(l.uid)]=h.uid,t.forced.push(l.uid),c.add(h.uid))}t.phase="block",t.active=rt(r),t.passes=0,t.log.push(`J${r+1} declara ataque con ${a.length} unidad(es)`)}else if(e.type==="block"){if(t.phase!=="block"||r!==rt(t.token))return n;const a=t.p[t.token].board[e.attacker],c=s.board[e.blocker];if(!a||!c||!t.attackers.includes(a.uid)||t.forced.includes(a.uid)||!il(a,c))return n;const l=String(a.uid);if(t.blocks[l]===c.uid)delete t.blocks[l];else{if(Object.values(t.blocks).includes(c.uid))return n;t.blocks[l]=c.uid}}return t}const M_=n=>re[n].fx.reduce((e,t)=>e+(t.t==="dmgEnemy"||t.t==="drain"?t.n:0),0),Ls=n=>fe(n)*10+Re(n);function _h(n,e){const t=n.p[e],r=n.p[1-e];let s=null;return t.hand.forEach((i,a)=>{const c=re[i];if(c.type!=="spell"||!hs(n,e,a))return;const l=us(i);let h=0,f;if(l==="enemy"){const p=[...r.board].sort((R,V)=>Ls(V)-Ls(R)),_=M_(i),I=p.find(R=>_>0&&Re(R)<=_)??(c.fx.some(R=>R.t==="destroyEnemy"||R.t==="frost")?p[0]:void 0);if(!I||c.fx.some(R=>R.t==="sacDmg")&&t.board.length<2)return;f=I.uid,h=Ls(I)/2+c.cost}else if(l==="ally"){const p=c.fx.some(R=>R.t==="healUnit"),I=[...p?t.board.filter(R=>R.dmg>0):t.board].sort((R,V)=>p?V.dmg-R.dmg:Ls(V)-Ls(R))[0];if(!I)return;f=I.uid,h=p?2+I.dmg:3}else for(const p of c.fx)p.t==="healNexus"&&t.nexus<=20-p.n?h+=2:p.t==="buffAll"&&t.board.length>=2||(p.t==="debuffEnemies"||p.t==="dmgAll")&&r.board.length>=2?h+=3:p.t==="dmgNexus"?h+=r.nexus<=p.n?20:1:p.t==="tempBuffAll"&&t.board.length>=2&&n.tok[e]?h+=3:p.t==="draw"&&(h+=t.hand.length<6?2:0);h>0&&(!s||h>s.sc)&&(s={a:{type:"play",hand:a,target:f},sc:h})}),s?s.a:null}function L_(n){const e=n.active,t=n.p[e],r=n.p[1-e];if(n.phase==="mulligan")return{type:"mulligan",idx:[]};if(n.phase==="block"){if(e===n.token)return{type:"pass"};const a=n.attackers.map(h=>n.p[n.token].board.find(f=>f.uid===h)).filter(h=>!!h),c=a.reduce((h,f)=>h+fe(f),0),l=new Set(Object.values(n.blocks));for(const h of a.filter(f=>n.blocks[String(f.uid)]===void 0).sort((f,p)=>fe(p)-fe(f))){const f=t.board.map((_,I)=>({u:_,k:I})).filter(_=>!l.has(_.u.uid)&&il(h,_.u)),p=f.find(_=>fe(_.u)>=Re(h)&&Re(_.u)>fe(h))??f.find(_=>(fe(_.u)>=Re(h)||_.u.kw.includes("letal"))&&fe(h)>=3)??(t.nexus<=c?f.sort((_,I)=>Re(I.u)-Re(_.u))[0]:void 0);if(p)return{type:"block",attacker:n.p[n.token].board.indexOf(h),blocker:p.k}}return{type:"confirmBlocks"}}if(n.phase==="stack")return(Math.random()<.5?_h(n,e):null)??{type:"pass"};let s=-1;if(t.hand.forEach((a,c)=>{re[a].type==="unit"&&hs(n,e,c)&&(s<0||re[a].cost>re[t.hand[s]].cost)&&(s=c)}),s>=0)return{type:"play",hand:s};const i=_h(n,e);if(i&&Math.random()<.7)return i;if(n.tok[e]&&!n.attackers.length){const a=t.board.map((h,f)=>({u:h,k:f})),c=a.reduce((h,f)=>h+fe(f.u),0)>=r.nexus,l=a.filter(({u:h})=>c||!r.board.length||h.kw.includes("barrera")||h.kw.includes("elusivo")||r.board.every(f=>fe(f)<Re(h)&&!f.kw.includes("letal")));if(l.length)return{type:"attack",units:l.map(h=>h.k)}}return{type:"pass"}}const F_=new Set(Object.values(ct).map(n=>n.filter(e=>re[e].type==="unit").sort((e,t)=>re[t].cost-re[e].cost||re[t].atk+re[t].hp-re[e].atk-re[e].hp)[0])),U_=n=>F_.has(n),$_=3300;let xr=null;function j_(n,e,t){xr==null||xr.remove();const r=n.slice(0,3)==="umb"?"umb":"lum",s=re[n],i=xr=document.createElement("div");i.className=`epic ${r}`;const a=Array.from({length:18},()=>`<i style="--x:${(Math.random()*100).toFixed(1)}%;--d:${(2.2+Math.random()*2.6).toFixed(2)}s;--t:${(Math.random()*1.6).toFixed(2)}s;--s:${(2+Math.random()*4).toFixed(1)}px"></i>`).join("");i.innerHTML=`<div class="ep-dim"></div><div class="ep-rays"></div><div class="ep-rays r2"></div><div class="ep-beam"></div><div class="ep-halo"></div>
    <div class="ep-dust">${a}</div><div class="ep-stage"><div class="ep-card">${e}<div class="ep-shine"></div></div>
    <div class="ep-name"><small>${r==="umb"?"EL VACÍO SE ALZA":"LA LUZ DESCIENDE"}</small><b>${s.name}</b></div></div>
    <div class="ep-ring"></div><div class="ep-flash"></div>`,document.body.append(i),document.body.classList.add("epic-on");const c=document.getElementById("app");setTimeout(()=>{i.isConnected&&c&&(c.classList.remove("shk-soft","shk-hard"),c.offsetWidth,c.classList.add("shk-hard"))},780);let l=!1;const h=()=>{l||(l=!0,i.classList.add("out"),setTimeout(()=>{i.remove(),xr===i&&(xr=null,document.body.classList.remove("epic-on")),t()},520))};i.addEventListener("click",h),setTimeout(h,$_)}const q_={hello:["Las sombras te saludan.","Hola, mortal. Disfruta tus últimos turnos.","¿Listo para caer?"],gg:["Buena partida. La próxima será peor para ti.","GG… por ahora."],idle:["Interesante… aunque inútil.","Habla todo lo que quieras.","La oscuridad escucha.","Juega tu carta.","..."],cast:["¿Sentiste eso?","Las sombras obedecen.","Eso va a doler."],win:["Imposible… la luz me venció esta vez.","Buena partida. Quiero la revancha."],lose:["La noche siempre gana.","Tu luz se apaga."]};class B_{constructor(){Le(this,"nameFn",()=>"Umbra");Le(this,"cbs",[]);Le(this,"last",0)}onMessage(e){this.cbs.push(e)}emit(e){this.cbs.forEach(t=>t(e))}push(e){this.emit(e)}sys(e){this.emit({from:"",text:e,side:"sys"})}send(e){this.emit({from:"Tú",text:e,side:"me"});const t=/hola|buenas|hey/i.test(e)?"hello":/\bgg\b|bien jugado/i.test(e)?"gg":"idle";setTimeout(()=>this.say(t),700+Math.random()*900)}react(e){e==="cast"&&(Date.now()-this.last<2e4||Math.random()>.35)||this.say(e)}say(e){const t=q_[e];this.last=Date.now(),this.emit({from:this.nameFn(),text:t[Math.floor(Math.random()*t.length)],side:"foe"})}}const z_=()=>{};var yh={};/**
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
 */const Ef=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},H_=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},wf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let _=(c&15)<<2|h>>6,I=h&63;l||(I=64,a||(_=64)),r.push(t[f],t[p],t[_],t[I])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ef(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):H_(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new G_;const _=i<<2|c>>4;if(r.push(_),h!==64){const I=c<<4&240|h>>2;if(r.push(I),p!==64){const R=h<<6&192|p;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class G_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const W_=function(n){const e=Ef(n);return wf.encodeByteArray(e,!0)},Uo=function(n){return W_(n).replace(/\./g,"")},Tf=function(n){try{return wf.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function K_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Q_=()=>K_().__FIREBASE_DEFAULTS__,J_=()=>{if(typeof process>"u"||typeof yh>"u")return;const n=yh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},X_=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Tf(n[1]);return e&&JSON.parse(e)},ca=()=>{try{return z_()||Q_()||J_()||X_()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},bf=n=>{var e,t;return(t=(e=ca())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Y_=n=>{const e=bf(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},If=()=>{var n;return(n=ca())===null||n===void 0?void 0:n.config},Af=n=>{var e;return(e=ca())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class Z_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function ds(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function kf(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function e0(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Uo(JSON.stringify(t)),Uo(JSON.stringify(a)),""].join(".")}const Ks={};function t0(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ks))Ks[e]?n.emulator.push(e):n.prod.push(e);return n}function n0(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let vh=!1;function Sf(n,e){if(typeof window>"u"||typeof document>"u"||!ds(window.location.host)||Ks[n]===e||Ks[n]||vh)return;Ks[n]=e;function t(_){return`__firebase__banner__${_}`}const r="__firebase__banner",i=t0().prod.length>0;function a(){const _=document.getElementById(r);_&&_.remove()}function c(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function l(_,I){_.setAttribute("width","24"),_.setAttribute("id",I),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function h(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{vh=!0,a()},_}function f(_,I){_.setAttribute("id",I),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function p(){const _=n0(r),I=t("text"),R=document.getElementById(I)||document.createElement("span"),V=t("learnmore"),x=document.getElementById(V)||document.createElement("a"),H=t("preprendIcon"),q=document.getElementById(H)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const $=_.element;c($),f(x,V);const z=h();l(q,H),$.append(q,R,x,z),document.body.appendChild($)}i?(R.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,R.innerText="Preview backend running in this workspace."),R.setAttribute("id",I)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function lt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function r0(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(lt())}function s0(){var n;const e=(n=ca())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function i0(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function o0(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function a0(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function c0(){const n=lt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function l0(){return!s0()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function u0(){try{return typeof indexedDB=="object"}catch{return!1}}function h0(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const d0="FirebaseError";class hn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=d0,Object.setPrototypeOf(this,hn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,bi.prototype.create)}}class bi{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?f0(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new hn(s,c,r)}}function f0(n,e){return n.replace(p0,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const p0=/\{\$([^}]+)}/g;function m0(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function gr(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Eh(i)&&Eh(a)){if(!gr(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Eh(n){return n!==null&&typeof n=="object"}/**
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
 */function Ii(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function g0(n,e){const t=new _0(n,e);return t.subscribe.bind(t)}class _0{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");y0(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=rc),s.error===void 0&&(s.error=rc),s.complete===void 0&&(s.complete=rc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function y0(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function rc(){}/**
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
 */function ze(n){return n&&n._delegate?n._delegate:n}class _r{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const tr="[DEFAULT]";/**
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
 */class v0{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Z_;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(w0(e))try{this.getOrInitializeService({instanceIdentifier:tr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=tr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=tr){return this.instances.has(e)}getOptions(e=tr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:E0(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=tr){return this.component?this.component.multipleInstances?e:tr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function E0(n){return n===tr?void 0:n}function w0(n){return n.instantiationMode==="EAGER"}/**
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
 */class T0{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new v0(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ne;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ne||(ne={}));const b0={debug:ne.DEBUG,verbose:ne.VERBOSE,info:ne.INFO,warn:ne.WARN,error:ne.ERROR,silent:ne.SILENT},I0=ne.INFO,A0={[ne.DEBUG]:"log",[ne.VERBOSE]:"log",[ne.INFO]:"info",[ne.WARN]:"warn",[ne.ERROR]:"error"},k0=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=A0[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ol{constructor(e){this.name=e,this._logLevel=I0,this._logHandler=k0,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ne))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?b0[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ne.DEBUG,...e),this._logHandler(this,ne.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ne.VERBOSE,...e),this._logHandler(this,ne.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ne.INFO,...e),this._logHandler(this,ne.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ne.WARN,...e),this._logHandler(this,ne.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ne.ERROR,...e),this._logHandler(this,ne.ERROR,...e)}}const S0=(n,e)=>e.some(t=>n instanceof t);let wh,Th;function R0(){return wh||(wh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function C0(){return Th||(Th=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Rf=new WeakMap,Tc=new WeakMap,Cf=new WeakMap,sc=new WeakMap,al=new WeakMap;function P0(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(In(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Rf.set(t,n)}).catch(()=>{}),al.set(e,n),e}function x0(n){if(Tc.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Tc.set(n,e)}let bc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Tc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Cf.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return In(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function V0(n){bc=n(bc)}function D0(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(ic(this),e,...t);return Cf.set(r,e.sort?e.sort():[e]),In(r)}:C0().includes(n)?function(...e){return n.apply(ic(this),e),In(Rf.get(this))}:function(...e){return In(n.apply(ic(this),e))}}function N0(n){return typeof n=="function"?D0(n):(n instanceof IDBTransaction&&x0(n),S0(n,R0())?new Proxy(n,bc):n)}function In(n){if(n instanceof IDBRequest)return P0(n);if(sc.has(n))return sc.get(n);const e=N0(n);return e!==n&&(sc.set(n,e),al.set(e,n)),e}const ic=n=>al.get(n);function O0(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=In(a);return r&&a.addEventListener("upgradeneeded",l=>{r(In(a.result),l.oldVersion,l.newVersion,In(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const M0=["get","getKey","getAll","getAllKeys","count"],L0=["put","add","delete","clear"],oc=new Map;function bh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(oc.get(e))return oc.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=L0.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||M0.includes(t)))return;const i=async function(a,...c){const l=this.transaction(a,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&l.done]))[0]};return oc.set(e,i),i}V0(n=>({...n,get:(e,t,r)=>bh(e,t)||n.get(e,t,r),has:(e,t)=>!!bh(e,t)||n.has(e,t)}));/**
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
 */class F0{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(U0(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function U0(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ic="@firebase/app",Ih="0.13.2";/**
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
 */const on=new ol("@firebase/app"),$0="@firebase/app-compat",j0="@firebase/analytics-compat",q0="@firebase/analytics",B0="@firebase/app-check-compat",z0="@firebase/app-check",H0="@firebase/auth",G0="@firebase/auth-compat",W0="@firebase/database",K0="@firebase/data-connect",Q0="@firebase/database-compat",J0="@firebase/functions",X0="@firebase/functions-compat",Y0="@firebase/installations",Z0="@firebase/installations-compat",ey="@firebase/messaging",ty="@firebase/messaging-compat",ny="@firebase/performance",ry="@firebase/performance-compat",sy="@firebase/remote-config",iy="@firebase/remote-config-compat",oy="@firebase/storage",ay="@firebase/storage-compat",cy="@firebase/firestore",ly="@firebase/ai",uy="@firebase/firestore-compat",hy="firebase",dy="11.10.0";/**
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
 */const Ac="[DEFAULT]",fy={[Ic]:"fire-core",[$0]:"fire-core-compat",[q0]:"fire-analytics",[j0]:"fire-analytics-compat",[z0]:"fire-app-check",[B0]:"fire-app-check-compat",[H0]:"fire-auth",[G0]:"fire-auth-compat",[W0]:"fire-rtdb",[K0]:"fire-data-connect",[Q0]:"fire-rtdb-compat",[J0]:"fire-fn",[X0]:"fire-fn-compat",[Y0]:"fire-iid",[Z0]:"fire-iid-compat",[ey]:"fire-fcm",[ty]:"fire-fcm-compat",[ny]:"fire-perf",[ry]:"fire-perf-compat",[sy]:"fire-rc",[iy]:"fire-rc-compat",[oy]:"fire-gcs",[ay]:"fire-gcs-compat",[cy]:"fire-fst",[uy]:"fire-fst-compat",[ly]:"fire-vertex","fire-js":"fire-js",[hy]:"fire-js-all"};/**
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
 */const $o=new Map,py=new Map,kc=new Map;function Ah(n,e){try{n.container.addComponent(e)}catch(t){on.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ts(n){const e=n.name;if(kc.has(e))return on.debug(`There were multiple attempts to register component ${e}.`),!1;kc.set(e,n);for(const t of $o.values())Ah(t,n);for(const t of py.values())Ah(t,n);return!0}function cl(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function $t(n){return n==null?!1:n.settings!==void 0}/**
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
 */const my={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},An=new bi("app","Firebase",my);/**
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
 */class gy{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new _r("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw An.create("app-deleted",{appName:this._name})}}/**
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
 */const fs=dy;function Pf(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ac,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw An.create("bad-app-name",{appName:String(s)});if(t||(t=If()),!t)throw An.create("no-options");const i=$o.get(s);if(i){if(gr(t,i.options)&&gr(r,i.config))return i;throw An.create("duplicate-app",{appName:s})}const a=new T0(s);for(const l of kc.values())a.addComponent(l);const c=new gy(t,r,a);return $o.set(s,c),c}function xf(n=Ac){const e=$o.get(n);if(!e&&n===Ac&&If())return Pf();if(!e)throw An.create("no-app",{appName:n});return e}function kn(n,e,t){var r;let s=(r=fy[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),on.warn(c.join(" "));return}ts(new _r(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const _y="firebase-heartbeat-database",yy=1,ii="firebase-heartbeat-store";let ac=null;function Vf(){return ac||(ac=O0(_y,yy,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ii)}catch(t){console.warn(t)}}}}).catch(n=>{throw An.create("idb-open",{originalErrorMessage:n.message})})),ac}async function vy(n){try{const t=(await Vf()).transaction(ii),r=await t.objectStore(ii).get(Df(n));return await t.done,r}catch(e){if(e instanceof hn)on.warn(e.message);else{const t=An.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});on.warn(t.message)}}}async function kh(n,e){try{const r=(await Vf()).transaction(ii,"readwrite");await r.objectStore(ii).put(e,Df(n)),await r.done}catch(t){if(t instanceof hn)on.warn(t.message);else{const r=An.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});on.warn(r.message)}}}function Df(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Ey=1024,wy=30;class Ty{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Iy(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Sh();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>wy){const a=Ay(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){on.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Sh(),{heartbeatsToSend:r,unsentEntries:s}=by(this._heartbeatsCache.heartbeats),i=Uo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return on.warn(t),""}}}function Sh(){return new Date().toISOString().substring(0,10)}function by(n,e=Ey){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Rh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Rh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Iy{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return u0()?h0().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await vy(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return kh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return kh(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Rh(n){return Uo(JSON.stringify({version:2,heartbeats:n})).length}function Ay(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function ky(n){ts(new _r("platform-logger",e=>new F0(e),"PRIVATE")),ts(new _r("heartbeat",e=>new Ty(e),"PRIVATE")),kn(Ic,Ih,n),kn(Ic,Ih,"esm2017"),kn("fire-js","")}ky("");var Ch=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Sn,Nf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,g){function v(){}v.prototype=g.prototype,y.D=g.prototype,y.prototype=new v,y.prototype.constructor=y,y.C=function(w,T,b){for(var E=Array(arguments.length-2),Ce=2;Ce<arguments.length;Ce++)E[Ce-2]=arguments[Ce];return g.prototype[T].apply(w,E)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(y,g,v){v||(v=0);var w=Array(16);if(typeof g=="string")for(var T=0;16>T;++T)w[T]=g.charCodeAt(v++)|g.charCodeAt(v++)<<8|g.charCodeAt(v++)<<16|g.charCodeAt(v++)<<24;else for(T=0;16>T;++T)w[T]=g[v++]|g[v++]<<8|g[v++]<<16|g[v++]<<24;g=y.g[0],v=y.g[1],T=y.g[2];var b=y.g[3],E=g+(b^v&(T^b))+w[0]+3614090360&4294967295;g=v+(E<<7&4294967295|E>>>25),E=b+(T^g&(v^T))+w[1]+3905402710&4294967295,b=g+(E<<12&4294967295|E>>>20),E=T+(v^b&(g^v))+w[2]+606105819&4294967295,T=b+(E<<17&4294967295|E>>>15),E=v+(g^T&(b^g))+w[3]+3250441966&4294967295,v=T+(E<<22&4294967295|E>>>10),E=g+(b^v&(T^b))+w[4]+4118548399&4294967295,g=v+(E<<7&4294967295|E>>>25),E=b+(T^g&(v^T))+w[5]+1200080426&4294967295,b=g+(E<<12&4294967295|E>>>20),E=T+(v^b&(g^v))+w[6]+2821735955&4294967295,T=b+(E<<17&4294967295|E>>>15),E=v+(g^T&(b^g))+w[7]+4249261313&4294967295,v=T+(E<<22&4294967295|E>>>10),E=g+(b^v&(T^b))+w[8]+1770035416&4294967295,g=v+(E<<7&4294967295|E>>>25),E=b+(T^g&(v^T))+w[9]+2336552879&4294967295,b=g+(E<<12&4294967295|E>>>20),E=T+(v^b&(g^v))+w[10]+4294925233&4294967295,T=b+(E<<17&4294967295|E>>>15),E=v+(g^T&(b^g))+w[11]+2304563134&4294967295,v=T+(E<<22&4294967295|E>>>10),E=g+(b^v&(T^b))+w[12]+1804603682&4294967295,g=v+(E<<7&4294967295|E>>>25),E=b+(T^g&(v^T))+w[13]+4254626195&4294967295,b=g+(E<<12&4294967295|E>>>20),E=T+(v^b&(g^v))+w[14]+2792965006&4294967295,T=b+(E<<17&4294967295|E>>>15),E=v+(g^T&(b^g))+w[15]+1236535329&4294967295,v=T+(E<<22&4294967295|E>>>10),E=g+(T^b&(v^T))+w[1]+4129170786&4294967295,g=v+(E<<5&4294967295|E>>>27),E=b+(v^T&(g^v))+w[6]+3225465664&4294967295,b=g+(E<<9&4294967295|E>>>23),E=T+(g^v&(b^g))+w[11]+643717713&4294967295,T=b+(E<<14&4294967295|E>>>18),E=v+(b^g&(T^b))+w[0]+3921069994&4294967295,v=T+(E<<20&4294967295|E>>>12),E=g+(T^b&(v^T))+w[5]+3593408605&4294967295,g=v+(E<<5&4294967295|E>>>27),E=b+(v^T&(g^v))+w[10]+38016083&4294967295,b=g+(E<<9&4294967295|E>>>23),E=T+(g^v&(b^g))+w[15]+3634488961&4294967295,T=b+(E<<14&4294967295|E>>>18),E=v+(b^g&(T^b))+w[4]+3889429448&4294967295,v=T+(E<<20&4294967295|E>>>12),E=g+(T^b&(v^T))+w[9]+568446438&4294967295,g=v+(E<<5&4294967295|E>>>27),E=b+(v^T&(g^v))+w[14]+3275163606&4294967295,b=g+(E<<9&4294967295|E>>>23),E=T+(g^v&(b^g))+w[3]+4107603335&4294967295,T=b+(E<<14&4294967295|E>>>18),E=v+(b^g&(T^b))+w[8]+1163531501&4294967295,v=T+(E<<20&4294967295|E>>>12),E=g+(T^b&(v^T))+w[13]+2850285829&4294967295,g=v+(E<<5&4294967295|E>>>27),E=b+(v^T&(g^v))+w[2]+4243563512&4294967295,b=g+(E<<9&4294967295|E>>>23),E=T+(g^v&(b^g))+w[7]+1735328473&4294967295,T=b+(E<<14&4294967295|E>>>18),E=v+(b^g&(T^b))+w[12]+2368359562&4294967295,v=T+(E<<20&4294967295|E>>>12),E=g+(v^T^b)+w[5]+4294588738&4294967295,g=v+(E<<4&4294967295|E>>>28),E=b+(g^v^T)+w[8]+2272392833&4294967295,b=g+(E<<11&4294967295|E>>>21),E=T+(b^g^v)+w[11]+1839030562&4294967295,T=b+(E<<16&4294967295|E>>>16),E=v+(T^b^g)+w[14]+4259657740&4294967295,v=T+(E<<23&4294967295|E>>>9),E=g+(v^T^b)+w[1]+2763975236&4294967295,g=v+(E<<4&4294967295|E>>>28),E=b+(g^v^T)+w[4]+1272893353&4294967295,b=g+(E<<11&4294967295|E>>>21),E=T+(b^g^v)+w[7]+4139469664&4294967295,T=b+(E<<16&4294967295|E>>>16),E=v+(T^b^g)+w[10]+3200236656&4294967295,v=T+(E<<23&4294967295|E>>>9),E=g+(v^T^b)+w[13]+681279174&4294967295,g=v+(E<<4&4294967295|E>>>28),E=b+(g^v^T)+w[0]+3936430074&4294967295,b=g+(E<<11&4294967295|E>>>21),E=T+(b^g^v)+w[3]+3572445317&4294967295,T=b+(E<<16&4294967295|E>>>16),E=v+(T^b^g)+w[6]+76029189&4294967295,v=T+(E<<23&4294967295|E>>>9),E=g+(v^T^b)+w[9]+3654602809&4294967295,g=v+(E<<4&4294967295|E>>>28),E=b+(g^v^T)+w[12]+3873151461&4294967295,b=g+(E<<11&4294967295|E>>>21),E=T+(b^g^v)+w[15]+530742520&4294967295,T=b+(E<<16&4294967295|E>>>16),E=v+(T^b^g)+w[2]+3299628645&4294967295,v=T+(E<<23&4294967295|E>>>9),E=g+(T^(v|~b))+w[0]+4096336452&4294967295,g=v+(E<<6&4294967295|E>>>26),E=b+(v^(g|~T))+w[7]+1126891415&4294967295,b=g+(E<<10&4294967295|E>>>22),E=T+(g^(b|~v))+w[14]+2878612391&4294967295,T=b+(E<<15&4294967295|E>>>17),E=v+(b^(T|~g))+w[5]+4237533241&4294967295,v=T+(E<<21&4294967295|E>>>11),E=g+(T^(v|~b))+w[12]+1700485571&4294967295,g=v+(E<<6&4294967295|E>>>26),E=b+(v^(g|~T))+w[3]+2399980690&4294967295,b=g+(E<<10&4294967295|E>>>22),E=T+(g^(b|~v))+w[10]+4293915773&4294967295,T=b+(E<<15&4294967295|E>>>17),E=v+(b^(T|~g))+w[1]+2240044497&4294967295,v=T+(E<<21&4294967295|E>>>11),E=g+(T^(v|~b))+w[8]+1873313359&4294967295,g=v+(E<<6&4294967295|E>>>26),E=b+(v^(g|~T))+w[15]+4264355552&4294967295,b=g+(E<<10&4294967295|E>>>22),E=T+(g^(b|~v))+w[6]+2734768916&4294967295,T=b+(E<<15&4294967295|E>>>17),E=v+(b^(T|~g))+w[13]+1309151649&4294967295,v=T+(E<<21&4294967295|E>>>11),E=g+(T^(v|~b))+w[4]+4149444226&4294967295,g=v+(E<<6&4294967295|E>>>26),E=b+(v^(g|~T))+w[11]+3174756917&4294967295,b=g+(E<<10&4294967295|E>>>22),E=T+(g^(b|~v))+w[2]+718787259&4294967295,T=b+(E<<15&4294967295|E>>>17),E=v+(b^(T|~g))+w[9]+3951481745&4294967295,y.g[0]=y.g[0]+g&4294967295,y.g[1]=y.g[1]+(T+(E<<21&4294967295|E>>>11))&4294967295,y.g[2]=y.g[2]+T&4294967295,y.g[3]=y.g[3]+b&4294967295}r.prototype.u=function(y,g){g===void 0&&(g=y.length);for(var v=g-this.blockSize,w=this.B,T=this.h,b=0;b<g;){if(T==0)for(;b<=v;)s(this,y,b),b+=this.blockSize;if(typeof y=="string"){for(;b<g;)if(w[T++]=y.charCodeAt(b++),T==this.blockSize){s(this,w),T=0;break}}else for(;b<g;)if(w[T++]=y[b++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=g},r.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var g=1;g<y.length-8;++g)y[g]=0;var v=8*this.o;for(g=y.length-8;g<y.length;++g)y[g]=v&255,v/=256;for(this.u(y),y=Array(16),g=v=0;4>g;++g)for(var w=0;32>w;w+=8)y[v++]=this.g[g]>>>w&255;return y};function i(y,g){var v=c;return Object.prototype.hasOwnProperty.call(v,y)?v[y]:v[y]=g(y)}function a(y,g){this.h=g;for(var v=[],w=!0,T=y.length-1;0<=T;T--){var b=y[T]|0;w&&b==g||(v[T]=b,w=!1)}this.g=v}var c={};function l(y){return-128<=y&&128>y?i(y,function(g){return new a([g|0],0>g?-1:0)}):new a([y|0],0>y?-1:0)}function h(y){if(isNaN(y)||!isFinite(y))return p;if(0>y)return x(h(-y));for(var g=[],v=1,w=0;y>=v;w++)g[w]=y/v|0,v*=4294967296;return new a(g,0)}function f(y,g){if(y.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(y.charAt(0)=="-")return x(f(y.substring(1),g));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=h(Math.pow(g,8)),w=p,T=0;T<y.length;T+=8){var b=Math.min(8,y.length-T),E=parseInt(y.substring(T,T+b),g);8>b?(b=h(Math.pow(g,b)),w=w.j(b).add(h(E))):(w=w.j(v),w=w.add(h(E)))}return w}var p=l(0),_=l(1),I=l(16777216);n=a.prototype,n.m=function(){if(V(this))return-x(this).m();for(var y=0,g=1,v=0;v<this.g.length;v++){var w=this.i(v);y+=(0<=w?w:4294967296+w)*g,g*=4294967296}return y},n.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(R(this))return"0";if(V(this))return"-"+x(this).toString(y);for(var g=h(Math.pow(y,6)),v=this,w="";;){var T=z(v,g).g;v=H(v,T.j(g));var b=((0<v.g.length?v.g[0]:v.h)>>>0).toString(y);if(v=T,R(v))return b+w;for(;6>b.length;)b="0"+b;w=b+w}},n.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function R(y){if(y.h!=0)return!1;for(var g=0;g<y.g.length;g++)if(y.g[g]!=0)return!1;return!0}function V(y){return y.h==-1}n.l=function(y){return y=H(this,y),V(y)?-1:R(y)?0:1};function x(y){for(var g=y.g.length,v=[],w=0;w<g;w++)v[w]=~y.g[w];return new a(v,~y.h).add(_)}n.abs=function(){return V(this)?x(this):this},n.add=function(y){for(var g=Math.max(this.g.length,y.g.length),v=[],w=0,T=0;T<=g;T++){var b=w+(this.i(T)&65535)+(y.i(T)&65535),E=(b>>>16)+(this.i(T)>>>16)+(y.i(T)>>>16);w=E>>>16,b&=65535,E&=65535,v[T]=E<<16|b}return new a(v,v[v.length-1]&-2147483648?-1:0)};function H(y,g){return y.add(x(g))}n.j=function(y){if(R(this)||R(y))return p;if(V(this))return V(y)?x(this).j(x(y)):x(x(this).j(y));if(V(y))return x(this.j(x(y)));if(0>this.l(I)&&0>y.l(I))return h(this.m()*y.m());for(var g=this.g.length+y.g.length,v=[],w=0;w<2*g;w++)v[w]=0;for(w=0;w<this.g.length;w++)for(var T=0;T<y.g.length;T++){var b=this.i(w)>>>16,E=this.i(w)&65535,Ce=y.i(T)>>>16,me=y.i(T)&65535;v[2*w+2*T]+=E*me,q(v,2*w+2*T),v[2*w+2*T+1]+=b*me,q(v,2*w+2*T+1),v[2*w+2*T+1]+=E*Ce,q(v,2*w+2*T+1),v[2*w+2*T+2]+=b*Ce,q(v,2*w+2*T+2)}for(w=0;w<g;w++)v[w]=v[2*w+1]<<16|v[2*w];for(w=g;w<2*g;w++)v[w]=0;return new a(v,0)};function q(y,g){for(;(y[g]&65535)!=y[g];)y[g+1]+=y[g]>>>16,y[g]&=65535,g++}function $(y,g){this.g=y,this.h=g}function z(y,g){if(R(g))throw Error("division by zero");if(R(y))return new $(p,p);if(V(y))return g=z(x(y),g),new $(x(g.g),x(g.h));if(V(g))return g=z(y,x(g)),new $(x(g.g),g.h);if(30<y.g.length){if(V(y)||V(g))throw Error("slowDivide_ only works with positive integers.");for(var v=_,w=g;0>=w.l(y);)v=ae(v),w=ae(w);var T=B(v,1),b=B(w,1);for(w=B(w,2),v=B(v,2);!R(w);){var E=b.add(w);0>=E.l(y)&&(T=T.add(v),b=E),w=B(w,1),v=B(v,1)}return g=H(y,T.j(g)),new $(T,g)}for(T=p;0<=y.l(g);){for(v=Math.max(1,Math.floor(y.m()/g.m())),w=Math.ceil(Math.log(v)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),b=h(v),E=b.j(g);V(E)||0<E.l(y);)v-=w,b=h(v),E=b.j(g);R(b)&&(b=_),T=T.add(b),y=H(y,E)}return new $(T,y)}n.A=function(y){return z(this,y).h},n.and=function(y){for(var g=Math.max(this.g.length,y.g.length),v=[],w=0;w<g;w++)v[w]=this.i(w)&y.i(w);return new a(v,this.h&y.h)},n.or=function(y){for(var g=Math.max(this.g.length,y.g.length),v=[],w=0;w<g;w++)v[w]=this.i(w)|y.i(w);return new a(v,this.h|y.h)},n.xor=function(y){for(var g=Math.max(this.g.length,y.g.length),v=[],w=0;w<g;w++)v[w]=this.i(w)^y.i(w);return new a(v,this.h^y.h)};function ae(y){for(var g=y.g.length+1,v=[],w=0;w<g;w++)v[w]=y.i(w)<<1|y.i(w-1)>>>31;return new a(v,y.h)}function B(y,g){var v=g>>5;g%=32;for(var w=y.g.length-v,T=[],b=0;b<w;b++)T[b]=0<g?y.i(b+v)>>>g|y.i(b+v+1)<<32-g:y.i(b+v);return new a(T,y.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Nf=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Sn=a}).apply(typeof Ch<"u"?Ch:typeof self<"u"?self:typeof window<"u"?window:{});var oo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Of,qs,Mf,yo,Sc,Lf,Ff,Uf;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,d){return o==Array.prototype||o==Object.prototype||(o[u]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof oo=="object"&&oo];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,u){if(u)e:{var d=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var A=o[m];if(!(A in d))break e;d=d[A]}o=o[o.length-1],m=d[o],u=u(m),u!=m&&u!=null&&e(d,o,{configurable:!0,writable:!0,value:u})}}function i(o,u){o instanceof String&&(o+="");var d=0,m=!1,A={next:function(){if(!m&&d<o.length){var S=d++;return{value:u(S,o[S]),done:!1}}return m=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}s("Array.prototype.values",function(o){return o||function(){return i(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function h(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function f(o,u,d){return o.call.apply(o.bind,arguments)}function p(o,u,d){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,m),o.apply(u,A)}}return function(){return o.apply(u,arguments)}}function _(o,u,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,_.apply(null,arguments)}function I(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function R(o,u){function d(){}d.prototype=u.prototype,o.aa=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(m,A,S){for(var O=Array(arguments.length-2),ve=2;ve<arguments.length;ve++)O[ve-2]=arguments[ve];return u.prototype[A].apply(m,O)}}function V(o){const u=o.length;if(0<u){const d=Array(u);for(let m=0;m<u;m++)d[m]=o[m];return d}return[]}function x(o,u){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(l(m)){const A=o.length||0,S=m.length||0;o.length=A+S;for(let O=0;O<S;O++)o[A+O]=m[O]}else o.push(m)}}class H{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function q(o){return/^[\s\xa0]*$/.test(o)}function $(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function z(o){return z[" "](o),o}z[" "]=function(){};var ae=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function B(o,u,d){for(const m in o)u.call(d,o[m],m,o)}function y(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function g(o){const u={};for(const d in o)u[d]=o[d];return u}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(o,u){let d,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(d in m)o[d]=m[d];for(let S=0;S<v.length;S++)d=v[S],Object.prototype.hasOwnProperty.call(m,d)&&(o[d]=m[d])}}function T(o){var u=1;o=o.split(":");const d=[];for(;0<u&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function b(o){c.setTimeout(()=>{throw o},0)}function E(){var o=ee;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class Ce{constructor(){this.h=this.g=null}add(u,d){const m=me.get();m.set(u,d),this.h?this.h.next=m:this.g=m,this.h=m}}var me=new H(()=>new N,o=>o.reset());class N{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let F,U=!1,ee=new Ce,ye=()=>{const o=c.Promise.resolve(void 0);F=()=>{o.then(ut)}};var ut=()=>{for(var o;o=E();){try{o.h.call(o.g)}catch(d){b(d)}var u=me;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}U=!1};function pe(){this.s=this.s,this.C=this.C}pe.prototype.s=!1,pe.prototype.ma=function(){this.s||(this.s=!0,this.N())},pe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ue(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}ue.prototype.h=function(){this.defaultPrevented=!0};var kt=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};c.addEventListener("test",d,u),c.removeEventListener("test",d,u)}catch{}return o}();function Xt(o,u){if(ue.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(ae){e:{try{z(u.nodeName);var A=!0;break e}catch{}A=!1}A||(u=null)}}else d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement);this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Es[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Xt.aa.h.call(this)}}R(Xt,ue);var Es={2:"touch",3:"pen",4:"mouse"};Xt.prototype.h=function(){Xt.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Ye="closure_listenable_"+(1e6*Math.random()|0),Wn=0;function Fi(o,u,d,m,A){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!m,this.ha=A,this.key=++Wn,this.da=this.fa=!1}function Kn(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Qn(o){this.src=o,this.g={},this.h=0}Qn.prototype.add=function(o,u,d,m,A){var S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);var O=Sa(o,u,m,A);return-1<O?(u=o[O],d||(u.fa=!1)):(u=new Fi(u,this.src,S,!!m,A),u.fa=d,o.push(u)),u};function dn(o,u){var d=u.type;if(d in o.g){var m=o.g[d],A=Array.prototype.indexOf.call(m,u,void 0),S;(S=0<=A)&&Array.prototype.splice.call(m,A,1),S&&(Kn(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Sa(o,u,d,m){for(var A=0;A<o.length;++A){var S=o[A];if(!S.da&&S.listener==u&&S.capture==!!d&&S.ha==m)return A}return-1}var Ra="closure_lm_"+(1e6*Math.random()|0),Ca={};function cu(o,u,d,m,A){if(Array.isArray(u)){for(var S=0;S<u.length;S++)cu(o,u[S],d,m,A);return null}return d=hu(d),o&&o[Ye]?o.K(u,d,h(m)?!!m.capture:!1,A):mg(o,u,d,!1,m,A)}function mg(o,u,d,m,A,S){if(!u)throw Error("Invalid event type");var O=h(A)?!!A.capture:!!A,ve=xa(o);if(ve||(o[Ra]=ve=new Qn(o)),d=ve.add(u,d,m,O,S),d.proxy)return d;if(m=gg(),d.proxy=m,m.src=o,m.listener=d,o.addEventListener)kt||(A=O),A===void 0&&(A=!1),o.addEventListener(u.toString(),m,A);else if(o.attachEvent)o.attachEvent(uu(u.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function gg(){function o(d){return u.call(o.src,o.listener,d)}const u=_g;return o}function lu(o,u,d,m,A){if(Array.isArray(u))for(var S=0;S<u.length;S++)lu(o,u[S],d,m,A);else m=h(m)?!!m.capture:!!m,d=hu(d),o&&o[Ye]?(o=o.i,u=String(u).toString(),u in o.g&&(S=o.g[u],d=Sa(S,d,m,A),-1<d&&(Kn(S[d]),Array.prototype.splice.call(S,d,1),S.length==0&&(delete o.g[u],o.h--)))):o&&(o=xa(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Sa(u,d,m,A)),(d=-1<o?u[o]:null)&&Pa(d))}function Pa(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Ye])dn(u.i,o);else{var d=o.type,m=o.proxy;u.removeEventListener?u.removeEventListener(d,m,o.capture):u.detachEvent?u.detachEvent(uu(d),m):u.addListener&&u.removeListener&&u.removeListener(m),(d=xa(u))?(dn(d,o),d.h==0&&(d.src=null,u[Ra]=null)):Kn(o)}}}function uu(o){return o in Ca?Ca[o]:Ca[o]="on"+o}function _g(o,u){if(o.da)o=!0;else{u=new Xt(u,this);var d=o.listener,m=o.ha||o.src;o.fa&&Pa(o),o=d.call(m,u)}return o}function xa(o){return o=o[Ra],o instanceof Qn?o:null}var Va="__closure_events_fn_"+(1e9*Math.random()>>>0);function hu(o){return typeof o=="function"?o:(o[Va]||(o[Va]=function(u){return o.handleEvent(u)}),o[Va])}function Ze(){pe.call(this),this.i=new Qn(this),this.M=this,this.F=null}R(Ze,pe),Ze.prototype[Ye]=!0,Ze.prototype.removeEventListener=function(o,u,d,m){lu(this,o,u,d,m)};function ht(o,u){var d,m=o.F;if(m)for(d=[];m;m=m.F)d.push(m);if(o=o.M,m=u.type||u,typeof u=="string")u=new ue(u,o);else if(u instanceof ue)u.target=u.target||o;else{var A=u;u=new ue(m,o),w(u,A)}if(A=!0,d)for(var S=d.length-1;0<=S;S--){var O=u.g=d[S];A=Ui(O,m,!0,u)&&A}if(O=u.g=o,A=Ui(O,m,!0,u)&&A,A=Ui(O,m,!1,u)&&A,d)for(S=0;S<d.length;S++)O=u.g=d[S],A=Ui(O,m,!1,u)&&A}Ze.prototype.N=function(){if(Ze.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var d=o.g[u],m=0;m<d.length;m++)Kn(d[m]);delete o.g[u],o.h--}}this.F=null},Ze.prototype.K=function(o,u,d,m){return this.i.add(String(o),u,!1,d,m)},Ze.prototype.L=function(o,u,d,m){return this.i.add(String(o),u,!0,d,m)};function Ui(o,u,d,m){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var A=!0,S=0;S<u.length;++S){var O=u[S];if(O&&!O.da&&O.capture==d){var ve=O.listener,Ke=O.ha||O.src;O.fa&&dn(o.i,O),A=ve.call(Ke,m)!==!1&&A}}return A&&!m.defaultPrevented}function du(o,u,d){if(typeof o=="function")d&&(o=_(o,d));else if(o&&typeof o.handleEvent=="function")o=_(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function fu(o){o.g=du(()=>{o.g=null,o.i&&(o.i=!1,fu(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class yg extends pe{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:fu(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ws(o){pe.call(this),this.h=o,this.g={}}R(ws,pe);var pu=[];function mu(o){B(o.g,function(u,d){this.g.hasOwnProperty(d)&&Pa(u)},o),o.g={}}ws.prototype.N=function(){ws.aa.N.call(this),mu(this)},ws.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Da=c.JSON.stringify,vg=c.JSON.parse,Eg=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function Na(){}Na.prototype.h=null;function gu(o){return o.h||(o.h=o.i())}function _u(){}var Ts={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Oa(){ue.call(this,"d")}R(Oa,ue);function Ma(){ue.call(this,"c")}R(Ma,ue);var Jn={},yu=null;function $i(){return yu=yu||new Ze}Jn.La="serverreachability";function vu(o){ue.call(this,Jn.La,o)}R(vu,ue);function bs(o){const u=$i();ht(u,new vu(u))}Jn.STAT_EVENT="statevent";function Eu(o,u){ue.call(this,Jn.STAT_EVENT,o),this.stat=u}R(Eu,ue);function dt(o){const u=$i();ht(u,new Eu(u,o))}Jn.Ma="timingevent";function wu(o,u){ue.call(this,Jn.Ma,o),this.size=u}R(wu,ue);function Is(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function As(){this.g=!0}As.prototype.xa=function(){this.g=!1};function wg(o,u,d,m,A,S){o.info(function(){if(o.g)if(S)for(var O="",ve=S.split("&"),Ke=0;Ke<ve.length;Ke++){var he=ve[Ke].split("=");if(1<he.length){var et=he[0];he=he[1];var tt=et.split("_");O=2<=tt.length&&tt[1]=="type"?O+(et+"="+he+"&"):O+(et+"=redacted&")}}else O=null;else O=S;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+u+`
`+d+`
`+O})}function Tg(o,u,d,m,A,S,O){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+u+`
`+d+`
`+S+" "+O})}function kr(o,u,d,m){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Ig(o,d)+(m?" "+m:"")})}function bg(o,u){o.info(function(){return"TIMEOUT: "+u})}As.prototype.info=function(){};function Ig(o,u){if(!o.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var m=d[o];if(!(2>m.length)){var A=m[1];if(Array.isArray(A)&&!(1>A.length)){var S=A[0];if(S!="noop"&&S!="stop"&&S!="close")for(var O=1;O<A.length;O++)A[O]=""}}}}return Da(d)}catch{return u}}var ji={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Tu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},La;function qi(){}R(qi,Na),qi.prototype.g=function(){return new XMLHttpRequest},qi.prototype.i=function(){return{}},La=new qi;function fn(o,u,d,m){this.j=o,this.i=u,this.l=d,this.R=m||1,this.U=new ws(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new bu}function bu(){this.i=null,this.g="",this.h=!1}var Iu={},Fa={};function Ua(o,u,d){o.L=1,o.v=Gi(Yt(u)),o.m=d,o.P=!0,Au(o,null)}function Au(o,u){o.F=Date.now(),Bi(o),o.A=Yt(o.v);var d=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),Uu(d.i,"t",m),o.C=0,d=o.j.J,o.h=new bu,o.g=rh(o.j,d?u:null,!o.m),0<o.O&&(o.M=new yg(_(o.Y,o,o.g),o.O)),u=o.U,d=o.g,m=o.ca;var A="readystatechange";Array.isArray(A)||(A&&(pu[0]=A.toString()),A=pu);for(var S=0;S<A.length;S++){var O=cu(d,A[S],m||u.handleEvent,!1,u.h||u);if(!O)break;u.g[O.key]=O}u=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),bs(),wg(o.i,o.u,o.A,o.l,o.R,o.m)}fn.prototype.ca=function(o){o=o.target;const u=this.M;u&&Zt(o)==3?u.j():this.Y(o)},fn.prototype.Y=function(o){try{if(o==this.g)e:{const tt=Zt(this.g);var u=this.g.Ba();const Cr=this.g.Z();if(!(3>tt)&&(tt!=3||this.g&&(this.h.h||this.g.oa()||Gu(this.g)))){this.J||tt!=4||u==7||(u==8||0>=Cr?bs(3):bs(2)),$a(this);var d=this.g.Z();this.X=d;t:if(ku(this)){var m=Gu(this.g);o="";var A=m.length,S=Zt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Xn(this),ks(this);var O="";break t}this.h.i=new c.TextDecoder}for(u=0;u<A;u++)this.h.h=!0,o+=this.h.i.decode(m[u],{stream:!(S&&u==A-1)});m.length=0,this.h.g+=o,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,Tg(this.i,this.u,this.A,this.l,this.R,tt,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ve,Ke=this.g;if((ve=Ke.g?Ke.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(ve)){var he=ve;break t}}he=null}if(d=he)kr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ja(this,d);else{this.o=!1,this.s=3,dt(12),Xn(this),ks(this);break e}}if(this.P){d=!0;let St;for(;!this.J&&this.C<O.length;)if(St=Ag(this,O),St==Fa){tt==4&&(this.s=4,dt(14),d=!1),kr(this.i,this.l,null,"[Incomplete Response]");break}else if(St==Iu){this.s=4,dt(15),kr(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else kr(this.i,this.l,St,null),ja(this,St);if(ku(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),tt!=4||O.length!=0||this.h.h||(this.s=1,dt(16),d=!1),this.o=this.o&&d,!d)kr(this.i,this.l,O,"[Invalid Chunked Response]"),Xn(this),ks(this);else if(0<O.length&&!this.W){this.W=!0;var et=this.j;et.g==this&&et.ba&&!et.M&&(et.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),Wa(et),et.M=!0,dt(11))}}else kr(this.i,this.l,O,null),ja(this,O);tt==4&&Xn(this),this.o&&!this.J&&(tt==4?Zu(this.j,this):(this.o=!1,Bi(this)))}else qg(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,dt(12)):(this.s=0,dt(13)),Xn(this),ks(this)}}}catch{}finally{}};function ku(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Ag(o,u){var d=o.C,m=u.indexOf(`
`,d);return m==-1?Fa:(d=Number(u.substring(d,m)),isNaN(d)?Iu:(m+=1,m+d>u.length?Fa:(u=u.slice(m,m+d),o.C=m+d,u)))}fn.prototype.cancel=function(){this.J=!0,Xn(this)};function Bi(o){o.S=Date.now()+o.I,Su(o,o.I)}function Su(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Is(_(o.ba,o),u)}function $a(o){o.B&&(c.clearTimeout(o.B),o.B=null)}fn.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(bg(this.i,this.A),this.L!=2&&(bs(),dt(17)),Xn(this),this.s=2,ks(this)):Su(this,this.S-o)};function ks(o){o.j.G==0||o.J||Zu(o.j,o)}function Xn(o){$a(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,mu(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function ja(o,u){try{var d=o.j;if(d.G!=0&&(d.g==o||qa(d.h,o))){if(!o.K&&qa(d.h,o)&&d.G==3){try{var m=d.Da.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)Yi(d),Ji(d);else break e;Ga(d),dt(18)}}else d.za=A[1],0<d.za-d.T&&37500>A[2]&&d.F&&d.v==0&&!d.C&&(d.C=Is(_(d.Za,d),6e3));if(1>=Pu(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Zn(d,11)}else if((o.K||d.g==o)&&Yi(d),!q(u))for(A=d.Da.g.parse(u),u=0;u<A.length;u++){let he=A[u];if(d.T=he[0],he=he[1],d.G==2)if(he[0]=="c"){d.K=he[1],d.ia=he[2];const et=he[3];et!=null&&(d.la=et,d.j.info("VER="+d.la));const tt=he[4];tt!=null&&(d.Aa=tt,d.j.info("SVER="+d.Aa));const Cr=he[5];Cr!=null&&typeof Cr=="number"&&0<Cr&&(m=1.5*Cr,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const St=o.g;if(St){const eo=St.g?St.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(eo){var S=m.h;S.g||eo.indexOf("spdy")==-1&&eo.indexOf("quic")==-1&&eo.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Ba(S,S.h),S.h=null))}if(m.D){const Ka=St.g?St.g.getResponseHeader("X-HTTP-Session-Id"):null;Ka&&(m.ya=Ka,Te(m.I,m.D,Ka))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var O=o;if(m.qa=nh(m,m.J?m.ia:null,m.W),O.K){xu(m.h,O);var ve=O,Ke=m.L;Ke&&(ve.I=Ke),ve.B&&($a(ve),Bi(ve)),m.g=O}else Xu(m);0<d.i.length&&Xi(d)}else he[0]!="stop"&&he[0]!="close"||Zn(d,7);else d.G==3&&(he[0]=="stop"||he[0]=="close"?he[0]=="stop"?Zn(d,7):Ha(d):he[0]!="noop"&&d.l&&d.l.ta(he),d.v=0)}}bs(4)}catch{}}var kg=class{constructor(o,u){this.g=o,this.map=u}};function Ru(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Cu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Pu(o){return o.h?1:o.g?o.g.size:0}function qa(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Ba(o,u){o.g?o.g.add(u):o.h=u}function xu(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Ru.prototype.cancel=function(){if(this.i=Vu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Vu(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.D);return u}return V(o.i)}function Sg(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],d=o.length,m=0;m<d;m++)u.push(o[m]);return u}u=[],d=0;for(m in o)u[d++]=o[m];return u}function Rg(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var d=0;d<o;d++)u.push(d);return u}u=[],d=0;for(const m in o)u[d++]=m;return u}}}function Du(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var d=Rg(o),m=Sg(o),A=m.length,S=0;S<A;S++)u.call(void 0,m[S],d&&d[S],o)}var Nu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Cg(o,u){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var m=o[d].indexOf("="),A=null;if(0<=m){var S=o[d].substring(0,m);A=o[d].substring(m+1)}else S=o[d];u(S,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Yn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Yn){this.h=o.h,zi(this,o.j),this.o=o.o,this.g=o.g,Hi(this,o.s),this.l=o.l;var u=o.i,d=new Cs;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),Ou(this,d),this.m=o.m}else o&&(u=String(o).match(Nu))?(this.h=!1,zi(this,u[1]||"",!0),this.o=Ss(u[2]||""),this.g=Ss(u[3]||"",!0),Hi(this,u[4]),this.l=Ss(u[5]||"",!0),Ou(this,u[6]||"",!0),this.m=Ss(u[7]||"")):(this.h=!1,this.i=new Cs(null,this.h))}Yn.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Rs(u,Mu,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Rs(u,Mu,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Rs(d,d.charAt(0)=="/"?Vg:xg,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Rs(d,Ng)),o.join("")};function Yt(o){return new Yn(o)}function zi(o,u,d){o.j=d?Ss(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Hi(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function Ou(o,u,d){u instanceof Cs?(o.i=u,Og(o.i,o.h)):(d||(u=Rs(u,Dg)),o.i=new Cs(u,o.h))}function Te(o,u,d){o.i.set(u,d)}function Gi(o){return Te(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Ss(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Rs(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,Pg),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Pg(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Mu=/[#\/\?@]/g,xg=/[#\?:]/g,Vg=/[#\?]/g,Dg=/[#\?@]/g,Ng=/#/g;function Cs(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function pn(o){o.g||(o.g=new Map,o.h=0,o.i&&Cg(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=Cs.prototype,n.add=function(o,u){pn(this),this.i=null,o=Sr(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function Lu(o,u){pn(o),u=Sr(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function Fu(o,u){return pn(o),u=Sr(o,u),o.g.has(u)}n.forEach=function(o,u){pn(this),this.g.forEach(function(d,m){d.forEach(function(A){o.call(u,A,m,this)},this)},this)},n.na=function(){pn(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let m=0;m<u.length;m++){const A=o[m];for(let S=0;S<A.length;S++)d.push(u[m])}return d},n.V=function(o){pn(this);let u=[];if(typeof o=="string")Fu(this,o)&&(u=u.concat(this.g.get(Sr(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)u=u.concat(o[d])}return u},n.set=function(o,u){return pn(this),this.i=null,o=Sr(this,o),Fu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function Uu(o,u,d){Lu(o,u),0<d.length&&(o.i=null,o.g.set(Sr(o,u),V(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var m=u[d];const S=encodeURIComponent(String(m)),O=this.V(m);for(m=0;m<O.length;m++){var A=S;O[m]!==""&&(A+="="+encodeURIComponent(String(O[m]))),o.push(A)}}return this.i=o.join("&")};function Sr(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Og(o,u){u&&!o.j&&(pn(o),o.i=null,o.g.forEach(function(d,m){var A=m.toLowerCase();m!=A&&(Lu(this,m),Uu(this,A,d))},o)),o.j=u}function Mg(o,u){const d=new As;if(c.Image){const m=new Image;m.onload=I(mn,d,"TestLoadImage: loaded",!0,u,m),m.onerror=I(mn,d,"TestLoadImage: error",!1,u,m),m.onabort=I(mn,d,"TestLoadImage: abort",!1,u,m),m.ontimeout=I(mn,d,"TestLoadImage: timeout",!1,u,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else u(!1)}function Lg(o,u){const d=new As,m=new AbortController,A=setTimeout(()=>{m.abort(),mn(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:m.signal}).then(S=>{clearTimeout(A),S.ok?mn(d,"TestPingServer: ok",!0,u):mn(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(A),mn(d,"TestPingServer: error",!1,u)})}function mn(o,u,d,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(d)}catch{}}function Fg(){this.g=new Eg}function Ug(o,u,d){const m=d||"";try{Du(o,function(A,S){let O=A;h(A)&&(O=Da(A)),u.push(m+S+"="+encodeURIComponent(O))})}catch(A){throw u.push(m+"type="+encodeURIComponent("_badmap")),A}}function Wi(o){this.l=o.Ub||null,this.j=o.eb||!1}R(Wi,Na),Wi.prototype.g=function(){return new Ki(this.l,this.j)},Wi.prototype.i=function(o){return function(){return o}}({});function Ki(o,u){Ze.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(Ki,Ze),n=Ki.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,xs(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ps(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,xs(this)),this.g&&(this.readyState=3,xs(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;$u(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function $u(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Ps(this):xs(this),this.readyState==3&&$u(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Ps(this))},n.Qa=function(o){this.g&&(this.response=o,Ps(this))},n.ga=function(){this.g&&Ps(this)};function Ps(o){o.readyState=4,o.l=null,o.j=null,o.v=null,xs(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function xs(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Ki.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function ju(o){let u="";return B(o,function(d,m){u+=m,u+=":",u+=d,u+=`\r
`}),u}function za(o,u,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=ju(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):Te(o,u,d))}function De(o){Ze.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(De,Ze);var $g=/^https?$/i,jg=["POST","PUT"];n=De.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():La.g(),this.v=this.o?gu(this.o):gu(La),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(S){qu(this,S);return}if(o=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)d.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const S of m.keys())d.set(S,m.get(S));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),A=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(jg,u,void 0))||m||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,O]of d)this.g.setRequestHeader(S,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Hu(this),this.u=!0,this.g.send(o),this.u=!1}catch(S){qu(this,S)}};function qu(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Bu(o),Qi(o)}function Bu(o){o.A||(o.A=!0,ht(o,"complete"),ht(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ht(this,"complete"),ht(this,"abort"),Qi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Qi(this,!0)),De.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?zu(this):this.bb())},n.bb=function(){zu(this)};function zu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Zt(o)!=4||o.Z()!=2)){if(o.u&&Zt(o)==4)du(o.Ea,0,o);else if(ht(o,"readystatechange"),Zt(o)==4){o.h=!1;try{const O=o.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var m;if(m=O===0){var A=String(o.D).match(Nu)[1]||null;!A&&c.self&&c.self.location&&(A=c.self.location.protocol.slice(0,-1)),m=!$g.test(A?A.toLowerCase():"")}d=m}if(d)ht(o,"complete"),ht(o,"success");else{o.m=6;try{var S=2<Zt(o)?o.g.statusText:""}catch{S=""}o.l=S+" ["+o.Z()+"]",Bu(o)}}finally{Qi(o)}}}}function Qi(o,u){if(o.g){Hu(o);const d=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||ht(o,"ready");try{d.onreadystatechange=m}catch{}}}function Hu(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function Zt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<Zt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),vg(u)}};function Gu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function qg(o){const u={};o=(o.g&&2<=Zt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(q(o[m]))continue;var d=T(o[m]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=u[A]||[];u[A]=S,S.push(d)}y(u,function(m){return m.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Vs(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function Wu(o){this.Aa=0,this.i=[],this.j=new As,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Vs("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Vs("baseRetryDelayMs",5e3,o),this.cb=Vs("retryDelaySeedMs",1e4,o),this.Wa=Vs("forwardChannelMaxRetries",2,o),this.wa=Vs("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Ru(o&&o.concurrentRequestLimit),this.Da=new Fg,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Wu.prototype,n.la=8,n.G=1,n.connect=function(o,u,d,m){dt(0),this.W=o,this.H=u||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=nh(this,null,this.W),Xi(this)};function Ha(o){if(Ku(o),o.G==3){var u=o.U++,d=Yt(o.I);if(Te(d,"SID",o.K),Te(d,"RID",u),Te(d,"TYPE","terminate"),Ds(o,d),u=new fn(o,o.j,u),u.L=2,u.v=Gi(Yt(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=u.v,d=!0),d||(u.g=rh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Bi(u)}th(o)}function Ji(o){o.g&&(Wa(o),o.g.cancel(),o.g=null)}function Ku(o){Ji(o),o.u&&(c.clearTimeout(o.u),o.u=null),Yi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Xi(o){if(!Cu(o.h)&&!o.s){o.s=!0;var u=o.Ga;F||ye(),U||(F(),U=!0),ee.add(u,o),o.B=0}}function Bg(o,u){return Pu(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Is(_(o.Ga,o,u),eh(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const A=new fn(this,this.j,o);let S=this.o;if(this.S&&(S?(S=g(S),w(S,this.S)):S=this.S),this.m!==null||this.O||(A.H=S,S=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(u+=m,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=Ju(this,A,u),d=Yt(this.I),Te(d,"RID",o),Te(d,"CVER",22),this.D&&Te(d,"X-HTTP-Session-Id",this.D),Ds(this,d),S&&(this.O?u="headers="+encodeURIComponent(String(ju(S)))+"&"+u:this.m&&za(d,this.m,S)),Ba(this.h,A),this.Ua&&Te(d,"TYPE","init"),this.P?(Te(d,"$req",u),Te(d,"SID","null"),A.T=!0,Ua(A,d,null)):Ua(A,d,u),this.G=2}}else this.G==3&&(o?Qu(this,o):this.i.length==0||Cu(this.h)||Qu(this))};function Qu(o,u){var d;u?d=u.l:d=o.U++;const m=Yt(o.I);Te(m,"SID",o.K),Te(m,"RID",d),Te(m,"AID",o.T),Ds(o,m),o.m&&o.o&&za(m,o.m,o.o),d=new fn(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Ju(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ba(o.h,d),Ua(d,m,u)}function Ds(o,u){o.H&&B(o.H,function(d,m){Te(u,m,d)}),o.l&&Du({},function(d,m){Te(u,m,d)})}function Ju(o,u,d){d=Math.min(o.i.length,d);var m=o.l?_(o.l.Na,o.l,o):null;e:{var A=o.i;let S=-1;for(;;){const O=["count="+d];S==-1?0<d?(S=A[0].g,O.push("ofs="+S)):S=0:O.push("ofs="+S);let ve=!0;for(let Ke=0;Ke<d;Ke++){let he=A[Ke].g;const et=A[Ke].map;if(he-=S,0>he)S=Math.max(0,A[Ke].g-100),ve=!1;else try{Ug(et,O,"req"+he+"_")}catch{m&&m(et)}}if(ve){m=O.join("&");break e}}}return o=o.i.splice(0,d),u.D=o,m}function Xu(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;F||ye(),U||(F(),U=!0),ee.add(u,o),o.v=0}}function Ga(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Is(_(o.Fa,o),eh(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Yu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Is(_(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,dt(10),Ji(this),Yu(this))};function Wa(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Yu(o){o.g=new fn(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=Yt(o.qa);Te(u,"RID","rpc"),Te(u,"SID",o.K),Te(u,"AID",o.T),Te(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&Te(u,"TO",o.ja),Te(u,"TYPE","xmlhttp"),Ds(o,u),o.m&&o.o&&za(u,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Gi(Yt(u)),d.m=null,d.P=!0,Au(d,o)}n.Za=function(){this.C!=null&&(this.C=null,Ji(this),Ga(this),dt(19))};function Yi(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Zu(o,u){var d=null;if(o.g==u){Yi(o),Wa(o),o.g=null;var m=2}else if(qa(o.h,u))d=u.D,xu(o.h,u),m=1;else return;if(o.G!=0){if(u.o)if(m==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var A=o.B;m=$i(),ht(m,new wu(m,d)),Xi(o)}else Xu(o);else if(A=u.s,A==3||A==0&&0<u.X||!(m==1&&Bg(o,u)||m==2&&Ga(o)))switch(d&&0<d.length&&(u=o.h,u.i=u.i.concat(d)),A){case 1:Zn(o,5);break;case 4:Zn(o,10);break;case 3:Zn(o,6);break;default:Zn(o,2)}}}function eh(o,u){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*u}function Zn(o,u){if(o.j.info("Error code "+u),u==2){var d=_(o.fb,o),m=o.Xa;const A=!m;m=new Yn(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||zi(m,"https"),Gi(m),A?Mg(m.toString(),d):Lg(m.toString(),d)}else dt(2);o.G=0,o.l&&o.l.sa(u),th(o),Ku(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),dt(2)):(this.j.info("Failed to ping google.com"),dt(1))};function th(o){if(o.G=0,o.ka=[],o.l){const u=Vu(o.h);(u.length!=0||o.i.length!=0)&&(x(o.ka,u),x(o.ka,o.i),o.h.i.length=0,V(o.i),o.i.length=0),o.l.ra()}}function nh(o,u,d){var m=d instanceof Yn?Yt(d):new Yn(d);if(m.g!="")u&&(m.g=u+"."+m.g),Hi(m,m.s);else{var A=c.location;m=A.protocol,u=u?u+"."+A.hostname:A.hostname,A=+A.port;var S=new Yn(null);m&&zi(S,m),u&&(S.g=u),A&&Hi(S,A),d&&(S.l=d),m=S}return d=o.D,u=o.ya,d&&u&&Te(m,d,u),Te(m,"VER",o.la),Ds(o,m),m}function rh(o,u,d){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new De(new Wi({eb:d})):new De(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function sh(){}n=sh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Zi(){}Zi.prototype.g=function(o,u){return new vt(o,u)};function vt(o,u){Ze.call(this),this.g=new Wu(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!q(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!q(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Rr(this)}R(vt,Ze),vt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},vt.prototype.close=function(){Ha(this.g)},vt.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=Da(o),o=d);u.i.push(new kg(u.Ya++,o)),u.G==3&&Xi(u)},vt.prototype.N=function(){this.g.l=null,delete this.j,Ha(this.g),delete this.g,vt.aa.N.call(this)};function ih(o){Oa.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const d in u){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}R(ih,Oa);function oh(){Ma.call(this),this.status=1}R(oh,Ma);function Rr(o){this.g=o}R(Rr,sh),Rr.prototype.ua=function(){ht(this.g,"a")},Rr.prototype.ta=function(o){ht(this.g,new ih(o))},Rr.prototype.sa=function(o){ht(this.g,new oh)},Rr.prototype.ra=function(){ht(this.g,"b")},Zi.prototype.createWebChannel=Zi.prototype.g,vt.prototype.send=vt.prototype.o,vt.prototype.open=vt.prototype.m,vt.prototype.close=vt.prototype.close,Uf=function(){return new Zi},Ff=function(){return $i()},Lf=Jn,Sc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ji.NO_ERROR=0,ji.TIMEOUT=8,ji.HTTP_ERROR=6,yo=ji,Tu.COMPLETE="complete",Mf=Tu,_u.EventType=Ts,Ts.OPEN="a",Ts.CLOSE="b",Ts.ERROR="c",Ts.MESSAGE="d",Ze.prototype.listen=Ze.prototype.K,qs=_u,De.prototype.listenOnce=De.prototype.L,De.prototype.getLastError=De.prototype.Ka,De.prototype.getLastErrorCode=De.prototype.Ba,De.prototype.getStatus=De.prototype.Z,De.prototype.getResponseJson=De.prototype.Oa,De.prototype.getResponseText=De.prototype.oa,De.prototype.send=De.prototype.ea,De.prototype.setWithCredentials=De.prototype.Ha,Of=De}).apply(typeof oo<"u"?oo:typeof self<"u"?self:typeof window<"u"?window:{});const Ph="@firebase/firestore",xh="4.8.0";/**
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
 */class st{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}st.UNAUTHENTICATED=new st(null),st.GOOGLE_CREDENTIALS=new st("google-credentials-uid"),st.FIRST_PARTY=new st("first-party-uid"),st.MOCK_USER=new st("mock-user");/**
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
 */let ps="11.10.0";/**
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
 */const yr=new ol("@firebase/firestore");function Or(){return yr.logLevel}function j(n,...e){if(yr.logLevel<=ne.DEBUG){const t=e.map(ll);yr.debug(`Firestore (${ps}): ${n}`,...t)}}function an(n,...e){if(yr.logLevel<=ne.ERROR){const t=e.map(ll);yr.error(`Firestore (${ps}): ${n}`,...t)}}function Ln(n,...e){if(yr.logLevel<=ne.WARN){const t=e.map(ll);yr.warn(`Firestore (${ps}): ${n}`,...t)}}function ll(n){if(typeof n=="string")return n;try{/**
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
 */function K(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,$f(n,r,t)}function $f(n,e,t){let r=`FIRESTORE (${ps}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw an(r),new Error(r)}function le(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||$f(e,s,r)}function Z(n,e){return n}/**
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
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends hn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class rn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class jf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Sy{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(st.UNAUTHENTICATED))}shutdown(){}}class Ry{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Cy{constructor(e){this.t=e,this.currentUser=st.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){le(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new rn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new rn,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{j("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(j("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new rn)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(j("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(le(typeof r.accessToken=="string",31837,{l:r}),new jf(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return le(e===null||typeof e=="string",2055,{h:e}),new st(e)}}class Py{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=st.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class xy{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Py(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(st.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Vh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Vy{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,$t(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){le(this.o===void 0,3512);const r=i=>{i.error!=null&&j("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,j("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{j("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):j("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Vh(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(le(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Vh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Dy(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */function qf(){return new TextEncoder}/**
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
 */class ul{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Dy(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function te(n,e){return n<e?-1:n>e?1:0}function Rc(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),s=e.codePointAt(t);if(r!==s){if(r<128&&s<128)return te(r,s);{const i=qf(),a=Ny(i.encode(Dh(n,t)),i.encode(Dh(e,t)));return a!==0?a:te(r,s)}}t+=r>65535?2:1}return te(n.length,e.length)}function Dh(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function Ny(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return te(n[t],e[t]);return te(n.length,e.length)}function ns(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
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
 */const Nh="__name__";class Ft{constructor(e,t,r){t===void 0?t=0:t>e.length&&K(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&K(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ft.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ft?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Ft.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return te(e.length,t.length)}static compareSegments(e,t){const r=Ft.isNumericId(e),s=Ft.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Ft.extractNumericId(e).compare(Ft.extractNumericId(t)):Rc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Sn.fromString(e.substring(4,e.length-2))}}class _e extends Ft{construct(e,t,r){return new _e(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new M(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new _e(t)}static emptyPath(){return new _e([])}}const Oy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Je extends Ft{construct(e,t,r){return new Je(e,t,r)}static isValidIdentifier(e){return Oy.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Je.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Nh}static keyField(){return new Je([Nh])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new M(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new M(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new M(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new M(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Je(t)}static emptyPath(){return new Je([])}}/**
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
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(_e.fromString(e))}static fromName(e){return new G(_e.fromString(e).popFirst(5))}static empty(){return new G(_e.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&_e.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return _e.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new _e(e.slice()))}}/**
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
 */function Bf(n,e,t){if(!t)throw new M(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function My(n,e,t,r){if(e===!0&&r===!0)throw new M(C.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Oh(n){if(!G.isDocumentKey(n))throw new M(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Mh(n){if(G.isDocumentKey(n))throw new M(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function zf(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function la(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":K(12329,{type:typeof n})}function At(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new M(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=la(n);throw new M(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function $e(n,e){const t={typeString:n};return e&&(t.value=e),t}function Ai(n,e){if(!zf(n))throw new M(C.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new M(C.INVALID_ARGUMENT,t);return!0}/**
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
 */const Lh=-62135596800,Fh=1e6;class Ae{static now(){return Ae.fromMillis(Date.now())}static fromDate(e){return Ae.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Fh);return new Ae(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Lh)throw new M(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Fh}_compareTo(e){return this.seconds===e.seconds?te(this.nanoseconds,e.nanoseconds):te(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ae._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ai(e,Ae._jsonSchema))return new Ae(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Lh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ae._jsonSchemaVersion="firestore/timestamp/1.0",Ae._jsonSchema={type:$e("string",Ae._jsonSchemaVersion),seconds:$e("number"),nanoseconds:$e("number")};/**
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
 */class X{static fromTimestamp(e){return new X(e)}static min(){return new X(new Ae(0,0))}static max(){return new X(new Ae(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const oi=-1;function Ly(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=X.fromTimestamp(r===1e9?new Ae(t+1,0):new Ae(t,r));return new Fn(s,G.empty(),e)}function Fy(n){return new Fn(n.readTime,n.key,oi)}class Fn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Fn(X.min(),G.empty(),oi)}static max(){return new Fn(X.max(),G.empty(),oi)}}function Uy(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=G.comparator(n.documentKey,e.documentKey),t!==0?t:te(n.largestBatchId,e.largestBatchId))}/**
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
 */const $y="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class jy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function ms(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==$y)throw n;j("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&K(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,r)=>{t(e)})}static reject(e){return new P((t,r)=>{r(e)})}static waitFor(e){return new P((t,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&t()},l=>r(l))}),a=!0,i===s&&t()})}static or(e){let t=P.resolve(!1);for(const r of e)t=t.next(s=>s?P.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new P((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;t(e[h]).next(f=>{a[h]=f,++c,c===i&&r(a)},f=>s(f))}})}static doWhile(e,t){return new P((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function qy(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function gs(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class ua{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}ua.ue=-1;/**
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
 */const hl=-1;function ki(n){return n==null}function jo(n){return n===0&&1/n==-1/0}function By(n){return typeof n=="number"&&Number.isInteger(n)&&!jo(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Hf="";function zy(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Uh(e)),e=Hy(n.get(t),e);return Uh(e)}function Hy(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Hf:t+="";break;default:t+=i}}return t}function Uh(n){return n+Hf+""}/**
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
 */function $h(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Hn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Gf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Ve{constructor(e,t){this.comparator=e,this.root=t||Qe.EMPTY}insert(e,t){return new Ve(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Qe.BLACK,null,null))}remove(e){return new Ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Qe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ao(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ao(this.root,e,this.comparator,!1)}getReverseIterator(){return new ao(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ao(this.root,e,this.comparator,!0)}}class ao{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Qe{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Qe.RED,this.left=s??Qe.EMPTY,this.right=i??Qe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Qe(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Qe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Qe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Qe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Qe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw K(43730,{key:this.key,value:this.value});if(this.right.isRed())throw K(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw K(27949);return e+(this.isRed()?0:1)}}Qe.EMPTY=null,Qe.RED=!0,Qe.BLACK=!1;Qe.EMPTY=new class{constructor(){this.size=0}get key(){throw K(57766)}get value(){throw K(16141)}get color(){throw K(16727)}get left(){throw K(29726)}get right(){throw K(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Qe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class qe{constructor(e){this.comparator=e,this.data=new Ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new jh(this.data.getIterator())}getIteratorFrom(e){return new jh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof qe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new qe(this.comparator);return t.data=e,t}}class jh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class wt{constructor(e){this.fields=e,e.sort(Je.comparator)}static empty(){return new wt([])}unionWith(e){let t=new qe(Je.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new wt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ns(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Wf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Xe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Wf("Invalid base64 string: "+i):i}}(e);return new Xe(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new Xe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return te(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Xe.EMPTY_BYTE_STRING=new Xe("");const Gy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Un(n){if(le(!!n,39018),typeof n=="string"){let e=0;const t=Gy.exec(n);if(le(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Me(n.seconds),nanos:Me(n.nanos)}}function Me(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function $n(n){return typeof n=="string"?Xe.fromBase64String(n):Xe.fromUint8Array(n)}/**
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
 */const Kf="server_timestamp",Qf="__type__",Jf="__previous_value__",Xf="__local_write_time__";function dl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Qf])===null||t===void 0?void 0:t.stringValue)===Kf}function ha(n){const e=n.mapValue.fields[Jf];return dl(e)?ha(e):e}function ai(n){const e=Un(n.mapValue.fields[Xf].timestampValue);return new Ae(e.seconds,e.nanos)}/**
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
 */class Wy{constructor(e,t,r,s,i,a,c,l,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=f}}const qo="(default)";class ci{constructor(e,t){this.projectId=e,this.database=t||qo}static empty(){return new ci("","")}get isDefaultDatabase(){return this.database===qo}isEqual(e){return e instanceof ci&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Yf="__type__",Ky="__max__",co={mapValue:{}},Zf="__vector__",Bo="value";function jn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?dl(n)?4:Jy(n)?9007199254740991:Qy(n)?10:11:K(28295,{value:n})}function Jt(n,e){if(n===e)return!0;const t=jn(n);if(t!==jn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ai(n).isEqual(ai(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Un(s.timestampValue),c=Un(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return $n(s.bytesValue).isEqual($n(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return Me(s.geoPointValue.latitude)===Me(i.geoPointValue.latitude)&&Me(s.geoPointValue.longitude)===Me(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Me(s.integerValue)===Me(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=Me(s.doubleValue),c=Me(i.doubleValue);return a===c?jo(a)===jo(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return ns(n.arrayValue.values||[],e.arrayValue.values||[],Jt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if($h(a)!==$h(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!Jt(a[l],c[l])))return!1;return!0}(n,e);default:return K(52216,{left:n})}}function li(n,e){return(n.values||[]).find(t=>Jt(t,e))!==void 0}function rs(n,e){if(n===e)return 0;const t=jn(n),r=jn(e);if(t!==r)return te(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return te(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=Me(i.integerValue||i.doubleValue),l=Me(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return qh(n.timestampValue,e.timestampValue);case 4:return qh(ai(n),ai(e));case 5:return Rc(n.stringValue,e.stringValue);case 6:return function(i,a){const c=$n(i),l=$n(a);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),l=a.split("/");for(let h=0;h<c.length&&h<l.length;h++){const f=te(c[h],l[h]);if(f!==0)return f}return te(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=te(Me(i.latitude),Me(a.latitude));return c!==0?c:te(Me(i.longitude),Me(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Bh(n.arrayValue,e.arrayValue);case 10:return function(i,a){var c,l,h,f;const p=i.fields||{},_=a.fields||{},I=(c=p[Bo])===null||c===void 0?void 0:c.arrayValue,R=(l=_[Bo])===null||l===void 0?void 0:l.arrayValue,V=te(((h=I==null?void 0:I.values)===null||h===void 0?void 0:h.length)||0,((f=R==null?void 0:R.values)===null||f===void 0?void 0:f.length)||0);return V!==0?V:Bh(I,R)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===co.mapValue&&a===co.mapValue)return 0;if(i===co.mapValue)return 1;if(a===co.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=a.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let p=0;p<l.length&&p<f.length;++p){const _=Rc(l[p],f[p]);if(_!==0)return _;const I=rs(c[l[p]],h[f[p]]);if(I!==0)return I}return te(l.length,f.length)}(n.mapValue,e.mapValue);default:throw K(23264,{le:t})}}function qh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return te(n,e);const t=Un(n),r=Un(e),s=te(t.seconds,r.seconds);return s!==0?s:te(t.nanos,r.nanos)}function Bh(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=rs(t[s],r[s]);if(i)return i}return te(t.length,r.length)}function ss(n){return Cc(n)}function Cc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Un(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return $n(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return G.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Cc(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Cc(t.fields[a])}`;return s+"}"}(n.mapValue):K(61005,{value:n})}function vo(n){switch(jn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ha(n);return e?16+vo(e):16;case 5:return 2*n.stringValue.length;case 6:return $n(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+vo(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Hn(r.fields,(i,a)=>{s+=i.length+vo(a)}),s}(n.mapValue);default:throw K(13486,{value:n})}}function zh(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Pc(n){return!!n&&"integerValue"in n}function fl(n){return!!n&&"arrayValue"in n}function Hh(n){return!!n&&"nullValue"in n}function Gh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Eo(n){return!!n&&"mapValue"in n}function Qy(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Yf])===null||t===void 0?void 0:t.stringValue)===Zf}function Qs(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Hn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Qs(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Qs(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Jy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Ky}/**
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
 */class pt{constructor(e){this.value=e}static empty(){return new pt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Eo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Qs(t)}setAll(e){let t=Je.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=Qs(a):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Eo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Jt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Eo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Hn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new pt(Qs(this.value))}}function ep(n){const e=[];return Hn(n.fields,(t,r)=>{const s=new Je([t]);if(Eo(r)){const i=ep(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new wt(e)}/**
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
 */class Ge{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Ge(e,0,X.min(),X.min(),X.min(),pt.empty(),0)}static newFoundDocument(e,t,r,s){return new Ge(e,1,t,X.min(),r,s,0)}static newNoDocument(e,t){return new Ge(e,2,t,X.min(),X.min(),pt.empty(),0)}static newUnknownDocument(e,t){return new Ge(e,3,t,X.min(),X.min(),pt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(X.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=pt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=pt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=X.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ge&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ge(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class zo{constructor(e,t){this.position=e,this.inclusive=t}}function Wh(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=G.comparator(G.fromName(a.referenceValue),t.key):r=rs(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Kh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Jt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class ui{constructor(e,t="asc"){this.field=e,this.dir=t}}function Xy(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class tp{}class Ue extends tp{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Zy(e,t,r):t==="array-contains"?new nv(e,r):t==="in"?new rv(e,r):t==="not-in"?new sv(e,r):t==="array-contains-any"?new iv(e,r):new Ue(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new ev(e,r):new tv(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(rs(t,this.value)):t!==null&&jn(this.value)===jn(t)&&this.matchesComparison(rs(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return K(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ot extends tp{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new Ot(e,t)}matches(e){return np(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function np(n){return n.op==="and"}function rp(n){return Yy(n)&&np(n)}function Yy(n){for(const e of n.filters)if(e instanceof Ot)return!1;return!0}function xc(n){if(n instanceof Ue)return n.field.canonicalString()+n.op.toString()+ss(n.value);if(rp(n))return n.filters.map(e=>xc(e)).join(",");{const e=n.filters.map(t=>xc(t)).join(",");return`${n.op}(${e})`}}function sp(n,e){return n instanceof Ue?function(r,s){return s instanceof Ue&&r.op===s.op&&r.field.isEqual(s.field)&&Jt(r.value,s.value)}(n,e):n instanceof Ot?function(r,s){return s instanceof Ot&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&sp(a,s.filters[c]),!0):!1}(n,e):void K(19439)}function ip(n){return n instanceof Ue?function(t){return`${t.field.canonicalString()} ${t.op} ${ss(t.value)}`}(n):n instanceof Ot?function(t){return t.op.toString()+" {"+t.getFilters().map(ip).join(" ,")+"}"}(n):"Filter"}class Zy extends Ue{constructor(e,t,r){super(e,t,r),this.key=G.fromName(r.referenceValue)}matches(e){const t=G.comparator(e.key,this.key);return this.matchesComparison(t)}}class ev extends Ue{constructor(e,t){super(e,"in",t),this.keys=op("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class tv extends Ue{constructor(e,t){super(e,"not-in",t),this.keys=op("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function op(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>G.fromName(r.referenceValue))}class nv extends Ue{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return fl(t)&&li(t.arrayValue,this.value)}}class rv extends Ue{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&li(this.value.arrayValue,t)}}class sv extends Ue{constructor(e,t){super(e,"not-in",t)}matches(e){if(li(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!li(this.value.arrayValue,t)}}class iv extends Ue{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!fl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>li(this.value.arrayValue,r))}}/**
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
 */class ov{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Pe=null}}function Qh(n,e=null,t=[],r=[],s=null,i=null,a=null){return new ov(n,e,t,r,s,i,a)}function pl(n){const e=Z(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>xc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),ki(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>ss(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>ss(r)).join(",")),e.Pe=t}return e.Pe}function ml(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Xy(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!sp(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Kh(n.startAt,e.startAt)&&Kh(n.endAt,e.endAt)}function Vc(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class _s{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function av(n,e,t,r,s,i,a,c){return new _s(n,e,t,r,s,i,a,c)}function da(n){return new _s(n)}function Jh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function ap(n){return n.collectionGroup!==null}function Js(n){const e=Z(n);if(e.Te===null){e.Te=[];const t=new Set;for(const i of e.explicitOrderBy)e.Te.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new qe(Je.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Te.push(new ui(i,r))}),t.has(Je.keyField().canonicalString())||e.Te.push(new ui(Je.keyField(),r))}return e.Te}function Bt(n){const e=Z(n);return e.Ie||(e.Ie=cv(e,Js(n))),e.Ie}function cv(n,e){if(n.limitType==="F")return Qh(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new ui(s.field,i)});const t=n.endAt?new zo(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new zo(n.startAt.position,n.startAt.inclusive):null;return Qh(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Dc(n,e){const t=n.filters.concat([e]);return new _s(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Nc(n,e,t){return new _s(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function fa(n,e){return ml(Bt(n),Bt(e))&&n.limitType===e.limitType}function cp(n){return`${pl(Bt(n))}|lt:${n.limitType}`}function Mr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>ip(s)).join(", ")}]`),ki(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>ss(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>ss(s)).join(",")),`Target(${r})`}(Bt(n))}; limitType=${n.limitType})`}function pa(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):G.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of Js(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,c,l){const h=Wh(a,c,l);return a.inclusive?h<=0:h<0}(r.startAt,Js(r),s)||r.endAt&&!function(a,c,l){const h=Wh(a,c,l);return a.inclusive?h>=0:h>0}(r.endAt,Js(r),s))}(n,e)}function lv(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function lp(n){return(e,t)=>{let r=!1;for(const s of Js(n)){const i=uv(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function uv(n,e,t){const r=n.field.isKeyField()?G.comparator(e.key,t.key):function(i,a,c){const l=a.data.field(i),h=c.data.field(i);return l!==null&&h!==null?rs(l,h):K(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return K(19790,{direction:n.dir})}}/**
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
 */class Tr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Hn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Gf(this.inner)}size(){return this.innerSize}}/**
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
 */const hv=new Ve(G.comparator);function cn(){return hv}const up=new Ve(G.comparator);function Bs(...n){let e=up;for(const t of n)e=e.insert(t.key,t);return e}function hp(n){let e=up;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function ar(){return Xs()}function dp(){return Xs()}function Xs(){return new Tr(n=>n.toString(),(n,e)=>n.isEqual(e))}const dv=new Ve(G.comparator),fv=new qe(G.comparator);function se(...n){let e=fv;for(const t of n)e=e.add(t);return e}const pv=new qe(te);function mv(){return pv}/**
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
 */function gl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:jo(e)?"-0":e}}function fp(n){return{integerValue:""+n}}function pp(n,e){return By(e)?fp(e):gl(n,e)}/**
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
 */class ma{constructor(){this._=void 0}}function gv(n,e,t){return n instanceof hi?function(s,i){const a={fields:{[Qf]:{stringValue:Kf},[Xf]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&dl(i)&&(i=ha(i)),i&&(a.fields[Jf]=i),{mapValue:a}}(t,e):n instanceof di?gp(n,e):n instanceof fi?_p(n,e):function(s,i){const a=mp(s,i),c=Xh(a)+Xh(s.Ee);return Pc(a)&&Pc(s.Ee)?fp(c):gl(s.serializer,c)}(n,e)}function _v(n,e,t){return n instanceof di?gp(n,e):n instanceof fi?_p(n,e):t}function mp(n,e){return n instanceof pi?function(r){return Pc(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class hi extends ma{}class di extends ma{constructor(e){super(),this.elements=e}}function gp(n,e){const t=yp(e);for(const r of n.elements)t.some(s=>Jt(s,r))||t.push(r);return{arrayValue:{values:t}}}class fi extends ma{constructor(e){super(),this.elements=e}}function _p(n,e){let t=yp(e);for(const r of n.elements)t=t.filter(s=>!Jt(s,r));return{arrayValue:{values:t}}}class pi extends ma{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function Xh(n){return Me(n.integerValue||n.doubleValue)}function yp(n){return fl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class vp{constructor(e,t){this.field=e,this.transform=t}}function yv(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof di&&s instanceof di||r instanceof fi&&s instanceof fi?ns(r.elements,s.elements,Jt):r instanceof pi&&s instanceof pi?Jt(r.Ee,s.Ee):r instanceof hi&&s instanceof hi}(n.transform,e.transform)}class vv{constructor(e,t){this.version=e,this.transformResults=t}}class at{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new at}static exists(e){return new at(void 0,e)}static updateTime(e){return new at(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function wo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ga{}function Ep(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new _l(n.key,at.none()):new Si(n.key,n.data,at.none());{const t=n.data,r=pt.empty();let s=new qe(Je.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Gn(n.key,r,new wt(s.toArray()),at.none())}}function Ev(n,e,t){n instanceof Si?function(s,i,a){const c=s.value.clone(),l=Zh(s.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Gn?function(s,i,a){if(!wo(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Zh(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(wp(s)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Ys(n,e,t,r){return n instanceof Si?function(i,a,c,l){if(!wo(i.precondition,a))return c;const h=i.value.clone(),f=ed(i.fieldTransforms,l,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Gn?function(i,a,c,l){if(!wo(i.precondition,a))return c;const h=ed(i.fieldTransforms,l,a),f=a.data;return f.setAll(wp(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(i,a,c){return wo(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function wv(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=mp(r.transform,s||null);i!=null&&(t===null&&(t=pt.empty()),t.set(r.field,i))}return t||null}function Yh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ns(r,s,(i,a)=>yv(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Si extends ga{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Gn extends ga{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function wp(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Zh(n,e,t){const r=new Map;le(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,_v(a,c,t[s]))}return r}function ed(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,gv(i,a,e))}return r}class _l extends ga{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Tp extends ga{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Tv{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Ev(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ys(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ys(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=dp();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const l=Ep(a,c);l!==null&&r.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(X.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),se())}isEqual(e){return this.batchId===e.batchId&&ns(this.mutations,e.mutations,(t,r)=>Yh(t,r))&&ns(this.baseMutations,e.baseMutations,(t,r)=>Yh(t,r))}}class yl{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){le(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let s=function(){return dv}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new yl(e,t,r,s)}}/**
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
 */class bv{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class Iv{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Fe,ce;function bp(n){switch(n){case C.OK:return K(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return K(15467,{code:n})}}function Ip(n){if(n===void 0)return an("GRPC error has no .code"),C.UNKNOWN;switch(n){case Fe.OK:return C.OK;case Fe.CANCELLED:return C.CANCELLED;case Fe.UNKNOWN:return C.UNKNOWN;case Fe.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case Fe.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case Fe.INTERNAL:return C.INTERNAL;case Fe.UNAVAILABLE:return C.UNAVAILABLE;case Fe.UNAUTHENTICATED:return C.UNAUTHENTICATED;case Fe.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case Fe.NOT_FOUND:return C.NOT_FOUND;case Fe.ALREADY_EXISTS:return C.ALREADY_EXISTS;case Fe.PERMISSION_DENIED:return C.PERMISSION_DENIED;case Fe.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case Fe.ABORTED:return C.ABORTED;case Fe.OUT_OF_RANGE:return C.OUT_OF_RANGE;case Fe.UNIMPLEMENTED:return C.UNIMPLEMENTED;case Fe.DATA_LOSS:return C.DATA_LOSS;default:return K(39323,{code:n})}}(ce=Fe||(Fe={}))[ce.OK=0]="OK",ce[ce.CANCELLED=1]="CANCELLED",ce[ce.UNKNOWN=2]="UNKNOWN",ce[ce.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ce[ce.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ce[ce.NOT_FOUND=5]="NOT_FOUND",ce[ce.ALREADY_EXISTS=6]="ALREADY_EXISTS",ce[ce.PERMISSION_DENIED=7]="PERMISSION_DENIED",ce[ce.UNAUTHENTICATED=16]="UNAUTHENTICATED",ce[ce.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ce[ce.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ce[ce.ABORTED=10]="ABORTED",ce[ce.OUT_OF_RANGE=11]="OUT_OF_RANGE",ce[ce.UNIMPLEMENTED=12]="UNIMPLEMENTED",ce[ce.INTERNAL=13]="INTERNAL",ce[ce.UNAVAILABLE=14]="UNAVAILABLE",ce[ce.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const Av=new Sn([4294967295,4294967295],0);function td(n){const e=qf().encode(n),t=new Nf;return t.update(e),new Uint8Array(t.digest())}function nd(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Sn([t,r],0),new Sn([s,i],0)]}class vl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new zs(`Invalid padding: ${t}`);if(r<0)throw new zs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new zs(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new zs(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=Sn.fromNumber(this.fe)}pe(e,t,r){let s=e.add(t.multiply(Sn.fromNumber(r)));return s.compare(Av)===1&&(s=new Sn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=td(e),[r,s]=nd(t);for(let i=0;i<this.hashCount;i++){const a=this.pe(r,s,i);if(!this.ye(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new vl(i,s,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.fe===0)return;const t=td(e),[r,s]=nd(t);for(let i=0;i<this.hashCount;i++){const a=this.pe(r,s,i);this.we(a)}}we(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class zs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class _a{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Ri.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new _a(X.min(),s,new Ve(te),cn(),se())}}class Ri{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ri(r,t,se(),se(),se())}}/**
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
 */class To{constructor(e,t,r,s){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=s}}class Ap{constructor(e,t){this.targetId=e,this.De=t}}class kp{constructor(e,t,r=Xe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class rd{constructor(){this.ve=0,this.Ce=sd(),this.Fe=Xe.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=se(),t=se(),r=se();return this.Ce.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:K(38017,{changeType:i})}}),new Ri(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=sd()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,le(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class kv{constructor(e){this.We=e,this.Ge=new Map,this.ze=cn(),this.je=lo(),this.Je=lo(),this.He=new Ve(te)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:K(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,s)=>{this.nt(s)&&t(s)})}it(e){const t=e.targetId,r=e.De.count,s=this.st(t);if(s){const i=s.target;if(Vc(i))if(r===0){const a=new G(i.path);this.Xe(t,a,Ge.newNoDocument(a,X.min()))}else le(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const c=this._t(e),l=c?this.ut(c,e,a):1;if(l!==0){this.rt(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=$n(r).toUint8Array()}catch(l){if(l instanceof Wf)return Ln("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new vl(a,s,i)}catch(l){return Ln(l instanceof zs?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.fe===0?null:c}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.We.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.We.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.Xe(t,i,null),s++)}),s}Pt(e){const t=new Map;this.Ge.forEach((i,a)=>{const c=this.st(a);if(c){if(i.current&&Vc(c.target)){const l=new G(c.target.path);this.Tt(l).has(a)||this.It(a,l)||this.Xe(a,l,Ge.newNoDocument(l,e))}i.Ne&&(t.set(a,i.Le()),i.ke())}});let r=se();this.Je.forEach((i,a)=>{let c=!0;a.forEachWhile(l=>{const h=this.st(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.ze.forEach((i,a)=>a.setReadTime(e));const s=new _a(e,t,this.He,this.ze,r);return this.ze=cn(),this.je=lo(),this.Je=lo(),this.He=new Ve(te),s}Ze(e,t){if(!this.nt(e))return;const r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;const s=this.tt(e);this.It(e,t)?s.qe(t,1):s.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new rd,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new qe(te),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new qe(te),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||j("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new rd),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function lo(){return new Ve(G.comparator)}function sd(){return new Ve(G.comparator)}const Sv={asc:"ASCENDING",desc:"DESCENDING"},Rv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Cv={and:"AND",or:"OR"};class Pv{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Oc(n,e){return n.useProto3Json||ki(e)?e:{value:e}}function Ho(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Sp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function xv(n,e){return Ho(n,e.toTimestamp())}function Tt(n){return le(!!n,49232),X.fromTimestamp(function(t){const r=Un(t);return new Ae(r.seconds,r.nanos)}(n))}function El(n,e){return Mc(n,e).canonicalString()}function Mc(n,e){const t=function(s){return new _e(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Rp(n){const e=_e.fromString(n);return le(Np(e),10190,{key:e.toString()}),e}function Go(n,e){return El(n.databaseId,e.path)}function Zs(n,e){const t=Rp(e);if(t.get(1)!==n.databaseId.projectId)throw new M(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new M(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new G(Pp(t))}function Cp(n,e){return El(n.databaseId,e)}function Vv(n){const e=Rp(n);return e.length===4?_e.emptyPath():Pp(e)}function Lc(n){return new _e(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Pp(n){return le(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function id(n,e,t){return{name:Go(n,e),fields:t.value.mapValue.fields}}function Dv(n,e){return"found"in e?function(r,s){le(!!s.found,43571),s.found.name,s.found.updateTime;const i=Zs(r,s.found.name),a=Tt(s.found.updateTime),c=s.found.createTime?Tt(s.found.createTime):X.min(),l=new pt({mapValue:{fields:s.found.fields}});return Ge.newFoundDocument(i,a,c,l)}(n,e):"missing"in e?function(r,s){le(!!s.missing,3894),le(!!s.readTime,22933);const i=Zs(r,s.missing),a=Tt(s.readTime);return Ge.newNoDocument(i,a)}(n,e):K(7234,{result:e})}function Nv(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:K(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(le(f===void 0||typeof f=="string",58123),Xe.fromBase64String(f||"")):(le(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Xe.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(h){const f=h.code===void 0?C.UNKNOWN:Ip(h.code);return new M(f,h.message||"")}(a);t=new kp(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Zs(n,r.document.name),i=Tt(r.document.updateTime),a=r.document.createTime?Tt(r.document.createTime):X.min(),c=new pt({mapValue:{fields:r.document.fields}}),l=Ge.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new To(h,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Zs(n,r.document),i=r.readTime?Tt(r.readTime):X.min(),a=Ge.newNoDocument(s,i),c=r.removedTargetIds||[];t=new To([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Zs(n,r.document),i=r.removedTargetIds||[];t=new To([],i,s,null)}else{if(!("filter"in e))return K(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new Iv(s,i),c=r.targetId;t=new Ap(c,a)}}return t}function xp(n,e){let t;if(e instanceof Si)t={update:id(n,e.key,e.value)};else if(e instanceof _l)t={delete:Go(n,e.key)};else if(e instanceof Gn)t={update:id(n,e.key,e.data),updateMask:Bv(e.fieldMask)};else{if(!(e instanceof Tp))return K(16599,{Rt:e.type});t={verify:Go(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof hi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof di)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof fi)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof pi)return{fieldPath:a.field.canonicalString(),increment:c.Ee};throw K(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:xv(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:K(27497)}(n,e.precondition)),t}function Ov(n,e){return n&&n.length>0?(le(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?Tt(s.updateTime):Tt(i);return a.isEqual(X.min())&&(a=Tt(i)),new vv(a,s.transformResults||[])}(t,e))):[]}function Mv(n,e){return{documents:[Cp(n,e.path)]}}function Lv(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Cp(n,s);const i=function(h){if(h.length!==0)return Dp(Ot.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(f=>function(_){return{field:Lr(_.field),direction:$v(_.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=Oc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:t,parent:s}}function Fv(n){let e=Vv(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){le(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const _=Vp(p);return _ instanceof Ot&&rp(_)?_.getFilters():[_]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(_=>function(R){return new ui(Fr(R.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(_))}(t.orderBy));let c=null;t.limit&&(c=function(p){let _;return _=typeof p=="object"?p.value:p,ki(_)?null:_}(t.limit));let l=null;t.startAt&&(l=function(p){const _=!!p.before,I=p.values||[];return new zo(I,_)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const _=!p.before,I=p.values||[];return new zo(I,_)}(t.endAt)),av(e,s,a,i,c,"F",l,h)}function Uv(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return K(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Vp(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Fr(t.unaryFilter.field);return Ue.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Fr(t.unaryFilter.field);return Ue.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Fr(t.unaryFilter.field);return Ue.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Fr(t.unaryFilter.field);return Ue.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return K(61313);default:return K(60726)}}(n):n.fieldFilter!==void 0?function(t){return Ue.create(Fr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return K(58110);default:return K(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ot.create(t.compositeFilter.filters.map(r=>Vp(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return K(1026)}}(t.compositeFilter.op))}(n):K(30097,{filter:n})}function $v(n){return Sv[n]}function jv(n){return Rv[n]}function qv(n){return Cv[n]}function Lr(n){return{fieldPath:n.canonicalString()}}function Fr(n){return Je.fromServerFormat(n.fieldPath)}function Dp(n){return n instanceof Ue?function(t){if(t.op==="=="){if(Gh(t.value))return{unaryFilter:{field:Lr(t.field),op:"IS_NAN"}};if(Hh(t.value))return{unaryFilter:{field:Lr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Gh(t.value))return{unaryFilter:{field:Lr(t.field),op:"IS_NOT_NAN"}};if(Hh(t.value))return{unaryFilter:{field:Lr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Lr(t.field),op:jv(t.op),value:t.value}}}(n):n instanceof Ot?function(t){const r=t.getFilters().map(s=>Dp(s));return r.length===1?r[0]:{compositeFilter:{op:qv(t.op),filters:r}}}(n):K(54877,{filter:n})}function Bv(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Np(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Tn{constructor(e,t,r,s,i=X.min(),a=X.min(),c=Xe.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Tn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Tn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Tn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Tn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class zv{constructor(e){this.gt=e}}function Hv(n){const e=Fv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Nc(e,e.limit,"L"):e}/**
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
 */class Gv{constructor(){this.Dn=new Wv}addToCollectionParentIndex(e,t){return this.Dn.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(Fn.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(Fn.min())}updateCollectionGroup(e,t,r){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class Wv{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new qe(_e.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new qe(_e.comparator)).toArray()}}/**
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
 */const od={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Op=41943040;class _t{static withCacheSize(e){return new _t(e,_t.DEFAULT_COLLECTION_PERCENTILE,_t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */_t.DEFAULT_COLLECTION_PERCENTILE=10,_t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,_t.DEFAULT=new _t(Op,_t.DEFAULT_COLLECTION_PERCENTILE,_t.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),_t.DISABLED=new _t(-1,0,0);/**
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
 */class is{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new is(0)}static ur(){return new is(-1)}}/**
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
 */const ad="LruGarbageCollector",Kv=1048576;function cd([n,e],[t,r]){const s=te(n,t);return s===0?te(e,r):s}class Qv{constructor(e){this.Tr=e,this.buffer=new qe(cd),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();cd(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Jv{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){j(ad,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){gs(t)?j(ad,"Ignoring IndexedDB error during garbage collection: ",t):await ms(t)}await this.Rr(3e5)})}}class Xv{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return P.resolve(ua.ue);const r=new Qv(t);return this.Vr.forEachTarget(e,s=>r.Er(s.sequenceNumber)).next(()=>this.Vr.gr(e,s=>r.Er(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(j("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(od)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(j("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),od):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,s,i,a,c,l,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(j("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,t))).next(p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(h=Date.now(),Or()<=ne.DEBUG&&j("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(h-l)+`ms
Total Duration: ${h-f}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function Yv(n,e){return new Xv(n,e)}/**
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
 */class Zv{constructor(){this.changes=new Tr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ge.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?P.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class eE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class tE{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Ys(r.mutation,s,wt.empty(),Ae.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,se()).next(()=>r))}getLocalViewOfDocuments(e,t,r=se()){const s=ar();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=Bs();return i.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=ar();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,se()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,s){let i=cn();const a=Xs(),c=function(){return Xs()}();return t.forEach((l,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Gn)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Ys(f.mutation,h,f.mutation.getFieldMask(),Ae.now())):a.set(h.key,wt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var p;return c.set(h,new eE(f,(p=a.get(h))!==null&&p!==void 0?p:null))}),c))}recalculateAndSaveOverlays(e,t){const r=Xs();let s=new Ve((a,c)=>a-c),i=se();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(l=>{const h=t.get(l);if(h===null)return;let f=r.get(l)||wt.empty();f=c.applyToLocalView(h,f),r.set(l,f);const p=(s.get(c.batchId)||se()).add(l);s=s.insert(c.batchId,p)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,f=l.value,p=dp();f.forEach(_=>{if(!i.has(_)){const I=Ep(t.get(_),r.get(_));I!==null&&p.set(_,I),i=i.add(_)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return P.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return G.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):ap(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):P.resolve(ar());let c=oi,l=i;return a.next(h=>P.forEach(h,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?P.resolve():this.remoteDocumentCache.getEntry(e,f).next(_=>{l=l.insert(f,_)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,l,h,se())).next(f=>({batchId:c,changes:hp(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new G(t)).next(r=>{let s=Bs();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Bs();return this.indexManager.getCollectionParents(e,i).next(c=>P.forEach(c,l=>{const h=function(p,_){return new _s(_,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(f=>{f.forEach((p,_)=>{a=a.insert(p,_)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((l,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Ge.newInvalidDocument(f)))});let c=Bs();return a.forEach((l,h)=>{const f=i.get(l);f!==void 0&&Ys(f.mutation,h,wt.empty(),Ae.now()),pa(t,h)&&(c=c.insert(l,h))}),c})}}/**
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
 */class nE{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return P.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Tt(s.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(s){return{name:s.name,query:Hv(s.bundledQuery),readTime:Tt(s.readTime)}}(t)),P.resolve()}}/**
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
 */class rE{constructor(){this.overlays=new Ve(G.comparator),this.kr=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const r=ar();return P.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.wt(e,t,i)}),P.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.kr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.kr.delete(r)),P.resolve()}getOverlaysForCollection(e,t,r){const s=ar(),i=t.length+1,a=new G(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return P.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Ve((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=ar(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=ar(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=s)););return P.resolve(c)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.kr.get(s.largestBatchId).delete(r.key);this.kr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new bv(t,r));let i=this.kr.get(t);i===void 0&&(i=se(),this.kr.set(t,i)),this.kr.set(t,i.add(r.key))}}/**
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
 */class sE{constructor(){this.sessionToken=Xe.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
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
 */class wl{constructor(){this.qr=new qe(He.Qr),this.$r=new qe(He.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new He(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new He(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){const t=new G(new _e([])),r=new He(t,e),s=new He(t,e+1),i=[];return this.$r.forEachInRange([r,s],a=>{this.Wr(a),i.push(a.key)}),i}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new G(new _e([])),r=new He(t,e),s=new He(t,e+1);let i=se();return this.$r.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new He(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class He{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return G.comparator(e.key,t.key)||te(e.Hr,t.Hr)}static Ur(e,t){return te(e.Hr,t.Hr)||G.comparator(e.key,t.key)}}/**
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
 */class iE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new qe(He.Qr)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Tv(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Yr=this.Yr.add(new He(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return P.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?hl:this.er-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new He(t,0),s=new He(t,Number.POSITIVE_INFINITY),i=[];return this.Yr.forEachInRange([r,s],a=>{const c=this.Zr(a.Hr);i.push(c)}),P.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new qe(te);return t.forEach(s=>{const i=new He(s,0),a=new He(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([i,a],c=>{r=r.add(c.Hr)})}),P.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;G.isDocumentKey(i)||(i=i.child(""));const a=new He(new G(i),0);let c=new qe(te);return this.Yr.forEachWhile(l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Hr)),!0)},a),P.resolve(this.ei(c))}ei(e){const t=[];return e.forEach(r=>{const s=this.Zr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){le(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return P.forEach(t.mutations,s=>{const i=new He(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){const r=new He(t,0),s=this.Yr.firstAfterOrEqual(r);return P.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class oE{constructor(e){this.ni=e,this.docs=function(){return new Ve(G.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return P.resolve(r?r.document.mutableCopy():Ge.newInvalidDocument(t))}getEntries(e,t){let r=cn();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Ge.newInvalidDocument(s))}),P.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=cn();const a=t.path,c=new G(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:f}}=l.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||Uy(Fy(f),r)<=0||(s.has(f.key)||pa(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return P.resolve(i)}getAllFromCollectionGroup(e,t,r,s){K(9500)}ri(e,t){return P.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new aE(this)}getSize(e){return P.resolve(this.size)}}class aE extends Zv{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Or.addEntry(e,s)):this.Or.removeEntry(r)}),P.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
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
 */class cE{constructor(e){this.persistence=e,this.ii=new Tr(t=>pl(t),ml),this.lastRemoteSnapshotVersion=X.min(),this.highestTargetId=0,this.si=0,this.oi=new wl,this.targetCount=0,this._i=is.ar()}forEachTarget(e,t){return this.ii.forEach((r,s)=>t(s)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),P.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new is(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.hr(t),P.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ii.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ii.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),P.waitFor(i).next(()=>s)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return P.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),P.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),P.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return P.resolve(r)}containsKey(e,t){return P.resolve(this.oi.containsKey(t))}}/**
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
 */class Mp{constructor(e,t){this.ai={},this.overlays={},this.ui=new ua(0),this.ci=!1,this.ci=!0,this.li=new sE,this.referenceDelegate=e(this),this.hi=new cE(this),this.indexManager=new Gv,this.remoteDocumentCache=function(s){return new oE(s)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new zv(t),this.Ti=new nE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new rE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new iE(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){j("MemoryPersistence","Starting transaction:",e);const s=new lE(this.ui.next());return this.referenceDelegate.Ii(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ei(e,t){return P.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}}class lE extends jy{constructor(e){super(),this.currentSequenceNumber=e}}class Tl{constructor(e){this.persistence=e,this.Ai=new wl,this.Ri=null}static Vi(e){return new Tl(e)}get mi(){if(this.Ri)return this.Ri;throw K(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),P.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),P.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(s=>this.mi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.mi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.mi,r=>{const s=G.fromPath(r);return this.fi(e,s).next(i=>{i||t.removeEntry(s,X.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return P.or([()=>P.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class Wo{constructor(e,t){this.persistence=e,this.gi=new Tr(r=>zy(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Yv(this,t)}static Vi(e,t){return new Wo(e,t)}Ii(){}di(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return P.forEach(this.gi,(r,s)=>this.Sr(e,r,s).next(i=>i?P.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ri(e,a=>this.Sr(e,a,t).next(c=>{c||(r++,i.removeEntry(a,X.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),P.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),P.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=vo(e.data.value)),t}Sr(e,t,r){return P.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.gi.get(t);return P.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class bl{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=s}static Es(e,t){let r=se(),s=se();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new bl(e,t.fromCache,r,s)}}/**
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
 */class uE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class hE{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return l0()?8:qy(lt())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ps(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ys(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new uE;return this.ws(e,t,a).next(c=>{if(i.result=c,this.Rs)return this.Ss(e,t,a,c.size)})}).next(()=>i.result)}Ss(e,t,r,s){return r.documentReadCount<this.Vs?(Or()<=ne.DEBUG&&j("QueryEngine","SDK will not create cache indexes for query:",Mr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),P.resolve()):(Or()<=ne.DEBUG&&j("QueryEngine","Query:",Mr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.fs*s?(Or()<=ne.DEBUG&&j("QueryEngine","The SDK decides to create cache indexes for query:",Mr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Bt(t))):P.resolve())}ps(e,t){if(Jh(t))return P.resolve(null);let r=Bt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Nc(t,null,"F"),r=Bt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=se(...i);return this.gs.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const h=this.bs(t,c);return this.Ds(t,h,a,l.readTime)?this.ps(e,Nc(t,null,"F")):this.vs(e,h,t,l)}))})))}ys(e,t,r,s){return Jh(t)||s.isEqual(X.min())?P.resolve(null):this.gs.getDocuments(e,r).next(i=>{const a=this.bs(t,i);return this.Ds(t,a,r,s)?P.resolve(null):(Or()<=ne.DEBUG&&j("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Mr(t)),this.vs(e,a,t,Ly(s,oi)).next(c=>c))})}bs(e,t){let r=new qe(lp(e));return t.forEach((s,i)=>{pa(e,i)&&(r=r.add(i))}),r}Ds(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ws(e,t,r){return Or()<=ne.DEBUG&&j("QueryEngine","Using full collection scan to execute query:",Mr(t)),this.gs.getDocumentsMatchingQuery(e,t,Fn.min(),r)}vs(e,t,r,s){return this.gs.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const Il="LocalStore",dE=3e8;class fE{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.Fs=new Ve(te),this.Ms=new Tr(i=>pl(i),ml),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new tE(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function pE(n,e,t,r){return new fE(n,e,t,r)}async function Lp(n,e){const t=Z(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let l=se();for(const h of s){a.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return t.localDocuments.getDocuments(r,l).next(h=>({Bs:h,removedBatchIds:a,addedBatchIds:c}))})})}function mE(n,e){const t=Z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Os.newChangeBuffer({trackRemovals:!0});return function(c,l,h,f){const p=h.batch,_=p.keys();let I=P.resolve();return _.forEach(R=>{I=I.next(()=>f.getEntry(l,R)).next(V=>{const x=h.docVersions.get(R);le(x!==null,48541),V.version.compareTo(x)<0&&(p.applyToRemoteDocument(V,h),V.isValidDocument()&&(V.setReadTime(h.commitVersion),f.addEntry(V)))})}),I.next(()=>c.mutationQueue.removeMutationBatch(l,p))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=se();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Fp(n){const e=Z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function gE(n,e){const t=Z(n),r=e.snapshotVersion;let s=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Os.newChangeBuffer({trackRemovals:!0});s=t.Fs;const c=[];e.targetChanges.forEach((f,p)=>{const _=s.get(p);if(!_)return;c.push(t.hi.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.hi.addMatchingKeys(i,f.addedDocuments,p)));let I=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?I=I.withResumeToken(Xe.EMPTY_BYTE_STRING,X.min()).withLastLimboFreeSnapshotVersion(X.min()):f.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(f.resumeToken,r)),s=s.insert(p,I),function(V,x,H){return V.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=dE?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0}(_,I,f)&&c.push(t.hi.updateTargetData(i,I))});let l=cn(),h=se();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(_E(i,a,e.documentUpdates).next(f=>{l=f.Ls,h=f.ks})),!r.isEqual(X.min())){const f=t.hi.getLastRemoteSnapshotVersion(i).next(p=>t.hi.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return P.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,l,h)).next(()=>l)}).then(i=>(t.Fs=s,i))}function _E(n,e,t){let r=se(),s=se();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=cn();return t.forEach((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(X.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):j(Il,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{Ls:a,ks:s}})}function yE(n,e){const t=Z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=hl),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function vE(n,e){const t=Z(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.hi.getTargetData(r,e).next(i=>i?(s=i,P.resolve(s)):t.hi.allocateTargetId(r).next(a=>(s=new Tn(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Fs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function Fc(n,e,t){const r=Z(n),s=r.Fs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!gs(a))throw a;j(Il,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(s.target)}function ld(n,e,t){const r=Z(n);let s=X.min(),i=se();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,h,f){const p=Z(l),_=p.Ms.get(f);return _!==void 0?P.resolve(p.Fs.get(_)):p.hi.getTargetData(h,f)}(r,a,Bt(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,c.targetId).next(l=>{i=l})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?s:X.min(),t?i:se())).next(c=>(EE(r,lv(e),c),{documents:c,qs:i})))}function EE(n,e,t){let r=n.xs.get(e)||X.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.xs.set(e,r)}class ud{constructor(){this.activeTargetIds=mv()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class wE{constructor(){this.Fo=new ud,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new ud,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class TE{xo(e){}shutdown(){}}/**
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
 */const hd="ConnectivityMonitor";class dd{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){j(hd,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){j(hd,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let uo=null;function Uc(){return uo===null?uo=function(){return 268435456+Math.round(2147483648*Math.random())}():uo++,"0x"+uo.toString(16)}/**
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
 */const cc="RestConnection",bE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class IE{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.Ko=this.databaseId.database===qo?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const a=Uc(),c=this.Go(e,t.toUriEncodedString());j(cc,`Sending RPC '${e}' ${a}:`,c,r);const l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(l,s,i);const{host:h}=new URL(c),f=ds(h);return this.jo(e,c,l,r,f).then(p=>(j(cc,`Received RPC '${e}' ${a}: `,p),p),p=>{throw Ln(cc,`RPC '${e}' ${a} failed with error: `,p,"url: ",c,"request:",r),p})}Jo(e,t,r,s,i,a){return this.Wo(e,t,r,s,i)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ps}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Go(e,t){const r=bE[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
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
 */class AE{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
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
 */const nt="WebChannelConnection";class kE extends IE{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,s,i){const a=Uc();return new Promise((c,l)=>{const h=new Of;h.setWithCredentials(!0),h.listenOnce(Mf.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case yo.NO_ERROR:const p=h.getResponseJson();j(nt,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),c(p);break;case yo.TIMEOUT:j(nt,`RPC '${e}' ${a} timed out`),l(new M(C.DEADLINE_EXCEEDED,"Request time out"));break;case yo.HTTP_ERROR:const _=h.getStatus();if(j(nt,`RPC '${e}' ${a} failed with status:`,_,"response text:",h.getResponseText()),_>0){let I=h.getResponseJson();Array.isArray(I)&&(I=I[0]);const R=I==null?void 0:I.error;if(R&&R.status&&R.message){const V=function(H){const q=H.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(q)>=0?q:C.UNKNOWN}(R.status);l(new M(V,R.message))}else l(new M(C.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new M(C.UNAVAILABLE,"Connection failed."));break;default:K(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{j(nt,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(s);j(nt,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)})}P_(e,t,r){const s=Uc(),i=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Uf(),c=Ff(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.zo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const f=i.join("");j(nt,`Creating RPC '${e}' stream ${s}: ${f}`,l);const p=a.createWebChannel(f,l);this.T_(p);let _=!1,I=!1;const R=new AE({Ho:x=>{I?j(nt,`Not sending because RPC '${e}' stream ${s} is closed:`,x):(_||(j(nt,`Opening RPC '${e}' stream ${s} transport.`),p.open(),_=!0),j(nt,`RPC '${e}' stream ${s} sending:`,x),p.send(x))},Yo:()=>p.close()}),V=(x,H,q)=>{x.listen(H,$=>{try{q($)}catch(z){setTimeout(()=>{throw z},0)}})};return V(p,qs.EventType.OPEN,()=>{I||(j(nt,`RPC '${e}' stream ${s} transport opened.`),R.s_())}),V(p,qs.EventType.CLOSE,()=>{I||(I=!0,j(nt,`RPC '${e}' stream ${s} transport closed`),R.__(),this.I_(p))}),V(p,qs.EventType.ERROR,x=>{I||(I=!0,Ln(nt,`RPC '${e}' stream ${s} transport errored. Name:`,x.name,"Message:",x.message),R.__(new M(C.UNAVAILABLE,"The operation could not be completed")))}),V(p,qs.EventType.MESSAGE,x=>{var H;if(!I){const q=x.data[0];le(!!q,16349);const $=q,z=($==null?void 0:$.error)||((H=$[0])===null||H===void 0?void 0:H.error);if(z){j(nt,`RPC '${e}' stream ${s} received error:`,z);const ae=z.status;let B=function(v){const w=Fe[v];if(w!==void 0)return Ip(w)}(ae),y=z.message;B===void 0&&(B=C.INTERNAL,y="Unknown error status: "+ae+" with message "+z.message),I=!0,R.__(new M(B,y)),p.close()}else j(nt,`RPC '${e}' stream ${s} received:`,q),R.a_(q)}}),V(c,Lf.STAT_EVENT,x=>{x.stat===Sc.PROXY?j(nt,`RPC '${e}' stream ${s} detected buffering proxy`):x.stat===Sc.NOPROXY&&j(nt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{R.o_()},0),R}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}function lc(){return typeof document<"u"?document:null}/**
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
 */function ya(n){return new Pv(n,!0)}/**
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
 */class Al{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=s,this.A_=i,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&j("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
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
 */const fd="PersistentStream";class Up{constructor(e,t,r,s,i,a,c,l){this.Fi=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new Al(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(an(t.toString()),an("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.b_===t&&this.W_(r,s)},r=>{e(()=>{const s=new M(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)})})}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(s=>{r(()=>this.G_(s))}),this.stream.onMessage(s=>{r(()=>++this.C_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return j(fd,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(j(fd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class SE extends Up{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=Nv(this.serializer,e),r=function(i){if(!("targetChange"in i))return X.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?X.min():a.readTime?Tt(a.readTime):X.min()}(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=Lc(this.serializer),t.addTarget=function(i,a){let c;const l=a.target;if(c=Vc(l)?{documents:Mv(i,l)}:{query:Lv(i,l).Vt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Sp(i,a.resumeToken);const h=Oc(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(X.min())>0){c.readTime=Ho(i,a.snapshotVersion.toTimestamp());const h=Oc(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const r=Uv(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){const t={};t.database=Lc(this.serializer),t.removeTarget=e,this.k_(t)}}class RE extends Up{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return le(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,le(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){le(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=Ov(e.writeResults,e.commitTime),r=Tt(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=Lc(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>xp(this.serializer,r))};this.k_(t)}}/**
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
 */class CE{}class PE extends CE{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new M(C.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Wo(e,Mc(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new M(C.UNKNOWN,i.toString())})}Jo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Jo(e,Mc(t,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new M(C.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class xE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(an(t),this._a=!1):j("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const vr="RemoteStore";class VE{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=i,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{br(this)&&(j(vr,"Restarting streams for network reachability change."),await async function(l){const h=Z(l);h.Ia.add(4),await Ci(h),h.Aa.set("Unknown"),h.Ia.delete(4),await va(h)}(this))})}),this.Aa=new xE(r,s)}}async function va(n){if(br(n))for(const e of n.da)await e(!0)}async function Ci(n){for(const e of n.da)await e(!1)}function $p(n,e){const t=Z(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),Cl(t)?Rl(t):ys(t).x_()&&Sl(t,e))}function kl(n,e){const t=Z(n),r=ys(t);t.Ta.delete(e),r.x_()&&jp(t,e),t.Ta.size===0&&(r.x_()?r.B_():br(t)&&t.Aa.set("Unknown"))}function Sl(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(X.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ys(n).H_(e)}function jp(n,e){n.Ra.$e(e),ys(n).Y_(e)}function Rl(n){n.Ra=new kv({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),ys(n).start(),n.Aa.aa()}function Cl(n){return br(n)&&!ys(n).M_()&&n.Ta.size>0}function br(n){return Z(n).Ia.size===0}function qp(n){n.Ra=void 0}async function DE(n){n.Aa.set("Online")}async function NE(n){n.Ta.forEach((e,t)=>{Sl(n,e)})}async function OE(n,e){qp(n),Cl(n)?(n.Aa.la(e),Rl(n)):n.Aa.set("Unknown")}async function ME(n,e,t){if(n.Aa.set("Online"),e instanceof kp&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds)s.Ta.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Ta.delete(c),s.Ra.removeTarget(c))}(n,e)}catch(r){j(vr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ko(n,r)}else if(e instanceof To?n.Ra.Ye(e):e instanceof Ap?n.Ra.it(e):n.Ra.et(e),!t.isEqual(X.min()))try{const r=await Fp(n.localStore);t.compareTo(r)>=0&&await function(i,a){const c=i.Ra.Pt(a);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.Ta.get(h);f&&i.Ta.set(h,f.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,h)=>{const f=i.Ta.get(l);if(!f)return;i.Ta.set(l,f.withResumeToken(Xe.EMPTY_BYTE_STRING,f.snapshotVersion)),jp(i,l);const p=new Tn(f.target,l,h,f.sequenceNumber);Sl(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){j(vr,"Failed to raise snapshot:",r),await Ko(n,r)}}async function Ko(n,e,t){if(!gs(e))throw e;n.Ia.add(1),await Ci(n),n.Aa.set("Offline"),t||(t=()=>Fp(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{j(vr,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await va(n)})}function Bp(n,e){return e().catch(t=>Ko(n,t,e))}async function Ea(n){const e=Z(n),t=qn(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:hl;for(;LE(e);)try{const s=await yE(e.localStore,r);if(s===null){e.Pa.length===0&&t.B_();break}r=s.batchId,FE(e,s)}catch(s){await Ko(e,s)}zp(e)&&Hp(e)}function LE(n){return br(n)&&n.Pa.length<10}function FE(n,e){n.Pa.push(e);const t=qn(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function zp(n){return br(n)&&!qn(n).M_()&&n.Pa.length>0}function Hp(n){qn(n).start()}async function UE(n){qn(n).na()}async function $E(n){const e=qn(n);for(const t of n.Pa)e.X_(t.mutations)}async function jE(n,e,t){const r=n.Pa.shift(),s=yl.from(r,e,t);await Bp(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Ea(n)}async function qE(n,e){e&&qn(n).Z_&&await async function(r,s){if(function(a){return bp(a)&&a!==C.ABORTED}(s.code)){const i=r.Pa.shift();qn(r).N_(),await Bp(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Ea(r)}}(n,e),zp(n)&&Hp(n)}async function pd(n,e){const t=Z(n);t.asyncQueue.verifyOperationInProgress(),j(vr,"RemoteStore received new credentials");const r=br(t);t.Ia.add(3),await Ci(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await va(t)}async function BE(n,e){const t=Z(n);e?(t.Ia.delete(2),await va(t)):e||(t.Ia.add(2),await Ci(t),t.Aa.set("Unknown"))}function ys(n){return n.Va||(n.Va=function(t,r,s){const i=Z(t);return i.ia(),new SE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:DE.bind(null,n),e_:NE.bind(null,n),n_:OE.bind(null,n),J_:ME.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),Cl(n)?Rl(n):n.Aa.set("Unknown")):(await n.Va.stop(),qp(n))})),n.Va}function qn(n){return n.ma||(n.ma=function(t,r,s){const i=Z(t);return i.ia(),new RE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:UE.bind(null,n),n_:qE.bind(null,n),ea:$E.bind(null,n),ta:jE.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await Ea(n)):(await n.ma.stop(),n.Pa.length>0&&(j(vr,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}/**
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
 */class Pl{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new rn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new Pl(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function xl(n,e){if(an("AsyncQueue",`${e}: ${n}`),gs(n))return new M(C.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Wr{static emptySet(e){return new Wr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||G.comparator(t.key,r.key):(t,r)=>G.comparator(t.key,r.key),this.keyedMap=Bs(),this.sortedSet=new Ve(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Wr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Wr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class md{constructor(){this.fa=new Ve(G.comparator)}track(e){const t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):K(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}}class os{constructor(e,t,r,s,i,a,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new os(e,t,Wr.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&fa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class zE{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class HE{constructor(){this.queries=gd(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const s=Z(t),i=s.queries;s.queries=gd(),i.forEach((a,c)=>{for(const l of c.wa)l.onError(r)})})(this,new M(C.ABORTED,"Firestore shutting down"))}}function gd(){return new Tr(n=>cp(n),fa)}async function Gp(n,e){const t=Z(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.Sa()&&e.ba()&&(r=2):(i=new zE,r=e.ba()?0:1);try{switch(r){case 0:i.ya=await t.onListen(s,!0);break;case 1:i.ya=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=xl(a,`Initialization of query '${Mr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.wa.push(e),e.va(t.onlineState),i.ya&&e.Ca(i.ya)&&Vl(t)}async function Wp(n,e){const t=Z(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.wa.indexOf(e);a>=0&&(i.wa.splice(a,1),i.wa.length===0?s=e.ba()?0:1:!i.Sa()&&e.ba()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function GE(n,e){const t=Z(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.wa)c.Ca(s)&&(r=!0);a.ya=s}}r&&Vl(t)}function WE(n,e,t){const r=Z(n),s=r.queries.get(e);if(s)for(const i of s.wa)i.onError(t);r.queries.delete(e)}function Vl(n){n.Da.forEach(e=>{e.next()})}var $c,_d;(_d=$c||($c={})).Fa="default",_d.Cache="cache";class Kp{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new os(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=os.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==$c.Cache}}/**
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
 */class Qp{constructor(e){this.key=e}}class Jp{constructor(e){this.key=e}}class KE{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=se(),this.mutatedKeys=se(),this.Xa=lp(e),this.eu=new Wr(this.Xa)}get tu(){return this.Ha}nu(e,t){const r=t?t.ru:new md,s=t?t.eu:this.eu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const _=s.get(f),I=pa(this.query,p)?p:null,R=!!_&&this.mutatedKeys.has(_.key),V=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let x=!1;_&&I?_.data.isEqual(I.data)?R!==V&&(r.track({type:3,doc:I}),x=!0):this.iu(_,I)||(r.track({type:2,doc:I}),x=!0,(l&&this.Xa(I,l)>0||h&&this.Xa(I,h)<0)&&(c=!0)):!_&&I?(r.track({type:0,doc:I}),x=!0):_&&!I&&(r.track({type:1,doc:_}),x=!0,(l||h)&&(c=!0)),x&&(I?(a=a.add(I),i=V?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{eu:a,ru:r,Ds:c,mutatedKeys:i}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const a=e.ru.pa();a.sort((f,p)=>function(I,R){const V=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return K(20277,{At:x})}};return V(I)-V(R)}(f.type,p.type)||this.Xa(f.doc,p.doc)),this.su(r),s=s!=null&&s;const c=t&&!s?this.ou():[],l=this.Za.size===0&&this.current&&!s?1:0,h=l!==this.Ya;return this.Ya=l,a.length!==0||h?{snapshot:new os(this.query,e.eu,i,a,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:c}:{_u:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new md,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=se(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new Jp(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new Qp(r))}),t}uu(e){this.Ha=e.qs,this.Za=se();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return os.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Dl="SyncEngine";class QE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class JE{constructor(e){this.key=e,this.lu=!1}}class XE{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Tr(c=>cp(c),fa),this.Tu=new Map,this.Iu=new Set,this.du=new Ve(G.comparator),this.Eu=new Map,this.Au=new wl,this.Ru={},this.Vu=new Map,this.mu=is.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function YE(n,e,t=!0){const r=nm(n);let s;const i=r.Pu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cu()):s=await Xp(r,e,t,!0),s}async function ZE(n,e){const t=nm(n);await Xp(t,e,!0,!1)}async function Xp(n,e,t,r){const s=await vE(n.localStore,Bt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await ew(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&$p(n.remoteStore,s),c}async function ew(n,e,t,r,s){n.gu=(p,_,I)=>async function(V,x,H,q){let $=x.view.nu(H);$.Ds&&($=await ld(V.localStore,x.query,!1).then(({documents:y})=>x.view.nu(y,$)));const z=q&&q.targetChanges.get(x.targetId),ae=q&&q.targetMismatches.get(x.targetId)!=null,B=x.view.applyChanges($,V.isPrimaryClient,z,ae);return vd(V,x.targetId,B._u),B.snapshot}(n,p,_,I);const i=await ld(n.localStore,e,!0),a=new KE(e,i.qs),c=a.nu(i.documents),l=Ri.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,l);vd(n,t,h._u);const f=new QE(e,t,a);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),h.snapshot}async function tw(n,e,t){const r=Z(n),s=r.Pu.get(e),i=r.Tu.get(s.targetId);if(i.length>1)return r.Tu.set(s.targetId,i.filter(a=>!fa(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Fc(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&kl(r.remoteStore,s.targetId),jc(r,s.targetId)}).catch(ms)):(jc(r,s.targetId),await Fc(r.localStore,s.targetId,!0))}async function nw(n,e){const t=Z(n),r=t.Pu.get(e),s=t.Tu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),kl(t.remoteStore,r.targetId))}async function rw(n,e,t){const r=uw(n);try{const s=await function(a,c){const l=Z(a),h=Ae.now(),f=c.reduce((I,R)=>I.add(R.key),se());let p,_;return l.persistence.runTransaction("Locally write mutations","readwrite",I=>{let R=cn(),V=se();return l.Os.getEntries(I,f).next(x=>{R=x,R.forEach((H,q)=>{q.isValidDocument()||(V=V.add(H))})}).next(()=>l.localDocuments.getOverlayedDocuments(I,R)).next(x=>{p=x;const H=[];for(const q of c){const $=wv(q,p.get(q.key).overlayedDocument);$!=null&&H.push(new Gn(q.key,$,ep($.value.mapValue),at.exists(!0)))}return l.mutationQueue.addMutationBatch(I,h,H,c)}).next(x=>{_=x;const H=x.applyToLocalDocumentSet(p,V);return l.documentOverlayCache.saveOverlays(I,x.batchId,H)})}).then(()=>({batchId:_.batchId,changes:hp(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,l){let h=a.Ru[a.currentUser.toKey()];h||(h=new Ve(te)),h=h.insert(c,l),a.Ru[a.currentUser.toKey()]=h}(r,s.batchId,t),await Pi(r,s.changes),await Ea(r.remoteStore)}catch(s){const i=xl(s,"Failed to persist write");t.reject(i)}}async function Yp(n,e){const t=Z(n);try{const r=await gE(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Eu.get(i);a&&(le(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.lu=!0:s.modifiedDocuments.size>0?le(a.lu,14607):s.removedDocuments.size>0&&(le(a.lu,42227),a.lu=!1))}),await Pi(t,r,e)}catch(r){await ms(r)}}function yd(n,e,t){const r=Z(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Pu.forEach((i,a)=>{const c=a.view.va(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const l=Z(a);l.onlineState=c;let h=!1;l.queries.forEach((f,p)=>{for(const _ of p.wa)_.va(c)&&(h=!0)}),h&&Vl(l)}(r.eventManager,e),s.length&&r.hu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function sw(n,e,t){const r=Z(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Eu.get(e),i=s&&s.key;if(i){let a=new Ve(G.comparator);a=a.insert(i,Ge.newNoDocument(i,X.min()));const c=se().add(i),l=new _a(X.min(),new Map,new Ve(te),a,c);await Yp(r,l),r.du=r.du.remove(i),r.Eu.delete(e),Nl(r)}else await Fc(r.localStore,e,!1).then(()=>jc(r,e,t)).catch(ms)}async function iw(n,e){const t=Z(n),r=e.batch.batchId;try{const s=await mE(t.localStore,e);em(t,r,null),Zp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Pi(t,s)}catch(s){await ms(s)}}async function ow(n,e,t){const r=Z(n);try{const s=await function(a,c){const l=Z(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return l.mutationQueue.lookupMutationBatch(h,c).next(p=>(le(p!==null,37113),f=p.keys(),l.mutationQueue.removeMutationBatch(h,p))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>l.localDocuments.getDocuments(h,f))})}(r.localStore,e);em(r,e,t),Zp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Pi(r,s)}catch(s){await ms(s)}}function Zp(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function em(n,e,t){const r=Z(n);let s=r.Ru[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Ru[r.currentUser.toKey()]=s}}function jc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||tm(n,r)})}function tm(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(kl(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),Nl(n))}function vd(n,e,t){for(const r of t)r instanceof Qp?(n.Au.addReference(r.key,e),aw(n,r)):r instanceof Jp?(j(Dl,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||tm(n,r.key)):K(19791,{yu:r})}function aw(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(j(Dl,"New document in limbo: "+t),n.Iu.add(r),Nl(n))}function Nl(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new G(_e.fromString(e)),r=n.mu.next();n.Eu.set(r,new JE(t)),n.du=n.du.insert(t,r),$p(n.remoteStore,new Tn(Bt(da(t.path)),r,"TargetPurposeLimboResolution",ua.ue))}}async function Pi(n,e,t){const r=Z(n),s=[],i=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((c,l)=>{a.push(r.gu(l,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(l.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(h){s.push(h);const p=bl.Es(l.targetId,h);i.push(p)}}))}),await Promise.all(a),r.hu.J_(s),await async function(l,h){const f=Z(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>P.forEach(h,_=>P.forEach(_.Is,I=>f.persistence.referenceDelegate.addReference(p,_.targetId,I)).next(()=>P.forEach(_.ds,I=>f.persistence.referenceDelegate.removeReference(p,_.targetId,I)))))}catch(p){if(!gs(p))throw p;j(Il,"Failed to update sequence numbers: "+p)}for(const p of h){const _=p.targetId;if(!p.fromCache){const I=f.Fs.get(_),R=I.snapshotVersion,V=I.withLastLimboFreeSnapshotVersion(R);f.Fs=f.Fs.insert(_,V)}}}(r.localStore,i))}async function cw(n,e){const t=Z(n);if(!t.currentUser.isEqual(e)){j(Dl,"User change. New user:",e.toKey());const r=await Lp(t.localStore,e);t.currentUser=e,function(i,a){i.Vu.forEach(c=>{c.forEach(l=>{l.reject(new M(C.CANCELLED,a))})}),i.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Pi(t,r.Bs)}}function lw(n,e){const t=Z(n),r=t.Eu.get(e);if(r&&r.lu)return se().add(r.key);{let s=se();const i=t.Tu.get(e);if(!i)return s;for(const a of i){const c=t.Pu.get(a);s=s.unionWith(c.view.tu)}return s}}function nm(n){const e=Z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Yp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=lw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=sw.bind(null,e),e.hu.J_=GE.bind(null,e.eventManager),e.hu.pu=WE.bind(null,e.eventManager),e}function uw(n){const e=Z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=iw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ow.bind(null,e),e}class Qo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ya(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return pE(this.persistence,new hE,e.initialUser,this.serializer)}Du(e){return new Mp(Tl.Vi,this.serializer)}bu(e){return new wE}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Qo.provider={build:()=>new Qo};class hw extends Qo{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){le(this.persistence.referenceDelegate instanceof Wo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Jv(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?_t.withCacheSize(this.cacheSizeBytes):_t.DEFAULT;return new Mp(r=>Wo.Vi(r,t),this.serializer)}}class qc{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>yd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=cw.bind(null,this.syncEngine),await BE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new HE}()}createDatastore(e){const t=ya(e.databaseInfo.databaseId),r=function(i){return new kE(i)}(e.databaseInfo);return function(i,a,c,l){return new PE(i,a,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,c){return new VE(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>yd(this.syncEngine,t,0),function(){return dd.C()?new dd:new TE}())}createSyncEngine(e,t){return function(s,i,a,c,l,h,f){const p=new XE(s,i,a,c,l,h);return f&&(p.fu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=Z(s);j(vr,"RemoteStore shutting down."),i.Ia.add(5),await Ci(i),i.Ea.shutdown(),i.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}qc.provider={build:()=>new qc};/**
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
 */class rm{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):an("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class dw{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new M(C.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(s,i){const a=Z(s),c={documents:i.map(p=>Go(a.serializer,p))},l=await a.Jo("BatchGetDocuments",a.serializer.databaseId,_e.emptyPath(),c,i.length),h=new Map;l.forEach(p=>{const _=Dv(a.serializer,p);h.set(_.key.toString(),_)});const f=[];return i.forEach(p=>{const _=h.get(p.toString());le(!!_,55234,{key:p}),f.push(_)}),f}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new _l(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{const s=G.fromPath(r);this.mutations.push(new Tp(s,this.precondition(s)))}),await async function(r,s){const i=Z(r),a={writes:s.map(c=>xp(i.serializer,c))};await i.Wo("Commit",i.serializer.databaseId,_e.emptyPath(),a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw K(50498,{Wu:e.constructor.name});t=X.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new M(C.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(X.min())?at.exists(!1):at.updateTime(t):at.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(X.min()))throw new M(C.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return at.updateTime(t)}return at.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
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
 */class fw{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.Gu=r.maxAttempts,this.F_=new Al(this.asyncQueue,"transaction_retry")}zu(){this.Gu-=1,this.ju()}ju(){this.F_.g_(async()=>{const e=new dw(this.datastore),t=this.Ju(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(s=>{this.Hu(s)}))}).catch(r=>{this.Hu(r)})})}Ju(e){try{const t=this.updateFunction(e);return!ki(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Hu(e){this.Gu>0&&this.Yu(e)?(this.Gu-=1,this.asyncQueue.enqueueAndForget(()=>(this.ju(),Promise.resolve()))):this.deferred.reject(e)}Yu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!bp(t)}return!1}}/**
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
 */const Bn="FirestoreClient";class pw{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=st.UNAUTHENTICATED,this.clientId=ul.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{j(Bn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(j(Bn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new rn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=xl(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function uc(n,e){n.asyncQueue.verifyOperationInProgress(),j(Bn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Lp(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>{Ln("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{j("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(s=>{Ln("Terminating Firestore due to IndexedDb database deletion failed",s)})}),n._offlineComponents=e}async function Ed(n,e){n.asyncQueue.verifyOperationInProgress();const t=await mw(n);j(Bn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>pd(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>pd(e.remoteStore,s)),n._onlineComponents=e}async function mw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){j(Bn,"Using user provided OfflineComponentProvider");try{await uc(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Ln("Error using user provided cache. Falling back to memory cache: "+t),await uc(n,new Qo)}}else j(Bn,"Using default OfflineComponentProvider"),await uc(n,new hw(void 0));return n._offlineComponents}async function Ol(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(j(Bn,"Using user provided OnlineComponentProvider"),await Ed(n,n._uninitializedComponentsProvider._online)):(j(Bn,"Using default OnlineComponentProvider"),await Ed(n,new qc))),n._onlineComponents}function gw(n){return Ol(n).then(e=>e.syncEngine)}function _w(n){return Ol(n).then(e=>e.datastore)}async function Bc(n){const e=await Ol(n),t=e.eventManager;return t.onListen=YE.bind(null,e.syncEngine),t.onUnlisten=tw.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=ZE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=nw.bind(null,e.syncEngine),t}function yw(n,e,t={}){const r=new rn;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,l,h){const f=new rm({next:_=>{f.Ou(),a.enqueueAndForget(()=>Wp(i,p));const I=_.docs.has(c);!I&&_.fromCache?h.reject(new M(C.UNAVAILABLE,"Failed to get document because the client is offline.")):I&&_.fromCache&&l&&l.source==="server"?h.reject(new M(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(_)},error:_=>h.reject(_)}),p=new Kp(da(c.path),f,{includeMetadataChanges:!0,ka:!0});return Gp(i,p)}(await Bc(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function sm(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const wd=new Map;/**
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
 */const im="firestore.googleapis.com",Td=!0;class bd{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new M(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=im,this.ssl=Td}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Td;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Op;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Kv)throw new M(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}My("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=sm((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new M(C.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new M(C.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new M(C.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class wa{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new bd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new M(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new bd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Sy;switch(r.type){case"firstParty":return new xy(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new M(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=wd.get(t);r&&(j("ComponentProvider","Removing Datastore"),wd.delete(t),r.terminate())}(this),Promise.resolve()}}function vw(n,e,t,r={}){var s;n=At(n,wa);const i=ds(e),a=n._getSettings(),c=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),l=`${e}:${t}`;i&&(kf(`https://${l}`),Sf("Firestore",!0)),a.host!==im&&a.host!==l&&Ln("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},a),{host:l,ssl:i,emulatorOptions:r});if(!gr(h,c)&&(n._setSettings(h),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=st.MOCK_USER;else{f=e0(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const _=r.mockUserToken.sub||r.mockUserToken.user_id;if(!_)throw new M(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new st(_)}n._authCredentials=new Ry(new jf(f,p))}}/**
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
 */class Ir{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ir(this.firestore,e,this._query)}}class xe{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Rn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new xe(this.firestore,e,this._key)}toJSON(){return{type:xe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Ai(t,xe._jsonSchema))return new xe(e,r||null,new G(_e.fromString(t.referencePath)))}}xe._jsonSchemaVersion="firestore/documentReference/1.0",xe._jsonSchema={type:$e("string",xe._jsonSchemaVersion),referencePath:$e("string")};class Rn extends Ir{constructor(e,t,r){super(e,t,da(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new xe(this.firestore,null,new G(e))}withConverter(e){return new Rn(this.firestore,e,this._path)}}function bo(n,e,...t){if(n=ze(n),Bf("collection","path",e),n instanceof wa){const r=_e.fromString(e,...t);return Mh(r),new Rn(n,null,r)}{if(!(n instanceof xe||n instanceof Rn))throw new M(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(_e.fromString(e,...t));return Mh(r),new Rn(n.firestore,null,r)}}function It(n,e,...t){if(n=ze(n),arguments.length===1&&(e=ul.newId()),Bf("doc","path",e),n instanceof wa){const r=_e.fromString(e,...t);return Oh(r),new xe(n,null,new G(r))}{if(!(n instanceof xe||n instanceof Rn))throw new M(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(_e.fromString(e,...t));return Oh(r),new xe(n.firestore,n instanceof Rn?n.converter:null,new G(r))}}/**
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
 */const Id="AsyncQueue";class Ad{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Al(this,"async_queue_retry"),this.oc=()=>{const r=lc();r&&j(Id,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=lc();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=lc();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new rn;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!gs(e))throw e;j(Id,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,an("INTERNAL UNHANDLED ERROR: ",kd(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const s=Pl.createAndSchedule(this,e,t,r,i=>this.lc(i));return this.ec.push(s),s}ac(){this.tc&&K(47125,{hc:kd(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function kd(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function Sd(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class zn extends wa{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Ad,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ad(e),this._firestoreClient=void 0,await e}}}function Ew(n,e){const t=typeof n=="object"?n:xf(),r=typeof n=="string"?n:qo,s=cl(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Y_("firestore");i&&vw(s,...i)}return s}function Ta(n){if(n._terminated)throw new M(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||ww(n),n._firestoreClient}function ww(n){var e,t,r;const s=n._freezeSettings(),i=function(c,l,h,f){return new Wy(c,l,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,sm(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new pw(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}}(n._componentsProvider))}/**
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
 */class Et{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Et(Xe.fromBase64String(e))}catch(t){throw new M(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Et(Xe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Et._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ai(e,Et._jsonSchema))return Et.fromBase64String(e.bytes)}}Et._jsonSchemaVersion="firestore/bytes/1.0",Et._jsonSchema={type:$e("string",Et._jsonSchemaVersion),bytes:$e("string")};/**
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
 */class xi{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new M(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Je(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Vi{constructor(e){this._methodName=e}}/**
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
 */class zt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return te(this._lat,e._lat)||te(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:zt._jsonSchemaVersion}}static fromJSON(e){if(Ai(e,zt._jsonSchema))return new zt(e.latitude,e.longitude)}}zt._jsonSchemaVersion="firestore/geoPoint/1.0",zt._jsonSchema={type:$e("string",zt._jsonSchemaVersion),latitude:$e("number"),longitude:$e("number")};/**
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
 */class Ht{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Ht._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ai(e,Ht._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Ht(e.vectorValues);throw new M(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ht._jsonSchemaVersion="firestore/vectorValue/1.0",Ht._jsonSchema={type:$e("string",Ht._jsonSchemaVersion),vectorValues:$e("object")};/**
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
 */const Tw=/^__.*__$/;class bw{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Gn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Si(e,this.data,t,this.fieldTransforms)}}class om{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Gn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function am(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw K(40011,{Ec:n})}}class Ml{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new Ml(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.fc(e),s}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:r,mc:!1});return s.Ac(),s}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Jo(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(am(this.Ec)&&Tw.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class Iw{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ya(e)}Dc(e,t,r,s=!1){return new Ml({Ec:e,methodName:t,bc:r,path:Je.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Di(n){const e=n._freezeSettings(),t=ya(n._databaseId);return new Iw(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Ll(n,e,t,r,s,i={}){const a=n.Dc(i.merge||i.mergeFields?2:0,e,t,s);$l("Data must be an object, but it was:",a,r);const c=um(r,a);let l,h;if(i.merge)l=new wt(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const _=zc(e,p,t);if(!a.contains(_))throw new M(C.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);dm(f,_)||f.push(_)}l=new wt(f),h=a.fieldTransforms.filter(p=>l.covers(p.field))}else l=null,h=a.fieldTransforms;return new bw(new pt(c),l,h)}class ba extends Vi{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ba}}class Fl extends Vi{_toFieldTransform(e){return new vp(e.path,new hi)}isEqual(e){return e instanceof Fl}}class Ul extends Vi{constructor(e,t){super(e),this.Cc=t}_toFieldTransform(e){const t=new pi(e.serializer,pp(e.serializer,this.Cc));return new vp(e.path,t)}isEqual(e){return e instanceof Ul&&this.Cc===e.Cc}}function cm(n,e,t,r){const s=n.Dc(1,e,t);$l("Data must be an object, but it was:",s,r);const i=[],a=pt.empty();Hn(r,(l,h)=>{const f=jl(e,l,t);h=ze(h);const p=s.gc(f);if(h instanceof ba)i.push(f);else{const _=Ni(h,p);_!=null&&(i.push(f),a.set(f,_))}});const c=new wt(i);return new om(a,c,s.fieldTransforms)}function lm(n,e,t,r,s,i){const a=n.Dc(1,e,t),c=[zc(e,r,t)],l=[s];if(i.length%2!=0)throw new M(C.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<i.length;_+=2)c.push(zc(e,i[_])),l.push(i[_+1]);const h=[],f=pt.empty();for(let _=c.length-1;_>=0;--_)if(!dm(h,c[_])){const I=c[_];let R=l[_];R=ze(R);const V=a.gc(I);if(R instanceof ba)h.push(I);else{const x=Ni(R,V);x!=null&&(h.push(I),f.set(I,x))}}const p=new wt(h);return new om(f,p,a.fieldTransforms)}function Aw(n,e,t,r=!1){return Ni(t,n.Dc(r?4:3,e))}function Ni(n,e){if(hm(n=ze(n)))return $l("Unsupported field value:",e,n),um(n,e);if(n instanceof Vi)return function(r,s){if(!am(s.Ec))throw s.wc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const c of r){let l=Ni(c,s.yc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=ze(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return pp(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Ae.fromDate(r);return{timestampValue:Ho(s.serializer,i)}}if(r instanceof Ae){const i=new Ae(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ho(s.serializer,i)}}if(r instanceof zt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Et)return{bytesValue:Sp(s.serializer,r._byteString)};if(r instanceof xe){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:El(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Ht)return function(a,c){return{mapValue:{fields:{[Yf]:{stringValue:Zf},[Bo]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw c.wc("VectorValues must only contain numeric values.");return gl(c.serializer,h)})}}}}}}(r,s);throw s.wc(`Unsupported field value: ${la(r)}`)}(n,e)}function um(n,e){const t={};return Gf(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Hn(n,(r,s)=>{const i=Ni(s,e.Vc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function hm(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ae||n instanceof zt||n instanceof Et||n instanceof xe||n instanceof Vi||n instanceof Ht)}function $l(n,e,t){if(!hm(t)||!zf(t)){const r=la(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function zc(n,e,t){if((e=ze(e))instanceof xi)return e._internalPath;if(typeof e=="string")return jl(n,e);throw Jo("Field path arguments must be of type string or ",n,!1,void 0,t)}const kw=new RegExp("[~\\*/\\[\\]]");function jl(n,e,t){if(e.search(kw)>=0)throw Jo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new xi(...e.split("."))._internalPath}catch{throw Jo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Jo(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${r}`),a&&(l+=` in document ${s}`),l+=")"),new M(C.INVALID_ARGUMENT,c+n+l)}function dm(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class Xo{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new xe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Sw(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(ql("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Sw extends Xo{data(){return super.data()}}function ql(n,e){return typeof e=="string"?jl(n,e):e instanceof xi?e._internalPath:e._delegate._internalPath}/**
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
 */function Rw(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new M(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Bl{}class fm extends Bl{}function Cw(n,e,...t){let r=[];e instanceof Bl&&r.push(e),r=r.concat(t),function(i){const a=i.filter(l=>l instanceof Hl).length,c=i.filter(l=>l instanceof zl).length;if(a>1||a>0&&c>0)throw new M(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class zl extends fm{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new zl(e,t,r)}_apply(e){const t=this._parse(e);return pm(e._query,t),new Ir(e.firestore,e.converter,Dc(e._query,t))}_parse(e){const t=Di(e.firestore);return function(i,a,c,l,h,f,p){let _;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new M(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Cd(p,f);const R=[];for(const V of p)R.push(Rd(l,i,V));_={arrayValue:{values:R}}}else _=Rd(l,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Cd(p,f),_=Aw(c,a,p,f==="in"||f==="not-in");return Ue.create(h,f,_)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Hl extends Bl{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Hl(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ot.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const l of c)pm(a,l),a=Dc(a,l)}(e._query,t),new Ir(e.firestore,e.converter,Dc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Gl extends fm{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Gl(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new M(C.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new M(C.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ui(i,a)}(e._query,this._field,this._direction);return new Ir(e.firestore,e.converter,function(s,i){const a=s.explicitOrderBy.concat([i]);return new _s(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function Pw(n,e="asc"){const t=e,r=ql("orderBy",n);return Gl._create(r,t)}function Rd(n,e,t){if(typeof(t=ze(t))=="string"){if(t==="")throw new M(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!ap(e)&&t.indexOf("/")!==-1)throw new M(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(_e.fromString(t));if(!G.isDocumentKey(r))throw new M(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return zh(n,new G(r))}if(t instanceof xe)return zh(n,t._key);throw new M(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${la(t)}.`)}function Cd(n,e){if(!Array.isArray(n)||n.length===0)throw new M(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function pm(n,e){const t=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new M(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new M(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class mm{convertValue(e,t="none"){switch(jn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Me(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes($n(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw K(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Hn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t[Bo].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>Me(a.doubleValue));return new Ht(i)}convertGeoPoint(e){return new zt(Me(e.latitude),Me(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ha(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ai(e));default:return null}}convertTimestamp(e){const t=Un(e);return new Ae(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=_e.fromString(e);le(Np(r),9688,{name:e});const s=new ci(r.get(1),r.get(3)),i=new G(r.popFirst(5));return s.isEqual(t)||an(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function Wl(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class xw extends mm{constructor(e){super(),this.firestore=e}convertBytes(e){return new Et(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new xe(this.firestore,null,t)}}class jr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Cn extends Xo{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Io(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(ql("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Cn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Cn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Cn._jsonSchema={type:$e("string",Cn._jsonSchemaVersion),bundleSource:$e("string","DocumentSnapshot"),bundleName:$e("string"),bundle:$e("string")};class Io extends Cn{data(e={}){return super.data(e)}}class Kr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new jr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Io(this._firestore,this._userDataWriter,r.key,r,new jr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new M(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const l=new Io(s._firestore,s._userDataWriter,c.doc.key,c.doc,new jr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new Io(s._firestore,s._userDataWriter,c.doc.key,c.doc,new jr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:Vw(c.type),doc:l,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Kr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ul.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Vw(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return K(61501,{type:n})}}/**
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
 */function hr(n){n=At(n,xe);const e=At(n.firestore,zn);return yw(Ta(e),n._key).then(t=>_m(e,n,t))}Kr._jsonSchemaVersion="firestore/querySnapshot/1.0",Kr._jsonSchema={type:$e("string",Kr._jsonSchemaVersion),bundleSource:$e("string","QuerySnapshot"),bundleName:$e("string"),bundle:$e("string")};class Kl extends mm{constructor(e){super(),this.firestore=e}convertBytes(e){return new Et(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new xe(this.firestore,null,t)}}function Pd(n,e,t){n=At(n,xe);const r=At(n.firestore,zn),s=Wl(n.converter,e,t);return Ql(r,[Ll(Di(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,at.none())])}function Hc(n,e,t,...r){n=At(n,xe);const s=At(n.firestore,zn),i=Di(s);let a;return a=typeof(e=ze(e))=="string"||e instanceof xi?lm(i,"updateDoc",n._key,e,t,r):cm(i,"updateDoc",n._key,e),Ql(s,[a.toMutation(n._key,at.exists(!0))])}function gm(n,e){const t=At(n.firestore,zn),r=It(n),s=Wl(n.converter,e);return Ql(t,[Ll(Di(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,at.exists(!1))]).then(()=>r)}function hc(n,...e){var t,r,s;n=ze(n);let i={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Sd(e[a])||(i=e[a++]);const c={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Sd(e[a])){const p=e[a];e[a]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[a+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[a+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let l,h,f;if(n instanceof xe)h=At(n.firestore,zn),f=da(n._key.path),l={next:p=>{e[a]&&e[a](_m(h,n,p))},error:e[a+1],complete:e[a+2]};else{const p=At(n,Ir);h=At(p.firestore,zn),f=p._query;const _=new Kl(h);l={next:I=>{e[a]&&e[a](new Kr(h,_,p,I))},error:e[a+1],complete:e[a+2]},Rw(n._query)}return function(_,I,R,V){const x=new rm(V),H=new Kp(I,x,R);return _.asyncQueue.enqueueAndForget(async()=>Gp(await Bc(_),H)),()=>{x.Ou(),_.asyncQueue.enqueueAndForget(async()=>Wp(await Bc(_),H))}}(Ta(h),f,c,l)}function Ql(n,e){return function(r,s){const i=new rn;return r.asyncQueue.enqueueAndForget(async()=>rw(await gw(r),s,i)),i.promise}(Ta(n),e)}function _m(n,e,t){const r=t.docs.get(e._key),s=new Kl(n);return new Cn(n,s,e._key,r,new jr(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */const Dw={maxAttempts:5};function Hs(n,e){if((n=ze(n)).firestore!==e)throw new M(C.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 */class Nw{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Di(e)}get(e){const t=Hs(e,this._firestore),r=new xw(this._firestore);return this._transaction.lookup([t._key]).then(s=>{if(!s||s.length!==1)return K(24041);const i=s[0];if(i.isFoundDocument())return new Xo(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new Xo(this._firestore,r,t._key,null,t.converter);throw K(18433,{doc:i})})}set(e,t,r){const s=Hs(e,this._firestore),i=Wl(s.converter,t,r),a=Ll(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,a),this}update(e,t,r,...s){const i=Hs(e,this._firestore);let a;return a=typeof(t=ze(t))=="string"||t instanceof xi?lm(this._dataReader,"Transaction.update",i._key,t,r,s):cm(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,a),this}delete(e){const t=Hs(e,this._firestore);return this._transaction.delete(t._key),this}}/**
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
 */class Ow extends Nw{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Hs(e,this._firestore),r=new Kl(this._firestore);return super.get(e).then(s=>new Cn(this._firestore,r,t._key,s._document,new jr(!1,!1),t.converter))}}function Jl(n,e,t){n=At(n,zn);const r=Object.assign(Object.assign({},Dw),t);return function(i){if(i.maxAttempts<1)throw new M(C.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(i,a,c){const l=new rn;return i.asyncQueue.enqueueAndForget(async()=>{const h=await _w(i);new fw(i.asyncQueue,h,c,a,l).zu()}),l.promise}(Ta(n),s=>e(new Ow(n,s)),r)}function Pn(){return new Fl("serverTimestamp")}function ym(n){return new Ul("increment",n)}(function(e,t=!0){(function(s){ps=s})(fs),ts(new _r("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new zn(new Cy(r.getProvider("auth-internal")),new Vy(a,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new M(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ci(h.options.projectId,f)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),kn(Ph,xh,e),kn(Ph,xh,"esm2017")})();var Mw="firebase",Lw="11.10.0";/**
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
 */kn(Mw,Lw,"app");function Xl(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function vm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Fw=vm,Em=new bi("auth","Firebase",vm());/**
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
 */const Yo=new ol("@firebase/auth");function Uw(n,...e){Yo.logLevel<=ne.WARN&&Yo.warn(`Auth (${fs}): ${n}`,...e)}function Ao(n,...e){Yo.logLevel<=ne.ERROR&&Yo.error(`Auth (${fs}): ${n}`,...e)}/**
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
 */function ln(n,...e){throw Yl(n,...e)}function Gt(n,...e){return Yl(n,...e)}function wm(n,e,t){const r=Object.assign(Object.assign({},Fw()),{[e]:t});return new bi("auth","Firebase",r).create(e,{appName:n.name})}function dr(n){return wm(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Yl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Em.create(n,...e)}function Y(n,e,...t){if(!n)throw Yl(e,...t)}function tn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ao(e),new Error(e)}function un(n,e){n||tn(e)}/**
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
 */function Gc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function $w(){return xd()==="http:"||xd()==="https:"}function xd(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function jw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&($w()||o0()||"connection"in navigator)?navigator.onLine:!0}function qw(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Oi{constructor(e,t){this.shortDelay=e,this.longDelay=t,un(t>e,"Short delay should be less than long delay!"),this.isMobile=r0()||a0()}get(){return jw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Zl(n,e){un(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Tm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;tn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;tn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;tn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Bw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const zw=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Hw=new Oi(3e4,6e4);function eu(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function vs(n,e,t,r,s={}){return bm(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=Ii(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:l},i);return i0()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&ds(n.emulatorConfig.host)&&(h.credentials="include"),Tm.fetch()(await Im(n,n.config.apiHost,t,c),h)})}async function bm(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Bw),e);try{const s=new Ww(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw ho(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw ho(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw ho(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw ho(n,"user-disabled",a);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw wm(n,f,h);ln(n,f)}}catch(s){if(s instanceof hn)throw s;ln(n,"network-request-failed",{message:String(s)})}}async function Gw(n,e,t,r,s={}){const i=await vs(n,e,t,r,s);return"mfaPendingCredential"in i&&ln(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Im(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Zl(n.config,s):`${n.config.apiScheme}://${s}`;return zw.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class Ww{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Gt(this.auth,"network-request-failed")),Hw.get())})}}function ho(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Gt(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */async function Kw(n,e){return vs(n,"POST","/v1/accounts:delete",e)}async function Zo(n,e){return vs(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function ei(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Qw(n,e=!1){const t=ze(n),r=await t.getIdToken(e),s=tu(r);Y(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:ei(dc(s.auth_time)),issuedAtTime:ei(dc(s.iat)),expirationTime:ei(dc(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function dc(n){return Number(n)*1e3}function tu(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ao("JWT malformed, contained fewer than 3 sections"),null;try{const s=Tf(t);return s?JSON.parse(s):(Ao("Failed to decode base64 JWT payload"),null)}catch(s){return Ao("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Vd(n){const e=tu(n);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function mi(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof hn&&Jw(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Jw({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Xw{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Wc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ei(this.lastLoginAt),this.creationTime=ei(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ea(n){var e;const t=n.auth,r=await n.getIdToken(),s=await mi(n,Zo(t,{idToken:r}));Y(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Am(i.providerUserInfo):[],c=Zw(n.providerData,a),l=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!(c!=null&&c.length),f=l?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new Wc(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function Yw(n){const e=ze(n);await ea(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Zw(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Am(n){return n.map(e=>{var{providerId:t}=e,r=Xl(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function eT(n,e){const t=await bm(n,{},async()=>{const r=Ii({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Im(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&ds(n.emulatorConfig.host)&&(l.credentials="include"),Tm.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function tT(n,e){return vs(n,"POST","/v2/accounts:revokeToken",eu(n,e))}/**
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
 */class Qr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const t=Vd(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await eT(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Qr;return r&&(Y(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(Y(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(Y(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Qr,this.toJSON())}_performRefresh(){return tn("not implemented")}}/**
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
 */function _n(n,e){Y(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class xt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Xl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Xw(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Wc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await mi(this,this.stsTokenManager.getToken(this.auth,e));return Y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Qw(this,e)}reload(){return Yw(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new xt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ea(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if($t(this.auth.app))return Promise.reject(dr(this.auth));const e=await this.getIdToken();return await mi(this,Kw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,c,l,h,f;const p=(r=t.displayName)!==null&&r!==void 0?r:void 0,_=(s=t.email)!==null&&s!==void 0?s:void 0,I=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,R=(a=t.photoURL)!==null&&a!==void 0?a:void 0,V=(c=t.tenantId)!==null&&c!==void 0?c:void 0,x=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,H=(h=t.createdAt)!==null&&h!==void 0?h:void 0,q=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:$,emailVerified:z,isAnonymous:ae,providerData:B,stsTokenManager:y}=t;Y($&&y,e,"internal-error");const g=Qr.fromJSON(this.name,y);Y(typeof $=="string",e,"internal-error"),_n(p,e.name),_n(_,e.name),Y(typeof z=="boolean",e,"internal-error"),Y(typeof ae=="boolean",e,"internal-error"),_n(I,e.name),_n(R,e.name),_n(V,e.name),_n(x,e.name),_n(H,e.name),_n(q,e.name);const v=new xt({uid:$,auth:e,email:_,emailVerified:z,displayName:p,isAnonymous:ae,photoURL:R,phoneNumber:I,tenantId:V,stsTokenManager:g,createdAt:H,lastLoginAt:q});return B&&Array.isArray(B)&&(v.providerData=B.map(w=>Object.assign({},w))),x&&(v._redirectEventId=x),v}static async _fromIdTokenResponse(e,t,r=!1){const s=new Qr;s.updateFromServerResponse(t);const i=new xt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ea(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];Y(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Am(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Qr;c.updateFromIdToken(r);const l=new xt({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Wc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,h),l}}/**
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
 */const Dd=new Map;function nn(n){un(n instanceof Function,"Expected a class definition");let e=Dd.get(n);return e?(un(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Dd.set(n,e),e)}/**
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
 */class km{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}km.type="NONE";const Nd=km;/**
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
 */function ko(n,e,t){return`firebase:${n}:${e}:${t}`}class Jr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ko(this.userKey,s.apiKey,i),this.fullPersistenceKey=ko("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Zo(this.auth,{idToken:e}).catch(()=>{});return t?xt._fromGetAccountInfoResponse(this.auth,t,e):null}return xt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Jr(nn(Nd),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||nn(Nd);const a=ko(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const _=await Zo(e,{idToken:f}).catch(()=>{});if(!_)break;p=await xt._fromGetAccountInfoResponse(e,_,f)}else p=xt._fromJSON(e,f);h!==i&&(c=p),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Jr(i,e,r):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new Jr(i,e,r))}}/**
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
 */function Od(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Pm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Sm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Vm(e))return"Blackberry";if(Dm(e))return"Webos";if(Rm(e))return"Safari";if((e.includes("chrome/")||Cm(e))&&!e.includes("edge/"))return"Chrome";if(xm(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Sm(n=lt()){return/firefox\//i.test(n)}function Rm(n=lt()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Cm(n=lt()){return/crios\//i.test(n)}function Pm(n=lt()){return/iemobile/i.test(n)}function xm(n=lt()){return/android/i.test(n)}function Vm(n=lt()){return/blackberry/i.test(n)}function Dm(n=lt()){return/webos/i.test(n)}function nu(n=lt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function nT(n=lt()){var e;return nu(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function rT(){return c0()&&document.documentMode===10}function Nm(n=lt()){return nu(n)||xm(n)||Dm(n)||Vm(n)||/windows phone/i.test(n)||Pm(n)}/**
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
 */function Om(n,e=[]){let t;switch(n){case"Browser":t=Od(lt());break;case"Worker":t=`${Od(lt())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${fs}/${r}`}/**
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
 */class sT{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const l=e(i);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function iT(n,e={}){return vs(n,"GET","/v2/passwordPolicy",eu(n,e))}/**
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
 */const oT=6;class aT{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:oT,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class cT{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Md(this),this.idTokenSubscription=new Md(this),this.beforeStateQueue=new sT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Em,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=nn(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Jr.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Zo(this,{idToken:e}),r=await xt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if($t(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&(l!=null&&l.user)&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ea(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=qw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if($t(this.app))return Promise.reject(dr(this));const t=e?ze(e):null;return t&&Y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return $t(this.app)?Promise.reject(dr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return $t(this.app)?Promise.reject(dr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(nn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await iT(this),t=new aT(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new bi("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await tT(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&nn(e)||this._popupRedirectResolver;Y(t,this,"argument-error"),this.redirectPersistenceManager=await Jr.create(this,[nn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Om(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if($t(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Uw(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function ru(n){return ze(n)}class Md{constructor(e){this.auth=e,this.observer=null,this.addObserver=g0(t=>this.observer=t)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let su={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function lT(n){su=n}function uT(n){return su.loadJS(n)}function hT(){return su.gapiScript}function dT(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function fT(n,e){const t=cl(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(gr(i,e??{}))return s;ln(s,"already-initialized")}return t.initialize({options:e})}function pT(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(nn);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function mT(n,e,t){const r=ru(n);Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Mm(e),{host:a,port:c}=gT(e),l=c===null?"":`:${c}`,h={url:`${i}//${a}${l}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){Y(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Y(gr(h,r.config.emulator)&&gr(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,ds(a)?(kf(`${i}//${a}${l}`),Sf("Auth",!0)):_T()}function Mm(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function gT(n){const e=Mm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Ld(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Ld(a)}}}function Ld(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function _T(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Lm{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return tn("not implemented")}_getIdTokenResponse(e){return tn("not implemented")}_linkToIdToken(e,t){return tn("not implemented")}_getReauthenticationResolver(e){return tn("not implemented")}}/**
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
 */async function Xr(n,e){return Gw(n,"POST","/v1/accounts:signInWithIdp",eu(n,e))}/**
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
 */const yT="http://localhost";class Er extends Lm{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Er(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ln("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Xl(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new Er(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Xr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Xr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Xr(e,t)}buildRequest(){const e={requestUri:yT,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ii(t)}return e}}/**
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
 */class Fm{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Mi extends Fm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class yn extends Mi{constructor(){super("facebook.com")}static credential(e){return Er._fromParams({providerId:yn.PROVIDER_ID,signInMethod:yn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yn.credentialFromTaggedObject(e)}static credentialFromError(e){return yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return yn.credential(e.oauthAccessToken)}catch{return null}}}yn.FACEBOOK_SIGN_IN_METHOD="facebook.com";yn.PROVIDER_ID="facebook.com";/**
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
 */class vn extends Mi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Er._fromParams({providerId:vn.PROVIDER_ID,signInMethod:vn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return vn.credentialFromTaggedObject(e)}static credentialFromError(e){return vn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return vn.credential(t,r)}catch{return null}}}vn.GOOGLE_SIGN_IN_METHOD="google.com";vn.PROVIDER_ID="google.com";/**
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
 */class En extends Mi{constructor(){super("github.com")}static credential(e){return Er._fromParams({providerId:En.PROVIDER_ID,signInMethod:En.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return En.credentialFromTaggedObject(e)}static credentialFromError(e){return En.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return En.credential(e.oauthAccessToken)}catch{return null}}}En.GITHUB_SIGN_IN_METHOD="github.com";En.PROVIDER_ID="github.com";/**
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
 */class wn extends Mi{constructor(){super("twitter.com")}static credential(e,t){return Er._fromParams({providerId:wn.PROVIDER_ID,signInMethod:wn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return wn.credentialFromTaggedObject(e)}static credentialFromError(e){return wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return wn.credential(t,r)}catch{return null}}}wn.TWITTER_SIGN_IN_METHOD="twitter.com";wn.PROVIDER_ID="twitter.com";/**
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
 */class as{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await xt._fromIdTokenResponse(e,r,s),a=Fd(r);return new as({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Fd(r);return new as({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Fd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ta extends hn{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ta.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new ta(e,t,r,s)}}function Um(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ta._fromErrorAndOperation(n,i,e,r):i})}async function vT(n,e,t=!1){const r=await mi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return as._forOperation(n,"link",r)}/**
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
 */async function ET(n,e,t=!1){const{auth:r}=n;if($t(r.app))return Promise.reject(dr(r));const s="reauthenticate";try{const i=await mi(n,Um(r,s,e,n),t);Y(i.idToken,r,"internal-error");const a=tu(i.idToken);Y(a,r,"internal-error");const{sub:c}=a;return Y(n.uid===c,r,"user-mismatch"),as._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&ln(r,"user-mismatch"),i}}/**
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
 */async function wT(n,e,t=!1){if($t(n.app))return Promise.reject(dr(n));const r="signIn",s=await Um(n,r,e),i=await as._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function TT(n,e,t,r){return ze(n).onIdTokenChanged(e,t,r)}function bT(n,e,t){return ze(n).beforeAuthStateChanged(e,t)}function IT(n,e,t,r){return ze(n).onAuthStateChanged(e,t,r)}const na="__sak";/**
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
 */class $m{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(na,"1"),this.storage.removeItem(na),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const AT=1e3,kT=10;class jm extends $m{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Nm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);rT()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,kT):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},AT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}jm.type="LOCAL";const ST=jm;/**
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
 */class qm extends $m{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}qm.type="SESSION";const Bm=qm;/**
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
 */function RT(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Ia{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Ia(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,i)),l=await RT(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ia.receivers=[];/**
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
 */function iu(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class CT{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const h=iu("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const _=p;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(_.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function Wt(){return window}function PT(n){Wt().location.href=n}/**
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
 */function zm(){return typeof Wt().WorkerGlobalScope<"u"&&typeof Wt().importScripts=="function"}async function xT(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function VT(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function DT(){return zm()?self:null}/**
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
 */const Hm="firebaseLocalStorageDb",NT=1,ra="firebaseLocalStorage",Gm="fbase_key";class Li{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Aa(n,e){return n.transaction([ra],e?"readwrite":"readonly").objectStore(ra)}function OT(){const n=indexedDB.deleteDatabase(Hm);return new Li(n).toPromise()}function Kc(){const n=indexedDB.open(Hm,NT);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ra,{keyPath:Gm})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ra)?e(r):(r.close(),await OT(),e(await Kc()))})})}async function Ud(n,e,t){const r=Aa(n,!0).put({[Gm]:e,value:t});return new Li(r).toPromise()}async function MT(n,e){const t=Aa(n,!1).get(e),r=await new Li(t).toPromise();return r===void 0?null:r.value}function $d(n,e){const t=Aa(n,!0).delete(e);return new Li(t).toPromise()}const LT=800,FT=3;class Wm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Kc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>FT)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return zm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ia._getInstance(DT()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await xT(),!this.activeServiceWorker)return;this.sender=new CT(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||VT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Kc();return await Ud(e,na,"1"),await $d(e,na),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ud(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>MT(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>$d(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Aa(s,!1).getAll();return new Li(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),LT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Wm.type="LOCAL";const UT=Wm;new Oi(3e4,6e4);/**
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
 */function $T(n,e){return e?nn(e):(Y(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class ou extends Lm{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Xr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Xr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Xr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function jT(n){return wT(n.auth,new ou(n),n.bypassAuthState)}function qT(n){const{auth:e,user:t}=n;return Y(t,e,"internal-error"),ET(t,new ou(n),n.bypassAuthState)}async function BT(n){const{auth:e,user:t}=n;return Y(t,e,"internal-error"),vT(t,new ou(n),n.bypassAuthState)}/**
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
 */class Km{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return jT;case"linkViaPopup":case"linkViaRedirect":return BT;case"reauthViaPopup":case"reauthViaRedirect":return qT;default:ln(this.auth,"internal-error")}}resolve(e){un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){un(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const zT=new Oi(2e3,1e4);class qr extends Km{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,qr.currentPopupAction&&qr.currentPopupAction.cancel(),qr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){un(this.filter.length===1,"Popup operations only handle one event");const e=iu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Gt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Gt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,qr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Gt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,zT.get())};e()}}qr.currentPopupAction=null;/**
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
 */const HT="pendingRedirect",So=new Map;class GT extends Km{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=So.get(this.auth._key());if(!e){try{const r=await WT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}So.set(this.auth._key(),e)}return this.bypassAuthState||So.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function WT(n,e){const t=JT(e),r=QT(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function KT(n,e){So.set(n._key(),e)}function QT(n){return nn(n._redirectPersistence)}function JT(n){return ko(HT,n.config.apiKey,n.name)}async function XT(n,e,t=!1){if($t(n.app))return Promise.reject(dr(n));const r=ru(n),s=$T(r,e),a=await new GT(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const YT=10*60*1e3;class ZT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!eb(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Qm(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Gt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=YT&&this.cachedEventUids.clear(),this.cachedEventUids.has(jd(e))}saveEventToCache(e){this.cachedEventUids.add(jd(e)),this.lastProcessedEventTime=Date.now()}}function jd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Qm({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function eb(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Qm(n);default:return!1}}/**
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
 */async function tb(n,e={}){return vs(n,"GET","/v1/projects",e)}/**
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
 */const nb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,rb=/^https?/;async function sb(n){if(n.config.emulator)return;const{authorizedDomains:e}=await tb(n);for(const t of e)try{if(ib(t))return}catch{}ln(n,"unauthorized-domain")}function ib(n){const e=Gc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!rb.test(t))return!1;if(nb.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const ob=new Oi(3e4,6e4);function qd(){const n=Wt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function ab(n){return new Promise((e,t)=>{var r,s,i;function a(){qd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{qd(),t(Gt(n,"network-request-failed"))},timeout:ob.get()})}if(!((s=(r=Wt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Wt().gapi)===null||i===void 0)&&i.load)a();else{const c=dT("iframefcb");return Wt()[c]=()=>{gapi.load?a():t(Gt(n,"network-request-failed"))},uT(`${hT()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Ro=null,e})}let Ro=null;function cb(n){return Ro=Ro||ab(n),Ro}/**
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
 */const lb=new Oi(5e3,15e3),ub="__/auth/iframe",hb="emulator/auth/iframe",db={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},fb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function pb(n){const e=n.config;Y(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Zl(e,hb):`https://${n.config.authDomain}/${ub}`,r={apiKey:e.apiKey,appName:n.name,v:fs},s=fb.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Ii(r).slice(1)}`}async function mb(n){const e=await cb(n),t=Wt().gapi;return Y(t,n,"internal-error"),e.open({where:document.body,url:pb(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:db,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Gt(n,"network-request-failed"),c=Wt().setTimeout(()=>{i(a)},lb.get());function l(){Wt().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
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
 */const gb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},_b=500,yb=600,vb="_blank",Eb="http://localhost";class Bd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function wb(n,e,t,r=_b,s=yb){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},gb),{width:r.toString(),height:s.toString(),top:i,left:a}),h=lt().toLowerCase();t&&(c=Cm(h)?vb:t),Sm(h)&&(e=e||Eb,l.scrollbars="yes");const f=Object.entries(l).reduce((_,[I,R])=>`${_}${I}=${R},`,"");if(nT(h)&&c!=="_self")return Tb(e||"",c),new Bd(null);const p=window.open(e||"",c,f);Y(p,n,"popup-blocked");try{p.focus()}catch{}return new Bd(p)}function Tb(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const bb="__/auth/handler",Ib="emulator/auth/handler",Ab=encodeURIComponent("fac");async function zd(n,e,t,r,s,i){Y(n.config.authDomain,n,"auth-domain-config-required"),Y(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:fs,eventId:s};if(e instanceof Fm){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",m0(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof Mi){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await n._getAppCheckToken(),h=l?`#${Ab}=${encodeURIComponent(l)}`:"";return`${kb(n)}?${Ii(c).slice(1)}${h}`}function kb({config:n}){return n.emulator?Zl(n,Ib):`https://${n.authDomain}/${bb}`}/**
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
 */const fc="webStorageSupport";class Sb{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Bm,this._completeRedirectFn=XT,this._overrideRedirectResult=KT}async _openPopup(e,t,r,s){var i;un((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await zd(e,t,r,Gc(),s);return wb(e,a,iu())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await zd(e,t,r,Gc(),s);return PT(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(un(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await mb(e),r=new ZT(e);return t.register("authEvent",s=>(Y(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(fc,{type:fc},s=>{var i;const a=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[fc];a!==void 0&&t(!!a),ln(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=sb(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Nm()||Rm()||nu()}}const Rb=Sb;var Hd="@firebase/auth",Gd="1.10.8";/**
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
 */class Cb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Pb(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function xb(n){ts(new _r("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;Y(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Om(n)},h=new cT(r,s,i,l);return pT(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),ts(new _r("auth-internal",e=>{const t=ru(e.getProvider("auth").getImmediate());return(r=>new Cb(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),kn(Hd,Gd,Pb(n)),kn(Hd,Gd,"esm2017")}/**
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
 */const Vb=5*60,Db=Af("authIdTokenMaxAge")||Vb;let Wd=null;const Nb=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Db)return;const s=t==null?void 0:t.token;Wd!==s&&(Wd=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Ob(n=xf()){const e=cl(n,"auth");if(e.isInitialized())return e.getImmediate();const t=fT(n,{popupRedirectResolver:Rb,persistence:[UT,ST,Bm]}),r=Af("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=Nb(i.toString());bT(t,a,()=>a(t.currentUser)),TT(t,c=>a(c))}}const s=bf("auth");return s&&mT(t,`http://${s}`),t}function Mb(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}lT({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Gt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",Mb().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});xb("Browser");const Lb={apiKey:"AIzaSyAsw466_wzsiLtbjw6FXZ1_O3HQ_AkVyU8",authDomain:"album-apexora.firebaseapp.com",projectId:"album-apexora",appId:"1:17231648284:web:20edb8477453f50473f1d9"},Jm=Pf(Lb),Ar=Ob(Jm),it=Ew(Jm),Fb={primera_visita:{nombre:"Primer paso",desc:"Entraste a Apexora",icono:"🌱",juego:"portal",premio:{comun:10}},racha_3:{nombre:"Constante",desc:"3 días seguidos",icono:"🔥",juego:"portal",premio:{comun:20}},racha_7:{nombre:"Una semana",desc:"7 días seguidos",icono:"⚡",juego:"portal",premio:{comun:50,rara:1}},racha_30:{nombre:"Leyenda viva",desc:"30 días seguidos",icono:"👑",juego:"portal",premio:{comun:200,rara:5}},tcg_primera_victoria:{nombre:"Primer duelo",desc:"Gana una partida de Cartas Alfa",icono:"⚔️",juego:"tcg",premio:{comun:25}},tcg_10_victorias:{nombre:"Duelista",desc:"10 victorias en Cartas Alfa",icono:"🏆",juego:"tcg",premio:{comun:100,rara:1}},sala_primer_reto:{nombre:"Desafiante",desc:"Completa tu primer reto",icono:"🎯",juego:"sala",premio:{comun:25}},album_primer_sobre:{nombre:"Coleccionista",desc:"Abre tu primer sobre",icono:"📖",juego:"album",premio:{comun:25}}},Ub="@apexora-sala.app",Xm="apexora_players",Ym=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Argentina/Buenos_Aires"}).format(new Date),$b=n=>{const e=new Date(n+"T12:00:00Z");return e.setUTCDate(e.getUTCDate()-1),e.toISOString().slice(0,10)},ka=()=>It(it,Xm,Ar.currentUser.uid);function Co(n="/Portal/"){return new Promise(e=>{const t=IT(Ar,async r=>{var s;t(),(s=r==null?void 0:r.email)!=null&&s.endsWith(Ub)?(await jb(),e(r)):location.href=n+"?volver="+encodeURIComponent(location.href)})})}async function jb(){const n=Ar.currentUser;if(!n)return null;const e=It(it,Xm,n.uid),t=Ym(),r=await Jl(it,async i=>{const a=await i.get(e);if(!a.exists()){const p={nombre:n.email.split("@")[0],streak:{current:1,best:1,lastDay:t},logros:{},fragmentos:{comun:0,rara:0},stats:{},cupo:{dia:t,comun:0},creado:Pn(),ts:Pn(),tn:Pn()};return i.set(e,p),p}const c=a.data(),l=c.streak;if(l.lastDay===t)return c;const h=l.lastDay===$b(t)?l.current+1:1,f={current:h,best:Math.max(l.best,h),lastDay:t};return i.update(e,{streak:f}),{...c,streak:f}}),s=r.streak.current;return await Br("primera_visita"),s>=3&&await Br("racha_3"),s>=7&&await Br("racha_7"),s>=30&&await Br("racha_30"),r}async function Br(n){const e=Fb[n];if(!Ar.currentUser||!e)return!1;const t=ka(),r=await Jl(it,async s=>{var c;const i=await s.get(t);if(!i.exists()||(c=i.data().logros)!=null&&c[n])return!1;const a={[`logros.${n}`]:{fecha:Pn(),juego:e.juego}};for(const[l,h]of Object.entries(e.premio||{}))a[`fragmentos.${l}`]=ym(h);return s.update(t,a),!0});return r&&au(e.juego,"logro",{nombre:e.nombre,icono:e.icono}),r}async function Zm(n,e=0){try{const t=ka();return await Jl(it,async r=>{var f,p,_;const s=(await r.get(t)).data(),i=Ym(),a=((f=s.cupo)==null?void 0:f.dia)===i?s.cupo.comun:0,c=Math.max(0,Math.min(n,60,300-a)),l=((_=(p=s.tn)==null?void 0:p.toMillis)==null?void 0:_.call(p))??0,h=Date.now()-l>6*36e5+5e3&&Math.random()<e?1:0;return!c&&!h?{comun:0,rara:0}:(r.update(t,{"fragmentos.comun":s.fragmentos.comun+c,"fragmentos.rara":s.fragmentos.rara+h,cupo:{dia:i,comun:a+c},ts:Pn(),...h?{tn:Pn()}:{}}),{comun:c,rara:h})})}catch{return{comun:0,rara:0}}}const eg=(n,e,t=1)=>Hc(ka(),{[`stats.${n}.${e}`]:ym(t)});async function qb(){if(!Ar.currentUser)return null;const n=await hr(ka());return n.exists()?n.data():null}const Bb="apexora_activity";let fo=null;async function zb(){const n=Ar.currentUser;if(!n)return null;if(fo&&fo.uid===n.uid)return fo;let e=n.email.split("@")[0],t="🙂";try{const r=await hr(It(it,"apexora_profiles",n.uid));r.exists()&&(e=r.data().name||e,t=r.data().avatar||t)}catch{}return fo={uid:n.uid,nombre:e,avatar:t}}async function au(n,e,t={}){try{const r=await zb();if(!r)return!1;const s={};for(const[i,a]of Object.entries(t).slice(0,6))s[i]=typeof a=="number"||typeof a=="boolean"?a:String(a).slice(0,40);return await gm(bo(it,Bb),{uid:r.uid,nombre:String(r.nombre).slice(0,24),avatar:String(r.avatar).slice(0,8),juego:n,tipo:e,datos:s,ts:Pn()}),!0}catch{return!1}}function Vr(n){const e=n,t=String((e==null?void 0:e.code)??"");return t.includes("permission-denied")?"Firebase rechazó la operación (¿sala llena, ya empezada, sesión inválida o reglas sin publicar?).":t.includes("unavailable")||t.includes("network")?"Sin conexión con Firebase.":(e==null?void 0:e.message)??"Error de conexión"}const Hb=(n,e=[ct.Luminarae,ct.Umbra])=>yf(e,n);function Qc(n,e){if(e===0)return n;const t=r=>1-r;return{...n,p:[n.p[1],n.p[0]],token:t(n.token),active:t(n.active),winner:n.winner===null||n.winner===-1?n.winner:t(n.winner),tok:[n.tok[1],n.tok[0]],mull:[n.mull[1],n.mull[0]],stack:n.stack.map(r=>({...r,owner:t(r.owner)}))}}function tg(n,e,t){return!t||typeof t.type!="string"?!1:t.type==="mulligan"?n.phase==="mulligan"&&t.player===e&&!n.mull[e]:n.phase!=="mulligan"&&n.active===e}function ng(n,e,t){if(e===-1||!tg(n,e,t))return n;try{return si(n,t)}catch{return n}}const Gb=(n,e)=>n.type==="mulligan"?{...n,player:e}:n,Wb=n=>n.type==="mulligan"?{...n,player:0}:n,Kd="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",Kb=()=>Array.from({length:4},()=>Kd[Math.floor(Math.random()*Kd.length)]).join(""),pc="tcgRoom";class xn{constructor(e){Le(this,"code","");Le(this,"seat",0);Le(this,"uid","");Le(this,"decks",[ct.Luminarae,ct.Umbra]);Le(this,"g");Le(this,"host","");Le(this,"guest","");Le(this,"seed",0);Le(this,"applied",0);Le(this,"sending",!1);Le(this,"sentAt",-1);Le(this,"unsubs",[]);Le(this,"chatSeen",new Set);Le(this,"ready",!1);Le(this,"pulled",!1);Le(this,"waiters",[]);this.h=e}static savedCode(){try{return localStorage.getItem(pc)}catch{return null}}save(){try{localStorage.setItem(pc,this.code)}catch{}}static clearSaved(){try{localStorage.removeItem(pc)}catch{}}async create(e="Luminarae"){try{const t=await Co();this.uid=t.uid,this.seat=0,this.seed=Math.floor(Math.random()*2**31);for(let r=0;r<8;r++){const s=Kb();if(!(await hr(It(it,"tcgGames",s))).exists())return await Pd(It(it,"tcgGames",s),{host:t.uid,guest:null,hostDeck:e,seed:this.seed,status:"waiting",createdAt:Pn()}),this.code=s,this.save(),this.h.onStatus(`Sala ${s}: esperando rival…`),this.listen(),s}}catch(t){throw new Error(Vr(t))}throw new Error("No se pudo crear la sala, inténtalo de nuevo")}async join(e,t="Umbra"){var s,i;const r=e.trim().toUpperCase();if(r.length!==4)throw new Error("El código tiene 4 caracteres");try{const a=await Co();this.uid=a.uid;const c=It(it,"tcgGames",r),l=await hr(c);if(!l.exists())throw new Error("Esa sala no existe");const h=l.data();if(h.host===a.uid)this.seat=0;else if(h.guest===a.uid)this.seat=1;else{if(h.guest)throw new Error("La sala ya está llena");try{await Hc(c,{guest:a.uid,guestDeck:t,status:"playing"})}catch{await Hc(c,{guest:a.uid,status:"playing"})}this.seat=1}this.code=r,this.save(),this.listen()}catch(a){throw new Error((s=a.message)!=null&&s.startsWith("Esa sala")||(i=a.message)!=null&&i.startsWith("La sala")?a.message:Vr(a))}}async resume(e){try{const t=await Co(),r=await hr(It(it,"tcgGames",e.trim().toUpperCase())),s=r.data();if(!r.exists()||(s==null?void 0:s.status)!=="playing"||s.host!==t.uid&&s.guest!==t.uid)throw xn.clearSaved(),new Error("Sala no disponible")}catch(t){throw xn.clearSaved(),t}await this.join(e)}listen(){const e=It(it,"tcgGames",this.code);this.unsubs.push(hc(e,t=>{const r=t.data();r&&(this.host=r.host,this.guest=r.guest??"",this.seed=r.seed,this.decks=[ph(r.hostDeck,"Luminarae"),ph(r.guestDeck,"Umbra")],r.status==="playing"&&this.guest&&!this.ready&&(this.ready=!0,this.g=Hb(this.seed,this.decks),this.applied=0,this.pulled=!1,this.h.onReady(),this.h.onStatus(`Sala ${this.code}: ¡partida en marcha!`),this.unsubs.push(hc(Cw(bo(e,"chat"),Pw("t")),s=>s.docChanges().forEach(i=>{var c,l;if(i.type!=="added"||this.chatSeen.has(i.doc.id))return;this.chatSeen.add(i.doc.id);const a=i.doc.data();(l=(c=this.h).onChat)==null||l.call(c,{id:i.doc.id,mine:a.by===this.uid,text:String(a.text??"")})}),s=>this.h.onStatus("Chat: "+Vr(s)))),this.unsubs.push(hc(bo(e,"moves"),{includeMetadataChanges:!0},s=>this.pull(s.docs),s=>this.h.onStatus(Vr(s))))))},t=>this.h.onStatus(Vr(t))))}pull(e){const t=new Map;for(const c of e)c.metadata.hasPendingWrites||t.set(Number(c.id),c.data());const r=!this.pulled;this.pulled=!0;const s=[],i=this.applied;let a=!1;for(;t.has(this.applied);){const c=this.applied,l=t.get(c),h=l.by===this.host?0:l.by===this.guest?1:-1,f=this.g,p=ng(f,h,l.action);p!==f&&h!==-1&&s.push({before:f,action:l.action,seat:h}),this.g=p,this.applied++,this.sending&&l.by===this.uid&&c===this.sentAt&&(this.sending=!1,a=!0)}this.applied===i&&!r||(this.h.onMoves(this.g,s,r||s.length>3),a&&this.h.onSettled(),this.waiters.splice(0).forEach(c=>c()))}waitAdvance(e,t){return new Promise(r=>{if(this.applied>e)return r(!0);const s=setTimeout(()=>r(!1),t);this.waiters.push(()=>{clearTimeout(s),r(this.applied>e)})})}async send(e){if(this.sending||!this.ready)return!1;this.sending=!0;for(let t=0;t<3;t++){const r=this.applied,s=JSON.parse(JSON.stringify(Gb(e,this.seat)));this.sentAt=r;try{return await Pd(It(it,"tcgGames",this.code,"moves",String(r)),{by:this.uid,action:s,t:Date.now()}),!0}catch{if(!await this.waitAdvance(r,4e3)||!tg(this.g,this.seat,s))break}}return this.sending=!1,this.h.onStatus("No se pudo enviar la jugada; revisa el tablero y repítela."),!1}async sendChat(e){if(!this.ready)throw new Error("El chat se activa cuando entra el rival.");try{await gm(bo(it,"tcgGames",this.code,"chat"),{by:this.uid,text:e.slice(0,140),t:Date.now()})}catch(t){throw new Error(Vr(t))}}get busy(){return this.sending}get isReady(){return this.ready}close(){this.unsubs.forEach(e=>e()),this.unsubs=[],this.waiters=[],xn.clearSaved()}}const Qb=`
.onl{position:fixed;inset:0;z-index:9000;display:grid;place-items:center;background:rgba(5,5,12,.78)}
.onl>div{background:#14141f;border:1px solid #3a3a5a;border-radius:14px;padding:22px 24px;width:min(92vw,340px);display:grid;gap:12px;color:#eee;text-align:center}
.onl h2{margin:0}.onl input{padding:10px;font-size:22px;letter-spacing:6px;text-align:center;text-transform:uppercase;border-radius:8px;border:1px solid #444;background:#0c0c14;color:#fff}
.onl .st{min-height:1.2em;font-size:13px;opacity:.85}
.roomtag{position:fixed;top:6px;left:50%;transform:translateX(-50%);z-index:8000;font-size:12px;padding:3px 10px;border-radius:99px;background:rgba(20,20,31,.85);color:#ddd;pointer-events:none}
`;let Dr=null,ft=null;function rg(){if(!document.getElementById("onl-css")){const n=document.createElement("style");n.id="onl-css",n.textContent=Qb,document.head.append(n)}}function gi(n){rg(),Dr||(Dr=document.createElement("div"),Dr.className="roomtag",document.body.append(Dr)),Dr.textContent=n,Dr.hidden=!n}function ti(){ft==null||ft.remove(),ft=null}function sa(n){const e=ft==null?void 0:ft.querySelector(".st");e&&(e.textContent=n)}function Jc(n){rg(),ti(),ft=document.createElement("div"),ft.className="onl",ft.innerHTML=`<div><h2>Jugar online</h2>
    ${n.inRoom?'<p>Ya estás en una sala.</p><button class="btn" data-x="leave">Salir de la sala</button>':'<button class="btn" data-x="create">Crear sala</button><p style="margin:0;opacity:.7">o únete con un código</p><input data-x="code" maxlength="4" placeholder="K7QF" autocomplete="off"><button class="btn" data-x="join">Unirse</button>'}
    <div class="st"></div><button class="ghost" data-x="close">Cerrar</button></div>`,document.body.append(ft);const e=t=>{sa("Conectando…"),t().catch(r=>sa((r==null?void 0:r.message)??"Error"))};ft.addEventListener("click",t=>{var s;const r=t.target.dataset.x;r&&(r==="close"?ti():r==="create"?e(n.create):r==="join"?e(()=>n.join(ft.querySelector("[data-x=code]").value)):r==="leave"&&((s=n.leave)==null||s.call(n),ti()))}),ft.addEventListener("keydown",t=>{var r;t.stopPropagation(),t.key==="Enter"&&((r=ft.querySelector("[data-x=join]"))==null||r.click())})}async function Jb(n){try{const e=(await hr(It(it,"tcgGames",n))).data(),t=Ar.currentUser.uid,r=(e==null?void 0:e.host)===t?e==null?void 0:e.guest:e==null?void 0:e.host;if(!r)return"";const s=await hr(It(it,"apexora_profiles",r));return s.exists()?String(s.data().name??""):""}catch{return""}}async function Xb(n,e){var s,i;const t="premiado:"+n;if(localStorage.getItem(t))return null;localStorage.setItem(t,"1");const r=await Zm(e?20:5,e?.02:0);if(e){Jb(n).then(l=>au("tcg","duelo",{rival:l})).catch(()=>{}),await eg("tcg","victorias");const a=await qb(),c=((i=(s=a==null?void 0:a.stats)==null?void 0:s.tcg)==null?void 0:i.victorias)??0;c>=1&&await Br("tcg_primera_victoria"),c>=10&&await Br("tcg_10_victorias")}return r}async function Yb(n){const e=await Zm(n?8:2,0);return n&&(au("tcg","duelo",{ia:!0}).catch(()=>{}),await eg("tcg","victorias_ia")),e}const _i=document.getElementById("app"),Ct=document.createElement("div");Ct.className="preview";document.body.append(Ct);const sg={barrera:"Barrera",robovida:"Robo de vida",arrollar:"Arrollar",letal:"Letal",rapido:"Ataque rápido",duro:"Duro",elusivo:"Elusivo",temible:"Temible",retador:"Retador",regenera:"Regeneración",efimero:"Efímero"},Zb={barrera:"anula el siguiente daño que recibiría y luego se pierde.",robovida:"el daño que inflige cura a tu Nexo.",arrollar:"el daño sobrante sobre su bloqueador va al Nexo.",letal:"destruye cualquier unidad a la que dañe.",rapido:"al atacar, golpea antes que su bloqueador.",duro:"recibe 1 de daño menos de cada fuente.",elusivo:"solo puede ser bloqueada por unidades elusivas.",temible:"solo la bloquean unidades con 3 o más de poder.",retador:"al atacar, elige qué enemigo debe bloquearla.",regenera:"se cura por completo al final de cada ronda.",efimero:"muere al golpear o al acabar la ronda."},eI={barrera:"🛡",robovida:"🩸",arrollar:"🐗",letal:"☠",rapido:"⚡",duro:"🪨",elusivo:"🌫",temible:"👁",retador:"⚔",regenera:"♻",efimero:"⏳"},tI={burst:"Ráfaga",focus:"Enfoque",fast:"Rápido",slow:"Lento"},nI={burst:"Ráfaga: se resuelve al instante, no pasa la prioridad y sirve como reacción.",focus:"Enfoque: se resuelve al instante, no pasa la prioridad; solo como acción original.",fast:"Rápido: va a la pila; el rival puede responder. Sirve como reacción.",slow:"Lento: va a la pila; solo como acción original (con la pila vacía)."},fr=n=>n.replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]);let yt=On(),ig=pr(yt).join();const yi=()=>(yt=On(),ig=pr(yt).join(),yf([pr(yt),ct[rl(yt)]],Date.now()));let k=yi(),ke=null,nr=!1,We=new Set,Ut=new Set,vi=!1,Be=!1,ia=!1,Vt=0,Se=null,qt=null,Kt=null,bt=[20,20],rr=new Set,oa=[0,0],sr=0,Yr=new Map,cr=[[],[]],zr=k;const Qd=new Map;let Ei=!1,Jd=0,Xd=-1,mc=0,oe=null,Vn=0;const rI=()=>oe?oe.decks:[pr(yt),ct[rl(yt)]],wi=n=>hf(rI()[(n+Vn)%2])==="Umbra"?1:0,Xc=n=>n===0?E_(yt):wi(n)?"Umbra":"Luminarae",gc=n=>{oe||Qt.react(n)};function ir(n,e=""){const t=document.createElement("div");t.className="vfx "+n,t.textContent=e,document.body.append(t),setTimeout(()=>t.remove(),1400)}function sn(n){document.querySelectorAll(".toast").forEach(t=>t.remove());const e=document.createElement("div");e.className="vfx toast",e.textContent=n,document.body.append(e),setTimeout(()=>e.remove(),1800)}const Qt=new B_;Qt.nameFn=()=>rl(yt);const Nt=document.createElement("aside");Nt.className="chat";Nt.innerHTML=`<div class="tabs"><button data-t="chat" class="on">Chat</button><button data-t="log">Registro</button></div>
  <div class="msgs" id="msgs"></div><div class="logv" id="logv" hidden></div>
  <div class="inp"><input id="chat-in" maxlength="140" placeholder="Escribe un mensaje…" autocomplete="off"><button id="chat-send">➤</button></div>`;document.body.append(Nt);const Po=Nt.querySelector("#msgs"),og=Nt.querySelector("#logv"),Yc=Nt.querySelector("#chat-in");Qt.onMessage(n=>{const e=document.createElement("div");if(e.className="msg "+n.side,n.side==="sys")e.textContent=n.text;else{const t=document.createElement("b");t.textContent=n.from+":",e.append(t,document.createTextNode(n.text))}Po.append(e),Po.scrollTop=Po.scrollHeight,n.side==="foe"&&de("msg")});const ag=()=>{const n=Yc.value.trim();n&&(Yc.value="",oe?oe.sendChat(n).catch(e=>Qt.sys((e==null?void 0:e.message)??"No se pudo enviar el mensaje")):Qt.send(n))};Nt.querySelector("#chat-send").addEventListener("click",ag);Yc.addEventListener("keydown",n=>{n.key==="Enter"&&ag(),n.stopPropagation()});Nt.querySelectorAll(".tabs button").forEach(n=>n.addEventListener("click",()=>{const e=n.dataset.t==="log";og.hidden=!e,Po.hidden=e,Nt.querySelector(".inp").hidden=e,Nt.querySelectorAll(".tabs button").forEach(t=>t.classList.toggle("on",t===n))}));Qt.sys("Chat local: escribe y el rival te responderá. Más adelante puede conectarse a Firebase.");function xo(n,e,t=-1){const r=re[n],s=e.map(a=>`<p><b>${sg[a]}:</b> ${Zb[a]}</p>`),i=us(n);if(r.type==="spell"){const a=Math.min(k.p[0].spell,r.cost);s.push(`<p>✦ ${nI[r.speed??"fast"]}</p><p>💎 Se paga primero con la reserva de hechizo: ${a} de reserva + ${r.cost-a} de maná.</p>`)}else s.push("<p>Puede atacar nada más jugarla. Solo el jugador con la ficha de ataque puede atacar.</p>");if(i&&s.push(`<p>🎯 Eliges tú el objetivo (${i==="enemy"?"unidad enemiga":"unidad aliada"}). Si desaparece antes de resolverse, el hechizo se disipa.</p>`),r.fx.some(a=>a.t==="sacDraw"||a.t==="sacDmg")&&s.push("<p>⚠ Sacrifica a tu unidad más débil.</p>"),t>=0&&!hs(k,0,t)){const a=k.p[0],c=r.type==="spell"?a.mana+a.spell:a.mana;s.push(`<p>⛔ ${r.cost>c?`Maná insuficiente: cuesta ${r.cost}, tienes ${c}.`:k.active!==0?"Ahora no tienes la prioridad.":r.type==="unit"?a.board.length>=6?"Tu tablero está lleno.":"Solo se juegan unidades con la pila vacía, en tu turno.":"Ahora no puedes jugarla (¿necesita objetivo o pila vacía?)."}</p>`)}return`<div class="rules">${s.join("")}</div>`}const sI=n=>{const e=n.slice(0,3);return`<div class="art"><span class="glyph">${re[n].type==="spell"?"✦":e==="lum"?"☀":"☾"}</span><img src="${ff(n)}" onerror="this.remove()"></div>`};function jt(n,e="",t="",r,s=""){const i=re[n],a=n.slice(0,3),c=r?r.kw:i.kw,l=r&&r.dmg>0?"dmg":"",h=(i.type==="spell"?[tI[i.speed??"fast"]]:[]).concat(c.map(f=>sg[f])).join(" · ");return`<div class="card ${i.type} ${a} ${t}" ${e}>${sI(n)}
    <div class="side"><i class="cost">${i.cost}</i>${c.map(f=>`<i class="ki">${eI[f]}</i>`).join("")}</div>
    <div class="panel"><div class="nm">${Oe(n)}</div><div class="orn"></div><p class="tx"><em>${h}</em>${i.text}</p></div>
    ${i.type==="unit"?`<b class="atk ${r&&r.ta?"tmp":""}">${r?fe(r):i.atk}<s>⚔</s></b><b class="hp ${l}">${r?Re(r):i.hp}<s>♥</s></b>`:""}${s}</div>`}function Yd(n,e,t){document.querySelectorAll(".spot").forEach(s=>s.remove());const r=document.createElement("div");r.className="vfx spot",r.innerHTML=`<div class="spot-l">Juegas</div>${jt(n,"","",t)}`,document.body.append(r),setTimeout(()=>r.remove(),1250)}function Zd(n,e,t){document.querySelectorAll(".reader").forEach(c=>c.remove());const r=re[n],s=r.type==="spell"?6500:3800,i=document.createElement("div");i.className="reader foe",Ei=!0,i.innerHTML=`<div class="rd-h">⚠ El rival juega</div>${jt(n,"","",t)}<div class="rd-t"><b>${fr(Oe(n))}</b> · coste ${r.cost}<p>${fr(r.text)}</p></div>${xo(n,t?t.kw:r.kw)}<button class="rd-ok" type="button">Entendido ✓</button><i class="rd-bar" style="animation-duration:${s}ms"></i>`,document.body.append(i);const a=()=>{i.isConnected&&(i.remove(),Ei=!1)};i.querySelector(".rd-ok").addEventListener("click",a),i.addEventListener("click",a),setTimeout(a,s)}function ef(n,e,t){const r=n.nexus<bt[e]?"hit":n.nexus>bt[e]?"heal":"",s=n.nexus-bt[e],i=Array.from({length:n.maxMana},(a,c)=>`<u class="${c<n.mana?"on":""}"></u>`).join("");return`<div class="pt ${e?"foe":"me"}"><div class="ava"><span>${wi(e)?"☾":"☀"}</span><img src="/TCG/img/avatar_${wi(e)?"umb":"lum"}.webp" onerror="this.remove()"></div>
    <div class="orb ${r}">${Math.max(0,n.nexus)}${s?`<span class="fx">${s>0?"+":""}${s}</span>`:""}</div>
    <div class="pname">${t}</div><div class="pmana">${i}<span class="sm">${[0,1,2].map(a=>`<i class="${a<n.spell?"on":""}"></i>`).join("")}</span></div></div>`}function cg(n,e){if(k.phase!=="main")return;if(oe){lr({type:"attack",units:n});return}const t=Vt;Be=!0,Kt={side:e,idx:n},de("attack"),ir("banner small",`⚔ ${e?"El rival ataca":"Atacas"} con ${n.length}`),we(),setTimeout(()=>{if(t!==Vt)return;Kt=null,Be=!1;const r=si(k,{type:"attack",units:n});if(r===k){sn("No puedes atacar ahora"),We.clear(),we();return}k=r,We.clear(),we(),wr()},900)}function lg(n,e){const t=n.token,r=1-t,s=n.p[r].nexus-e.p[r].nexus,i=_=>n.p[_].board.filter(I=>!e.p[_].board.some(R=>R.uid===I.uid)).map(I=>Oe(I.card)),a=i(0),c=i(1),l=n.attackers.length,h=[`${t?"El rival atacó":"Atacaste"} con ${l}`,s>0?`${t?"Tu Nexo":"Nexo rival"} −${s}`:"sin daño al Nexo"];a.length&&h.push("Tuyas caídas: "+a.join(", ")),c.length&&h.push("Rivales caídas: "+c.join(", "));const f="⚔ "+h.join(" · "),p=document.createElement("div");p.className="vfx report"+(t?"":" good"),p.textContent=f,document.body.append(p),setTimeout(()=>p.remove(),3600),Qt.sys(f)}const ug=(n,e)=>n!==e&&n.phase==="block"&&n.attackers.length>0&&e.attackers.length===0&&n.round===e.round;function hg(n,e,t){const r=Vt,s=n.token,i=1-s,a=n.attackers.filter($=>n.p[s].board.some(z=>z.uid===$)).map($=>({uid:$,bid:n.blocks[String($)]}));if(!a.length){t();return}const c=Math.max(0,n.p[i].nexus-e.p[i].nexus),l=a.map(({uid:$,bid:z})=>{const ae=n.p[s].board.find(y=>y.uid===$),B=z!==void 0?n.p[i].board.find(y=>y.uid===z):void 0;return B?ae.kw.includes("arrollar")?Math.max(0,fe(ae)-Re(B)-(B.kw.includes("duro")?1:0)):0:z===void 0||ae.kw.includes("arrollar")?fe(ae):0}),h=l.reduce(($,z)=>$+z,0),f=[];let p=0;l.forEach(($,z)=>{const ae=z===l.length-1?c-p:h?Math.round($/h*c):0;f.push(Math.max(0,ae)),p+=f[z]});const _=$=>{const z=structuredClone(n),ae=new Set;a.slice(0,$+1).forEach(({uid:B,bid:y})=>{ae.add(B),y!==void 0&&ae.add(y)});for(const B of[0,1])z.p[B].board=z.p[B].board.filter(y=>!ae.has(y.uid)||e.p[B].board.some(g=>g.uid===y.uid)),z.p[B].board.forEach(y=>{if(ae.has(y.uid)){const g=e.p[B].board.find(v=>v.uid===y.uid);g&&Object.assign(y,g)}});return z.p[i].nexus=n.p[i].nexus-f.slice(0,$+1).reduce((B,y)=>B+y,0),z.attackers=a.slice($+1).map(B=>B.uid),z.blocks={},z.attackers.forEach(B=>{const y=n.blocks[String(B)];y!==void 0&&z.p[i].board.some(g=>g.uid===y)&&(z.blocks[String(B)]=y)}),z.forced=z.forced.filter(B=>z.attackers.includes(B)),z},I=a.length>3?.7:1,R=480*I,V=340,x=760*I;nr=!0,We.clear(),Se=null,qt=null;const H=()=>{ke=null,nr=!1,lg(n,e),t()},q=$=>{if(r!==Vt){ke=null,nr=!1;return}if($>=a.length){H();return}const{uid:z,bid:ae}=a[$],B=ae!==void 0?n.p[i].board.find(g=>g.uid===ae):void 0,y=n.p[s].board.find(g=>g.uid===z);k=$?_($-1):n,ke={atk:z,blk:B?B.uid:null,strike:!1,def:i,cap:`⚔ Duelo ${$+1}/${a.length} · ${fr(Oe(y.card))} ${B?"contra "+fr(Oe(B.card)):"→ directo al Nexo"}`},we(),setTimeout(()=>{if(r!==Vt){ke=null,nr=!1;return}const g=document.querySelector(`[data-uid="${z}"]`),v=B?document.querySelector(`[data-uid="${B.uid}"]`):document.querySelector(`.pt.${i===0?"me":"foe"} .ava`),w=150,T=330,b=70,E=560,Ce=w+T,me=Ce+b+E,N=e.p[s].board.some(U=>U.uid===z),F=y.card.startsWith("umb")?"umb":"lum";if(g&&v){const U=g.getBoundingClientRect(),ee=v.getBoundingClientRect(),ye=ee.top+ee.height/2-(U.top+U.height/2),ut=Math.sign(ye)||1,pe=ee.left+ee.width/2-(U.left+U.width/2),ue=ye-ut*((U.height*1.08+ee.height)/2-(B?4:16)),kt=Math.hypot(pe,ue)||1,Xt=-pe/kt*Math.min(26,kt*.09),Es=-ue/kt*Math.min(26,kt*.09),Ye=g.cloneNode(!0);Ye.classList.remove("duel","duelatk","sel","can","enter","atkr"),Ye.removeAttribute("data-a"),Ye.removeAttribute("data-uid"),Ye.style.cssText=`position:fixed;left:${U.left}px;top:${U.top}px;width:${U.width}px;height:${U.height}px;--w:${U.width}px;margin:0;z-index:80;pointer-events:none;will-change:transform;box-shadow:0 0 0 2px #ffd36e,0 12px 30px #000a,0 0 30px #ffd36eaa`,document.body.append(Ye),ke.fly=!0;const Wn=dn=>dn/me,Fi="translate(0,0) scale(1)",Kn=`translate(${pe}px,${ue}px) scale(1.08)`,Qn=Ye.animate([{transform:Fi,offset:0,easing:"cubic-bezier(.3,0,.4,1)"},{transform:`translate(${Xt}px,${Es}px) scale(1.05)`,offset:Wn(w),easing:"cubic-bezier(.6,0,.25,1)"},{transform:Kn,offset:Wn(Ce),easing:"linear"},{transform:Kn,offset:Wn(Ce+b),easing:"cubic-bezier(.45,0,.2,1)"},{transform:Fi,offset:1}],{duration:me,fill:"forwards"});c_(Ye,w+T+40,F),Qn.onfinish=()=>{Ye.remove(),ke&&ke.atk===z&&(ke.fly=!1,we())},setTimeout(()=>{var dn;N||(Qn.cancel(),Ye.remove(),ke&&ke.atk===z&&(ke.fly=!1)),a_(ee.left+ee.width/2,ee.top+ee.height/2-ut*ee.height/2+ut*4,U.width,F),B&&((dn=document.querySelector(`[data-uid="${B.uid}"]`))==null||dn.animate([{transform:"scale(1.08)"},{transform:`translateY(${ut*16}px) rotate(${ut*3}deg) scale(1.02)`,filter:"brightness(2.2)",offset:.3},{transform:"scale(1.08)"}],{duration:340,easing:"ease-out"}))},Ce)}ke.strike=!0,de("attack"),we(),setTimeout(()=>{if(r!==Vt){ke=null,nr=!1;return}k=_($),ke.strike=!1,we(),setTimeout(()=>q($+1),x)},g&&v?Ce:V)},R)};q(0)}function dg(n){if(We.clear(),Se=null,qt=null,ug(k,n)){Be=!0,hg(k,n,()=>{Be=!1,k=n,we(),wr()});return}k=n,we(),wr()}function we(){k.round!==sr&&k.round>0&&k.phase!=="mulligan"&&(Jd=Date.now()+1400,setTimeout(()=>we(),1450)),Ct.style.display="none",Kg(k.phase==="block"||k.stack.length?1:0);const n=k.p[0],e=k.p[1],t=k.active===0&&k.winner===null&&!Be&&k.phase!=="mulligan",r=k.phase==="block"&&k.token===1&&k.active===0,s=new Set(Object.values(k.blocks)),i=new Set(k.attackers),a=k.attackers.length?k.token:0,c=[];k.attackers.length?k.attackers.forEach(N=>{const F=k.p[a].board.findIndex(ye=>ye.uid===N);if(F<0)return;const U=k.blocks[String(N)],ee=U===void 0?-1:k.p[1-a].board.findIndex(ye=>ye.uid===U);c.push({a:k.p[a].board[F],ai:F,b:ee>=0?k.p[1-a].board[ee]:void 0,bi:ee})}):k.phase==="main"&&We.size&&[...We].forEach(N=>{n.board[N]&&c.push({a:n.board[N],ai:N,bi:-1})});const l=(N,F)=>c.some(U=>(F===a?U.a:U.b)===N),h=(N,F,U)=>{const ee=U===0,ye=Yr.get(N.uid),ut=Re(N);let pe="",ue="";ye&&k.round===sr&&(ut<ye[1]?(ue="hurt",pe=String(ut-ye[1])):(ut>ye[1]||fe(N)>ye[0])&&(ue="boost",pe="+"+(ut>ye[1]?ut-ye[1]:fe(N)-ye[0]))),Qd.set(N.uid,jt(N.card,"","mini dying",N));const kt=Se&&(Se.kind==="enemy"&&!ee||Se.kind==="ally"&&ee),Xt=kt?"tgt":ee?"unit":r&&i.has(N.uid)?"enemy-unit":"view",Es=ee&&t&&k.phase==="main"&&k.tok[0]&&!k.attackers.length,Ye=`mini ${We.has(F)&&ee?"sel ":""}${Es?"can ":""}${rr.has(N.uid)?"":"enter "}${ue} ${kt?"tgtok ":""}${!ee&&qt===F?"blocktarget ":""}${ee&&s.has(N.uid)?"assignedblock ":""}${k.forced.includes(N.uid)||k.forced.some(Wn=>k.blocks[String(Wn)]===N.uid)?"forced ":""}${i.has(N.uid)?"atkr ":""}${Kt&&Kt.side===U&&Kt.idx.includes(F)?"attacking "+(U?"down":"up"):""}${ke&&N.uid===ke.atk?"duel duelatk "+(ke.fly?"fly ":""):ke&&N.uid===ke.blk?"duel duelblk ":""}`;return jt(N.card,`data-u="${U}:${F}" data-a="${Xt}" data-i="${F}" data-uid="${N.uid}"`,Ye,N,pe?`<span class="fx">${pe}</span>`:"")},f=(N,F)=>{const U=[],ee=[];N.board.forEach((pe,ue)=>{l(pe,F)||U.push(h(pe,ue,F))}),c.forEach(pe=>{const ue=F===a?pe.a:pe.b,kt=F===a?pe.ai:pe.bi;ee.push(ue?h(ue,kt,F):`<div class="slot cslot ${wi(F)?"umb":"lum"} ${r&&F===0?"ask":""}">${r&&F===0?"<span>Elige<br>defensor</span>":""}</div>`)});const ye=cr[F].filter(pe=>!N.board.some(ue=>ue.uid===pe)).map(pe=>Qd.get(pe)??""),ut=Array.from({length:Math.max(0,6-N.board.length)},(pe,ue)=>`<div class="slot ${wi(F)?"umb":"lum"}">${ye[ue]??""}</div>`).join("");return{back:U.join("")+ut,comb:ee.join("")}},p=f(e,1),_=f(n,0),I=k.phase==="mulligan"?"Mulligan":k.phase==="main"?"Prioridad":k.phase==="block"?"Bloqueos":"Pila",R=k.winner!==null?k.winner===-1?"Empate":k.winner===0?"¡Victoria!":"Derrota":Se?`Elige objetivo para ${Oe(n.hand[Se.hand])} · Esc cancela`:k.phase==="stack"?t?`Responde o pulsa OK · ${k.stack.length} en la pila`:`Pila · ${k.stack.length}`:k.phase==="block"?r?"Toca un atacante y luego tu bloqueador":k.active===0?"Rival bloqueó: puedes responder o resolver":"El rival asigna bloqueos…":t?k.passes===1?"El rival pasó: pasa también para cerrar la ronda":k.tok[0]?"Tu turno: juega cartas o selecciona unidades y ataca":"Tu turno: juega cartas o pasa":"El rival tiene la prioridad…",V=k.log.slice(-14).map(N=>N.replace(/\{(\w+)\}/g,(F,U)=>`<b>${Oe(U)}</b>`)).join("<br>"),x=k.attackers.length?`<div class="blocksummary"><b>⚔ Combate</b>${k.attackers.map(N=>{const F=k.p[k.token].board.find(ye=>ye.uid===N),U=k.blocks[String(N)],ee=U===void 0?void 0:k.p[1-k.token].board.find(ye=>ye.uid===U);return`<span>${F?Oe(F.card):"?"} <i>→</i> ${ee?Oe(ee.card):"<em>Sin bloquear</em>"}</span>`}).join("")}</div>`:"";let H="RIVAL",q="wait";t&&(k.phase==="main"?We.size?(H=`ATACAR ${We.size}`,q="atk"):(H=k.passes===1?"FIN DE RONDA":"PASAR",q="go"):k.phase==="block"?(H=r?Object.keys(k.blocks).length?"BLOQUEAR":"SIN BLOQUEO":"RESOLVER",q="go"):(H="OK",q="go"));const $=N=>{const F=N===void 0?void 0:[...k.p[0].board,...k.p[1].board].find(U=>U.uid===N);return F?Oe(F.card):""},z=k.stack.length?`<div class="stacktray"><b>✦ Pila · se resuelve de arriba abajo</b>${[...k.stack].map((N,F)=>({x:N,k:F})).reverse().map(({x:N,k:F},U)=>{const ee=re[N.card],ye=$(N.target);return`<div data-st="${F}" class="stackitem ${N.owner?"foe":"me"} ${U===0?"top":""}"><div class="si-h"><em>${N.owner?"Rival":"Tú"}</em><strong>${Oe(N.card)}</strong><i>${ee.cost}</i></div><p>${fr(ee.text)}</p>${ye?`<small>🎯 Objetivo: ${fr(ye)}</small>`:""}</div>`}).join("")}</div>`:"",ae=Date.now()<Jd&&k.phase!=="mulligan",B=k.phase==="block"||k.phase==="stack"&&k.resumePhase==="block",y=k.phase==="mulligan"?-1:ae?0:B?2:k.passes===1&&!k.attackers.length&&k.phase==="main"?3:1,g=[["ROBO","Robas 1 carta y ganas 1 de maná"],["INVOCACIÓN","Juega unidades y hechizos"],["COMBATE","Ataque y bloqueo · hechizos rápidos permitidos"],["FINAL","Si ambos pasáis, acaba la ronda y pasa el turno"]];_i.dataset.ph=String(y);const v=k.winner!==null||k.phase==="mulligan"?"":k.active===0?"mine":"theirs",w=`<div class="phasehud ${v}"><div class="who">${v==="mine"?"⚡ TU TURNO":v?"⏳ TURNO RIVAL":"PARTIDA"}</div><ol>${g.map((N,F)=>`<li class="${F===y?"on":F<y?"done":""}"><i>${F+1}</i><span>${N[0]}</span>${F===y?`<small>${N[1]}</small>`:""}</li>`).join("")}</ol>${k.stack.length?'<div class="hstack">✦ Pila activa</div>':""}</div>`,T=n.hand.length,b=n.hand.map((N,F)=>{const U=F-(T-1)/2;return`<div class="slotc" data-a="hand" data-i="${F}" style="--rot:${(U*3.2).toFixed(1)}deg;--y:${(U*U*2.6).toFixed(1)}px" aria-label="${fr(Oe(N))}, coste ${re[N].cost}">${jt(N,"",`${t&&hs(k,0,F)?"ok":"no"} ${(Se==null?void 0:Se.hand)===F?"sel":""}`)}</div>`}).join(""),E=k.phase==="mulligan"&&k.mull[0]?'<div class="mull"><h2>Mulligan</h2><p>Esperando al rival…</p></div>':k.phase==="mulligan"?`<div class="mull"><h2>Mulligan</h2><p>Toca las cartas que quieras reemplazar (0 a 4)</p><div class="mrow">${n.hand.map((N,F)=>jt(N,`data-a="mul" data-i="${F}"`,Ut.has(F)?"sel swap":"")).join("")}</div><button class="btn" data-a="mulgo">${Ut.size?`Reemplazar ${Ut.size}`:"Conservar mano"}</button></div>`:"";_i.innerHTML=`<header><div class="brand"><span class="brand-mark">✦</span><h1>Cartas <small>ALFA</small></h1></div><div class="header-state"><span class="rd">Ronda ${k.round}/40</span><span class="phase-chip">${I}</span><span class="tok">${k.tok[0]?"⚑ Tienes la ficha de ataque":k.tok[1]?"⚑ Ficha de ataque: rival":"⚑ Ficha gastada"}</span></div>
    <nav class="toolbar"><button class="ghost" data-a="chat">${vi?"✕ Cerrar":"☰ Chat / registro"}</button><button class="ghost icon-btn" data-a="mute">${Gg()?"🔇":"🔊"}</button><button class="ghost" data-a="menu">⌂ Menú</button><button class="ghost" data-a="online">🌐 Online</button><button class="ghost" data-a="new">↻ Nueva partida</button></nav></header><main class="stage ${Se?"targeting":""}${nr?" dueling":""}" data-dnex="${ke&&ke.blk===null?ke.def:""}">${ke?`<div class="duelcap">${ke.cap}</div>`:""}
      <div class="foehand">${Array.from({length:e.hand.length},()=>"<i></i>").join("")}</div>
      <div class="plane-wrap"><div class="plane"><div class="lane foeback">${p.back}</div><div class="lane foecomb">${p.comb}</div><div class="lane mycomb">${_.comb}</div><div class="lane myback">${_.back}</div></div></div>
      
      <div class="msgbar"><span class="pill ${t?"go":""}">${R}</span></div>
      <aside class="sideL">${w}${z}${x}<div class="pgroup me"><div class="pile p0" data-l="MAZO" title="Tu mazo"><b>${n.deck.length}</b></div>${ef(n,0,`${Xc(0)} · Tú`)}</div></aside>
      <aside class="sideR"><div class="pgroup foe">${ef(e,1,`${Xc(1)} · Rival`)}<div class="pile p1" data-l="MAZO" title="Mazo rival"><b>${e.deck.length}</b></div></div>
      <div class="manapanel"><div class="mrow2"><b>MANÁ</b><span>${n.mana}/${n.maxMana}</span></div><div class="gems">${Array.from({length:Math.max(n.maxMana,1)},(N,F)=>`<u class="${F<n.mana?"on":""}"></u>`).join("")}</div>
        <div class="mrow2" title="Reserva exclusiva para hechizos: se gasta ANTES que el maná normal y se rellena con el maná que te sobra al acabar la ronda (máximo 3)."><b>RESERVA ✦</b><span>${n.spell}/3</span></div><div class="gems sp">${[0,1,2].map(N=>`<u class="${N<n.spell?"on":""}"></u>`).join("")}</div><p class="mnote">Reserva: solo hechizos, se gasta primero. Se llena con el maná que sobra al cerrar la ronda (máx. 3).</p></div>
      <button class="endbtn ${q}" data-a="${q==="atk"?"attack":"go"}" ${q==="wait"?"disabled":""}><span>${H}</span></button></aside>
      <div class="fan">${b}</div></main>`+E+(k.winner!==null?`<div class="over"><h2>${R}</h2><button class="btn" data-a="new">Jugar de nuevo</button></div>`:"");const Ce=k.p.some(N=>N.board.some(F=>!rr.has(F.uid))),me=cr.some(N=>N.some(F=>!k.p.some(U=>U.board.some(ee=>ee.uid===F))));Ce&&k.p.flatMap(N=>N.board.filter(F=>!rr.has(F.uid)).map(F=>F.card)).forEach((N,F)=>setTimeout(()=>Yg(N),F*170)),me&&de("death"),k.p.forEach((N,F)=>N.board.filter(U=>!rr.has(U.uid)).forEach(U=>{U_(U.card)?(document.querySelectorAll(".spot,.reader").forEach(ee=>ee.remove()),Ei=!0,de("round"),j_(U.card,jt(U.card,"","",U),()=>{Ei=!1})):F?Zd(U.card,1,U):Yd(U.card,0,U)})),n.nexus<bt[0]?ir("vhit"):n.nexus>bt[0]&&ir("vheal"),(n.nexus<bt[0]||e.nexus<bt[1])&&de("hurt"),(n.nexus>bt[0]||e.nexus>bt[1])&&de("heal"),k.p.forEach((N,F)=>{const U=N.played[N.played.length-1];N.played.length>oa[F]&&U&&re[U].type==="spell"&&(ir("cast "+U.slice(0,3)),de("spell_"+U.slice(0,3)),F?Zd(U):Yd(U),F===1&&gc("cast"))}),k.round!==sr&&k.round>0&&(ir("banner",`Ronda ${k.round}`),de("round"),n.spell>mc&&setTimeout(()=>sn(`✦ +${n.spell-mc} reserva de hechizo (maná sobrante)`),1500)),k.active===0&&Xd!==0&&!Be&&k.winner===null&&k.phase!=="mulligan"&&k.round===sr&&(ir("banner small turn",r?"🛡 Tu turno · bloquea":"⚡ Tu turno"),de("round")),Xd=k.phase==="mulligan"?-1:k.active,mc=n.spell,!nr&&zr.attackers.length&&!k.attackers.length&&zr.round===k.round&&lg(zr,k),bt=[n.nexus,e.nexus],oa=k.p.map(N=>N.played.length),sr=k.round,zr=k,Yr=new Map,cr=[[],[]],k.p.forEach((N,F)=>N.board.forEach(U=>{rr.add(U.uid),Yr.set(U.uid,[fe(U),Re(U)]),cr[F].push(U.uid)})),k.winner!==null&&!ia&&(ia=!0,k.winner!==-1&&(oe?Xb(oe.code,k.winner===0):Yb(k.winner===0)).catch(()=>{}),oe&&xn.clearSaved(),de(k.winner===0?"win":"lose"),k.winner===0?gc("win"):k.winner===1&&gc("lose")),og.innerHTML=V,Nt.hidden=!vi}function lr(n){if(oe){if(Be||oe.busy)return;if(!oe.isReady){sn("Esperando al rival… Para jugar contra la IA, sal de la sala desde 🌐 Online");return}if(si(k,Wb(n))===k){sn(n.type==="block"?"Ese bloqueo no es válido (Elusivo/Temible/ya asignado)":n.type==="play"?"No puedes jugar eso ahora":"Acción no válida");return}(n.type==="pass"||n.type==="confirmBlocks")&&de("pass"),Be=!0,We.clear(),Se=null,qt=null,we(),oe.send(n).then(r=>{r||(Be=!1,we())});return}const e=si(k,n);if(e===k){sn(n.type==="block"?"Ese bloqueo no es válido (Elusivo/Temible/ya asignado)":n.type==="play"?"No puedes jugar eso ahora":"Acción no válida");return}(n.type==="pass"||n.type==="confirmBlocks")&&de("pass"),dg(e)}function wr(){if(oe||k.winner!==null||k.active!==1||k.phase==="mulligan")return;const n=Vt,e=()=>{if(n!==Vt||Be||k.winner!==null||k.active!==1)return;if(Ei){setTimeout(e,300);return}const t=L_(k);if(t.type==="attack"){cg(t.units,1);return}dg(si(k,t))};setTimeout(e,1200)}function Zc(){k.active===0&&k.winner===null&&!Be&&(de("click"),k.phase==="main"&&We.size?cg([...We],0):k.phase==="block"&&k.token===1?lr({type:"confirmBlocks"}):lr({type:"pass"}))}_i.addEventListener("click",n=>{const e=n.target.closest("[data-a]");if(Se&&(e==null?void 0:e.dataset.a)!=="tgt"&&(Se=null,we(),!e||e.dataset.a==="hand")||!e)return;const t=e.dataset.a,r=Number(e.dataset.i),s=k.active===0&&k.winner===null&&!Be&&k.phase!=="mulligan";if(t==="chat")vi=!vi,de("click"),we();else if(t==="mute")Wg(),de("click"),we();else if(t==="new"&&oe)sn("Para otra partida online crea o únete a una sala nueva"),Jc(el());else if(t==="menu")de("click"),pf();else if(t==="online")de("click"),Jc(el());else if(t==="new")de("click"),Vt++,Be=!1,Kt=null,qt=null,Se=null,k=yi(),We.clear(),Ut.clear(),bt=[20,20],rr.clear(),oa=[0,0],sr=0,Yr.clear(),cr=[[],[]],ia=!1,zr=k,we();else if(t==="mul")de("select"),Ut.has(r)?Ut.delete(r):Ut.add(r),we();else if(t==="mulgo"){de("click");const i=[...Ut];Ut.clear(),lr({type:"mulligan",idx:i})}else if(s)if(t==="tgt"){if(Se){const i=Number(e.dataset.uid),a=Se.hand;lr({type:"play",hand:a,target:i})}}else if(t==="hand"){if(!hs(k,0,r)){sn("No puedes jugar esa carta ahora");return}const i=us(k.p[0].hand[r]);de("select"),i?(Se={hand:r,kind:i},we()):lr({type:"play",hand:r})}else t==="go"||t==="attack"?Zc():t==="enemy-unit"&&k.phase==="block"?(qt=r,de("select"),we()):t==="unit"&&k.phase==="block"&&k.token===1?qt===null?sn("Primero toca al atacante rival"):lr({type:"block",attacker:qt,blocker:r}):t==="unit"&&k.phase==="main"&&k.tok[0]&&!k.attackers.length&&(We.has(r)?We.delete(r):We.add(r),de("select"),we());else return});document.addEventListener("keydown",n=>{n.target.tagName!=="INPUT"&&(n.key==="Escape"&&Se?(Se=null,we()):n.key===" "&&k.phase!=="mulligan"&&(n.preventDefault(),Zc()))});document.addEventListener("contextmenu",n=>{Se&&(n.preventDefault(),Se=null,we())});const fg=()=>document.querySelectorAll(".manapanel u.pay").forEach(n=>n.classList.remove("pay"));function iI(n){fg();const e=re[n],t=k.p[0],r=e.type==="spell"?Math.min(t.spell,e.cost):0,s=e.cost-r,i=document.querySelectorAll(".manapanel .gems"),a=(c,l,h)=>{var p;if(!c)return;const f=c.querySelectorAll("u");for(let _=l-1;_>=Math.max(0,l-h);_--)(p=f[_])==null||p.classList.add("pay")};a(i[0],t.mana,s),a(i[1],t.spell,r)}_i.addEventListener("mouseover",n=>{var r,s;const e=n.target.closest("[data-st]");if(e){const i=(r=k.stack[Number(e.dataset.st)])==null?void 0:r.card;i&&(Ct.innerHTML=jt(i)+xo(i,re[i].kw),Ct.style.display="block");return}const t=n.target.closest('[data-u],[data-a="hand"]');if((!t||!t.dataset.i||t.dataset.a!=="hand")&&fg(),(t==null?void 0:t.dataset.a)==="hand"){const i=k.p[0].hand[Number(t.dataset.i)];i&&iI(i)}if(!t){Ct.style.display="none";return}if(t.dataset.u){const[i,a]=t.dataset.u.split(":").map(Number),c=(s=k.p[i])==null?void 0:s.board[a];c&&(Ct.innerHTML=jt(c.card,"","",c)+xo(c.card,c.kw),Ct.style.display="block")}else{const i=Number(t.dataset.i),a=k.p[0].hand[i];a&&(Ct.innerHTML=jt(a)+xo(a,re[a].kw,i),Ct.style.display="block")}});_i.addEventListener("mouseleave",()=>{Ct.style.display="none"});const Dn=[];let cs=!1;function Ti(n){Vt++,Be=!1,Kt=null,qt=null,Se=null,k=n,We.clear(),Ut.clear(),ia=n.winner!==null,bt=[n.p[0].nexus,n.p[1].nexus],oa=n.p.map(e=>e.played.length),sr=n.round,zr=n,rr=new Set(n.p.flatMap(e=>e.board.map(t=>t.uid))),Yr=new Map,cr=[[],[]],n.p.forEach((e,t)=>e.board.forEach(r=>{Yr.set(r.uid,[fe(r),Re(r)]),cr[t].push(r.uid)})),we()}function pg(){const n=Dn.shift();if(!n){cs=!1;return}cs=!0;const e=Qc(ng(n.before,n.seat,n.action),Vn),t=()=>{Kt=null,Be=!1,k=e,We.clear(),Se=null,qt=null,we(),setTimeout(pg,0)},r=()=>{ug(k,e)&&Dn.length===0?(Be=!0,Kt=null,hg(k,e,t)):t()};if(n.action.type==="attack"&&Dn.length===0){const s=n.seat===Vn?0:1;Be=!0,Kt={side:s,idx:n.action.units},de("attack"),ir("banner small",`⚔ ${s?"El rival ataca":"Atacas"} con ${n.action.units.length}`),we(),setTimeout(r,900)}else r()}function el(){return{inRoom:!!oe,create:async()=>{tl();try{yt=On();const n=await oe.create(fh(yt));gi(`Sala ${n} · esperando rival…`),sa(`Código de sala: ${n} — pásaselo a tu rival`)}catch(n){throw oe=null,n}},join:async n=>{tl();try{yt=On(),await oe.join(n,fh(yt))}catch(e){throw oe=null,e}},leave:()=>{oe==null||oe.close(),oe=null,Vn=0,Dn.length=0,cs=!1,gi(""),Ti(yi()),wr()}}}function tl(){oe||(oe=new xn({onStatus:n=>{gi(n),sa(n)},onChat:n=>{Qt.push({from:n.mine?"Tú":"Rival",text:n.text,side:n.mine?"me":"foe"}),!n.mine&&!vi&&sn("💬 Rival: "+n.text.slice(0,60))},onReady:()=>{Vn=oe.seat,ti(),mf(),Qt.sys("Chat online activo: puedes escribir a tu rival."),Ti(Qc(oe.g,Vn)),Qt.sys(`Sala ${oe.code}: juegas con ${Xc(0)}.`)},onMoves:(n,e,t)=>{t?(Dn.length=0,Ti(Qc(n,Vn))):(Dn.push(...e),cs||pg())},onSettled:()=>{!cs&&!Dn.length&&Be&&(Be=!1,we())}}))}Co().catch(()=>{});const tf=xn.savedCode();tf&&(tl(),oe.resume(tf).catch(()=>{oe=null,xn.clearSaved(),gi("")}));document.addEventListener("menu:ia",()=>{!oe&&(yt!==On()||ig!==pr(On()).join())?(Vt++,Ti(yi()),wr()):oe&&(oe.close(),oe=null,Vn=0,Dn.length=0,cs=!1,gi(""),ti(),Ti(yi()),wr())});document.addEventListener("menu:online",()=>Jc(el()));we();wr();C_();
