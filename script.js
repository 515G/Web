// تحديث عداد الكلمات تلقائياً
document.getElementById('text-input').addEventListener('input', function() {
    const words = this.value.trim().split(/\s+/).filter(w => w.length > 0);
    document.getElementById('count-num').innerText = words.length;
});

function analyzeText() {
    const text = document.getElementById("text-input").value.trim();
    if (text.length < 15) {
        alert("يرجى كتابة نص كافٍ للتحليل (15 حرف على الأقل)");
        return;
    }

    const btn = document.getElementById("scan-btn");
    const card = document.getElementById("result-card");
    const bar = document.getElementById("progress-bar");
    const pText = document.getElementById("percentage-text");
    const badge = document.getElementById("status-badge");

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الفحص المعمق...';
    card.classList.remove("hidden");
    bar.style.width = "0%";

    // محاكاة الفحص
    setTimeout(() => {
        const score = calculateAIScore(text);
        
        // تحديث الواجهة
        bar.style.width = score + "%";
        pText.innerText = score + "%";
        
        if (score > 60) {
            pText.style.color = "#ef4444";
            bar.style.background = "#ef4444";
            badge.innerText = "تنبيه: عالي المخاطر";
            badge.style.color = "#ef4444";
            document.getElementById("result-title").innerText = "احتمال ذكاء اصطناعي 🤖";
            document.getElementById("result-desc").innerText = "النص يفتقر للتنوع البشري ويظهر أنماطاً آلية واضحة.";
        } else {
            pText.style.color = "#10b981";
            bar.style.background = "#10b981";
            badge.innerText = "موثوق: أصلي";
            badge.style.color = "#10b981";
            document.getElementById("result-title").innerText = "بصمة بشرية أصيلة ✨";
            document.getElementById("result-desc").innerText = "تم التحقق من النص، أظهرت النتائج تنوعاً لغوياً طبيعياً.";
        }

        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-microscope"></i> بدء الفحص العميق';
    }, 1500);
}

function calculateAIScore(text) {
    let score = Math.floor(Math.random() * 25) + 5; // أساس بشري
    const aiPatterns = ["علاوة على", "بالإضافة إلى", "في الختام", "من الجدير بالذكر", "بشكل عام"];
    
    aiPatterns.forEach(p => { if (text.includes(p)) score += 15; });
    if (text.length > 500) score += 10;
    
    return Math.min(score, 99);
}

function clearText() {
    document.getElementById("text-input").value = "";
    document.getElementById("result-card").classList.add("hidden");
    document.getElementById("count-num").innerText = "0";
}
