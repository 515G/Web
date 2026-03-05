function analyzeText() {
    const text = document.getElementById("text-input").value.trim();
    if (text.length < 50) {
        alert("يرجى إدخال نص أطول (50 حرف على الأقل) لتحليل دقيق.");
        return;
    }

    const btn = document.getElementById("scan-btn");
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الفحص...';

    // محاكاة وقت التحليل
    setTimeout(() => {
        const score = calculateAIScore(text);
        displayResult(score);
        btn.innerHTML = '<i class="fas fa-microscope"></i> فحص النص الآن';
    }, 1500);
}

function calculateAIScore(text) {
    let aiProb = 0;
    const sentences = text.split(/[.!?]/);
    const words = text.split(/\s+/);

    // 1. فحص تكرار الكلمات (AI يكرر كلمات معينة بكثرة)
    const wordFreq = {};
    words.forEach(w => wordFreq[w] = (wordFreq[w] || 0) + 1);
    const uniqueRatio = Object.keys(wordFreq).length / words.length;
    if (uniqueRatio < 0.5) aiProb += 30;

    // 2. فحص طول الجمل (AI يميل لجمل متقاربة الطول)
    let lengths = sentences.map(s => s.trim().split(/\s+/).length).filter(l => l > 1);
    let avgLen = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    let variance = lengths.reduce((a, b) => a + Math.pow(b - avgLen, 2), 0) / lengths.length;
    
    if (variance < 5) aiProb += 40; // تنوع قليل = احتمال AI كبير

    // 3. فحص كلمات "البصمة الآلية" (كلمات شائعة في شات جي بي تي)
    const aiKeywords = ["بالإضافة إلى ذلك", "علاوة على", "في الختام", "من الجدير بالذكر", "بشكل عام"];
    aiKeywords.forEach(word => {
        if (text.includes(word)) aiProb += 10;
    });

    return Math.min(aiProb, 99); // الحد الأقصى 99%
}

function displayResult(score) {
    const resultCard = document.getElementById("result-card");
    const gauge = document.getElementById("gauge-progress");
    const percentText = document.getElementById("percentage-text");
    const title = document.getElementById("result-title");
    const desc = document.getElementById("result-desc");

    resultCard.classList.remove("hidden");
    
    // تحديث لون العداد
    const color = score > 60 ? "#ef4444" : score > 30 ? "#f59e0b" : "#10b981";
    gauge.style.stroke = color;
    gauge.setAttribute("stroke-dasharray", `${score}, 100`);
    percentText.innerText = `${score}%`;

    if (score > 60) {
        title.innerText = "احتمال كبير جداً أنه AI";
        desc.innerText = "هذا النص يظهر أنماطاً متكررة وجمل متزنة للغاية، وهي سمة نصوص الذكاء الاصطناعي.";
    } else if (score > 30) {
        title.innerText = "نص مختلط أو مشكوك فيه";
        desc.innerText = "يحتوي النص على بصمات بشرية ولكن هناك جمل قد تكون معدلة بواسطة AI.";
    } else {
        title.innerText = "نص بشري أصلي";
        desc.innerText = "أحسنت! هذا النص يظهر تنوعاً لغوياً طبيعياً يشير إلى كتابة بشرية.";
    }
}

function clearText() {
    document.getElementById("text-input").value = "";
    document.getElementById("result-card").classList.add("hidden");
}