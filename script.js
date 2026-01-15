const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const result = document.getElementById('result');
// 記錄功能暫時隱藏
// const recordsList = document.getElementById('recordsList');
// const stats = document.getElementById('stats');
// const clearButton = document.getElementById('clearButton');

// 三個選項：每個選項佔 120 度
// 選項中心位置：0度（1000）、120度（1）、240度（100）
// 指針在頂部（270度），所以選項中心需要旋轉到 270 度位置
const prizes = [
    { value: 1000, centerAngle: 0, targetRotation: 270 },    // 0度 -> 270度，需要轉270度
    { value: 1, centerAngle: 120, targetRotation: 150 },     // 120度 -> 270度，需要轉150度
    { value: 100, centerAngle: 240, targetRotation: 30 }      // 240度 -> 270度，需要轉30度
];

let isSpinning = false;
let currentRotation = 0;

// 記錄功能暫時隱藏
/*
// 從 localStorage 讀取記錄，如果沒有則初始化為空陣列
function getRecords() {
    const records = localStorage.getItem('lotteryRecords');
    return records ? JSON.parse(records) : [];
}

// 保存記錄到 localStorage
function saveRecord(prizeValue) {
    const records = getRecords();
    const newRecord = {
        id: Date.now(), // 使用時間戳作為唯一 ID
        time: new Date().toLocaleString('zh-TW'), // 格式化時間
        prize: prizeValue
    };
    records.unshift(newRecord); // 新增到陣列開頭（最新的在前面）
    localStorage.setItem('lotteryRecords', JSON.stringify(records));
    return records;
}

// 顯示記錄
function displayRecords() {
    const records = getRecords();
    recordsList.innerHTML = '';
    
    if (records.length === 0) {
        recordsList.innerHTML = '<p class="no-records">尚無抽獎記錄</p>';
        stats.innerHTML = '';
        return;
    }
    
    // 顯示記錄列表
    records.forEach(record => {
        const recordItem = document.createElement('div');
        recordItem.className = 'record-item';
        recordItem.innerHTML = `
            <span class="record-time">${record.time}</span>
            <span class="record-prize">獲得 ${record.prize} 點</span>
        `;
        recordsList.appendChild(recordItem);
    });
    
    // 顯示統計資訊
    const statsData = calculateStats(records);
    stats.innerHTML = `
        <div class="stat-item">
            <span class="stat-label">總抽獎次數：</span>
            <span class="stat-value">${statsData.total}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">1000點：</span>
            <span class="stat-value">${statsData.prize1000} 次 (${statsData.percent1000}%)</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">100點：</span>
            <span class="stat-value">${statsData.prize100} 次 (${statsData.percent100}%)</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">1點：</span>
            <span class="stat-value">${statsData.prize1} 次 (${statsData.percent1}%)</span>
        </div>
    `;
}

// 計算統計資訊
function calculateStats(records) {
    const total = records.length;
    const prize1000 = records.filter(r => r.prize === 1000).length;
    const prize100 = records.filter(r => r.prize === 100).length;
    const prize1 = records.filter(r => r.prize === 1).length;
    
    return {
        total,
        prize1000,
        prize100,
        prize1,
        percent1000: total > 0 ? ((prize1000 / total) * 100).toFixed(1) : 0,
        percent100: total > 0 ? ((prize100 / total) * 100).toFixed(1) : 0,
        percent1: total > 0 ? ((prize1 / total) * 100).toFixed(1) : 0
    };
}

// 清除記錄
clearButton.addEventListener('click', () => {
    if (confirm('確定要清除所有記錄嗎？')) {
        localStorage.removeItem('lotteryRecords');
        displayRecords();
    }
});

// 頁面載入時顯示記錄
displayRecords();
*/

spinButton.addEventListener('click', () => {
    if (isSpinning) return;
    
    isSpinning = true;
    spinButton.disabled = true;
    result.textContent = '';
    result.classList.remove('show');
    
    // 隨機選擇一個獎項
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];
    
    // 計算旋轉角度
    // 多轉幾圈增加效果（5-8圈隨機）
    const extraSpins = 5 + Math.random() * 3;
    const baseRotation = 360 * extraSpins;
    
    // 總旋轉角度 = 當前角度 + 多轉的圈數 + 調整到目標位置的角度
    const finalRotation = currentRotation + baseRotation + selectedPrize.targetRotation;
    
    // 應用旋轉
    wheel.style.transform = `rotate(${finalRotation}deg)`;
    currentRotation = finalRotation % 360;
    
    // 等待動畫完成後顯示結果
    setTimeout(() => {
        result.textContent = `恭喜獲得 ${selectedPrize.value} 點！`;
        result.classList.add('show');
        
        // 記錄功能暫時隱藏
        // saveRecord(selectedPrize.value);
        // displayRecords();
        
        isSpinning = false;
        spinButton.disabled = false;
    }, 4000); // 與 CSS transition 時間一致
});

