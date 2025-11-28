const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'submissions.json');
const ADMIN_PASSWORD = 'admin123'; // 管理者パスワード（必要に応じて変更してください）

// ミドルウェア
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// データファイルの初期化
function initDataFile() {
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    }
}

// データ読み込み
function readData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        return [];
    }
}

// データ保存
function saveData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('データ保存エラー:', error);
        return false;
    }
}

// 応募データ送信エンドポイント
app.post('/submit', (req, res) => {
    const { name, age, discordId } = req.body;

    // バリデーション
    if (!name || !age || !discordId) {
        return res.status(400).json({
            success: false,
            message: 'すべての項目を入力してください'
        });
    }

    // 年齢の検証
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
        return res.status(400).json({
            success: false,
            message: '有効な年齢を入力してください'
        });
    }

    // データ作成
    const submission = {
        id: Date.now(),
        name: name.trim(),
        age: ageNum,
        discordId: discordId.trim(),
        timestamp: new Date().toISOString(),
        submittedAt: new Date().toLocaleString('ja-JP', {
            timeZone: 'Asia/Tokyo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    };

    // データ読み込み・追加・保存
    const data = readData();
    data.push(submission);

    if (saveData(data)) {
        res.json({
            success: true,
            message: 'ご応募ありがとうございます！送信が完了しました。',
            data: submission
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'サーバーエラーが発生しました'
        });
    }
});

// 管理画面データ取得エンドポイント（パスワード保護）
app.post('/admin/data', (req, res) => {
    const { password } = req.body;

    if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({
            success: false,
            message: 'パスワードが正しくありません'
        });
    }

    const data = readData();
    // 新しい順にソート
    data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json({
        success: true,
        data: data,
        count: data.length
    });
});

// サーバー起動
initDataFile();
app.listen(PORT, () => {
    console.log(`\n🚀 サーバーが起動しました！`);
    console.log(`📱 応募フォーム: http://localhost:${PORT}/`);
    console.log(`🔐 管理画面: http://localhost:${PORT}/admin.html`);
    console.log(`🔑 管理者パスワード: ${ADMIN_PASSWORD}\n`);
});
