"use client"

import { formStateAtom } from "@/atoms/transcription-atoms"
import { useAtomValue } from "jotai"

import TranscribeForm from "./ui/form/transcribe-form"

const Transcribe = () => {
  return (
    <div>
        <TranscribeForm />
    </div>
  )
}

export default Transcribe
