/* eslint-disable object-curly-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */

import axios from 'axios';
// import fs from 'fs/promises'


async function getAudio(req, res) {
    try {
        if (req.body.text == undefined) {
            res.status(400).json(
                {
                    status: 'error',
                    message: 'Please send the field text in the body'
                })
        } else {
            console.log(req.body.text)
            const axios_data = JSON.stringify({
                "text": req.body.text,
                "model_id": "eleven_monolingual_v1",
                "voice_settings": {
                    "stability": 0.5,
                    "similarity_boost": 0.7
                }
            });

            let axios_config = {
                method: 'post',
                maxBodyLength: Infinity,
                responseType: 'arraybuffer',
                url: 'https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': process.env.ELEVEN_API_KEY
                },
                data: axios_data
            };
            const response = await axios(axios_config)

            try {
                // await fs.writeFile('./binary.mp3', response.data, 'binary')
                const base64_audio = Buffer.from(response.data, 'binary').toString('base64')
                res.status(202).json({
                    status: 'ok',
                    message: 'Audio generated',
                    base64_audio: base64_audio
                })
            } catch (error) {
                console.error(error)
                res.status(507).json(
                    {
                        status: 'error',
                        message: 'Server error writing file'
                    })
            }
        }

    } catch (error) {
        console.error(error)
        res.status(500).json(
            {
                status: 'error',
                message: 'Server error getting audio from elevenlabs'
            })
    }
}

export default getAudio