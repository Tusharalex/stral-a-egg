const https = require('https');
const url = require('url');

// Retrieve Webhook URL from GitHub Environment Variable
const webhookUrl = process.env.DISCORD_WEBHOOK;

if (!webhookUrl) {
    console.error("Error: DISCORD_WEBHOOK environment variable is not defined.");
    process.exit(1);
}

// Function to send payload to Discord
function sendDiscordNotification(payload) {
    const parsedUrl = url.parse(webhookUrl);
    const data = JSON.stringify(payload);

    const options = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
    };

    const req = https.request(options, (res) => {
        console.log(`Discord response status: ${res.statusCode}`);
    });

    req.on('error', (error) => {
        console.error('Error posting to Discord:', error);
    });

    req.write(data);
    req.end();
}

// Example Stock Data Payload
const stockPayload = {
    embeds: [{
        title: "🥚 Steal An Egg - Stock Alert",
        color: 0x00FF00, // Green
        description: "Latest stock updates fetched automatically!",
        fields: [
            { name: "Angel & Demon Eggs", value: "Available", inline: true },
            { name: "Cosmic Egg", value: "In Stock", inline: true },
            { name: "Divine Fusion Shrine", value: "Active", inline: true }
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "24/7 GitHub Actions Bot" }
    }]
};

sendDiscordNotification(stockPayload);
