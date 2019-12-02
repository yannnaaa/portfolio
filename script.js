let items = document.querySelectorAll('.slider__item-cont__item');
let currentItem = 0;
let isEnabled = true;
let itemsSlider = document.querySelectorAll('.slider-svg-button');

document.getElementById('exp-panel-button').addEventListener('click', function() {  

  let elem = document.querySelector('.block-exp-panel__body');

  if (elem.style.display === 'none' || elem.style.display === '' )  {
    elem.style.display = 'block';
  } else {
    elem.style.display = 'none';
  }
});

function showItemSliderDescription (el) {

	for (let i = 0; i < el.length; i++) {
	
		el[i].addEventListener('touchstart', function() {
		  let elements = document.querySelectorAll('.descr__proj-name__list')  
	 
		  elements[i].style.display = "inline-block";	 
		  this.style.display = "none";
	  
		});
	};	
}

showItemSliderDescription(itemsSlider);

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

document.querySelector('.slider__control.left').addEventListener('click', function() {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector('.slider__control.right').addEventListener('click', function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

const swipedetect = () => {
    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let elapsedTime = 0;
   

    let threshold = 150;
    let restraint = 100;
    let allowedTime = 300;
    
    surface.addEventListener('mousedown', function (e) {
        
        startX = e.pageX;
        startY = e.pageY;
        startTime =  new Date().getTime();
        e.preventDefault();
    });

    surface.addEventListener('mouseup', function (e) {
        distX = e.pageX - startX;
        distY =  e.pageY - startY;
        elapsedTime =  new Date().getTime() - startTime;

        if ( elapsedTime <= allowedTime ) {
            if ( Math.abs(distX) >= threshold  && Math.abs(distY) <= restraint ) {
                if ( distX > 0 ) {
                    if (isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
        }

        e.preventDefault();
    });

    surface.addEventListener('touchstart', function (e) {
        if (e.target.classList.contains('slider__control__arrow')
            || e.target.classList.contains('slider__control')) {

            if (e.target.classList.contains('left')) {
                if (isEnabled) {
                        previousItem(currentItem);
                    }
                } else  if (e.target.classList.contains('right')) {
                    if (isEnabled) {
                        nextItem(currentItem);
                    }
            }
}

        let touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime =  new Date().getTime();
        e.preventDefault();
    });

    surface.addEventListener('touchmove', function (e) {
        e.preventDefault();
    });

    surface.addEventListener('touchend', function (e) {
        let touchObj = e.changedTouches[0];
        distX = touchObj.pageX - startX;
        distY = touchObj.pageY - startY;
        elapsedTime =  new Date().getTime() - startTime;

        if ( elapsedTime <= allowedTime ) {
            if ( Math.abs(distX) >= threshold  && Math.abs(distY) <= restraint ) {
                if ( distX > 0 ) {
                    if (isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
        }

        e.preventDefault();
    });
}

let el = document.querySelector('.slider');
swipedetect(el);