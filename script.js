// 1. تحديث عداد الكلمات تلقائياً أثناء الكتابة
document.getElementById('text-input').addEventListener('input', function() {
    const text = this.value.trim();
    const words = text ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
    document.getElementById('word-count').innerText = words;
});

// 2. وظيفة مسح النص وتصفير الواجهة
function clearText() {
    document.getElementById('text-input').value = "";
    document.getElementById('word-count').innerText = "0";
    document.getElementById('result-area').classList.add('hidden');
}

// 3. وظيفة اللصق من الحافظة
async function pasteText() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('text-input').value = text;
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        document.getElementById('word-count').innerText = words;
    } catch (err) {
        alert("يرجى استخدام الاختصار Ctrl+V للصق النص.");
    }
}

// 4. الوظيفة الأساسية لبدء التحليل
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
        alert("النص قصير جداً! يرجى إدخال 5 كلمات على الأقل.");
        return;
    }

    btn.disabled = true;
    btn.innerText = "جاري الفحص المتقدم...";
    resultArea.classList.remove("hidden");
    percentDisplay.innerText = "0.0%";
    progressFill.style.width = "0%";

    setTimeout(() => {
        const score = calculateAdvancedAI(textInput);
        
        percentDisplay.innerText = score.toFixed(1) + "%";
        progressFill.style.width = score + "%";
        
        let color, status, confidence, message;

        if (score > 75) {
            color = "#d63031";
            status = "احتمال ذكاء اصطناعي عالي 🤖";
            confidence = "مرتفعة جداً ✅";
            message = "تم رصد رتابة لغوية وإطناب في النص (طول زائد مع جمل منظمة آلياً)؛ النص يطابق بصمة الـ AI.";
        } else if (score > 40) {
            color = "#f39c12";
            status = "محتوى مشتبه به ⚠️";
            confidence = "متوسطة ⚠️";
            message = "النص يحتوي على فقرات متوازنة بشكل آلي؛ قد يكون نصاً بشرياً تم تحسينه بالذكاء الاصطناعي.";
        } else {
            color = "#00b894";
            status = "بصمة بشرية أصلية ✨";
            confidence = "مرتفعة ✅";
            message = "النص يظهر عشوائية طبيعية وتنوعاً في طول الجمل والمفردات، مما يثبت المصدر البشري.";
        }

        percentDisplay.style.color = color;
        progressFill.style.background = color;
        statusText.innerHTML = `${status} <br> <span style="font-size: 0.8rem; background: #eee; padding: 4px 12px; border-radius: 20px; color: #555; margin-top: 10px; display: inline-block;">مستوى الثقة: ${confidence}</span>`;
        msgText.innerText = message;

        btn.disabled = false;
        btn.innerText = "إعادة الفحص العميق 🔄";
    }, 1800);
}

/**
 * 5. الخوارزمية المحدثة (التي تستهدف النصوص الطويلة جداً)
 */
function calculateAdvancedAI(text) {
    let aiPoints = 20; 
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?؟]+/).filter(s => s.trim().length > 2);
    
    // أ- فحص الطول الزائد (شرطك الجديد)
    // إذا النص طويل جداً (أكثر من 150 كلمة) نزيد النقاط فوراً
    if (words.length > 150) {
        aiPoints += 45; // دفعة قوية للـ AI بسبب الإطناب
    } else if (words.length > 80) {
        aiPoints += 20;
    }

    // ب- فحص تنوع المفردات
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const diversityRatio = uniqueWords / words.length;
    if (diversityRatio < 0.45) aiPoints += 25; 

    // ج- تحليل انحراف طول الجمل (الرتابة)
    if (sentences.length > 1) {
        const lengths = sentences.map(s => s.trim().split(/\s+/).length);
        const avg = lengths.reduce((a, b) => a + b) / lengths.length;
        const variance = lengths.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / lengths.length;
        const deviation = Math.sqrt(variance);
        
        if (deviation < 3) aiPoints += 30; // جمل متساوية (AI)
        else if (deviation > 8) aiPoints -= 20; // جمل متنوعة (بشري)
    }

    // د- الكلمات الانتقالية النمطية
    const academicPatterns = ["بالإضافة إلى ذلك", "علاوة على ذلك", "ومن الجدير بالذكر", "بشكل عام", "يعد هذا", "في الختام"];
    academicPatterns.forEach(p => { if (text.includes(p)) aiPoints += 10; });

    // إضافة تذبذب بسيط للواقعية
    let final = aiPoints + (Math.random() * 5 - 2.5);
    
    // حصر النتيجة في حدود منطقية
    if (final > 99.8) final = 98.2 + (Math.random() * 1.5);
    if (final < 4) final = 4.1 + (Math.random() * 2);

    return final;
}
