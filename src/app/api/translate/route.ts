import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server'
import { table, minifyData } from "../../utils/airtable"
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

        const prompt = `Translate this to chinese - ${textToTranslate}`
        const messages = [
            {
              role: 'system',
              content:
                'You are a qualified translator',
            },
            { role: 'user', content: prompt },
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
          const updatedRecords = await table.update(id, updatedField);
          return NextResponse.json(updatedRecords)
        } 

    } catch (error) {
        console.error('Error handling first POST request:', error);
        return NextResponse.json({ "message": "Missing required data" })
    }

}