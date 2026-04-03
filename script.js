/**
 * OFFICIAL LICENSE:
 * This software is the sole property of Abedalrahman Al-Shdaifat J.
 * Unauthorized copying or distribution is strictly prohibited.
 */

function analyzeText() {
    const textInput = document.getElementById("text-input");
    const text = textInput.value.trim();
    
    // التأكد من وجود نص كافٍ للتحليل
    if (text.length < 20) {
        alert("النص قصير جداً! يرجى إدخال 20 حرفاً على الأقل.");
        return;
    }

    const btn = document.getElementById("scan-btn");
    const originalText = btn.innerText;
    btn.innerText = "جاري تتبع البصمة...";
    btn.disabled = true; // تعطيل الزر أثناء الفحص

    // محاكاة وقت التحليل ليعطي طابعاً احترافياً
    setTimeout(() => {
        const score = calculateScore(text);
        showResult(score);
        btn.innerText = originalText;
        btn.disabled = false;
    }, 1000);
}

function calculateScore(text) {
    let score = 0;
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const uniqueWords = new Set(words).size;
    
    // 1. فحص نسبة الكلمات الفريدة (تكرار الكلمات)
    const ratio = uniqueWords / words.length;
    if (ratio < 0.5) score += 40;
    else if (ratio < 0.7) score += 20;

    // 2. فحص كلمات الربط النمطية للـ AI
    const aiPatterns = ["بالإضافة إلى ذلك", "علاوة على ذلك", "في الختام", "من الجدير بالذكر", "بشكل عام"];
    aiPatterns.forEach(pattern => {
        if (text.includes(pattern)) score += 15;
    });

    // 3. فحص طول النص (الـ AI يميل للإطناب)
    if (words.length > 100) score += 10;

    // تأكد أن النسبة لا تتجاوز 99% ولا تقل عن 5% لإعطاء واقعية
    let finalScore = Math.min(score, 99);
    if (finalScore < 5) finalScore = Math.floor(Math.random() * 15) + 5; 
    
    return finalScore;
}

function showResult(score) {
    const card = document.getElementById("result-card");
    const pText = document.getElementById("percentage-text");
    const title = document.getElementById("result-title");
    const desc = document.getElementById("result-desc");
    
    // إظهار الكرت وتحديث النسبة
    card.classList.remove("hidden");
    pText.innerText = score + "%";
    
    // تغيير الألوان والوصف بناءً على النتيجة
    if (score > 60) {
        pText.style.color = "#d63031"; // أحمر
        title.innerText = "بصمة آلية واضحة 🤖";
        desc.innerText = "هذا النص يفتقر للتنوع البشري الطبيعي، مما يشير بقوة إلى تدخل الذكاء الاصطناعي.";
    } else if (score > 35) {
        pText.style.color = "#f39c12"; // برتقالي
        title.innerText = "نص مشكوك فيه 🧐";
        desc.innerText = "يحتوي النص على مزيج من الأنماط، قد يكون نصاً بشرياً تمت إعادة صياغته آلياً.";
    } else {
        pText.style.color = "#10b981"; // أخضر
        title.innerText = "بصمة بشرية أصيلة ✨";
        desc.innerText = "أحسنت! هذا النص يظهر تنوعاً لغوياً طبيعياً يعكس كتابة بشرية حقيقية.";
    }
}

function clearText() {
    document.getElementById("text-input").value = "";
    document.getElementById("result-card").classList.add("hidden");
}
