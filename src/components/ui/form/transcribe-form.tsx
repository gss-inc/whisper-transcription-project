"use client"

import { FormEvent } from "react"
import {
  apiKeyAtom,
  fileNameAtom,
  fileTypeAtom,
  handlingAtom,
  transcriptionHandlerAtom,
} from "@/atoms/transcription-atoms"
import { useAtomValue, useSetAtom } from "jotai"

const TranscribeForm = () => {
  const handling = useAtomValue(handlingAtom)
  const submitHandler = useSetAtom(transcriptionHandlerAtom)
  const setFileName = useSetAtom(fileNameAtom)
  const setFileType = useSetAtom(fileTypeAtom)
  const setAPIKey = useSetAtom(apiKeyAtom)

  return (
    <form
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        try {
          await submitHandler(formData)
        } catch (error: any) {
          console.log(error)
        }
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <label>
          Choose your video or audio{" "}
          <span className="text-xs text-neutral-500">Max: 25MB</span>
        </label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFileName(e?.target?.files?.[0]?.name as string)
          }}
          type="file"
          max={25 * 1024 * 1024}
          accept="video/*"
          name="file"
        />
      </div>
      <div className="flex gap-4">
        <button type="submit">
          {!handling ? (
            "Transcribe"
          ) : (
            <span className="animate-pulse">Transcribing...</span>
          )}{" "}
        </button>
      </div>
    </form>
  )
}

export default TranscribeForm
