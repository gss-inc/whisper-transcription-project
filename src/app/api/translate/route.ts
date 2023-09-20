import { NextResponse } from 'next/server'
import { table, minifyData } from "../../utils/airtable"
import { callOpenAI } from "../../utils/openai"
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

/**
 * 
 * @param req 
 * @returns translate jp_text to ch_text (chinese text)
 */

export async function PUT(req: Request) {
    try {
        let textToTranslate;
        const {id} = await req.json()
        const singleRecord = await table.find(id)
        const jp_text = singleRecord.get('jp_text')
        const jp_fix_text = singleRecord.get('jp_fix_text')

        if(jp_fix_text) {
            textToTranslate = jp_fix_text
        } else {
            textToTranslate = jp_text
        }

        const prompt = `文章を中国語に翻訳してください。生成フォーマットはそのまま使用してください。`
        const messages = [
          {
            role: 'user',
            content: textToTranslate,
          },
          { role: 'assistant', content: prompt },
        ];

        const client = new OpenAIClient(
          process.env.AZURE_ENDPOINT ,
          new AzureKeyCredential(process.env.AZURE_API_KEY ),
        );
        const deploymentId = 'gpt-4-test';
        const options = {
            temperature: 1,
        };
        const result = await client.getChatCompletions(
            deploymentId,
            messages,
            options,
        );

        for (const choice of result.choices) {
          const newData = `${choice.message?.content}`;
          const updatedField = {
            'ch_text': newData
          }
          const translateRecord = await table.update(id, updatedField);

          return new NextResponse(JSON.stringify(translateRecord), {
            status: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
          })
        } 

    } catch (error) {
        console.error('Error handling first POST request:', error);
        return NextResponse.json({ "message": "Missing required data" })
    }

}

/***
 * fix ch_text to ch_fix_text
 */
export async function POST(req: Request) {
  try {
    const {id, button} = await req.json()
    const singleRecord = await table.find(id)

    let fieldText, prompt, fieldToUpdate, responseField, fieldB;

    switch (button) {
      case '最終調整':
        fieldText = singleRecord.get('ch_text');
        prompt = `下記条件を反映させた文章を中国語で生成してください。
生成フォーマットはそのまま使用してください。
・スキピ等、日本特有の名詞や動詞があれば、中国語で使用する言葉に変更してください。
・化粧品の名前が外国の製品の場合、中国でわかる製品名に変更してください。
・若者言葉を自然に取り入れてください。
・友達に話すような言い回しにしてください。`;
        fieldToUpdate = 'ch_fix_text';
        responseField = 'updatedRecords';
        break;
  
      case '内容整合':
        fieldText = singleRecord.get('ch_fix_text');
        fieldB = singleRecord.get('jp_fix_text');
        prompt = `文章${fieldB}を正として文章${fieldText}の内容が相違していれば修正し、中国語で生成し直してください。`;
        fieldToUpdate = 'ch_integration_text';
        responseField = 'updatedRecordFix';
        break;
  
      default:
        throw new Error('Invalid button');
    }

    const messages = [
      {
        role: 'user',
        content: `文章A：${fieldB}\n文章B：${fieldText}`,
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
