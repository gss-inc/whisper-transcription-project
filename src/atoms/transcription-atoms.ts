import axios from "axios"
import { atom } from "jotai"

// TRANSCRIBE
export const fileNameAtom = atom<string>("")
export const fileTypeAtom = atom<"vtt" | "srt">("vtt")
export const formDataAtom = atom<FormData | null>(null)
export const transcriptionAtom = atom<string>("")
export const handlingAtom = atom(false)
export const formStateAtom = atom((get) => {
  const transcription = get(transcriptionAtom)
  return !transcription ? "transcribe" : "translate"
})

export const transcriptionHandlerAtom = atom(
  null,
  async (_get, set, formData: FormData) => {
    try {
      set(handlingAtom, true)

      const idRow = formData.get('id')
      const { data } = await axios.post(`/api/transcribe/${idRow}`, formData)
      if (!data) {
        throw new Error("No data from response.")
      }
      set(transcriptionAtom, data.data)
      set(handlingAtom, false)
    } catch (error: any) {
      set(handlingAtom, false)
      console.log(error.response.data.message)
      throw new Error(error.response.data.message)
    }
  }
)




