import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mood: '',
    animal: '',
    tone: '',
    colors: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const cardRef = useRef(null); // 🔸 카드 영역 참조

  const animals = ['강아지', '고양이', '토끼', '햄스터', '여우', '사자', '사슴', '호랑이', '팬더', '코끼리'];
  const moods = ['행복해요', '슬퍼요', '화나요', '긴장돼요', '불안해요', '지쳤어요', '설레요', '우울해요', '신나요', '무기력해요'];
  const tone = ['상냥하게', '재미있게', '진지하게', '귀엽게', '차분하게', '감성적으로'];
  const colors = ['빨간색', '파란색', '노란색', '초록색', '보라색', '주황색', '핑크색', '검은색', '민트색', '회색'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('https://fpgk21llrl.execute-api.us-east-1.amazonaws.com/dev/cheer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('응원 API 호출 실패:', error);
      alert('응원 메시지를 불러오는 데 실패했어요 😢');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFormData({ name: '', age: '', mood: '', animal: '', tone: '', colors: '' });
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement('a');
    link.download = `${formData.animal}_응원카드.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

if (result) {
  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#fffaf0',
      padding: '2rem 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      {/* 카드 + 버튼을 감싸는 래퍼 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div ref={cardRef} style={{
          padding: '20px', border: '1px solid #ccc', borderRadius: '16px',
          backgroundColor: '#fff', width: '90%', maxWidth: '500px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.7rem' }}>✨ {formData.animal}의 응원 메시지 ✨</h2>
          <p style={{
            fontSize: '1.2rem',
            margin: '1rem auto',
            maxWidth: '90%',
            lineHeight: '1.8',
            textAlign: 'center',
            whiteSpace: 'pre-line',
            wordBreak: 'keep-all'
          }}>
            {result.message}
          </p>

          {result.image ? (
            <img
              src={`data:image/png;base64,${result.image}`}
              alt="응원 캐릭터"
              style={{ maxWidth: '300px', borderRadius: '10px' }}
            />
          ) : (
            <p style={{ color: 'gray', marginTop: '20px' }}>
              이미지가 생성되지 않았어요 😢
            </p>
          )}

          <p style={{ fontSize: '1.1rem', color: 'gray', marginTop: '10px' }}>
            {formData.animal}와 함께 당신을 응원합니다! 🐾
          </p>
        </div>

        {/* ✅ 버튼이 카드 아래 중앙에 위치하도록 이동 */}
       <div style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem'
        }}>
          <button
            onClick={handleDownload}
            style={{
              padding: '0.7rem 2.5rem',
              backgroundColor: '#ffffff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              cursor: 'pointer'
            }}
          >
            이미지 카드 저장하기
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: '0.7rem 2.5rem',
              backgroundColor: '#ffffff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              cursor: 'pointer'
            }}
          >
            다시 응원받기
          </button>
        </div>
      </div>
    </div>
  );
}

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#fffaf0', padding: '2rem 0', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🐾 응원 동물원</h1>
        <p style={{ marginBottom: '1.2rem', color: '#555' }}>당신의 하루를 응원하는 귀여운 친구들 🐶🐱🦊</p>

        <form onSubmit={handleSubmit} style={{
          display: 'flex', flexDirection: 'column', gap: '1.3rem', padding: '50px', border: '1px solid #ddd',
          borderRadius: '10px', backgroundColor: 'white', width: '100%', maxWidth: '400px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          <label>📝 이름을 입력해주세요.<br />
            <input name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%' }} />
          </label>
          <label>🎂 나이를 입력해주세요.<br />
            <input name="age" type="number" value={formData.age} onChange={handleChange} required style={{ width: '100%' }} />
          </label>
          <label>😊 오늘 기분은 어떤가요?<br />
            <select name="mood" value={formData.mood} onChange={handleChange} required style={{ width: '100%' }}>
              <option value="" disabled>기분을 선택해주세요</option>
              {moods.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </label>
          <label>🎵 어떤 톤으로 응원받고 싶나요?<br />
            <select name="tone" value={formData.tone} onChange={handleChange} required style={{ width: '100%' }}>
              <option value="" disabled>톤을 선택해주세요</option>
              {tone.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label>🎨 좋아하는 색상을 선택해주세요.<br />
            <select name="colors" value={formData.colors} onChange={handleChange} required style={{ width: '100%' }}>
              <option value="" disabled>색상을 선택해주세요</option>
              {colors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label>🐾 좋아하는 동물을 선택해주세요.<br />
            <select name="animal" value={formData.animal} onChange={handleChange} required style={{ width: '100%' }}>
              <option value="" disabled>동물을 선택해주세요</option>
              {animals.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>
          <button type="submit" disabled={loading} style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '0.7rem 1.5rem', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
            {loading ? '응원 생성 중...' : '응원받기'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
