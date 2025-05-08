/**
 * Утилиты для работы с серверными API
 */

// Функция для загрузки файла через серверный API
export async function uploadFileToIPFS(file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/pinata/upload-file', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload file');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Функция для загрузки JSON метаданных через серверный API
export async function uploadJSONToIPFS(jsonData: any) {
  try {
    const response = await fetch('/api/pinata/upload-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload JSON');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading JSON:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
