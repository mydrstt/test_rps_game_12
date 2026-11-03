
export default async function handler(req, res) {
    // POST 요청만 허용
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({
            error: 'POST 요청만 허용됩니다.'
        });
    }

    try {
        const { image } = req.body || {};

        if (!image || typeof image !== 'string') {
            return res.status(400).json({
                error: '이미지 데이터가 올바르지 않습니다.'
            });
        }

        // Vercel 환경변수
        const apiKey = process.env.ROBOFLOW_API_KEY;
        const endpoint = process.env.ROBOFLOW_ENDPOINT;

        if (!apiKey || !endpoint) {
            return res.status(500).json({
                error: 'Roboflow 환경변수가 설정되지 않았습니다.'
            });
        }

        // 이미지 데이터 형식
        // 카메라 캡처에서 전달된 Base64 이미지 지원
        const imageValue = image.startsWith('data:')
            ? image.split(',')[1]
            : image;

        const imageInput = /^https?:\/\//i.test(imageValue)
            ? { type: 'url', value: imageValue }
            : { type: 'base64', value: imageValue };

        // Roboflow Workflow 호출
        const roboflowResponse = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                inputs: {
                    image: imageInput
                }
            })
        });

        if (!roboflowResponse.ok) {
            const errorText = await roboflowResponse.text();

            console.error(
                'Roboflow API 오류:',
                roboflowResponse.status,
                errorText
            );

            return res.status(roboflowResponse.status).json({
                error: 'Roboflow API 호출에 실패했습니다.',
                details: errorText
            });
        }

        const result = await roboflowResponse.json();

        return res.status(200).json(result);

    } catch (error) {
        console.error('서버 내부 오류:', error);

        return res.status(500).json({
            error: 'AI 이미지 분석 중 오류가 발생했습니다.',
            details: error.message
        });
    }
}
