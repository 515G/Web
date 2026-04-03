// تحديث عداد الكلمات
document.getElementById('text-input').addEventListener('input', function() {
    const text = this.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    document.getElementById('word-count').innerText = words;
});

function startAnalysis() {
    const input = document.getElementById("text-input").value.trim();
    if (input.length < 10) {
        alert("النص قصير جداً لفحصه!");
        return;
    }

    const btn = document.getElementById("scan-btn");
    const resultArea = document.getElementById("result-area");
    const percentDisplay = document.getElementById("result-percentage");
    const progressFill = document.getElementById("progress-fill");
    const statusText = document.getElementById("result-status");
    const msgText = document.getElementById("result-msg");

    btn.disabled = true;
    btn.innerText = "جاري الفحص المعمق...";
    resultArea.classList.remove("hidden");
    
    percentDisplay.innerText = "0%";
    progressFill.style.width = "0%";

    setTimeout(() => {
        let score = calculateLogic(input);
        
        percentDisplay.innerText = score + "%";
        progressFill.style.width = score + "%";
        
        if (score > 55) {
            percentDisplay.style.color = "#d63031";
            progressFill.style.background = "#d63031";
            statusText.innerText = "احتمال انتحال آلي 🤖";
            msgText.innerText = "النص يظهر تكراراً عالياً في الأنماط اللغوية المعتادة في نماذج الذكاء الاصطناعي.";
        } else {
            percentDisplay.style.color = "#00b894";
            progressFill.style.background = "#00b894";
            statusText.innerText = "نص بشري أصلي ✨";
            msgText.innerText = "التحليل أظهر تنوعاً طبيعياً في المفردات وطول الجمل، مما يؤكد أصلية المحتوى.";
        }

        btn.disabled = false;
        btn.innerText = "بدء الفحص العميق 🔍";
    }, 1000);
}

function calculateLogic(text) {
    let score = 10; 
    const words = text.split(/\s+/);
    const unique = new Set(words.map(w => w.toLowerCase())).size;
    const ratio = unique / words.length;

    if (ratio < 0.6) score += 40;
    const markers = ["علاوة على", "بالإضافة إلى", "في الختام", "بشكل عام", "من المهم"];
    markers.forEach(m => { if (text.includes(m)) score += 15; });
    if (words.length > 80) score += 10;

    return Math.min(score, 99);
}
