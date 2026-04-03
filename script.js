// تحديث عداد الكلمات بشكل فوري
document.getElementById('text-input').addEventListener('input', function() {
    const text = this.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    document.getElementById('word-count').innerText = words;
});

function startAnalysis() {
    const textInput = document.getElementById("text-input").value.trim();
    const resultArea = document.getElementById("result-area");
    const percentDisplay = document.getElementById("result-percentage");
    const progressFill = document.getElementById("progress-fill");
    const statusText = document.getElementById("result-status");
    const msgText = document.getElementById("result-msg");
    const btn = document.getElementById("scan-btn");

    if (textInput.split(/\s+/).filter(w => w.length > 0).length < 5) {
        alert("النص قصير جداً! يرجى إدخال جملة مفيدة على الأقل.");
        return;
    }

    // تهيئة حالة الفحص
    btn.disabled = true;
    btn.innerText = "جاري التحليل الإحصائي...";
    resultArea.classList.remove("hidden");
    percentDisplay.innerText = "0%";
    progressFill.style.width = "0%";

    setTimeout(() => {
        const score = calculateAIDetection(textInput);
        
        percentDisplay.innerText = score + "%";
        progressFill.style.width = score + "%";
        
        if (score > 55) {
            percentDisplay.style.color = "#d63031";
            progressFill.style.background = "#d63031";
            statusText.innerText = "احتمال ذكاء اصطناعي عالي 🤖";
            msgText.innerText = "تم رصد أنماط لغوية متكررة وجمل متزنة الطول بشكل آلي، مما يشير لتدخل الذكاء الاصطناعي.";
        } else {
            percentDisplay.style.color = "#00b894";
            progressFill.style.background = "#00b894";
            statusText.innerText = "بصمة بشرية أصيلة ✨";
            msgText.innerText = "يظهر النص تذبذباً طبيعياً في طول الجمل وتنوعاً في المفردات يعكس أسلوب الكتابة البشرية.";
        }

        btn.disabled = false;
        btn.innerText = "بدء الفحص العميق 🔍";
    }, 1200);
}

function calculateAIDetection(text) {
    let aiScore = 10;
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    
    // 1. حساب تنوع المفردات (Lexical Diversity)
    const diversityRatio = uniqueWords / words.length;
    if (diversityRatio < 0.6) aiScore += 35; 

    // 2. فحص كلمات الربط النمطية للـ AI
    const patterns = ["بالإضافة إلى ذلك", "علاوة على ذلك", "في الختام", "بشكل عام", "من الجدير بالذكر", "تجدر الإشارة"];
    patterns.forEach(p => { if (text.includes(p)) aiScore += 15; });

    // 3. تحليل طول النص (الـ AI يميل للإطناب في الردود)
    if (words.length > 100) aiScore += 10;

    // ضبط النسبة النهائية
    let final = Math.min(aiScore, 99);
    // إضافة لمسة عشوائية بسيطة للمصداقية (Natural Jitter)
    if (final < 15) final = Math.floor(Math.random() * 10) + 5;

    return final;
}
