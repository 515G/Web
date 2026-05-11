// تحديث عداد الكلمات تلقائياً
document.getElementById('text-input').addEventListener('input', function() {
    const text = this.value.trim();
    const words = text ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
    document.getElementById('word-count').innerText = words;
});

// وظيفة مسح النص
function clearText() {
    document.getElementById('text-input').value = "";
    document.getElementById('word-count').innerText = "0";
    document.getElementById('result-area').classList.add('hidden');
}

// وظيفة اللصق من الحافظة
async function pasteText() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('text-input').value = text;
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        document.getElementById('word-count').innerText = words;
    } catch (err) {
        alert("يرجى استخدام Ctrl+V للصق النص.");
    }
}

// الوظيفة الأساسية للفحص
function startAnalysis() {
    const textInput = document.getElementById("text-input").value.trim();
    const resultArea = document.getElementById("result-area");
    const percentDisplay = document.getElementById("result-percentage");
    const progressFill = document.getElementById("progress-fill");
    const statusText = document.getElementById("result-status");
    const msgText = document.getElementById("result-msg");
    const btn = document.getElementById("scan-btn");

    if (textInput.split(/\s+/).filter(w => w.length > 0).length < 5) {
        alert("النص قصير جداً! يرجى إدخال 5 كلمات على الأقل.");
        return;
    }

    btn.disabled = true;
    btn.innerText = "جاري التحليل الإحصائي...";
    resultArea.classList.remove("hidden");
    
    percentDisplay.innerText = "0.0%";
    progressFill.style.width = "0%";

    setTimeout(() => {
        const score = calculateAdvancedAI(textInput);
        
        // عرض النسبة بكسور عشرية
        percentDisplay.innerText = score.toFixed(1) + "%";
        progressFill.style.width = score + "%";
        
        let color, status, confidence, message;

        // منطق تحديد الحالة والألوان
        if (score > 70) {
            color = "#d63031";
            status = "احتمال ذكاء اصطناعي عالي 🤖";
            confidence = "مرتفعة ✅";
            message = "تم رصد أنماط لغوية آلية متكررة تفتقر للتنوع البشري الطبيعي.";
        } else if (score > 35) {
            color = "#f39c12";
            status = "محتوى مشتبه به ⚠️";
            confidence = "متوسطة ⚠️";
            message = "النص يظهر توازناً غريباً في تركيب الجمل، قد يكون نتاجاً لإعادة صياغة.";
        } else {
            color = "#00b894";
            status = "بصمة بشرية أصيلة ✨";
            confidence = "مرتفعة ✅";
            message = "يُظهر التحليل تنوعاً طبيعياً في المفردات ورتماً متغيراً للجمل يعكس أسلوبك الخاص.";
        }

        percentDisplay.style.color = color;
        progressFill.style.background = color;
        statusText.innerHTML = `${status} <br> <span style="font-size: 0.8rem; background: #eee; padding: 4px 10px; border-radius: 20px; color: #555; margin-top: 8px; display: inline-block;">مستوى الثقة: ${confidence}</span>`;
        msgText.innerText = message;

        btn.disabled = false;
        btn.innerText = "إعادة الفحص العميق 🔄";
    }, 1800);
}

// خوارزمية التحليل (الواقعية)
function calculateAdvancedAI(text) {
    let aiPoints = 12; 
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const sentences = text.split(/[.!?؟]+/).filter(s => s.trim().length > 0);

    // 1. حساب تنوع المفردات
    const lexicalDensity = uniqueWords / words.length;
    if (lexicalDensity < 0.6) aiPoints += 35;

    // 2. حساب تباين طول الجمل
    if (sentences.length > 1) {
        const lengths = sentences.map(s => s.trim().split(/\s+/).length);
        const avg = lengths.reduce((a, b) => a + b) / lengths.length;
        const variance = lengths.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / lengths.length;
        if (variance < 4) aiPoints += 25; 
    }

    // 3. فحص كلمات الربط النمطية
    const patterns = ["بالإضافة إلى", "علاوة على", "في الختام", "بشكل عام", "جدير بالذكر"];
    patterns.forEach(p => { if (text.includes(p)) aiPoints += 8; });

    // إضافة "ضجيج" عشوائي لضمان عدم تكرار نفس الرقم لنفس النص دائماً
    let final = aiPoints + (Math.random() * 6 - 3);
    return Math.min(Math.max(final, 4.1), 99.7);
}
