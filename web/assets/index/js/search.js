/*
* @Author: ZHAO
* @Date:   2018-08-17 16:17:13
* @Last Modified by:   ZHAO
* @Last Modified time: 2018-08-17 16:17:49
*/
window.onload=function(){
    let w =document.querySelector('.backdrop');
    let a =document.querySelector('.action-navigation');
    let tool =document.querySelector('.tool');
    tool.addEventListener('click', function(){
        w.style.display='block';
        a.classList.add('active');
    });
    w.addEventListener('click', function(){
        w.style.display='none';
        document.querySelector('.active').classList.remove('active');
    });
    a.addEventListener('click', function(){
        document.querySelector('.active').classList.remove('active');
        w.style.display='none';
    });
}