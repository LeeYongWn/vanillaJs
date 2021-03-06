// cloesest Polyfile

if (!Element.prototype.matches) {
    Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;

        do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}


function tabSelect(){
	var tabListAll = document.querySelectorAll(".js-tab .tab-nav__item");
    
    Array.prototype.forEach.call(tabListAll, function(Tablist){
        Tablist.querySelector('.tab-nav__link').addEventListener('click',function(e){
            e.preventDefault();

            // tabPanel show & hide
            var tabInner = this.closest('.tab-nav__inner');
            var tabItem  = this.closest('.tab-nav__item');
            var tabNum   = this.parentElement.getAttribute('data-tabnum');
            var tabPanel = tabInner.nextElementSibling.querySelectorAll('.tab-content .tab-pane');

            Array.prototype.forEach.call(tabPanel, function(cont){
                cont.style.display = 'none'
                tabPanel[tabNum].style.display = 'block'
            })

            // tab-nav active 
            var childLength = tabInner.childElementCount;

            for (var i = 0; i < childLength; i++) {           
                tabInner.children[i].className = 'tab-nav__item';
            }
            
            tabItem.className += ' active';        
        });
    })
};

function SelectBox(){
    var selectBoxAll = document.querySelectorAll('.selectBox select');
    
    Array.prototype.forEach.call(selectBoxAll, function(selectList){
        window.addEventListener('load',function(){            
            var FirstText = selectList.options[0].text;

            selectList.parentElement.querySelector('.selectBox__txt').innerText = FirstText   
        });

        selectList.addEventListener('change',function(){
            var selectText = selectList.options[selectList.selectedIndex].text;

            this.parentElement.querySelector('.selectBox__txt').innerText = selectText;  
        });

        selectList.addEventListener('focus',function(){
            this.parentElement.className += ' active';
        });

        selectList.addEventListener('blur',function(){
            this.parentElement.className = 'selectBox';
        });

    });
};


function accordion(){
    var acoTitAll = document.querySelectorAll('.js-accordion .accordion__row-question');

    Array.prototype.forEach.call(acoTitAll, function(acoList){        
        acoList.querySelector('.accordion__question-link').addEventListener('click',function(e){     
            e.preventDefault();

            var acoRow = this.parentElement;

            if(acoRow.className.indexOf('accordion_row-active') === -1) {
               acoRow.className += ' accordion_row-active';		
            }else{
               acoRow.className = 'accordion__row accordion__row-question';	
            }            
        });             
    });
}


function modal(){
    var body = document.querySelector('body'); // body 
    var modalBody = document.querySelector('.modal'); // modal 
    var modalOpenBtn = document.querySelectorAll('.js-modal-open'); // modal Open Btn
    var modalCloseBtn = document.querySelectorAll('.js-modal-close'); // modal Close Btn 
    var modalBg = document.querySelector('.modal__bg'); // modal Background 
    var modalInner = document.querySelectorAll('.modal__inner'); // modal Inner 
   
    // modal open  
    Array.prototype.forEach.call(modalOpenBtn, function(open){                
        open.addEventListener('click',function(e){
            e.preventDefault();

            var target = this.getAttribute('data-name'); // modal Name
            var modalTarget = document.querySelector("[data-modal=" + target + "]") // open target modal
            var modalContent = modalTarget.querySelector('.modal__content'); // modal Content 
            var modalMargin = parseInt(getComputedStyle(modalContent).marginTop) + parseInt(getComputedStyle(modalContent).marginBottom) ; // modal margin cal 
 
            body.className ='is-modal'; 
            body.style.paddingRight = scrollBlank() + 'px';
            modalTarget.style.display = 'block';          
            modalBody.style.display = 'block';              
                            
            modalScroll(modalTarget,modalMargin);

            window.addEventListener('resize',function(){
                modalScroll(modalTarget,modalMargin);
            });                                 
        });
    });

    // modalBtn Click Modal close Event
    Array.prototype.forEach.call(modalCloseBtn, function(close){
        close.addEventListener('click',function(e){
            e.preventDefault();

            var ThisModal = this.closest('.modal__inner');

            body.className = '';
            body.style.paddingRight = '';
            modalBody.style.display = 'none';                     
            ThisModal.style.display = 'none';   
            modalBg.style.right = '';  
        });
    });

    // modalBg Click Modal close Event
    modalBg.addEventListener('click',function(e){
        e.preventDefault();

        body.className = '';
        body.style.paddingRight = '';
        modalBody.style.display = 'none';   
        modalBg.style.right = '';  
        
        for(i = 0; i < modalInner.length; i++){

            modalInner[i].style.display = 'none';

        }        
    });

    // modal scroll
    function modalScroll(modal,margin){
        if(document.body.className.indexOf("is-modal") != -1){
            if(modal.clientHeight > window.innerHeight + margin){
                modalBody.className = 'modal is-scroll-y'
                modalBg.style.right = scrollBlank() + 'px';    
            }else{
                modalBody.classList = 'modal'
                modalBg.style.right = '';    
            }      
        }
    }

    // right scroll control;    
    function scrollBlank(){        
        var scrollDiv = document.createElement('div');
        
        scrollDiv.className = 'fake_scroll';
        body.appendChild(scrollDiv);
    
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

        body.removeChild(scrollDiv);
        return scrollbarWidth;
    }
}

function init(){
	
	tabSelect();
	SelectBox();
    accordion();    
    modal();

}


init();