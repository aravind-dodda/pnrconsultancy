export function sendTelegramNotification(text) {
    let TELEGRAM_TOKEN = "6004240588:AAExW_B51cMai2nhIw8FeQom3hmBm8jGBWU";
    let TELEGRAM_CHAT_ID = "-4150966359";

    let url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    let data = {
        chat_id: TELEGRAM_CHAT_ID,
        text: text
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}