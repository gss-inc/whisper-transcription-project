const { TiktokDL } = require("@tobyg74/tiktok-api-dl")
import { table } from "../../utils/airtable"
import { NextResponse } from 'next/server'
import { cloudinary } from "../../utils/cloudinary"
import axios from 'axios';
import { convertTextFormat, createFormData } from "../../utils/format"

export async function POST(req: Request, res) {
    try {
        const { id, url } = await req.json()
        let video_url = url;
    
        const videoUrl = video_url
        const whisperApiKey = process.env.WHISPER_API_KEY;

        // Fetch the tiktok stream using TiktokDL
        const tiktokVideo = await TiktokDL(videoUrl);

        // Upload the video stream to Cloudinary
        const uploadResult = await cloudinary.uploader
        .upload(tiktokVideo.result.video[0],{
          resource_type: "video"
        })

        const readable = await createFormData(uploadResult.secure_url,'tmp.mp4')
        const fileName = readable.get('tmp.mp4')
    
        const formData = new FormData();
        formData.append('file', fileName);
        formData.append('model', 'whisper-1');
        formData.append('response_format', 'srt');
    
        const transcribeResponse = await axios.post(
          'https://api.openai.com/v1/audio/transcriptions',
          formData,
          {
            headers: {
              Authorization: `Bearer ${whisperApiKey}`,
            },
          }
        );
    
        const formattedData = convertTextFormat(transcribeResponse.data)
        
        // update to jp_fix column
        const updatedField = {
          'jp_text': formattedData
        }
        const transcribeText = await table.update(id, updatedField)
    
        return new NextResponse(JSON.stringify(transcribeText), {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        })

    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify(error), {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        })
    }

}