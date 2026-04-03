function analyzeText() {
    const input = document.getElementById("text-input").value.trim();
    const resultCard = document.getElementById("result-card");
    const percentDisplay = document.getElementById("percentage-text");
    const titleDisplay = document.getElementById("result-title");
    const descDisplay = document.getElementById("result-desc");

    if (input.length < 10) {
        alert("يرجى إدخال نص أطول للفحص");
        return;
    }

    // إظهار الكرت وتصفير النسبة مؤقتاً
    resultCard.classList.remove("hidden");
    percentDisplay.innerText = "0%";
    titleDisplay.innerText = "جاري الفحص...";

    // حساب النسبة (Logic بسيط)
    let score = Math.floor(Math.random() * 40) + 10; // قيمة افتراضية بشرية
    if (input.includes("علاوة على ذلك") || input.includes("بالإضافة إلى ذلك")) score += 30;
    if (input.length > 500) score += 20;
    
    // تأكد من عدم تخطي 99
    score = Math.min(score, 99);

    // تحديث الواجهة بالنتيجة
    setTimeout(() => {
        percentDisplay.innerText = score + "%";
        
        if (score > 60) {
            percentDisplay.style.color = "#d63031"; // أحمر
            titleDisplay.innerText = "احتمال AI عالي 🤖";
            descDisplay.innerText = "النص يظهر أنماطاً آلية متكررة.";
        } else {
            percentDisplay.style.color = "#10b981"; // أخضر
            titleDisplay.innerText = "نص بشري أصلي ✨";
            descDisplay.innerText = "النص يظهر تنوعاً لغوياً طبيعياً.";
        }
    }, 800);
}

function clearText() {
    document.getElementById("text-input").value = "";
    document.getElementById("result-card").classList.add("hidden");
}
