const email='emiliozarinangomez@gmail.com';
document.querySelector('#year').textContent=new Date().getFullYear();
const printButton=document.querySelector('#print-cv');printButton.hidden=false;printButton.addEventListener('click',()=>window.print());
const copyButton=document.querySelector('#copy-email');
if(navigator.clipboard&&window.isSecureContext){copyButton.hidden=false;copyButton.addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(email);status.textContent='Correo copiado. ¡Gracias por conectar!';}catch{status.textContent='No fue posible copiarlo. Puedes seleccionar el correo o abrirlo para escribir un mensaje.';}});}

// Explorar proyectos sin perder la posición de lectura.
const projectCards=[...document.querySelectorAll('.project-card')];
const filterButtons=[...document.querySelectorAll('[data-filter]')];
const toolbar=document.querySelector('.project-toolbar');
const expandButton=document.querySelector('#expand-projects');
const visibleProjectDetails=()=>projectCards.filter(card=>!card.hidden).flatMap(card=>[...card.querySelectorAll('details')]);
function syncExpandButton(){const details=visibleProjectDetails();expandButton.disabled=details.length===0;expandButton.textContent=details.length&&details.every(item=>item.open)?'Cerrar detalles':'Abrir detalles';}
function filterProjects(category){
 filterButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
 projectCards.forEach(card=>{card.hidden=category!=='all'&&!card.dataset.categories.split(' ').includes(category);});
 const count=projectCards.filter(card=>!card.hidden).length;
 document.querySelector('#project-count').textContent=`${count} ${count===1?'proyecto':'proyectos'}${category==='all'?' en total':' en esta categoría'}`;
 syncExpandButton();
}
if(toolbar){toolbar.hidden=false;filterButtons.forEach(button=>button.addEventListener('click',()=>filterProjects(button.dataset.filter)));
expandButton.addEventListener('click',()=>{const details=visibleProjectDetails(),open=!details.every(item=>item.open);details.forEach(item=>item.open=open);syncExpandButton();});
projectCards.forEach(card=>card.querySelectorAll('details').forEach(item=>item.addEventListener('toggle',syncExpandButton)));
document.querySelectorAll('[data-project-jump]').forEach(link=>link.addEventListener('click',()=>filterProjects(link.dataset.projectJump)));filterProjects('all');}

const workflow=[
 {title:'Entender antes de desarrollar.',description:'Identificar a los usuarios, el proceso actual y la información necesaria para definir una solución útil.',from:'Necesidad',to:'Requerimientos',tools:['Análisis de negocio','Requerimientos']},
 {title:'Convertir el proceso en una aplicación.',description:'Estructurar la captura de información, diseñar pantallas y desarrollar funciones para las tareas de cada usuario.',from:'Proceso',to:'Aplicación',tools:['Power Apps','Desarrollo web','Apoyo de IA']},
 {title:'Hacer que la información fluya.',description:'Conectar aplicaciones, listas y correos para automatizar tareas y dar visibilidad mediante reportes.',from:'Aplicación',to:'Flujos y datos',tools:['Power Automate','SharePoint','Power BI']},
 {title:'Validar, escuchar y mejorar.',description:'Comprobar el funcionamiento, revisar la experiencia de los usuarios y mantener las conexiones para dar continuidad a las soluciones.',from:'Resultados',to:'Mejora continua',tools:['Validación','Encuestas','Solutions']}
];
const workflowButtons=[...document.querySelectorAll('[data-workflow]')];
document.querySelector('.workflow-options').hidden=false;
workflowButtons.forEach(button=>button.addEventListener('click',()=>{
 const index=Number(button.dataset.workflow),step=workflow[index],display=document.querySelector('.workflow-display');
 workflowButtons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 display.querySelector('h3').textContent=step.title;display.querySelector('p').textContent=step.description;
 const nodes=display.querySelectorAll('.flow-map span');nodes[0].textContent=step.from;nodes[1].textContent=step.to;
 display.querySelector('.workflow-tools').replaceChildren(...step.tools.map(tool=>{const span=document.createElement('span');span.textContent=tool;return span;}));
}));

// Navegación contextual y progreso sin animaciones que interrumpan la lectura.
const navLinks=[...document.querySelectorAll('nav a[href^="#"]')];
const sectionIds=['inicio',...navLinks.map(link=>link.hash.slice(1))];
const progress=document.querySelector('.reading-progress span');
let scrollScheduled=false;
function updateReading(){const offset=Math.min(180,window.innerHeight*.3);let current='inicio';for(const id of sectionIds){const section=document.getElementById(id);if(section&&section.getBoundingClientRect().top<=offset)current=id;}
navLinks.forEach(link=>{if(link.hash===`#${current}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${max>0?Math.min(100,Math.max(0,window.scrollY/max*100)):0}%`;scrollScheduled=false;}
window.addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;window.requestAnimationFrame(updateReading);}},{passive:true});window.addEventListener('resize',updateReading);updateReading();

// Los filtros no ocultan contenido en el PDF.
window.addEventListener('beforeprint',()=>{document.querySelectorAll('.project-card[hidden]').forEach(card=>card.dataset.printHidden='true');projectCards.forEach(card=>card.hidden=false);});
window.addEventListener('afterprint',()=>{document.querySelectorAll('[data-print-hidden]').forEach(card=>{card.hidden=true;delete card.dataset.printHidden;});});
