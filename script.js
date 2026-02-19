// 羽前急行 公式サイト用スクリプト

document.addEventListener('DOMContentLoaded', function() {
    
    /* =========================================
       文字サイズ変更機能
       ========================================= */
    const btnNormal = document.getElementById('btn-text-normal');
    const btnLarge = document.getElementById('btn-text-large');
    
    if (btnNormal && btnLarge) {
        btnNormal.addEventListener('click', () => {
            document.body.classList.remove('text-large');
            btnNormal.classList.add('active');
            btnLarge.classList.remove('active');
        });
        
        btnLarge.addEventListener('click', () => {
            document.body.classList.add('text-large');
            btnLarge.classList.add('active');
            btnNormal.classList.remove('active');
        });
    }

    /* =========================================
       ハンバーガーメニュー（スマホ用）
       ========================================= */
    const menuBtn = document.getElementById('js-menu-btn');
    const nav = document.getElementById('js-nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            if (nav.style.display === 'block') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'block';
            }
        });
    }

    /* =========================================
       現在時刻と最終更新の取得・表示
       ========================================= */
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // 現在時刻（運行情報ヘッダー用）
    const timeElement = document.getElementById('js-current-time');
    if (timeElement) {
        timeElement.textContent = `${month}月${day}日 ${hours}:${formattedMinutes}現在`;
    }

    // 最終更新時刻（運行情報フッター用）
    const updateElement = document.getElementById('last-update');
    if (updateElement) {
        updateElement.textContent = `最終更新: ${year}年${month}月${day}日 ${hours}:${formattedMinutes}`;
    }

    /* =========================================
       ヒーロースライダー
       ========================================= */
    const sliderWrapper = document.getElementById('js-slider-wrapper');
    const slides = document.querySelectorAll('.slide-item');
    const prevBtn = document.getElementById('js-slider-prev');
    const nextBtn = document.getElementById('js-slider-next');
    const dotsContainer = document.getElementById('js-slider-dots');
    
    if (sliderWrapper && slides.length > 0) {
        let currentIndex = 0;
        const slideCount = slides.length;
        let autoPlayInterval;

        // インジケーター生成
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateSlider() {
            const translateX = -1 * currentIndex * 100;
            sliderWrapper.style.transform = `translateX(${translateX}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        function nextSlide() {
            currentIndex++;
            if (currentIndex >= slideCount) currentIndex = 0;
            updateSlider();
        }

        function prevSlide() {
            currentIndex--;
            if (currentIndex < 0) currentIndex = slideCount - 1;
            updateSlider();
        }

        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        startAutoPlay();
    }

    /* =========================================
       スムーズスクロール
       ========================================= */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 20; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                if (window.innerWidth < 768 && nav && nav.style.display === 'block') {
                    nav.style.display = 'none';
                    menuBtn.classList.remove('active');
                }
            }
        });
    });

    /* =========================================
       時刻表タブの切り替え機能
       ========================================= */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.timetable-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const targetId = btn.getAttribute('data-target');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });

                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});