const validCharacters = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '！', '#', '＄', '％', '＆', '（', '）', '＊', '？', '＠', '「', '」', '＋', '＝', '＞', '♀', '♂',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'あ', 'ア', 'い', 'イ', 'ウ', 'え', 'エ', 'お', 'オ', 'か', 'カ', 'き', 'キ', 'け', 'ケ', 'こ', 'コ',
    'さ', 'サ', 'す', 'ス', 'せ', 'セ', 'そ', 'た', 'タ', 'ち', 'チ', 'つ', 'て', 'テ', 'と', 'ト',
    'な', 'ナ', 'に', 'ニ', 'ぬ', 'ヌ', 'ね', 'ネ', 'の', 'ノ', 'は', 'ハ', 'ひ', 'ヒ', 'ふ', 'フ',
    'ほ', 'ホ', 'ま', 'マ', 'み', 'ミ', 'む', 'ム', 'め', 'メ', 'も', 'モ', 'や', 'ヤ', 'ゆ', 'ユ',
    'よ', 'ヨ', 'ら', 'る', 'ル', 'れ', 'ろ', 'ロ', 'わ', 'を', 'ヲ', 'ん'
];

const boxes = document.querySelectorAll('.box');


boxes.forEach((box, index) => {
    let isComposing = false;

    // IMEの変換が始まったらフラグを立てる
    box.addEventListener('compositionstart', () => {
        isComposing = true;
    });

    // IMEの変換が確定したらフラグを下ろす
    box.addEventListener('compositionend', () => {
        isComposing = false;
        validateInput(box);

        if (box.value.length === 1 && isValidCharacter(box.value)) {
            const nextBox = boxes[index + 1];
            if (nextBox) {
                nextBox.focus();
            }
        }
    });

    // 通常の入力イベント
    box.addEventListener('input', () => {
        if (!isComposing && box.value.length === 1) {
            validateInput(box);
            if (isValidCharacter(box.value)) {
                const nextBox = boxes[index + 1];
                if (nextBox) {
                    nextBox.focus();
                }
            }
        }
    });

    // バックスペースで前のボックスに戻る
    box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && box.value.length === 0) {
            const prevBox = boxes[index - 1];
            if (prevBox) {
                prevBox.focus();
            }
        }
    });

    // ホバー時にツールチップを表示
    box.addEventListener('mouseenter', (e) => {
        tooltip.textContent = `使用可能な文字: ${validCharacters.join(' ')}`;
        tooltip.style.display = 'block';
        tooltip.style.position = 'absolute';
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
    });

    // マウス移動時にツールチップを追従
    box.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
    });

    // ツールチップを非表示
    box.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});

// 入力を検証する関数
function validateInput(box) {
    if (isValidCharacter(box.value)) {
        box.style.borderColor = ""; // 有効な入力ならデフォルトの枠色に戻す
    } else {
        box.style.borderColor = "red"; // 無効な入力なら赤枠にする
    }
}

// 有効な文字かを判定する関数
function isValidCharacter(char) {
    return validCharacters.includes(char);
}





// datalistを取得
const datalist = document.getElementById('valid-characters');

// validCharactersの各文字をdatalistに追加
validCharacters.forEach(char => {
    const option = document.createElement('option');
    option.value = char;
    datalist.appendChild(option);
});
