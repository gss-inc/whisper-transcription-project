import { NextResponse } from 'next/server'
import { table, minifyData } from "../../../utils/airtable"
import { convertTextFormat } from "../../../utils/format"
import axios from 'axios';

/**
 * 
 * @param req 
 * @returns transcribe mp3 and save to jp_text
 */
export async function POST(  
    request: Request ) {
    try {
      const id = request.url.slice(request.url.lastIndexOf('/') + 1)
      const whisperApiKey = process.env.WHISPER_API_KEY;
      const formData = await request.formData()
      formData.append('model', 'whisper-1');
      formData.append('response_format', 'srt');
  
      const { data } = await axios.post(
        "https://api.openai.com/v1/audio/transcriptions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${whisperApiKey}`,
          },
        }
      )
      const formattedData = convertTextFormat(data)
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
      console.log(error.response.data.error.message)
      return NextResponse.json({ message: `An error occurred. : ${error.response.data.error.message}` });
    }
  }