const email='emiliozarinangomez@gmail.com';
document.querySelector('#year').textContent=new Date().getFullYear();
const printButton=document.querySelector('#print-cv');printButton.hidden=false;printButton.addEventListener('click',()=>window.print());
const copyButton=document.querySelector('#copy-email');
if(navigator.clipboard&&window.isSecureContext){copyButton.hidden=false;copyButton.addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(email);status.textContent='Correo copiado. ¡Gracias por conectar!';}catch{status.textContent='No fue posible copiarlo. Puedes seleccionar el correo o abrirlo para escribir un mensaje.';}});}
