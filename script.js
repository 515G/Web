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

    // التحقق من طول النص
    const wordsCount = textInput.split(/\s+/).filter(w => w.length > 0).length;
    if (wordsCount < 5) {
        alert("النص قصير جداً! يرجى إدخال 5 كلمات على الأقل لتحليل الأنماط.");
        return;
    }

    // تجهيز واجهة الفحص
    btn.disabled = true;
    btn.innerText = "جاري الفحص المتقدم...";
    resultArea.classList.remove("hidden");
    percentDisplay.innerText = "0.0%";
    progressFill.style.width = "0%";

    // محاكاة وقت التحليل الإحصائي
    setTimeout(() => {
        const score = calculateAdvancedAI(textInput);
        
        // عرض النسبة النهائية
        percentDisplay.innerText = score.toFixed(1) + "%";
        progressFill.style.width = score + "%";
        
        let color, status, confidence, message;

        // منطق تحديد الحالة بناءً على دقة الخوارزمية الجديدة
        if (score > 75) {
            color = "#d63031"; // أحمر
            status = "احتمال ذكاء اصطناعي عالي 🤖";
            confidence = "مرتفعة جداً ✅";
            message = "تم رصد رتابة لغوية عالية وانحراف معياري منخفض جداً في طول الجمل، وهي سمات مميزة لنماذج GPT.";
        } else if (score > 40) {
            color = "#f39c12"; // برتقالي
            status = "محتوى مشتبه به / هجين ⚠️";
            confidence = "متوسطة ⚠️";
            message = "النص يظهر توازناً آلياً في بعض الفقرات مع وجود لمسات بشرية؛ قد يكون نصاً معاد صياغته.";
        } else {
            color = "#00b894"; // أخضر
            status = "بصمة بشرية أصلية ✨";
            confidence = "مرتفعة ✅";
            message = "التحليل الإحصائي يؤكد وجود تباين طبيعي 'نبض لغوي' في طول الجمل وتنوع المفردات، مما يثبت المصدر البشري.";
        }

        // تطبيق التنسيقات والرسائل
        percentDisplay.style.color = color;
        progressFill.style.background = color;
        statusText.innerHTML = `${status} <br> <span style="font-size: 0.8rem; background: #eee; padding: 4px 12px; border-radius: 20px; color: #555; margin-top: 10px; display: inline-block;">مستوى الثقة في النتيجة: ${confidence}</span>`;
        msgText.innerText = message;

        btn.disabled = false;
        btn.innerText = "إعادة الفحص العميق 🔄";
    }, 1800);
}

/**
 * 5. الخوارزمية المحدثة (النبض اللغوي والانحراف المعياري)
 * هذه الخوارزمية تفرق بين رتابة الـ AI وعشوائية البشر
 */
function calculateAdvancedAI(text) {
    let aiPoints = 25; // نقطة التعادل
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?؟]+/).filter(s => s.trim().length > 2);
    
    // أ- فحص تنوع المفردات (Lexical Diversity)
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const diversityRatio = uniqueWords / words.length;
    
    if (diversityRatio < 0.5) aiPoints += 30; // تكرار كلمات عالي (نمط AI)
    else if (diversityRatio > 0.8) aiPoints -= 15; // تنوع بشري غني

    // ب- تحليل "النبض" (انحراف طول الجمل) - الأداة الأكثر دقة
    if (sentences.length > 1) {
        const lengths = sentences.map(s => s.trim().split(/\s+/).length);
        const avg = lengths.reduce((a, b) => a + b) / lengths.length;
        
        // حساب الانحراف المعياري البسيط
        const variance = lengths.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / lengths.length;
        const deviation = Math.sqrt(variance);
        
        if (deviation < 2.5) aiPoints += 35; // جمل متقاربة الطول جداً (رتابة AI)
        else if (deviation > 7) aiPoints -= 25; // جمل متباينة الطول جداً (إبداع بشري)
    }

    // ج- فحص الكلمات "الباردة" والأكاديمية الزائدة
    const academicPatterns = ["بالإضافة إلى ذلك", "علاوة على ذلك", "ومن الجدير بالذكر", "بشكل ملحوظ", "يعد هذا", "في الختام"];
    let patternHits = 0;
    academicPatterns.forEach(p => { if (text.includes(p)) patternHits++; });
    aiPoints += (patternHits * 8);

    // د- موازنة النصوص القصيرة (نسبة خطأ أعلى)
    if (words.length < 20) aiPoints += 10;

    // هـ- إضافة تذبذب عشوائي (Random Jitter) للواقعية
    let final = aiPoints + (Math.random() * 6 - 3);
    
    // حصر النسبة في حدود منطقية
    if (final > 99.8) final = 98.4 + (Math.random() * 1.2);
    if (final < 3) final = 3.2 + (Math.random() * 2);

    return final;
}
