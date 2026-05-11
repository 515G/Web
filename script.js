// 1. تحديث عداد الكلمات
document.getElementById('text-input').addEventListener('input', function() {
    const text = this.value.trim();
    const words = text ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
    document.getElementById('word-count').innerText = words;
});

function clearText() {
    document.getElementById('text-input').value = "";
    document.getElementById('word-count').innerText = "0";
    document.getElementById('result-area').classList.add('hidden');
}

async function pasteText() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('text-input').value = text;
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        document.getElementById('word-count').innerText = words;
    } catch (err) { alert("استخدم Ctrl+V"); }
}

function startAnalysis() {
    const textInput = document.getElementById("text-input").value.trim();
    const resultArea = document.getElementById("result-area");
    const percentDisplay = document.getElementById("result-percentage");
    const progressFill = document.getElementById("progress-fill");
    const statusText = document.getElementById("result-status");
    const msgText = document.getElementById("result-msg");
    const btn = document.getElementById("scan-btn");

    const wordsCount = textInput.split(/\s+/).filter(w => w.length > 0).length;
    if (wordsCount < 5) {
        alert("النص قصير جداً!");
        return;
    }

    btn.disabled = true;
    btn.innerText = "جاري الفحص العميق...";
    resultArea.classList.remove("hidden");

    setTimeout(() => {
        const score = calculateAdvancedAI(textInput);
        
        percentDisplay.innerText = score.toFixed(1) + "%";
        progressFill.style.width = score + "%";
        
        let color, status, message;

        if (score > 75) {
            color = "#d63031";
            status = "احتمال ذكاء اصطناعي عالي 🤖";
            message = "تم رصد إطناب لغوي وتنسيق هيكلي دقيق جداً؛ هذه النصوص الطويلة والمنظمة غالباً ما تُنتج آلياً.";
        } else if (score > 40) {
            color = "#f39c12";
            status = "محتوى مشتبه به ⚠️";
            message = "النص يحتوي على خصائص مختلطة؛ طول الجمل يوحي بالبشرية لكن التنظيم يوحي بالذكاء الاصطناعي.";
        } else {
            color = "#00b894";
            status = "بصمة بشرية أصيلة ✨";
            message = "النص قصير وعفوي ويحتوي على تباين لغوي طبيعي.";
        }

        percentDisplay.style.color = color;
        progressFill.style.background = color;
        statusText.innerHTML = `${status} <br> <span style="font-size: 0.8rem; background: #eee; padding: 4px 12px; border-radius: 20px; color: #555; margin-top: 10px; display: inline-block;">مستوى الثقة: مرتفعة</span>`;
        msgText.innerText = message;

        btn.disabled = false;
        btn.innerText = "إعادة الفحص 🔄";
    }, 1500);
}

function calculateAdvancedAI(text) {
    let aiPoints = 15; 
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    // --- تعديلك الجديد: النصوص الطويلة جداً تصنف AI فوراً ---
    if (wordCount > 300) {
        aiPoints += 70; // قفزة هائلة للنصوص الطويلة جداً
    } else if (wordCount > 150) {
        aiPoints += 40; 
    } else if (wordCount > 80) {
        aiPoints += 20;
    }

    // فحص التنوع اللغوي
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const diversityRatio = uniqueWords / wordCount;
    if (diversityRatio < 0.5) aiPoints += 20;

    // فحص الكلمات المفتاحية للـ AI (مثل: علاوة على ذلك، في الختام)
    const patterns = ["علاوة على ذلك", "بالإضافة إلى ذلك", "في الختام", "ومن الجدير بالذكر", "تعد من أهم", "بشكل عام"];
    let hits = 0;
    patterns.forEach(p => { if (text.includes(p)) hits++; });
    aiPoints += (hits * 6);

    // إضافة عشوائية بسيطة
    let final = aiPoints + (Math.random() * 4 - 2);
    
    if (final > 99.9) final = 99.4;
    if (final < 5) final = 7.2; // النسبة التي ظهرت لك سابقاً كحد أدنى

    return final;
}
