// src/logSelection.js

export const logSelection = async (formData) => {
  const body = {
    ...formData,
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch('https://fpgk21llrl.execute-api.us-east-1.amazonaws.com/dev/log-selection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error('사용자 선택값 저장 실패:', err);
  }
};
