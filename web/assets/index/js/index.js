window.onload=function(){
	let con =document.querySelector('.con-i');
	let win =document.querySelector('.window');
	let popup = document.querySelector('.popup');
	let close = document.querySelector('.close');
	con.addEventListener('click',function(){
		win.style.display='block';
		popup.style.display='block';
	});
	close.addEventListener('click',function(){
		win.style.display='none';
		popup.style.display='none';
	})
}
