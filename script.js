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