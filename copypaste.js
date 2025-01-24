document.getElementById('populate-button').addEventListener('click', () => {
    const mainInput = document.getElementById('main-input').value; // 入力された文字列
    const sanitizedInput = mainInput.replace(/\s+/g, ''); // スペースを削除
    const boxes = document.querySelectorAll('.box'); // 各入力ボックスを取得

    // 各入力ボックスに文字を順に入力
    for (let i = 0; i < boxes.length; i++) {
        if (i < sanitizedInput.length) {
            boxes[i].value = sanitizedInput[i];
            validateInput(boxes[i]); // 入力内容を検証
        } else {
            boxes[i].value = ''; // 残りのボックスを空に
            boxes[i].style.borderColor = ""; // 枠色をリセット
        }
    }
});