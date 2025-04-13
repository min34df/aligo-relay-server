const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// 기본 확인용
app.get("/", (req, res) => {
  res.send("Aligo 문자 중계 서버입니다.");
});

// 문자 전송 처리
app.post("/send-sms", async (req, res) => {
  const { phone, msg } = req.body;

  const payload = new URLSearchParams({
    key: '53mh1odp0pmzbc41c1gh646q401kk712',
    user_id: 'kimhm2027',
    sender: '01058645510',
    receiver: phone,
    msg: msg,
    msg_type: 'LMS'
  });

  try {
    const response = await axios.post('https://apis.aligo.in/send/', payload);
    res.json({ success: true, result: response.data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.response?.data || error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`문자 중계 서버 실행 중! 포트: ${PORT}`);
});
