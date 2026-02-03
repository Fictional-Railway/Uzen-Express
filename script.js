document.addEventListener('DOMContentLoaded', function() {
    
    /* =========================================
       ハンバーガーメニュー（スマホ用）
       ========================================= */
    const menuBtn = document.getElementById('js-menu-btn');
    const nav = document.getElementById('js-nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            // ボタンの見た目を切り替え
            this.classList.toggle('active');
            
            // ナビゲーションの表示・非表示を切り替え
            if (nav.style.display === 'block') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'block';
            }
        });
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
                // ヘッダーの高さ分ずらす（固定ヘッダー対策風）
                const headerOffset = 20; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // スマホメニューが開いていたら閉じる
                if (window.innerWidth < 768 && nav.style.display === 'block') {
                    nav.style.display = 'none';
                    menuBtn.classList.remove('active');
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    
    // スライダーの要素を取得
    const sliderWrapper = document.getElementById('js-slider-wrapper');
    const slides = document.querySelectorAll('.slide-item');
    const prevBtn = document.getElementById('js-slider-prev');
    const nextBtn = document.getElementById('js-slider-next');
    const dotsContainer = document.getElementById('js-slider-dots');
    
    // スライドが無ければ終了
    if (!sliderWrapper || slides.length === 0) return;

    let currentIndex = 0;
    const slideCount = slides.length;
    let autoPlayInterval;

    // インジケーター（丸い点）を生成
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        // 点をクリックしたらそのスライドへ
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // スライドを移動させる関数
    function updateSlider() {
        // 横にずらす量 (%) を計算
        const translateX = -1 * currentIndex * 100;
        sliderWrapper.style.transform = `translateX(${translateX}%)`;

        // 点の見た目を更新
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // 指定した番号へ移動
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    // 次へ
    function nextSlide() {
        currentIndex++;
        if (currentIndex >= slideCount) {
            currentIndex = 0;
        }
        updateSlider();
    }

    // 前へ
    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slideCount - 1;
        }
        updateSlider();
    }

    // ボタンのイベントリスナー
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // 自動再生（5秒ごとに次へ）
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    // 操作したらタイマーをリセット
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // 開始
    startAutoPlay();
});

document.addEventListener('DOMContentLoaded', function() {
    // 現在の日時を取得
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月は0から始まるので+1
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // フォーマットを作成
    const formattedDate = `${month}月${day}日 ${hours}:${formattedMinutes}現在`;
    // HTMLに反映
    const timeElement = document.getElementById('js-current-time');

    if (timeElement) {
        timeElement.textContent = formattedDate;
    }
});