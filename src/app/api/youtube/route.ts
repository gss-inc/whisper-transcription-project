import { NextResponse } from 'next/server'
import { table } from "../../utils/airtable"
import { convertTextFormat, createFormData } from "../../utils/format"
import axios from 'axios';
import { uploadStream } from "../../utils/cloudinary"
import ytdl from 'ytdl-core'

export async function POST(req: Request){
    try {
     
      const { id, url } = await req.json()
      let video_url = url;
  
      const videoUrl = video_url
      const whisperApiKey = process.env.WHISPER_API_KEY;
  
      // Fetch the video stream using ytdl-core
      const video = ytdl(videoUrl, { filter: format => format.container === 'mp4' });
  
      // Upload the video stream to Cloudinary
      const uploadResult = await uploadStream(video)

      const readable = await createFormData(uploadResult['secure_url'],'tmp.mp4')
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
      return NextResponse.json(error)
    }
  }