window.onload = function() {
    // --- 1. アクセスカウンター (キリ番機能付き) ---
    const counterElement = document.getElementById('counter');
    
    // ベース値 + ランダム増加
    let count = 246800;
    count += Math.floor(Math.random() * 50);
    
    counterElement.innerText = count;

    // キリ番判定
    if (count % 100 === 0 || count % 11111 === 0) {
        alert("★☆★ キリ番GETおめでとうございます！ ★☆★\nあなたは記念すべき " + count + " 人目のお客様です！\nBBSにカキコしてね！");
    }

    // --- 2. ステータスバーへの文字表示 ---
    // 最近のブラウザでは動きませんが、コードとしては残しておきます
    try {
        let msg = "　　　　Welcome to UZEN KYUKO RAILWAY Official Home Page...　　　　";
        let pos = 0;
        function scrollTitle() {
            document.title = msg.substring(pos, msg.length) + msg.substring(0, pos);
            pos++;
            if (pos > msg.length) pos = 0;
            window.setTimeout(scrollTitle, 200);
        }
        scrollTitle();
    } catch(e) {}
};

// --- 3. 右クリック禁止スクリプト (当時の定番) ---
document.addEventListener('contextmenu', function(e) {
    // 本当に禁止すると使いにくいので、alertだけ出す
    // e.preventDefault(); 
    // alert('画像のお持ち帰りは禁止です！！');
});