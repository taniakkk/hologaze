document.addEventListener('DOMContentLoaded', () => {

   'use strict';

   addLoadedClass();
   
   const animItems = document.querySelectorAll('._anim-items');
   if (animItems.length > 0) {
      window.addEventListener('scroll', animOnScroll);
      function animOnScroll() {
         for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
               animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
               animItem.classList.add('_active');
            } else {
               if (!animItem.classList.contains('_anim-no-hide')) {
                  animItem.classList.remove('_active');
               }
            }
         }
      }
      function offset(el) {
         const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
         return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
         }
      }
      setTimeout(() => {
         animOnScroll();
      }, 300);
   }

   const iconMenu = document.querySelector('.menu__icon');
   const menuBody = document.querySelector('.menu__body');
   if (iconMenu) {
      iconMenu.addEventListener('click', function () {
         document.body.classList.toggle('_lock');
         iconMenu.classList.toggle('_active');
         menuBody.classList.toggle('_active');
      });
   }
   const searchIcon = document.querySelector('.search-menu__search-icon');
   if (searchIcon) {
      searchIcon.addEventListener('click', () => {
         document.querySelector('.header__container').classList.toggle('_active');
      });
   }
   
   const menuLinks = document.querySelectorAll('.link[data-goto]');
   if (menuLinks.length > 0) {
      menuLinks.forEach(menuLink => {
         menuLink.addEventListener('click', onMenuLinkClick);
      });

      function onMenuLinkClick(el) {
         const menuLink = el.target;
         if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
   
            if (iconMenu.classList.contains('_active')) { //for section translation
               document.body.classList.remove('_lock');
               iconMenu.classList.remove('_active');
               menuBody.classList.remove('_active');
            }
   
            window.scrollTo({//scroll function
               top: gotoBlockValue,
               behavior: 'smooth'
            });
   
            el.preventDefault();//turn off reference work
         }
      }
   }

   headerScroll();
   
   new Swiper('.games-slider', {
      navigation: {
         nextEl: '.games-slider-next',
         prevEl: '.games-slider-prev'
      },
      keyboard: {
         enabled: true,
         onlyInViewport: true,
         pageUpDown: true,
      },
      watchOverflow: true,
      slideToClickedSlide: true,
      breakpoints: {
         200: {
            slidesPerView: 1.3,
            spaceBetween: 14,
         },
         350: {
            slidesPerView: 1.52,
            spaceBetween: 24,
         },
         500: {
            slidesPerView: 2.2,
            spaceBetween: 24,
         },
         650: {
            slidesPerView: 2.5,
            spaceBetween: 30
         },
         991.98: {
            slidesPerView: 2.7,
            spaceBetween: 40
         },
         1450: {
            slidesPerView: 3.43,
            spaceBetween: 52
         }
      },
   });
   
   const accordions = document.querySelectorAll('.accordion');
   accordions.forEach((el, index) => {
      el.addEventListener('click', (e) => {
         const self = e.currentTarget;//in arrow function this is not available
         const control = self.querySelector('.accordion__control');
         const content = self.querySelector('.accordion__content');

         self.classList.toggle('open');

         if (self.classList.contains('open')) {
            control.setAttribute('aria-expanded', true);
            content.setAttribute('aria-hidden', false);
            content.style.maxHeight = content.scrollHeight + 'px';
         } else {
            control.setAttribute('aria-expanded', false);
            content.setAttribute('aria-hidden', true);
            content.style.maxHeight = '0px';
         }
         removeOpen(index);
      });
   });

   function removeOpen(index1) {
      accordions.forEach((el, index2) => {
         if (index1 !== index2) {
            el.classList.remove('open');

            let content = el.querySelector('.accordion__content');
            content.style.maxHeight = '0px';
         }
      });
   }

   let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

   if (isMobile.any()) {
      const openElement = document.querySelector('.open');
      if (openElement) {
         openElement.classList.remove('open');
      }
   }
});
function addLoadedClass() {
	if (!document.documentElement.classList.contains('loading')) {
		window.addEventListener("load", function () {
			setTimeout(function () {
				document.documentElement.classList.add('loaded');
			}, 0);
		});
	}
}
function headerScroll() {
      addWindowScrollEvent = true;
      const header = document.querySelector('header.header');
      const headerShow = header.hasAttribute('data-scroll-show');
      const headerShowTimer = header.dataset.scrollShow? header.dataset.scrollShow : 500;
      const startPoint = header.dataset.scroll? header.dataset.scroll : 1;
      let scrollDirection = 0;
      let timer;
      document.addEventListener("scroll", function (e) {
         const scrollTop = window.scrollY;
         clearTimeout(timer);
         if (scrollTop >= startPoint) {
           !header.classList.contains('_header-scroll')? header.classList.add('_header-scroll') : null;
            if (headerShow) {
               if (scrollTop > scrollDirection) {
                  // downscroll code
                  header.classList.contains('_header-show')? header.classList.remove('_header-show') : null;
               } else {
                  // upscroll code
                 !header.classList.contains('_header-show')? header.classList.add('_header-show') : null;
                  header.classList.contains('_header-scroll')? header.classList.remove('_header-scroll') : null; // remove _header-scroll class when scrolling up
               }
               timer = setTimeout(() => {
                 !header.classList.contains('_header-show')? header.classList.add('_header-show') : null;
               }, headerShowTimer);
            }
         } else {
            header.classList.contains('_header-scroll')? header.classList.remove('_header-scroll') : null;
            if (headerShow) {
               header.classList.contains('_header-show')? header.classList.remove('_header-show') : null;
            }
         }
         scrollDirection = scrollTop <= 0? 0 : scrollTop;
      });
}