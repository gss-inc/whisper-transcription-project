import { NextResponse } from 'next/server'
import { table, minifyData } from "../../utils/airtable"
import { convertTextFormat, createFormData } from "../../utils/format"
import { callOpenAI } from "../../utils/openai"
import axios from 'axios';
import { cloudinary } from "../../utils/cloudinary"

export async function GET() {
    try {
        const records = await table.select({}).all();
        const minifiedRecords = await minifyData(records);

        return new NextResponse(JSON.stringify(minifiedRecords), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        })
   
    } catch (error) {
        console.error('Error handling GET request for data:', error);
        return NextResponse.json({ "message": "Error handling GET request for data" })
    }
}

/**
 * 
 * @param req 
 * @returns for "文章修正" button 
 */
export async function PUT(req: Request) {
  try {
    const {id, button} = await req.json()
    const singleRecord = await table.find(id)
    const jpnScene = singleRecord.get('情景（日本語文章）')

    let fieldText, prompt, fieldToUpdate, responseField;

    switch (button) {
      case '文章修正':
        fieldText = singleRecord.get('jp_text');
        prompt = `文章を読み取り、会話の前後がおかしかったり、体裁がおかしな部分があれば修正した文章を生成してください。生成フォーマットはそのまま使用してください。また、${jpnScene} を反映した文章としてください。`;
        fieldToUpdate = 'jp_fix_text';
        responseField = 'updatedRecords';
        break;
  
      default:
        throw new Error('Invalid button');
    }

    const messages = [
      {
        role: 'user',
        content: fieldText,
      },
      { role: 'assistant', content: prompt },
    ];

    const result = await callOpenAI(messages);

    const updatedField = {
      [fieldToUpdate]: result,
    };
  
    const updatedRecord = await table.update(id, updatedField);
  
    return new NextResponse(JSON.stringify({ [responseField]: updatedRecord }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ "message": error })
  }
}

/**
 * cloudinary, for airtable attachments (videos)
 */

export async function POST(req: Request){
  try {
   
    const { id, url } = await req.json()
    let video_url = url;

    const videoUrl = video_url
    const whisperApiKey = process.env.WHISPER_API_KEY;

    const result = await cloudinary.uploader
    .upload(videoUrl,{
      resource_type: "video"
    })

    const readable = await createFormData(result.secure_url,'tmp.mp4')
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
    return NextResponse.json({ "message": "Missing required data" })
  }
}








