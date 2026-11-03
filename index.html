export default async function handler(req, res) {
    // POST 요청만 허용
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: '이미지 데이터가 전달되지 않았습니다.' });
        }

        // Vercel 환경변수에서 API Key와 Endpoint 가져오기
        const apiKey = process.env.ROBOFLOW_API_KEY;
        const endpoint = process.env.ROBOFLOW_ENDPOINT;

        if (!apiKey || !endpoint) {
            return res.status(500).json({ error: '서버 환경변수(ROBOFLOW_API_KEY 또는 ROBOFLOW_ENDPOINT)가 설정되지 않았습니다.' });
        }

        // Roboflow Workflow API 호출 URL 완성 (키를 쿼리 파라미터 또는 헤더로 전달)
        const apiUrl = `${endpoint}?api_key=${apiKey}`;

        // Roboflow 서버로 전송
        const roboflowResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: {
                    image: {
                        type: 'url',
                        value: image
                    }
                }
            })
        });

        if (!roboflowResponse.ok) {
            const errorText = await roboflowResponse.text();
            return res.status(roboflowResponse.status).json({ error: `Roboflow API 오류: ${errorText}` });
        }

        const result = await roboflowResponse.json();
        return res.status(200).json(result);

    } catch (error) {
        console.error('서버 내부 오류:', error);
        return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.', details: error.message });
    }
}