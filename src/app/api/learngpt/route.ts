import { NextResponse } from 'next/server'
import { gptTable } from "../../utils/airtable"
import { callOpenAI } from "../../utils/openai"

export async function POST(req: Request) {

    const {id, content} = await req.json()

    const messages = [
        {
          role: 'user',
          content: `あなたは学習者です。与えられた文章の内容を記憶してください。${content} 生成文章は『DONE』のみとしてください。 `,
        },
      ];
  
    const result = await callOpenAI(messages);

    const updatedField = {
        'status': 'DONE'
    }

    const status = await gptTable.update(id, updatedField)

    return new NextResponse(JSON.stringify(status), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    
}