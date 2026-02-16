// const name = 'ぶるきよ';
import { name } from './index18user.js';
// const name = 'ジャイアン';
document.getElementById('p2').textContent = name;
let a = 'ららら' && 'りりり';
document.getElementById('p3').textContent = a;
let b = 'ぱん' && 'ごま' && 'たま' && 'みみこ';
document.getElementById('p4').textContent = b;

// mapを使って一人ずつチェック！ a && b && c の練習
const users = [
    { lastName: '田中', firstName: '太郎' }, // 両方あり
    { lastName: '佐藤', firstName: '' }, // 名前が空文字 (Falsy)
    { lastName: '鈴木', firstName: '次郎' }, // 両方あり
    { lastName: null, firstName: '三郎' }, // 名字がnull (Falsy)
    { lastName: '高橋', firstName: '健太' }, // 両方あり
    { lastName: '田中', firstName: undefined }, // 名前が未定義 (Falsy)
    { lastName: '伊藤', firstName: '直樹' }, // 両方あり
    { lastName: '', firstName: '' }, // 両方空
    { lastName: '渡辺', firstName: '真一' }, // 両方あり
    { lastName: '小林', firstName: '美穂' }, // 両方あり
];

const displayNames = users.map((user, index) => {
    const lastName = user.lastName;
    const firstName = user.firstName;

    // ここがポイント！両方存在すれば（Truthyなら）最後の文字列が代入される
    const displayName = lastName && firstName && `${lastName} ${firstName}様`;

    // 結果を分かりやすく表示（displayNameがFalsyなら "表示不可" を出す）
    return `${index + 1}: ${displayName || '⚠️データ不備のため表示不可'}`;
});

console.log(displayNames.join('\n'));
document.getElementById('p5').innerHTML = displayNames.join('<br>');

// mapを使って一人ずつチェック a || b || c の練習
const doraUsers = [
    { nickname: 'しずかちゃん', realName: '源静香' }, // ニックネームを優先採用
    { nickname: '', realName: '剛田武' }, // ニックネームが空なので本名を採用
    { nickname: null, realName: '' }, // 両方空なので「ゲスト」を採用
    { nickname: 'りり', realName: '中野りり' }, // ニックネームを優先採用
    { nickname: undefined, realName: '野比のび太' }, // 本名を採用
    { nickname: 'みみこ', realName: null }, // ニックネームを優先採用
    { nickname: '', realName: '' }, // 両方空なので「ゲスト」を採用
    { nickname: 'ドラちゃん', realName: 'ドラえもん' }, // ニックネームを優先採用
    { nickname: 'スネ夫', realName: '骨川小強' }, // ニックネームを優先採用
    { nickname: null, realName: null }, // 両方空なので「ゲスト」を採用
];

const displayProfiles = doraUsers.map((user, index) => {
    const nick = user.nickname;
    const real = user.realName;

    // || の旅：左から見て「中身（Truthy）」が見つかった瞬間にそれを採用してゴール！
    const displayName = nick || real || '名無しのゲスト';

    return `${index + 1}: ${displayName}`;
});

// HTMLに改行付きで表示
document.getElementById('p6').innerHTML = displayProfiles.join('<br>');
