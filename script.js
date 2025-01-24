
// ボタンをクリックした際の動作
document.getElementById('convert-button').addEventListener('click', function() {
    const boxes = document.querySelectorAll('.box');
    let inputMail = "";

    // 各入力ボックスの値を結合
    boxes.forEach(box => {
        inputMail += box.value;
    });

    // 入力チェック
    if (inputMail.length !== 34) { // 5+7+5 × 2行の場合、計34文字
        alert("すべてのボックスに1文字ずつ入力してください！");
        return;
    }

    // 仮の変換アルゴリズム
    const rescueMail = convertToRescueMail(inputMail);

    // 結果を表示
    document.getElementById('result').textContent = rescueMail;
});

// 変換アルゴリズム（例：文字を逆順にする）
function convertToRescueMail(helpMail) {
    const rules = {
        4: 40,  // 4番目の文字を40文字次へ
        10: 94, // 11番目の文字を94文字次へ
        17: 39, // 17番目の文字を94文字次へ
        22: 6,  // 22番目の文字を6文字次へ
        25: 89, // 26番目の文字を89文字次へ
        29: 39, // 30番目の文字を39文字次へ
        32: -2  // 34番目の文字を2文字前へ
    };

    let rescueMail = ""; // 結果の文字列

    for (let i = 0; i < helpMail.length; i++) {
        const char = helpMail[i];
        const charIndex = validCharacters.indexOf(char);

        // 対象の文字が validCharacters に存在しない場合はそのまま追加
        if (charIndex === -1) {
            rescueMail += char;
            continue;
        }

        // ルールが適用される文字の場合
        if (rules[i + 1]) {
            const shift = rules[i + 1];
            const newIndex = (charIndex + shift + validCharacters.length) % validCharacters.length;
            rescueMail += validCharacters[newIndex];
        } else {
            // ルールがない場合はそのまま追加
            rescueMail += char;
        }
    }

    return rescueMail;
}
