let history = [];
let balance = 1000;  // Số dư bắt đầu

function rollNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function playGame() {
    const bet = document.getElementById('bet').value;
    const amount = parseInt(document.getElementById('amount').value);
    const messageElement = document.getElementById('message');
    
    if (isNaN(amount) || amount <= 0) {
        messageElement.textContent = "Vui lòng nhập số tiền cược hợp lệ.";
        return;
    }
    
    if (amount > balance) {
        messageElement.textContent = "Số tiền cược lớn hơn số dư hiện tại.";
        return;
    }

    const number = rollNumber();
    const isEven = number % 2 === 0;
    const result = isEven ? 'Chẵn' : 'Lẻ';
    
    messageElement.textContent = `Số: ${number} - ${result}`;
    
    setTimeout(() => {
        if ((bet === 'C' && isEven) || (bet === 'L' && !isEven)) {
            balance += amount;
            updateHistory(`Đặt cược: ${amount} VND - Kết quả: ${result} - Thắng!`);
            messageElement.textContent += ` Chúc mừng! Bạn đã thắng ${amount} VND. Số dư hiện tại: ${balance}`;
        } else {
            balance -= amount;
            updateHistory(`Đặt cược: ${amount} VND - Kết quả: ${result} - Thua!`);
            messageElement.textContent += ` Rất tiếc, bạn đã thua ${amount} VND. Số dư hiện tại: ${balance}`;
        }
    }, 10000);  // Hiển thị kết quả trong 10 giây
}

function updateHistory(entry) {
    history.push(entry);
    const historyList = document.getElementById('historyList');
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
}
