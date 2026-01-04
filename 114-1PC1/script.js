// 計算貸款的函數
function calculateLoan() {
    // 獲取輸入值
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseFloat(document.getElementById('loanTerm').value);

    // 驗證輸入
    if (!loanAmount || !interestRate || !loanTerm) {
        alert('請填寫所有欄位！');
        return;
    }

    if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
        alert('請輸入有效的數值！');
        return;
    }

    // 計算月利率
    const monthlyRate = interestRate / 100 / 12;

    // 計算總月數
    const totalMonths = loanTerm * 12;

    // 計算每月還款金額（使用貸款攤還公式）
    let monthlyPayment;
    if (monthlyRate === 0) {
        // 如果利率為0，直接平均分攤
        monthlyPayment = loanAmount / totalMonths;
    } else {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    // 計算總還款金額
    const totalPayment = monthlyPayment * totalMonths;

    // 計算總利息
    const totalInterest = totalPayment - loanAmount;

    // 顯示結果
    displayResults(monthlyPayment, totalPayment, totalInterest);
}

// 顯示結果的函數
function displayResults(monthly, total, interest) {
    document.getElementById('monthlyPayment').textContent = formatCurrency(monthly);
    document.getElementById('totalPayment').textContent = formatCurrency(total);
    document.getElementById('totalInterest').textContent = formatCurrency(interest);

    // 顯示結果區塊
    const resultDiv = document.getElementById('result');
    resultDiv.classList.add('show');
}

// 格式化貨幣的函數
function formatCurrency(amount) {
    return 'NT$ ' + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 重置表單的函數
function resetForm() {
    document.getElementById('loanForm').reset();
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('show');
}

// 當DOM載入完成後，綁定事件監聽器
document.addEventListener('DOMContentLoaded', function() {
    // 計算按鈕點擊事件
    document.getElementById('calculateBtn').addEventListener('click', calculateLoan);

    // 重置按鈕點擊事件
    document.getElementById('resetBtn').addEventListener('click', resetForm);

    // 按下Enter鍵也可以計算
    document.getElementById('loanForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateLoan();
        }
    });
});
