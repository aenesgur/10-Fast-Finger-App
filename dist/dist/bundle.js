!function(e){var t={};function n(l){if(t[l])return t[l].exports;var s=t[l]={i:l,l:!1,exports:{}};return e[l].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(l,s,function(t){return e[t]}.bind(null,s));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){let n,l,s=1,r=0,a=-1,i="",c=0;const o=document.getElementById("challengeInputField"),d=document.getElementById("inputText"),u=document.getElementById("nextButton"),f=document.querySelectorAll("#mainPart"),m=document.getElementById("gameInfo"),v=document.getElementById("againButton"),g=document.getElementById("resultField"),L=document.getElementById("challengeDataField"),p=document.getElementById("timeField"),y=(document.getElementById("levelButtons"),document.getElementById("levelInfo")),I=document.getElementById("dropdownControl"),h=document.getElementById("dropdownList"),b=document.getElementById("startButton");function E(){p.innerHTML='<i class="far fa-clock"></i>  '+s+"sec",s++}function B(e,t){let n,l=Math.ceil(e/(t-1));n=l>=7?"grin-stars":l>=5?"smile":l>=1?"flushed":"sad-cry",i=`<div class="alert alert-warning" role="alert">\n                            <p class="result"> <b>Number of true(s):</b> ${e} </p>\n                            <p class="result"> <b>Time:</b> ${t-1} sec </p>\n                            <p class="result"> <b>Score:</b> ${l}(represent) </p>\n                            <p class="result"> <i class="far fa-${n} fa-2x"></i>  </p>\n                        </div>`,g.innerHTML=i}function S(e,t){if(e==t){L.childNodes[r].classList.add("true"),new Audio("sounds/true.mp3").play(),function(){if(null==localStorage.getItem("trues")){(e=[]).push("true"),localStorage.setItem("trues",JSON.stringify(e))}else{var e;(e=JSON.parse(localStorage.getItem("trues"))).push("true"),localStorage.setItem("trues",JSON.stringify(e))}}()}else{L.childNodes[r].classList.add("false"),new Audio("sounds/false.mp3").play()}}function M(e,t){let n=e[t].Ex,l="";for(let e=0;e<n.length;e++)l+=`<div class="valuesCard text-center">${n[e]}</div>`;L.innerHTML=l,c=e.length-1,function(e){let t="";t=`Level ${e+1}`,y.innerHTML=t,r=0,d.value="",localStorage.removeItem("trues")}(t)}function T(e){let t="";for(let n=0;n<e.length;n++)t+=`<button id="${n+1}" class="levelBtn levelBtnControl">Level ${n+1}</button>`;h.innerHTML=t,function(){for(let e=0;e<h.children.length;e++)h.children[e].addEventListener("click",(function(){let e=this.id;a=e-1,M(l,a),clearInterval(n),s=1,n=setInterval(E,1e3)}))}()}document.addEventListener("DOMContentLoaded",(function(){localStorage.removeItem("trues"),fetch("json/data.json").then(e=>e.json()).then(e=>{l=e.Exercises})})),b.addEventListener("click",(function(){for(let e=0;e<f.length;e++)f[e].classList.add("setAttr");T(l),o.classList.add("active"),I.classList.add("active"),m.classList.add("disabled"),v.classList.remove("active"),g.innerHTML="",a++,M(l,a),n=setInterval(E,1e3)})),u.addEventListener("click",(function(){for(let e=0;e<f.length;e++)f[e].classList.add("setAttr");T(l),o.classList.add("active"),u.classList.remove("active"),I.classList.add("active"),m.classList.add("disabled"),v.classList.remove("active"),g.innerHTML="",a++,M(l,a),n=setInterval(E,1e3)})),v.addEventListener("click",(function(){o.classList.add("active"),v.classList.remove("active"),u.classList.remove("active"),I.classList.add("active"),g.innerHTML="",M(l,a),n=setInterval(E,1e3)})),d.addEventListener("input",(function(e){let t=e.data,l=L.childNodes[r].innerHTML;window.onkeydown=function(e){8==e.which&&e.preventDefault()},null!=L.childNodes[r+1]?(L.childNodes[r+1].classList.add("current"),S(t,l),L.childNodes[r].classList.remove("current"),r++):(S(t,l),L.childNodes[r].classList.remove("current"),function(){clearInterval(n),I.classList.remove("active"),o.classList.remove("active"),a!=c&&u.classList.add("active");v.classList.add("active"),d.value="";let e=JSON.parse(localStorage.getItem("trues"));null!=e?(localStorage.removeItem("trues"),B(e.length,s)):B(0,s);s=1}(),r=0)}))}]);