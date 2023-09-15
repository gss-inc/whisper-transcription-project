export function convertTextFormat(input) {
    const lines = input.trim().split('\n');
    const formattedLines = [];
  
    for (let i = 0; i < lines.length; i += 4) {
      const timeInfo = lines[i + 1].split(' --> ');
      const startTime = convertTimeFormat(timeInfo[0]);
      const endTime = convertTimeFormat(timeInfo[1]);
      const text = lines[i + 2].trim();
      const formattedLine = `[${startTime} --> ${endTime}] ${text}`;
      formattedLines.push(formattedLine);
    }
  
    return formattedLines.join('\n');
}
  
export function convertTimeFormat(time) {
  const [hhmmss, ms] = time.split(',');
  const [hh, mm, ss] = hhmmss.split(':');
  const formattedTime = `${padZero(mm)}:${padZero(ss)}.${ms}`;
  return formattedTime;
}

export function padZero(num) {
  return num.toString().padStart(2, '0');
}

export const createFormData = async (url: string, fieldName: string): Promise<FormData | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch the file from ${url}`);
    }

    const blob = await response.blob();
    const formData = new FormData();
    formData.append(fieldName, blob, 'tmp.mp4');

    return formData;
  } catch (error) {
    console.error('Error creating FormData:', error);
    return null;
  }
}