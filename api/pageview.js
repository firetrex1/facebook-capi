export default async function handler(req, res) {
  const payload = {
    event_name: 'PageView',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: req.headers.referer || '',
    user_data: {
      client_ip_address: req.headers['x-forwarded-for'] || req.connection?.remoteAddress,
      client_user_agent: req.headers['user-agent'],
    },
  };

  try {
    const fbRes = await fetch('https://graph.facebook.com/v17.0/1545567849114687/events?access_token=EAAH1gZCOSDPoBO1VfYhkajarSw7fYylZCSwRArDpSZAXst6XBqfnZBWa9PCuERwrneoErHQ3ZBLWZBlKgFSLCJrzpSZBPdq8iBrgXfVimbZCBkDcMsh1OfaqETcNGtjDHjhfXxxmQFNRYe4GmZAWTIKFZCyvLw03f4JmMEtsNF4ZAwKUTrbkXxKGsgxk3kO1uRWZB3ZCb0gZDZD', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [payload] })
    });

    const data = await fbRes.json();

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
